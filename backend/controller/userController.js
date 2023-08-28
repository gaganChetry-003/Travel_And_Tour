import User from '../models/User.js'

//create new User
export const createUser=async(req,res)=>{
    const newUser=new User(req.body)
    try{
    const savedUser=await newUser.save()
    res.status(200)
    .json({
        success:true,
        message:'Succesfully created',
        data:savedUser
    })
    }catch(err){
         console.log(err);
        res.status(500)
    .json({
        success:false,
        message:'Failed to create.Try again'

    });

    }
}
export const updateUser=async(req,res)=>{
    const id=req.params.id
    try{
        const updatedUser=await User.findByIdAndUpdate(id,{
            $set:req.body
        },{new:true})
        res.status(200)
        .json({
            success:true,
            message:"Successfully created",
            data:updatedUser,
        })

    }catch(err){
        res.status(200)
        .json({
            success:false,
            message:"failed to update",
            
        })

    }
};
export const deleteUser=async(req,res)=>{
    const id=req.params.id
    try{
       await User.findByIdAndDelete(id,{
            $set:req.body
        },{new:true})
        res.status(200)
        .json({
            success:true,
            message:"Successfully deleted",
           
        })

    }catch(err){
        res.status(200)
        .json({
            success:false,
            message:"failed to delete",
            
        })

    }
};
export const getSingleUser=async(req,res)=>{
    const id=req.params.id
    try{
        const user=await User.findById(id);
        res.status(200)
        .json({
            success:true,
            message:"Successfully created",
            data:user
        })

    }catch(err){
        res.status(200)
        .json({
            success:false,
            message:"failed to fetch",
            
        })

    }
};
export const getAllUser=async(req,res)=>{
    //for pagination
   
    try{
        const users=await User.find({})
        .skip(page*8)
        .limit(8);
        
       
        res.status(200).json({
            success:true,
            message:"Successfully fetched",
           
            data:users


        })


    }catch(err){
        console.log(err);
        res.status(404).json({
          
            success:false,
            message:"couldn't find all"
        })

    }
};