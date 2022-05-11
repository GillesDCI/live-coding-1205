import Order from '../models/Order.js';

/**
 * Controller method to list all the orders.
 * @param {*} req 
 * @param {*} res 
 */
export const getAllOrders = async(req, res) => {
    console.log("The user is:", req.user)
    const orders = await Order.find().populate('user');
    res.status(200).json(orders);
}

/**
 * Controller method to get all orders using paging skip limit
 * @param {*} req 
 * @param {*} res 
 */
export const getOrdersPagingSkipLimit = async(req, res) => {
    const orders = await Order.find({})
    .populate('user')
    .skip(Number(req.params.skip)) //skip this many documents.
    .limit(Number(req.params.limit)) //limit the amount of documents to this limit.
    
    return res.status(200).json(orders);
}

/**
 * Controller method to get all orders using paging with query parameter
 * page and pageSize.
 * @param {*} req 
 * @param {*} res 
 */
export const getOrdersPaging = async(req ,res) => {
    const page = Number(req.query.page) || 1
    const pageSize = Number(req.query.pageSize) || 10 

    //example page = 2 and pageSize = 3
    // (2-1) = 1 * 3 = skip(3)
    //example page = 3 and pageSize = 3
    // (3-1) = 2 * 3 = skip(6)
    //example page = 4 and pageSize = 3
    // (4-1) = 3 * 3 = skip(9)
    const skipRows = (page - 1) * pageSize;

    const orders = await Order.find({})
    .populate('user')
    .skip(skipRows)
    .limit(pageSize)

    return res.status(200).json(orders);
}

/**
 * Controller method that gets the orders by userID 
 * @param {*} req 
 * @param {*} res 
 */
export const getOrderByUserId = async(req, res) => {
    const orders = await Order.find({user:req.params.userid})
    res.status(200).json(orders);
}

/**
 * Controller method that creates a new order
 * @param {*} req 
 * @param {*} res 
 */
export const createOrder = async(req, res) => {
    try {
        const resultOrder =  await Order.create({
            orderDescription:req.body.orderDescription,
            totalPrice:req.body.totalPrice,
            vat:req.body.vat,
            totalPriceInclVat: req.body.totalPriceInclVat,
            user: req.body.userID //we post the user ID this is a reference to the user document that's connected to this order.
        })

        return res.status(200).json({message:'Order was created', createdOrder:resultOrder})
    } catch (error) {
        return res.status(400).json({message:'Error happened', error:error})
    }
}

export default {getAllOrders, getOrdersPaging, getOrdersPagingSkipLimit, getOrderByUserId, createOrder}