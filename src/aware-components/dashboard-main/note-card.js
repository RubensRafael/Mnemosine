import React,{useState, useEffect} from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { useMutation} from '@apollo/client';
import { TO_COMPLETE_NOTE } from '../../querys';
import { update } from '../../redux/side-bar-slice';
import checked from  '../../icons/checked.svg';
import uncheck from '../../icons/uncheck.svg';
import config from '../../icons/config.svg';
import back  from  '../../icons/back.svg';
import trash  from  '../../icons/trash.svg';
import folderIcon from "../../icons/change-folder.svg"


//<MoveNoteFolderList back={toggleMoveNote} ></MoveNoteFolderList>
//<NoteTrash back={toggleTrash}></NoteTrash> 

export default function Card({ note }){
	const dispatch = useDispatch()
	const [ showConfig, setShowConfig ] = useState(false)
	const [ trashing,setTrashing ] = useState(false)
	const [ moveNote ,setMoveNote ] = useState(false)
	const [isComplete, setIsComplete] = useState(false)

	let handlerToggleComplete = () => {setIsComplete(!(isComplete));dispatch(update())}
	const [toggleComplete, {loading, error, data}] = useMutation(TO_COMPLETE_NOTE,{
	    onCompleted: handlerToggleComplete
	})

	useEffect(()=>{
		if(note.completed){setIsComplete(true)}
	},[])



	const toggleTrash = () => setTrashing(!(trashing))
	const toggleMoveNote = () => setMoveNote(!(moveNote))

	return(
	<CardBox>
	   <CardHeader>
	      <DefaultButton alt="check" onClick={()=>{if(!(loading)){toggleComplete({variables:{complete:!(isComplete),noteId:note._id,modifiedAt:String(new Date().getTime())}})}}} src={isComplete ? checked : uncheck}></DefaultButton>
	      <DefaultButton alt="config" onClick={()=>{ setShowConfig(!(showConfig)) }} src={showConfig ? back : config} ></DefaultButton>
	   </CardHeader>
	{
	   showConfig ? 
	   <CardBody config={showConfig}>
	        { moveNote ? <div>move</div> : <DefaultButton alt="pasta" onClick={toggleMoveNote} src={folderIcon} ></DefaultButton >}
	        { trashing ? <div>trash</div>: <TrashIcon  alt="lixo" onClick={toggleTrash} src={trash}></TrashIcon>}

	   </CardBody>
	:
	<CardBody onClick={()=>{console.log("MOSTRA OS DETALHES AGORA")}}>
	   <CardContent>{note.content}</CardContent>
	   <CardTitle>{note.title}</CardTitle>
	</CardBody>
	}
	</CardBox>
  )

	//dispatch(setDetail(note))}
	
}
const CardBox = styled.div`
	
    display: flex;
    flex-direction: column;
    height: 30%;
    width: 17%;
    flex-basis: 17%;
    border: #2055c0 solid 1px;
    align-items: center;
    border-radius: 5px;
    margin: 3px;

`
const CardHeader = styled.div`
	
    display: flex;
	width: 100%;
    height: 20%;
    border-bottom : #2055c0 solid 1px;
    
    justify-content: space-between;
    

`
const CardBody = styled.div`
	
    display: flex;
    flex-direction: ${({config})=> config ? 'row' : 'column'};
	align-items : ${({config})=> config ? 'center' : ''};
	justify-content : ${({config})=> config ? 'space-around' : 'space-between'};
    height: 80%;
    width: 100%;
    

`

const CardContent = styled.div`
	
    overflow: hidden;
    text-overflow: ellipsis;
	cursor: pointer;
	border-bottom : #2055c0 solid 1px;
	height : 80%;

	&:hover{
		background-color : rgba(112,112,112,0.5);
	}

`

const CardTitle = styled.div`
	cursor: pointer;
	background-color : rgba(112,112,112,0.5);
    overflow: hidden;
    text-overflow: ellipsis;
	white-space: nowrap;
	height : 20%;


`

const DefaultButton  = styled.img`
	
	cursor: pointer;


`


const TrashIcon = styled.img`
   cursor: pointer;
   width : 40px;
   height : 40px;

`