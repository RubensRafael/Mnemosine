import {React, useEffect} from 'react';
import Folder from './folder';
import NewFolder from './new-folder';
import { FOLDER_LIST } from '../querys';
import { useSelector, useDispatch } from 'react-redux';
import { change } from '../redux/actual-folder';
import {setMainFolder} from '../redux/userinfo-slice';
import {setFolderList} from '../redux/folder-list-slice';
import { useQuery } from '@apollo/client';
import styled, {keyframes} from 'styled-components';
import load from '../icons/loading.svg';



export default function SideBar(props){
	const dispatch = useDispatch()
	const theme = useSelector((state)=>state.theme.value)
	const upFolderList = (data) =>{dispatch(setFolderList(data.getUser.folderList));document.title = `${data.getUser.name} Dashboard` }
	const { loading, error, data, refetch} = useQuery(FOLDER_LIST,{
		onCompleted: upFolderList,
		fetchPolicy:'no-cache',
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
			let firstActual = data.getUser.folderList.find(element => element.isMain === true)
			// upando o main como o folder atual no primeiro carregamento
			dispatch(change(firstActual))
		}

		if(data){
				let firstActual = data.getUser.folderList.find(element => element.isMain === true)
				//atualiza o main do usuário para renderizar estrelas
				dispatch(setMainFolder(firstActual._id))
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
			
			<SideBarBox theme={theme}>
				
				<NewFolder></NewFolder>
				<FolderList>
					{loading ? <LoadingIcon src={load} alt={'loading'}></LoadingIcon> : folderList.map((folder)=>{
						return <Folder key={folder._id} folder={folder}></Folder>
					})}
				</FolderList>

			</SideBarBox>
		)
}

const SideBarBox = styled.section`
    width: 100%;
	background-color: white;
	display:  flex;
	flex-direction: column;
	overflow: auto;
	grid-column: 1 / 2;
	grid-row: 1 / 3;
	background-color:  ${({theme}) => theme === true ? "#272727" : "white"};
  color:  ${({theme}) => theme === true ? "white" : "black"};
	
@media (max-width: 992px){
		width: 100%;
		height: 100%;
		flex-direction: row;
		grid-row: 3 / 4;
		
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
const Loading = keyframes`
  0%{
      transform : rotate(0deg)
  }
  25%{
      transform : rotate(90deg)
  }
  50%{
  	  transform : rotate(180deg)
  }
  75%{
  	  transform : rotate(270deg)
  }
  100%{
  	  transform : rotate(360deg)
  }
`
const LoadingIcon = styled.img`
	width: 50px;
	height: 50px;
	align-self: center;
	animation: ${Loading} infinite 0.5s;
	
`