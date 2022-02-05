import React from 'react';
import styled from 'styled-components';
import { useMutation  } from '@apollo/client';
import { CHANGE_FOLDER_TOMAIN  } from '../querys';
import { useSelector, useDispatch } from 'react-redux';
import { mainChanged } from '../redux/actual-folder';
import { update } from '../redux/side-bar-slice';
import starNone from '../icons/star.svg';
import starLoad from '../icons/star-load.svg';
import starFull from '../icons/star-full.svg';


export default function Star(props){
    
	
	const dispatch = useDispatch()

	const handleIsMainChanged = () =>{dispatch(update());dispatch(mainChanged(true))}
	const [changeToMain , { loading }] = useMutation(CHANGE_FOLDER_TOMAIN ,{
		onCompleted : handleIsMainChanged,
	});
	const actualFolder = useSelector((state) => state.actualfolder.value )

	//window.alert(loading)

	const colorByDefault = actualFolder.isMain ? starFull  : starNone
	const finalSrc  = loading === true ? starLoad : colorByDefault
	
	
	
	return (
			<StarBox src={finalSrc} onClick={ ()=> changeToMain({variables:{ folderId:  actualFolder._id}}) }></StarBox>
		)
}
const StarBox  = styled.img`
	width:30px;
	height:30px;
	cursor: pointer;

`
