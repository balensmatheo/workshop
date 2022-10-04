import {Avatar, Box, Divider, Link, TextField} from "@mui/material";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import {CheckCircle} from "@mui/icons-material";
import LoadingButton from "@mui/lab/LoadingButton";
import React, {useState} from "react";
import {Auth, Hub} from "aws-amplify";
import {useNavigate} from "react-router-dom";


export default function SignIn(){

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState({state: false, value: ""});
    const [loading, setLoading] = useState(false);
    const [challenge, setChallenge] = useState(false);
    const [code, setCode] = useState('');

    const navigate = useNavigate();

    async function signUp() {
        try {
            setLoading(true)
            const { user } = await Auth.signUp({
                username,
                password,
                autoSignIn: { // optional - enables auto sign in after user is confirmed
                    enabled: true,
                }
            }).then(() => {
                setChallenge(true)
                listenToAutoSignInEvent();
            });
            setLoading(false)
            console.log(user);
        } catch (error) {
            setLoading(false);
            console.log('error signing up:', error);
        }
    }

    function listenToAutoSignInEvent() {
        setLoading(true)
        Hub.listen('auth', ({ payload }) => {
            const { event } = payload;
            if (event === 'autoSignIn') {
                const user = payload.data;
                navigate("/", {state: {user: user}})
            } else if (event === 'autoSignIn_failure') {
                navigate("/signin")
            }
        })
        setLoading(false);
    }

    async function confirmSignUp() {
        try {
            setLoading(true)
            await Auth.confirmSignUp(username, code).then(data => {
              if(data==="SUCCESS"){
                  listenToAutoSignInEvent();
              }
            });

            setLoading(false);
        } catch (error) {
            console.log('error confirming sign up', error);
            setLoading(false)
        }
    }

    return(
        <Box sx={{display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', width: "100%", height: "100vh", bgcolor: 'green'}}>
            <Paper
                elevation={8}
                sx={{
                    position: 'absolute',
                    maxWidth: 400,
                    minWidth: 300,
                    mt: "5rem",
                    py: 3, // padding top & bottom
                    px: 2, // padding left & right
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 3,
                    borderRadius: "10px",
                    borderBottom: '1px solid #e0e0e0',
                }}
            >
                <Box sx={{display: 'flex', flexDirection: "column", justifyContent: "center",alignItems: "center",width: '100%'}}>
                    <Avatar sx={{mb:1}} size={"lg"} />
                    <Typography
                        id="nav-list-browse"
                        fontWeight={700}
                        sx={{
                            textTransform: 'uppercase',
                            letterSpacing: '.1rem',
                        }}
                        level={"h4"}>
                        Inscription
                    </Typography>
                </Box>
                <Box sx={{width: "100%", display: "flex", flexDirection: 'column', mb: 2}}>
                    <Divider sx={{mb:2}} variant={"fullWidth"}/>
                    <TextField onChange={event => setUsername(event.target.value)} value={username} margin={"normal"} variant={"standard"} size={"small"} name={"Email"} type={"email"} label={<Typography>Email</Typography>}/>
                    <TextField helperText={error.value} error={error.state} onChange={event => setPassword(event.target.value)} value={password} margin={"normal"} variant={"standard"} size={"small"} name={"Password"} type={"password"} label={<Typography>Password</Typography>}/>
                    {
                        challenge ?
                            <TextField onChange={event => setCode(event.target.value)} value={code} margin={"normal"} variant={"standard"} size={"small"} name={"Code"} label={"Code de vérification"}/>
                            :
                            undefined
                    }
                </Box>
                <Box>
                    {
                        challenge ?
                            <LoadingButton loading={loading} onClick={() => confirmSignUp()}>Confirmer le code</LoadingButton>
                            :
                            <LoadingButton loading={loading} onClick={() => signUp()}>Inscription</LoadingButton>
                    }

                </Box>
                <Typography
                    fontSize="8pt"
                    sx={{ alignSelf: 'center' }}
                >
                    <Link>Mot de passe oublié ?</Link>
                </Typography>
            </Paper>
        </Box>
    )
}