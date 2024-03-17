import {type Writable, writable} from 'svelte/store';

const messageStore: Writable<response> = writable();

const socket = new WebSocket("http://localhost:8787/ws"); //new WebSocket('https://worker.santasia.workers.dev/ws');

// Connection opened
socket.addEventListener('open', function (event) {
    console.log("It's open");
    console.log(event)
});

// Listen for messages
socket.addEventListener('message', function (event) {
    try {
        let response = JSON.parse(event.data) as response;
        messageStore.set(response);
    }
    catch (e) {
        console.log(e)
    }
});

const requestMapPoints = (mapName:string) => {
    if (socket.readyState <= 1) {
        socket.send(JSON.stringify({ "action": "mapPoints", "data": { "map": mapName }}))
    }
}

export interface response {
    response : string,
    data: string,
    tz: string
}

export default {
    subscribe: messageStore.subscribe,
    requestMapPoints
    //sendMessage
}