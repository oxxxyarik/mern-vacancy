import mongoose from "mongoose";

const submissionSchema = new mongoose.Schema({
    studentId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student',
        required: true
    },
    vacancyId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Vacancy',
        required: true
    },
    status: {
        type:String,
        enum: ['pending', 'accepted', 'rejected'],
        default: 'pending'
    }
},{
    timestamps: true
})

//только один отклик от одного студента
submissionSchema.index({ studentId: 1, vacancyId: 1 }, { unique: true });

const Submission = mongoose.model("Submission", submissionSchema)

export default Submission
