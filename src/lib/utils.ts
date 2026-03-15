import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

const basePath = typeof process !== "undefined" ? process.env.NEXT_PUBLIC_BASE_PATH ?? "" : "";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function asset(path: string): string {
  if (path.startsWith("http")) return path;
  return `${basePath}${path}`;
}
