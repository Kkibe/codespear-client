import React from 'react';
import styled from 'styled-components';
import { Facebook, GitHub, Instagram, LinkedIn, Reddit, Telegram, Twitter, YouTube} from '@mui/icons-material';

const Container = styled.div`
    width: 100%;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
                                                                                                                                           
`

const Title = styled.h3`
    font-size: 22px;
    width: 100%;
    color: #046A38;
    margin: 20px 0;
    display: flex;
    align-items: center;
    justify-content: center;
`
const Description = styled.div`
    width: 90%;
    font-family: fantasy;
    padding: 20px 10px;
    margin: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 20px;
    font-size: 20px;
    line-height: 1.8em;
    @media screen and (min-width:800px) {
        width: 60%;
    }
`

const IconContainer = styled.div`
    width: 80%;
    margin-bottom: 30px;
    display: flex;
    align-content: center;
    justify-content: space-between;
    padding: 0 50px;
`

const Icon = styled.a`
    width: fit-content;
    height: fit-content;
    color: #7e7e7e;
    &:hover{
        cursor: pointer;
        box-shadow: 5px 5px 12px #06729c, -5px -5px 12px #06729c;
        border-radius: 6px;
    }
`
const Span = styled.span`
    width: 90%;
    font-weight: 400;
    font-size: 17px;
    text-align: center;
    margin: 20px;
    padding: 20px;
`

const FaqContainer = styled.div`
width: 80%;
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
.active{
    background-color: #ccc;
  }
`

const Item = styled.div`
width: 100%;

`

const Button = styled.button`
background-color: #eee;
color: #444;
cursor: pointer;
padding: 18px;
width: 100%;
text-align: left;
border: none;
outline: none;
transition: 0.4s;

&:hover {
    background-color: #ccc;
  }
`

const Panel = styled.div`
padding: 0 18px;
background-color: white;
display: none;
overflow: hidden;
cursor:pointer;
&:hover{
    background:#f0fefe;
  }
`

export const About = () => {
    const handleToggle = (e) => {
        e.classList.toggle("active");
        var panel = e.nextElementSibling;
        if (panel.style.display === "block") {
            panel.style.display = "none";
          } else {
            panel.style.display = "block";
        }
    }
  return (
    <Container>
        <Title>LEARN WITH CODESHERE</Title>
        <Description>
            The world is expanding digitally and with every aspect of our lives becoming digital,
            the demand for computer experts is skyrocketing each day. Therefore,
            having knowledge of programming languages has become crucial for every IT professional.
            In fact, programming languages sit at the epicentre of this ever-growing field of Computer Science.
            If you are a beginner in programming, learning a new language or a new framework is essential.
        </Description>
        <Span>FAQ</Span>
        <FaqContainer>
            <Item>
                <Button onClick ={handleToggle}>
                    Websites
                </Button>
                <Panel>
                   <p >W3Schools</p>
                   <p >freeCodeCamp</p>
                </Panel>
            </Item>
        </FaqContainer>
        <Span>Connect with us</Span>
        <IconContainer>
            <Icon><Facebook /></Icon>
            <Icon><Twitter /></Icon>
            <Icon><Instagram /></Icon>
            <Icon><LinkedIn /></Icon>
            <Icon><YouTube /></Icon>
            <Icon><GitHub /></Icon>
            <Icon><Reddit /></Icon>
            <Icon><Telegram /></Icon>
        </IconContainer>
    </Container>
  )
}
