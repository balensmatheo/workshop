import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import {Divider, TextField} from "@mui/material";
import {useState} from "react";
import {DataStore} from "aws-amplify";
import LoadingButton from "@mui/lab/LoadingButton";
import {useNavigate} from "react-router-dom";
import {Champ} from "../../models";

export default function AddChamp(){

    const [label, setLabel] = useState("");
    const [longitude, setLongitude] = useState(0);
    const [latitude, setLatitude] = useState(0);
    const [error, setError] = useState({state: false, value:""})
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate();

    async function createChamp(){
        try{
            setLoading(true);
            await DataStore.save(new Champ({
                libelle: label,
                longitude: parseFloat(longitude),
                latitude: parseFloat(latitude),
            })).then(() => {
                setLoading(false)
                navigate("/mes-champs")
            }).catch(e  => setError({state: true, value: e}))
        } catch (e) {
            console.log(e);
        }
    }

    return(
        <Box sx={{p:2}}>
            <Box>
                <Typography sx={{fontSize: "calc(8px + 2.2vmin)"}}>Formulaire d'ajout de champ</Typography>
            </Box>
            <Divider/>
            <Box sx={{display: 'flex', flexDirection: 'column', gap: "30px", width: "200px", mt:2}}>
                <TextField variant={"standard"} value={label} onChange={e => setLabel(e.target.value)} label={"Libellé du champ"}/>
                <TextField variant={"standard"} type={"number"} value={latitude} onChange={e => setLatitude(e.target.value)} label={"Latitude"}/>
                <TextField variant={"standard"} type={"number"} value={longitude} onChange={e => setLongitude(e.target.value)} label={"Longitude"}/>
                <LoadingButton variant={"contained"} onClick={()=> createChamp()} color={"success"}>Ajouter un champ</LoadingButton>
            </Box>
        </Box>
    )
}