import React from 'react'
// import "./App.css"
import GlobalStyle from './styles/GlobalStyle';
import styled, { ThemeProvider } from 'styled-components';

const App = () => {
  // While using styled-components, we create our own custom styled component with the desired styles.

  let myFavColor = 'grey';

  const theme = {
    color: {
      textColor: "red",
      bg: "#fff"
    },
    responsive: {
      mobile: "768px",
      tab: "998px",
      laptop: "1200px",
    }
  }

  // Breakdoen of styled.button``
  // styled -> name of the imported styled component
  // button -> a valid tag name
  // `` -> inside this template literal, we can define our styles.

  // Note: The styles of these components will not conflict with any other CSS styles / class names in your project. Because it uses a unique class name for each component. It is scoped to the component itself.
  const Button = styled.button`
  // This is a comment
  /* This is also a comment */

  padding: 10px 20px;
  // background-color: aquamarine;

  // Using variables
  // background-color: ${myFavColor};

  // Using props
  // background-color: ${(props) => props.bg};

  // We can also destrucure the props also
  // background-color: ${({bg}) => bg};

  // Using Theme Provider
  background-color: ${({ theme }) => theme.color.bg};

  cursor: pointer;
  box-shadow: 2px 3px #8888;
  transition: all 0.3s ease;

  &:hover {
  background-color: #4CAF50;
  color: white;
  }

  &:after {
    content: '🪶';
  }

  span {
    color: #cd710e;

    // We can target by its tag as well as using its class name

    // b {
    //   font-size: 1.5rem;
    //   color: #669f0d;
    // }

    .test{
      font-size: 1.5rem;
      color: #669f0d;
    }

    // This is the hover effect on the span tag itself.
    &:hover {
        color: black;
    }
  }
  `;

  // In these styled components, '&' represents the parent selector i.e. styled.button here. So when we write '&:hover', it means that hover effect should be applied on the styled button only.

  // In short, '&' refers to that styled component itself

  const Para = styled.p`
  color: red;
  `

  const Wrapper = styled.section`
  .btn{
    padding: 10px 20px;
    color: white;
    background-color: blue;
    font-size: 2rem;
    border-radius: 4px;
    margin-top: 10px;
    transition: all 0.3s ease;
  }

  .btn:hover{
    background-color: green;
  }
  
  p{
    color: green;
  }
  `;

  return <ThemeProvider theme={theme}>
    <GlobalStyle />
    {/* <button className='btn'>Click Me!</button> */}

    {/* Its like creating a simple html element inside the JSX. We can also use className attribute to add classes as well and we can also use the other HTML attributes also */}

    {/* <Button className='btn'>Click Me!</Button> */}
    <Button className='btn' bg="#32a852">
      Click Me!
      <span> Hello World! <b className='test'>Ola!</b></span>
    </Button>

    <Para>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptates laborum, itaque rerum laboriosam natus ullam quibusdam dolorem quos nobis, incidunt, maxime illo? Obcaecati expedita nulla ipsa a. Enim eos aliquam perspiciatis incidunt a odit.</Para>

    {/* using the wrapper styled component */}
    <Wrapper>
      <button className='btn'>Click Me!</button>
      <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptates laborum, itaque rerum laboriosam natus ullam quibusdam dolorem quos nobis, incidunt, maxime illo? Obcaecati expedita nulla ipsa a. Enim eos aliquam perspiciatis incidunt a odit.</p>
    </Wrapper>

  </ThemeProvider>;
}

export default App
