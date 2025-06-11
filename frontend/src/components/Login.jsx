import React, { useEffect, useState } from 'react';
import { Input } from './ui/input';
import { Button } from './ui/button';
import axios from 'axios';
import { toast } from 'sonner';
import { Link, useNavigate } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { setAuthUser } from '@/redux/authSlice';

const Login = () => {
    const [input, setInput] = useState({
        email: '',
        password: ''
    });
    const [loading, setLoading] = useState(false);
    const { user } = useSelector(store => store.auth);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    };

    const loginHandler = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const res = await axios.post('https://social-media-app-u9d1.onrender.com/api/v1/user/login', input, {
                headers: {
                    'Content-Type': 'application/json'
                },
                withCredentials: true
            });
            if (res.data.success) {
                dispatch(setAuthUser(res.data.user));
                navigate('/');
                toast.success(res.data.message);
                setInput({
                    email: '',
                    password: ''
                });
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response?.data?.message || 'Login failed');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (user) {
            navigate('/');
        }
    }, [user, navigate]);

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-cyan-50 px-4 sm:px-6 lg:px-8">
            <div className="w-full max-w-md space-y-8">
                {/* Header */}
                <div className="text-center">
                    {/* <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full mb-6 shadow-lg">
                        <span className="text-3xl font-bold text-white">S</span>
                    </div> */}
                    <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-2">
                        SocialConnect
                    </h1>
                    {/* <p className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-2">
                        Welcome Back
                    </p> */}
                    <p className="text-gray-600 text-lg">
                        Log in to your account
                    </p>
                </div>

                {/* Form Card */}
                <div className="bg-white/70 backdrop-blur-lg rounded-3xl shadow-2xl p-8 sm:p-10 border border-white/20">
                    <form onSubmit={loginHandler} className="space-y-6">
                        {/* Email Field */}
                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-gray-700 block">
                                Email Address
                            </label>
                            <Input
                                type="email"
                                name="email"
                                value={input.email}
                                onChange={changeEventHandler}
                                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 bg-gray-50/50 focus:bg-white focus:border-indigo-400 focus:ring-2 focus:ring-indigo-200 transition-all duration-300 text-gray-800 placeholder:text-gray-400"
                                placeholder="Enter your email address"
                                required
                            />
                        </div>

                        {/* Password Field */}
                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-gray-700 block">
                                Password
                            </label>
                            <Input
                                type="password"
                                name="password"
                                value={input.password}
                                onChange={changeEventHandler}
                                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 bg-gray-50/50 focus:bg-white focus:border-indigo-400 focus:ring-2 focus:ring-indigo-200 transition-all duration-300 text-gray-800 placeholder:text-gray-400"
                                placeholder="Enter your password"
                                required
                            />
                        </div>
                        {/* Submit Button */}
                        <div className="pt-4">
                            {loading ? (
                                <Button 
                                    disabled
                                    className="w-full py-3 px-6 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold text-lg shadow-lg transform transition-all duration-200 disabled:opacity-70"
                                >
                                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                                    Signing in...
                                </Button>
                            ) : (
                                <Button 
                                    type="submit" 
                                    className="w-full py-3 px-6 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold text-lg shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-200"
                                >
                                    Sign In
                                </Button>
                            )}
                        </div>
                    </form>
                    <div className="text-center mt-8 pt-6 border-t border-gray-100">
                        <p className="text-gray-600">
                            Don't have an account?{' '}
                            <Link 
                                to="/signup" 
                                className="font-semibold text-indigo-600 hover:text-indigo-700 hover:underline transition-colors duration-200"
                            >
                                Sign up here
                            </Link>
                        </p>
                    </div>
                    <div className="text-center text-sm text-gray-500">
                    <p>
                        By logging in, you agree to our{' '}
                        <a href="#" className="text-indigo-600 hover:underline">Terms of Service</a>
                        {' '}and{' '}
                        <a href="#" className="text-indigo-600 hover:underline">Privacy Policy</a>
                    </p>
                </div>
                </div>
            </div>
        </div>
    );
};

export default Login;