import FreeBees from "../models/freeBeesSchema.js";
import { handleUpload } from "../upload.js";
import getDataUri from "../utils/dataUri.js";
import Errorhandler from "../utils/errorhandler.js";
import cloudinary from "cloudinary"

export const createFreeBees = async (req, res, next) => {
    try {
      if(req.body.key=="file"){
        const file=req.file;
      console.log(file,"uutttttt")
        
        const fileUri=getDataUri(file)
     console.log(fileUri)
     
      const uploadedFile = await cloudinary.v2.uploader.upload(fileUri.content);
      const newFreeBee = await FreeBees.create({key:req.body.key,value:uploadedFile.url});
      res.status(201).json({
        success: true,
        message: "Free bees Created Successfully",
        data:newFreeBee,
      });
   
      }
      else if(req.body.key=="video"){
        const newFreeBee = await FreeBees.create({key:req.body.key,value:uploadedFile.url});
        res.status(201).json({
          success: true,
          message: "Free bees Created Successfully",
          data:newFreeBee,
        });
      }
   
    } catch (err) {
      console.log("hekkkk")
      next(error)
    }
  };
  
  // Get all free bees
  
export const getAllFreeBees = async (req, res, next) => {
    try {
        const { search, sort } = req.query;

        let query = {};
    
        if (search) {
          query['freeBees.value'] = { $regex: search, $options: 'i' };
        }
    
        let sortOptions = { 'freeBees.key': 1 };
    
        if (sort === 'desc') {
          sortOptions = { 'freeBees.key': -1 };
        }
    
        const freeBees = await FreeBees.find(query).sort(sortOptions);
      res.status(200).json({
        success: true,
        message: "Free bees fetched Successfully",
       data: freeBees,
      });
    } catch (err) {
        next(error)
    }
  };
  
  // Get a single free bee

  export const getOneFreeBees = async (req, res, next) => {
    try {
      const freeBee = await FreeBees.findById(req.params.id);
      if (freeBee) {
        res.status(200).json({
            success: true,
            message: "Free bee fetched Successfully",
            data: freeBee,
          });
      } else {
        return next(new Errorhandler("Free Bee Not Found", 400));
      }
    } catch (err) {
        next(error)
    }
  };
  
  // Update a free bee
 
export const updateFreeBees = async (req, res, next) => {
    try {
      const updatedFreeBee = await FreeBees.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );
      if (updatedFreeBee) {
        res.status(200).json({
            success: true,
            message: "Free bee updated Successfully",
            data: updatedFreeBee,
          });
      } else {
        return next(new Errorhandler("Free Bee Not Found", 400));
      }
    } catch (err) {
        next(error)
    }
  };
  
  // Delete a free bee

  export const deleteFreeBees = async (req, res, next) => {
    try {
      const deletedFreeBee = await FreeBees.findByIdAndRemove(req.params.id);
      if (deletedFreeBee) {
        res.status(200).json({
            success: true,
            message: "Free bee deleted Successfully",
         
          });
      } else {
        return next(new Errorhandler("Free Bee Not Found", 400));
      }
    } catch (err) {
        next(error)
    }
  };
  
