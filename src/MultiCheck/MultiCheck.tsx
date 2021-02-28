import React, { useEffect, useState } from 'react';
import CheckBox from './components/CheckBox';
import './MultiCheck.css';

export type Option = {
  label: string,
  value: string
}

/**
 * Notice:
 * 1. There should be a special `Select All` option with checkbox to control all passing options
 * 2. If columns > 1, the options should be placed from top to bottom in each column
 *
 * @param {string} label - the label text of this component
 * @param {Option[]} options - options
 * @param {string[]} values - default checked option values
 * @param {number} columns - default value is 1
 * @param {Function} onChange - when checked options are changed,
 *                             they should be passed to outside
 */
type Props = {
  label?: string,
  options: Option[],
  columns?: number,
  values?: string[]
  onChange?: (options: Option[]) => void,
}

const MultiCheck: React.FunctionComponent<Props> = (props): JSX.Element => {
  const { label, options, values, onChange } = props;
  const [checked, setChecked] = useState<string[]>([]);
  const [selectAllChecked, setSelectAllChecked] = useState<boolean>(false);

  const onAllChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
    if(selectAllChecked) {
      setChecked([])
    } else {
      const allValues = [] as string[];
      options.forEach((item: Option) => allValues.push(item.value))
      setChecked(allValues)
    }
    setSelectAllChecked(!selectAllChecked)
  }

  const onItemChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
    const strValue = String(e.target.value);
    const currentChecked = [...checked];
    const index = currentChecked?.indexOf(strValue)
    if(index === -1) {
      currentChecked.push(strValue)
    } else {
      currentChecked?.splice(index, 1)
    }
    setChecked(currentChecked)
    setSelectAllChecked(currentChecked.length === options.length)
  }

  useEffect(() => {
    setChecked(values || []);
    if(values && values.length === options.length) {
      setSelectAllChecked(true)
    } else {
      setSelectAllChecked(false)
    }
  }, []);

  useEffect(() => {
    if(onChange) {
      const checkedOptions = [] as Option[];
      options.forEach((option) => {
        if(checked.indexOf(option.value) !== -1) {
          checkedOptions.push(option)
        }
      })
      onChange(checkedOptions);
    }
  }, [checked])
  
  return (
    <div className='MultiCheck'>
      {/* TODO */}
      <div className="MultiCheckLabel">
        <label>{label}</label>
      </div>
      <div className="MultiCheckContentWrap">
        <div className="MultiCheckContent">
          <div>
            <CheckBox 
              handleChanged={onAllChanged} 
              isChecked={!!selectAllChecked} 
              label="Select All"
              value="all"
              />
          </div>
          {
            options.map((opt: Option) => 
              <CheckBox
                handleChanged={onItemChanged} 
                isChecked={checked.indexOf(String(opt.value)) !== -1}
                key={opt.value}
                label={opt.label}
                value={opt.value}
              />
            )
          }
        </div>
      </div>
    </div>
  )
}

export default MultiCheck;
