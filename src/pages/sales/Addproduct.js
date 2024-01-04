import React, { useEffect, useState } from "react";
import Layout from "../../component/Layout";
import { Link } from "react-router-dom";
import { addProduct } from "../../services/productApi";
import { useNavigate } from "react-router-dom";
import { uploadImage } from "../../services/userApi";

export default function Addproduct() {
    const navigate = useNavigate();
    const [product, setProduct] = useState({ "name": "", "imagePath": "", "description": "", "price": null })
    const [error, setError] = useState({ "name": "", "imagePath": "", "description": "", "price": null })
    const [selectedFile, setSelectedFile] = useState('')

    useEffect(()=>{
        let userRole=localStorage.getItem('userType')
        if(userRole!=2){
            navigate('/List')
        }
    },[])
    const handleNameChange = (e) => {
        let prodName = e.target.value;
        setProduct({ ...product, name: prodName })
        if (prodName.length == 0) {
            setError({ ...error, name: 'Name cannot be empty' })
        }
        else {
            setError({ ...error, name: '' })
        }
    }
    const handleDescriChange = (e) => {
        let descri = e.target.value;
        setProduct({ ...product, description: descri })
        if (descri.length == 0) {
            setError({ ...error, description: 'Description cannot be empty' })
        }
        else {
            setError({ ...error, description: '' })

        }

    }
    const handlePriceChange = (e) => {
        let givenPrice = e.target.value;
        setProduct({ ...product, price: givenPrice })
        if (givenPrice.length == 0) {
            setError({ ...error, price: 'Price cannot be empty' })
        }
        else {
            setError({ ...error, price: '' })

        }
    }

    const handleImageChange = (e) => {
        const files = e.target.files
        setSelectedFile(files[0].name)
        const formData = new FormData()
        formData.append('image', files[0])
        handleUpload(formData)
    }

    const handleUpload = async (given) => {
        const uploaded = await uploadImage(given)
        if (uploaded) {
            setProduct({ ...product, imagePath: uploaded.imagePath })
            setError({ ...error, imagePath: "" })
        }
    }
    const handleSubmit = async () => {
        if (product.imagePath == "") {
            setError({ ...error, imagePath: "Image cannot be empty" })
        }
        if (product.imagePath !== "") {
            setError({ ...error, imagePath: "" })
        }
        
            const addedProduct = await addProduct(product)
            if (addedProduct) {
                navigate('/Product')
            }
        
    }

    return (
        <>
            <Layout>
                <div className="bg-white p-4 mb-2 rounded-lg  dark:border-gray-700 mt-14">
                    <div>
                        <h3 class="!text-defaulttextcolor dark:!text-defaulttextcolor/70 dark:text-white text-left dark:hover:text-white text-[1.125rem] font-semibold">Add Product</h3>
                    </div>
                </div>
                <div className="bg-white">
                    <div className="p-4 rounded-lg dark:border-gray-700 ">
                        <div className="">
                            <div className="w-full ">

                                <form action="/" method="post">
                                    <div className="mb-4">
                                        <label className="block mb-2 text-sm font-medium text-gray-700 text-left" for="firstName">
                                            Product Name
                                        </label>
                                        <input
                                            className="w-full px-3 py-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                                            id="firstName"
                                            type="text"
                                            placeholder="Product Name"
                                            value={product.name}
                                            onChange={handleNameChange}
                                        />
                                        <div className="text-red-500 mt-1  text-xs h-1 flex">{error.name}</div>
                                    </div>
                                    <div className="mb-4">
                                        <label className="block mb-2 text-sm font-medium text-gray-700 text-left" for="firstName">
                                            Product Image
                                        </label>
                                        <div className="flex items-center justify-center w-full">
                                            <label for="dropzone-file" className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                                                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                                    <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                                                    </svg>
                                                    <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                                                    <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
                                                    {selectedFile !== "" && (<p className="text-xs text-gray-900 dark:text-gray-800">Selected File : {selectedFile}</p>)}
                                                </div>
                                                <input id="dropzone-file" type="file" className="hidden" accept=".jpg,.jpeg,.png" onChange={handleImageChange} />
                                            </label>

                                        </div>
                                        <div className="text-red-500 mt-1  text-xs h-1 flex">{error.imagePath}</div>

                                    </div>
                                    <div className="mb-4">
                                        <label className="block mb-2 text-sm font-medium text-gray-700 text-left" for="firstName">
                                            Description
                                        </label>
                                        <textarea
                                            placeholder="Description"
                                            className="w-full px-3 py-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                                            value={product.description}
                                            onChange={handleDescriChange}

                                        />
                                        <div className="text-red-500 mt-1  text-xs h-1 flex">{error.description}</div>

                                    </div>
                                    <div className="mb-4">
                                        <label className="block mb-2 text-sm font-medium text-gray-700 text-left" for="firstName">
                                            Price
                                        </label>
                                        <input
                                            className="w-full px-3 py-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                                            id="price"
                                            type="text"
                                            placeholder="Price"
                                            value={product.price}
                                            onChange={handlePriceChange}

                                        />
                                        <div className="text-red-500 mt-1  text-xs h-1 flex">{error.price}</div>

                                    </div>
                                    <div className='flex justify-between'>
                                        <Link to="/Product" type="button" className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">
                                            Back
                                        </Link>
                                        <button type="button" className={`text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 ${error.name == "" && error.description == "" && error.imagePath == "" && error.price == "" && product.imagePath !==""? '' : 'cursor-not-allowed'}`} onClick={handleSubmit} disabled={error.name == "" && error.description == "" && error.imagePath == "" && error.price == ""  && product.imagePath !==""? false : true}>
                                            Submit
                                        </button>
                                    </div>
                                </form>

                            </div>
                        </div>

                    </div>
                </div>
            </Layout>
        </>
    )
}