const express = require("express");
const cors = require("cors");
const { MongoConfig } = require("../database/config");
const fileUpload = require('express-fileupload');
class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    this.rutas = {
      usuario: `/api/usuario`,
      auth: "/api/auth",
      categoria: "/api/categoria",
      producto: "/api/producto",
      busqueda: "/api/busqueda",
      subirImagen: "/api/subirimagen"
    };
    this.middlewares();
    this.mongoCN();
    this.routers();
  }
  async mongoCN() {
    await MongoConfig();
  }
  middlewares() {
    this.app.use(cors());
    this.app.use(express.json());
    this.app.use( fileUpload({
      useTempFiles : true,
      tempFileDir : '/tmp/',
      createParentPath: true
  }));
  }
  routers() {
    this.app.use(this.rutas.usuario, require("../routers/usuario"));
    this.app.use(this.rutas.auth, require("../routers/auth"));
    this.app.use(this.rutas.categoria, require("../routers/categoria"));
    this.app.use(this.rutas.producto, require("../routers/producto"));
    this.app.use(this.rutas.busqueda, require("../routers/busqueda"))
    this.app.use(this.rutas.subirImagen, require("../routers/subirImagen"))
  }
  listen() {
    this.app.listen(this.port, () =>
      console.log(`listening on http://localhost:${this.port}`)
    );
  }
}
module.exports = {
  Server,
};
