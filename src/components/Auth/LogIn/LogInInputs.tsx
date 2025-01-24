import { ChangeEvent, FC, useState } from "react";
import { Input } from "../../../styledComponents/Input";

interface Field {
  id: string;
  type: string;
  placeholder: string;
}

type ValueType = {
  email: string;
  password: string;
};

export const LogInInputs: FC = () => {
  const [value, setValue] = useState<ValueType>({
    email: "",
    password: "",
  });

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value: inputValue } = event.target;
    setValue((prev) => ({
      ...prev,
      [name]: inputValue,
    }));
  };

  const fields: Field[] = [
    { id: "email", type: "email", placeholder: "Email" },
    { id: "password", type: "password", placeholder: "Password" },
  ];

  return (
    <>
      {fields.map((field) => (
        <Input
          key={field.id}
          name={field.id}
          value={value[field.id as keyof ValueType]}
          type={field.type}
          placeholder={field.placeholder}
          width="70%"
          height="50px"
          $padding="0 0 0 10px"
          $backgroundColor="white"
          $borderRadius="15px"
          onChange={handleInputChange}
        />
      ))}
    </>
  );
};
