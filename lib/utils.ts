import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { CHART_SPEED } from "./constants";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const generateSpeed = (speed: number) => {
  return Number(CHART_SPEED / speed);
};
