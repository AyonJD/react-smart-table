import React, { useEffect, useState } from "react";

const Home = () => {
  const [allUsersCount, setAllUsersCount] = useState(0);
  const [allUsers, setAllUsers] = useState([]);


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