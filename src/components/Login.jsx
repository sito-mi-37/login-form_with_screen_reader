import React, { useRef, useState, useEffect } from "react";
import useAuth from "../hooks/useAuth";
import axios from "../api/axios";
import {Link, useNavigate, useLocation} from 'react-router-dom'
import useLocalStorage from "../hooks/useLocalStorage";

const LOGIN_URL = '/auth'

const Login = () => {
    const {setAuth, persist, setPersist} = useAuth()

  const userRef = useRef();
  const errRef = useRef();

  const navigate = useNavigate()
  const location = useLocation()

  const from = location.state?.from?.pathname || '/'

  const [user, setUser] = useLocalStorage('user', "");
  const [pwd, setPwd] = useState("");
  const [errMsg, setErrMsg] = useState("");

  useEffect(() => {
    setErrMsg("");
  }, [user, pwd]);

  useEffect(()=>{
    userRef.current.focus()
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
        const response = await axios.post(LOGIN_URL, JSON.stringify({password: pwd, username: user}), {
            headers: {'Content-Type': 'application/json'},
            withCredentials: true
        })
        const {roles, accessToken} = response?.data

        setAuth({
            user,
            pwd,
            roles,
            accessToken
        })
        setUser('')
        setPwd('')
        navigate(from, {replace: true})
    } catch (err) {
        console.log(err)
        if(!err?.response){
            setErrMsg("No server response")
        }else if(err.response?.status === 400){
            setErrMsg("missing password or username")
        }else if(err.response?.status === 401){
            setErrMsg('Unauthorized')
        }else{
            setErrMsg("Sign in faild")
        }
        errRef.current.focus()
    }
  }

  const togglePersist = () => {
    setPersist(prev => !prev)
  }

  useEffect(() => {
    localStorage.setItem('persist', persist)
  },[persist])

  return (
    
        <section>
          <p
            ref={errRef}
            className={errMsg ? "errmsg" : "offscreen"}
            aria-live="assertive"
          >
            {errMsg}
          </p>
          <h1>Sign In</h1>
          <form onSubmit={handleSubmit}>
            <label htmlFor="password">Username:</label>
            <input
             type="text"
             value={user}
             onChange={(e) => setUser(e.target.value) }
             required
             ref={userRef}
             autoComplete="off"
             />
           
            <label htmlFor="password">Password:</label>
            <input
             type="password"
             value={pwd}
             onChange={(e) => setPwd(e.target.value) }
             required
             />
            <button>Sign In</button>
            <div className="persistCheck">
              <input 
                type="checkbox" 
                id="persist"
                onChange={togglePersist}
                checked={persist}
              /> 
              <label htmlFor="persist">Trust This Device</label>
            </div>
          </form>
          <p>
            Don't have an account?
            <br />
            <span className="line">
              <Link to="/register">Sign Up</Link>
            </span>
          </p>
        </section>
  );
};

export default Login;
