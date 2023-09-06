import { SetStateAction } from "react";
import AddIcon from "../components/addIcon";
import Header from "../components/header";
import Workout from "../components/workout";
import { WorkoutObj } from "../types/WorkoutObj";
import useFilter from "../hooks/useFilter";

type Props = {
  setView: React.Dispatch<SetStateAction<string>>;
  setActiveWorkout: React.Dispatch<SetStateAction<WorkoutObj>>;
  workouts: WorkoutObj[];
  setWorkouts: React.Dispatch<SetStateAction<WorkoutObj[]>>;
  setWorkoutToEdit: React.Dispatch<SetStateAction<WorkoutObj | null>>;
};

const Home = ({
  setView,
  workouts,
  setWorkouts,
  setActiveWorkout,
  setWorkoutToEdit,
}: Props) => {
  const { filter, dispatch, filteredWorkouts } = useFilter(workouts);

  return (
    <>
      <Header
        filter={filter}
        dispatch={dispatch}
        filteredWorkouts={filteredWorkouts}
      />
      <div className="p-1 space-y-1">
        {filter.filteredWorkouts.map((workout) => (
          <Workout
            key={workout.id}
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
  );
};

export default Home;
