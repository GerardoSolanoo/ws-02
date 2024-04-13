const lblNewTicket = document.querySelector('#lbl-new-ticket');
const btnCreate = document.querySelector('#btnCreate');

const socket = io();

socket.on('connect', () => {
    btnCreate.disabled = false;
})

socket.on('disconnect', () => {
    btnCreate.disabled = true;
})

socket.on('last-ticket', (last) =>{
    lblNewTicket.innerText = 'Ticket ' + last;
})

btnCreate.addEventListener('click', ()=>{
    socket.emit('next-ticket', 'Tickets generator', (ticket)=>{
        console.log('👌 desde el server: ', ticket);
        lblNewTicket.innerText = ticket;
    })
})