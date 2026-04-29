import React, { forwardRef, memo } from 'react'

/**
 * FormInput
 * A flexible, accessible form field supporting:
 *   type="text|tel|number|email|select|textarea"
 *
 * Props:
 *   label       – field label
 *   id          – input id / htmlFor
 *   error       – validation error string
 *   hint        – helper text
 *   type        – input type (default "text")
 *   options     – array of strings (for type="select")
 *   placeholder – placeholder text
 *   required    – boolean
 *   ...rest     – passed to the underlying input/select/textarea
 */
const FormInput = forwardRef(function FormInput(
  { label, id, error, hint, type = 'text', options = [], className = '', required, ...rest },
  ref
) {
  const baseClass = `form-field ${error ? 'border-red-400 focus:border-red-400 focus:ring-red-100' : ''} ${className}`

  const renderField = () => {
    if (type === 'select') {
      return (
        <select ref={ref} id={id} className={baseClass} {...rest}>
          <option value="">Select…</option>
          {options.map(opt => (
            <option key={opt} value={opt}>{opt}</option>
          ))}
        </select>
      )
    }
    if (type === 'textarea') {
      return (
        <textarea
          ref={ref}
          id={id}
          rows={3}
          className={`${baseClass} resize-none`}
          {...rest}
        />
      )
    }
    return (
      <input
        ref={ref}
        id={id}
        type={type}
        className={baseClass}
        {...rest}
      />
    )
  }

  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label htmlFor={id} className="text-xs font-semibold text-ink-secondary uppercase tracking-wide">
          {label}
          {required && <span className="text-red-400 ml-0.5">*</span>}
        </label>
      )}
      {renderField()}
      {error && <p className="text-xs text-red-500 mt-0.5">{error}</p>}
      {hint && !error && <p className="text-xs text-ink-muted">{hint}</p>}
    </div>
  )
})

export default memo(FormInput)
