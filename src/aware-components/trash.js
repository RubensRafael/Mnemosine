import React, { useState } from 'react';
import styled from 'styled-components';
import { useMutation  } from '@apollo/client';
import { CHANGE_FOLDER_TOMAIN  } from '../querys';
import { useSelector, useDispatch } from 'react-redux';
import { mainChanged } from '../redux/actual-folder';
import { update } from '../redux/side-bar-slice';

export default function Trash(props){
    
	
	const dispatch = useDispatch()
	const [warn, setWarn] = useState(false)

	//const handleIsMainChanged = () =>{dispatch(update());dispatch(mainChanged(true))}
	//const [changeToMain , { data, loading, error }] = useMutation(CHANGE_FOLDER_TOMAIN ,{
	//	onCompleted : handleIsMainChanged,
	//});

	
	
	
	return (
		<>
			{warn ? <TrashPopUp>
						<TrashWarn>
							<p>You are trying to remove a folder.<br></br>The following procedures will take place:</p>
							<ul>
								<li>All your notes will be deleted along with the folder.</li>
								<li>Shared notes will not be deleted, they will be moved to your main folder.</li>
							</ul>
							<span>you cannot remove your main folder.</span>
							<TrashChoose>
								<TrashConfirm>Confirm</TrashConfirm>
								<TrashCancel onClick={ () => setWarn(false) }>Cancel</TrashCancel>

							</TrashChoose>
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
	
	width: 60%;
	display: flex;
	flex-direction: column;
	align-items:center;
	justify-content:space-around;
	background-color:white;

`

const TrashChoose = styled.div`
	width:100%;
	display:  flex;
	align-items: flex-end;
	justify-content:space-around;

`

const TrashConfirm = styled.div`
	color: red;
	background-color:white;

`

const TrashCancel = styled.div`
	background-color: red;
	color:white;

`