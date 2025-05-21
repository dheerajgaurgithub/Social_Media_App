import React, { useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import axios from "axios";
import { toast } from "sonner";
import { Link, useNavigate } from "react-router-dom";
import "./Signup.css";
import { Loader2, Eye, EyeOff } from "lucide-react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setAuthUser } from "../../redux/authSlice";

const Login = () => {
    const [input, setInput] = useState({
        email: "",
        password: "",
    });
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const {user}=useSelector(store=>store.auth);
    const navigate = useNavigate();
    const dispatch=useDispatch();

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const loginHandler = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const res = await axios.post(
                "http://localhost:8000/api/v1/user/login",
                input,
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                    withCredentials: true,
                }
            );
            if (res.data.success) {
                dispatch(setAuthUser(res.data.user));
                navigate("/");
                toast.success(res.data.message);
                setInput({
                    email: "",
                    password: "",
                });
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="signup-container">
            <div className="signup-box">
                <form onSubmit={loginHandler} className="signup-form">
                    <div className="logo">Sσƈιαʅ Mҽԃια</div>
                    <p className="signup-subtext">
                        𝑳𝒐𝒈𝒊𝒏 𝒕𝒐 𝒔𝒆𝒆 𝒑𝒉𝒐𝒕𝒐𝒔 𝒇𝒓𝒐𝒎 𝒚𝒐𝒖𝒓 𝒇𝒓𝒊𝒆𝒏𝒅𝒔
                    </p>
                    <div className="signup-field">
                        <Input
                            type="email"
                            name="email"
                            value={input.email}
                            onChange={changeEventHandler}
                            placeholder="𝐄𝐦𝐚𝐢𝐥"
                        />
                    </div>
                    <div className="signup-password-field">
                        <input
                            type={showPassword ? "text" : "password"}
                            name="password"
                            value={input.password}
                            onChange={changeEventHandler}
                            placeholder="𝐏𝐚𝐬𝐬𝐰𝐨𝐫𝐝"
                        />
                    </div>
                    {loading ? (
                        <Button>
                            <Loader2 className="signup-button" />
                            Please wait
                        </Button>
                    ) : (
                        <Button type="submit" className="signup-button">
                            𝐋𝐨𝐠𝐢𝐧
                        </Button>
                    )}
                </form>
                <div className="signup-login">
                    Don't have an account? <Link to="/signup">𝐑𝐞𝐠𝐢𝐬𝐭𝐞𝐫</Link>
                </div>
            </div>
        </div>
    );
};

export default Login;
