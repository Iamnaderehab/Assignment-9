const notes = require("../../models/notes")

exports.deleteAllNodes= async(req,res)=>{
    try {
    
        const userId=req.user.id;

        const deleteAll=await notes.deleteMany({userId:userId})
        
        if(deleteAll===0){
            return res.status(404).json({message:"No Nootes to delete"})
        }

      
        return res.status(200).json({message:"All Noted deleted successfully",note:this.deleteAllNodes})



        
    } catch (error) {
        return res.status(500).json({message:"Server Error",error:error.message})
    }
}