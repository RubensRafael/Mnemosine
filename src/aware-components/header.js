import React,{useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleTheme } from '../redux/theme-slice';
import styled from 'styled-components';
import logo from '../icons/logo.png';
import sun from '../icons/sun.svg';
import moon from '../icons/moon.svg';
import logout from '../icons/logout.svg';
import { useNavigate } from 'react-router-dom';


export default function Header(props){
	const theme = useSelector((state)=>state.theme.value)
	const dispatch = useDispatch()
	const [toMoon, setToMoon] = useState(false)
	const navigate = useNavigate()
	
	return (
			<HeaderBox theme={theme}>
				<LogoIcon src={logo}></LogoIcon>
				<UtilsBox>
					<ThemeIcon onClick={()=>{setToMoon(!(toMoon));dispatch(toggleTheme())}} src={toMoon ? moon : sun}></ThemeIcon>
					<LogoutIcon onClick={()=>{localStorage.removeItem('token');navigate('/');window.location.reload();}}src={logout}></LogoutIcon>
				</UtilsBox>
			</HeaderBox>
		)
}
const HeaderBox = styled.header`
	
	width: 100%;
	height:10vh;
	display:flex;
	justify-content: space-between;
	align-items: center;
	border-bottom: 2px solid #2055c0;
	background-color:  ${({theme}) => theme === true ? "#272727" : "white"};

	
`
const UtilsBox = styled.div`
	
	
	display:flex;
	justify-content: space-between;
	align-items: center;
	width:100px;

	
`

const LogoIcon = styled.img`

	height:40px;
	
`
const ThemeIcon = styled.img`
	height:25px;
	cursor: pointer;


	
`
const LogoutIcon = styled.img`
	height:30px;
	cursor: pointer;
	
`
