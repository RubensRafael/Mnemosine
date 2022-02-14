import React,{ useState } from 'react';
import styled, { css, keyframes } from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { setNoteTitle, setNoteContent, setNoteDate, setNoteTime , setNoteNever, clearNewNote } from '../../redux/new-note-slice';
import { setView } from '../../redux/main-status-slice';
import { useMutation } from '@apollo/client';
import { CREATE_NOTE } from '../../querys';
import { update } from '../../redux/side-bar-slice';
import logo from '../../icons/logo.png';
import back from '../../icons/back.svg';

 

export default function NoteBuilder(props){

	const [inputError, setInputError] = useState('')
	const theme = useSelector((state)=>state.theme.value)
	const newNote = useSelector((state)=>state.newnote.value)
	const actualFolder = useSelector((state)=>state.actualfolder.value)
	const dispatch = useDispatch()
	

	let handleNewNoteError = (error) =>{setInputError(error.networkError.result.errors[0].message)}
	let handleNoteCreated = (data) =>{dispatch(update());dispatch(setView());dispatch(clearNewNote())}
	const [createNote, { loading}] = useMutation(CREATE_NOTE,{
		onCompleted : handleNoteCreated,
		onError: handleNewNoteError,
		fetchPolicy: "no-cache"
	});

	const handleSubmit = (e) =>{
	e.preventDefault()

    let { title , content, date, time, never} = newNote

    
   	if(title === '' || content === ''){
   		setInputError("Fill all the fields")
   		
   	}else if(never){
       createNote({variables:{
       	title: title,
       	content : content,
       	folderId: actualFolder._id,
       	expiresIn: 'Never',
       	createdAt: String(new Date().getTime())}})
	}else if(!(never) && (date === '' || time === '')){
		setInputError("Fill all the fields")
		
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
	

	
	
	return (
	<BuilderBox>

	<BuilderForm theme={theme}>
	{loading ? <LoadingBox isLoading={loading}><LoadingImg src={logo}></LoadingImg></LoadingBox>  : <>
	<div style={{width: "100%"}} ><CancelButton onClick={()=>{dispatch(setView())}} src={back}></CancelButton></div>
	<BuilderTitle>Create your note here</BuilderTitle>

    <TitleInput theme={theme} type="text" placeholder="Input the title here"  value={newNote.title} onChange={(e)=>{dispatch(setNoteTitle(e.target.value));setInputError('')}}></TitleInput>
    <ContentInput theme={theme} placeholder="What do you want to remember tomorrow?" rows="7" value={newNote.content} onChange={(e)=>{dispatch(setNoteContent(e.target.value));setInputError('')}}></ContentInput>
    <div>
    	<p>When should the note expire?</p>
    	<input readOnly={newNote.never}  type="date" value={newNote.date} min={newNote.date} onChange={(e)=>{dispatch(setNoteDate(e.target.value));setInputError('')}} required={true} pattern="\d{4}-\d{2}-\d{2}"></input>
    	<input readOnly={newNote.never}  type="time" value={newNote.time} onChange={(e)=>{dispatch(setNoteTime(e.target.value));setInputError('')}} required={true}></input>
	</div>
	<div>    
    	<input id="never" type="checkbox" checked={newNote.never} onChange={(e)=>{dispatch(setNoteNever(!(newNote.never)));setInputError('')}}></input>
		<label htmlFor="never"  >Never expires</label>
	</div>
	<BuilderError error={inputError}>{inputError || 'wrapper'}</BuilderError>
    <SaveButton role="button" onClick={handleSubmit}>SAVE</SaveButton>
   
    </>}
    
	</BuilderForm>
	
	</BuilderBox>


		)
}

const BuilderBox = styled.div`
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
  width: 80%;
  background-color:  ${({theme}) => theme === true ? "#272727" : "white"};
	color:  ${({theme}) => theme === true ? "white" : "black"};

	@media(max-width: 768px){
	   width: 90%;
     
	}
`
const BuilderTitle = styled.h3`
	
	text-align: center;

`

const TitleInput = styled.input`
	background-color:  ${({theme}) => theme === true ? "#272727" : "white"};
	color:  ${({theme}) => theme === true ? "white" : "black"};
	border: none;
	border-bottom: 2px solid #2055c0;
	outline: none;
	

`

const ContentInput = styled.textarea`
	background-color:  ${({theme}) => theme === true ? "#272727" : "white"};
	color:  ${({theme}) => theme === true ? "white" : "black"};
	border: 2px solid #2055c0;
	outline: none;
	padding : 2px;

`

const BuilderError = styled.p`
	color: red;
	transition : .2s;
	text-align: center;
	visibility: ${props => props.error ? "visible" : "hidden"};

`
const SaveButton = styled.button`
	background-color : #2055c0;
	border: #2055c0 solid 2px;
	color : white;
	transition : .2s;
	text-align: center;
	cursor: pointer;

	&:hover{
		background-color: transparent;
    	color: #2055c0;
	}
    
	&:active{
		border-color: transparent;
    	background-color: transparent;
    	color: #2055c0;
	}

`
const CancelButton = styled.img`
	
	cursor: pointer;

	
`

const LoadingImg = styled.img`
	width: 60px;
	height: 60px;
`

const NewFolderLoading = keyframes`
  0%{
      left: 40%;
  }
  100%{
      left: 50%;
  }
`
const LoadingBox = styled.div`
  position : ${props => props.isLoading ? "relative" : ""};
  text-align: center;
  
${({ isLoading }) => isLoading &&
    css`
      &:before {
       margin-top: 2px;
	     content: "";
	     width: 10%;
	     top: 100%;
	     left: 45%;
	     position: absolute;
	     border-bottom: 2px #2055c0 solid;
	     animation: ${NewFolderLoading} infinite alternate 0.5s;
      }
`}
`
