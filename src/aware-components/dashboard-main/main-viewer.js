import React,{useEffect} from 'react';
import styled,{keyframes} from 'styled-components';
import { useQuery } from '@apollo/client';
import { LIST_NOTES } from '../../querys';
import { useSelector } from 'react-redux';
import Card from './note-card'
import load from '../../icons/loading.svg';



export default function MainViewer(props){
	const theme = useSelector((state)=>state.theme.value)
	const actualFolder = useSelector((state)=>state.actualfolder.value)
	const update = useSelector((state) => state.sidebarupdate.value)
	let folderCopy = JSON.parse(JSON.stringify(actualFolder))
	
	const {loading, data, refetch} = useQuery(LIST_NOTES, {variables:{
   		folder_id: folderCopy._id,
   		notifyOnNetworkStatusChange: true,
   		fetchPolicy: "no-cache"
	}})
	//eslint-disable-next-line
	useEffect(()=>{refetch()},[update])
	
	
	let noteList = [];
	if(data){
		
		noteList = JSON.parse(JSON.stringify(data.getUser.mainOrActualFolder.notes))
	}
return (
	<Viewer theme={theme} >
    {
       loading ? <LoadingIcon src={load}></LoadingIcon> : noteList.reverse().map((note)=><Card key={note._id} note={note}></Card>)

    }
	</Viewer>
)


	
	
}
const Viewer = styled.div`

	 display: flex;
    flex-wrap: wrap;
    overflow: auto;
    justify-content: space-around;
    padding: 10px;
    transition : .2s;
    background-color:  ${({theme}) => theme === true ? "#272727" : "white"};
    color:  ${({theme}) => theme === true ? "white" : "black"};

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
const LoadingIcon = styled.img`
	width: 50px;
	height: 50px;
	align-self: center;
	animation: ${Loading} infinite 0.5s;
	
`
