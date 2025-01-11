import expres from 'express'
import { CreateUser, ReadUser } from '../controllers/User';

const UserRouter = expres.Router();

UserRouter.get('/read', ReadUser);
UserRouter.post('/create', CreateUser);

export default UserRouter;