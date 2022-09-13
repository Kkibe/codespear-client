import React from 'react';
import styled from 'styled-components';
import {NavLink, Link } from "react-router-dom";

const Container = styled.div`
    width: 100vw;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

`

const Flyer = styled.div`
    width: 100vw;
    height: 200px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: rgba(0, 0, 0, 0.9);
    border-bottom:1px solid darkcyan;
`

const Title = styled.h1`
    font-size: 24px;
    font-weight: 600;
    color: white;
`

const Posts = styled.div`
    width: 100vw;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`

const Post = styled.div`
    width: 90%;
    min-height: 120px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    padding: 10px 10px;
    margin: 10px;
    box-shadow: 2px 2px 2px 2px rgba(0, 0, 0, 0.4);
    cursor: pointer;
    border-radius: 5px;
    position: relative;
    &:hover{
        background-color: rgb(255, 244, 244);
    }

    @media screen and (max-width: 780px){
        width: 95%;
    }

`
const PostTitle = styled.h1`
    font-size: 20px;
    font-weight: 600;
    color: darkcyan;

    @media screen and (max-width: 780px){
        font-size: 18px;
    }

`

const PostContent = styled.div`
    line-height: 1.4rem;

    @media screen and (max-width: 780px){
        line-height: normal;
    }
`

const Date = styled.span`
    width: 100%;
    padding: 5px;
    font-size: 14px;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    color: darkcyan;
`
export const Blogs = () => {
    return (
        <Container>
            <Flyer>
                <Title>READ FROM HERE</Title>
            </Flyer>
            <Posts>
            <NavLink to='1' className='link'>
                <Post>
                    <PostTitle>Lorem ipsum dolor sit, amet consectetur adipisicing elit.</PostTitle>
                    <PostContent>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt enim neque cum voluptates. Quo exercitationem officiis illo natus temporibus cumque harum tempora! Voluptatibus, quas suscipit ad voluptates sapiente totam sed!...</PostContent>
                    <Date>12 <sup>th</sup> May 2022</Date>
                </Post>
                </NavLink>
                <Post>
                    <PostTitle>Lorem ipsum dolor sit, amet consectetur adipisicing elit.</PostTitle>
                    <PostContent>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt enim neque cum voluptates. Quo exercitationem officiis illo natus temporibus cumque harum tempora! Voluptatibus, quas suscipit ad voluptates sapiente totam sed!...</PostContent>
                    <Date>12 <sup>th</sup> May 2022</Date>
                </Post>
            </Posts>
        </Container>
    );
}
