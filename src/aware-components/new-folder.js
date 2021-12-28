import {React, useState} from 'react';
import request from '../request';
import '../style/side-bar.css';
import folderIcon from '../icons/new-folder.svg';
import { CREATE_FOLDER } from '../querys';

export default function NewFolder(){

	let [newFolderPopUp , setNewFolderPopUp] = useState(false);
	let [value , setValue] = useState('');
	let [reqStatus , setReqStatus] = useState({warn:'',loading:false});

	async function createNewFolder(e){
		e.preventDefault()
		request.mutate({
			mutation: CREATE_FOLDER,
			variables:{
				inputName : value
			}
		}).then((res)=>{
			setReqStatus({warn:`The folder "${res.data.createFolder.name}" was created with sucess.`,loading:false})
		}).catch((err)=>{
			setReqStatus({warn:err.networkError.result.errors[0].message,loading:false})
		})
		setReqStatus({warn: '',loading:true})


	}
	return(

	<>
		{newFolderPopUp === false ? <div onClick={() => setNewFolderPopUp(true)} id='new-folder-button'>
				<img id='new-folder-icon'src={folderIcon} alt="folderIcon"></img>
				<p>New Folder</p>
		</div> :
		<div id='new-folder-popup'>
			<div>
				<p>{reqStatus.warn}</p>
			</div>
			<div>
				<form onSubmit={createNewFolder}>
					<input readOnly={reqStatus.loading} value={value} onChange={(e) => setValue(e.target.value)} type="text"></input>
				</form>
			</div>
			<div>
				<div onClick={() => setNewFolderPopUp(false)}>CANCELAR</div>
				<div onClick={createNewFolder}>ENVIAR</div>
			</div>
		</div>}
	</>	

		)
}
