const mongoose=require('mongoose');

const connectDB=async(req,res)=>{
     try{
        await mongoose.connect(process.env.MongoDB_URI);
        console.log('MongoDB connected successfully');
     }
     catch(err){
        console.log("Database failed to connect");
        
     }
}

module.exports=connectDB;