
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import dotenv from 'dotenv';
import Server from './models/server.js  ';

//configure the use of environment variables
dotenv.config();

//configure the root path
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

//start the server
const server = new Server;
server.listen();

