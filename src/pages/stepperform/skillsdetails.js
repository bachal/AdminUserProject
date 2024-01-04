import React, { useState } from "react";
export default function Skillsdetails(props) {
  const [skillLength,setSkillLength]=useState([0,1,2,3,4]);
  const [skillData,setSkillData]=useState([null,null,null,null,null]);
  const handleRemove=(index)=>{
    const arrayCopy = [...skillLength];
    const skillCopy = [...skillData];
    arrayCopy[index]=null
    skillCopy[index]=null
    setSkillLength(arrayCopy)
    setSkillData(skillCopy)
    props.handleSkill(skillCopy)

  }

  const handleSkillChange=(index,given)=>{
    let arr=[...skillData]
    arr[index]=given
    setSkillData(arr)
    props.handleSkill(arr)

  }

  const handleAdd=()=>{
    setSkillLength(skillLength=>[...skillLength,skillLength.length])
    setSkillData(skillData=>[...skillData,null])

  }
   return (
    <>
      <div className="flex   w-full p-2 ">
        <div className=" w-full">
          <h1 className="block text-left w-full text-gray-800 text-2xl font-bold mb-6">Skills Details</h1>
          <form>
            <div className="mb-4">
              <label className="block mb-2 text-sm font-medium text-gray-700 text-left" for="firstName">
                Skills
              </label>
              
              {skillLength.map((item,index)=>
                (
                 item!==null&&( <div className="flex space-x-6 mb-4" key={index}>
                <input type="text" placeholder="Add Skills" className="w-full px-3 py-3 text-sm leading-tight text-gray-700 border border-gray-200 rounded appearance-none focus:outline-none focus:shadow-outline" onChange={(e)=>handleSkillChange(index,e.target.value)}/>
                <button className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900" onClick={()=>handleRemove(index)} type="button">Remove</button>
              </div>)
                )

              )}
              {/* <div className="flex space-x-6 mb-4">
                <input type="text" placeholder="Add Skills" className="w-full px-3 py-3 text-sm leading-tight text-gray-700 border border-gray-200 rounded appearance-none focus:outline-none focus:shadow-outline" />
                <button className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">Remove</button>
              </div> */}
              {/* <div className="flex space-x-6 mb-4">
                <input type="text" placeholder="Add Skills" className="w-full px-3 py-3 text-sm leading-tight text-gray-700 border border-gray-200 rounded appearance-none focus:outline-none focus:shadow-outline" />
                <button className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">Remove</button>
              </div> */}
              <button type="button" className="text-white bg-blue-700 text-left flex hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800" onClick={handleAdd}>
                Add Skills
              </button>
             </div>
          </form>
        </div>
      </div>
    </>
  )
}
