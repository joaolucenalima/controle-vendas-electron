import React from "react";

export function TextInput({ className, ...props }: React.HTMLProps<HTMLInputElement>) {
  return (
    <input
      className={`w-full border border-gray-400 rounded px-4 h-[38px] focus:border-black focus:outline-none focus:shadow-sm ${className}`}
      type="text"
      autoComplete="off"
      autoCorrect="off"
      spellCheck="false"
      {...props}
    />
  )
}