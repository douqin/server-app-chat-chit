import firebase from 'firebase-admin';
import serviceAccount from '../../../chat-chit-vn-firebase-adminsdk-s5ov2-a6005a3a63.json'

const params = {               //clone json object into new object to make typescript happy
    type: serviceAccount.type,
    projectId: serviceAccount.project_id,
    privateKeyId: serviceAccount.private_key_id,
    privateKey: serviceAccount.private_key,
    clientEmail: serviceAccount.client_email,
    clientId: serviceAccount.client_id,
    authUri: serviceAccount.auth_uri,
    tokenUri: serviceAccount.token_uri,
    authProviderX509CertUrl: serviceAccount.auth_provider_x509_cert_url,
    clientC509CertUrl: serviceAccount.client_x509_cert_url
}
firebase.initializeApp({
    credential: firebase.credential.cert(params),
})
export default firebase;