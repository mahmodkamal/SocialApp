<<<<<<< HEAD
import  firebase  from 'firebase';

export class AuthServices
{
    
    signup(email: string, password: string) {
        return firebase.auth().createUserWithEmailAndPassword(email, password);

      }
    signin(email: string, password: string) {
        return firebase.auth().signInWithEmailAndPassword(email, password);
      }
      
    logout() {
        return firebase.auth().signOut();
    }
    getActiveUser() {
        return firebase.auth().currentUser;
    }


=======
import  firebase  from 'firebase';

export class AuthServices
{
    
    signup(email: string, password: string) {
        return firebase.auth().createUserWithEmailAndPassword(email, password);

      }
    signin(email: string, password: string) {
        return firebase.auth().signInWithEmailAndPassword(email, password);
      }
      
    logout() {
        return firebase.auth().signOut();
    }
    getActiveUser() {
        return firebase.auth().currentUser;
    }


>>>>>>> 1d6f589052440d0f2fbcfa79f8bfe9e7bb254c91
}