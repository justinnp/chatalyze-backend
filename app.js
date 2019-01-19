const express = require('express');
const cors = require('cors');
const userRoutes = require('./routes/user');
const port = process.env.PORT || 3001;

app = express();

app.use(cors())
app.use('/user', userRoutes);

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

app.listen(port, () => console.log('big ole yeet'));

