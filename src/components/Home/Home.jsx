import {Box, Link, List, ListItem, Typography} from "@mui/material";
import {useEffect, useState} from "react";
import {Auth} from "aws-amplify";


export default function Home() {
    useEffect(()=> {
        assessLoginState().then(r => console.log(r));
    }  ,[])

    const [loggedIn, setLoggedIn] = useState(false);

    async function assessLoginState(){
        try {
            await Auth.currentAuthenticatedUser(
                (user) => {
                    console.log(user);
                    setLoggedIn(true);
                }
            ).catch((err) => {
                setLoggedIn(false);
            });
        } catch (e) {
            console.log(e)
        }
    }

    return(
        <Box>
            <Typography>Liens</Typography>
            <List>
                <ListItem><Link href={"/login"}>Login</Link></ListItem>
            </List>
        </Box>
    );
}