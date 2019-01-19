var admin = require("firebase-admin");

var serviceAccount = require("./../firebaseKey.json");

// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount),
//   databaseURL: "https://chatalyze-swamphacks.firebaseio.com"
// });

var db = admin.database();
var convoRef = db.ref('conversations/');

exports.get_all_transcript = (req, res) => {
  console.log("CONVO");

  convoRef.once('value')
    .then(function (snap) {
      console.log(snap.val());
    });
}

exports.get_single_transcript = (req, res) => {

}
