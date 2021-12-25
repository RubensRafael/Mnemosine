import {React, useEffect, useState} from 'react';
import request from '../request';
import '../style/side-bar.css';
import Folder from './folder';
import folderIcon from '../icons/new-folder.svg';
import { FOLDER_LIST } from '../querys'



export default function SideBar(props){
	let [data , setData] = useState(undefined)
	let [newFolderPopUp , setNewFolderPopUp] = useState(false)
	//let [reload , setReload] = useState(0)

	useEffect(()=>{
		request.query({
			query: FOLDER_LIST
		}).then((res)=>{
			setData(res.data.getUser.folderList)
		}).catch((err)=>{
			console.log(err.networkError.result.errors)
		})
	})/*,[reload]*/

	
	
	return (
			//{data === undefined ?  <p>carregando</p> : 
			<div id='side-bar'>
				{newFolderPopUp === false ? 
				<div onClick={() => setNewFolderPopUp(true)} id='new-folder-button'>
					<img id='new-folder-icon'src={folderIcon} alt="folderIcon"></img>
					<p>New Folder</p>
				</div> : 
				<div id='new-folder-popup'>
					<div onClick={() => setNewFolderPopUp(false)} >AAAAAAAAAAA</div>
				</div>
			}

				<div id='folder-list'>
					{data === undefined ? 'fail': data.map((folder)=>{
						return <Folder key={folder._id} folder={folder}></Folder>
					})}
				</div>
			</div>
		)
}