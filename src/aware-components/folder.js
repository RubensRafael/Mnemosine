import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { change } from '../redux/actual-folder';
import styled from 'styled-components';


export default function Folder(props){
	const dispatch = useDispatch()
	const actualFolder = useSelector((state) => state.actualfolder.value)

	const actualDate = new Date()

	const lateNotes = props.folder.dates.reduce((acc,item)=>{
		if(item === "Never"){return acc}
		let noteDate = new Date(Number(item))
		if(actualDate.getTime() > noteDate.getTime()){
			return acc + 1
		}else{
			return acc
		}
	},0)


	return(
		<FolderBox onClick={()=> dispatch(change({id:props.folder.id,name:props.folder.name,isMain:props.folder.isMain}))} autoFocus={actualFolder.id === props.folder.id} active={actualFolder.id === props.folder._id}>
			<FolderStatus>
				<StatusCounter color="#2055c0" className='status-counter' title={`You have ${props.folder.count} notes here.`}>{props.folder.count}</StatusCounter>
				<StatusCounter color="green" className='status-counter' title={`You have completed ${props.folder.completed} notes here.`}>{props.folder.completed}</StatusCounter>
				<StatusCounter color="red" className='status-counter' title={`Have ${lateNotes} late notes here.`}>{lateNotes}</StatusCounter>
			</FolderStatus>
			<FolderName title={props.folder.name}>{props.folder.name}</FolderName>
		</FolderBox>
	)
}

const FolderBox = styled.div`
	border-radius: 10px 10px 10px 10px;
	cursor: pointer;
	height: 50px;
	display:  flex;
	flex-direction: column;
	justify-content: center;
	border: solid 1px rgba(112,112,112,0.5);
	margin: 0px 10px 8px 10px;
	background-color: ${props => props.active ? "rgba(112,112,112,0.5)" : "none"};

 	&:hover{
		background-color: rgba(112,112,112,0.5);
	}

	@media (max-width: 992px){
		width: 130px;
		margin: 0px 5px 0px 5px;	

	}
`

const FolderStatus = styled.div`
	display:  flex;
	justify-content: space-around;
	margin-top: 2%;
`
const StatusCounter = styled.p`
  font-weight: bold;
	color:white;
	border-radius: 20px;
	width: 10%;
	text-align: center;
	background-color: ${props => props.color}
`



const FolderName = styled.p`
	text-align: center;
	white-space: nowrap;
	text-overflow: ellipsis;
	overflow: hidden;
`
