import React from 'react';


export default function Folder(props){

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
		<div id='folder'>
			<div id='folder-status'>
				<p className='status-counter' title={`You have ${props.folder.count} notes here.`}>{props.folder.count}</p>
				<p className='status-counter' title={`You have completed ${props.folder.completed} notes here.`}>{props.folder.completed}</p>
				<p className='status-counter' title={`Have ${lateNotes} late notes here.`}>{lateNotes}</p>
				
				
			</div>
			<p id='folder-name' title={props.folder.name}>{props.folder.name}</p>
		</div>
	)
}