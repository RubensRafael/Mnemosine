import React, {useState} from 'react';
import styled from 'styled-components';
import LandImg from '../icons/land.png';
import logo from '../icons/logo.png';
import { useMutation  } from '@apollo/client';
import { CREATE_USER  } from '../querys';
import { useNavigate } from 'react-router-dom';


export default function Landing(props){
	const [display, setDisplay] = useState('')

	const showRegister = ()=>{
		setDisplay('register')
	}

	const showDefault = ()=>{
		setDisplay('')
	}
	return(
			<LandingBox>
				<LandingHeader>
					<LogoIcon src={logo} alt='logo'></LogoIcon>
					<ButtonsBox>
						{display === 'register' ? <Register back={showDefault}></Register> : <SignUpButton onClick={showRegister} >Sign Up</SignUpButton>}
						{<SignInButton>Sign In</SignInButton>}
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

function Register({back}){
	const navigate = useNavigate()
	const [name, setName] = useState('')
	const [email, setEmail] = useState('')
	const [pw, setPw] = useState('')
	const [inputError,setInputError] = useState('')

	const handleError = (error)=>{setInputError(error.networkError.result.errors[0].message)}
	const handleUserCreated = (data)=>{localStorage.setItem('token',data.createUser);navigate('/dashboard')}
	const [createUser,{loading}] = useMutation(CREATE_USER ,{
		onCompleted : handleUserCreated,
		onError: handleError,
		fetchPolicy: 'no-cache'
	});



	const handleSubmit = (e)=>{
			e.preventDefault()
			setInputError('')
			
			//eslint-disable-next-line
			let regex = new RegExp("^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$")

			if(!(regex.test(email)) || email.length < 1){
				//se o email não passar
				setInputError('Invalid Email')
			}else if(name.length < 1){
				setInputError('Fill up all fields')
			}else if(pw.length < 6){
				setInputError('Password is too short')
			}else{
				createUser({variables:{
					name:name,
					email:email,
					password:pw
				}})
			}
		}

	
		
		
	
	return(
			<LadingPopUp>

						<RegisterForm>

							{loading ? <div>carregnado</div> : <><h3 style={{textAlign:"center",width:'100%',borderBottom:"solid 2px #2055c0"}} >Fill up the fields, to register an account</h3>
							<LandInput onChange={(e)=>{setInputError('');setName(e.target.value)}} value={name} placeholder="Your Name" type="text"></LandInput>
							<LandInput onChange={(e)=>{setInputError('');setEmail(e.target.value)}} value={email} placeholder="email@host.com" type="email"></LandInput>
							<LandInput onChange={(e)=>{setInputError('');setPw(e.target.value)}} value={pw} placeholder="Your password" type="password"></LandInput>
							<RegisterWarn error={inputError}>{inputError || 'break'}</RegisterWarn>
							<PopUpButtonBox>
								<CancelButton onClick={back}>Cancel</CancelButton>
								<ConfirmButton onClick={handleSubmit}>Confirm</ConfirmButton>
							</PopUpButtonBox></>}
						</RegisterForm>

			</LadingPopUp>	

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
const SignUpButton = styled.button`
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


const SignInButton = styled.button`
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


const LadingPopUp = styled.div`
	display:  flex;
	position: fixed;
	top:0%;
	left:0%;
	justify-content: space-around;
	align-items: center;
	height: 100vh;
	width: 100vw;
	background-color:rgba(0,0,0,0.5);

`

const RegisterForm = styled.form`
	display:  flex;
	flex-direction: column;
	justify-content: space-evenly;
	align-items: center;
	width: 60%;
	height: 350px;
    background-color: white;

`

const LandInput = styled.input`
	width: 90%;
	border-bottom : 2px solid #2055c0;


`

const RegisterWarn = styled.p`
	width: 100%;
	color : red;
	text-align: center;
	transition: 0s;
	visibility : ${({error})=> error ? 'visible' : 'hidden'} ;


`


const PopUpButtonBox = styled.div`
	display:  flex;
	justify-content: space-evenly;
	width:100%;
	

`

const CancelButton = styled(SignUpButton)`
	
	

`
const ConfirmButton = styled(SignInButton)`
	
	

`


