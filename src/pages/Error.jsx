import React from 'react'
import styled from 'styled-components';

const Container = styled.div`
    width: 100%;
    height: 90vh;
    display: flex;
    align-items: center;
    justify-content: center;
`

const Title = styled.h1`
    font-weight: 600;
    margin-bottom: 30px;
    font-size:${(props) => props.fz}px;
`

export function Error() {
  return (
    <Container>
        <Title fz='24'>404</Title>
        <Title fz='18'>PAGE NOT FOUND</Title>
    </Container>
  )
}
