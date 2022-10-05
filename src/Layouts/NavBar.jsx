import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import {MenuRounded} from "@mui/icons-material";
import {Divider, Link} from "@mui/material";
import {Auth} from "aws-amplify";
import {useNavigate} from "react-router-dom";
import Logo from "../assets/logo.png"

export default function NavBar(props){
    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };


    async function signOut() {
        try {
            await Auth.signOut();
            navigate("/");
            window.location.reload();
        } catch (error) {
            console.log('error signing out: ', error);
        }
    }


    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const navigate = useNavigate();

    return (
        <AppBar sx={{backgroundColor: '#1b7400'}} className={"test"} position="static">
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <Typography
                        variant="h6"
                        noWrap
                        component="a"
                        href="/dashboard"
                        sx={{
                            mr: 2,
                            display: { xs: 'none', md: 'flex' },
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        <img style={{width: "150px"}} alt="logo" src={Logo}/>
                    </Typography>
                    <Typography
                        variant="h5"
                        noWrap
                        component="a"
                        href="dashboard"
                        sx={{
                            mr: 2,
                            display: { xs: 'flex', md: 'none' },
                            flexGrow: 1,
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        <img style={{width: "180px"}} src={Logo} alt={"Logo"}/>
                    </Typography>
                    {
                        props.loggedIn ?
                            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, gap: "30px"}}>
                                <Button
                                    color={"success"}
                                    onClick={() => navigate("/dashboard")}
                                    sx={{ my: 2, color: 'white', display: 'block', fontWeight: 600, "&hover" : {opacity: 0.7} }}
                                >
                                    Tableau de bord
                                </Button>
                                <Button
                                    color={"success"}
                                    onClick={() => navigate("mes-champs")}
                                    sx={{ my: 2, color: 'white', display: 'block', fontWeight: 600, "&hover" : {opacity: 0.7} }}
                                >
                                    Mes champs
                                </Button>
                            </Box>
                            :
                            <Box sx={{flexGrow: 1}}>

                            </Box>
                    }
                    {
                        props.loggedIn ?
                            <Box sx={{ flexGrow: 0 }}>
                                <Tooltip title="Ouvrir le menu">
                                    <IconButton color={'inherit'} size={"large"} onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                        <MenuRounded/>
                                    </IconButton>
                                </Tooltip>
                                <Menu
                                    sx={{ mt: '45px' }}
                                    id="menu-appbar"
                                    anchorEl={anchorElUser}
                                    anchorOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                    keepMounted
                                    transformOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                    open={Boolean(anchorElUser)}
                                    onClose={handleCloseUserMenu}
                                >
                                    <MenuItem onClick={() => navigate("/profil")}>
                                        <Typography textAlign="center">Profil</Typography>
                                    </MenuItem>
                                    <MenuItem onClick={() => signOut()}>
                                        <Typography>Déconnexion</Typography>
                                    </MenuItem>
                                </Menu>
                            </Box>
                            :
                            <Box sx={{flexGrow: 0}}>
                                <Link href={"login"} sx={{textDecoration: 'none', color: "white"}}>Connexion</Link>
                                <span style={{marginRight: "1em", marginLeft: "1em"}}>|</span>
                                <Link href={"signin"} sx={{textDecoration: 'none', color:"white"}}>Inscription</Link>
                            </Box>
                    }
                </Toolbar>
            </Container>
        </AppBar>
    );
};