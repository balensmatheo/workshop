import {Box, Link, List, ListItem, Typography} from "@mui/material";


export default function Home() {
    return(
        <Box>
            <Typography>Liens</Typography>
            <List>
                <ListItem><Link href={"/login"}>Login</Link></ListItem>
            </List>
        </Box>
    );
}