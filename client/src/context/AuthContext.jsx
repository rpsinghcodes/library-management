import { createContext, useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';

export const AuthContext = createContext({
    userRegistration: () => {},
    login: () => {},
    user: {},
    signup  : () => {}
});

export default function AuthProvider({ children }) { 

    const navigate = useNavigate();
    const [user, setUser] = useState({
        username: null,
        email: null,
        userId: null,
        role: null,
        isLogedIn: false
    });

    const signup = async (username, email, password, role) => {
        try {
            const response = await fetch('http://localhost:4000/api/auth/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, email, password, role }),
            });
            if(response.ok) {
                const data = await response.json();
                const token = data.token;
                // decoding token
                console.log(token);
                localStorage.setItem('token', token);
                const decoded = jwtDecode(token);
                console.log(decoded);
                setUser(data);
                setUser({...user, isLogedIn: true});
                navigate('/');
                return true;
                
            }else {
                return false;
            }
        } catch (error) {
            console.log('error', error);
            return false;
        }
        
        
    };

    useEffect(() => {
        
        const token = localStorage.getItem('token');
        if(token) {
            
            const decode = jwtDecode(token);
            if(decode.role == "admin" || decode.role == "user" ) {
                setUser({username: decode.username, email: decode.email, userId: decode.userId, role: decode.role, isLogedIn: true});
                navigate("/dashboard");
            } else {
                localStorage.clear();
            }
            
        }
    }, []);

    const login =async (email, password) => {
        try {
            const response = await fetch('http://localhost:4000/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });
            if(response.status === 200) {
                const data = await response.json();
                const token = data.token;
                // decoding token
                localStorage.setItem('token', token);
                const decoded = jwtDecode(token);
                console.log(decoded);
                setUser(data);
                setUser({...user, isLogedIn: true, username: decoded.username, role: decoded.role});
                return true;
                
            }else {
                return false;
            }
        } catch (error) {
            console.log('error', error);
            return false;
        }
        
        
    };

    const logout = () => {
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user,  login, logout, signup }}>
            {children}
        </AuthContext.Provider>
    );
};


