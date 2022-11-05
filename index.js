const http = require('http')
const handles = require('./handles')
const url = require('url')
const qs = require('querystring')
const db = require("./my-project/content/about.json");


const content = '<!DOCTYPE html>' +
'<html>' +
'    <head>' +
'        <meta charset="utf-8" />' +
'        <title>ECE AST</title>' +
'    </head>' + 
'    <body>' +
'       <p>Hello World!</p>' +
'    </body>' +
'</html>'

const contentAbout = '<!DOCTYPE html>' +
'<html>' +
'    <head>' +
'        <meta charset="utf-8" />' +
'        <title>ECE AST</title>' +
'    </head>' + 
'    <body>' +
        '<h1>' + db.title + '</h1>' +
'        <h3>' + db.content + '</h3>' +
'        <p>' + db.author + '</p>' +
'        <p>' + db.date + '</p>' +
'    </body>' +
'</html>'

const serverHandle = function (req, res) {
  // Retrieve and print the current path
  const path = url.parse(req.url).pathname;
  const route = url.parse(req.url)
  const params = qs.parse(route.query)
  const server = http.createServer(handles.serverHandle);


  // Retrieve and print the queryParams
  const queryParams = qs.parse(url.parse(req.url).query);

  if (path === '/') {
    res.writeHead(200, {'Content-Type': 'text/html'}).write(content);
  } else {
    if (path === '/hello' && 'name' in params) {
      res.write('Hello ' + params['name'])
    } else {
      if (path === '/about') {
        res.writeHead(200).writeHead(200, {'Content-Type': 'text/html'}).write(contentAbout);
      }else {
      res.writeHead(404).write("not found")
    }}
  }
  res.end();
}
const server = http.createServer(serverHandle);
server.listen(8080)