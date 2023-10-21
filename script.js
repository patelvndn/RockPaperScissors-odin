console.log("Welcome to rock paper scissors");
const choices = ["Rock", "Paper", "Scissors"];

function computer_selection() {
  return Math.floor(Math.random() * 3);
}

function player_selection() {
  let selection = prompt("What is your choice?");
  selection = selection.toLowerCase();

  if (selection === "rock") {
    return 0;
  } else if (selection === "paper") {
    return 1;
  } else if (selection === "scissors") {
    return 2;
  }
  console.log(
    "You enetered something that isn't one of the choices, defaulting to rock"
  );
  return 0;
}

function get_winner(c, p) {
  // we  know cptr and plyr is different
  if (c == 0 && p == 2) {
    return "Computer";
  } else if (c == 0 && p == 1) {
    return "Player";
  } else if (c == 1 && p == 2) {
    return "Player";
  } else if (c == 1 && p == 0) {
    return "Computer";
  } else if (c == 2 && p == 1) {
    return "Computer";
  } else {
    return "Player";
  }
}

function round() {
  const cptr = computer_selection();
  cptr_choice = cptr === 0 ? "Rock" : cptr === 1 ? "Paper" : "Scissors";
  const plyr = player_selection();
  plyr_choice = plyr === 0 ? "Rock" : plyr === 1 ? "Paper" : "Scissors";

  if (cptr == plyr) {
    console.log(`It's a Tie, you both chose ${plyr_choice}`);
    return 0;
  } else {
    winner = get_winner(cptr, plyr);
    if (winner == "Computer") {
      console.log(`${winner} won! ${choices[cptr]} beats ${choices[plyr]}`);
      return 1;
    } else {
      console.log(`${winner} won! ${choices[plyr]} beats ${choices[cptr]}`);
      return 2;
    }
  }
}

function game() {
  let player_points = 0;
  let computer_points = 0;
  while (player_points < 5 && computer_points < 5) {
    let result = round();
    if (result == 1) {
      computer_points++;
    } else if (result == 2) {
      player_points++;
    }
    console.log(
      `Score:\nPlayer: ${player_points}\nComputer: ${computer_points}`
    );
  }
}

//game();
