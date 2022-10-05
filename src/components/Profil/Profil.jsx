import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import {Divider, ImageList, ImageListItem} from "@mui/material";
import TextField from '@mui/material/TextField';
import {Auth} from "aws-amplify";
import { useState, useEffect } from "react";
import Button from '@mui/material/Button';

 function RedBar() {
    return (
      <Box
        sx={{
          height: 20,
          backgroundColor: (theme) =>
            theme.palette.mode === 'light'
              ? 'rgba(255, 255, 255, 0.1)'
              : 'rgb(255 255 255 / 25%)',
        }}
      />
    );
  }

  
export default function Profil(){

    async function getUser(){
        await Auth.currentAuthenticatedUser().then((user)=> { 
            setUser(user)
            console.log(user)
        })
    }

    async function updateMail(mail){
        let user = await Auth.currentAuthenticatedUser();
        console.log(mail);
        let result = await Auth.updateUserAttributes(user, {
            'email': mail,
        });
        console.log(result); // SUCCESS

    }
    const [user, setUser] = useState('');
    const [mail, setMail] = useState(Auth.user !== null ? Auth.user.attributes.email : 'test');
    
    useEffect(() => {
        getUser()
      },[]);

    return(
        
          <Box>
            <Box>
                 <Typography sx={{fontSize: "calc(8px + 2.2vmin)"}}>Profil</Typography>
             </Box>
            <Divider/>
             <Box>
            <RedBar />
                <TextField
                    variant="standard"
                    value={mail}
                    id="outlined-required"
                    onChange={(e) => setMail(e.target.value)}
                />
            </Box>
            <RedBar />
            <Button onClick={updateMail(mail)} variant="contained">Enregistrer</Button>
        </Box>
    )
}