import React, { useEffect, useState } from "react";
import Table from "../component/VTable";
import Layout from "../component/Layout";
import { Link, useNavigate, useOutlet } from "react-router-dom";
import { Trash2 } from 'lucide-react';
import { deleteUser, getUserList } from "../services/userApi";
export default function List() {
    const [userList, setUserList] = useState([])
    const [userData, setUserData] = useState([])
    const navigate = useNavigate();

    const columns = [
        {
            title: "#",
            dataIndex: "srno",
            key: "srno",
        },
        {
            title: " Name",
            dataIndex: "name",
            key: "name",

        },
        {
            title: "Email",
            dataIndex: "email",
            key: "email",

        },
        {
            title: "Phone No",
            dataIndex: "phoneno",
            key: "phoneno",

        },
        {
            title: "Gender",
            dataIndex: "gender",
            key: "gender",

        },

        {
            title: "Action",
            render: (item) => (
                <>
                    <div className="flex gap-1 text-center justify-center">
                        <Link to="#">
                            <Trash2 color="#ff0000" size={16} onClick={() => handleDelete(item.userId)} />
                        </Link>
                    </div>
                </>
            ),
            key: "action",
            width: 90,
        },

    ];
    const data = [
        {
            srno: 1,
            name: "Neha",
            email: "abc@gmail.com",
            phoneno: "9898767656",
            gender: "Female",


        },
        {
            srno: 2,
            name: "Ira",
            email: "abc@gmail.com",
            phoneno: "9898767656",
            gender: "Female",


        },
    ]

    useEffect(() => {
        let userRole = localStorage.getItem('userType')
        if (userRole != 1) {
            navigate('/Product')
        }
        else {
            getUsers();
        }

    }, [])


    const getUsers = async () => {
        const userListData = await getUserList();
        if (userListData) {
            let usersArray = userListData.data
            const updated = usersArray.map(({ phone: phoneno, ...rest }) => ({ phoneno, ...rest }));
            const srAdded = updated.map((item, index) => ({ ...item, srno: index + 1 }))
            setUserData(srAdded)
            setUserList(userListData)
        }
    }

    const handleDelete = async (id) => {
        const userDeleted = await deleteUser(id)
        if (userDeleted) {
            getUsers();
        }
    }


    return (
        <>
            <Layout>
                <div className="bg-white p-4 mb-2 rounded-lg  dark:border-gray-700 mt-14">
                    <div>
                        <h3 class="!text-defaulttextcolor dark:!text-defaulttextcolor/70 dark:text-white text-left dark:hover:text-white text-[1.125rem] font-semibold">List</h3>
                    </div>
                </div>
                <div className="bg-white">
                    <div className="p-4 rounded-lg dark:border-gray-700 ">
                        <div className="flex justify-end mb-3 p-2">
                            <Link to="/Stepperform" className="rounded-lg px-4 py-2 bg-green-700 text-green-100 hover:bg-green-800 duration-300">Add</Link>
                        </div>
                        <Table cols={columns} data={userData} />
                    </div>
                </div>
            </Layout>
        </>
    )
}