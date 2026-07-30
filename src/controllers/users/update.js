const users = require ("../../models/users")

exports.updateUser=async (req,res)=>{
    try {
      

        const userId = req.user.id;
        const { email, name, phone } = req.body;

        if (req.body.password) {
            return res.status(401).json({ message: "Password not access to update" });
        }
        if (email) {
            const existUser = await users.findOne({ email, _id: { $ne: userId } });
            if (existUser) {
                return res.status(409).json({ message: "Email already taken " });
            }
        }

        const isUpdated = await users.findByIdAndUpdate(
        userId,
        {email,name},
        {new :true}
     ).select("-password")
     
     if(!isUpdated){
        return res.status(404).json({message:"User not found"})
     }
     return res.status(200).json({message:"profile updated successfully",isUpdated})
     
    
    } 
 catch (error) {
        return res.status(404).json({message:"User not found"})
    }
}

