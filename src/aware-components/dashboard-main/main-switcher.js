import React from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import NoteBuilder from './note-builder'
import MainViewer from './main-viewer'

export default function MainSwitcher(props){
	const status = useSelector((state)=>state.mainstatus.value)
	
	switch(status){
		case 'view' :
			return(<MainViewer></MainViewer>);
			break;
		case 'create':
			return(<NoteBuilder></NoteBuilder>);
			break;
		default:
			return(<div>default</div>);
			break;
	}

		
}
