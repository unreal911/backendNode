const express = require("express");
const cors = require('cors');
const { MongoConfig } = require("../database/config");
class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    this.rutas = {
      usuario: `/api/usuario`,
      auth:'/api/auth',
      categoria:'/api/categoria'
    };
    this.middlewares()
    this.mongoCN()
    this.routers()
   
  }
  async mongoCN(){
    await MongoConfig()
  }
  middlewares(){
    this.app.use(cors())
    this.app.use(express.json())
  }
  routers() {
    this.app.use(this.rutas.usuario, require("../routers/usuario"));
    this.app.use(this.rutas.auth,require('../routers/auth'))
    this.app.use(this.rutas.categoria,require('../routers/categoria'))
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
