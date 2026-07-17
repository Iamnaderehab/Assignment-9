const notes = require("../../models/notes")

exports.getNoteById= async(req,res)=>{
    try {
        const {noteId}= req.params;
        const userId=req.user.id;

        const note= await notes.findById(noteId)
        if(!note){
            return res.status(404).json({message:"no note found"})
        }

        if(note.userId.toString()!==userId){
            return res.status(403).json({message:"unauthorized to get all notes"})
        }


        return res.status(200).json({message:"get all notes Successfully",note})



        
    } catch (error) {
        return res.status(500).json({message:"Server Error",error:error.message})
    }
}