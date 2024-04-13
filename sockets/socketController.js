const TicketControl = require("../models/ticket-control");

const ticketControl = new TicketControl();

const socketController = (socket) => {
  console.log("Cliente conectado 🟢", socket.id);
  socket.emit('last-ticket', ticketControl.last)
  socket.emit('actual-state', ticketControl.lastFour);
  socket.emit('pending-tickets', ticketControl.tickets.length);1

  socket.on("next-ticket", (payload, callback) => {
    console.log("💬 -> Siguiente ticket 🔴", payload);
  });
  
  socket.emit('solve-tickets', ticketControl.tickets.length);

  socket.on('solve-ticket', ({desk}, callback) => {
    if(!desk){
      return callback({
        ok: false,
        msg: 'Es necesario un escritorio'
      });
    }

    const ticket = ticketControl.attendTicket(desk);

    socket.broadcast.emit('actual-state', ticketControl.lastFour);
    socket.emit('pending tickets', ticketControl.tickets.length);
    socket.broadcast.emit('pending-tickets', ticketControl.tickets.length);

    if(!ticket){
      callback({
        ok: false,
        msg: 'No hay tickets pendientes'
      });
    }else{
      callback({
        ok: true,
        ticket
      })
    }
  })
};

module.exports = {
  socketController,
};
