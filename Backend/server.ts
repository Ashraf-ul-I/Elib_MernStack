import app from "./src/app";
import { config } from "./src/config/config";

const startServer=():void=>{
    const port = config.port ? parseInt(config.port, 10) : 3000;

    if (isNaN(port) || port < 0 || port >= 65536) {
        throw new RangeError(`Invalid port number: ${port}. Port should be >= 0 and < 65536.`);
    }

    app.listen(port,()=>{
        console.log(`listening on port: ${port}`)
    })
}

startServer()
