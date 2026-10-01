import { createGlobalStyle } from "styled-components";


const GlobalStyle = createGlobalStyle`
body {
    // background-color: rgb(51, 160, 160);

    // Using Theme Provider
    background-color: ${({theme}) => theme.color.bg};
    
    height: 100vh;
    display: grid;
    place-items: center;
}
`;

export default GlobalStyle;