import mongoose from "mongoose";

const examSchema  = new mongoose.Schema({
     userId : {type: mongoose.Schema.Types.ObjectId, ref: "User"},
     friendsId: {type: mongoose.Schema.Types.ObjectId, ref: "User"},
     isFriend: {type: Boolean, default: false},
     createdAt: {type: Date, default: Date.now()},
     updatedAt: {type: Date, default: Date.now()}
}) 

const Exam = mongoose.model("Exam", examSchema)

export default Exam;