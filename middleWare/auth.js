const jwt = require ("jsonwebtoken")

const authMiddleWare = (req,res,next)=>{
    
    const authHeader=req.headers.authorization;

    if(!authHeader){
       return res.status(401).json({message:"No token found"})
    }
     const token= authHeader.split(" ")[1];

     try {
        const decoded= jwt.verify(token,process.env.jwtSecret)
        req.user={id:decoded.userId}
        next();
        
     } catch (error) {
        return res.status(401).json({message:"No token found"})
     }

}

module.exports=authMiddleWare;


