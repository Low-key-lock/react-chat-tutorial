import * as firebase from "firebase";
import firestore from "firebase/firestore";

const settings = { timestampsInSnapshots: true };

const config = {
  projectId: "reactchat-bf5a1",
  apiKey: "AIzaSyDM0EMHOa0d43C0CPt3Ope4W8lE8i31lc8",
  databaseURL: "https://reactchat-bf5a1.firebaseio.com",
};
firebase.initializeApp(config);
firebase.firestore().settings(settings);

export default firebase;
