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

	let handleIsMainChanged = (data) =>{dispatch(update());dispatch(mainChanged(true  ))}
	const [changeToMain , { data, loading, error }] = useMutation(CHANGE_FOLDER_TOMAIN  ,{
		onCompleted : handleIsMainChanged,
	});

	const colorByDefault = actualFolder.isMain ? "yellow" : "transp"
	const colorByLoad = loading ? "gray" : ''
	
	
	return (
			<StarBox  onClick={ changeToMain({ variables: { folderId:  actualFolder._id}} )} >{ colorByLoad || colorByDefault  }</StarBox>
		)
}
const StarBox  = styled.main`
	
	
	

`
const DashboardContainer = styled.main`
	display:  flex;
	flex-direction: column;
		
`