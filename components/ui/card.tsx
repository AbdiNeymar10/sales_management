import React from "react";

export default function Card({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={`bg-white dark:bg-slate-800 rounded-md shadow p-6 ${className}`}>{children}</div>;
}
