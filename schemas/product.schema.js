const Joi = require('joi');

const id = Joi.string().uuid();
const name = Joi.string().pattern(/^[a-zA-Z0-9 ]+$/).min(3).max(15);
/*const name = Joi.string().min(3).max(15).messages({
    'string.base': `" nombre "debe ser un tipo de 'texto'`,
	'string.empty': `"nombre "no puede ser un campo vacío`,
	'string.min': `"nombre" debe tener una longitud mínima de {#limit}`,
	'string.max': `"nombre" debe tener una longitud máxima de {#limit}`
});*/
const price = Joi.number().integer().min(10);
const image = Joi.string().uri();

const createProductSchema = Joi.object({
    name: name.required(),
    price: price.required(),
    image: image.required()
});

const updateProductSchema = Joi.object({
    name: name.optional(),
    price: price.optional(),
    image: image.optional()
});

const getProductSchema = Joi.object({
    id: id.required()
});

module.exports = { createProductSchema, updateProductSchema, getProductSchema };