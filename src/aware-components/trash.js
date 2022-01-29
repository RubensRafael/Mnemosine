import React, { useState } from 'react';
import styled, {keyframes} from 'styled-components';
import { useMutation  } from '@apollo/client';
import { REMOVE_ITEM  } from '../querys';
import { useSelector, useDispatch } from 'react-redux';
import { change } from '../redux/actual-folder';
import { update } from '../redux/side-bar-slice';
import trash from '../icons/trash.svg';
import load from '../icons/loading.svg';

export default function Trash(props){
    
	const [warn, setWarn] = useState(false)
	const actualFolder = useSelector((state) => state.actualfolder.value)
	const dispatch = useDispatch()
	
	const handleRemove = () =>{dispatch(change(''));dispatch(update());setWarn(false)}
	const [removeFolder , { loading }] = useMutation(REMOVE_ITEM,{
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
								    <TrashConfirm  onClick={ () => {if(!(actualFolder.isMain)){removeFolder({variables:{targetId: actualFolder._id,level:2}})}}}>Confirm</TrashConfirm>
								    <TrashCancel onClick={ () => setWarn(false) }>Cancel</TrashCancel>
							    </TrashChoose>
							</>: <LoadIcon src={load}></LoadIcon> }
						</TrashWarn>
				</TrashPopUp> : <TrashIcon src={trash} onClick={ () =>{setWarn(true)} }></TrashIcon>}
			
		</>	
			
		)
}



const TrashIcon = styled.img`
	width: 40px;
	height: 40px;
	cursor: pointer;

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
	padding:5px;	

`

const TrashButton = styled.div`
     
    height : 40px;
	width : 100%;
	text-align: center;
	cursor: pointer;
	border-radius: 5px;
	align-items: center;
    justify-content: center;
    display: flex;
	

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
const LoadIcon = styled.img`
	width : 40px;
  	height : 40px;
	
	animation: ${Loading} infinite 0.5s;
	
`