import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getEnumKey<T extends object>(enumObj: T, enumValue: string): keyof T | undefined {
  return Object.keys(enumObj).find(key => enumObj[key as keyof T] === enumValue) as keyof T | undefined;
}