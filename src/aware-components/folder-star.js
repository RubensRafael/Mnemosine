import React from 'react';
import styled from 'styled-components';
import { useMutation  } from '@apollo/client';
import { CHANGE_FOLDER_TOMAIN  } from '../querys';
import { useSelector, useDispatch } from 'react-redux';
import { mainChanged } from '../redux/actual-folder';
import { update } from '../redux/side-bar-slice';

export default function Star(props){
    
	const actualFolder = useSelector((state) => state.actualfolder.value )
	const dispatch = useDispatch()

	const handleIsMainChanged = () =>{dispatch(update());dispatch(mainChanged(true))}
	const [changeToMain , { data, loading, error }] = useMutation(CHANGE_FOLDER_TOMAIN  ,{
		onCompleted : handleIsMainChanged,
	});

	//window.alert(loading)

	const colorByDefault = actualFolder.isMain ? "yellow" : "transp"
	const status  = loading === true ? "gray" : colorByDefault
	
	
	
	return (
			<StarBox  onClick={ changeToMain({ variables: { folderId:  actualFolder._id}} )} >{ status }</StarBox>
		)
}
const StarBox  = styled.div`
	
	
	

`
const DashboardContainer = styled.main`
	display:  flex;
	flex-direction: column;
		
`