type WelcomeProps = {
  startGame: () => void;
};

function Welcome({ startGame }: WelcomeProps) {
  return (
    <div>
      <h1>Welcome !</h1>
      <p>
        Welcome to the quizz ! You'll be asked a series of "Yes or No"
        questions. Answer as many as you can in the allowed time ! Good luck !
      </p>
      <button onClick={startGame}>Start the game !</button>
    </div>
  );
}

export default Welcome;
