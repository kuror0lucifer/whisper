import { ChangeEvent, FC, useState } from "react";

import { Input } from "../../../styledComponents/Input";
import { Button } from "../../../styledComponents/Button";
import { Span } from "../../../styledComponents/Span";

import axios, { AxiosError } from "axios";

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
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value: inputValue } = event.target;
    setValue((prev) => ({
      ...prev,
      [name]: inputValue,
    }));
  };

  const handleSubmit = async () => {
    const { email, password } = value;

    try {
      const response = await axios.post("http://localhost:3000/api/login", {
        email,
        password,
      });
      localStorage.setItem("auth_token", response.data.token);
      setError(null);
      window.location.reload();
    } catch (error) {
      const err = error as AxiosError<{ error: string }>;
      setError(err.response?.data?.error || "Login failed");
    }
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
      <Button
        type="button"
        width="40%"
        height="40px"
        $backgroundColor="red"
        $borderRadius="25px"
        color="white"
        cursor="pointer"
        onClick={handleSubmit}
      >
        Confirm
      </Button>
      {error && <Span>{error}</Span>}
    </>
  );
};
