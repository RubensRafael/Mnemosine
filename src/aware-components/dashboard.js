import React from 'react';
import MainSwitcher from './dashboard-main/main-switcher';
import SideBar from './side-bar';
import DashboardHeader from './dashboard-header';
import styled from 'styled-components';
//import { useQuery } from '@apollo/client';
//import { LOGIN_DEV_USER } from '../querys';
//import client from '../request';

export default function Dashboard(props){


	
	localStorage.setItem('token',"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxYzc3ZjFhMjczZGJjNGU3ZjY4NjliMiJ9.kKe3bM-OCfSRQgBVC8QcCvWxhE2d2l9aDxBFZTgKOOM")
	
	return (
			<DashboardBox>
				
				<DashboardHeader></DashboardHeader>
				<MainSwitcher></MainSwitcher>
				<SideBar></SideBar>
			</DashboardBox>
		)
}
const DashboardBox = styled.main`
	
	margin-top: 10vh;
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
@media (max-height: 800px) {
	grid-template-columns : 100% ;
	grid-template-rows: 10vh 70vh 10vh;
}
	
`
