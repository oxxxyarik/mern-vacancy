import mongoose from "mongoose"

//1 - create a schema
//2 - create a model based on schema

const vacancySchema = new mongoose.Schema(
{
    title:{
        type:String,
        required: true   
    },
    description:{
        type:String,
        required: true
    },
    salary:{
        type: Number,
        required: true
    },
},
{ timestamps: true} //createdAt, updatedAt
);

const Vacancy = mongoose.model("Vacancy", vacancySchema)

export default Vacancy