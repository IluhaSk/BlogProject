// @ts-check
var Express = require('express');
var bodyParser = require('body-parser');
var Post = require('./entities/Post.js');
var morgan = require('morgan');
var methodOverride = require('method-override');


const application = (port) => {
  const app = new Express();
  app.set('view engine', 'pug');
  //app.use('/assets', Express.static(process.env.NODE_PATH.split(':')[0]));
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(methodOverride('_method'));

  let posts = [
    new Post('hello', 'how are your?'),
    new Post('nodejs', 'story about nodejs')
    ];
  const logger = morgan('combined')
  app.use(logger);
  //console.log(posts);

  app.get('/', (req, res) => {
    res.status(200);
    res.render('index');
  });

  app.get('/posts/new', (req, res) => {
    res.render('posts/new', { errors: {}, form: {}});
  });

  app.get('/posts', (req, res) =>{
    res.status(200);
    res.render('posts/index', {posts: posts});
  });

  app.get('/posts/:id', (req, res) => {
    const post = posts.find((p) => p.id.toString() === req.params.id);
    res.render('posts/show', { post });
  });

  app.post('/posts', (req, res) => {
    const { title, body } = req.body;

    const errors = {};
    if (!title) {
      errors.title = "Title can't be blank";
    }

    if (!body) {
      errors.body = "Body can't be blank";
    }

    if (Object.keys(errors).length === 0) {
      const post = new Post(title, body);
      posts.push(post);
      res.redirect(`/posts/${post.id}`);
      return;
    }

    res.status(422);
    res.render('posts/new', { form: { title, body }, errors });
  });

    

    app.get('/posts/:id/edit', (req, res) => {
      const id = req.params.id;
      console.log(id);
      const post = posts.find((p) => p.id.toString() === req.params.id);
      res.render('posts/edit', { errors: {}, id: id, form: post });
    });

    app.patch('/posts/:id', (req, res) => {
      try { 
        const post = posts.find((p) => p.id.toString() === req.params.id);
        console.log(post);
        post.title = req.body.title;
        post.body = req.body.body;
        res.status(302); 
        res.render('posts/show', { post });
      } catch (e) {
        const post = posts.find((p) => p.id.toString() === req.params.id);
        res.status(422);
        res.redirect('/posts/:id/edit', {post});
      }
    });

    app.delete('/posts/:id', (req, res) =>{
      posts = posts.filter((p) => p.id.toString() !== req.params.id);
      res.status(302);
      res.redirect('/posts'); 
    });

    app.listen(port, () => console.log('Server listening on port' + port));


  // EN

  return app;
};

application(7000);