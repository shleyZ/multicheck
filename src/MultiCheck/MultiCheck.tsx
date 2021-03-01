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
  values?: string[],
  onChange?: (options: Option[]) => void,
}

const MultiCheck: React.FunctionComponent<Props> = (props): JSX.Element => {
  const { label, options, values, onChange, columns } = props;
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

  // initialized checked state
  useEffect(() => {
    setChecked(values || []);
    if(values && values.length === options.length) {
      setSelectAllChecked(true)
    } else {
      setSelectAllChecked(false)
    }
  }, []);

  // Monitor the checked state and react to the higher-level component
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

  // counts per columns
  const columnCounts = Math.ceil(options.length / (columns || 1));
  // column percent %
  const columnWidths = 1/(columns || 1) * 100;

  const selesctAll = (
    <CheckBox 
      checked={!!selectAllChecked} 
      label="Select All"
      value="all"
      key="all"
      handleChanged={onAllChanged}
      />
    )
  /**
   * render column by index
   * @param {number} index - column index
   */
  const renderColumn = (index: number) => {
    const columnDom = [];
    if(index === 0) {
      columnDom.push(selesctAll)
      options.slice(0, columnCounts-1).map((opt: Option) => {
        columnDom.push(
          <CheckBox
            checked={checked.indexOf(String(opt.value)) !== -1}
            key={opt.value}
            label={opt.label}
            value={opt.value}
            handleChanged={onItemChanged}
          />
        )
      })
    } else {
      const startIndex = (index - 1)*columnCounts + (columnCounts - 1)
      options.slice(startIndex, columnCounts+startIndex).map((opt: Option) => {
        columnDom.push(
          <CheckBox
            checked={checked.indexOf(String(opt.value)) !== -1}
            key={opt.value}
            label={opt.label}
            value={opt.value}
            handleChanged={onItemChanged}
          />
        )
      })
    }
    return (
      <div 
        key={index}
        style={{
          width: `${columnWidths}%`, 
          display: 'inline-block'
        }}
        >
        {columnDom}
      </div>
    );
  }

  /**
   * render all columns
   * @param {number} columns 
   */
  const renderColumns = (columns: number) => {
    const res = [];
    for(let i = 0; i < columns; i++) {
      const columnDom = renderColumn(i)
      res.push(columnDom)
    }
    return res;
  }
  
  return (
    <div className='MultiCheck'>
      {/* TODO */}
      <div className="MultiCheckLabel">
        <label>{label}</label>
      </div>
      <div className="MultiCheckContentWrap">
        <div className="MultiCheckContent">
          {renderColumns(columns || 1)}
        </div>
      </div>
    </div>
  )
}

export default MultiCheck;
