import React, { createContext, useState, useEffect } from 'react';
import { auth, db } from '../config/firebase';
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged 
} from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        try {
          // Fetch additional user details from Firestore
          const userDocRef = doc(db, 'users', firebaseUser.uid);
          const userDoc = await getDoc(userDocRef);
          
          if (userDoc.exists()) {
            const userData = userDoc.data();
            const fullUser = {
              _id: firebaseUser.uid, // mapped to _id for compatibility with pages using user._id
              uid: firebaseUser.uid,
              email: firebaseUser.email,
              name: userData.name,
              isAdmin: userData.isAdmin || false,
              purchasedProjects: userData.purchasedProjects || [],
              token: firebaseUser.accessToken || 'firebase-token' // fallback for components checking user.token
            };
            setUser(fullUser);
            localStorage.setItem('userInfo', JSON.stringify(fullUser));
          } else {
            // Document doesn't exist, create it (fallback)
            const newUserDoc = {
              name: firebaseUser.displayName || 'Client',
              email: firebaseUser.email,
              isAdmin: false,
              purchasedProjects: [],
              createdAt: new Date().toISOString()
            };
            await setDoc(userDocRef, newUserDoc);
            
            const fullUser = {
              _id: firebaseUser.uid,
              uid: firebaseUser.uid,
              email: firebaseUser.email,
              name: newUserDoc.name,
              isAdmin: false,
              purchasedProjects: [],
              token: 'firebase-token'
            };
            setUser(fullUser);
            localStorage.setItem('userInfo', JSON.stringify(fullUser));
          }
        } catch (error) {
          console.error('Error fetching user profile from Firestore:', error);
          // If Firestore fails (e.g. not configured yet), still set basic auth user so UI doesn't break
          setUser({
            _id: firebaseUser.uid,
            uid: firebaseUser.uid,
            email: firebaseUser.email,
            name: firebaseUser.displayName || 'Client',
            isAdmin: false,
            purchasedProjects: [],
            token: 'firebase-token'
          });
        }
      } else {
        setUser(null);
        localStorage.removeItem('userInfo');
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const login = async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const firebaseUser = userCredential.user;
      
      const userDocRef = doc(db, 'users', firebaseUser.uid);
      const userDoc = await getDoc(userDocRef);
      let userData = { name: 'Client', isAdmin: false, purchasedProjects: [] };
      
      if (userDoc.exists()) {
        userData = userDoc.data();
      } else {
        // Create if missing
        userData = {
          name: firebaseUser.displayName || email.split('@')[0],
          email: firebaseUser.email,
          isAdmin: false,
          purchasedProjects: [],
          createdAt: new Date().toISOString()
        };
        await setDoc(userDocRef, userData);
      }

      const fullUser = {
        _id: firebaseUser.uid,
        uid: firebaseUser.uid,
        email: firebaseUser.email,
        name: userData.name,
        isAdmin: userData.isAdmin || false,
        purchasedProjects: userData.purchasedProjects || [],
        token: 'firebase-token'
      };

      setUser(fullUser);
      localStorage.setItem('userInfo', JSON.stringify(fullUser));
      return { success: true, user: fullUser };
    } catch (error) {
      let errorMessage = 'Login failed';
      if (
        error.code === 'auth/user-not-found' || 
        error.code === 'auth/wrong-password' || 
        error.code === 'auth/invalid-credential'
      ) {
        errorMessage = 'Invalid email or password';
      } else if (error.code === 'auth/invalid-email') {
        errorMessage = 'Invalid email address format';
      } else {
        errorMessage = error.message;
      }
      return { success: false, error: errorMessage };
    }
  };

  const register = async (name, email, password) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const firebaseUser = userCredential.user;
      
      const userData = {
        name,
        email,
        isAdmin: false,
        purchasedProjects: [],
        createdAt: new Date().toISOString()
      };
      
      await setDoc(doc(db, 'users', firebaseUser.uid), userData);
      
      const fullUser = {
        _id: firebaseUser.uid,
        uid: firebaseUser.uid,
        email: firebaseUser.email,
        name: userData.name,
        isAdmin: false,
        purchasedProjects: [],
        token: 'firebase-token'
      };

      setUser(fullUser);
      localStorage.setItem('userInfo', JSON.stringify(fullUser));
      return { success: true, user: fullUser };
    } catch (error) {
      let errorMessage = 'Registration failed';
      if (error.code === 'auth/email-already-in-use') {
        errorMessage = 'User already exists with this email';
      } else if (error.code === 'auth/weak-password') {
        errorMessage = 'Password should be at least 6 characters';
      } else {
        errorMessage = error.message;
      }
      return { success: false, error: errorMessage };
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      setUser(null);
      localStorage.removeItem('userInfo');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

