const express = require("express");
const cors = require("cors");
const { socketController } = require("../sockets/socketController");

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    this.server = require("http").createServer(this.app);
    this.io = require("socket.io")(this.server);

    // Middleware
    this.middlewares();

    // Rutas de la aplicación
    this.routes();

    // Sockets
    this.socketEvents();
  }

  socketEvents() {
    this.io.on("connection", socketController);
  }

  middlewares() {
    // CORS
    this.app.use(cors());

    // Directorio Público
    this.app.use(express.static("public"));
  }

  routes() {
    // this.app.use(this.paths.auth, require("../routes/auth"));
  }

  listen() {
    this.server.listen(this.port, () => {
      console.log("Servidor corriendo en puerto", this.port);
    });
  }
}

module.exports = Server;
