const functions = require('firebase-functions');
const cors = require('cors')({ origin: true});
const admin = require('firebase-admin');
const serviceAccount = require("./chat-bot-996a9-firebase-adminsdk-t70q7-58d6f8550f.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL:"https://chat-bot-996a9-default-rtdb.asia-southeast1.firebasedatabase.app/"
});

// import the sessions client from dialogflow
const { SessionsClient } = require('dialogflow');

// setup http cloud function
exports.dialogflowGateway = functions.https.onRequest((request, response) => {
  cors(request, response, async () => {
    const { queryInput, sessionId } = request.body;


    const sessionClient = new SessionsClient({ credentials: serviceAccount  });
    const session = sessionClient.sessionPath('your-project', sessionId);


    const responses = await sessionClient.detectIntent({ session, queryInput});

    const result = responses[0].queryResult;

    response.send(result);
  });
});
