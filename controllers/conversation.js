var admin = require("firebase-admin");
const fetch = require('node-fetch');
var serviceAccount = require("./../firebaseKey.json");
var gcp_creds = require('./../gcp_key.json');

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

exports.get_all_transcript = (req, res) => {
  convoRef.once('value')
    .then(function (snap) {
      res.json(snap.val());
    });
}

exports.clear = (req, res) => {
  var chatId = req.body.key;
  var someChatIdRef = convoRef.child(chatId);
  someChatIdRef.update({
    transcript : ""
  });
  console.log(`cleared conversation: ${chatId}`);
  res.sendStatus(200);
}

exports.update_transcript = (req, res) => {
  var chatId = req.body.key;
  var chatString = req.body.message;
  var user = req.body.user;
  var someChatIdRef = convoRef.child(chatId);
  // update convo
  someChatIdRef.once('value')
   .then(function (snap) {
  //  console.log('payload:', snap.val());

   var newChat = snap.val()['transcript'] + " " + chatString;
  //  console.log(newChat);
   someChatIdRef.update({
     transcript : newChat
   });
   res.sendStatus(200);
   analyze_message(chatString);
  });
}

function analyze_message(param) {
  var obj =  {
    "document":{
      "type":"PLAIN_TEXT",
      "content": param
    },
    "encodingType": "UTF8"
  }
  fetch(`https://language.googleapis.com/v1beta2/documents:analyzeSentiment?key=${gcp_creds.gcp_key}`, {
    method: 'POST',
    body: JSON.stringify(obj),
    headers: {
        'Content-Type': 'application/json'
    }
    })
    .then(res => res.json())
    .then(data => console.log(data))
}