import React from 'react';
import styled from 'styled-components';
import { CloseOutlined, Facebook, GitHub, Instagram, LinkedIn, Reddit, Telegram, Twitter, YouTube} from '@mui/icons-material';

const Container = styled.div`
    width: 50%;
    min-height: 200px;
    height: max-content;
    margin: 10px auto;
    box-shadow: 6px 6px 10px -1px #555, -6px -6px 10px -1px rgba(255, 255, 255, 0.7);
    background-color: #fff;
    padding: 30px;
    border-radius: 5px;
    position: fixed;
    top: 100px;
    z-index: 99;
    display: none;

    h1{
        width: 100%;
        color: #046A38;
    }

    ul{
        width: 100%;
        margin-top: 15px;
      }
      
      li{
        width: 100%;
        line-height: 30px;
        border-bottom: 1px solid #e7eaea;
        margin-bottom: 20px;
        padding-bottom: 20px;
        list-style: none;
        color: #666
        
      }

      .close{
        font-size: 24px;
        border-radius: 50%;
        
        
        position: absolute;
        top: 5px;
        right: 5px;

        &:hover{
            color: red;
            background: #e7eaea;
        }
      }
                                                                                                                                           
`

const Link = styled.div`
    color: #5674e2;
    text-decoration: none;
`

export default function ModalPopup() {
  return (
    <Container class="box">
        <CloseOutlined className='close' />
    <h1>jQuery Weekly</h1>
    <div id="links">
        <ul>
            <li><Link href='https://learn.jquery.com/'>Learn jQuery</Link></li>
            <li><Link href='https://treehouse-project-downloads.s3.amazonaws.com/jquery-basics/jquery_cheatsheet.pdf'>jQuery Cheatsheet</Link></li>
            <li><Link href='https://api.jquery.com/'>jQuery Documentation</Link></li>
            <li><Link href='https://developer.mozilla.org/en-US/docs/Glossary/jQuery'>jQuery Glossary</Link></li>
        </ul>
    </div>
</Container>	
  )
}
