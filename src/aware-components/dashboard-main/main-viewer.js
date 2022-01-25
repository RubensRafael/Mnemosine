import React,{useEffect, useState} from 'react';
import styled from 'styled-components';
import { useQuery } from '@apollo/client';
import { LIST_NOTES } from '../../querys';
import { useSelector } from 'react-redux';
import Card from './note-card'


export default function MainViewer(props){
	const actualFolder = useSelector((state)=>state.actualfolder.value)
	let folderCopy = JSON.parse(JSON.stringify(actualFolder))
	const [forcedLoad, setForcedLoad] = useState(false)
	const {loading, error, data} = useQuery(LIST_NOTES, {variables:{
   		folder_id: folderCopy._id,
   		fetchPolicy: "no-cache"
	}})
	
	
	let noteList = [];
	if(data){
		
		noteList = data.getUser.mainOrActualFolder.notes
	}
return (
	<Viewer>
    {
       loading ? '' : noteList.map((note)=><Card key={note._id} note={note}></Card>)

    }
	</Viewer>
)


	
	
}
const Viewer = styled.main`

	display:flex;
	overflow: auto;
	flex-wrap: wrap;
	justify-content: space-between;

`
