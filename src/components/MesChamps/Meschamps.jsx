import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import {Divider, Link} from "@mui/material";
import {useEffect, useState} from "react";
import { MapView, LocationSearch } from '@aws-amplify/ui-react';
import { createMap, createAmplifyGeocoder } from "maplibre-gl-js-amplify";
import "maplibre-gl/dist/maplibre-gl.css";
import "@maplibre/maplibre-gl-geocoder/dist/maplibre-gl-geocoder.css";
import "maplibre-gl-js-amplify/dist/public/amplify-geocoder.css";
import '@aws-amplify/ui-react/styles.css';
import {Marker} from "react-map-gl";
import Button from "@mui/material/Button";


export default function Meschamps(){


    useEffect(() => {
        fetchChamps().then(r => r);
        initializeMap().then(r => r);
    }, [])

    async function initializeMap() {
        const el = document.createElement("div");
        el.setAttribute("id", "map");
        document.body.appendChild(el);

        const map = await createMap({
            container: "map",
            center: [-123.1187, 49.2819], // [Longitude, Latitude]
            zoom: 11,
        })

        map.addControl(createAmplifyGeocoder());
    }

    async function fetchChamps(){
        try{

        } catch (e) {
            console.log(e);
        }
    }

    const [{ latitude, longitude }, setMarkerLocation] = useState({
        latitude: 40,
        longitude: -100,
    });

    const updateMarker = () =>
        setMarkerLocation({ latitude: latitude + 5, longitude: longitude + 5 });


    return(
        <>
            <Box>
                <Box>
                    <Typography sx={{fontSize: "calc(8px + 2.2vmin)"}}>Liste de vos champs</Typography>
                </Box>
                <Divider/>
                <MapView>
                    <LocationSearch position="top-left" />
                    <Marker latitude={latitude} longitude={longitude} />
                </MapView>
            </Box>
        </>

    )
}

