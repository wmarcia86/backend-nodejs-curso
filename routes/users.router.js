const express = require('express');
const { faker } = require('@faker-js/faker')

const router = express.Router();

router.get('/', (request, response) => {
    const users = [];
    const {size} = request.query;
    const limit = size || 10;

    for (let index = 0; index < limit; index++) {
      users.push({
        id: index,
        name: faker.person.firstName(),
        last_name: faker.person.lastName(),
        image: faker.image.url(),
      });
    }

    response.json(users);
});

router.get('/:id', (request, response) => {
    const { id } = request.params;
  
    response.json({
      id,
      name: faker.person.firstName(),
      last_name: faker.person.lastName(),
      image: faker.image.url(),
    });
});

router.post("/", (request, response) => {
    const body = request.body;
    
    response.json({
        message: 'created',
        data: body
    });
});

router.put("/:id", (request, response) => {
    const { id } = request.params;
    const body = request.body;

    response.json({
        message: 'updated',
        data: body,
        id
    });
});

router.patch("/:id", (request, response) => {
    const { id } = request.params;
    const body = request.body;

    response.json({
        message: 'updated',
        data: body,
        id
    });
});

router.delete("/:id", (request, response) => {
    const { id } = request.params;
  
    response.json({
        message: 'deleted',
        id
    });
});

/*router.get('/', (request, response) => {
    const { limit, offset } = request.query;

    if (limit && offset) {
        response.json({
            limit,
            offset
        });
    } else {
        response.send('No hay parametros');
    }
});*/

module.exports = router;