const notes = require("../../models/notes")

exports.getNotes= async(req,res)=>{
    try {
        const userId= req.user.id;
        const page=parseInt(req.query.page)||1;
        const limit=parseInt(req.query.limit)||3;

        const skip= (page-1)*limit;

        const userNotes= await notes.find({userId:userId})
        .sort('-createdAt')
        .skip(skip)
        .limit(limit)

        const isAllGet= await notes.countDocuments({userId:userId})

        return res.status(201).json({message:"All Notes get successfully",
            currentPage:page,
            totalPage:Math.ceil(isAllGet/limit),
            notes:userNotes
        })


    } catch (error) {
        return res.status(500).json({message:"Server Error ",error:error.message})
    }
}