import React,{useState} from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { useMutation} from '@apollo/client';
import { TO_COMPLETE_NOTE } from '../../querys';
import checked from  '../../icons/checked.svg';
import uncheck from '../../icons/uncheck.svg';
import config from '../../icons/config.svg';
const trash = '../../icons/trash.svg';
const back = '../icons/reset.svg';


//<MoveNoteFolderList back={toggleMoveNote} ></MoveNoteFolderList>
//<NoteTrash back={toggleTrash}></NoteTrash> 

export default function Card({ note }){

	const [ showConfig, setShowConfig ] = useState(false)
	const [ trashing,setTrashing ] = useState(false)
	const [ moveNote ,setMoveNote ] = useState(false)

	const handleToggleComplete = () => {note.completed = !(note.completed)}
	const [toggleComplete, {loading, error, data}] = useMutation(TO_COMPLETE_NOTE,{
	    onComplete: handleToggleComplete
	})

	console.log(JSON.stringify(error))

	const toggleTrash = () => setTrashing(!(trashing))
	const toggleMoveNote = () => setMoveNote(!(moveNote))

	return(
	<CardBox>
	   <div>
	      <img alt="check" onClick={()=>{if(!(loading)){toggleComplete({variables:{complete:!(note.completed),noteId:note._id,modifiedAt:String(new Date().getTime())}})}}} src={note.completed ? checked : uncheck}></img>
	      <img alt="config" onClick={()=>{ setShowConfig(!(showConfig)) }} src={showConfig ? back : config} ></img>
	   </div>
	{
	   showConfig ? 
	   <>
	        { moveNote ? <div>move</div> : <img alt="pasta" onClick={toggleMoveNote} src={trash} ></img>}
	        { trashing ? <div>trash</div>: <img alt="lixo" onClick={toggleTrash} src={trash}></img>}
	        

	   </>
	:
	<div onClick={()=>{console.log("MOSTRA OS DETALHES AGORA")}}>
	   <div>{note.content}</div>
	   <div>{note.title}</div>
	</div>
	}
	</CardBox>
  )

	//dispatch(setDetail(note))}
	
}
const CardBox = styled.div`
	display:  flex;
	flex-direction: column;
	height: 70px;
	justify-content: space-between;

`
