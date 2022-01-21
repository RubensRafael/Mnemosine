import React,{ useState } from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { setNoteTitle, setNoteContent, setNoteDate, setNoteTime , setNoteNever, clearNewNote } from '../../redux/new-note-slice';
import { setView } from '../../redux/main-status-slice';
import { useMutation } from '@apollo/client';
import { CREATE_NOTE } from '../../querys';
import { update } from '../../redux/side-bar-slice';



export default function NoteBuilder(props){
	const [inputError, setInputError] = useState('')
	const newNote = useSelector((state)=>state.newnote.value)
	const actualFolder = useSelector((state)=>state.actualfolder.value)
	const dispatch = useDispatch()
	


	let handleNoteCreated = (data) =>{dispatch(update());dispatch(setView());dispatch(clearNewNote())}
	const [createNote, { loading, error }] = useMutation(CREATE_NOTE,{
		onCompleted : handleNoteCreated,
	});

	const handleSubmit = (e) =>{
	e.preventDefault()

    let { title , content, date, time, never} = newNote

    
   	if(title === '' || content === ''){
   		setInputError("fill all the fields")
   		console.log('conteudo')
   	}else if(never){
       createNote({variables:{
       	title: title,
       	content : content,
       	folderId: actualFolder._id,
       	expiresIn: 'Never',
       	createdAt: String(new Date().getTime())}})
	}else if(!(never) && (date === '' || time === '')){
		setInputError("fill all the fields")
		console.log('data')
	}else{  

     
     let expiresIn;

     try{
       expiresIn = new Date(date + ' ' + time)
       if(isNaN(expiresIn.getTime())){throw new RangeError() }
     }catch(e){
     	if(e instanceof RangeError){
          setInputError("Invalid date or time")
          } 
     }


     createNote({variables:{
     	title: title,
     	content : content,
     	folderId: actualFolder._id,
     	expiresIn: String(expiresIn.getTime()),
     	createdAt: String(new Date().getTime())}})

    }

}
	const today = new Date()
	const day = today.getDate() + 1
	const month = today.getMonth()
	const year = today.getFullYear()
	const tomorrow = `${year}-${month === 0 ? 12 : month}-${day}`

	
	
	return (
	<BuilderBox>	
	<BuilderForm onSubmit={handleSubmit}>

    <TitleInput type="text"  value={newNote.title} onChange={(e)=>{dispatch(setNoteTitle(e.target.value))}}></TitleInput>
    <ContentInput value={newNote.content} onChange={(e)=>{dispatch(setNoteContent(e.target.value))}}></ContentInput>
    <div>
    	<input readOnly={newNote.never}  type="date" value={newNote.date || tomorrow} min={tomorrow} onChange={(e)=>{dispatch(setNoteDate(e.target.value))}} required={true} pattern="\d{4}-\d{2}-\d{2}"></input>
    	<input readOnly={newNote.never}  type="time" value={newNote.time} onChange={(e)=>{dispatch(setNoteTime(e.target.value))}} required={true}></input>
	</div>
	<div>    
    	<input id="never" type="checkbox" checked={newNote.never} onChange={(e)=>{dispatch(setNoteNever(!(newNote.never)))}}></input>
		<label htmlFor="never"  >Set never</label>
	</div>
    <button onClick={handleSubmit}>Aaaaaaa</button>
    
	</BuilderForm>
	<div>{inputError}</div>
	</BuilderBox>


		)
}

const BuilderBox = styled.main`
	display: flex;
    justify-content: center;

`
const BuilderForm = styled.form`
	display: flex;
	flex-direction: column;
	justify-content: space-evenly;
	border-right: solid 2px #2055c0;
	border-left: solid 2px #2055c0;
	padding: 3px;
    width: 60%;
    background-color: gray;


`

const TitleInput = styled.input`
	background-color: white;
	border: none;
	border-bottom: 2px solid #2055c0;
	

`

const ContentInput = styled.textarea`
	background-color: white;
	border: 2px solid #2055c0 ;

`
const Titlput = styled.input`
	

`
