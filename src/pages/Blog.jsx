import React from 'react';
import styled from 'styled-components';
import Image from '../assets/livescore-results-750x430.jpg';
import {Link} from "react-router-dom";
import {ArrowForward } from '@mui/icons-material';

const Container = styled.div`
    display: flex;
    align-items: flex-start;
    justify-content: space-evenly;
    margin-top: 50px;
    @media screen and (max-width: 780px){
        flex-direction: column;
        align-items: center;
        *{
            width: 100%;
        }
    }
`

const Post = styled.div`
    width: 70vw;
    margin: 0px 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    @media screen and (max-width: 780px){
        width: 95vw;
    }
`

const Title = styled.h1`
    padding-right: 10px;
    font-size: 24px;
    font-weight: 600;
    color: darkcyan;
    margin-bottom: 20px;
    margin-top: 10px;
`

const Content = styled.div`
    width: 90%;
    font-size: 16px;
    font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
    line-height: 1.4rem;
`

const Info = styled.div`
    width: 90%;
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    margin-top: 20px;
`

const Author = styled.span``

const Date = styled.span``

const Comments = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-top: 20px;
`
const CommentsTitle = styled.h1`
    font-size: 18px;
    font-weight: 600;
    color: darkcyan;
`
const Compose = styled.div`
    width: 60%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 5px 5px;
    border: 1px solid rgba(0, 0, 0, 0.4);
    border-radius: 10px;
    @media screen and (max-width: 570px){
        width: 90%;
    }
`

const ComposeImg = styled.img`
    width: 50px;
    height: 50px;
    border-radius: 50%;
    object-fit: fill;
    object-position: center;
`
const ComposeInput = styled.input`
    width: 90%;
    height: 45px;
    border-radius: 0px 10px 10px 0px;
    border: none ;
    outline: none;
    padding: 5px;
`

const AllComments = styled.div`
    width: 80%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-top: 20px;
    @media screen and (max-width: 570px){
        width: 90%;      
    }
`

const Comment = styled.div`
    width: 100%;
    min-height: 60px;
    display: flex;
    align-items: center;
    justify-content: space-between;
`

const Message = styled.div`
    width: 80%;
`

const RelatedPosts = styled.div`
    width: 30%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-right: 10px;
    @media screen and (max-width: 780px){
        width: 100%;
    }

    @media screen and (max-width: 570px){
        width: 100%;
    }
`
const Related = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;
    @media screen and (max-width: 780px){
        flex-direction: row;
        width: 100%;
        overflow: hidden;
        flex-wrap: wrap;
    }
`

const RelatedPost = styled.div`
    width: 250px;
    height: 290px;
    border-radius: 10px;
    padding: 10px 10px;
    margin-bottom: 20px;
    margin-right: 10px;
    margin-left: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;
    border: 1px solid rgba(0, 0, 0, 0.4);
    &:hover{
    box-shadow: 2px 2px 2px 2px rgba(0, 0, 0, 0.4);
        cursor: pointer;
    }
`
const Hr = styled.hr`
    width: 80%;
    height: 1px;
    border-radius: 50%;
    margin-top: 10px;
`

const PostTitle = styled.h1`
    font-size: 18px;
    font-weight: 600;
    color: darkcyan;
`

const PostContent = styled.div``

const PostButton = styled.button`
    font-size: 16px;
    padding: 7px 7px;
    cursor: pointer;
    color: darkcyan;
    display: flex;
    align-items: center;
    justify-content: center;
`

export const Blog = () => {
    return (
        <Container>
            <Post>
                <Title>Lorem ipsum dolor sit amet consectetur adipisicing elit.</Title>
                <Content>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. 
            Iusto laudantium odit repellendus necessitatibus eos doloribus. 
            Ab, maiores saepe, sint dolor reiciendis debitis esse odit eos quaerat minima ipsum veritatis ex?
            <br />
            <br />
            Lorem ipsum dolor sit amet consectetur adipisicing elit. 
            Veniam iusto, esse dignissimos unde accusantium quasi reiciendis
             consequatur impedit nulla corporis cum excepturi, 
            iure aliquam harum dolor quaerat, dolorum omnis id.
            <br />
            <br />
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. 
            Iusto laudantium odit repellendus necessitatibus eos doloribus. 
            Ab, maiores saepe, sint dolor reiciendis debitis esse odit eos quaerat minima ipsum veritatis ex?
                </Content>
                <Info>
                    <Author>By: Kkibet</Author>
                    <Date>22 April 2022</Date>
                </Info>

                <Hr />

                <Comments>
                    <Compose>
                        <ComposeImg src={Image} alt="composer_image"/>
                        <ComposeInput type="text" autofocus placeholder="Write a comment..."/>
                    </Compose>

                    <CommentsTitle>Comments</CommentsTitle>

                    <AllComments>
                        <Comment>
                            <ComposeImg src={Image} alt="composer_image"/>
                            <Message>
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio asperiores qui quia facilis deleniti! Dicta ducimus nobis perspiciatis earum cupiditate, mollitia ea animi veniam nam accusantium repellendus hic iusto libero.
                            </Message>
                        </Comment>
                    </AllComments>
                </Comments>
            </Post>

            <RelatedPosts>
                <Title>Related Posts</Title>
                <Related>
                    <Link to='../' className='link'>
                    <RelatedPost>
                        <PostTitle>
                            Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                        </PostTitle>
                        <PostContent>
                            Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                            Est, sunt? Velit, itaque voluptatum consequuntur laboriosam iste, 
                            maxime quas, obcaecati vero assumenda hic aperiam. 
                            Libero adipisci doloremque ex natus numquam id?
                        </PostContent>
                        <PostButton>Read more <ArrowForward/></PostButton>
                    </RelatedPost>
                    </Link>
                </Related>
            </RelatedPosts>

        </Container>
    );
}