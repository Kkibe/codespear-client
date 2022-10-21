import React, {useEffect, useState} from 'react';
import styled from 'styled-components';

const Container = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content:center;
`

const Holder = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap:wrap;
    
    margin: 20px 0;

    @media screen and (max-width: 780px) {
        flex-direction: column;
    }
`

const Wrapper = styled.div`
    width: calc((100% / 3) - 100px);
    min-width: 250px;
    margin: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 5px;
    justify-content: space-between;
    background-color: #ebf4fc;
    border-radius: 10px;
    box-shadow: 2px 3px 2px 3px rgba(0, 0, 0, 0.4);
    @media screen and (max-width: 780px) {
        width: 80%;
    }
`

const Title = styled.h1`
    width: 100%;
    color: #046A38;
    font-size: 20px;
    font-weight: 600;
    text-align: center;
`

const ItemContainer = styled.ul`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    list-style: none;
`

const Item = styled.li`
    width: 100%;
    padding: 5px 10px;
    color: #2c2b2b;
    font-size: 18px;
    font-family: cursive;
    &:hover{
        cursor: pointer;
        background-color: #7e7e7e;
        ;
    }
`

const Link = styled.a`
    width: 100%;
    height: inherit;
    text-decoration: none;
    color: inherit;
`

export default function Resource({ourData}) {

    const [data, setData] = useState('');

    useEffect(() => {
        setData(ourData)

    }, [data])
  return (
    <Container>
         <Title>{data && data.name}</Title>
         

        <Holder>
        {data && data.items.map(item => {
            return <Wrapper key={item.name}>
                <Title>{item.name}</Title>
                <ItemContainer>
                    {item.res.map(res => {
                        return <Item key={res.id}><Link href={res.url} target='_blank' >{res.name}</Link></Item>
                    })}
                </ItemContainer>
            </Wrapper>
        })}
        </Holder>
    </Container>
  )
}
