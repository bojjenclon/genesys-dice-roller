import React from 'react'
import TextField from 'material-ui/TextField';

const DiceRoller = function (props) {
  const inputProps = {
    min: 0, 
    max: props.max,
    onFocus: props.onFocusCallback,
    onBlur: props.onBlurCallback
  }

  return (
    <div className="DiceRoller">
      <TextField label={props.name.toUpperCase()} type="number" inputProps={inputProps} min={0} name={props.name} value={props.value} onChange={props.onChangeCallback} margin="normal" />
    </div>
  )
}

export default DiceRoller
