import {React, useState} from 'react';
import client from '../request';
import folderIcon from '../icons/new-folder.svg';
import logo from '../icons/logo.png';
import { CREATE_FOLDER } from '../querys';
import { useDispatch } from 'react-redux';
import { update } from '../redux/side-bar-slice';
import { change } from '../redux/actual-folder';
import styled, { css, keyframes } from 'styled-components';

export default function NewFolder(){

	let dispatch = useDispatch()
	let [newFolderPopUp , setNewFolderPopUp] = useState(false);
	let [value , setValue] = useState('');
	let [reqStatus , setReqStatus] = useState({error:false,warn:'',loading:false});

	async function createNewFolder(e){
		e.preventDefault()
		client.mutate({
			mutation: CREATE_FOLDER,
			variables:{
				inputName : value
			}
		}).then((res)=>{
			let mainVerif = res.data.createFolder.user.mainFolder === res.data.createFolder._id
			dispatch(update())
			dispatch(change({...res.data.createFolder,...{isMain : mainVerif}}))
			setReqStatus({error:false,warn:`The folder "${res.data.createFolder.name}" was created with sucess.`,loading:false})
		}).catch((err)=>{
			setReqStatus({error:true,warn:err.networkError.result.errors[0].message,loading:false})
		})
		setReqStatus({error:false,warn: '',loading:true})


	}
	return(

	<>
		{newFolderPopUp === false ? <NewFolderButton onClick={() => setNewFolderPopUp(true)}>
				<NewFolderIcon src={folderIcon} alt="folderIcon"></NewFolderIcon>
				<p>New Folder</p>
		</NewFolderButton> :
		<NewFolderPopup>
			<NewFolderBox>
				<NewFolderBoxChild>
					<NewFolderMessage error={reqStatus.error}>{reqStatus.warn}</NewFolderMessage>
				</NewFolderBoxChild>
				<NewFolderBoxChild2 loading={reqStatus.loading}>
					{reqStatus.loading ? <NewFolderLoadingImg src={logo} alt="Logo"></NewFolderLoadingImg> :
					<NewFolderForm onSubmit={createNewFolder}>
						<NewFolderInput autoFocus={true} placeholder="Input the name of your folder." value={value} onChange={(e) => setValue(e.target.value)} type="text"></NewFolderInput>
					</NewFolderForm>}
				</NewFolderBoxChild2>
				<NewFolderBoxChild3>
					<NewFolderCancel onClick={() => setNewFolderPopUp(false)}>Cancel</NewFolderCancel>
					<NewFolderSend onClick={createNewFolder}>Send</NewFolderSend>
				</NewFolderBoxChild3>
			</NewFolderBox>
		</NewFolderPopup>}
	</>	

		)
}

const NewFolderButton = styled.div`
	cursor: pointer;
	display: flex;
	justify-content: center;
	align-items: center;
	margin: 5%;
	border-radius: 10px;

  &:hover{
		background-color: rgba(112,112,112,0.5);
	}
	
@media (max-width: 992px){
		margin: 0px 10px 0px 0px;
	}
}`

const NewFolderIcon = styled.img`
	height: 30px;
	width: 30px;
`
const NewFolderPopup = styled.div`
	position: fixed;
	display:  flex;
	justify-content: space-around;
	align-items: center;
	height: 100vh;
	width: 100vw;
	top: 0;
	background-color:rgba(0,0,0,0.5)
`
const NewFolderBox = styled.div`
	display:  flex;
	flex-direction: column;
	justify-content:space-around;
	align-items: center;
	background-color:white;
	width: 60%;
	height: 175px;
	padding: 10px;
	gap: 10px;
`
const NewFolderBoxChild = styled.div`
	display:  flex;
	text-align: center;
	justify-content: center;
	width: 100%;
`
const NewFolderBoxChild3 = styled(NewFolderBoxChild)`
	gap: 5px;
	justify-content: flex-end;
  padding: 5px;
`
const NewFolderMessage = styled.p`
 width: 100%;
 color: ${props => props.error ? "red" : "#2055c0"};
`

const NewFolderForm = styled.form`
	width: 100%;
`
const NewFolderInput = styled.input`
	border: none;
	text-decoration: none;
	outline: none;
	border-bottom: 2px #2055c0 solid;
	width: 100%;
`
const NewFolderCancel = styled.div`
	cursor: pointer;
	color: #2055c0;
`
const NewFolderSend = styled.div`
	cursor: pointer;
	background-color: #2055c0;
	color: white;
	border-radius: 3px;
  padding: 2px;
`
const NewFolderLoadingImg = styled.img`
	width: 50px;
	height: 50px;
`

const NewFolderLoading = keyframes`
  0%{
      left: 40%;
  }
  100%{
      left: 50%;
  }
`
const NewFolderBoxChild2 = styled(NewFolderBoxChild)`
  position : ${props => props.loading ? "relative" : ""};
  
${({ loading }) => loading &&
    css`
      &:before {
       margin-top: 2px;
	     content: "";
	     width: 10%;
	     top: 100%;
	     left: 45%;
	     position: absolute;
	     border-bottom: 2px #2055c0 solid;
	     animation: ${NewFolderLoading} infinite alternate 0.5s;
      }
`}
`
