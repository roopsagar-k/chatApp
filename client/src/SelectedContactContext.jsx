import { createContext, useState } from "react"; 
export const SelectedContactContext = createContext({});

const SelectedContactContextProvider = ({ children }) => {
    const [selectedContact, setSelectedContact] = useState(0);
    return(
        <SelectedContactContext.Provider value={{selectedContact, setSelectedContact}}>
            {children}
        </SelectedContactContext.Provider>
    );
}

export default SelectedContactContextProvider;