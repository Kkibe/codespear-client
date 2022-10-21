import React from 'react';
import styled from 'styled-components';
import { CoursesInfo } from '../courses';

const Container = styled.div`
  width: 100%;
  min-height: fit-content;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  margin: 20px 0;
`

const Title = styled.h1`
  font-size: 1.5rem;
  font-weight: 700;
  color: #2c2b2b;
  text-align: center;
  line-height: 1.125;
  margin-bottom: 1.1rem;
  margin-top: 10px;
`

const Wrapper = styled.div`
  width: 90%;
  min-height: fit-content;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-evenly;
  margin: 20px 0;
  background-color: transparent;
  padding: 10px 10px;
`
const Course = styled.div`
    width: calc((100% - 80px)/6) ;
    min-width: 100px;
    height: 100px;
    margin: 20px 20px;
    padding: 10px 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    background: #ebf4fc;
    border-radius: 10px;
    box-shadow: 2px 3px 3px 2px rgba(0, 0, 0, 0.4);
    cursor: pointer;
    &:hover{
      background: #7e7e7e;
      h1{
        
        color: #ebf4fc;
      }
      
  }
`

const CourseTitle = styled.h1`
  font-size: 1.1rem;
  font-weight: 300;
  color: #7e7e7e;
  text-align: center;
  line-height: 1.1;
`
const Icon = styled.img`
  width: 4rem;
  height: 4rem;
  margin-bottom: 10px;
  object-fit: fill;
  object-position: center;
  border-radius: 10px;
`


export const CoursesComp = () => {
  return (
    <Container>
        <Title>Trending Technologies</Title>
        <Wrapper>
          {CoursesInfo.map(course => {
            return (
              <Course key={course.id}>
                <Icon src={course.img}/>
                <CourseTitle>{course.name}</CourseTitle>
              </Course>
            )
          })}
        
        </Wrapper>
    </Container>
  )
}
