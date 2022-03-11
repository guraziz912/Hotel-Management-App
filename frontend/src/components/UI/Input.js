import { useField } from 'formik';

import classes from './Input.module.css';

const Input = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <div className={classes.inputBox}>
      <label htmlFor={props.id || props.name}>{label}</label>
      <input {...field} {...props} />
      {meta.touched && meta.error ? (
        <div className={classes.errorMessage}>{meta.error}</div>
      ) : null}
    </div>
  );
};
export default Input;
