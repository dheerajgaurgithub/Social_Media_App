import React, { useState } from 'react';
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import axios from "axios";
import { toast } from "sonner";
import { Link, useNavigate } from 'react-router-dom';
import "./Signup.css";
import { Loader2 } from 'lucide-react';
import { Eye, EyeOff } from "lucide-react";

const Signup = () => {
  const [input, setInput] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  
  const signupHandler = async (e) => {
    e.preventDefault();
    
    // Password validation: First letter capital, alphanumeric
    const passwordReq = /^[A-Z][a-zA-Z0-9]{5,}$/; // First letter capital, at least 6 characters long
    if (!passwordReq.test(input.password)) {
      toast.error("Password must start with a capital letter and be alphanumeric.");
      return;
    }
    
    // Email validation: Must be from specific domains
    const emailReq = /^[a-zA-Z0-9._%+-]+@(yahoo\.com|gmail\.com|gla\.ac\.in)$/;
    if (!emailReq.test(input.email)) {
      toast.error("Email must be from @yahoo.com, @gmail.com, or @gla.ac.in.");
      return;
    }
    
    try {
      setLoading(true);
      const res = await axios.post(
        "http://localhost:8000/api/v1/user/register",
        input,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      if (res.data.success) {
        navigate("/login");
        toast.success(res.data.message);
        setInput({
          username: "",
          email: "",
          password: "",
        });
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-box">
        <form onSubmit={signupHandler} className="signup-form">
          <div className='logo'>Sσƈιαʅ Mҽԃια</div>
          <p className="signup-subtext">
            𝑹𝒆𝒈𝒊𝒔𝒕𝒆𝒓 𝒕𝒐 𝒔𝒆𝒆 𝒑𝒉𝒐𝒕𝒐𝒔 𝒇𝒓𝒐𝒎 𝒚𝒐𝒖𝒓 𝒇𝒓𝒊𝒆𝒏𝒅𝒔
          </p>
          <div className="signup-field">
            <Input
              type="text"
              name="username"
              value={input.username}
              onChange={changeEventHandler}
              placeholder="𝐔𝐬𝐞𝐫𝐧𝐚𝐦𝐞"
            />
          </div>
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
              onChange={(e) => setInput({ ...input, password: e.target.value })}
              placeholder="𝐏𝐚𝐬𝐬𝐰𝐨𝐫𝐝"
            />
          </div>
          {loading ? (
            <Button>
              <Loader2 className="signup-password-field" />
              Please wait
            </Button>
          ) : (
            <Button type='submit' className="signup-button">𝐑𝐞𝐠𝐢𝐬𝐭𝐞𝐫</Button>
          )}
        </form>
        <div className="signup-login">
          Already have an account? <Link to="/login">𝐋𝐨𝐠 𝐈𝐧</Link>
        </div>
      </div>
    </div>
  );
};

export default Signup;
