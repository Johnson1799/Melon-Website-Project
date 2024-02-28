import jwt from "jsonwebtoken";

/* Token-verifying function */
export const verifyToken = async(req,res,next) => {
    try{
        let token = req.header("Authorization");

        // display err message if token cannot be found
        if (!token){
            return res.status(403).send("Access Denied");
        }

        // grab the user token from 'Authorization' header
        if (token.startsWith("Bearer ")){
            token = token.slice(7, tokens.length).trimLeft();
        }

        const verified = jwt.verify(token, process.env.JWT_SECRET_STRING);
    } 
    catch (err) {
        // send the error message to front-end
        res.status(500).json({error: err.message});
    }
}