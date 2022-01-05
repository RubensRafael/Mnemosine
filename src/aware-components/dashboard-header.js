import React, { useState, useEffect  } from 'react';
import styled from 'styled-components';
//import { useQuery } from '@apollo/client';
//import { LOGIN_DEV_USER } from '../querys';
//import client from '../request';
import { useSelector, useDispatch } from 'react-redux';
import star from '../icons/star.svg';
import trash from '../icons/trash.svg';
import time from '../icons/time.svg';


export default function DashboardHeader(props){
	const actualFolder = useSelector((state) => state.actualfolder.value);
	const [newName, setNewName  ] = useState({ name:'', editing:false  })
	
    useEffect(()=>{

		if( newName.editing === false && newName.name !== '' && newName.name !== actualFolder.name   ){
			window.alert('mande')
		}
	},[newName.editing]  )

	return (
			<DashboardHeaderBox>
				<HeaderFolderInfo>
					<form onSubmit={ ( e  ) => setNewName( { name: newName.name, editing: false   } )  } >
						<HeaderFolderInput type="text" autoFocus={ newName.editing  }  readOnly={ !( newName.editin ) }value={ newName.name ||  actualFolder.name} onChange={ ( e  ) => setNewName({ name:e.target.value, editing: true  })}  ></HeaderFolderInput>
					</form>
					<TesteImg src={star} alt="Logo"></TesteImg>
					<TesteImg onClick={ ()=> setNewName( { name: '', editing: true   } )  }  src={trash} alt="Logo"></TesteImg>
					<TesteImg src={time} alt="Logo"></TesteImg>
				</HeaderFolderInfo>
			</DashboardHeaderBox>
		)
}
const DashboardHeaderBox = styled.header`
	width: 100%;
	display: flex;
	justify-content: space-between;
	align-items: center;
`
const HeaderFolderInfo = styled.div`
	width: 100%;
	display:  flex;
	align-items: center;
	height: 10vh;
	background-color:white;
	
`
const HeaderFolderInput = styled.input`
	border: none;
	border: 2px solid gray;
	outline:none;
	font-size: 1.5rem;
	font-weight: bold;
	

`
const TesteImg = styled.img`
	width: 50px;
	height: 50px;
	cursor: pointer;
`