const notes = require("../../models/notes")

exports.deleteNote= async(req,res)=>{
    try {
        const {noteId}= req.params;
        const userId=req.user.id;

        const existNote= await notes.findById(noteId)
        if(!existNote){
            return res.status(404).json({message:"No note to delete"})
        }

        if(existNote.userId.toString()!==userId){
            return res.status(403).json({message:"unauthorized to delete"})
        }
        const isDeleted = await notes.findByIdAndDelete(noteId)

        return res.status(200).json({message:"Deleted Successfully",isDeleted})



        
    } catch (error) {
        return res.status(500).json({message:"Server Error",error:error.message})
    }
}