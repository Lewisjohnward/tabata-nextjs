"use client";
import { SetStateAction } from "react";
import { AiFillStar, BsFillPlayFill, FaEllipsisV } from "@/misc/icons";
import { RxDragHandleDots1 } from "react-icons/rx";
import useMenu from "../hooks/useMenu";
import convertTime from "../helpers/convertTime";
import Menu from "./menu";
import Summary from "./summary";
import Link from "next/link";
import UserMessageModal from "./userMessageModal";
import { Draggable } from "react-beautiful-dnd";
import clsx from "clsx";
import { useStore } from "@/stores/useWorkoutsStore";

const ExpandedWorkoutView = ({ workout }: { workout: WorkoutObj }) => {
  return (
    <div className="text-xl">
      <p>{workout.prepare > 0 && `Prepare: ${workout.prepare}`}</p>
      <p>{`Work: ${workout.work}`}</p>
      <p>{workout.rest > 0 && `Rest: ${workout.rest}`}</p>
      <p>{workout.cooldown > 0 && `Cooldown: ${workout.cooldown}`}</p>
      <p>{workout.cycles > 0 && `Cycles: ${workout.cycles}`}</p>
      <p>{workout.sets > 0 && `Sets: ${workout.sets}`}</p>
    </div>
  );
};

type Props = {
  user: string | undefined;
  index: number;
  expandedWorkout: boolean;
  workout: WorkoutObj;
  setWorkouts: React.Dispatch<SetStateAction<WorkoutObj[]>>;
};

const Workout = ({
  user,
  index,
  expandedWorkout,
  workout,
  setWorkouts,
}: Props) => {
  const menu = useMenu(user, workout, setWorkouts);
  return (
    <Draggable draggableId={workout.id} index={index} key={workout.id}>
      {(provided, snapshot) => (
        <div ref={provided.innerRef} {...provided.draggableProps}>
          <div
            className={clsx(
              "relative flex items-center gap-2 p-4 text-white rounded",
              snapshot.isDragging && "shadow-2xl"
            )}
            style={{ backgroundColor: `${workout.color}` }}
          >
            <div {...provided.dragHandleProps}>
              <RxDragHandleDots1 className="text-2xl" />
            </div>
            <div className="flex flex-grow space-between">
              <div className="space-y-2">
                <h3 className="font-bold text-3xl">{workout.title}</h3>
                {expandedWorkout && <ExpandedWorkoutView workout={workout} />}
                <p className="text-md lg:text-lg">
                  {`Total: ${convertTime(workout.totalTime)} - ${
                    workout.intervals
                  } intervals`}
                </p>
              </div>
              <div className="flex-grow flex justify-end gap-4 text-2xl [&>button]:text-4xl">
                <button>
                  <BsFillPlayFill onClick={menu.handleActivateWorkout} />
                </button>
                {workout.favourite && (
                  <AiFillStar className="absolute top-2 right-2 text-sm" />
                )}
                <div className="relative flex justify-center items-center">
                  <button>
                    <FaEllipsisV onClick={menu.toggleMenu} />
                  </button>
                  {menu.menuOpen && (
                    <Menu
                      duplicateWorkout={menu.duplicateWorkout}
                      toggleFavorite={menu.toggleFavorite}
                      favorite={workout.favourite}
                      deleteWorkout={menu.deleteWorkout}
                      closeMenu={() => menu.setMenuOpen(false)}
                      yPosition={menu.yPosition}
                      handleEdit={menu.handleEdit}
                      handlePreview={menu.handlePreview}
                    />
                  )}
                  {menu.summaryOpen && (
                    <Summary
                      setSummaryVisible={menu.setSummaryOpen}
                      workout={workout}
                      color={workout.color}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
          {menu.displayModal && (
            <UserMessageModal
              closePortal={() => {
                menu.setDisplayModal(false);
                menu.setMenuOpen(false);
              }}
            >
              <p>Login to modify workouts</p>
              <Link
                href="/login"
                className="bg-black/20 px-4 py-2 rounded shadow hover:bg-black/40"
              >
                Login/Sign up
              </Link>
            </UserMessageModal>
          )}
        </div>
      )}
    </Draggable>
  );
};

export default Workout;
