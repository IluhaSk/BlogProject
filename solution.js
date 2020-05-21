// @ts-check
var Express = require('express');
var bodyParser = require('body-parser');
var Post = require('./entities/Post.js');
var morgan = require('morgan');


const application = (port) => {
  const app = new Express();
  app.set('view engine', 'pug');
  //app.use('/assets', Express.static(process.env.NODE_PATH.split(':')[0]));
  app.use(bodyParser.urlencoded({ extended: false }));
  
  const posts = [];
  const logger = morgan('combined')
  app.use(logger);
  //console.log(posts);
  app.get('/', (req, res) => {
    res.status(200);
    res.render('./layouts/app');
  });

  app.get('/posts/new', (req, res) =>{
    res.status(200);
    res.render('./posts/new');
  })

  app.get('/posts', (req, res) =>{
    res.status(200);
    res.render('./posts/index', {posts: posts});
  })

   app.get('/posts/:id', (req, res) =>{
     let id = req.params['id'] - 1;
    res.render('./posts/show', {postTitle: posts[id].title, postText: posts[id].body});
  })

    app.post('/posts', (req, res) =>{
      try{ 
        let title = req.body.title; 
        let body = req.body.body;
        if ((title == undefined) || (body == undefined)) {
          throw e;
        } else { 
            posts.push(new Post(title, body)); 
            console.log(posts);
            res.redirect('/posts/')
        }
      } catch (e) {
        res.status(422)
        res.render('./posts/new');
      }
    }); 

    app.listen(port, () => console.log('Server listening on port' + port));


  // EN

  return app;
};

application(7000);