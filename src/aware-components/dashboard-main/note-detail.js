import React,{useState} from 'react';
import styled,{css, keyframes} from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import {setView, setInspect} from '../../redux/main-status-slice'
import { useQuery, useMutation } from '@apollo/client';
import { GET_MORE_NOTE_INFO, UPDATE_NOTE} from '../../querys';
import back from '../../icons/back.svg';
import logo from '../../icons/logo.png';


export default function NoteDetail(props){
	
  const dispatch = useDispatch()
  const theme = useSelector((state)=>state.theme.value)
	const notePayload = useSelector((state)=>state.mainstatus.value)
	let noteCopy  = JSON.parse(JSON.stringify(notePayload[1]))
	const [noteId] = useState(noteCopy._id)
  const [noteTitle,setNoteTitle ] = useState(noteCopy.title)
	const [noteContent , setNoteContent ] = useState(noteCopy.content)
	const [noteComplete, setNoteComplete] = useState(noteCopy.completed)
	const [noteNever, setNoteNever] = useState(false)
	const [noteExpiresDay, setNoteExpiresDay] = useState(noteCopy.completed)
	const [noteExpiresTime, setNoteExpiresTime] = useState("00:00")
	const [noteCreatedAt, setNoteCreatedAt] = useState('')
	const [noteLastMod, setNoteLastMod] = useState("")
	const [inputError, setInputError] = useState('')

	//função para normalizar pattern no input 
	const formatDate = (initial)=>{

    
    	let day = String(initial.getDate())
    	let month = String(initial.getMonth() + 1)
    	let year = String(initial.getFullYear())
    	return `${year}-${month.length === 1 ? "0" + month : month}-${day.length === 1 ? "0" + day : day}`
   
    
	}

    const handleQuery = (data)=>{

    	
    	let {expiresIn , createdAt , lastModification} = data.getOneNote;
    	if(lastModification !== null){setNoteLastMod(new Date(Number(lastModification.when)).toLocaleString())}
    	setNoteCreatedAt(new Date(Number(createdAt)).toLocaleString())
			if(expiresIn === "Never"){
				setNoteNever(true)
			}else{
				let expireDate = new Date(Number(expiresIn))
				setNoteExpiresDay(formatDate(expireDate))
				let hour = String(expireDate.getHours()).length === 1 ? '0'+String(expireDate.getHours()) : String(expireDate.getHours())
				let minutes = String(expireDate.getMinutes()).length === 1 ? '0'+String(expireDate.getMinutes()) : String(expireDate.getMinutes())
				setNoteExpiresTime(String(`${hour}:${minutes}`))
				
		}
	}
	const queryResponse = useQuery(GET_MORE_NOTE_INFO,{
		variables:{noteId:noteId},
		onCompleted: handleQuery,
		fetchPolicy: 'no-cache'
	})

	const handleMutation = ()=>{dispatch(setView())}
	const [updateNote, mutationResponse] = useMutation(UPDATE_NOTE,{
		onCompleted: handleMutation,
		fetchPolicy: 'no-cache'
	})

	// expiresIn, created at, modified at 

	const handleSubmit = (e) =>{
	

    let titleEqual = noteTitle === noteCopy.title ? undefined : noteTitle
		let contentEqual = noteContent === noteCopy.content ? undefined : noteContent
		let completeEqual = noteComplete === noteCopy.completed ? undefined : noteComplete

    
   	if(titleEqual === '' || contentEqual === ''){
   		setInputError("Fill all the fields")
   		
   	}else if(noteNever){
       updateNote({variables:{
       	title: titleEqual,
       	content : contentEqual,
       	complete: completeEqual,
       	noteId: noteId,
       	modifiedAt: String(new Date().getTime()),
       	expiresIn: 'Never',}}
       	)
		}else if(!(noteNever) && (noteExpiresDay === '' || noteExpiresTime === '')){
		setInputError("Fill all the fields")
		}else{  
     let dateToExpiresIn;
     try{
       dateToExpiresIn = new Date(noteExpiresDay + ' ' + noteExpiresTime)
       if(isNaN(dateToExpiresIn.getTime())){throw new RangeError() }
     }catch(e){
     	if(e instanceof RangeError){
          setInputError("Invalid date or time")
          } 
     }


    updateNote({variables:{
     	title: titleEqual,
      content : contentEqual,
      complete: completeEqual,
      noteId: noteId,
      modifiedAt: String(new Date().getTime()),
      expiresIn: dateToExpiresIn,
    }},
    )

    }

}
	if(mutationResponse.error){
		console.log(JSON.stringify(mutationResponse.error))
	}
	return(<BuilderBox>
	
		<BuilderForm theme={theme}>
		{mutationResponse.loading  ? <LoadingBox isLoading={mutationResponse.loading}><LoadingImg src={logo}></LoadingImg></LoadingBox>  : <>
		<div style={{width: "100%"}} ><CancelButton onClick={()=>dispatch(setInspect(noteCopy))} src={back}></CancelButton></div>
		<BuilderTitle>{noteTitle}</BuilderTitle>
	
	    <TitleInput theme={theme} value={noteTitle} onChange={(e)=>setNoteTitle(e.target.value)} type="text" placeholder="Input the title here" ></TitleInput>
	    <ContentInput theme={theme} value={noteContent} onChange={(e)=> setNoteContent(e.target.value)} placeholder="What do you want to remember tomorrow?" rows="7" ></ContentInput>
	    <div>
	    	<p>When should the note expire?</p>
	    	<input readOnly={noteNever || queryResponse.loading } type="date" value={noteExpiresDay} onChange={(e)=> setNoteExpiresDay(e.target.value)} required={true} pattern="\d{4}-\d{2}-\d{2}"></input>
	    	<input readOnly={noteNever || queryResponse.loading } type="time" value={noteExpiresTime} onChange={(e)=> setNoteExpiresTime(e.target.value)} required={true}></input>
		</div>
		<CheckContainer>    
	    	<div>
	    		<input readOnly={queryResponse.loading} checked={noteNever} onChange={()=>setNoteNever(!(noteNever))} id="never" type="checkbox" ></input>
					<label htmlFor="never">Never expires</label>
				</div>
				<div>
					<input checked={noteComplete} onChange={()=>setNoteComplete(!(noteComplete))} id="complete" type="checkbox" ></input>
					<label htmlFor="complete">Complete</label>
				</div>
		</CheckContainer>
		<DateInfoBox>
			<p>{`Created At: ${noteCreatedAt}`}</p>
			<p>{noteLastMod ? `Last Modification: ${noteLastMod}` : ''}</p>
		</DateInfoBox>
		<BuilderError error={inputError}>{inputError || 'wrapper'}</BuilderError>
	  <SaveButton role="button" onClick={handleSubmit}>SAVE</SaveButton>
	   
	    </>}
	    
		</BuilderForm>
		
		</BuilderBox>)

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
  width: 60%;
  background-color:  ${({theme}) => theme === true ? "#272727" : "white"};
  color:  ${({theme}) => theme === true ? "white" : "black"};

`
const BuilderTitle = styled.h3`
	
	text-align: center;

`

const TitleInput = styled.input`
	background-color: white;
	border: none;
	border-bottom: 2px solid #2055c0;
	outline: none;
	background-color:  ${({theme}) => theme === true ? "#272727" : "white"};
  color:  ${({theme}) => theme === true ? "white" : "black"};
	

`

const ContentInput = styled.textarea`
	background-color: white;
	border: 2px solid #2055c0;
	outline: none;
	padding : 2px;
	background-color:  ${({theme}) => theme === true ? "#272727" : "white"};
	color:  ${({theme}) => theme === true ? "white" : "black"};

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
const DateInfoBox = styled.div`
    width: 100%;
    display: flex;
    font-size: 0.8rem;
    justify-content: space-evenly;
    color: gray;

`

const CheckContainer = styled.div`
    width: 100%;
    display: flex;
   
    justify-content: space-evenly;
    

`