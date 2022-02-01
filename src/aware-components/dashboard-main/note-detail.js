import React,{useState} from 'react';
import styled,{css, keyframes} from 'styled-components';
import back from '../../icons/back.svg';
import { useSelector, useDispatch } from 'react-redux';
//import { useQuery } from '@apollo/client';
//import { LOGIN_DEV_USER } from '../querys';


export default function NoteDetail(props){

	const notePayload = useSelector((state)=>state.mainstatus.value)
	let noteCopy  = JSON.parse(JSON.stringify(notePayload[1]))
	
	const [noteId, setNoteId] = useState(noteCopy._id)
    const [noteTitle,setNoteTitle ] = useState(noteCopy.title)
	const [noteContent , setNoteContent ] = useState(noteCopy.content)
	const [noteComplete, setNoteComplete] = useState(noteCopy.completed)

	// expiresIn, created at, modified at 

	return(<BuilderBox>
	
		<BuilderForm>
		{false ? <LoadingBox><LoadingImg></LoadingImg></LoadingBox>  : <>
		<div style={{width: "100%"}} ><CancelButton src={back}></CancelButton></div>
		<BuilderTitle>{noteTitle}</BuilderTitle>
	
	    <TitleInput value={noteTitle} onChange={(e)=>setNoteTitle(e.target.value)} type="text" placeholder="Input the title here" ></TitleInput>
	    <ContentInput value={noteContent} onChange={(e)=> setNoteContent(e.target.value)} placeholder="What do you want to remember tomorrow?" rows="7" ></ContentInput>
	    <div>
	    	<p>When should the note expire?</p>
	    	<input type="date" required={true} pattern="\d{4}-\d{2}-\d{2}"></input>
	    	<input type="time" required={true}></input>
		</div>
		<div>    
	    	<input checked={noteComplete} onChange={()=>setNoteComplete(!(noteComplete))} id="never" type="checkbox" ></input>
			<label htmlFor="never">Never expires.</label>
		</div>
		<BuilderError error={false}>{'' || 'wrapper'}</BuilderError>
	    <SaveButton role="button">SAVE</SaveButton>
	   
	    </>}
	    
		</BuilderForm>
		
		</BuilderBox>)

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
    background-color: white;


`
const BuilderTitle = styled.h3`
	
	text-align: center;

`

const TitleInput = styled.input`
	background-color: white;
	border: none;
	border-bottom: 2px solid #2055c0;
	outline: none;
	

`

const ContentInput = styled.textarea`
	background-color: white;
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
const SaveButton = styled.div`
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
  
${({ loading }) => loading &&
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
