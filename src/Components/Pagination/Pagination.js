import React, { useEffect } from "react";

function Pagination({ pageCount, currentPage, setCurrentPage, allUsersCount, setPageSize, dataRange, searchQuery, setSearchQuery }) {
    let active = currentPage;
    let users = [];
    for (let number = 1; number <= pageCount; number++) {
        users.push(
            <button
                key={number}
                onClick={() => setCurrentPage(number)}
                className={`btn ${number === active ? "btn-primary" : ""}`}
            >
                {number}
            </button>
        );
    }

    useEffect(() => {
        setSearchQuery("");
    }
        , [currentPage]);

    const paginationBasic = (
        <div>
            <span>
                <strong>{dataRange}</strong>
            </span>
            {
                users.map(user => user)
            }
            <div>
                <select
                    onChange={(e) => {
                        setPageSize(e.target.value);
                        setCurrentPage(1);
                    }}
                    className="select-pagination inline-block"
                    aria-label="Default select example"
                >
                    <option value="10">10</option>
                    <option value="25">25</option>
                    <option value={allUsersCount}>All</option>
                </select>
                <span>Users/Page</span>
            </div>
            <form>
                    <input
                        onChange={(e) => setSearchQuery(e.target.value)}
                        value={searchQuery}
                        type="text" placeholder="Name, Email, Age or Company" />
            </form>
        </div>
    );

    return paginationBasic;
}

export default Pagination;