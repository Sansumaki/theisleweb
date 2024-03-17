const sleepUntil = async (f: () => boolean, timeoutMs: number) => {
    return new Promise((resolve, reject) => {
        const timeWas = new Date().getTime();
        const wait = setInterval(function() {
            if (f()) {
                console.log("resolved after", new Date().getTime() - timeWas, "ms");
                clearInterval(wait);
                resolve(null);
            } else if (new Date().getTime() - timeWas > timeoutMs) { // Timeout
                console.log("rejected after", new Date().getTime() - timeWas, "ms");
                clearInterval(wait);
                reject();
            }
        }, 20);
    });
}

export default {
    sleepUntil
}