import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
export function getEnumKey(enumObj, enumValue): string {
  return Object.keys(enumObj).find(key => enumObj[key] === enumValue) || '';
}