import {type Writable, writable} from 'svelte/store';
import lib from "$lib/lib.js";

interface Response {
    response: string
    data: MapDataResponseData | IsleMap[]
}

interface MapDataResponseData {
    teleportPoints: TeleportLocation[]
    POI: PoiLocation[]
    meta: MapDataMeta
}

interface MapDataMeta {
    Key: string,
    Name: string,
    Map_Key: string
}

export interface IsleMap {
    Key: string,
    Name: string,
    Map_Key: string
}

export interface Location2D {
    Location_X: number,
    Location_Y: number,
    Location_Z: number,
}

export interface TeleportLocation extends Location2D {
    Name: string;
    Rotation_P: number,
    Rotation_Y: number,
    Rotation_R: number,
}

export interface PoiLocation extends Location2D{
    Name: string;
    Description: string;
}

const teleportStore: Writable<TeleportLocation[]> = writable(new Array<TeleportLocation>())
const poiStore: Writable<PoiLocation[]> = writable(new Array<PoiLocation>())
const mapListStore: Writable<IsleMap[]> = writable(new Array<IsleMap>())
const mapDataStore: Writable<MapDataResponseData | undefined> = writable(undefined)

const socket = new WebSocket('wss://api.pandasia.xyz/ws'); //new WebSocket("ws://localhost:8787/ws"); //

// Connection opened
socket.addEventListener('open', function (event) {
    console.log("Socket connected...");
});

// Listen for messages
socket.addEventListener('message', function (event) {
    try {
        const response = JSON.parse(event.data) as Response;
        if (response.response === "mapData") {
            const mapDataResponse = response.data as MapDataResponseData;
            teleportStore.set(mapDataResponse.teleportPoints);
            poiStore.set(mapDataResponse.POI);
            mapDataStore.set(mapDataResponse);
            return;
        }
        if (response.response === "mapList") {
            const mapDataResponse = response.data as IsleMap[];
            mapListStore.set(mapDataResponse);
            return;
        }
        console.log("action response unknown.")
        console.log(response);
    } catch (e) {
        console.log(e)
    }
});

const requestMapData = async (mapKey: string) => {
    try {
        await lib.sleepUntil(() => socket.readyState == 1, 5000);
        socket.send(JSON.stringify({"action": "mapData", "data": {"key": mapKey}}))
    } catch (e) {
        // timeout
        console.log("Cannot send request" + e
        )
        return;
    }
}

const requestMapList = async () => {
    try {
        await lib.sleepUntil(() => socket.readyState == 1, 5000);
        socket.send(JSON.stringify({"action": "mapList"}))
    } catch (e) {
        // timeout
        console.log("Cannot send request" + e
        )
        return;
    }
}

export interface response {
    response: string,
    data: string,
    tz: string
}

export default {
    subscribeTeleportLocations: teleportStore.subscribe,
    subscribePoiLocations: poiStore.subscribe,
    subscribeMapList: mapListStore.subscribe,
    subscribeMapData: mapDataStore.subscribe,
    requestMapData,
    requestMapList
}