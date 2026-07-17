const notes = require("../../models/notes")

exports.updateAllNotesTitle= async(req,res)=>{
    try {
        const userId=req.user.id;
        const {title}= req.body;

        if(!title){
            return res.status(404).json({message:"thers is no titles to update"})
        }


        const isUpdateAll= await notes.updateMany(
           {userId:userId},
            {title},
            {validate:true,new:true}
        )
        if(isUpdateAll.matchedCount==0){
            return res.status(200).json({message:"No titles to update"})
        }
        return res.status(200).json({message:"replaced Successfully",isUpdateAll})



        
    } catch (error) {
        return res.status(500).json({message:"Server Error",error:error.message})
    }
}