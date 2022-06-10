import React, { useEffect, useState } from "react";

const Home = () => {
    const [allUsersCount, setAllUsersCount] = useState(0);
    const [pageCount, setPageCount] = useState(0);
    const [pageSize, setPageSize] = useState("10");
    const [allUsers, setAllUsers] = useState([]);

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
        fetch(`https://react-smart-data-table.herokuapp.com/users`)
            .then((res) => res.json())
            .then((data) => {
                setAllUsers(data);
            });
    }, [allUsersCount]);

    return (
        <div className="my-5">
            {allUsers.length}
        </div>
    );
};

export default Home;