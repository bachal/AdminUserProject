import React, { useState } from "react";
import Select from 'react-select'
import { getStates } from "../../services/userApi";
export default function Countrydetails(props) {
    const [statesData,setStatesData]=useState([]);
    const [selectedCountry,setSelectedCountry]=useState(null);
    const [selectedState,setSelectedState]=useState(null);

    const country = [
        { value: '1', label: 'India' },
        { value: '2', label: 'Afghanistan.' },
        { value: '3', label: 'Albania' }
      ]
      const state = [
        { value: '1', label: 'maharashtra' },
        { value: '2', label: 'Gujarat' },
        { value: '3', label: 'Kerala' }
      ]
    const  handleChange = async(selectedOption) => {
        setSelectedState(null)
        props.handleCountryChange(selectedOption.value)
         const states = await getStates(selectedOption.value);
        if (states) {
            const statesArray=states.data
            const updated = statesArray.map(({ stateId: value, stateName:label,...rest}) => ({value, label,...rest}));
            setStatesData(updated)
        }
       };

      const  handleStateChange = async(selectedOption) => {
        setSelectedState(selectedOption)
        props.handleStateChange(selectedOption.value);
        
      };
    return (
       <>
         <div className="flex   w-full p-2 ">
                <div className=" w-full">
                    <h1 className="block text-left w-full text-gray-800 text-2xl font-bold mb-6">Details</h1>
                    <form action="/" method="post">
                    <div className=" grid gap-2 md:grid-cols-2">
                    <div className="mb-4">
                            <label className="block mb-2 text-sm font-medium text-gray-700 text-left" for="firstName">
                                Select Country
                            </label>
                        <Select
                        className="basic-single text-left text-sm text-gray-700  rounded border border-gray-200"
                        classNamePrefix="select"
                        
                        onChange={handleChange}

                        options={props.countries} />
                        </div>
                        <div className="mb-4">
                            <label className="block mb-2 text-sm font-medium  text-gray-700 text-left" for="firstName">
                                Select State
                            </label>
                            <Select
                                  className="basic-single text-left text-sm rounded text-gray-700 border border-gray-200"
                                  classNamePrefix="select"
                                  value={selectedState}
                                  onChange={handleStateChange}
                                   options={statesData} />
                        </div>
                        
                       </div>
                    </form>
                </div>
            </div>
       </>
    )
}
