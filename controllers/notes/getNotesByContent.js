const notes = require("../../models/notes")

exports.getNoteByContent= async(req,res)=>{
    try {
    
        const userId=req.user.id;
        const {content}=req.query;

        
        if(!content){
            return res.status(404).json({message:"nothing to found & content is required"})
        }
        const foundNotes=await notes.find({
            userId:userId,
            content:{$regex:content,$options:"i"}
        })

        if(foundNotes.length=== 0){
            return res.status(403).json({message:"No found content"})
        }


        return res.status(200).json({message:"get all notes Successfully",note:foundNotes})



        
    } catch (error) {
        return res.status(500).json({message:"Server Error",error:error.message})
    }
}