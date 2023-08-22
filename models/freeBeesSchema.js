import mongoose  from "mongoose";

const freeBeesSchema = new mongoose.Schema({
  

 
freeBees: 
  {
    key: { type: String, required: true },
    value: { type: String, required: true },
  },

  createdAt: { type: Date, default: Date.now() },
  updatedAt: { type: Date, default: Date.now() }
})

const FreeBees = mongoose.model('FreeBees', freeBeesSchema);

export default FreeBees;