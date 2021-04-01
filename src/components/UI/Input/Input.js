import classes from './Input.module.css'

const Input = (props) => {
  let inputElement = null
  const inputClasses = [classes.InputElement]

  if (props.invalid && props.shouldValidate && props.touched) {
    inputClasses.push(classes.Invalid)
  }
  switch (props.elementType) {
    case 'input':
      inputElement = (
        <input
          className={inputClasses.join(' ')}
          {...props.elementConfig}
          value={props.value}
          onChange={props.changed}
        />
      )
      break
    case 'textarea':
      inputElement = (
        <textarea
          className={classes.InputElement}
          {...props.elementConfig}
          value={props.value}
          onChange={props.changed}
        />
      )
      break
    case 'select':
      inputElement = (
        <select className={classes.InputElement} value={props.value}>
          {props.elementConfig.options.map((option) => (
            <option value={option.value} onChange={props.changed}>
              {option.displayValue}
            </option>
          ))}
        </select>
      )
      break
    default:
      inputElement = (
        <input
          className={classes.InputElement}
          {...props.elementConfig}
          value={props.value}
        />
      )
  }

  return (
    <div className={classes.Input}>
      <label className={classes.Label} htmlFor="">
        {props.label}
      </label>
      {inputElement}
    </div>
  )
}

export default Input
