const express = require('express');
const cors = require('cors');
const userRoutes = require('./routes/user');
const conversationRoutes = require('./routes/conversation');
const bodyParser = require('body-parser');
const socket = require('socket.io');
const port = process.env.PORT || 3001;

app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : false}));

app.use(cors())
app.use('/user', userRoutes);
app.use('/conversation', conversationRoutes);

const server = app.listen(port, () => console.log('big ole yeet'));

var clients = [];

io = socket(server);
io.on('connection', (socket) => {
    clients.push(client); 
    console.log(socket.id);
    socket.on('SEND_MESSAGE', (data) => {
        io.emit('RECIEVE_MESSAGE', data);
    })
});

app.get('/get_clients', (req, res) => {
  const obj = { "clients": clients}
  res.json(obj);
})



//hello there
app.get('/', (req,res) => {
    res.send('chatalyze backend');
});

//--------------------handle errors---------------------
app.use((req, res, next) => {
    const error = new Error("Not found");
    error.status = 404;
    next(error);
  });

  app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
      error: {
        message: error.message
      }
    });
  });
  //--------------------------------------------------------

