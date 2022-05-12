import express from 'express';
import passport from 'passport';
import { getAllUsers, getProfile, login, register } from '../controllers/userController.js';


const router = express.Router();

//List of all the users 
router.get('/', getAllUsers);

router.post('/login', login);
//creating a new user 
router.post('/register',register);

router.use(passport.authenticate('jwt',{session:false}));

router.get('/profile', getProfile)

export default router;