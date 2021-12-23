import {React, useEffect, useState} from 'react';
import request from '../request';
import '../style/side-bar.css';
import Folder from './folder';
import folderIcon from '../icons/new-folder.svg';
import { FOLDER_LIST } from '../querys'


export default function SideBar(props){
	let [data , setData] = useState(undefined)
	//let [reload , setReload] = useState(0)

	useEffect(()=>{
		request.query({
			query: FOLDER_LIST
		}).then((res)=>{
			setData(res.data.getUser.folderList)
		}).catch((err)=>{
			console.log(err)
		})
	})/*,[reload]*/
	
	return (
			//{data === undefined ?  <p>carregando</p> : eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxYzIxZmVkYWIyZjc2ZGYyN2QxNTQyYSIsImlhdCI6MTY0MDExMjM3MSwiZXhwIjoxNjQwMzcxNTcxfQ.iAdIe_THnLn14kwqVqtC1irM0h_IRiGfg8nEokuz6H8
			<div id='side-bar'>
				<div id='new-folder-button'>
					<img id='new-folder-icon'src={folderIcon} alt="folderIcon"></img>
					<p>New Folder</p>
				</div>

				<div id='folder-list'>
					{data === undefined ? 'fail': data.map((folder)=>{
						return <Folder key={folder._id} folder={folder}></Folder>
					})}
				</div>
			</div>
		)
}