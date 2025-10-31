import mongoose from "mongoose"
import {USER_ROLES} from '../constants/roles.js'

//1 - create a schema
//2 - create a model based on schema

const userSchema = new mongoose.Schema(
{
    email:{
        type:String,
        required: true,
        unique: true 
    },
    password:{
        type:String,
        required: true
    },
    role:{
        type: String, 
        enum: Object.values(USER_ROLES), 
        required: true
    }
}, {
    timestamps: true
}
);

const User = mongoose.model("User", userSchema)

export default User