var admin = require("firebase-admin");

var serviceAccount = require("./../firebaseKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://chatalyze-swamphacks.firebaseio.com"
});

var db = admin.database();
var usersRef = db.ref('users/');

/* ------------------ Registration. ------------------ */
exports.add_user = (req, res) => {
  console.log(`User ${req.body.username} create!`);
  usersRef.update({
    [req.body.username] : {
      password : req.body.password,
    }
  });
}

/* ------------------ Login. ------------------ */
exports.login = (req, res) => {
  var reqUserName = req.body.username;
  var reqPassword = req.body.password;
  var somePersonRef = usersRef.child(reqUserName);

  somePersonRef.once('value')
    .then(function (snap) {
      if(snap.val().password === reqPassword) {
         console.log(`User ${reqUserName} successfully logged in!`);
         res.sendStatus(200);
      }
      else {
        console.log("Wrong username or password");
        res.sendStatus(400);
      }
    });
}


/* ------------------ Idk. ------------------*/
exports.get_user = (req, res) => {
  var name = "yeet";
  var somePersonRef = usersRef.child(name);
  somePersonRef.once('value')
   .then(function (snap) {
   console.log('snap.val():', snap.val());
   res.json(snap.val());
  });
}

exports.update_transcript = (req, res) => {
  var name = "yeet";
  var somePersonRef = usersRef.child(name);
  var trans = "";


  // update convo
  somePersonRef.once('value')
   .then(function (snap) {
   console.log('snap.val():', snap.val());
   trans = snap.val()['job'];
   console.log(trans);
   trans += " yoot this is a nother mf sentence.";

   somePersonRef.update({
     job : trans
   });
  });
}
