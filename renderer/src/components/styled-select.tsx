import Select, { StylesConfig } from "react-select";

export function StyledSelect<Option, IsMulti extends boolean = false>(
  props: React.ComponentProps<typeof Select<Option, IsMulti>>
) {
  const customStyles: StylesConfig<Option, IsMulti> = {
    control: (base, state) => ({
      ...base,
      backgroundColor: "#fff",
      borderColor: state.isFocused ? "#000" : "#9ca3af",
      borderWidth: "1px",
      borderRadius: "0.25rem",
      paddingLeft: "0.25rem",
      boxShadow: state.isFocused ? "0 0 0 1px #00000020" : "none",
      "&:hover": {
        borderColor: state.isFocused ? "#000" : "#9ca3af",
      },
    }),
    menu: (base) => ({
      ...base,
      marginTop: "2px",
      borderRadius: "0.25rem",
      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    }),
    option: (base, state) => ({
      ...base,
      backgroundColor: state.isFocused ? "#e5e5e5" : "#fff",
      color: "#000",
      padding: "0.5rem 0.75rem",
      cursor: "pointer",
      "&:active": {
        backgroundColor: "#e5e5e5",
      },
    }),
    singleValue: (base) => ({
      ...base,
      color: "#111827",
      fontWeight: 500,
    }),
    placeholder: (base) => ({
      ...base,
      color: "#9CA3AF",
    }),
    input: (base) => ({
      ...base,
      color: "#111827",
      padding: 0,
    }),
    multiValue: (base) => ({
      ...base,
      backgroundColor: "#e5e5e5",
      borderRadius: "0.25rem",
      fontWeight: 500,
    }),
    dropdownIndicator: (base, state) => ({
      ...base,
      color: "#000",
      transition: "all 200ms ease-in",
      transform: state.selectProps.menuIsOpen ? "rotate(180deg)" : "rotate(0deg)",
      cursor: "pointer",
      "&:hover": {
        color: "#000",
      },
    }),
    clearIndicator: (base) => ({
      ...base,
      color: "#9CA3AF",
      cursor: "pointer",
      "&:hover": {
        color: "#ef4444",
      },
    }),
  };

  return <Select {...props} styles={customStyles} />;
}
