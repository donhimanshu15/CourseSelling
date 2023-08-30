import Blog from "../models/blogSchema.js";
import Errorhandler from "../utils/errorhandler.js";
import getDataUri from "../utils/dataUri.js";
import cloudinary from "cloudinary"


export const createBlog = async (req, res, next) =>
{console.log(file,"heelloooo")
    try {
      const { title, content, image, author, tags } = req.body;
      const file=req.file;
      if(file!=undefined){
    
      const fileUri=getDataUri(file)
      const uploadedFile = await cloudinary.v2.uploader.upload(fileUri.content);
      const blog = new Blog({...req.body,image:uploadedFile.url});}
      else{
        const blog = new Blog(req.body)
      }
      await blog.save();
      res.status(200).json({
        success: true,
        message: "blog created Successfully",
        data: blog
    });
    console.log(req.body,"hhh")
    } catch (error) {
      next(error)
    }
  };
  
  // Get all blog posts
  export const getAllblogs = async (req, res, next) =>
  {
    try {
      const { tag } = req.query;

      let query = {};
      if (tag) {
        query.tags = { $in: [tag] };
      }
  
      const blogs = await Blog.find(query);
      res.status(200).json({
        success: true,
        message: "blog fetched Successfully",
        data: blogs
    });
    } catch (error) {
    next(error)
    }
  };
  export const updateBlog = async (req, res, next) =>
  {
    try {
      const { title, content, image, author, tags } = req.body;
      const updatedBlog = await Blog.findByIdAndUpdate(
        req.params.id,
        {
          title,
          content,
          image,
          author,
          tags,
          updatedAt: Date.now(),
        },
        { new: true }
      );
  
      if (!updatedBlog) {
        return next(new Errorhandler("Blog Not Found", 400));
      }
      res.status(200).json({
        success: true,
        message: "blog updated Successfully",
        data: updatedBlog
    });
     
    } catch (error) {
     next(error);
    }
  };
  
  // Delete a blog post
  export const deleteBlog = async (req, res, next) =>
  {
    try {
      const deletedBlog = await Blog.findByIdAndDelete(req.params.id);
  
      if (!deletedBlog) {
        return next(new Errorhandler("Blog Not Found", 400));
      }
      res.status(200).json({
        success: true,
        message: "Blog post deleted successfully",
      
    });
    
    } catch (error) {
      next(error);
    }
  };

  export const getOneBlog = async (req, res, next) =>
  {
    try {
      const blog = await Blog.findById(req.params.id);
  
      if (!blog) {
        return next(new Errorhandler("Blog Not Found", 400));
      }
  
      res.status(200).json({
        success: true,
        message: "Blog post fetch successfully",
        data: blog
    });
    } catch (error) {
      next(error)
    }
  };