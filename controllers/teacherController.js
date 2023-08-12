
import Teacher from "../models/teacherSchema.js";
import Errorhandler from "../utils/errorhandler.js";
import mongoose from "mongoose";


export const createTeacher = async (req, res, next) => {
   
    try {
  
      const result = await Teacher.create(req.body);
if(!result){
    return next(new Errorhandler("Teacher Not Created", 400));
}
      res.status(200).json({
        success: true,
        message: "Teacher Created Successfully",
        result,
      });
    } catch (error) {
      next(error);
    }
  };

  export const updateTeacher= async(req,res, next) => {
    const teacherId = req.params.id;
    const updateData = req.body;
  
    try {
    
      const updatedTeacher= await Teacher.findByIdAndUpdate(teacherId, updateData, {
        new: true, 
      });
  
      if (!updatedTeacher) {
        return next(new Errorhandler("Teacher Not Found", 400));
      }
  
      res.status(200).json({
        success: true,
        message: "Teacher Updated Successfully",
        updatedTeacher,
      });
    } catch (error) {
        next(error);
    }
}

export const deleteTeacher=async(req,res, next) => {
const teacherId = req.params.id;

try {

  const deletedTeacher = await Teacher.findByIdAndDelete(teacherId);

  if (!deletedTeacher) {
    return next(new Errorhandler("Teacher Not Found", 400));
  }

  res.status(200).json({
    success: true,
    message: "Teacher Deleted Successfully",
    
  });
} catch (error) {

    next(error);
}
}
export const getAllTeachers=async(req,res,next)=>{
    try {
        const teachers = await Teacher.find();
        res.status(200).json({
            success: true,
            message: "Teacher Deleted Successfully",
            data:teachers
          });
    } catch (error) {
       next(error)
    }
}


export const getParticularTeacher = async (req, res, next) => {
    try {
        const teacherId = req.params.id;

        // Use aggregation to fetch teacher details and courses
        const teacher = await Teacher.aggregate([
            { $match: { _id: new mongoose.Types.ObjectId(teacherId) } },
            {
                $lookup: {
                    from: 'courses', // Collection name for courses
                    localField: '_id',
                    foreignField: 'mentorNames._id', 
                    as: 'courses'
                }
            }
        ]);

        if (!teacher || teacher.length === 0) {
            return next(new Errorhandler("Teacher Not Found", 400));
        }

        res.status(200).json({
            success: true,
            message: "Teacher Found Successfully",
            data: teacher[0]
        });
    } catch (error) {
        next(error);
    }
};


