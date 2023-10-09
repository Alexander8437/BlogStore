import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext()

export const AuthContextProvider = ({ children }) => {

    const [currentUser, setCurrentUser] = useState(JSON.parse(localStorage.getItem("user")) || null);

    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Accept', 'application/json');
    headers.append('Access-Control-Allow-Origin', 'https://blog-store-etbu.vercel.app/');
    headers.append('Access-Control-Allow-Credentials', 'true');

    const login = async (inputs) => {
        console.log(headers)
        const res = await axios.post("https://blog-store-etbu.vercel.app/api/auth/login", inputs, {
            header: headers
        })
        setCurrentUser(res.data)
    }

    const logout = async (inputs) => {
        await axios.post("https://blog-store-etbu.vercel.app/api/auth/logout")
        setCurrentUser(null)
    };

    useEffect(() => {
        localStorage.setItem("user", JSON.stringify(currentUser));
    }, [currentUser]);

    return (
        <AuthContext.Provider value={{ currentUser, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}