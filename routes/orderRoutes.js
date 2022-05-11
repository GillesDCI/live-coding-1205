import express from 'express';
// import { createOrder, 
//     getAllOrders, 
//     getOrderByUserId, 
//     getOrdersPaging, 
//     getOrdersPagingSkipLimit } from '../controllers/orderController.js';
import passport from 'passport';

import controller from '../controllers/orderController.js';

const router = express.Router();

router.use(passport.authenticate('jwt',{session:false}));
//unprotected
router.get('/', controller.getAllOrders);
//using skip and limit to go through pages
router.get('/paging/:skip/:limit', controller.getOrdersPagingSkipLimit);


//from here on the routes are protected

router.get('/paging', controller.getOrdersPaging);
//Get the order by userID
router.get('/byuser/:userid', controller.getOrderByUserId);
//Create a new order 
router.post('/add', controller.createOrder);

export default router;