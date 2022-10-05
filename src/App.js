import './App.css';
import {Box, Link, List, ListItem} from "@mui/material";
import {Route, Routes} from "react-router-dom";
import Login from "./components/Authentication/Login";
import Home from "./components/Home/Home";
import {useEffect, useState} from "react";
import {Auth} from 'aws-amplify';
import SignIn from "./components/Authentication/SignIn";
import Dashboard from "./components/DashBoard/Dashboard";
import Meschamps from "./components/MesChamps/Meschamps";
function App() {

    const [loggedIn, setLoggedIn] = useState(false);
    const [user, setUser] = useState(null);
    async function onSignIn() {
        setLoggedIn(true);
        await Auth.currentAuthenticatedUser()
            .then(user => {
                setUser(user);
            })
    }

    function getUser(user) {
        setUser(user);
    }

    return (
      <Box>
          <Routes>
              <Route path={"*"} element={<Home/>}/>
              <Route path="/login" element={<Login onSignIn={onSignIn} getUser={getUser}/>}/>
              <Route path={"/signin"} element={<SignIn/>}/>
          </Routes>
      </Box>
  );
}

export default App;
