const notes = require("../../models/notes")

exports.createNote= async(req,res)=>{
    try {
        const userId= req.user.id;
        const {title,content}=req.body;

        if(!title || !content){
            return res.status(401).json({message:"Title & Content Required is required"})
        }
        const newNote = await notes.create({
            title,
            content,
            userId

        })

        return res.status(201).json({message:"Note is created and send",notes:newNote})


    } catch (error) {
        return res.status(500).json({message:"Server Error",error:error.message})
    }
    
    



}