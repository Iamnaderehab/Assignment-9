const users = require("../../models/users")
const bcrypt = require("bcryptjs")
const jwt= require("jsonwebtoken")

exports.signUser=async(req,res)=>{
    try {
        const {email,password}=req.body;
        const signUser= await users.findOne({email});
        if(!signUser){
            return res.status(404).json({message:'must signup first'})
        }
        const passwordMatch = bcrypt.compareSync(password,signUser.password)
        if(passwordMatch){
            console.log("password correct");

            const token=jwt.sign(
            {userId:signUser._id},
            process.env.JwtSecret,
            {expiresIn:"1h"}
            );
        return res.status(200).json({message:"Login Successfully",token})
       
        }

    } catch (error) {
        return res.status(500).json({message:"Error for signin "})
    }
}