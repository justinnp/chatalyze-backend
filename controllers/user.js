var admin = require("firebase-admin");

var serviceAccount = require("./../firebaseKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://chatalyze-swamphacks.firebaseio.com"
});

var db = admin.database();
var usersRef = db.ref('users/');

exports.add_user = (req, res) => {
  console.log("create user method");
  usersRef.update({
    yeet : {
      job : "yeet",
      password : "password",
      online : true
    }
  });
}

exports.get_user = (req, res) => {
  var name = "yeet";
  var somePersonRef = usersRef.child(name);
  somePersonRef.once('value')
   .then(function (snap) {
   console.log('snap.val():', snap.val());
   res.json(snap.val());
  });
}
