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
  defaultValues?: string[],
  onChange?: (options: Option[]) => void,
}

const MultiCheck: React.FunctionComponent<Props> = (props): JSX.Element => {
  const { label, options, defaultValues, onChange, columns = 1 } = props;
  const [checkedValues, setCheckedValues] = useState<string[]>([]);
  const [selectAllChecked, setSelectAllChecked] = useState<boolean>(false);

  const onAllChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
    if(selectAllChecked) {
      setCheckedValues([])
    } else {
      const allValues = [] as string[];
      options.forEach((item: Option) => allValues.push(item.value))
      setCheckedValues(allValues)
    }
    setSelectAllChecked(!selectAllChecked)
  }

  const onItemChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
    const strValue = e.target.value;
    const currentChecked = [...checkedValues];
    const index = currentChecked?.indexOf(strValue)
    if(index === -1) {
      currentChecked.push(strValue)
    } else {
      currentChecked?.splice(index, 1)
    }
    setCheckedValues(currentChecked)
    setSelectAllChecked(currentChecked.length === options.length)
  }

  // initialized checkedValues state
  useEffect(() => {
    if(defaultValues?.join(',') !== checkedValues.join(',')) {
      setCheckedValues(defaultValues || []);
      if(defaultValues && defaultValues.length === options.length) {
        setSelectAllChecked(true)
      } else {
        setSelectAllChecked(false)
      }
    }
  }, [defaultValues]);

  // Monitor the checkedValues state and react to the higher-level component
  useEffect(() => {
    if(onChange) {
      const checkedOptions = [] as Option[];
      options.forEach((option) => {
        if(checkedValues.indexOf(option.value) !== -1) {
          checkedOptions.push(option)
        }
      })
      onChange(checkedOptions);
    }
  }, [checkedValues])

  // counts per columns
  const columnCounts = Math.ceil(options.length / (columns));
  // column percent %
  const columnWidths = 1/(columns) * 100;

  const selectAll = (
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
    let columnOptions = [];
    
    if(index === 0) {
      columnDom.push(selectAll)
      columnOptions = options.slice(0, columnCounts-1);
    } else {
      const startIndex = (index - 1)*columnCounts + (columnCounts - 1);
      columnOptions = options.slice(startIndex, columnCounts+startIndex);
    }
    columnOptions.map((opt: Option) => {
      columnDom.push(
        <CheckBox
          checked={checkedValues.indexOf(String(opt.value)) !== -1}
          key={opt.value}
          label={opt.label}
          value={opt.value}
          handleChanged={onItemChanged}
        />
      )
    })
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
          {renderColumns(columns)}
        </div>
      </div>
    </div>
  )
}

export default MultiCheck;
