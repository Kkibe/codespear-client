import React from 'react';
import styled from 'styled-components';
import { Featured } from '../components/Featured';
import { CoursesComp } from '../components/CoursesComp';
import Slider from '../components/Slider';

const Container = styled.div`
    width: 100%;
    min-height: 100vh;
`

export const Home = () => {
  return (
    <Container>
      <Slider />
      <CoursesComp />
      <Featured />
    </Container>
  )
}
