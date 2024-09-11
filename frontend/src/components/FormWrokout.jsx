import { useState } from "react";
import { useWorkoutContext } from "../hooks/useWorkoutContext";
import { Toaster, toast } from "sonner";

export default function FormWrokout() {
  const [title, setTitle] = useState("");
  const [loads, setLoads] = useState("");
  const [reps, setReps] = useState("");
  const { dispatch } = useWorkoutContext();
  //

  const CreateNewWrokout = async (e) => {
    e.preventDefault();
    const workout = { title, reps, load: loads };
    const response = await fetch("https://wrokouts-app-backend.onrender.com/api/workouts/", {
      method: "POST",
      body: JSON.stringify(workout),
      headers: {
        "Content-Type": "Application/json",
      },
    });
    const json = await response.json();
    if (!response.ok) {
      console.log(json.error);
      toast.error("All fields are required ! ! !");
    }
    if (response.ok) {
      dispatch({ type: "CREATE_WORKOUT", payload: json });
      setTitle("");
      setReps("");
      setLoads("");
      toast.success("Wrokout has been added successfully");
    }
  };

  return (
    <>
      <Toaster richColors position="top-right" />
      <form
        className="bg-white shadow-md  px-8 pt-6 pb-8 "
        onSubmit={CreateNewWrokout}
      >
        <h1 className="text-2xl font-bold mb-5 text-emerald-700">
          Add Your Workout
        </h1>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Workout title
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="title"
            type="text"
            onChange={(e) => {
              setTitle(e.target.value);
            }}
            value={title}
          />
        </div>

        <div>
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Loas (KG)
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-2 leading-tight focus:outline-none focus:shadow-outline"
            type="number"
            onChange={(e) => {
              setLoads(e.target.value);
            }}
            value={loads}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Reps
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-2 leading-tight focus:outline-none focus:shadow-outline"
            type="number"
            onChange={(e) => {
              setReps(e.target.value);
            }}
            value={reps}
          />
        </div>
        <div className="flex items-center justify-between place-content-center">
          <button
            className="bg-emerald-700 hover:bg-emerald-900 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Add Workout
          </button>
        </div>
      </form>
    </>
  );
}
