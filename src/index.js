const http = require('http');
const url = require('url');

const routes = require('./routes');
const bodyParser = require('./helpers/bodyParse');

const server = http.createServer((request, response) => {
  const parsedUrl = url.parse(request.url, true);
  let { pathname } = parsedUrl;

  // console.log(`Request method: ${request.method} | Endpoint ${parsedUrl.pathname}`);
  const splitEndpoint = pathname.split('/').filter(Boolean);
  let id = null;

  if(splitEndpoint.length > 1) {
    pathname = `/${splitEndpoint[0]}/:id`,
    id = splitEndpoint[1];
  }

  const route = routes.find((routeObj) => (
      routeObj.endpoint === pathname && routeObj.method === request.method
    ));

 if (route) {
   response.send = (statusCode, body) => {
     response.writeHead(statusCode, { 'content-type': 'application/json' });
     response.end(JSON.stringify(body));
   };
   request.query = parsedUrl.query;
   request.params = { id };

   if (['POST', 'PUT', 'PATCH'].includes(request.method)) {
     bodyParser(request, () => route.handler(request, response));
   } else {
    route.handler(request, response);
   }

 } else {
   response.writeHead(404, { 'content-type': 'application/json' });
   response.end(`Cannot ${request.method} ${parsedUrl.pathname}`)
 }
  
});

server.listen(3000, () => console.log('🔥 Server started at http://localhost:3000/'));
