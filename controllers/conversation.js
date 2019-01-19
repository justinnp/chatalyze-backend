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
      res.json(userLists);
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

exports.update_transcript = (req, res) => {
  var chatId = req.body.chatId;
  var someChatIdRef = convoRef.child(chatId);
  var chatString = req.body.chatString;

  // update convo
  someChatIdRef.once('value')
   .then(function (snap) {
   console.log('payload:', snap.val());

   var newChat = snap.val()['transcript'] + " " + chatString;
   console.log(newChat);
   someChatIdRef.update({
     transcript : newChat
   });

  });
}
