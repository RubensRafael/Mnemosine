import React,{useState, useEffect} from 'react';
import styled, {keyframes} from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { useMutation} from '@apollo/client';
import { TO_COMPLETE_NOTE, REMOVE_ITEM } from '../../querys';
import { update } from '../../redux/side-bar-slice';
import checked from  '../../icons/checked.svg';
import uncheck from '../../icons/uncheck.svg';
import config from '../../icons/config.svg';
import back  from  '../../icons/back.svg';
import trash  from  '../../icons/trash.svg';
import folderIcon from "../../icons/change-folder.svg";
import load from '../../icons/loading.svg';


//<MoveNoteFolderList back={toggleMoveNote} ></MoveNoteFolderList>
//<NoteTrash back={toggleTrash}></NoteTrash> 

export default function Card({ note }){
	const dispatch = useDispatch()
	const [ showConfig, setShowConfig ] = useState(false)
	const [ trashing,setTrashing ] = useState(false)
	const [ moveNote ,setMoveNote ] = useState(false)
	const [isComplete, setIsComplete] = useState(false)
	const [removedNote, setRemovedNote] = useState(false)


	let handlerToggleComplete = () => {setIsComplete(!(isComplete));dispatch(update())}
	const [toggleComplete, {loading, error, data}] = useMutation(TO_COMPLETE_NOTE,{
		fetchPolicy:'no-cache',
	    onCompleted: handlerToggleComplete
	})


	

	useEffect(()=>{
		if(note.completed){setIsComplete(true)}
	},[])



	const toggleTrash = () => setTrashing(!(trashing))
	const toggleMoveNote = () => setMoveNote(!(moveNote))
	
	const makeNoteDisappear = () => setRemovedNote(true)

	return(
	<>{ !(removedNote) ? <CardBox>
	   <CardHeader>
	      <DefaultButton alt="check" onClick={()=>{if(!(loading)){toggleComplete({variables:{complete:!(isComplete),noteId:note._id,modifiedAt:String(new Date().getTime())}})}}} src={isComplete ? checked : uncheck}></DefaultButton>
	      <DefaultButton alt="config" onClick={()=>{ setShowConfig(!(showConfig)) }} src={showConfig ? back : config} ></DefaultButton>
	   </CardHeader>
	{
	   showConfig ? 
	   <CardBody config={showConfig}>
	        { moveNote ? <CardMove></CardMove>: <DefaultButton alt="pasta" onClick={toggleMoveNote} src={folderIcon} ></DefaultButton >}
	        { trashing ? <CardTrash trashBack={toggleTrash} noteDisappear={makeNoteDisappear} note={note} ></CardTrash>: <TrashIcon  alt="lixo" onClick={toggleTrash} src={trash}></TrashIcon>}

	   </CardBody>
	:
	<CardBody onClick={()=>{console.log("MOSTRA OS DETALHES AGORA")}}>
	   <CardContent>{note.content}</CardContent>
	   <CardTitle>{note.title}</CardTitle>
	</CardBody>
	}
	</CardBox> : '' }</>
  )

	//dispatch(setDetail(note))}
	
}

function CardTrash(props){
	const dispatch = useDispatch()
	let handleRemovedNote = () => {dispatch(update());props.trashBack(false);props.noteDisappear(true)}
	const [removeNote, removeNoteResponse] = useMutation(REMOVE_ITEM,{
	    onCompleted: handleRemovedNote
	})

	return(
		<TrashPopUp>
			<TrashWarn>
				{ !(removeNoteResponse.loading) ? <>
					<TrashP>Do you really want to remove this note?</TrashP>
					<TrashChoose>
						<TrashConfirm onClick={ () => removeNote({variables: {targetId:props.note._id,level:1}})}>Confirm</TrashConfirm>
						<TrashCancel onClick={ () => props.trashBack(false) }>Cancel</TrashCancel>
					</TrashChoose>
					</>: <LoadIcon src={load}></LoadIcon> }
			</TrashWarn>
		</TrashPopUp>

		)
}

function CardMove(props){
	const folderList = useSelector((state)=>state.folderlist.value)
	const copyList = JSON.parse(JSON.stringify(folderList))
	return(<TrashPopUp>
			<TrashWarn islist={true}>
			<h3 style={{borderBottom: "#2055c0 solid 2px",width: "100%", textAlign: "center"}}>Choose the folder to replace the note</h3>
				{ true ? <> {copyList.reverse().map((folder)=>{return(<FolderOption>{folder.name}</FolderOption>)})}
					
					</>: <LoadIcon src={load}></LoadIcon> }
			</TrashWarn>
		</TrashPopUp>)
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

    @media(max-width: 768px){
	   width: 22%;
       flex-basis: 22%;
	}

	@media(max-width: 425px){
	   width: 30%;
       flex-basis: 30%;
	}
	@media(max-width: 320px){
	   width: 47%;
       flex-basis: 47%;
	}

	

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

const TrashPopUp = styled.div`
	position: fixed;
	display:  flex;
	justify-content: space-around;
	align-items: center;
	height: 100vh;
	width: 100vw;
	top: 0;
	left: 0;
	background-color:rgba(0,0,0,0.5);
	

`

const TrashWarn = styled.div`
	height: ${({islist})=> islist ? '80%' : '200px'};
	width: 60%;
	display: flex;
	flex-direction: column;
	align-items:center;
	justify-content : ${({islist})=> islist ? 'flex-start' : 'space-around'};
	background-color:white;
	padding: 5px;
	overflow : auto;

`

const TrashChoose = styled.div`
	width:100%;
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding:5px;	

`

const TrashButton = styled.div`
     
    height : 30px;
	width : 100%;
	text-align: center;
	cursor: pointer;
	border-radius: 5px;
	align-items: center;
    justify-content: center;
    display: flex;
	

`


const TrashConfirm = styled(TrashButton)`
	color: red;
	background-color:white;

	&:hover{
		background-color: gray;
	 }
	 &:active{
		 background-color: gray;
	 }

`

const TrashCancel = styled(TrashButton)`
	background-color: red;
	color:white;

	&:hover{
		background-color: rgba(255,0,0,0.67);
	}
	&:active{
		background-color: rgba(255,0,0,0.67);
	}

`



const TrashP = styled.p`
    text-align: center;
`

const FolderOption = styled.div`
    text-align: center;
    cursor: pointer;
    width:100%;
    margin-top: 2px;
    margin-bottom: 2px;
    &:hover{
		background-color: rgba(112,112,112,0.5);
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
const LoadIcon = styled.img`
	width : 40px;
  	height : 40px;
	
	animation: ${Loading} infinite 0.5s;
	
`

