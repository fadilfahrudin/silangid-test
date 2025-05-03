import { Button } from '@/components/ui/button';
import { AuthContext } from '@/context/AuthContext';
import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
const Login = () => {
    const auth = useContext(AuthContext);
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    useEffect(() => {
        if (auth?.isAuthenticated) {
            navigate("/");
        }
    }, [auth?.isAuthenticated, navigate]);

    const handleLogin = async () => {
        const success = await auth?.login(email, password);
        if (success) {
            navigate("/");
            toast.success("Login successful.");
        } else {
            toast.error("Invalid email or password.");
        }
    };

    return (
        <div className="w-full h-screen flex justify-center items-center">
            <div className="w-1/5 h-auto shadow-2xl rounded-xl p-[40px] flex flex-col gap-4">
                <h1 className='text-3xl text-sky-950 text-center'>Log In</h1>
                <input
                    className='w-full px-2 py-4 bg-transparent text-sky-950 border-b-2 border-sky-950 focus:outline-none'
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    className='w-full px-2 py-4 bg-transparent text-sky-950  border-b-2 border-sky-950 focus:outline-none'
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <Button className="text-sky-50" onClick={handleLogin}>Login</Button>
            </div>
        </div>
    );
}

export default Login