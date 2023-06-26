import { createContext, useEffect, useState } from 'react';
import { createUserWithEmailAndPassword, deleteUser, getAuth, GoogleAuthProvider, onAuthStateChanged, sendEmailVerification, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth';

import app from '../Firebase/Firebase.config';

export const AuthContexts = createContext();

const auth = getAuth(app)

const Contexts = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const provider = new GoogleAuthProvider()

    const googleLogIn = () => {
        return signInWithPopup(auth, provider)
    }

    const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password)
    }

    const LogIn = (email, password) => {
        setLoading(true)
        return signInWithEmailAndPassword(auth, email, password)
    }

    const forgotPass = (email) => {
        setLoading(true)
        return sendPasswordResetEmail(auth, email)
    }

    const verificationEmail = () => {
        setLoading(true)
        return sendEmailVerification(auth.currentUser)
    }

    const LogOut = () => {
        setLoading(true)
        return signOut(auth);
    }

    const updateUser = (profile) => {
        setLoading(true)
        return updateProfile(auth.currentUser, profile)
    }
    const deleteUsers = () => {
        setLoading(true)
        return deleteUser(auth.email)
    }


    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, currentUser => {
            setUser(currentUser);
            setLoading(false)
        });
        return () => unsubscribe();
    }, [])

    const authinfo = {
        user, createUser, LogIn, LogOut, updateUser, loading, setLoading, googleLogIn, deleteUsers, forgotPass, verificationEmail
    }
    return (
        <AuthContexts.Provider value={authinfo}>
            {
                children
            }
        </AuthContexts.Provider>
    );
};

export default Contexts;