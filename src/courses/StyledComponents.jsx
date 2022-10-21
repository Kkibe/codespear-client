import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  margin-top: 10px;
`

export const Sidebar = styled.div`
max-width: 250px;
height: 80%;
display: flex;
align-items: center;
justify-content: center;
flex-direction: column;
top: 0;
position: fixed;
left: 0px;
margin-top: 10px;
`

export const Title = styled.h1`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  font-weight: 400;
  margin-bottom: 10px;
  color: ${props => props.bg};
`
export const Navigation = styled.ul`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  overflow-y: auto;
  overflow-x: hidden;
`

export const Item = styled.li`
    width: 100%;
    padding-left: 5px;
    list-style: none;
    margin-bottom: 10px;
    cursor: pointer;
    padding: 10px;
    &:hover{
      background-color: #89e97c;
      cursor: pointer;
  }
`
export const Wrapper = styled.div`
  width: calc(100% - 250px);
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: absolute;
  overflow: scroll;
  right: 0;
  top: 0;
`
export const Content = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  margin-bottom: 10px;
  padding: 5px 5px 5px 5px;
`

export const Description = styled.p`
    width: 100%;
    margin-bottom: 5px;
    padding-left: 5px;
    margin-bottom: 5px;
    line-height: 1.5em;
`
export const Code = styled.div`
  width: 98%;
  padding-left: 20px;
  margin: 10px;
  background-color: #131212;
  color: #CBA135;
  font-family: 	'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
`
export const Break = styled.br``

