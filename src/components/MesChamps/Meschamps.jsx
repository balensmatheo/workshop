import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import {Divider, ImageList, ImageListItem} from "@mui/material";

export default function Meschamps(){

    return(
        <Box>
            <Box>
                <Typography sx={{fontSize: "calc(8px + 2.2vmin)"}}>Liste de vos champs</Typography>
            </Box>
            <Divider/>
        </Box>
    )
}