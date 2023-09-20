"use client";
import Link from "next/link";
import { useState } from "react";
import useFilter from "../hooks/useFilter";
import ActiveWorkout from "../pages/activeWorkout";
import AddWorkout from "../pages/addWorkout";
import { WorkoutObj } from "../types/WorkoutObj";
import AddIcon from "./addIcon";
import Header from "./header";
import Workout from "./workout";

const NewHeader = ({
  user,
  data,
}: {
  user: string | undefined;
  data: WorkoutObj[];
}) => {
  const [view, setView] = useState("home");
  const [workouts, setWorkouts] = useState(data);
  const [activeWorkout, setActiveWorkout] = useState({} as WorkoutObj);
  const [workoutToEdit, setWorkoutToEdit] = useState<WorkoutObj | null>(null);

  const { filter, dispatch, filteredWorkouts, colorCount } =
    useFilter(workouts);

  return (
    <>
      {view == "home" && (
        <>
          <Header
            filter={filter}
            dispatch={dispatch}
            filteredWorkouts={filteredWorkouts}
            colorCount={colorCount}
            user={user}
          />
          <div className="p-1 space-y-1">
            {filteredWorkouts.map((workout) => (
              <Workout
                key={workout.id}
                expandedWorkout={filter.expandedWorkouts}
                setView={setView}
                workout={workout}
                setWorkouts={setWorkouts}
                setActiveWorkout={setActiveWorkout}
                setWorkoutToEdit={setWorkoutToEdit}
              />
            ))}
          </div>
          <AddIcon setView={setView} />
        </>
      )}
      {view == "activeworkout" && (
        <ActiveWorkout setView={setView} workout={activeWorkout} />
      )}
      {view == "addworkout" && (
        <AddWorkout
          setView={setView}
          setWorkouts={setWorkouts}
          workoutToEdit={workoutToEdit}
          setWorkoutToEdit={setWorkoutToEdit}
        />
      )}
    </>
  );
};

export default NewHeader;
