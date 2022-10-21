import { TimelapseOutlined } from '@mui/icons-material';
import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

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
    height: 100px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #2c2b2b;
`

const Title = styled.h1`
    font-size: 24px;
    font-weight: 600;
    color: #f9f9f9;
`

const Posts = styled.div`
    width: 100vw;
    min-height: 90vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`

const Post = styled.a`
    width: 80%;
    height: fit-content;
    min-height: 150px;
    padding: 10px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: space-between;
    padding: 10px 10px;
    margin: 10px;
    box-shadow: 2px 2px 2px 2px rgba(0, 0, 0, 0.4);
    cursor: pointer;
    border-radius: 5px;
    position: relative;
    text-decoration: none;

    &:hover{
        background-color:  #ebf4fc;
    }

    @media screen and (max-width: 780px){
        width: 95%;
    }

`
const PostTitle = styled.h1`
    font-size: 18px;
    font-weight: 600;
    color: #046A38;

    @media screen and (max-width: 780px){
        font-size: 17px;
    }

`

const PostContent = styled.div`
    line-height: 1.2rem;
    color: #2c2b2b;

    @media screen and (max-width: 780px){
        line-height: normal;
    }
`

const InfoContainer = styled.div`
width: 100%;
padding: 5px;
font-size: 14px;
display: flex;
align-items: center;
justify-content: space-between;
color: #7e7e7e;
`

const Author = styled.div`
width: 100%;
flex: 1;
padding: 5px;
font-size: 13px;
display: flex;
align-items: center;
justify-content: flex-start;
`
const Date = styled.span`
    width: 100%;
    padding: 5px;
    font-size: 12px;
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: flex-end;
`
export const Blogs = () => {
    return (
        <Container>
            <Flyer>
                <Title>READ FROM HERE</Title>
            </Flyer>
            <Posts>
                <Post href='' title='lorem ipsum'>
                    <PostTitle>Lorem ipsum dolor sit, amet consectetur adipisicing elit.</PostTitle>
                    <PostContent>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt enim neque cum voluptates. Quo exercitationem officiis illo natus temporibus cumque harum tempora! Voluptatibus, quas suscipit ad voluptates sapiente totam sed!...</PostContent>
                    <InfoContainer><Author>By Kibet</Author><Date> <TimelapseOutlined/> 12 <sup>th</sup> May 2022</Date></InfoContainer>
                </Post>
            </Posts>
        </Container>
    );
}
