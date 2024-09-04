import express, {Application} from 'express';  
import bodyParser from 'body-parser';  
import AuthController from "../controllers/AuthController";  
import LugaresController from '../controllers/LugaresController';  
import ReservacionController from '../controllers/ReservacionController';
import cors, { CorsOptions } from 'cors';
  
const app: Application = express();

const corsOption: CorsOptions = {
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200
}

app.use(cors(corsOption));
app.use(bodyParser.json());  
LugaresController.mount(app);  
AuthController.mount(app);
ReservacionController.mount(app);
export default app;