const mongoose=require('mongoose');
const noteSchema =new mongoose.Schema({
    title:{
        type:String,
        required:true,
        validate:{
            validator:function(value){
                return value !== value.toUpperCase();
            }
        }
    },
    content:{
        type:String,
        required:true
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'users'
    },
},
{
    timestamps:true
})

module.exports=mongoose.model('notes',noteSchema)