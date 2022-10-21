import React from 'react'
import styled  from 'styled-components';
import Html from '../assets/html.png';
import Css from '../assets/css.png';
import JavaScript from '../assets/js.png';


const Container  = styled.div`
    width: 100%;
    min-height: 350px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    margin: 20px 0;
`

const Wrapper = styled.div`
  width: 95%;
  height: inherit;
  padding: 20px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  margin: 10px 0;
  @media screen and (max-width: 760px) {
    justify-content: center;
  }
`

const Title = styled.h1`
  width: 100%;
  font-size: 22px;
  font-weight: 400;
  text-align: center;
  font-size: 1.5rem;
  color: #2c2b2b;
  line-height: 1.125;
  margin-bottom: 1.25rem;
  margin-top: 10px;
`

const Item = styled.div`
  width: 300px;
  height: 350px;
  border: 1px solid #68478D;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 20px 10px;
  background: #ebf4fc;
  margin: 20px 20px;
`

const Image = styled.img`
  width: 60%;
  height: 50%;
  margin-bottom: 10px;
  object-fit: fill;
  object-position: center;
  border-radius: 10px;
`

const Break = styled.hr`
  width: 80%;
  height: 1px;
  border-radius: 50%;
  background: #68478D;
`

const Description = styled.p`
  width: 100%;
  padding: 20px 20px;
  line-height: 1.8em;
  color: #2c2b2b;
`

export const Featured = () => {
  return (
    <Container>
        <Title>Learn the fundamentals of web development</Title>
        <Wrapper>
            <Item>
                <Image src='https://static.javatpoint.com/htmlpages/images/html-tutorial.png'/>
                <Break />
                <Description >
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam, ipsa ex quod voluptate,
                </Description>
            </Item>
            <Item>
                <Image src={Css}/>
                <Break />
                <Description >
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam, ipsa ex quod voluptate,
                </Description>
            </Item>
            <Item>
                <Image src={JavaScript}/>
                <Break />
                <Description >
                  JavaScript can be connected to the objects of its environment 
                  to provide programmatic control over them.
                </Description>
            </Item>
        </Wrapper>
        
        
    </Container>
  )
}
