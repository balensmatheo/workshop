import {Box, Link, List, ListItem, Typography} from "@mui/material";
import {Auth} from "aws-amplify";
import {useEffect, useState} from "react";


export default function Home() {
    useEffect(()=>{
        assessLoginState().then(r=>r);
    }, [])

    const [loggedIn, setLoggedIn] = useState(false);

    async function assessLoginState(){
        try {
            await Auth.currentAuthenticatedUser(
                (user) => {

                }
            )
        } catch (e) {
            console.log(e)
        }
    }

    return(
        <Box>
            <Typography>Liens</Typography>
            <List>
                <ListItem><Link href={"/login"}>Connexion</Link></ListItem>
                <ListItem><Link href={"/signin"}>Inscription</Link></ListItem>
            </List>
        </Box>
    );
}