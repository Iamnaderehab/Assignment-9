const users = require ("../../models/users")

exports.deleteUser= async(req, res)=>{
    
    try {
        
        const userId= req.user.id;
        
        const isDeleted= await users.findByIdAndDelete(userId)
        if(!isDeleted){
            return res.status(404).json({message:"User Not Found"})
        }
        return res.status(200).json({message:"profile deleted successfully",
            isDeleted:{
                _id:isDeleted._id,
                email:isDeleted.email,

            }
        })



    } catch (error) {
        return res.status(500).json({message:"Server Error",error:error.message})
    }
}