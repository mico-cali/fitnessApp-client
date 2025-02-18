import { useState, useEffect } from 'react';
// import ProductCard from './ProductCard';
// import SearchProducts from './SearchProducts';
import AllWorkouts from './AllWorkouts';


export default function WorkoutDetails({ workoutData, fetchData }) {

  const [filteredWorkouts, setFilteredWorkouts] = useState([]);
  const [searchConfirmed, setSearchConfirmed] = useState(false);

  useEffect(() => {
    console.log(workoutData);

    // Set initial filtered products to all active products
    setFilteredWorkouts(workoutData.filter(workout => workout.isActive));
  }, [workoutData]);

  return(
    <>  
      {/*Go to SearchProducts Page*/}
      {/*<SearchProducts
            productsData={productsData}
            setFilteredProducts={setFilteredProducts}
            setSearchConfirmed={setSearchConfirmed}
        />*/}

        {/*Go to All Workouts Page*/}
          <AllWorkouts workouts={filteredWorkouts} searchConfirmed={searchConfirmed} />
    </>
  )
}