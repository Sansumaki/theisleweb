import { writable } from 'svelte/store';

const messageStore = writable('');

const socket = new WebSocket("http://localhost:8787/ws"); //new WebSocket('https://worker.santasia.workers.dev/ws');

// Connection opened
socket.addEventListener('open', function (event) {
    console.log("It's open");
});

// Listen for messages
/*socket.addEventListener('message', function (event) {
    messageStore.set(event.data);
});
*/
const requestMapPoints = (mapName:string) => {
    if (socket.readyState <= 1) {
        //socket.send(JSON.stringify({ "action": "mapPoints", "data": { "map": mapName }}))
    }
}


export default {
    subscribe: messageStore.subscribe,
    requestMapPoints
    //sendMessage
}