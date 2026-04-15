import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

export default function Input({
  label,
  error,
  placeholder,
  type = "text",
  value,
  onChange,
  icon: Icon,
  name,
  autoComplete,
}) {
  const [showPassword, setShowPassword] = useState(false);

  const isPassword = type === "password";

  const inputType =
    isPassword && showPassword ? "text" : type;

  return (
    <div className="w-full">
      {/* Label */}
      {label && (
        <label
          className="block text-sm font-medium text-textMuted mb-2"
          htmlFor={name}
        >
          {label}
        </label>
      )}

      {/* Input Wrapper */}
      <div className="relative">

        {/* LEFT ICON (FIXED) */}
        {Icon && (
          <span className="
            absolute
            left-3
            top-1/2
            -translate-y-1/2
            text-textMuted
            pointer-events-none
            z-10
          ">
            <Icon size={18} />
          </span>
        )}

        {/* INPUT */}
        <input
          id={name}
          name={name}
          autoComplete={autoComplete}
          type={inputType}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={[
            "w-full h-11 rounded-xl",
            "bg-white/5 backdrop-blur-sm",
            "border transition-all duration-200",

            error
              ? "border-danger focus:ring-danger/40"
              : "border-white/10 focus:ring-primary/40",

            "text-textPrimary placeholder:text-textMuted",

            // LEFT PADDING
            Icon ? "pl-10" : "pl-3",

            // RIGHT PADDING (for eye)
            isPassword ? "pr-10" : "pr-3",

            "focus:outline-none focus:ring-2",
            "hover:border-white/20",
          ].join(" ")}
        />

        {/* RIGHT PASSWORD TOGGLE */}
        {isPassword && (
          <button
            type="button"
            onClick={() =>
              setShowPassword(!showPassword)
            }
            className="
              absolute
              right-3
              top-1/2
              -translate-y-1/2
              text-textMuted
              hover:text-textPrimary
              transition
              z-10
            "
          >
            {showPassword ? (
              <EyeOff size={18} />
            ) : (
              <Eye size={18} />
            )}
          </button>
        )}

      </div>

      {/* ERROR */}
      {error && (
        <p className="mt-2 text-sm text-danger">
          {error}
        </p>
      )}
    </div>
  );
}