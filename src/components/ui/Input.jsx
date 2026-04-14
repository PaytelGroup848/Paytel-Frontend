export default function Input({
  label,
  error,
  placeholder,
  type = 'text',
  value,
  onChange,
  icon: Icon,
  name,
  autoComplete,
}) {
  return (
    <div className="w-full">
      {label ? (
        <label className="block text-sm font-medium text-textMuted mb-2" htmlFor={name}>
          {label}
        </label>
      ) : null}
      <div className="relative">
        {Icon ? (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-textMuted">
            <Icon size={18} />
          </div>
        ) : null}
        <input
          id={name}
          name={name}
          autoComplete={autoComplete}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={[
            'w-full h-11 rounded-xl bg-white/5 border border-white/10 text-textPrimary placeholder:text-textMuted',
            Icon ? 'pl-10 pr-3' : 'px-3',
            'focus:outline-none focus:ring-2 focus:ring-primary/50',
          ].join(' ')}
        />
      </div>
      {error ? <p className="mt-2 text-sm text-danger">{error}</p> : null}
    </div>
  );
}

