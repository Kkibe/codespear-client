import { Google, Facebook} from '@mui/icons-material';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { signUp, updateUser } from '../firebase';

const Container = styled.div`
    position: relative;
    width: 100%;
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

`

const Form = styled.form`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width: 400px;
    height: 100%;
`

const IconContainer = styled.div`
    width: 90%;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0px 20px;

`

const Input = styled.input`
    width: 350px;
    height: 40px;
    margin: 10px 0;
    padding-left: 25px;
    font-size: 13px;
    letter-spacing: 0.15px;
    border: none;
    outline: none;
    font-family: "Montserrat", sans-serif;
    background-color: #ecf0f3;
    transition: 0.25s ease;
    border-radius: 8px;
    box-shadow: inset 2px 2px 4px #d1d9e6, inset -2px -2px 4px #f9f9f9;

    &:focus {
    box-shadow: inset 4px 4px 4px #d1d9e6, inset -4px -4px 4px #f9f9f9;
  }
`

const Span = styled.span`
    margin-top: 30px;
    margin-bottom: 12px;
`

const FormLink = styled.a`
    color: #06729c;
    *{
      color: inherit;
    }
`
const Title = styled.h1`
    font-size: 34px;
    font-weight: 700;
    line-height: 3;
    color: #2c2b2b;
`

const Button = styled.button`

    width: 150px;
    height: 40px;
    border-radius: 10px;
    margin-top: 20px;
    font-size: 17px;
    font-weight: 500;
    background-color: ${(props) => props.bg ? props.bg : "#06729c"};
    color: #f9f9f9;
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    
    border: none;
    outline: none;
    &:hover{
      background: #4B70E2;
      cursor: pointer;
    }

    span{
      height: 100%;
      text-align: center;
    }
`
export const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  
  const handleRegister = (e) => {
    e.preventDefault();
    var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    var passw = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;
    if(email && password) {
        if(email.match(mailformat)){
          if(password.match(passw)) {
            const user = signUp(email, password);
            if(!user.displayName) {
              updateUser(name);
            } else{
              return;
            }
           } else {
            alert('Wrong password format!')
            return ; 
           }
         } else {
           alert("You have entered an invalid email address!")
           return ;
        }
    } else {
      alert('enter email and password');
      return;
    }
  } 
  return (
    <Container>
            <Form onSubmit={handleRegister}>
                <Title>Create Account</Title>
                <Input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)}/>
                <Input type="text" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required/>
                <Input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required/>
                <Button type='submit'>SIGN UP</Button>
                <Span>
                  Continue With:
                </Span>
                <IconContainer>
                  <Button bg="#f14141"><Span>Google</Span><Google /> </Button>
                  <Button bg="#4B70E2"><Span>Facebook</Span><Facebook /></Button>
                </IconContainer>
            </Form>
            <Span>
              Already registered? Login <FormLink><Link to='/login'>here</Link></FormLink>
            </Span>
    </Container>
  )
}
