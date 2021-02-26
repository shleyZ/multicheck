import React, { useEffect, useState } from 'react';

type Props = {
  isChecked?: boolean,
  label?: string,
  value: string,
  handleChanged?: (event: React.ChangeEvent<HTMLInputElement>) => void,
}

const CheckBoxItem: React.FunctionComponent<Props> = (props): JSX.Element => {
  const {handleChanged, isChecked, label} = props;
  const [checked, setChecked] = useState<boolean>(false);
  
  useEffect(() => {
    setChecked(isChecked || false);
  }, [isChecked]);

  useEffect(() => {
    setChecked(!!isChecked);
  }, []);

  return (
    <label>
      <input
        type="checkbox"
        checked={checked}
        onChange={handleChanged}
        {...props}
      />
      <span>{label}</span>
    </label>
  )
}

export default CheckBoxItem;