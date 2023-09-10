import Blog from "../models/blogSchema.js";
import Errorhandler from "../utils/errorhandler.js";
import getDataUri from "../utils/dataUri.js";
import cloudinary from "cloudinary"


export const createBlog = async (req, res, next) =>
{
    try {
      const { title, content, image, author, tags } = req.body;
      const file=req.file;
      let blog;
      if(file!=undefined){
    
      const fileUri=getDataUri(file)
      const formData = JSON.parse(req.body.formData);
      const uploadedFile = await cloudinary.v2.uploader.upload(fileUri.content);
      blog = new Blog({...formData,image:uploadedFile.url});}
      else{
        const formData = JSON.parse(req.body.formData);
         blog = new Blog(formData)
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
  export const getAllblogs = async (req, res, next) => {
    try {
      const { tag } = req.query;
  
      let query = {};
  
      // Check if the tag is "all," and if not, filter by the specified tag(s)
      if (tag && tag !== 'All') {
        query.tags = { $in: [tag] };
      }
  
      const blogs = await Blog.find(query);
  
      res.status(200).json({
        success: true,
        message: "Blogs fetched successfully",
        data: blogs
      });
    } catch (error) {
      next(error);
    }
  };
  
  export const updateBlog = async (req, res, next) =>
  {
    try {
      const { title, content, image, author, tags } = req.body;
       const file=req.file;
      let updatedBlog;
      if(file!=undefined){
        const fileUri=getDataUri(file)
        const formData = JSON.parse(req.body.formData);
        const uploadedFile = await cloudinary.v2.uploader.upload(fileUri.content);
     updatedBlog = await Blog.findByIdAndUpdate(
        req.params.id,
        {
        ...formData,
          updatedAt: Date.now(),
          image:uploadedFile.url
        },
        { new: true }
      );}
      else{
        const formData = JSON.parse(req.body.formData);
        updateBlog = new Blog({...formData,updatedAt: Date.now()})
      }
  
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