import "./Welcome.scss"

type WelcomeProps = {
  startGame: () => void;
};

function Welcome({ startGame }: WelcomeProps) {
  return (
    <div className="welcome__wrapper">
      <h1>Welcome !</h1>
      <p>
        Welcome to the quizz ! You'll be asked a series of "Yes or No"
        questions. 
        <br/>
        Answer as many as you can in the allowed time ! Good luck !
      </p>
      <button className="floating welcome__button" onClick={startGame}>Start the game !</button>
    </div>
  );
}

export default Welcome;
