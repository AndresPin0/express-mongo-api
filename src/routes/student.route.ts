import { Router } from 'express';
import { studentController } from '../controllers';
import { auth } from '../middleware/auth.middleware';

export const studentRouter = Router();

studentRouter.get('/', studentController.findAll);
studentRouter.post('/login', studentController.login);
studentRouter.post('/create', auth,studentController.create);
studentRouter.put('/update/:email', studentController.update);
