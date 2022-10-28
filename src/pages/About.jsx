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
    background: #e3eddf7;
                                                                                                                                           
`

const Title = styled.h3`
    font-size: 22px;
    width: 100%;
    color: #046A38;
    margin: 10px 0;
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
`

const FaqContainer = styled.ul`
margin: 20px 60px;
width: 80%;

`

const Item = styled.li`
    list-style: none;
    width: 100%;
    margin: 20px;
    padding: 10px;
    border-radius: 8px;
    background: #e3edf7;
    box-shadow: 6px 6px 10px -1px #555, -6px -6px 10px -1px rgba(255, 255, 255, 0.7);

   
    
    input[type="radio"]:checked + label + .content{
        max-height: 400px;
        padding: 10px 10px 20px;
    }

    input[type="radio"]:checked + label::after{
        content: "-";
    }
`

const Label = styled.label`
   width: 100%;
   display: flex;
   align-items: center;
   padding: 10px; 
   font-size: 18px;
   font-weight: 500;
   cursor: pointer;
   position: relative;

   &::after{
    content: "+";
    margin: 10px;
    font-size: 28px;
    font-weight: 700;
    position: absolute;
    right: 5px;

   }
`

const Input = styled.input`
    display: none;

`

const Content = styled.div`
    color: #555;
    padding: 0 10px;
    line-height: 26px;
    max-height: 0;
    overflow: hidden;
    transition: max-height: 0.5s, padding o.5s;
`

export const About = () => {
  return (
    <Container>
        <Title>LEARN WITH CODESPHERE</Title>
        <Description>
            The world is expanding digitally and with every aspect of our lives becoming digital,
            the demand for computer experts is skyrocketing each day. Therefore,
            having knowledge of programming languages has become crucial for every IT professional.
            In fact, programming languages sit at the epicentre of this ever-growing field of Computer Science.
            If you are a beginner in programming, learning a new language or a new framework is essential.
        </Description>
        <Span id="faq">FAQ</Span>
        <FaqContainer>
            <Item >
                <Input type="radio" name="accordion" id="first" ></Input>
                <Label htmlFor="first">Mobile</Label>
                <Content className="content">
                    <p>
                       Lorem ipsum, dolor sit amet consectetur adipisicing elit. 
                       Voluptate corporis nulla illum cumque inventore sint maxime error incidunt accusantium nisi. 
                       Possimus velit impedit eius voluptatum rerum vel ab itaque iste.
                    </p>
                </Content>
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
