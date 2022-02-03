import React from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import {setDetail,setView} from '../../redux/main-status-slice';
import back from '../../icons/back.svg';
import edit from '../../icons/edit.svg';


export default function NoteDetail(props){
	
  const dispatch = useDispatch()
	const notePayload = useSelector((state)=>state.mainstatus.value)
	let noteCopy  = JSON.parse(JSON.stringify(notePayload[1]))
	

	
	

	return(<BuilderBox>
	
		<BuilderContainer>
		<>
		<NoteHeader>
			<CancelButton onClick={()=>dispatch(setView())} src={back}></CancelButton>
			<EditButton onClick={()=>dispatch(setDetail(noteCopy))} src={edit}></EditButton>
		</NoteHeader>
		<BuilderTitle>{noteCopy.title}</BuilderTitle>
		<h3>
			{noteCopy.content}
		</h3>
	    
	   
	    </>
	    
		</BuilderContainer>
		
		</BuilderBox>)

}

const BuilderBox = styled.main`
	display: flex;
    justify-content: center;


`
const BuilderContainer = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: space-evenly;
	border-right: solid 2px #2055c0;
	border-left: solid 2px #2055c0;
	padding: 3px;
  width: 60%;
  background-color: white;
  overflow: auto;
  justify-content: flex-start;


`
const BuilderTitle = styled.h3`
	
	text-align: center;
	border-bottom: solid 2px #2055c0;
	margin-bottom: 10px;

`

const NoteHeader = styled.div`
	width: 100%;
	display: flex;
	justify-content: space-between;
	

`

const EditButton = styled.img`
	cursor: pointer;
	width: 30px;


`

const CancelButton = styled.img`
	
	cursor: pointer;

	
`


