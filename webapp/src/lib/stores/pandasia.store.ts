import {type Writable, writable} from 'svelte/store';
import lib from "$lib/lib.js";

const messageStore: Writable<response> = writable();

const socket = new WebSocket("ws://localhost:8787/ws"); //new WebSocket('https://worker.santasia.workers.dev/ws');

// Connection opened
socket.addEventListener('open', function (event) {
    console.log("It's open");
    console.log(event)
});

// Listen for messages
socket.addEventListener('message', function (event) {
    try {
         const response = JSON.parse(event.data) as response;
        messageStore.set(response);
    } catch (e) {
        console.log(e)
    }
});

const requestMapPoints = async (mapName: string) => {
    try {
        await lib.sleepUntil(() => socket.readyState <= 1, 5000);
        socket.send(JSON.stringify({"action": "mapPoints", "data": {"map": mapName}}))
    } catch {
        // timeout
        console.log("Cannot send request")
        return;
    }
}

export interface response {
    response: string,
    data: string,
    tz: string
}

export default {
    subscribe: messageStore.subscribe,
    requestMapPoints
    //sendMessage
}