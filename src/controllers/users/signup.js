const user=require('../../models/users');
const bcrypt=require('bcryptjs');
const crypto=require('crypto');

const algorithm ='aes-256-cbc';
const secretKey=String(process.env.PHONE_ENCRYPTION_KEY, 'hex').trim();

const iv=crypto.randomBytes(16);

/**sign up *//**hash+encyrpt */
exports.createUser=async(req,res)=>{
    try {
        const{name,email,password,age,phone}=req.body;
        const existUser=await user.findOne({email});
        if(existUser){
            return res.status(400).json({message:'This Email exists before'});
        }
        const salt=await bcrypt.genSalt(10);
        const hashPassword=await bcrypt.hash(password,salt);
        
        const iv=crypto.randomBytes(16);
        const cipher=crypto.createCipheriv(algorithm,secretKey,iv);
        let encryptedPhone=cipher.update(phone,'utf8','hex');
        encryptedPhone+=cipher.final('hex');
        const phoneStorage=`${iv.toString('hex')}:${encryptedPhone}`;
       
        const newUser=new user({
            name,
            email,
            password:hashPassword,
            age,
            phone:phoneStorage
        });
        result=await newUser.save();
        res.status(201).json({message:'User created successfully',user:result});
    } catch (error) {
        res.status(500).json({message:error.message});
    }
}

