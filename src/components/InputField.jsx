import PropTypes from 'prop-types';

const InputField = (props) => {
  return (
    <div className={`${props.width} mb-6`}>
      <label htmlFor={props.id} className='block mb-2 ml-4 text-xs font-medium text-gray-900 uppercase'>
        {props.labelText}
      </label>
      <div className='relative'>
        {props.icon && (
          <div className='absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none'>{props.icon}</div>
        )}
        <input
          type={props.type}
          id={props.id}
          className={`bg-white border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 ${
            props.icon ? 'pl-10' : 'px-5'
          }`}
          placeholder={props.placeholder}
          autoComplete={props.autoComplete}
          {...props.register}
        />
        {props.errors && <span className='absolute text-xs text-red-500 left-4'>{props.errors.message}</span>}
      </div>
    </div>
  );
};

InputField.propTypes = {
  id: PropTypes.string.isRequired,
  labelText: PropTypes.string.isRequired,
  errors: PropTypes.object,
  type: PropTypes.string,
  placeholder: PropTypes.string,
  width: PropTypes.string,
  icon: PropTypes.object,
  register: PropTypes.object.isRequired,
  autoComplete: PropTypes.string
};

InputField.defaultProps = {
  errors: undefined,
  type: 'text',
  placeholder: '',
  width: 'w-1/4',
  icon: undefined,
  autoComplete: 'on'
};

export { InputField };
