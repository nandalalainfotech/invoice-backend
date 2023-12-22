import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({
    path: path.resolve(__dirname, `${process.env.NODE_ENV}.env`)
});

const config = {
    NODE_ENV : process.env.NODE_ENV || 'development',
    HOST : process.env.HOST || 'http://localhost',
    PORT : process.env.PORT || 3001
}

export default config;