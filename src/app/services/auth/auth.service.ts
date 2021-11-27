import { updateDoc, setDoc, addDoc } from '@firebase/firestore';
import { IUser } from '../../models/User';
import { of, Observable, Subject, BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {
  Auth,
  signOut,
  signInWithPopup,
  user,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
  sendEmailVerification,
  sendPasswordResetEmail,
  getAdditionalUserInfo,
  OAuthProvider,
  linkWithPopup,
  unlink,
  updateEmail,
  updatePassword,
  User,
  reauthenticateWithPopup,
  authState,
  onAuthStateChanged,
  getAuth,
  browserSessionPersistence,
  GoogleAuthProvider,
  signInWithRedirect,
  UserMetadata,

} from '@angular/fire/auth';
import { Firestore, docData, doc, DocumentReference, collection } from '@angular/fire/firestore';
import { switchMap } from 'rxjs/operators'



@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public user$!: Observable<User | null>;
  private currentUser$ = new BehaviorSubject<User | null>(null);
  constructor(
    private auth: Auth,
    private afs: Firestore,
    private router: Router

  ) {

    this.user$ = authState(this.auth).pipe(
      switchMap(user => {
        if (user) {
          return docData<User>(
            doc(this.afs, 'User', user.uid) as DocumentReference<User>
          )
        }
        else {
          return of(null)
        }
      })
    )
  }



   getAuth() {
    const auth = getAuth();
    return auth;
  }


  async googleSignIn(p: string) {

    const provider = new OAuthProvider(p);
   signInWithPopup(this.auth, provider)
      .then(res => {
          const credential = GoogleAuthProvider.credentialFromResult(res);
          // this.currentUser$.next(res.user);
          return this.updateUserData(res.user)
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode);
        console.log(errorMessage)
        
      });
  }

  signOut(): void {
    signOut(this.auth).then(res => {
        
    })
      .catch((error) => {
        console.log('lỗi chỗ đăng xuất: ', error)
      })
  }


  private updateUserData(user: User) {
    const userRef = doc(this.afs, 'User', user.uid);
      return setDoc(doc(this.afs, "User", userRef.id), {
        uid: user.uid,
        email: user.email,
        displayName: this.getAuth().currentUser?.displayName,
        photoURL: user.photoURL
      });
  

  }

  async emailLogin(email: string, password: string): Promise<any> {
    return await signInWithEmailAndPassword(this.auth, email, password);
  }

}
