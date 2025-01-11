import express from 'express';
import { CreatePurchase, ReadPurchase } from '../controllers/Purchase';
import { RateLimiter } from '../middleware/RateLimiter';

const PurchaseRouter = express.Router();

//Middleware RateLimiter al realizar una compra
PurchaseRouter.post('/create', RateLimiter, CreatePurchase);
PurchaseRouter.get('/list', ReadPurchase);

export default PurchaseRouter;