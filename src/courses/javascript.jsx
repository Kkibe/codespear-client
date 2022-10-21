import React from 'react';
import {Container, Sidebar, Title, Navigation, Item , Wrapper, Content, Description, Code, Break} from './StyledComponents';

const Javascript = () => {
  const code = function greetMe(yourName) { alert("Hello " + yourName); }
    return (
        <Container>
            <Sidebar>
              <Title bg='#1E8FD5'>Javascript</Title>
              <Navigation>
                <Item>Introduction</Item>
                <Item>Prequis</Item>
                <Item>JavaScript and Java</Item>
                <Item>Hello world</Item>
                <Item>Variables</Item>
                <Item>Declaring variables</Item>
                <Item>Variable scope</Item>
                <Item>Global variables</Item>
                <Item>Constants</Item>
                <Item>Data types</Item>
                <Item>String</Item>
                  <Item>Number</Item>
                  <Item>Boolean</Item>
                  <Item>null</Item>
                  <Item>undefined</Item>
                  <Item>Symbol</Item>
                <Item>Loops and Iteration</Item>
                <Item>if...else statement</Item>
                <Item>while statement</Item>
                <Item>Functions</Item>
                <Item>Function declarations</Item>
                <Item>Higher-order functions</Item>
                <Item>Closures</Item>
                <Item>Objects</Item>
                <Item>Prototypes</Item>
                <Item>Inheritance</Item>
                <Item>Regular Expressions</Item>
                <Item>Constructors & classes</Item>
              </Navigation>
            </Sidebar>
            <Wrapper>
              <Title>JavaScript Documentation</Title>
              <Content>

                <Title>Introduction</Title>
                <Description>
                  JavaScript is a cross-platform, object-oriented scripting language used to make webpages interactive (e.x. having complex animations, clickable buttons, popup menus, etc.). There are also more advanced server side versions of JavaScript such as Node.Js which allow you to add more functionality to a website than simply downloading files (such as realtime collaboration between multiple computers). Inside a host environment (for example, a web browser), JavaScript can be connected to the objects of its environment to provide programmatic control over them.
                </Description>
                <Description>
                  JavaScript contains a standard library of objects, such as Array, Date, and Math, and a core set of language elements such as operators, control structures, and statements.
                </Description>


                <Title>Introduction</Title>
                <Description>
                JavaScript is a cross-platform, object-oriented scripting language. It is a small and lightweight language. Inside a host environment (for example, a web browser), JavaScript can be connected to the objects of its environment to provide programmatic control over them. JavaScript contains a standard library of objects, such as Array, Date, and Math, and a core set of language elements such as operators, control structures, and statements. Core JavaScript can be extended for a variety of purposes by supplementing it with additional objects; for example:

Client-side JavaScript extends the core language by supplying objects to control a browser and its Document Object Model (DOM). For example, client-side extensions allow an application to place elements on an HTML form and respond to user events such as mouse clicks, form input, and page navigation.
Server-side JavaScript extends the core language by supplying objects relevant to running JavaScript on a server. For example, server-side extensions allow an application to communicate with a database, provide continuity of information from one invocation to another of the application, or perform file manipulations on a server.
                </Description>
              </Content>
              <Content>
                <Title>Hello World!</Title>
                <Description>
                  To get started with writing JavaScript, open the Scratchpad and write your first "Hello world" JavaScript code:
                </Description>
                <Code>
                  Lorem ipsum
                </Code>


              </Content>
              <Content>
                <Title>
                   Loops and Iteration
                </Title>
                <p>The statements for loops provided in JavaScript are:</p>
                <ul>
                    <li>for statement</li>
                    <li>do...while statement</li>
                    <li>while statement</li>
                    <li>break statement</li>
                    <li>continue statement</li>
                </ul>
                <Description>
                You can think of a loop as a computerized version of the game where you tell someone to take X steps in one direction then Y steps in another; for example, the idea "Go five steps to the east" could be expressed this way as a loop:
                </Description>
                <Code>
                </Code>
              </Content>


            </Wrapper>
        </Container>
    );
}

export default Javascript;