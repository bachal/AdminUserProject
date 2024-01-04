import React, { useState } from "react";
export default function Credentaildetails(props) {
    const [confirmPass,setConfirmPass]=useState('')
    const [error,setError]=useState('')

    const handleConfirmPass=(given)=>{
        setConfirmPass(given)
        if(given.length==0){
            setError('Confirm password cannot be empty')

        }
        else if(given !== props.password){
            setError('password and confirm password does not match')
        }
        else{
            setError('')

        }

    }
    return (
        <>
             <div className="flex   w-full p-2 ">
                <div className=" w-full">
                    <h1 className="block text-left w-full text-gray-800 text-2xl font-bold mb-6">Credentails Details</h1>
                    <form action="/" method="post">
                        <div className="mb-4">
                            <label className="block mb-2 text-sm font-medium text-gray-700 text-left" for="firstName">
                                Email
                            </label>
                            <input
                                className="w-full px-3 py-3 text-sm leading-tight text-gray-700 border border-gray-200 rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                                id="firstName"
                                type="email"
                                placeholder="Email" 
                                value={props.email}
                                onChange={(e)=>{props.handleEmailhange(e.target.value)}}
                                />
                            <div className="text-red-500 mt-1 text-xs h-1 flex">{props.err.email}</div>

                        </div>
                        <div className="grid gap-2  md:grid-cols-2">
                            <div className="mb-4 ">
                                <label className="block mb-2 text-sm font-medium text-left text-gray-700" for="password">
                                    Password
                                </label>
                                <input
                                    className="w-full px-3 py-3 text-sm leading-tight text-gray-700 border border-gray-200  rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                                    id="password"
                                    type="password"
                                    placeholder="Password"
                                    value={props.password}
                                    onChange={(e)=>{props.handlePasshange(e.target.value)}}
                                    />
                                <div className="text-red-500 mt-1 text-xs h-1 flex">{props.err.password}</div>

                            </div>
                            <div className="mb-4">
                                <label className="block mb-2 text-sm font-medium text-left text-gray-700 text-left" for="c_password">
                                    Confirm Password
                                </label>
                                <input
                                    className="w-full px-3 py-3 text-sm leading-tighttext-gray-700 border border-gray-200 rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                                    id="c_password"
                                    type="password"
                                    value={confirmPass}
                                    onChange={(e)=>handleConfirmPass(e.target.value)}
                                    placeholder="Password"

                                />
                                <div className="text-red-500 mt-1 text-xs h-1 flex">{error}</div>

                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}
