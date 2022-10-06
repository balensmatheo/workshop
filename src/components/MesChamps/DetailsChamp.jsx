import Box from "@mui/material/Box";
import {useLocation} from "react-router-dom";
import {DataStore} from "aws-amplify";
import {Champ} from "../../models";
import {useEffect, useState} from "react";
import {BarLoader} from "react-spinners";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import {Circle, Info, Label, LocationCity, LocationOn} from "@mui/icons-material";
import {Divider, List, ListItem, ListItemIcon, ListItemText} from "@mui/material";

export default function DetailsChamp(props){
    useEffect(() => {
        getChamp().then(r => r);
    }, []);

    const { state } = useLocation();
    const [champ, setChamp] = useState();
    const [loading, setLoading] = useState(false);

    async function getChamp(){
        try{
            setLoading(true);
            const champ = await DataStore.query(Champ, state.id);
            setChamp(champ);
            setLoading(false);
        } catch (e) {
            console.log(e);
        }

    }

    return (
        <Box sx={{display: 'flex', flexDirection: 'row', width:'100%', p:2}}>
            {
                loading ?
                    <Box sx={{display: 'flex', flexDirection: 'row', width: "100%", height: "100vh", justifyContent: 'center', alignItems: "center"}}>
                        <BarLoader></BarLoader>
                    </Box>
                    :
                    <Paper sx={{p: 2, width: "100%", bgcolor: "rgba(227,227,227,0.7)"}}>
                        <Box sx={{display: 'flex', flexDirection: 'row', alignItems: 'center', gap: "10px"}}>
                            <Info/>
                            <Typography sx={{fontSize: "calc(8px + 1vmin)", fontWeight: 600, textTransform: 'uppercase', letterSpacing: "0.1em", mt: "0.3em"}}>Informations sur votre champ</Typography>
                        </Box>
                        <Divider/>
                        <Box>
                            {
                                champ !== undefined ?
                                    <List>
                                        <ListItem>
                                            <ListItemIcon><Label/></ListItemIcon>
                                            <ListItemText sx={{textTransform: 'uppercase', fontSize: "calc(6px + 1vmin)"}}>{champ.label}</ListItemText>
                                        </ListItem>
                                        <ListItem>
                                            <ListItemIcon><LocationOn/></ListItemIcon>
                                            <ListItemText sx={{textTransform: 'uppercase', fontSize: "calc(6px + 1vmin)"}}>{champ.latitude + " ; " +  champ.longitude}</ListItemText>
                                        </ListItem>
                                        <ListItem>
                                            <ListItemIcon><Circle color={champ.etat === "true" ? "error" : "success"}/></ListItemIcon>
                                            <ListItemText sx={{textTransform: 'uppercase', fontSize: "calc(6px + 1vmin)"}}>{champ.etat === "true" ? "Incendie détécté" : "Aucun incident détécté"}</ListItemText>
                                        </ListItem>
                                    </List>
                                    :
                                    undefined
                            }

                        </Box>
                    </Paper>
            }
        </Box>
    )
}
