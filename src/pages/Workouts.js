import React, { useState, useEffect, useContext } from "react";

import UserContext from "../context/UserContext";
import WorkoutDetails from "../components/WorkoutDetails";

export default function Products() {
  const { user } = useContext(UserContext);

  const [workouts, setWorkouts] = useState([]);
  const [filteredWorkouts, setFilteredWorkouts] = useState([]);

  const fetchData = () => {
    let fetchUrl = `https://fitnessapp-api-ln8u.onrender.com/workouts/getMyWorkouts`;

    fetch(fetchUrl, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        
        setWorkouts(data);
        setFilteredWorkouts(data);
      });
  };

  useEffect(() => {
    fetchData();
  }, [user]);

  return (
    <>
      {/*{user.isAdmin === true ? (
          <AdminView productsData={filteredProducts} fetchData={fetchData} />
      ) : (
          <UserView productsData={filteredProducts} />
      )}*/}
		<WorkoutDetails workoutData={filteredWorkouts} fetchData={fetchData} />
    </>
  )
}
