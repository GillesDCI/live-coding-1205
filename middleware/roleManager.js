/**
 * Middleware to check if user is an admin.
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns 
 */
export const isAdmin = (req, res, next) => {

    if(req.user == null){
        return res.status(401).json({message:'No user authenticated'});
    }

    if(req.user.roles == null){
        return res.status(401).json({message:'No roles found'});
    }

    if(!req.user.roles.includes('ADMIN')){
        return res.status(401).json({message:'Only allowed for admin users'});
    }

    next();
}

export default {isAdmin}