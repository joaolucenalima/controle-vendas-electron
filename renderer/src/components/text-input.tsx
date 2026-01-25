import { createTheme, TextInput as FlowbiteTextInput } from "flowbite-react";
import * as React from "react";

export function TextInput({ className, ...props }: React.HTMLProps<HTMLInputElement>) {
  const textInputTheme = createTheme({
    textInput: {
      field: {
        input: {
          base: "!bg-white"
        }
      }
    }
  }).textInput

  return (
    <FlowbiteTextInput
      type="text"
      autoComplete="off"
      autoCorrect="off"
      spellCheck="false"
      theme={textInputTheme}
      {...props}
    />
  );
}
