import { ptBR } from "date-fns/locale/pt-BR";
import { Calendar } from "lucide-react";
import { forwardRef, useState } from "react";
import DatePicker, { registerLocale } from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

interface CustomInputProps {
  value?: string;
  onClick?: () => void;
}

interface DatePickerProps {
  initialDate?: Date;
  id?: string;
  name?: string;
  placeholderText?: string;
  onChange?: (date: Date | null) => void;
}

export function Datepicker(props: DatePickerProps) {
  const [inputDate, setInputDate] = useState<Date | null>(props.initialDate || null)

  function handleDateChange(date: Date | null) {
    setInputDate(date)
    if (props.onChange) {
      props.onChange(date)
    }
  }

  registerLocale('pt-BR', ptBR)

  const CustomDatepickerInput = forwardRef<HTMLDivElement, CustomInputProps>(({ value, onClick }, ref) => (
    <div
      onClick={onClick}
      ref={ref}
      tabIndex={1}
      className="rounded bg-white border border-gray-400 px-3 h-[38px] inline-flex items-center justify-between gap-4 w-full cursor-text focus:border-black focus:outline-none focus:shadow-sm"
    >
      {!value ? (
        <span className="text-gray-400 select-none">{props.placeholderText}</span>
      ) : (
        <span className="elect-text">{value}</span>
      )}
      <Calendar size={20} className="cursor-pointer" />
    </div>
  ))

  return (
    <DatePicker
      {...props}
      selected={inputDate}
      onChange={handleDateChange}
      locale="pt-BR"
      customInput={<CustomDatepickerInput />}
      clearButtonClassName="datepicker-clear-button"
      popperPlacement="bottom-start"
      showPopperArrow={false}
      isClearable={true}
      tabIndex={1}
    />
  )
}