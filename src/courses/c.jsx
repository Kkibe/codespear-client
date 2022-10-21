import React from 'react';
import {
   Link
} from "react-router-dom";
import styled from 'styled-components';

const Container = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
`

const Sidebar = styled.div`
  max-width: 290px;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  border-right: 2px solid #00C0A3;
  top: 0;
  position: fixed;
  left: 2px;
`

const Title = styled.h1`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  font-weight: 400;
  margin-bottom: 10px;
  color: ${props => props.bg};
`
const Navigation = styled.ul`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  overflow-y: auto;
  overflow-x: hidden;
`

const Item = styled.li`
    width: 100%;
    padding-left: 5px;
    list-style: none;
    margin-bottom: 10px;
`
const Wrapper = styled.div`
  width: calc(100% - 290px);
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: absolute;
  right: 0;
  top: 0;
`
const Content = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  margin-bottom: 10px;
  padding: 5px 5px 5px 5px;
`

const Description = styled.p`
    width: 100%;
    margin-bottom: 5px;
    padding-left: 5px;
    margin-bottom: 5px;
    line-height: 1.5em;
`
const Code = styled.div`
  width: 98%;
  padding-left: 20px;
  margin: 10px;
  background-color: #131212;
  color: #CBA135;
  font-family: 	'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
`
const Br = styled.br``

const C = () => {
    return (
        <Container>
            <Sidebar>
              <Title bg='#1E8FD5'>C Documentations</Title>
              <Navigation>
                <Item>Introduction</Item>
                <Item>Before Start</Item>
                <Item>C and C++</Item>
                <Item>Hello world</Item>
                <Item>Line by line</Item>
                <Item>Data types</Item>
                <Item>Variables</Item>
                <Item>Variable Declaration in C</Item>
                <Item>Constants and Literals</Item>
                <Item>Operators</Item>
                <Item>Decision Making</Item>
                <Item>Loops</Item>
                <Item>Functions</Item>
                <Item>Reference</Item>
              </Navigation>
            </Sidebar>

            <Wrapper>
              <Title>C Documentations</Title>
              <Content>
                <Title>Introduction</Title>
                <Description>
                    C is a general-purpose, procedural computer programming language supporting structured programming,
                    lexical variable scope, and recursion, with a static type system. By design, C provides constructs
                    that map efficiently to typical machine instructions. It has found lasting use in applications previously 
                    coded in assembly language. Such applications include operating systems and various application software
                    for computer architectures that range from supercomputers to PLCs and embedded systems.

                    <Br />

                    A successor to the programming language B, C was originally developed at Bell Labs by Dennis Ritchie 
                    between 1972 and 1973 to construct utilities running on Unix. It was applied to re-implementing the 
                    kernel of the Unix operating system. During the 1980s, C gradually gained popularity. It has become 
                    one of the most widely used programming languages, with C compilers from various vendors available for 
                    the majority of existing computer architectures and operating systems. C has been standardized by ANSI 
                    since 1989 (ANSI C) and by the International Organization for Standardization (ISO).

                    <Br />

                    C is an imperative procedural language. It was designed to be compiled to provide low-level access to memory 
                    and language constructs that map efficiently to machine instructions, all with minimal runtime support. 
                    Despite its low-level capabilities, the language was designed to encourage cross-platform programming. 
                    A standards-compliant C program written with portability in mind can be compiled for a wide variety of 
                    computer platforms and operating systems with few changes to its source code.

                    <Br />

                    Since 2000, C has consistently ranked among the top two languages in the TIOBE index, 
                    a measure of the popularity of programming languages.

                    <Br />

                    This is a basic guide just to get started, to go further I recommend <Link href='freecodecamp.org'>Frecodecamp.org</Link>
                </Description>
              </Content>

              <Content>
                <Title>Before Start</Title>
                <Description>
                    The C language is a structured language, in the same sense that other languages are. programming languages such as Pascal, 
                    Ada or Modula-2, but It is not structured by blocks, that is, it is not possible to declare subroutines (small program chunks) 
                    within other subroutines, unlike other subroutines structured languages such as Pascal. Furthermore, the C language is not rigid 
                    in checking data types, allowing easy conversion between different data types and mapping between different data types.

                    <Br />

                    Every C program basically consists of a set of functions, and a function called main, which is the first one that is executed at 
                    the beginning of the program, calling from it to the rest of the functions that make up our program.

                </Description>
              </Content>

              <Content>
                <Title>C and C++</Title>
                <Description>
                    C and C++ are two of the oldest surviving programming languages. The latter is directly derived from the former but flaunts more 
                    efficiency and productivity. Of course, both programming languages have their own advantages and drawbacks over one another.

                    <Br />

                    To provide you with an overview of C vs C++, C++ is an enhanced version of the C programming language with an additional feature 
                    of being object-oriented. C has been the motivation behind the birth of not only C++ but a multitude of presently popular high-level 
                    programming languages to the likes of Java, PHP, and Python.

                </Description>
              </Content>

              <Content>
                <Title>Difference between C and C++</Title>
                <Description>
                    Before going in-depth into the difference between C and C++, let us first have a brief look at both the languages.
                </Description>
              </Content>

              <Content>
                <Title>What is C?</Title>
                <Description>
                    Popularly known as the Father of Modern Programming, C made its first appearance in 1972 and was developed by Dennis Ritchie while working at Bells Labs. 
                    Though originally created for making utilities capable to run on the Unix platform, it is now one of the most widely used programming languages in the world.

                    <Br />

                    C is a procedural programming language that works on the lowest level of abstraction and hence is a systems programming language. 
                    It is compiled, lightweight, and offers manual memory management.

                    <Br />

                    The strength of C programming language lies in performance and has the ability to be used for coding for a wide variety of platforms. 
                    Hence, the programming language can be used for coding almost anything.

                    <Br />

                    Though nowadays we have specialized as well as a wide variety of programming languages to pick from, C was a great invention during 
                    its infancy and early years. Its level of versatility was unmatchable during its younger years.
                </Description>
              </Content>

              <Content>
                <Title>What is C++?</Title>
                <Description>
                    Designed by Bjarne Stroustrup, C++ first made its appearance in 1985 and was considered as the best prodigy of C. 
                    Bjarne started working on the programming language while working at Bell Labs in 1979. He wanted to develop an extension 
                    to the C programming language that is both more efficient and flexible than the C.

                    <Br />

                    C++ provides support for object-oriented programming. It offers a low level of abstraction and requires manual memory management. 
                    The programming language is comparable to C, lightweight, and compiled. It is capable of developing apps for a diverse range of platforms.

                    <Br />

                    The C++ programming language has almost everything that C has to offer but in a better way. Like its original inspiration, 
                    the C programming language, C++ has and continues to, influence a range of high-level programming languages, such as C# and Java.

                </Description>
              </Content>

              <Content>
                <Title>Comparison Between C vs C++</Title>
                <Description>
                    Application Development Area: C is a good option for embedded devices and system-level code. C++, on the contrary, 
                    is a top choice for developing gaming, networking, and server-side applications. It is also a great option for the development of device drivers. 
                    The authority of C++ lies in performance and speed. Though C also offers these both qualities, C++ takes it a step further.
                </Description>
              </Content>

              <Content>
                <Title>Hello world</Title>
                <Description>
                    To create a simple C program which prints "Hello, World" on the screen, use a text editor to create a new file 
                    (e.g. hello.c — the file extension must be .c) containing the following source code:
                </Description>
                <Code >
                  code here
                </Code>
              </Content>
            </Wrapper>
        </Container>
    );
}

export default C;
