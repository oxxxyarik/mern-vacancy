import mongoose from 'mongoose';

const employerSchema = new mongoose.Schema({
  userId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  name: { 
    type: String, 
    required: true 
  },
  company: { 
    type: String, 
    required: true 
  }
});

const Employer = mongoose.model("Employer", employerSchema)

export default Employer