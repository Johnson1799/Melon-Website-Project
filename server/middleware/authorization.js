import jwt from "jsonwebtoken";
import dotenv from 'dotenv';
dotenv.config();

/* Token-verifying function */
export const verifyToken = async(req,res,next) => {
    try{
        /* Grab the user token */
        const token = req.headers.authorization.split(' ')[1];
        
        /* Display err message if token cannot be found */
        if (!token){
            return res.status(403).send({message:"Access Denied"});
        }

        /* Verify the user token */
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = verified.userId;
        next();
    } 
    catch (err) {
        // send the error message to front-end
        res.status(403).json({message: "Access Denied"});
    }
}