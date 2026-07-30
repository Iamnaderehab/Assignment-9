const express=require('express');
const dotenv=require('dotenv');
const connectDB=require('./config/db.js');


dotenv.config();

const app=express();
app.use(express.json());

const userRoutes=require("./Routes/usersRoutes.js");
app.use('/users',userRoutes);

const noteRoutes=require("./Routes/notesRoutes.js");
app.use('/note',noteRoutes);



connectDB();
const port=process.env.port || 1000;

app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
})