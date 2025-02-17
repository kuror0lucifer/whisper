// import { GameCard } from './components/GameCard';
import { Header } from './components/Header';
import { GameList } from './modules/games/components/GameList';

function App() {
  return (
    <>
      <Header isAuth={false} />
      <GameList />
    </>
  );
}

export default App;
