import { createContext,useContext,useState } from "react";
import {initializeApp} from 'firebase/app';
import {getAuth,createUserWithEmailAndPassword,signInWithEmailAndPassword} from 'firebase/auth';
import {getDatabase,set,ref} from 'firebase/database'
const firebaseConfig={
    // Enter your own cdn

    
}
const firebaseApp =initializeApp(firebaseConfig);
const auth=getAuth(firebaseApp);
const database=getDatabase(firebaseApp)
const FirebaseContext =createContext(null)
export const useFirebase =()=>useContext(FirebaseContext)

export const FirebaseProvider = (props) =>{
    const signup=(email,password)=>{
        return createUserWithEmailAndPassword(auth,email,password)

    }
    const signin=(email,password)=>{
        return signInWithEmailAndPassword(auth,email,password)
    }
    const putData=(key,data)=>set(ref(database,key),data);
    return(
        <FirebaseContext.Provider
        value={{signup,putData,signin}}>
           
            {props.children}
        </FirebaseContext.Provider>
    )
}