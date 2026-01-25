import Select, { StylesConfig } from "react-select";

export function StyledSelect<Option, IsMulti extends boolean = false>(
  props: React.ComponentProps<typeof Select<Option, IsMulti>>,
) {
  const customStyles: StylesConfig<Option, IsMulti> = {
    control: (base, state) => ({
      ...base,
      backgroundColor: "#fff",
      borderWidth: "1px",
      borderColor: state.isFocused ? "#22c55e" : "#d1d5db",
      outline: state.isFocused ? "1px solid #22c55e" : "none",
      borderRadius: "0.5rem",
      boxShadow: "none",
      "&:hover": {
        borderColor: state.isFocused ? "#22c55e" : "#d1d5db",
      },
      cursor: "pointer",
    }),
    menu: (base) => ({
      ...base,
      marginTop: "4px",
      borderRadius: "0.5rem",
      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
      border: "1px solid #d1d5db",
    }),
    option: (base, state) => ({
      ...base,
      backgroundColor: state.isFocused ? "#e5e7eb" : "#fff",
      color: "#000",
      padding: "0.5rem 0.75rem",
      cursor: "pointer",
      "&:active": {
        backgroundColor: "#e5e7eb",
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
      backgroundColor: "#e5e7eb",
      borderRadius: "0.25rem",
      paddingLeft: "0.25rem",
      fontWeight: 500,
    }),
    dropdownIndicator: (base, state) => ({
      ...base,
      color: "#6b7280",
      transition: "all 200ms ease-in",
      transform: state.selectProps.menuIsOpen ? "rotate(180deg)" : "rotate(0deg)",
      "&:hover": {
        color: "#6b7280",
      },
    }),
    indicatorSeparator: () => ({
      display: "none",
    }),
    clearIndicator: (base) => ({
      ...base,
      color: "#9CA3AF",
      cursor: "pointer",
      "&:hover": {
        color: "#ef4444",
      },
    }),
    menuList: (base) => ({
      ...base,
      padding: 0
    }),
  };

  return <Select {...props} styles={customStyles} />;
}
