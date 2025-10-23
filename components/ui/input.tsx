import React from "react";

export default function Input(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className="w-full px-3 py-2 border border-slate-200 rounded-md bg-white text-sm dark:bg-slate-700 dark:border-slate-600"
      {...props}
    />
  );
}
