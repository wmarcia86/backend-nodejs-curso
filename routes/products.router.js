const express = require('express');
const { StatusCodes, ReasonPhrases } = require('http-status-codes');

const ProductsService = require('./../services/product.service');
const validatorHandler = require('./../middlewares/validator.handler');
const { createProductSchema, updateProductSchema, getProductSchema } = require('./../schemas/product.schema');

const router = express.Router();
const service = new ProductsService();

router.use((req, res, next) => {
    console.log('Time: ', Date.now())
    next()
});

router.get("/", async (request, response) => {
    const products = await service.find();
    
    response.status(StatusCodes.OK).json(products);
});

router.get('/filter', async (request, response) => {
    response.send('Yo soy un filtro');
});

/*router.get('/:id', (request, response) => {
    //const id = request.params.id;
    const { id } = request.params; // Usando la destructuracion de emacscript

    if (id === '999') {
        response.status(404).json({
            message: 'Not found'
        });
    } else {
        response.status(200).json({
            id,
            name: 'Product 2',
            price: 2000
        });
    }    
});*/

router.get('/:id', 
    validatorHandler(getProductSchema, 'params'),
    async (request, response, next) => {
        try {
            //const id = request.params.id;
            const { id } = request.params; // Usando la destructuracion de emacscript
            const product = await service.findOne(id);

            response.status(StatusCodes.OK).json(product);
        } catch (error) {
            next(error);
        }
    }
);

router.post("/",
    validatorHandler(createProductSchema, 'body'),
    async (request, response, next) => {
        try {        
            const body = request.body;
            const newProduct = await service.create(body);
        
            response.status(StatusCodes.CREATED).json({
                message: 'created',
                data: newProduct
            });
        } catch (error) {
            next(error);
        }
    }
);

router.put("/:id",
    validatorHandler(getProductSchema, 'params'),
    validatorHandler(updateProductSchema, 'body'),
    async (request, response, next) => {
        try {
            const { id } = request.params;
            const body = request.body;
            const product = await service.update(id, body);

            response.status(StatusCodes.OK).json({
                message: 'updated',
                data: product,
                id
            });
        } catch (error) {
            next(error);
        }
    }
);

router.patch("/:id",
    validatorHandler(getProductSchema, 'params'),
    validatorHandler(updateProductSchema, 'body'),
    async (request, response, next) => {
        try {
            const { id } = request.params;
            const body = request.body;
            const product = await service.update(id, body);

            response.status(StatusCodes.OK).json({
                message: 'updated',
                data: product,
                id
            });
        } catch (error) {
            next(error);
        }
    }
);

router.delete("/:id", 
    validatorHandler(getProductSchema, 'params'),
    async (request, response, next) => {
        try {
            const { id } = request.params;
            const result = await service.delete(id);
    
            response.status(StatusCodes.OK).json({
                message: 'deleted',
                id: result.id
            });
        } catch (error) {
            next(error);
        }
    }
);

/*app.get("/products", (request, response) => {
    response.json({
        name: 'Product 1',
        price: 1000
    });
});*/

/*app.get("/products", (request, response) => {
    response.json([
        {
            name: 'Product 1',
            price: 1000
        },
        {
            name: 'Product 2',
            price: 2000
        }
    ]);
});*/

/*
app.get("/products", (request, response) => {
    const products = [];

    for (let index = 0; index < 100; index++) {
        products.push({
            id: index,
            name: faker.commerce.productName(),
            price: parseInt(faker.commerce.price(), 10),
            image: faker.image.imageUrl()
        });
    }

    response.json(products);
});*/

module.exports = router;