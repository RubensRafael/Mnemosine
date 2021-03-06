import React, { useState, useEffect  } from 'react';
import styled, {keyframes, css} from 'styled-components';
import { useMutation } from '@apollo/client';
import { CHANGE_FOLDER_NAME } from '../querys';
import { useSelector, useDispatch } from 'react-redux';
import { nameChanged } from '../redux/actual-folder';
import { update } from '../redux/side-bar-slice';
import { setCreate } from '../redux/main-status-slice';
import Star from './folder-star';
import Trash from './trash';
import send from '../icons/send.svg';
import edit from '../icons/edit.svg';
import load from '../icons/loading.svg';
import reset from '../icons/reset.svg';
import plus from '../icons/plus.svg';



export default function DashboardHeader(props){
	const theme = useSelector((state)=>state.theme.value)
	const actualFolder = useSelector((state) => state.actualfolder.value);
	const [newName, setNewName  ] = useState({ name:'', editing:false , finish: false});
	const dispatch = useDispatch()

	
	// a side bar depende do actual folder, quando ele mudar ela atualiza tambem
	let handleNameChanged = (data) =>{dispatch(update());dispatch(nameChanged(data.updateFolder.name))}
	const [changeName, { loading }] = useMutation(CHANGE_FOLDER_NAME,{
		onCompleted : handleNameChanged,
		fetchPolicy: "no-cache"
	});
    
	useEffect(()=>{
		setNewName({name: '', editing: false, finish: false  })
		//eslint-disable-next-line
	},[ actualFolder  ])

	
    useEffect(()=>{
    	
		if( newName.editing === false && newName.name !== '' && newName.name !== actualFolder.name){
			changeName({ variables: { inputName: newName.name,folderId : actualFolder._id} })
		}
		//eslint-disable-next-line
	},[newName.editing])
    

	return (
			<DashboardHeaderBox theme={theme}>
				<WrapperClose>
					<form onSubmit={(e) => {e.preventDefault();setNewName({name: newName.name, editing: false, finish: true})}}>
						<HeaderFolderInput theme={theme} editing={ newName.editing   }  autoFocus={newName.editing} readOnly={!(newName.editing)} type="text" value={newName.editing || newName.finish ? newName.name : actualFolder.name}  onChange={ (e) => setNewName({name:e.target.value, editing: true, finish: false})} ></HeaderFolderInput>		
					</form>
					
					<SendImg onClick={() => { if(!(loading)){setNewName({name: newName.name, editing: false, finish: true}) }  } } isLoading={loading} show={newName.editing || loading}  src={!(loading) ? send : load} alt="Send New Name Button"></SendImg>
					</WrapperClose>
				<Wrapper>
					<EditImg onClick={()=> setNewName({name: actualFolder.name, editing: true, finish: false })} src={newName.editing ? reset : edit} alt="Edit Icon"></EditImg>
					<Star></Star>
					<Trash></Trash>
					<PlusImg onClick={()=>{dispatch(setCreate())}}src={plus} alt="plus"></PlusImg>
				</Wrapper>
					
				
			</DashboardHeaderBox>
		)
}
const DashboardHeaderBox = styled.header`
	width: 100%;
	height: 100%;
	display: flex;
	background-color:  ${({theme}) => theme === true ? "#272727" : "white"};
	align-items: center;
	grid-column: 2 / 3;
	grid-row: 1 / 2;

	@media(max-width: 992px){
	   flex-wrap: wrap;
      grid-column: 1/2 ; 
      grid-row: 1/2;
	}

`
const Wrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
	@media(max-width: 768px){
     flex-basis: 100%;
	}

`
const WrapperClose = styled(Wrapper)`
	
	gap: 0px;

`

const HeaderFolderInput = styled.input`
	border: none;
	border: 2px solid ${ ( { editing  } ) => editing ? "#2055c0" : "gray"   };
	background-color:  ${({theme}) => theme === true ? "#272727" : "white"};
	color:  ${({theme}) => theme === true ? "white" : "black"};
	outline:none;
	font-weight: bold;

	@media(min-width: 768px){
     font-size: 1.5rem;
	}	

`


const EditImg = styled.img`
		width: 40px;
		height: 40px;
		cursor: pointer;
`
const PlusImg = styled.img`
		width: 40px;
		height: 40px;
		cursor: pointer;
		position: absolute;
    left: 90%;
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
	width: 40px;
	height: 40px;
	cursor: pointer;
	visibility:  ${({show}) => show ? "visible" : "hidden"};
	animation: ${({isLoading}) => isLoading && css`${Loading} infinite 0.5s`};
	
`
