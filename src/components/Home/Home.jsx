import {Box, Button, Link, List, ListItem, Typography} from "@mui/material";
import {Auth} from "aws-amplify";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import Header from '../Header/Header'
import AppBar from "../Header/AppBar";


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
            Auth.currentAuthenticatedUser().then(user => {
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
            <Header></Header>
            <AppBar></AppBar>
            <Typography>Liens</Typography>
            <List>
                {
                    loggedIn ?
                        <Box>
                            <h1>Vous êtes connecté en tant que {user.attributes.email}</h1>
                            <Button onClick={() => signOut()}>Déconnexion</Button>
                        </Box>
                        :
                        <Box>
                            <ListItem><Link href={"/login"}>Connexion</Link></ListItem>
                            <ListItem><Link href={"/signin"}>Inscription</Link></ListItem>
                        </Box>
                }
            </List>
        </Box>
    );
}