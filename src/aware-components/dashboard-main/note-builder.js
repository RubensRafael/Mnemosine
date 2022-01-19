import React,{ useState } from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { setNoteTitle, setNoteContent, setNoteDate, setNoteTime , setNoteNever } from '../../redux/new-note-slice';
import { setView } from '../../redux/main-status-slice';
import { useMutation } from '@apollo/client';
import { CREATE_NOTE } from '../../querys';//aa
import { update } from '../../redux/side-bar-slice';

export default function NoteBuilder(props){
	const newNote = useSelector((state)=>state.newnote.value)
	const actualFolder = useSelector((state)=>state.actualfolder.value)
	const [inputError, setInputError] = useState('')
	const dispatch = useDispatch()


	let handleNoteCreated = (data) =>{dispatch(update());dispatch(setView())}
	const [createNote, { loading }] = useMutation(CREATE_NOTE,{
		onCompleted : handleNoteCreated,
	});

	const handleSubmit = () =>{

    let { title , content, date, time, never} = newNote

   	if(title === '' || content === ''){setInputError("fill all the fields")}

    if(never){
       createNote({variables:{
       	title: title,
       	content : content,
       	folderId: actualFolder._id,
       	expiresIn: 'Never',
       	createdAt: new Date().getTime()}})
	}else{  

     if(date === '' || time === ''){setInputError("fill all the fields")}

     let expiresIn;

     try{

       expiresIn = new Date(date + ' ' + time)

       if(expiresIn.getTime() === NaN){throw new RangeError() }

     }catch(e){
     	if(e instanceof RangeError){

          setInputError("date or time malformed")
          } 

     }


     createNote({variables:{
     	title: title,
     	content : content,
     	folderId: actualFolder._id,
     	expiresIn: expiresIn.getTime(),
     	createdAt: new Date().getTime()}})

    }

}
	
	return (
			
	<form>

    <input type="text"  value={newNote.title} onChange={(e)=>{dispatch(setNoteTitle(e.target.value))}}></input>
    <textarea value={newNote.title} onChange={(e)=>{dispatch(setNoteContent(e.target.value))}}></textarea>
    <input readOnly={newNote.never}  type="date" value={newNote.date} onChange={(e)=>{dispatch(setNoteDate(e.target.value))}} required={true} pattern="\d{4}-\d{2}-\d{2}"></input>
    <input readOnly={newNote.never}  type="time" value={newNote.time} onChange={(e)=>{dispatch(setNoteTime(e.target.value))}} required={true}></input>
    <input id="neve" type="checkbox" checked={newNote.never} onChange={(e)=>{dispatch(setNoteNever(e.target.value))}}></input>
	<label htmlFor="neve"  >Set never</label>
    <button onClick={handleSubmit}></button>
	</form>


		)
}