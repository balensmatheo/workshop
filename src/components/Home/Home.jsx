import {Box, Button, Link, List, ListItem, Typography} from "@mui/material";
import {Auth} from "aws-amplify";
import {useEffect, useState} from "react";
import {Route, Routes, useLocation, useNavigate} from "react-router-dom";
import NavBar from "../../Layouts/NavBar";
import Dashboard from "../DashBoard/Dashboard";
import Meschamps from "../MesChamps/Meschamps";


export default function Home() {
    useEffect(()=>{
        assessLoginState().then(r=>r);
    }, [])


    const [loggedIn, setLoggedIn] = useState(false);
    const [user, setUser] = useState();
    const navigate = useNavigate();


    async function signOut() {
        try {
            await Auth.signOut();
            window.location.reload();
        } catch (error) {
            console.log('error signing out: ', error);
        }
    }

    async function assessLoginState(){
        try {
            await Auth.currentAuthenticatedUser().then(user => {
                setUser(user)
                setLoggedIn(true);
            }).catch(
                () => {
                    setLoggedIn(false);
                }
            )
        } catch (e) {
            console.log(e)
        }
    }

    return(
        <Box>
            <NavBar loggedIn={loggedIn}/>
            <Box sx={{p:2}}>
                <Routes>
                    <Route path={"dashboard"} element={<Dashboard user={user} loggedIn={loggedIn}/>}/>
                    <Route path={"mes-champs"} element={<Meschamps/>}/>
                </Routes>
            </Box>
        </Box>
    );
}