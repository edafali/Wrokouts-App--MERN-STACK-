import { useWorkoutContext } from "../hooks/useWorkoutContext";
import { Toaster, toast } from "sonner";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

import { formatDistance, formatDistanceToNow } from "date-fns";
export default function WorkoutDetail({ workout }) {
  const { dispatch } = useWorkoutContext();
  const trash = <FontAwesomeIcon icon={faTrash} />;
  const handlDelete = async () => {
    const response = await fetch(
      "http://localhost:4000/api/workouts/" + workout._id,
      {
        method: "DELETE",
      }
    );
    const json = await response.json();
    if (response.ok) {
      dispatch({ type: "DELETE_WORKOUT", payload: json });
      toast.info(json.title + " has been deleted successfully ");
    }
  };
  return (
    <>
      <Toaster richColors position="top-right" />
      <div
        tabIndex={0}
        className="collapse collapse-open shadow-md rounded-none bg-base-100 "
      >
        <div className="collapse-title flex flex-row justify-between">
          <span className=" text-xl font-bold text-emerald-700">
            {workout.title}
          </span>
          <button
            onClick={handlDelete}
            className=" text-xl text-red-700 rounded-full  hover:text-red-800 "
          >
            {trash}
          </button>
        </div>
        <div className="collapse-content">
          <p>
            <strong>Load : {workout.load} (KG)</strong>
          </p>
          <p>
            <strong>Reps : {workout.reps}</strong>
          </p>
          <p className="mt-2 flex flex-row justify-start">
            <span class="material-symbols-outlined mr-2 text-base">
              schedule
            </span>
            <span>
              {formatDistanceToNow(new Date(workout.createdAt), {
                addSuffix: true,
              })}
            </span>
          </p>
        </div>
      </div>
    </>
  );
}
