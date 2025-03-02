import { FC, useState } from 'react';

interface TextAreaProps {
  label: string;
  textAreaContent?: string;
  onChange: (value: string) => void;
  onBlur: (event: React.FocusEvent<HTMLTextAreaElement>) => void;
}

export const TextArea: FC<TextAreaProps> = ({
  label,
  textAreaContent = '',
  onChange,
  onBlur,
}) => {
  const [value, setValue] = useState(textAreaContent);

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValue(event.target.value);
    if (onChange) {
      onChange(event.target.value);
    }
  };

  return (
    <div className='w-full h-fit flex flex-col items-center'>
      <label className='text-xl'>{label}</label>
      <textarea
        className='w-1/2 h-15 p-2 rounded-md bg-pink-50 mt-3 resize-none'
        autoComplete='off'
        placeholder='Tell about your favourite games'
        value={value}
        onChange={handleChange}
        onBlur={onBlur}
      />
    </div>
  );
};
