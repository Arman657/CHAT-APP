import jwt from 'jsonwebtoken';

export const verifyToken = (req,res,next) => {
    const token = req.cookies.jwt;
    if(!token) return res.status(401).json({message:'Token is required.'});
    jwt.verify(token,process.env.JWT_KEY,async(err,payload)=>{
        if(err) return res.status(403).json({message:'Invalid Token'});
        req.userId = payload.userId;
        next();
    })
    
}