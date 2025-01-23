import { ChangeEvent, FC } from "react";

import { Input } from "../../../styledComponents/Input";

interface Field {
  id: string;
  type: string;
  placeholder: string;
}

export const SignUpInput: FC = () => {
  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
  };

  const fields: Field[] = [
    { id: "email", type: "email", placeholder: "Email" },
    { id: "password", type: "password", placeholder: "Password" },
    {
      id: "confirmPassword",
      type: "password",
      placeholder: "Confirm password",
    },
  ];

  return (
    <>
      {fields.map((field) => (
        <Input
          key={field.id}
          type={field.type}
          placeholder={field.placeholder}
          width="70%"
          height="50px"
          $padding="0 0 0 10px"
          $backgroundColor="white"
          onChange={handleInputChange}
        />
      ))}
    </>
  );
};
