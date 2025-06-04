const express = require('express');

const routes = express.Router();

console.log("Routing..");

const postCtl = require('../controller/postController');

routes.get('/',postCtl.homepage);

routes.get('/about',postCtl.aboutpage);

routes.get('/service',postCtl.servicepage);

routes.get('/blog',postCtl.blogpage);

routes.get('/contact',postCtl.contactpage);

routes.get('/404',postCtl.errorpage);

routes.use('/student',require('./student'));

module.exports = routes;
