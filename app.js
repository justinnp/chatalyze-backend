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

var users = [];
var key = ''
//on = listen for connection string
//emit = send out connection string, gg 2ez
io = socket(server);
io.on('connection', (socket) => {
  const id_sock = socket.id;
  console.log(id_sock);
  socket.on('SEND_MESSAGE', (data) => {
      io.emit('RECIEVE_MESSAGE', data);
  });
  socket.on('SEND_USERNAME', (username) => {
    socket.username = username;
    users.push(socket.username);
    console.log(users);
    io.emit('USER_ADDED', socket.username);
    if(users.length === 2){
      users.sort();
      key = users[0] + '&' + users[1];
      io.emit('CHAT_KEY', key);
    }
  });
  socket.on('USER_LEAVING', (user_who_left) => {
    var index = users.indexOf(user_who_left);
    if(index > -1){
      users.splice(index, 1);
    }
    console.log(users);
    socket.disconnect(1);
  });
});

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

