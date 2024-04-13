const lblDesk = document.querySelector('h1');
const btnAttend = document.querySelector('button');
const lblTicket = document.querySelector('small');
const divNotifiy = document.querySelector('.alert');
const lblPendings = document.querySelector('#lblPendings')

const searchParams = new URLSearchParams( window.location.search );

if ( !searchParams.has('desk') ) {
  window.location = 'index.html';
  throw new Error('Escritorio es requerido');
}

const deskNumber = searchParams.get('desk');
lblDesk.innerText = desk;

divNotifiy.style.display = 'none';

const socket = io();


socket.on('connect', () => {
  btnAttend.disabled = false;
});

socket.on('disconnect', () => {
  btnAttend.disabled = true;
});

socket.on('pending-tickets', (pendings) => {
  if(pendings === 0){
    lblPendings.style.display = 'none';
  }else{
    lblPendings.style.display = '';
    lblPendings.innerText = pendings;
  }
})

btnAttend.addEventListener('click', () => {
  socket.emit('solve-ticket', {desk}, ( {ok, ticket, msg} ) =>{
    if(!ok){
        lblTicket.innerText = 'Nadie.';
        return divNotifiy.style.display = '';
    }
    lblTicket.innerText = 'Ticket ' + ticket.numero;
  });
});