import express from 'express';
import { getAllUsers, login, register } from '../controllers/userController.js';


const router = express.Router();

//List of all the users 
router.get('/', getAllUsers);
router.post('/login', login);
//creating a new user 
router.post('/register',register);


export default router;