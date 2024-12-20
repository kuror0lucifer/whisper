import styled from "styled-components";
import { GameCard } from "./components/GameCard/GameCard";
import { Header } from "./components/Header/Header";

const AppWrapper = styled.div`
  width: 100%;
  height: 100%;
`;

function App() {
  return (
    <AppWrapper>
      <Header />
      <GameCard />
    </AppWrapper>
  );
}

export default App;
