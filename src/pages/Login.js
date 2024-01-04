import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { userLogin } from "../services/userApi";
export default function Login() {
    const navigate = useNavigate();
    const [loginData, setLoginData] = useState({ email: '', password: '' })
    const [error, setError] = useState({ email: '', password: '' })
    const handleEmailChange = (givenEmail) => {
        const reg = /\S+@\S+\.\S+/;
        setLoginData({ ...loginData, email: givenEmail })
        if (givenEmail.length == 0) {
            setError({ ...error, email: 'Email cannot be empty' })
        }
        else if (!reg.test(givenEmail)) {
            setError({ ...error, email: 'Enter valid email' })
        }
        else {
            setError({ ...error, email: '' })
        }
    }
    const handlePasswordChange = (givenPass) => {
        setLoginData({ ...loginData, password: givenPass })
        if (givenPass.length == 0) {
            setError({ ...error, password: 'Password cannot be empty' })
        }
        else {
            setError({ ...error, password: '' })
        }
    }

    const handleLogin = async () => {
        const userLogged = await userLogin(loginData)
        if (userLogged) {
            localStorage.setItem('userToken', userLogged.token)
            localStorage.setItem('userType', userLogged.roleId)
            if (userLogged && userLogged.roleId == 2) {
                navigate('/Product')
            }
            else {
                navigate('/List')
            }
        }
        else {
            console.log('login issue')
        }
    }
    return (
        <>
            <section className="border-red-500 login-form min-h-screen flex items-center justify-center bg-img" style={{ backgroundImage: "url('/assets/image/bbblurry.svg')" }}>
                <div className="container mx-auto">
                    <div className="flex justify-center px-6 my-12">
                        <div className="w-96 flex">
                            <div className="w-full bg-login p-6  rounded-lg">
                                <div className="heading-1 pt-10 m-auto ">
                                    <img src="https://i.pinimg.com/originals/0a/5f/ea/0a5feae400fc816c4ca2aca8bd67a168.jpg" alt="login-img" className="rounded-full m-auto p-1 border" width="100px" height="100px" />
                                    <h3 className="pt-8 font-bold text-4xl text-center tracking-wider text-white">Login</h3>
                                </div>
                                <form className=" pt-8  rounded">
                                    <div className="mb-3">
                                        <input
                                            className="w-full px-3 py-3 text-sm leading-normal text-gray-50 border-0 bg-[#ffffff1a]  rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                                            id="email"
                                            type="email"
                                            placeholder="Email"
                                            value={loginData.email}
                                            onChange={(e) => handleEmailChange(e.target.value)}
                                        />
                                        <div className="text-red-500 mt-1 text-xs h-1 flex">{error.email}</div>
                                    </div>
                                    <div className="mb-4 mt-2">
                                        <input
                                            className="w-full px-3 py-3  text-sm  leading-normal  text-gray-50 border-0  bg-[#ffffff1a]  rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                                            id="password"
                                            type="password"
                                            placeholder="Password"
                                            value={loginData.password}
                                            onChange={(e) => handlePasswordChange(e.target.value)}
                                        />
                                        <p className="text-red-500 mt-1  text-xs h-1 flex">{error.password}</p>
                                    </div>
                                    <div className="mb-6 text-center">
                                        <div
                                            className="w-full px-4 py-3 font-bold tracking-wider text-[#000] rounded-lg bg-white focus:outline-none focus:shadow-outline"
                                            type="button" onClick={handleLogin} > Login
                                            <div className="fill-one"></div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}