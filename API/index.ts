import { startServer } from './server';

async function init(){
    try {
        startServer();
    } catch (error) {
        console.log("Error trying to start server", error);
        process.exit(1);
    }
}

init();