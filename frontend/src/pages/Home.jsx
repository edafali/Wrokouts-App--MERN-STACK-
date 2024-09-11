import { useEffect } from "react";
import WorkoutDetail from "../components/WorkoutDetail";
import FormWrokout from "../components/FormWrokout";
import { useWorkoutContext } from "../hooks/useWorkoutContext";

export default function Home() {
  const {workouts,dispatch} = useWorkoutContext()
  useEffect(() => {
    const fetchWorkouts = () => {
      const res = fetch("http://localhost:4000/api/workouts/")
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          dispatch({type:'SET_WORKOUT',payload : data})
        });
    };
    fetchWorkouts();
  }, []);
  return (
    <div className="max-w-6xl mx-auto gap-4 flex flex-col-reverse md:flex-row">
      <div className="container space-y-3 mt-4 py-4 flex flex-col w-4/5 mx-auto md:w-3/5">
        {workouts &&
          workouts.map((workout) => (
            <WorkoutDetail key={workout._id} workout={workout} />
          ))}
      </div>
      <div className=" container mt-8  w-4/5 mx-auto md:w-2/5">
        <FormWrokout />
      </div>
    </div>
  );
}
