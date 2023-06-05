const express = require('express');
const cors = require('cors');

const routerApi = require('./routes');

const { logErrors, errorHandler, boomErrorHandler } = require('./middlewares/error.handler');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

const whiteList = ['http://localhost:3001', 'https://myapp.com.ni']
const options = {
    origin: (origin, callback) => {
        if (whiteList.includes(origin) || !origin) {
            callback(null, true);
        } else {
            callback(new Error('Not Allowed'));
        }
    }
};

app.use(cors(options));

routerApi(app);

app.get('/', (request, response) => {
    response.send('Platzi - Custo Backend con Node.js: API REST con Express.js!')
});

app.use(logErrors);
app.use(boomErrorHandler);
app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}`)
    console.log(`Listening at http://localhost:${PORT}`);
});