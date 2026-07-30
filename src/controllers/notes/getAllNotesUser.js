const notes = require("../../models/notes")
const users = require ("../../models/users")
exports.getNotesUser= async(req,res)=>{
    try {
    
        const userId=req.user.id;

        const userNotes=await notes.find({
            userId:userId,
        }).select({

            title:1,
            userId:1,
            createdAt:1

        }
        ).populate({
            path:"userId",
            model:users,
            select:"email"
    })

        return res.status(200).json({message:"get all users notes Successfully",note:userNotes})



        
    } catch (error) {
        return res.status(500).json({message:"Server Error",error:error.message})
    }
}