import React from 'react';
import SideBar from './side-bar';
import '../style/dashboard.css'


export default function Dashboard(props){

	let token = localStorage.getItem('token')
	return (
			<div id='master'>
				<SideBar token={token}></SideBar>
			</div>
		)
}