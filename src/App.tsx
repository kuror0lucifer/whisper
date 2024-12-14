import styled from "styled-components";
import { GameCard } from "./components/GameCard/GameCard";

const AppWrapper = styled.div`
  width: 100%;
  height: 100%;
`;

function App() {
  return (
    <AppWrapper>
      <GameCard />
    </AppWrapper>
  );
}

export default App;
