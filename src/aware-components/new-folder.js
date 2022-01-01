import {React, useState} from 'react';
import client from '../request';
import folderIcon from '../icons/new-folder.svg';
import logo from '../icons/logo.png';
import { CREATE_FOLDER } from '../querys';
import { useDispatch } from 'react-redux';
import { update } from '../redux/side-bar-slice';

export default function NewFolder(){

	let dispatch = useDispatch()
	let [newFolderPopUp , setNewFolderPopUp] = useState(false);
	let [value , setValue] = useState('');
	let [reqStatus , setReqStatus] = useState({error:false,warn:'',loading:false});

	async function createNewFolder(e){
		e.preventDefault()
		client.mutate({
			mutation: CREATE_FOLDER,
			variables:{
				inputName : value
			}
		}).then((res)=>{
			dispatch(update())
			setReqStatus({error:false,warn:`The folder "${res.data.createFolder.name}" was created with sucess.`,loading:false})
		}).catch((err)=>{
			setReqStatus({error:true,warn:err.networkError.result.errors[0].message,loading:false})
		})
		setReqStatus({error:false,warn: '',loading:true})


	}
	return(

	<>
		{newFolderPopUp === false ? <div onClick={() => setNewFolderPopUp(true)} id='new-folder-button'>
				<img id='new-folder-icon'src={folderIcon} alt="folderIcon"></img>
				<p>New Folder</p>
		</div> :
		<div id='new-folder-popup'>
			<div id='new-folder-box'>
				<div>
					<p id={reqStatus.error ? 'new-folder-error': 'new-folder-warn'} >{reqStatus.warn}</p>
				</div>
				<div id={reqStatus.loading ? 'new-folder-center-box-loading' : 'new-folder-center-box'}>
					{reqStatus.loading ? <img id="new-folder-loading" src={logo} alt="Logo"></img> :
					<form id="new-folder-form" onSubmit={createNewFolder}>
						<input autoFocus={true} placeholder="Input the name of your folder." id="new-folder-input" value={value} onChange={(e) => setValue(e.target.value)} type="text"></input>
					</form>}
				</div>
				<div>
					<div id="new-folder-cancel" onClick={() => setNewFolderPopUp(false)}>Cancel</div>
					<div id="new-folder-send" onClick={createNewFolder}>Send</div>
				</div>
			</div>
		</div>}
	</>	

		)
}
