import { FC, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

import { Input } from "../../../styledComponents/Input";
import { Button } from "../../../styledComponents/Button";
import { Span } from "../../../styledComponents/Span";

import axios, { AxiosError } from "axios";
import { Flex } from "../../../styledComponents/Flex";
import { Form } from "../../../styledComponents/Form";

interface Field {
  id: "email" | "password";
  type: string;
  placeholder: string;
}

type ValueType = {
  email: string;
  password: string;
};

export const LogInInputs: FC = () => {
  const [error, setError] = useState<string | null>(null);

  const { register, handleSubmit } = useForm<ValueType>();

  const onSubmit: SubmitHandler<ValueType> = async (data) => {
    const { email, password } = data;

    try {
      const response = await axios.post("http://localhost:3000/users/login", {
        email,
        password,
      });
      localStorage.setItem("auth_token", response.data.token);
      setError(null);
      window.location.reload();
    } catch (err) {
      const error = err as AxiosError<{ error: string }>;
      setError(error.response?.data?.error || "Login failed");
    }
  };

  const fields: Field[] = [
    { id: "email", type: "email", placeholder: "Email" },
    { id: "password", type: "password", placeholder: "Password" },
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
      <Form
        width="100%"
        $direction="column"
        $justify="flex-start"
        $gap="15px"
        $align="center"
        onSubmit={handleSubmit(onSubmit)}
      >
        {fields.map((field) => (
          <Input
            key={field.id}
            {...register(field.id, {
              required: `${field.placeholder} is required`,
            })}
            name={field.id}
            type={field.type}
            placeholder={field.placeholder}
            width="70%"
            height="50px"
            $padding="0 0 0 10px"
            $backgroundColor="white"
            $borderRadius="15px"
            color="black"
          />
        ))}

        <Button
          type="submit"
          width="40%"
          height="40px"
          $backgroundColor="red"
          $borderRadius="25px"
          color="white"
          cursor="pointer"
        >
          Confirm
        </Button>
      </Form>
      {error && <Span color="tomato">{error}</Span>}
    </Flex>
  );
};
