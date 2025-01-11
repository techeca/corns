import express, { Request, Response, NextFunction } from 'express'
import cors from 'cors';
import dotenv from 'dotenv'
import PurchaseRouter from './routes/Purchase';
import UserRouter from './routes/User';
import ErrorHandler from './middleware/ErrorHandler';

dotenv.config()
const app = express();

//Se configura json y cors para permitir las solicitudes desde el front
function setupMiddleware() {
    app.use(express.json());
    app.use(cors({
        origin: process.env.FRONT_URL,
        credentials: true,
    }))
}

//Configuración de rutas
function setupRoutes() {
    app.use('/purchase', PurchaseRouter)
    app.use('/user', UserRouter)
}

//Inicio
app.get('/', (req: Request, res: Response) => {
    res.send('API ON')
})

//health
app.get('/health', (req: Request, res: Response) => {
    res.status(200).json({
        status: 'ON',
        env: process.env.MODE,
        routes: [
            {
                name: '/purchase',
                endpoints: ['create', 'read']
            }
        ]
    })
})

//Funcion para lanzar API
export async function startServer() {
    const PORT = process.env.PORT;

    //Se cargan configuración de API
    setupMiddleware();
    setupRoutes();

    //Middleware para manejo de errores
    app.use(ErrorHandler);

    app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
    })
}