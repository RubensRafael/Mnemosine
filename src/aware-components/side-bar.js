import {React, useEffect} from 'react';
import '../style/side-bar.css';
import Folder from './folder';
import NewFolder from './new-folder';
import { FOLDER_LIST } from '../querys';
import { useSelector } from 'react-redux';
import { useQuery } from '@apollo/client';



export default function SideBar(props){
	const { loading, error, data, refetch} = useQuery(FOLDER_LIST,{
		fetchPolicy:'network-only',
		notifyOnNetworkStatusChange: true,
	})
	
	const update = useSelector((state) => state.sidebarupdate.value)
	
	useEffect(()=>{
		
		if(update > 0){refetch()}
		//eslint-disable-next-line
	},[update])

	if(error){
		console.log(error)
		//console.log(err.networkError.result.errors[0].message)
		//handle error
	}
	let folderList;
	if(data){
		folderList = JSON.parse(JSON.stringify(data.getUser.folderList))
		// inverte a ordem, para mais recente por cima
		folderList.reverse()
		// acha o main
		let main = folderList.find(element => element.isMain === true)
		// muda o main de posição
		let mainIndex = folderList.indexOf(main)
		folderList.splice(mainIndex,1)
		folderList.unshift(main)
	}

	return (
			
			<div id='side-bar'>
				
				<NewFolder></NewFolder>
				<div id='folder-list'>
					{loading ? <p>loading</p> : folderList.map((folder)=>{
						return <Folder key={folder._id} id={folder._id} folder={folder}></Folder>
					})}
				</div>
			</div>
		)
}