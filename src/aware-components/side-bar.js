import {React, useEffect} from 'react';
import Folder from './folder';
import NewFolder from './new-folder';
import { FOLDER_LIST } from '../querys';
import { useSelector, useDispatch } from 'react-redux';
import { change } from '../redux/actual-folder';
import { useQuery } from '@apollo/client';
import styled from 'styled-components';



export default function SideBar(props){
	const dispatch = useDispatch()
	const { loading, error, data, refetch} = useQuery(FOLDER_LIST,{
		fetchPolicy:'network-only',
		notifyOnNetworkStatusChange: true,
	})
	
	const update = useSelector((state) => state.sidebarupdate.value)
	const actualFolder = useSelector((state) => state.actualfolder.value)
	
	useEffect(()=>{
		
		if(update > 0){refetch()}
		//eslint-disable-next-line
	},[update])

	useEffect(()=>{
		if(data && !(actualFolder)){
			// upando o main globalmente
			let globalMain = folderList.find(element => element.isMain === true)
			dispatch(change({
				id:globalMain.id,
				name:globalMain.name,
				isMain:globalMain.isMain
			}))
		}
		
	})

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
			
			<SideBarBox>
				
				<NewFolder></NewFolder>
				<FolderList>
					{loading ? <p>loading</p> : folderList.map((folder)=>{
						return <Folder key={folder._id} folder={folder}></Folder>
					})}
				</FolderList>

			</SideBarBox>
		)
}

const SideBarBox = styled.div`
  width: 20%;
	background-color: white;
	display:  flex;
	flex-direction: column;
	overflow: auto;
	
@media (max-width: 992px){
		width: 100%;
		height: 15%;
		flex-direction: row;
	}
`
const FolderList = styled.div`
	display: flex;
	flex-direction: column;
	
@media (max-width: 992px){
		flex-direction: row;
		align-items: center;

	}
`