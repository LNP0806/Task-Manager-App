export default function Field({
  as = 'input',
  className = '',
  label,
  id,
  ...props
}) {
  const Component = as

  return (
    <label className="block" htmlFor={id}>
      <span className="mb-1 block text-sm font-medium text-slate-700">
        {label}
      </span>
      <Component
        className={`w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-teal-700 focus:ring-2 focus:ring-teal-700/15 ${className}`}
        id={id}
        {...props}
      />
    </label>
  )
}
