import { FC, useState } from "react";

import { Container } from "../../styledComponents/Container";
import { Flex } from "../../styledComponents/Flex";
import { Span } from "../../styledComponents/Span";
import { HeaderLogo } from "./HeaderLogo";
import { SearchInput } from "./SearchInput";
import { Link } from "../../styledComponents/Link";
import { SignUpButton } from "../Buttons/SignUpButton";
import { LogInButton } from "../Buttons/LogInButton";

import variables from "../../scss/styles.module.scss";
import { SignUpPopup } from "../Auth/SignUp/SignUpPopup";

export const Header: FC = () => {
  const [isSignUpOpen, setSignUpOpen] = useState<boolean>(false);

  const clickSignUp = () => {
    setSignUpOpen(true);
  };

  const closeSignUp = () => {
    setSignUpOpen(false);
  };

  return (
    <>
      <Container
        width="80%"
        height="50px"
        $bgColor={variables.orange}
        $borderRadius="0 0 25px 25px"
        $margin="0 auto"
      >
        <Flex
          $align="center"
          $justify="flex-start"
          height="100%"
          width="100%"
          $direction="row"
          $gap="10px"
        >
          <Link href="/" $decoration="none" color="black">
            <Flex
              $align="center"
              $justify="center"
              $gap="10px"
              $margin="0 0 0 10px"
            >
              <HeaderLogo />
              <Span $size="18px" $weight="400">
                WHISPER64
              </Span>
            </Flex>
          </Link>

          <SearchInput />
          <Flex
            $gap="10px"
            height="100%"
            $justify="center"
            $align="center"
            $margin="0 20px 0 0"
          >
            <LogInButton />
            <SignUpButton clickSignUp={clickSignUp} />
          </Flex>
        </Flex>
      </Container>
      {isSignUpOpen && <SignUpPopup closeSignUp={closeSignUp} />}
    </>
  );
};
