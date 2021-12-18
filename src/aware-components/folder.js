import React from 'react';
import '../style/side-bar.css'


export default function Folder(props){
	return(
		<div id='folder'>
			<div id='folder-status'>
				<p className='status-counter' title='You have X notes here'>0</p>
				<p className='status-counter' title='You have completed X notes here'>1</p>
				<p className='status-counter' title='Have X notes atrasdas heres'>2</p>
			</div>
			<p id='folder-name' title='nomeaaaaaaaaaaaaaaaaaaaaaaaaa'>nomeaaaaaaaaaaaaaaaaaaaaaaaaa</p>
		</div>
	)
}