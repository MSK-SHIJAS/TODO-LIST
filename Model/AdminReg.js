import mongoose from 'mongoose'

const AdminRegister=new mongoose.Schema({
    username:{ type:String,required:true},
    email:{ type:String},
    password:{ type:String},
    userType:{
        type:String
    },
    userId:{
        type:mongoose.Types.ObjectId
    }
})

const Adminreg=mongoose.model('Adminreg',AdminRegister)

export default Adminreg