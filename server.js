const http = require('http');
const { createReadStream } = require('fs')

const HTML_CONTENT_TYPE = 'text/html'

const requestListener  = (request, response) => {

    response.writeHead(200, { 'Content-Type': HTML_CONTENT_TYPE })
    // leemos el fichero index.html y su contenido lo redirigimos a la respuesta
    createReadStream('./frontend/frontend.html').pipe(response)
}

http.createServer(requestListener).listen(3001);

console.log('Escuchando http en el puerto 3001');