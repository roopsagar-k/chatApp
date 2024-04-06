import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthPage from "./pages/AuthPage";
import axios from "axios";
import IndexPage from "./pages/IndexPage";
import UserContextProvider from "./UserContext";
import { FormContextProvider } from "./FormContext";
import Profile from "./pages/Profile";
import SelectedContactContextProvider from "./SelectedContactContext";
axios.defaults.baseURL="http://localhost:3000";
axios.defaults.withCredentials = true;

function App() {
  return (
    <BrowserRouter>
      <UserContextProvider>
        <FormContextProvider>
          <SelectedContactContextProvider>
            <Routes>
              <Route path="/" element={<AuthPage />}/>
                <Route path="/home" element={<IndexPage />} />
              <Route path="/profile" element={<Profile />} />
            </Routes>
          </SelectedContactContextProvider>
        </FormContextProvider>
      </UserContextProvider>
    </BrowserRouter>
  )
}

export default App
