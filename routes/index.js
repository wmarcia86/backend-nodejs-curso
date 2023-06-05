const express = require('express');

const categoriesRouter = require('./categories.router');
const productsRouter = require('./products.router');
const usersRouter = require('./users.router');

function routerApi(app) {
    const router = express.Router();
    app.use('/api/v1', router);

    router.use('/categories', categoriesRouter);
    router.use('/products', productsRouter);
    router.use('/users', usersRouter);

    /*const router2 = express.Router();
    app.use('/api/v2', router2)

    router2.use('/products', productsRouter);*/
}

module.exports = routerApi;