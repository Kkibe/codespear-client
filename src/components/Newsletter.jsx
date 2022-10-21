import { Send } from '@mui/icons-material';
import React from 'react';
import styled  from 'styled-components';

const Container = styled.div`
    width: 100%;
    height: 200px;
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
    position: relative;
    background: #000000e6;
`

const Title = styled.h1`
  color: #f9f9f9;
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 40px;
  position: relative;
`

const Text = styled.p`
  margin: 14px 20px;
  font-size: 14px;
  color: #7e7e7e;
  line-height: 28px;
`

const InputContainer = styled.div`
  width: 300px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  position: relative;
`

const Input = styled.input`
  flex: 1;
  width: 100%;
  padding: 14px 28px;
  background: #2c2b2b;
  border: 1px solid #2c2b2b;
  color: #f9f9f9;
`

const Button = styled.button`
    background: #89e97c;
    padding: 13px 20px;
    border: none;
    cursor: pointer;
`

export const Newsletter = () => {
  return (
    <Container>
        <Title>Subscribe</Title>
        <Text>Don’t miss out on juiciest news! Fill the form below to subscribe to our new feeds.</Text>
        <InputContainer>
          <Input type="email" placeholder="example@gmail.com"/>
          <Button>
            <Send style={{
              color: '#fff',
              fontSize: '22px',
              transform: 'rotate(-6deg)'
            }}/>
          </Button>
          
        </InputContainer>
    </Container>
  )
}
