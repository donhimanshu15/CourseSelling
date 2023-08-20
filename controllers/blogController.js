app.post('/blogs', async (req, res) => {
    try {
      const { title, content, image, author, tags } = req.body;
      const blog = new Blog({
        title,
        content,
        image,
        author,
        tags,
      });
      await blog.save();
      res.status(201).json(blog);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  
  // Get all blog posts
  app.get('/blogs', async (req, res) => {
    try {
      const blogs = await Blog.find();
      res.json(blogs);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  });