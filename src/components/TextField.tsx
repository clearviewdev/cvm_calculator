import { TextFieldProps } from '../types';

function TextField({
  label,
  name,
  value,
  error,
  onChange,
  onBlur,
  onKeyDown,
  type,
  placeholder = '',
  readOnly,
  autoFocus = false,
}: TextFieldProps) {
  return (
    <div className="flex flex-col">
      {label && (
        <label className="text-sm font-medium text-gray-700 dark:text-white">
          {`${label}:`}
        </label>
      )}
      <div className="relative mt-1 rounded-md shadow-sm">
        <input
          name={name}
          value={value || ''}
          onChange={onChange}
          onBlur={onBlur}
          type={type}
          placeholder={placeholder}
          onKeyDown={onKeyDown}
          autoFocus={autoFocus}
          className={`block w-full pr-3 pl-5 py-2 text-base placeholder-gray-300 transition duration-500 ease-in-out transform border text-neutral-600 dark:text-white dark:bg-slate-900 focus:outline-none ${
            error
              ? ' border-red-500 rounded-lg bg-red-50  focus:ring-4 focus:ring-red-300 dark:focus:ring-red-600'
              : ' border-transparent rounded-lg bg-gray-50 focus:border-transparent focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700'
          }`}
          style={{ width: '100%' }} // Ensure input fields have the same width
          readOnly={readOnly}
        />
      </div>

      {/* Only render error message if error exists and value is present */}
      {error && value && <p className="my-2 text-red-500">{error}</p>}
    </div>
  );
}

export default TextField;
