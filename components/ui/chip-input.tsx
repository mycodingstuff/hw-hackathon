import React, { useState, KeyboardEvent } from 'react';
import { Input } from './input';
import { Badge } from './badge';
import { UseFormReturn } from 'react-hook-form';
import { twClassNames } from '@/lib/utils/class-names';

export interface InputProps {
  name: string;
  formHandler: UseFormReturn<any, any, undefined>;
}

const ChipInput: React.FC<InputProps> = (props: InputProps) => {
  const [chips, setChips] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState<string>('');

  const { onChange, ref, name } = props.formHandler.register(props.name);

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === ',' || e.key === 'Enter') {
      e.preventDefault();
      addChip();
    }
  };

  const addChip = () => {
    const trimmedValue = inputValue.trim().replace(/,$/, ''); // Remove trailing comma
    if (trimmedValue) {
      setChips((prevChips) => [...prevChips, trimmedValue]);
      onChange({
        target: {
          value: [...chips, trimmedValue].join(','),
          name,
        },
        type: 'change',
      });
      console.log([...chips, trimmedValue].join(','));
      setInputValue('');
    }
  };

  const handleRemoveChip = (index: number) => {
    setChips((prevChips) => prevChips.filter((_, i) => i !== index));

    onChange({
      target: {
        value: chips.filter((_, i) => i !== index).join(','),
        name,
      },
      type: 'change',
    });
  };

  return (
    <div
      className={twClassNames('flex flex-wrap gap-2 items-center')}
    >
    
      <Input
        value={inputValue}
        onChange={(e) => {
          setInputValue(e.target.value);
        }}
        onKeyPress={handleKeyPress}
        placeholder="Enter tags, separated by comma"
        className="flex-1  w-[230px] p-2 border rounded"
        ref={ref}
        name={name}
      />
        {chips.map((chip, index) => (
        <Badge
          key={index}
          className="bg-gray-200 text-gray-700 px-3 py-1 rounded-md flex items-center h-8"
        >
          {chip}
          <button
            onClick={() => handleRemoveChip(index)}
            className="ml-2 text-gray-500 hover:text-gray-700"
          >
            &times;
          </button>
        </Badge>
      ))}
    </div>
  );
};

export default ChipInput;
