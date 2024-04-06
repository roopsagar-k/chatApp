import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { createContext } from "react";

export const UserContext = createContext({});

const UserContextProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        if(!user) {                             
            axios.get('/userDetails')
            .then(response => {
                setUser(response.data);
            })
            .catch(error => {
                console.error('Error:', error);
            });
        }
        console.log(user);
    }, []);

  return(
        <UserContext.Provider value={{user, setUser}}>
            {children}
        </UserContext.Provider>
    );
}

export default UserContextProvider;
