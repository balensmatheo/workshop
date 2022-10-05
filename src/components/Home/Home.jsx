import {Box, Button, Link, List, ListItem, Typography} from "@mui/material";
import {Auth} from "aws-amplify";
import {useEffect, useState} from "react";
import {Route, Routes, useLocation, useNavigate} from "react-router-dom";
import NavBar from "../../Layouts/NavBar";
import Dashboard from "../DashBoard/Dashboard";
import Meschamps from "../MesChamps/Meschamps";
import {NoAccounts} from "@mui/icons-material";
import Footer from "../../Layouts/Footer";
import Profil from "../Profil/Profil";

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
                {
                    Auth.user === null ?
                        <Box sx={{display: 'flex', flexDirection: 'column', p: 1, justifyContent: 'center', alignItems: 'center', height: "50vh"}}>
                            <NoAccounts color={"error"} sx={{fontSize: "70px", mb:1}}/>
                            <Typography fontSize={"calc(8px + 2.2vmin)"}>Vous n'êtes pas authentifié, veuillez vous connecter ou créer un compte.</Typography>
                        </Box>
                        :
                        <Box>

                        </Box>
                }
                <Routes>
                    <Route path={"dashboard"} element={<Dashboard user={user} loggedIn={loggedIn}/>}/>
                    <Route path={"mes-champs"} element={<Meschamps/>}/>
                    <Route path={"profil"} element={<Profil/>}/>
                </Routes>
            </Box>
            <Footer/>
        </Box>
    );
}