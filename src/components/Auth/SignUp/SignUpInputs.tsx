import { ChangeEvent, FC, useState } from "react";

import { Input } from "../../../styledComponents/Input";
import axios, { AxiosError } from "axios";
import { Button } from "../../../styledComponents/Button";
import { Span } from "../../../styledComponents/Span";
import { Flex } from "../../../styledComponents/Flex";

interface Field {
  id: string;
  type: string;
  placeholder: string;
}

type ValueType = {
  email: string;
  password: string;
  confirmPassword: string;
};

export const SignUpInputs: FC = () => {
  const [value, setValue] = useState<ValueType>({
    email: "",
    password: "",
    confirmPassword: "",
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
    const { email, password, confirmPassword } = value;

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:3000/users/registration",
        { email, password }
      );

      setError(null);
      console.log(response.data);
    } catch (error) {
      const err = error as AxiosError<{ error: string }>;
      setError(err.response?.data?.error || "Registration failed");
    }
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
    <Flex
      $justify="flex-start"
      $align="center"
      $direction="column"
      width="100%"
      height="fit-content"
      $gap="15px"
    >
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
    </Flex>
  );
};
