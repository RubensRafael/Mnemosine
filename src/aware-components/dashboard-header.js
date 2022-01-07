import React, { useState, useEffect  } from 'react';
import styled from 'styled-components';
import { useMutation } from '@apollo/client';
import { CHANGE_FOLDER_NAME } from '../querys';
import { useSelector, useDispatch } from 'react-redux';
import { change } from '../redux/actual-folder';
import { update } from '../redux/side-bar-slice';
import star from '../icons/star.svg';
import trash from '../icons/trash.svg';
import time from '../icons/time.svg';
import logo from '../icons/logo.png';


export default function DashboardHeader(props){

	const actualFolder = useSelector((state) => state.actualfolder.value);
	const [newName, setNewName  ] = useState({ name:'', editing:false , finish: false});
	const dispatch = useDispatch()

	// atualizando a side bar, o header atualiza tambem porque é a side bar que eleva o folder atual globalmente
	let nameChanged = () =>{
		dispatch(update())
	}

	const [changeName, { data, loading, error }] = useMutation(CHANGE_FOLDER_NAME,{
		onCompleted : nameChanged,
	});


	
    useEffect(()=>{
    	
		if( newName.editing === false && newName.name !== '' && newName.name !== actualFolder.name){
			
			changeName({ variables: { inputName: newName.name,folderId : actualFolder._id} })
		}
	},[newName.editing])

	/*useEffect(()=>{
		console.log('a')
		setNewName({name: '', editing: false})
	},[actualFolder.name])*/

	return (
			<DashboardHeaderBox>
				<HeaderFolderInfo>
					<form onSubmit={(e) => {
						e.preventDefault()
						setNewName({name: newName.name, editing: false})
					}}>
						<HeaderFolderInput autoFocus={newName.editing} readOnly={!(newName.editing)} type="text" value={newName.editing || newName.finish ? newName.name : actualFolder.name} onChange={ (e) => setNewName({name:actualFolder.name, editing: false, finish: false})} onBlur={ (e) => setNewName({name:e.target.value, editing: false, finish: false})} ></HeaderFolderInput>
						<SendImg onClick={() => setNewName({name: newName.name, editing: false, finish: true})} show={newName.editing}  src={star} alt="Send New Name Button"></SendImg>
						<TesteImg onClick={()=> setNewName({name: actualFolder.name, editing: true, finish: false })} src={newName.editing ? trash : logo} alt="Edit Icon"></TesteImg>
						{loading ? <p>carregando</p> : ''}
					</form>
					{error ? <p>{error.networkError.result.errors[0].message}</p> : ''}
				</HeaderFolderInfo>
			</DashboardHeaderBox>
		)
}
const DashboardHeaderBox = styled.header`
	width: 100%;
	display: flex;
	justify-content: space-between;
	align-items: center;
`
const HeaderFolderInfo = styled.div`
	width: 100%;
	display:  flex;
	align-items: center;
	height: 10vh;
	background-color:white;
	
`
const HeaderFolderInput = styled.input`
	border: none;
	border: 2px solid gray;
	outline:none;
	font-size: 1.5rem;
	font-weight: bold;
	

`
const TesteImg = styled.img`
	width: 50px;
	height: 50px;
	cursor: pointer;
`
const SendImg = styled.img`
	width: 50px;
	height: 50px;
	cursor: pointer;
	border: 1px solid #2055c0;
	visibility:  ${({show}) => show ? "visible" : "hidden"};

	&:active{
		background-color: #2055c0;
	}
`
