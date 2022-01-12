import React, { useState } from 'react';
import styled from 'styled-components';
import { useMutation  } from '@apollo/client';
import { REMOVE_FOLDER  } from '../querys';
import { useSelector, useDispatch } from 'react-redux';
import { change } from '../redux/actual-folder';
import { update } from '../redux/side-bar-slice';

export default function Trash(props){
    
	const [warn, setWarn] = useState(false)
	const actualFolder = useSelector((state) => state.actualfolder.value)
	const dispatch = useDispatch()
	
	const handleRemove = () =>{dispatch(change(''));dispatch(update());setWarn(false)}
	const [removeFolder , { data, loading, error }] = useMutation(REMOVE_FOLDER,{
		onCompleted : handleRemove,
	});

	
	
	
	return (
		<>
			{warn ? <TrashPopUp>
						<TrashWarn>
							{ !(loading) ? <>
							    <TrashP>You are trying to remove a folder.<br></br>The following procedures will take place:</TrashP>
							    <ul>
								    <TrashLi>All your notes will be deleted along with the folder.</TrashLi>
								    <TrashLi>Shared notes will not be deleted, they will be moved to your main folder.</TrashLi>
							    </ul>
							    <span style={{color: "red"}}>You cannot remove your main folder.</span>
							    <TrashChoose>
								    <TrashConfirm  onClick={ () => {if(!(actualFolder.isMain)){removeFolder({variables:{folderId: actualFolder._id}})}}}>Confirm</TrashConfirm>
								    <TrashCancel onClick={ () => setWarn(false) }>Cancel</TrashCancel>
							    </TrashChoose>
							</>: <div>CARREGANDO</div>}
						</TrashWarn>
				</TrashPopUp> : <TrashIcon onClick={ () =>{setWarn(true)} }>a</TrashIcon>}
			
		</>	
			
		)
}



const TrashIcon = styled.div`
	display:  flex;

`


const TrashPopUp = styled.div`
	position: fixed;
	display:  flex;
	justify-content: space-around;
	align-items: center;
	height: 100vh;
	width: 100vw;
	top: 0;
	left: 0;
	background-color:rgba(0,0,0,0.5);
	

`

const TrashWarn = styled.div`
	height: 200px;
	width: 60%;
	display: flex;
	flex-direction: column;
	align-items:center;
	justify-content:space-around;
	background-color:white;
	padding: 5px;

`

const TrashChoose = styled.div`
	width:100%;
	display: flex;
	align-items: center;
	justify-content: space-between;
	
	

`

const TrashButton = styled.div`
     
    height : 30px;
	width : 100%;
	text-align: center:
	cursor: pointer;
	border-radius: 5px;


	

`


const TrashConfirm = styled(TrashButton)`
	color: red;
	background-color:white;

	&:hover{
		background-color: gray;
	 }
	 &:active{
		 background-color: gray;
	 }

`

const TrashCancel = styled(TrashButton)`
	background-color: red;
	color:white;

	&:hover{
		background-color: rgba(255,0,0,0.67);
	}
	&:active{
		background-color: rgba(255,0,0,0.67);
	}

`

const TrashLi = styled.li`
    
    list-style: none;
`

const TrashP = styled.p`
    text-align: center;
`