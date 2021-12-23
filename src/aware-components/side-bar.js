import {React, useEffect, useState} from 'react';
import { print } from 'graphql';
import request from '../request';
import '../style/side-bar.css';
import Folder from './folder';
import folderIcon from '../icons/new-folder.svg';
import { FOLDER_LIST } from '../querys'


export default function SideBar(props){
	let [data , setData] = useState(undefined)
	let [reload , setReload] = useState(0)

	useEffect(()=>{
		request.query({
			query: FOLDER_LIST
		}).then((res)=>{
			console.log(res)
		}).catch((err)=>{
			console.log(err)
		})
	},[reload])
	
	return (
			<div id='side-bar'>
				<div id='new-folder-button'>
					<img id='new-folder-icon'src={folderIcon} alt="folderIcon"></img>
					<p>New</p>
				</div>

				<div id='folder-list'>
					{data === undefined ? 'fail':<Folder></Folder>}
				</div>
			</div>
		)
}