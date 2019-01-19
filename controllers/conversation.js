var admin = require("firebase-admin");

var serviceAccount = require("./../firebaseKey.json");

// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount),
//   databaseURL: "https://chatalyze-swamphacks.firebaseio.com"
// });

var db = admin.database();
var convoRef = db.ref('conversations/');

exports.get_all_keys = (req, res) => {
  convoRef.once('value')
    .then(function (snap) {
      var userLists = [];
      for(var users in snap.val()) {
        userLists.push(users.split("&"));
      }
      console.log(userLists);
    });
}

exports.get_single_transcript = (req, res) => {
  var chatId = req.body.chatId;

  var someChatIdRef = convoRef.child(chatId);

  someChatIdRef.once('value')
    .then(function (snap) {
      res.json(snap.val());
    });

}
