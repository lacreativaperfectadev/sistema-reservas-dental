interface DatePickerCustomProps {
  value: string;
  onChange: (value: string) => void;
  label?: string;
  disabled?: boolean;
  id?: string;
  min?: string;
  max?: string;
}

export function DatePickerCustom({
  value,
  onChange,
  label,
  disabled = false,
  id,
  min,
  max,
}: DatePickerCustomProps) {
  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label htmlFor={id} className="text-sm font-medium text-clinic-700">
          {label}
        </label>
      )}
      <input
        id={id}
        type="date"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        min={min}
        max={max}
        className={`
          rounded border-2 px-3 py-2 text-sm font-medium
          border-clinic-300
          bg-white text-clinic-900
          focus:border-clinic-500 focus:ring-2 focus:ring-clinic-200
          focus:outline-none
          transition-all
          ${disabled ? "opacity-50 cursor-not-allowed bg-clinic-50" : ""}
          disabled:bg-clinic-50
        `}
      />
    </div>
  );
}
