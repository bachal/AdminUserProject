import React from "react";
export default function Personaldetails(props) {
    const uploadFile = (e) => {
        const files = e.target.files
        const formData = new FormData()
        formData.append('image', files[0])
        props.handleUpload(formData)
    }
    return (
        <>
            <div className="flex   w-full p-2 ">
                <div className=" w-full">
                    <h1 className="block text-left w-full text-gray-500 text-2xl font-bold mb-6">Personal Details</h1>
                    <form >
                        <div className="mb-4">
                            <label className="block mb-2 text-sm font-medium text-gray-700 text-left" for="profile">
                                Profile Image
                            </label>
                            <div className="mt-1 flex flex-col items-start">
                                <span className="inline-block w-20 h-20 rounded-full overflow-hidden bg-gray-100">
                                    <img src="https://images.unsplash.com/photo-1531316282956-d38457be0993?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=700&q=80"
                                        alt="profilepic"
                                        className="w-100 h-100 m-auto rounded-full shadow"
                                    />
                                </span>
                                <div className="flex  items-center justify-center bg-grey-lighter">
                                    <label className="w-50 flex flex-col items-center px-4 py-2 mt-5 bg-blue-300 text-gray-700 rounded-lg shadow-lg tracking-wide  border border-blue cursor-pointer hover:bg-blue hover:text-white">
                                        <span className=" text-base leading-normal">Upload Image</span>
                                        <input type='file' className="hidden" accept=".jpg,.jpeg,.png" onChange={(e) => { uploadFile(e) }} />
                                    </label>
                                </div>
                            </div>
                        </div>

                        <div className=" grid gap-x-7 md:grid-cols-2">
                            <div className="mb-4">
                                <label className="block mb-2 text-sm font-medium text-gray-700 text-left" for="firstName">
                                    Name
                                </label>
                                <input
                                    className="w-full px-3 py-3 text-sm leading-tight text-gray-700 border border-gray-200 rounded appearance-none focus:outline-none focus:shadow-outline"
                                    id="firstName"
                                    type="text"
                                    placeholder="Name"
                                    value={props.userDetail.name}
                                    onChange={(e) => props.handleNameChange(e.target.value)}
                                />
                                <div className="text-red-500 mt-1 text-xs flex h-1">{props.error.name}</div>

                            </div>
                            <div className="mb-4">
                                <label className="block mb-2 text-sm font-medium text-gray-700 text-left" for="email">
                                    Gender
                                </label>
                                <div className="flex space-x-7">
                                    <div className="flex items-center" onClick={() => props.handleGenderChange(1)}>
                                        <input id={1} type="radio" value={1} name="default-radio" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-200 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" checked={props.userDetail.gender && props.userDetail.gender == 1 ? true : false} />
                                        <label for={1} className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300" >Male</label>
                                    </div>
                                    <div className="flex items-center" onClick={() => props.handleGenderChange(2)}>
                                        <input id={2} type="radio" value={2} name="default-radio" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-200 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" checked={props.userDetail.gender && props.userDetail.gender == 2 ? true : false} />
                                        <label for={2} className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300" >Female</label>
                                    </div>
                                    <div className="flex items-center" onClick={() => props.handleGenderChange(3)}>
                                        <input id={3} type="radio" value={3} name="default-radio" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-200 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" checked={props.userDetail.gender && props.userDetail.gender == 3 ? true : false} />
                                        <label for={3} className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300" >Others</label>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className=" grid gap-x-7 md:grid-cols-2">
                            <div className="mb-4">
                                <label className="block mb-2 text-sm font-medium text-gray-700 text-left" for="firstName">
                                    Phone Numbers
                                </label>
                                <input
                                    className="w-full px-3 py-3 text-sm leading-tight text-gray-700 border border-gray-200 rounded appearance-none focus:outline-none focus:shadow-outline"
                                    id="number"
                                    type="number"
                                    placeholder="Phone Number"
                                    value={props.userDetail.phone}
                                    onChange={(e) => props.handlePhoneChange(e.target.value)}
                                />
                                <div className="text-red-500 mt-1 text-xs flex h-1">{props.error.phone}</div>

                            </div>

                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}
