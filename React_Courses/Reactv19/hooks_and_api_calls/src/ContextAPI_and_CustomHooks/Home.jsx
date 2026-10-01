import { useContext } from "react";
import { BioContext } from ".";

export const Home = () => {
    const {myName, myAge} = useContext(BioContext);

    return <h1>Hiii, {myName}. I am {myAge} yrs old</h1>
}