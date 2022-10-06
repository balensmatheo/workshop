import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Champ, CameraType, Logs } from '../../models';
import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import { Typography} from "@mui/material";
import {DataStore} from "aws-amplify";

export default function BasicTable() {

  useEffect(() => {
    getChamp()
    getCameraType()
    getLog()
  }, []);

  const [champs, setChamps] = useState([]);
  const [cameraTypes, setCameraTypes] = useState([]);
  const [logs, setLogs] = useState([]);
  
    async function getChamp(){
      try {
        const champs = await DataStore.query(Champ);
        console.log(champs)
        setChamps(champs)
      } catch (error) {
        console.log(error)
      }
    }

    async function getCameraType(){
      try{
        const camera = await DataStore.query(CameraType);
        setCameraTypes(camera)
      } catch (e){
        console.log(e)
      }
    }
    async function getLog(){
      try {
        const logs = await DataStore.query(Logs);
        console.log(logs)
        setLogs(logs)
      } catch (error) {
        console.log(error)
      }
    }

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

  return (
    <Box>
    <Box>
      <Typography m={2}>Champs</Typography>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Label</TableCell>
              <TableCell align="right">Latitude</TableCell>
              <TableCell align="right">longitude</TableCell>
              <TableCell align="right">updatedAt</TableCell>
              <TableCell align="right">Pic de chaleur</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {champs.map((champ) => (
              <TableRow
                key={champ.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {champ.label}
                </TableCell>
                <TableCell align="right">{champ.latitude}</TableCell>
                <TableCell align="right">{champ.longitude}</TableCell>
                <TableCell align="right">{champ.updatedAt}</TableCell>
                <TableCell align="right">{champ.etat === "true" ? 'Oui' : 'Non'}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
    <RedBar />
    <Box>
    <Typography m={2}>Camera</Typography>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Nom</TableCell>
              <TableCell align="right">Angle</TableCell>
              <TableCell align="right">Etat</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {cameraTypes.map((cameraType) => (
              <TableRow
                key={cameraType.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {cameraType.nom}
                </TableCell>
                <TableCell align="right">{cameraType.angle}</TableCell>
                <TableCell align="right">{cameraType.etat=== true ? 'Oui' : 'Non'}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
    <RedBar />
    <Box>
    <Typography m={2}>Logs des feux</Typography>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Champ Id</TableCell>
              <TableCell align="right">Date</TableCell>
              <TableCell align="right">Latitude</TableCell>
              <TableCell align="right">Longitude</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {logs.map((log) => (
              <TableRow
                key={log.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {log.champId}
                </TableCell>
                <TableCell align="right">{log.date}</TableCell>
                <TableCell align="right">{log.latitude}</TableCell>
                <TableCell align="right">{log.longitude}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
    </Box>  
  );
}
