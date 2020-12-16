import admin from "firebase-admin"
import serviceAccount from "../questionsofcom.json";

if(!admin.apps.length){
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
        databaseURL: "https://bpac11.firebaseio.com"
    })
}
export default admin