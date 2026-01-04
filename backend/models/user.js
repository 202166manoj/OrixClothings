import mongoose from 'mongoose';

const userSchemas = new mongoose.Schema({
    firstName: {
        type : String,
        reqeired : true
    },
    lastName : {
        type : String,
        reqeired : true
    },
    email : {
        type : String,
        reqeired :true,
        unique : true
    },
    password : {
        type : String,
        reqeired : true
    },
    phone : {
        type : String,
        default : "not given"
    },
    isBlocked : {
        type : Boolean,
        default : false
    },
    role : {
        type : String,
        default : "user"
    },
    isEmailVerified : {
        type : Boolean,
        default :false
    },
    image : {
        type : String,
        default: "https://share.google/Fz89f6eMIkHzDVC2g"
    }
    

})

const User = mongoose.model("users",userSchemas)

export default User ;