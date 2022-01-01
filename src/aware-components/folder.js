import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { change } from '../redux/actual-folder';


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
		<div onClick={()=> dispatch(change(props.id))} id='folder' className={actualFolder === props.id ? 'actual' : ''}>
			<div id='folder-status'>
				<p className='status-counter' title={`You have ${props.folder.count} notes here.`}>{props.folder.count}</p>
				<p className='status-counter' title={`You have completed ${props.folder.completed} notes here.`}>{props.folder.completed}</p>
				<p className='status-counter' title={`Have ${lateNotes} late notes here.`}>{lateNotes}</p>
			</div>
			<p id='folder-name' title={props.folder.name}>{props.folder.name}</p>
		</div>
	)
}