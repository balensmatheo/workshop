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
import {DataStore} from "aws-amplify";
import "./meschamps.css"
import {Champ} from "../../models";
import {useNavigate} from "react-router-dom";
import Tooltip from "@mui/material/Tooltip";
export default function Meschamps(){

    useEffect(() => {
        initializeMap().then(r => r);
        fetchChamps().then(r => r);
    }, [])

    const [markers, setMarkers] = useState([]);

    async function fetchChamps(){
        try{
            const champs = await DataStore.query(Champ);
            setMarkers(champs)
        } catch (e) {
            console.log(e)
        }
    }

    const [{ latitude, longitude }, setMarkerLocation] = useState({
        latitude: 40,
        longitude: -100,
    });

    const updateMarker = () =>
        setMarkerLocation({ latitude: latitude + 5, longitude: longitude + 5 });

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



    const navigate = useNavigate();

    return(
        <>
            <MapView style={{display: 'flex', flexDirection: 'row', width: '100%'}}>
                <LocationSearch position={"top-left"}/>
                {
                    markers.map((marker) => (
                        <Marker onClick={() => navigate("/detailsChamp", {state: {id: marker.id}})} color={marker.etat === "true" ? 'red' : 'green'} longitude={marker.longitude} latitude={marker.latitude}/>
                    ))
                }
            </MapView>
        </>
    )
}


