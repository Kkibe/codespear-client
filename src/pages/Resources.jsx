import React from 'react';
import styled from 'styled-components';
import Resource from '../components/Resource';
import {ResourcesData} from '../resources.js';

const Container = styled.div`
    width: 100%;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    background-color: rgb(255, 117, 58);
`

const Wrapper = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
`
export default function Resources() {
  return (
    <Container>
        <Wrapper>
          {ResourcesData.map((data) => {
            return <Resource ourData={data} key={data.id}/>
          })}
        </Wrapper>
    </Container>
  )
}
