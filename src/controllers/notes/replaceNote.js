const notes = require("../../models/notes")

exports.replaceNote= async(req,res)=>{
    try {
        const {noteId}= req.params;
        const userId=req.user.id;
        const {title,content}= req.body;

        const existNote= await notes.findById(noteId)
        if(!existNote){
            return res.status(404).json({message:"must write title and content first"})
        }

        if(existNote.userId.toString()!==userId){
            return res.status(403).json({message:"unauthorized to update"})
        }
        if(!title||!content){
            return res.status(404).json({message:"thers is no title and content to replace"})
        }


        const isReplaced= await notes.findOneAndReplace(
            {_id:noteId},
            {title,content,userId},
            {validate:true,new:true}
        )

        return res.status(200).json({message:"replaced Successfully",isReplaced})



        
    } catch (error) {
        return res.status(500).json({message:"Server Error",error:error.message})
    }
}