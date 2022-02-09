import React from 'react';
import styled from 'styled-components';
import LandImg from '../icons/land.png';
import logo from '../icons/logo.png';


export default function Landing(props){
	return(
			<LandingBox>
				<LandingHeader>
					<LogoIcon src={logo} alt='logo'></LogoIcon>
					<ButtonsBox>
						<SignInButton>Sign In</SignInButton>
						<SignUpButton>Sign Up</SignUpButton>
					</ButtonsBox>
				</LandingHeader>
				<LandingMain>
					<LandingText>
						<h1>Welcome to Mnemosine</h1>
						<h3>Write.Organize. And never forget.</h3>
					</LandingText>
					<LandingImgBox>
						<LandingImg src={LandImg} alt="Landing page image"></LandingImg>
					</LandingImgBox>
				</LandingMain>
			</LandingBox>

		)

		
}

const LandingBox = styled.div`

	display: flex;
	flex-direction: column;
	height: 100vh;
	width: 100%;
	background-color: #f6f6f6;

`
const LandingHeader= styled.header`

	display: flex;
	height: 15vh;
	width: 100%;
	justify-content: space-between;
	align-items: center;
	border-bottom: 2px solid #2055c0;
	padding: 0px 7px 0px 7px;
	min-height: 52px;

`

const LandingMain = styled.main`

	display: flex;
	height: 85vh;
	width: 100%;
    justify-content: space-around;
	align-items: center;
	min-height: 600px;

    @media(max-width: 768px){
    	flex-direction: column;
    }
	

`

const LandingText = styled.div`

	display: flex;
    flex-direction: column;
    justify-content: center;
    

    @media(max-width: 768px){
    	text-align: center;
    	
    }

    @media(min-width: 1440px){
    	font-size: 2rem;
    	
    }

`
const LandingImgBox = styled.div`

	display: flex;
	
	

   
`

const LandingImg = styled.img`

	object-fit: cover;
    width: 100%;
    max-width: 500px;
    height: 100%;

    @media(min-width: 1440px){
    	max-width: 800px;
    	
    }
    @media(min-width: 2560px){
    	max-width: none;
    	
    }
   
   
`

const LogoIcon = styled.img`
	height:50px;

	@media(min-width: 1440px){
    	height:70px;
    	
    }
`


const ButtonsBox = styled.div`
	display:flex;
	justify-content: space-between;
	align-items: center;
	width:130px;
	@media(min-width: 1440px){
    	width:200px;
    	
    }

`
const SignInButton = styled.button`
	display: block;
    border: none;
    background: transparent;
    color: #2055c0;
    font-weight: bold;
    cursor: pointer;
    padding: 5px;

    @media(min-width: 1440px){
    	font-size : 1.5rem
    	
    }

`


const SignUpButton = styled.button`
	display: block;
    border: none;
    background: #2055c0;
    color: white;
    font-weight: bold;
    cursor: pointer;
    padding: 5px;

    @media(min-width: 1440px){
    	font-size : 1.5rem
    	
    }

`