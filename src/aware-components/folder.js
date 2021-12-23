import React from 'react';
import '../style/side-bar.css';


export default function Folder(props){
	
	return(
		<div id='folder'>
			<div id='folder-status'>
				<p className='status-counter' title={`You have ${props.folder.count} notes here`}>{props.folder.count}</p>
				<p className='status-counter' title={`You have completed ${props.folder.completed} notes here`}>{props.folder.completed}</p>
				<p className='status-counter' title='Have X notes atrasdas heres'>X</p>
				
				
			</div>
			<p id='folder-name' title={props.folder.name}>{props.folder.name}</p>
		</div>
	)
}