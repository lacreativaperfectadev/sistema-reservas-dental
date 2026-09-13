interface CheckboxCustomProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
  disabled?: boolean;
  id?: string;
}

export function CheckboxCustom({
  checked,
  onChange,
  label,
  disabled = false,
  id,
}: CheckboxCustomProps) {
  return (
    <label className="flex items-center gap-2 cursor-pointer">
      <div className="relative">
        <input
          id={id}
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          disabled={disabled}
          className="sr-only"
        />
        <div
          className={`
            w-5 h-5 rounded border-2 transition-all
            ${
              checked
                ? "bg-clinic-500 border-clinic-500"
                : "border-clinic-300 bg-white"
            }
            ${disabled ? "opacity-50 cursor-not-allowed" : ""}
            focus-visible:ring-2 focus-visible:ring-clinic-300
          `}
        />
        {checked && (
          <svg
            className="absolute inset-0 w-5 h-5 text-white pointer-events-none"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={3}
              d="M5 13l4 4L19 7"
            />
          </svg>
        )}
      </div>
      {label && (
        <span className={`text-sm font-medium ${disabled ? "opacity-50" : ""}`}>
          {label}
        </span>
      )}
    </label>
  );
}
