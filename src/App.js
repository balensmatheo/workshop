import './App.css';
import {Box, Link, List, ListItem} from "@mui/material";
import {Route, Routes} from "react-router-dom";
import Login from "./components/Authentication/Login";
import Home from "./components/Home/Home";
import {useEffect, useState} from "react";
function App() {


    return (
        <Box>
            <Routes>
                <Route path={"/"} element={<Home/>}/>

                <Route path="/login" element={<Login/>}/>
            </Routes>
        </Box>
    );
}

export default App;
