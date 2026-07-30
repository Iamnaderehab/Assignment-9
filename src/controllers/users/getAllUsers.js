const users = require ("../../models/users")

exports.allUser= async (req,res)=>{
    try {
        const userId=req.user.id;

        const user= await users.findById(userId);
        if(!user){
            return res.status(404).json({message:"User Not found"})
        }

        return res.status(200).json({message:"All Inform get successfully",
            user
        })


    } catch (error) {
         return res.status(500).json({message:"Server Error",error:error.message})
    }
}