import { createContext, useContext } from "react";

export const BioContext = createContext();
// createContext returns a context object with two components: Provider and Consumer. The Provider component is used to provide the context value to its children, while the Consumer component is used to consume the context value in a child component.
// createContext returns a context component, not a variable

export const BioProvider = ({children}) => {
    const myName = "vinod";
    const myAge = 34;

    return <BioContext.Provider value={{myName, myAge}}>
        {children}
    </BioContext.Provider>
}

// custom hook
export const useBioContext = () => {
    const context = useContext(BioContext);

    // Error Handling
    if (context === undefined){
        throw new Error("Component must be wrapped with BioProvider")
    }

    return context;
}