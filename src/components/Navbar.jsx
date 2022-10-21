import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
    width: 100%;
    height: 80px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 20px;
    background-color: #2c2b2b;
    color: white;
    position: relative;
`

const Item = styled.a`
    font-size: 20px;
    text-decoration: none;
    color: #ebf4fc;
    &:hover{
        cursor: pointer;
        text-decoration: underline;
    }
`

export const Navbar = () => {
  return (
    <Container className='header'>
        
        <Item>JavaScript</Item>
        <Item>Python</Item>
        <Item>Java</Item>
        <Item>C</Item>
        <Item>C++</Item>
        <Item>jQuery</Item>
        <Item>PHP</Item>
        <Item>MySQL</Item>
    </Container>
  )
}
