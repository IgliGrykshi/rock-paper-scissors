import { useEffect, useState } from 'react';
import './App.css';

function App() {

  const allChoices = ["Rock", "Paper", "Scissors"];
  const [userChoice, setUserChoice] = useState('');
  const [computerChoice, setComputerChoice] = useState(''); 
  const [gameState, setGameState] = useState('');
  const [newGame, setNewGame] = useState(true);

  const handleClick = (clickedItem) => {
    setUserChoice(clickedItem);
    const newComputerChoice = allChoices[generateRandomNumber()];
    setComputerChoice(newComputerChoice);
  }

  useEffect(() => {
    // first if handles component mount and when resetting game
    if(computerChoice !== "") {
      if(userChoice === computerChoice) {
        setGameState("Drew");
      }
      else if(userChoice === "Rock") {
        if(computerChoice === "Paper") {
          setGameState("Lost");
        }
        else if(computerChoice === "Scissors") {
          setGameState("Won");
        }
      }
      else if(userChoice === "Paper") {
        if(computerChoice === "Rock") {
          setGameState("Won");
        }
        else if(computerChoice === "Scissors") {
          setGameState("Lost");
        }
      }
      else if(userChoice === "Scissors") {
        if(computerChoice === "Paper") {
          setGameState("Won");
        }
        else if(computerChoice === "Rock") {
          setGameState("Lost");
        }
      }
      setNewGame(false); // Switch to result view
    }
  }, [computerChoice])

  const generateRandomNumber = () => {
    // I've set it to generate random numbers from 0-2(inclusive) since we only have 3 choices in our exercise
    return [Math.floor(Math.random() * 3)]
  }

  const setupNewGame = () => {
    setNewGame(true);
    setUserChoice('');
    setComputerChoice('');
  }

  return (
    <div className="App">
      <div className="Title">Rock paper scissors</div>
      {newGame ? 
        <>
          <div>Choose your weapon: </div>
          <div className="RpsContainer">
            {allChoices.map(choice => <div className="RpsBackground" onClick={() => handleClick(choice)}>{choice}</div>)}
          </div>
        </>
        :
        <>
          <div className="RpsResult">You <span className={`RpsDraw ${gameState === "Won" ? "RpsWin" : ""} ${gameState === "Lost" ? "RpsLose" : ""}`}>{gameState}</span></div>
          <div className="RpsPicks">
            <div>You picked: <span className="RpsPick">{userChoice}</span></div>
            <div>Computer picked: <span className="RpsPick">{computerChoice}</span></div>
          </div>
          <button className="RpsReset" onClick={() => setupNewGame()}>Reset game</button>
        </>
      }
    </div>
  );
}

export default App;
