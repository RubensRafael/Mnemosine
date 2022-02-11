import React,{useEffect} from 'react';
import MainSwitcher from './dashboard-main/main-switcher';
import SideBar from './side-bar';
import DashboardHeader from './dashboard-header';
import Header from './header';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';


export default function Dashboard(props){
	
	const navigate = useNavigate()
	
	useEffect(()=>{
		if(localStorage.getItem('token') === null){navigate('/')}

	})
	//localStorage.setItem('token',"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxYzc3ZjFhMjczZGJjNGU3ZjY4NjliMiJ9.kKe3bM-OCfSRQgBVC8QcCvWxhE2d2l9aDxBFZTgKOOM")
	
	
	return (
		<>
			<Header></Header>
			<DashboardBox>
				<DashboardHeader></DashboardHeader>
				<MainSwitcher></MainSwitcher>
				<SideBar></SideBar>
			</DashboardBox>
		</>
		)
}
const DashboardBox = styled.main`
	
	
	height: 90vh;
	width: 100%;
	display: grid;
	grid-template-columns: 15% 85%;
	grid-template-rows: 15vh 75vh;
	background-color : gray;
	
	
	
	
	@media (max-width: 992px) {
	grid-template-columns : 100% ;
	grid-template-rows: 15vh 60vh 15vh;
}

	
`
