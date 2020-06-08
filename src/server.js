const express = require("express");

const server = express();

// configurar pasta publica
server.use(express.static("public"))

// utilizando template engine
const nunjucjks = require("nunjucks")
nunjucjks.configure("src/views", {
  express: server,
  noCache: true
}) 

// configurar caminhos da aplicação pagina inicial
server.get("/", (req, res) => {
  return res.render("index.html")
});

server.get("/create-point", (req, res) => {
  return res.render("create-point.html")
});

server.get("/search", (req, res) => {
  return res.render("search-results.html")
});

// liga o servidor
server.listen(3000);
