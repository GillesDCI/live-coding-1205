import bcrypt from 'bcrypt';
import User from './../models/User.js';
import authenticationHelper from './../helpers/authenticationHelper.js';

/**
 * Controller method to get all users
 * @param {*} req 
 * @param {*} res 
 */
export const getAllUsers = async(req, res) => {
    const users = await User.find({}).select('firstname lastname'); //.select (select only the firstname and lastname fields)
    return res.status(200).json(users);
}

/**
 * Controller method to login the user.
 * @param {*} req 
 * @param {*} res 
 */
export const login = async(req, res) => {
    const {email, password} = req.body;

    try {
        //check if there's a password
        if(!password){
            return res.status(400).json({message:'No password supplied'});
        }

        const user = await User.findOne({email:email});

        if(user === null){
            return res.status(400).json({message:"No user found"});
        }

        const checkPassword = await bcrypt.compare(password, user.password);

        if(checkPassword){
            console.log("yaaay authenticated");
            const token = await authenticationHelper.generateToken(user);
            return res.status(200).json({message:'You are authenticated!', token:token});
        } else {
            return res.status(400).json({message:'Passwords not matching'});
        }

    } catch (error) {
        return res.status(400).json({message:'General error upon signing in.'})
    }
}

/**
 * Controller method to register the user
 * @param {*} req 
 * @param {*} res 
 */
export const register = async(req, res) => {
    const hashedPassword = await bcrypt.hash(req.body.password,10);

    try {
        const userToAdd = new User({
            firstname:req.body.firstname,
            lastname:req.body.lastname,
            username:req.body.username,
            email:req.body.email,
            password:hashedPassword
        })
        //alternative way of creating a user.
        const resultUser = await userToAdd.save();

        return res.status(200).json({message:'User was created', createdUser:resultUser})
    } catch (error) {
        return res.status(400).json({message:'Error happened', error:error})
    }
}