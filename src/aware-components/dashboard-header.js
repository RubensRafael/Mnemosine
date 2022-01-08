import React, { useState, useEffect  } from 'react';
import styled, {keyframes, css} from 'styled-components';
import { useMutation } from '@apollo/client';
import { CHANGE_FOLDER_NAME } from '../querys';
import { useSelector, useDispatch } from 'react-redux';
import { change, nameChanged } from '../redux/actual-folder';
import { update } from '../redux/side-bar-slice';
import star from '../icons/star.svg';
import trash from '../icons/trash.svg';
import send from '../icons/send.svg';
import edit from '../icons/edit.svg';
import logo from '../icons/logo.png';
import load from '../icons/loading.svg';
import reset from '../icons/reset.svg';


export default function DashboardHeader(props){

	const actualFolder = useSelector((state) => state.actualfolder.value);
	const [newName, setNewName  ] = useState({ name:'', editing:false , finish: false});
	const dispatch = useDispatch()

	
	// a side bar depende do actual folder, quando ele mudar ela atualiza tambem
	let handleNameChanged = (data) =>{dispatch(update());dispatch(nameChanged(data.updateFolder.name))}
	const [changeName, { data, loading, error }] = useMutation(CHANGE_FOLDER_NAME,{
		onCompleted : handleNameChanged,
	});
    
	useEffect(()=>{
		setNewName({name: '', editing: false, finish: false  })
	},[ actualFolder  ])

	
    useEffect(()=>{
    	
		if( newName.editing === false && newName.name !== '' && newName.name !== actualFolder.name){
			changeName({ variables: { inputName: newName.name,folderId : actualFolder._id} })
		}
	},[newName.editing])
    

	return (
			<DashboardHeaderBox>
				
					<form onSubmit={(e) => {e.preventDefault();setNewName({name: newName.name, editing: false, finish: true})}}>
						<HeaderFolderInput autoFocus={newName.editing} readOnly={!(newName.editing)} type="text" value={newName.editing || newName.finish ? newName.name : actualFolder.name}  onChange={ (e) => setNewName({name:e.target.value, editing: true, finish: false})} ></HeaderFolderInput>		
					</form>
					
					<SendImg onClick={() => { if(!(loading)){setNewName({name: newName.name, editing: false, finish: true}) }  } } isLoading={loading} show={newName.editing || loading}  src={!(loading) ? send : load} alt="Send New Name Button"></SendImg>
					
					<EditImg onClick={()=> setNewName({name: actualFolder.name, editing: true, finish: false })} edit={newName.editing} src={newName.editing ? reset : edit} alt="Edit Icon"></EditImg>
					
					{true ? <HeaderWarn>error.networkError.result.errors[0].message</HeaderWarn> : ''}
				
			</DashboardHeaderBox>
		)
}
const DashboardHeaderBox = styled.header`
	width: 100%;
	height: 100%;
	display: flex;
	background-color:white;
	align-items: center;
	flex-wrap: wrap;
	grid-column: 2 / 3;
	grid-row: 1 / 2;

	@media(max-width: 992px)  {
       grid-row: 1 / 2;
	}

`

const HeaderFolderInput = styled.input`
	border: none;
	border: 2px solid gray;
	outline:none;
	font-size: 1.5rem;
	font-weight: bold;
	

`
const EditImg = styled.img`
	width: ${({edit}) => edit ? "50px" : "30px"};;
	height: ${({edit}) => edit ? "50px" : "30px"};;
	cursor: pointer;
`

const HeaderWarn = styled.p`
	flex-basis: 100%
`

const Loading = keyframes`
  0%{
      transform : rotate(0deg)
  }
  25%{
      transform : rotate(90deg)
  }
  50%{
  	  transform : rotate(180deg)
  }
  75%{
  	  transform : rotate(270deg)
  }
  100%{
  	  transform : rotate(360deg)
  }
`
const SendImg = styled.img`
	width: ${({isLoading}) => isLoading ? "50px" : "30px"};
	height: ${({isLoading}) => isLoading ? "50px" : "30px"};
	cursor: pointer;
	visibility:  ${({show}) => show ? "visible" : "hidden"};
	animation: ${({isLoading}) => isLoading && css`${Loading} infinite 0.5s`};
	
`
