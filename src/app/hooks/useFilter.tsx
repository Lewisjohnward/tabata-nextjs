"use client";
import { useReducer } from "react";
import { colors } from "@/misc/colors";
import { updateThemeColor } from "@/helpers/updateThemeColor";

const filterInit = {
  color: "",
  filterString: "",
  expandedMenu: false,
  filterFavorites: false,
  expandedWorkouts: false,
  paletteVisible: false,
  colorCount: {},
};

type Filter = {
  color: string;
  filterString: string;
  expandedMenu: boolean;
  filterFavorites: boolean;
  expandedWorkouts: boolean;
  paletteVisible: boolean;
};

type Payload = {
  key: keyof Filter;
  value?: boolean | string;
};

type Action = {
  type: string;
  payload: Payload;
};

const reducer = (filter: Filter, action: Action) => {
  const {
    type,
    payload: { key, value },
  } = action;
  switch (type) {
    case "TOGGLE":
      return {
        ...filter,
        [key]: !filter[key],
      };
    case "UPDATE":
      return {
        ...filter,
        [key]: value,
        filterFavorites: false,
      };
    default:
      return filter;
  }
};

const filterWorkouts = (filter: Filter, workouts: WorkoutObj[]) => {
  return workouts
    .filter(({ color }) => {
      return filter.color != "" ? color == filter.color : true;
    })
    .filter(({ favourite }) => {
      return filter.filterFavorites ? favourite : true;
    })
    .filter(({ title }) => {
      return filter.filterString != ""
        ? title.includes(filter.filterString)
        : true;
    });
};

const useFilter = (workouts: WorkoutObj[]) => {
  const [filterState, dispatch] = useReducer(reducer, filterInit);

  const filteredWorkouts = filterWorkouts(filterState, workouts);
  if (filteredWorkouts.length != 0) updateThemeColor(filteredWorkouts[0].color);
  filteredWorkouts.sort((a, b) => a.position - b.position);

  const favouriteCount = filteredWorkouts.filter(
    (workout) => workout.favourite == true
  ).length;

  const colorCount = colors.map((color) => {
    const number = workouts.filter((workout) => color == workout.color).length;
    return {
      color,
      number,
    };
  });

  const filter = {
    filteredWorkouts,
    favouriteCount,
    colorCount,
  };

  return {
    filter,
    filterState,
    dispatch,
  };
};

export default useFilter;
