import React from 'react';

type Props = {
  isChecked?: boolean,
  label?: string,
  value: string,
  handleChanged?: (event: React.ChangeEvent<HTMLInputElement>) => void,
}

const CheckBoxItem: React.FunctionComponent<Props> = (props): JSX.Element => {
  const {handleChanged, isChecked, label} = props;

  return (
    <label>
      <input
        type="checkbox"
        checked={!!isChecked}
        onChange={handleChanged}
        {...props}
      />
      <span>{label}</span>
    </label>
  )
}

export default CheckBoxItem;