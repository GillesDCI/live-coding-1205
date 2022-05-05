import jwt from "jsonwebtoken";

export const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
  
    if(token == null){
        return res.status(401).json({message:'unauthorized'});
    }
  
    jwt.verify(token,process.env.JWT_SECRET, (err,user) => {
     if(err) return res.status(401).json({message:'unauthorized'})
  
     req.user = user;
     next();
    });
  
}

export default {authenticateToken}