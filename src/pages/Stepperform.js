import React, { useEffect, useState } from 'react';
import Personaldetails from "./stepperform/personaldetails";
import Countrydetails from "./stepperform/countrydetails";
import Skillsdetails from "./stepperform/skillsdetails";
import Credentaildetails from "./stepperform/credentaildetails";
import { Stepper, Step, StepLabel, Button, Typography } from '@mui/material';
import Layout from "../component/Layout";
import { Link, useNavigate } from 'react-router-dom';
import { addUser, getCountry, uploadImage } from '../services/userApi';
const steps = ['Personal Information', 'Details', 'Skills Details', "Credentail Details"];

export default function Stepperform() {
    const [activeStep, setActiveStep] = useState(0);
    const [userDetail, setUserDetail] = useState({
        "name": "",
        "profileImage": "",
        "gender": 1,
        "phone": '',
        "countryId": null,
        "stateId": null,
        "email": "",
        "password": "",
        "skills": []
    })
    const [error, setError] = useState({ name: "", phone: "", email: "", password: "" });
    const [countries, setCountries] = useState([]);
    const navigate = useNavigate()

    useEffect(() => {
        let userRole=localStorage.getItem('userType')
        if(userRole!=1){
            navigate('/Product')
        }
        else{
        getCountryData();
        }
    }, [])

    const getCountryData = async () => {
        getCountry()
        const countries = await getCountry()
        if (countries) {
            const countryArray = countries.data
            const updated = countryArray.map(({ countryId: value, countryName: label, ...rest }) => ({ value, label, ...rest }));
            setCountries(updated)
        }
    }


    const handlePersonalDEtail = (givenData) => {
        const { name, gender, phone } = givenData;
        setUserDetail({ ...userDetail, name: name, gender: gender, phone: phone })
    }

    const handleNext = async () => {
        if (activeStep === steps.length - 1) {
            const userAdded = await addUser(userDetail)
            if (userAdded) {
                navigate('/List')
            }
        }
        else {
            setActiveStep((prevActiveStep) => prevActiveStep + 1);
        }
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleNameChange = (givenName) => {
        setUserDetail({ ...userDetail, name: givenName })
        if (givenName.length == 0) {
            setError({ ...error, name: 'Name cannot be empty' })
        }
        else {
            setError({ ...error, name: '' })
        }
    }

    const handlePhoneChange = (givenNumber) => {
        setUserDetail({ ...userDetail, phone: givenNumber })
        if (givenNumber.length == 0) {
            setError({ ...error, phone: 'Phone cannot be empty' })
        }
        else if (!(/^[0]?[789]\d{9}$/.test(givenNumber))) {
            setError({ ...error, phone: 'Enter valid phone' })
        }
        else {
            setError({ ...error, phone: '' });
        }

    }


    const handleGenderChange = (given) => {
        setUserDetail({ ...userDetail, gender: given })
    }

    const handleCountryChange = (given) => {
        setUserDetail({ ...userDetail, countryId: given })
    }
    const handleStateChange = (given) => {
        setUserDetail({ ...userDetail, stateId: given })
    }

    const handleEmailhange = (given) => {
        const reg = /\S+@\S+\.\S+/;
        setUserDetail({ ...userDetail, email: given })
        if (given.length == 0) {
            setError({ ...error, email: "email cannot be empty" })
        }
        else if (!(reg.test(given))) {
            setError({ ...error, email: "Enter valid email" })
        }
        else {
            setError({ ...error, email: "" })
        }
    }

    const handlePasshange = (given) => {
        setUserDetail({ ...userDetail, password: given })
        if (given.length == 0) {
            setError({ ...error, password: "password cannot be empty" })
        }
        else {
            setError({ ...error, password: "" })
        }
    }

    const handleSkill = (given) => {
        let res = given.filter(elements => {
            return elements !== null;
        });
        setUserDetail({ ...userDetail, skills: res })
    }

    const handleUpload = async (given) => {
        const uploaded = await uploadImage(given)
        if (uploaded) {
            setUserDetail({ ...userDetail, profileImage: uploaded.imagePath })
        }
    }

    const getStepContent = (step) => {
        switch (step) {
            case 0:
                return (
                    <>
                        <Personaldetails handlePersonalDEtail={handlePersonalDEtail} handlePhoneChange={handlePhoneChange} handleNameChange={handleNameChange} userDetail={userDetail} handleGenderChange={handleGenderChange} handleUpload={handleUpload} error={error} />
                    </>
                );
            case 1:
                return (
                    <>
                        <Countrydetails countries={countries} handleCountryChange={handleCountryChange} handleStateChange={handleStateChange} />
                    </>
                );
            case 2:
                return (
                    <>
                        <Skillsdetails handleSkill={handleSkill} />
                    </>
                );
            case 3:
                return (
                    <>
                        <Credentaildetails handleEmailhange={handleEmailhange} handlePasshange={handlePasshange} email={userDetail.email} password={userDetail.password} err={error} />
                    </>
                );
            default:
                return 'Unknown step';
        }
    };

    return (
        <Layout>
            <div className="bg-white p-4 mb-2 rounded-lg  dark:border-gray-700 mt-14">
                <div>
                    <h3 class="!text-defaulttextcolor dark:!text-defaulttextcolor/70 dark:text-white text-left dark:hover:text-white text-[1.125rem] font-semibold">Stepper Form</h3>
                </div>
            </div>
            <div className="bg-white">
                <div className="p-4 rounded-lg dark:border-gray-700 mb-2">
                    <Stepper activeStep={activeStep} alternativeLabel>
                        {steps.map((label) => (
                            <Step key={label}>
                                <StepLabel>{label}</StepLabel>
                            </Step>
                        ))}
                    </Stepper>
                </div>
            </div>
            <div className="bg-white">
                <div className="p-4 rounded-lg dark:border-gray-700">
                    <>
                        {activeStep === steps.length ? (
                            <div className="flex justify-center  w-full mt-5">
                                <div className=" p-8 m-4">
                                    <Typography variant="h5" className='mt-10 mb-10 pb-10'>Thank you for submitting the form!</Typography>
                                    <Link to="/List" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">View List
                                    </Link>
                                </div>
                            </div>
                        ) : (
                            <>
                                <Typography variant="h5">{getStepContent(activeStep)}</Typography>
                                <div className='flex justify-center'>
                                    <div className='flex justify-between w-full mt-4'>
                                        <Button className="bg-back " disabled={activeStep === 0} onClick={handleBack}>
                                            Back
                                        </Button>
                                        <Button variant="contained" color="primary" onClick={handleNext}>
                                            {activeStep === steps.length - 1 ? 'Submit' : 'Next'}
                                        </Button>
                                    </div>
                                </div>
                            </>
                        )}
                    </>
                </div>
            </div>
        </Layout>
    );
};


