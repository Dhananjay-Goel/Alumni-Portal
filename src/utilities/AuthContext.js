import {auth, db} from "../firebase.js"
import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from 'react-router-dom';
import {
    onAuthStateChanged,
    signOut,
} from "firebase/auth";

const AuthContext = React.createContext()
console.log(AuthContext);

export function useAuth(){
    return useContext(AuthContext);
}

export function AuthProvider({children}) {
    // const [currentUser, setCurrentUser] = useState();
    const [user, setUser] = useState({});
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();

    const login=(user)=> {
        // return auth.signInWithEmailAndPassword(email, password)
        setUser(user)
    }

    const logout = () => {
        return signOut(auth).then(() => {
          navigate("/");
        });
      };
      

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
          // Update user state if needed
          setUser(currentUser);
          setLoading(false);
        });
    
        // Cleanup the listener on component unmount
        return () => unsubscribe();
    }, []); // Empty dependency array ensures the effect runs only once on mount


    const value = {
        user,
        // signup,
        login,
        logout,
    };
    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
}