import React from 'react';
import './CheckBox.css';

type Props = {
  checked: boolean,
  label: string,
  value: string,
  handleChanged: (event: React.ChangeEvent<HTMLInputElement>) => void,
}

const CheckBoxItem: React.FunctionComponent<Props> = (props): JSX.Element => {
  const {handleChanged, checked, label, value} = props;

  return (
    <label style={{display: 'block'}}>
      <input
        type="checkbox"
        checked={!!checked}
        onChange={handleChanged}
        value={value}
      />
      <span className="CheckboxLabel">{label}</span>
    </label>
  )
}

export default CheckBoxItem;