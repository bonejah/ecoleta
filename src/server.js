const express = require("express");

const server = express();

const db = require("./database/db");

// configurar pasta publica
server.use(express.static("public"));

// habilita o uso do req.body na aplicação 
server.use(express.urlencoded({ extended: true }))

// utilizando template engine
const nunjucjks = require("nunjucks");
nunjucjks.configure("src/views", {
  express: server,
  noCache: true,
});

// configurar caminhos da aplicação pagina inicial
server.get("/", (req, res) => {
  return res.render("index.html");
});

server.get("/create-point", (req, res) => {
  return res.render("create-point.html");
});

server.post("/save-point", (req, res) => {

  console.log(req.body )

  const query = ` INSERT INTO places (
    image,
    name,
    address,
    address2,
    state,
    city, 
    items
  ) VALUES (?, ?, ?, ?, ?, ?, ?);`

  const values = [
    req.body.image,
    req.body.name,
    req.body.address,
    req.body.address2,
    req.body.state,
    req.body.city,
    req.body.items
  ]  

  function afterInsertData(err) {
    if (err) {
      console.log(err)
      return res.send("Erro no cadastro")
    }

    console.log("Cadastrado com sucesso.")
    console.log(this)
    return res.render("create-point.html", { saved: true })
  }

  db.run(query, values, afterInsertData) 

});

server.get("/search", (req, res) => {
  const search = req.query.search

  if (search == "") {
    return res.render("search-results.html", { places: rows, total: 0 });
  }


  db.all(`SELECT * FROM places WHERE city LIKE '%${search}%'`, function (err, rows) {
    if (err) {
      return console.log(err);
    }

    console.log("Retornando registros: ");
    console.log(rows);

    const total = rows.length

    return res.render("search-results.html", { places: rows, total: total });
  });
});

// liga o servidor
server.listen(3000);
