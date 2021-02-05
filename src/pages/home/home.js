import React from "react";
import { useHistory } from "react-router-dom";
import styles from './home.module.css';
import titleImage from "../../images/X0_Red.png";
import example from "../../images/Example.png";


export function Home() {
  const history = useHistory();
  const goToLogin = () => {
    history.push("/login");
  };
  const goToRegister = () => {
    history.push("/register");
  };
  return (
    <>
      <h1>Tic-tac-toe</h1>
      <img src={titleImage} className={styles.topImg} alt="topImg"></img>

      <h2>Gameplay</h2>
      <p>In order to win the game, a player must place three of their marks in a horizontal, vertical, or diagonal row. The following example game is won by the first player, X:</p>
      <img src={example} className={styles.example} alt="example"></img>
      <p>Players soon discover that the best play from both parties leads to a draw. Hence, tic-tac-toe is most often played by young children, who often have not yet discovered the optimal strategy.</p>
      <p>Because of the simplicity of tic-tac-toe, it is often used as a pedagogical tool for teaching the concepts of good sportsmanship and the branch of artificial intelligence that deals with the searching of game trees. It is straightforward to write a computer program to play tic-tac-toe perfectly or to enumerate the 765 essentially different positions (the state space complexity) or the 26,830 possible games up to rotations and reflections (the game tree complexity) on this space. If played optimally by both players, the game always ends in a draw, making tic-tac-toe a futile game.</p>
      
      <h3>Login or register in order to start playing</h3>
      <div className={styles.flexBox}>
        <button className="btn btn-dark" onClick={goToLogin}>
            Login
        </button>
        <button className="btn btn-dark"  onClick={goToRegister}>
            Register
        </button>
      </div>
    </>
  );
}