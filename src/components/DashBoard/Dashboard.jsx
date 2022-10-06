import {Auth} from "aws-amplify";
import {useEffect, useState} from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import {Divider} from "@mui/material";
import {NoAccounts} from "@mui/icons-material";

export default function Dashboard(props){

    useEffect(() => {
        assessLoginState().then(r => r);
    }, [])

    const [user, setUser] = useState(null);
    const [loggediIn, setLoggedIn] = useState(false);

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

    if(Auth.user !== null){
        return (
            <Box sx={{p:2}}>
                <Box>
                    <Typography fontSize={"calc(8px + 2.2vmin)"}>Bienvenue sur le tableau de bord {Auth.user !== null ? Auth.user.attributes.email : undefined}</Typography>
                </Box>
                <Divider/>
            </Box>
        )
    }

}