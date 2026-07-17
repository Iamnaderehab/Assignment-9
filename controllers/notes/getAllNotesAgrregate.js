const { default: mongoose } = require("mongoose");
const notes = require("../../models/notes")
const users = require ("../../models/users")
exports.getNotesAggregate= async(req,res)=>{
    try {
    
        const userId=req.user.id;
        const {title}= req.query;

        const beforeNote={
            userId:new mongoose.Types.ObjectId(userId)
        }

        if(title){
            beforeNote.title={$regix:title,$options:"i"}
        }

        const aggregateNotes= await notes.aggregate([

            {$match:beforeNote},
            {
                $lookup:{
                    from:"users",
                    localField:"userId",
                    foreignField:"_id",
                    as:"userInfo"
                }
            },
            {$unwind:"$userInfo"},
            {
                $project:
                {
                    _id:1,
                    title:1,
                    content:1,
                    createdAt:1,
                    user:{
                        name:"$userInfo.name",
                        email:"$userInfo.email"
                    }
                }
            }





        ])
    

        return res.status(200).json({message:"get all users notes Successfully by aggregate",note:aggregateNotes})



        
    } catch (error) {
        return res.status(500).json({message:"Server Error",error:error.message})
    }
}