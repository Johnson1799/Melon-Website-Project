import jwt from "jsonwebtoken";
import dotenv from 'dotenv';
dotenv.config();

/* Token-verifying function */
export const verifyToken = async(req,res,next) => {
    try{
        const token = req.headers.authorization.split(' ')[1];
        
        // display err message if token cannot be found
        if (!token){
            return res.status(403).send({message:"Access Denied"});
        }

        const verified = jwt.verify(token, process.env.JWT_SECRET);

        console.log(verified);
        req.userId = verified.userId;
        next();
    } 
    catch (err) {
        // send the error message to front-end
        res.status(403).json({message: "Access Denied"});
    }
}