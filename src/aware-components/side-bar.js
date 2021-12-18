import React from 'react';
import '../style/side-bar.css';
import Folder from './folder';
import folderIcon from '../icons/new-folder.svg'

export default function SideBar(props){

	
	return (
			<div id='side-bar'>
				<div id='new-folder-button'>
					<img id='new-folder-icon'src={folderIcon} alt="folderIcon"></img>
					<p>New</p>
				</div>

				<div id='folder-list'>
					<Folder></Folder>
				</div>
			</div>
		)
}