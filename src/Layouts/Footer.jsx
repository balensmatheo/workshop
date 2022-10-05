import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

export default function Footer(){
    return(
        <Box sx={{display: 'flex', bottom: 0, position: "fixed", bgcolor: 'green', height: "10vh", width: "100%"}}>
            <Box sx={{display: 'flex', flexDirection: 'row', width: "100%", alignItems: 'center', justifyContent: 'center'}}>
                <Typography sx={{color: 'white', textTransform: "uppercase", letterSpacing: "0.1em", fontWeight: 600}}>HappGri, 2022 ©</Typography>
            </Box>
        </Box>
    )
}