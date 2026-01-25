import {
  createTheme,
  DatepickerProps,
  Datepicker as FlowbiteDatepicker,
  ThemeProvider,
} from "flowbite-react";

export function Datepicker(props: DatepickerProps) {
  const datepickerTheme = createTheme({
    datepicker: {
      root: {
        input: {
          field: {
            input: {
              base: "!bg-white",
            },
          },
        },
      },
      popup: {
        root: {
          inner: "border p-3",
        },
        header: {
          selectors: {
            button: {
              prev: "px-2.5",
              next: "px-2.5",
            },
          },
        },
      },
    },
  });

  return (
    <ThemeProvider theme={datepickerTheme}>
      <FlowbiteDatepicker
        {...props}
        language="pt-BR"
        labelTodayButton="Hoje"
        labelClearButton="Limpar"
      />
    </ThemeProvider>
  );
}
