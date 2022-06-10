import React, { useEffect, useState } from "react";
import Pagination from "../Pagination/Pagination";
import Spinner from "../Spinner/Spinner";
import UsersTable from "../UsersTable/UsersTable";

const Home = () => {
    const [allUsersCount, setAllUsersCount] = useState(0);
    const [pageCount, setPageCount] = useState(0);
    const [pageSize, setPageSize] = useState("10");
    const [allUsers, setAllUsers] = useState([]);
    const [users, setUsers] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [dataRange, setDataRange] = useState("");
    const [searchQuery, setSearchQuery] = useState("");
    const [loading, setLoading] = useState(false);


    useEffect(() => {

        fetch(`https://react-smart-data-table.herokuapp.com/users`)
            .then((res) => res.json())
            .then((data) => {
                setAllUsers(data);
            });
    }, [allUsersCount]);

    useEffect(() => {
        if (pageSize === "10") {
            fetch(`https://react-smart-data-table.herokuapp.com/users/count`)
                .then((res) => res.json())
                .then((data) => {
                    setPageCount(Math.ceil(data.count / 10));
                    setAllUsersCount(data.count);
                });
        }
    }, [pageCount, pageSize]);

    useEffect(() => {
        setLoading(true);
        fetch(`https://react-smart-data-table.herokuapp.com/users/${pageSize}/${currentPage}`)
            .then((res) => res.json())
            .then((data) => {
                setUsers(data);
                setLoading(false);
            })
            .then(() => {
                if (pageSize !== "10") {
                    setPageCount(Math.ceil(allUsersCount / pageSize));
                }
            });
    }, [currentPage, pageSize, pageCount, allUsersCount]);



    return (
        <div className="my-5">
            {/* <div className="text-center"> */}
            <Pagination
                dataRange={dataRange}
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                pageCount={pageCount}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                allUsersCount={allUsersCount}
                pageSize={pageSize}
                setPageSize={setPageSize}
            ></Pagination>
            {/* </div> */}
            <UsersTable
                users={users}
                allUsers={allUsers}
                setDataRange={setDataRange}
                totalUsers={allUsersCount}
                searchQuery={searchQuery}
                loading={loading}
            ></UsersTable>
        </div>
    );
};

export default Home;