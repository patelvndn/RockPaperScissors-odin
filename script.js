const choices = ["Rock Throw", "Paper Cut", "Scissors Slash", "Swords Dance"];

const rock = document.querySelector(".rock");
const paper = document.querySelector(".paper");
const scissor = document.querySelector(".scissor");
const sword = document.querySelector(".sword");
const reset = document.querySelector(".reset");
const healthBarUser = document.querySelector(".p-health");
const healthBarComp = document.querySelector(".g-health");
const desc = document.querySelector(".console");

desc.innerText = "Select a move...";

let userChoice = null;
let compChoice = null;
let usrAtk = 1;
let cmpAtk = 1;
let critical = false;
let userHealth = 9;
let compHealth = 9;

function computer_selection() {
  return Math.floor(Math.random() * 4);
}
function get_critical() {
  if (0 == Math.floor(Math.random() * 5)) {
    return 2;
  }
  return 1;
}
function resetData() {
  usrAtk = 1;
  cmpAtk = 1;
  critical = false;
  userHealth = 9;
  compHealth = 9;
  reset.style.display = "none";
  healthBarComp.setAttribute("src", `images/health/health (0).png`);
  healthBarUser.setAttribute("src", `images/health/health (0).png`);
  desc.innerText = "Select a move...";
}

healthBarUser.addEventListener("mouseover", showTooltip);
healthBarUser.addEventListener("mouseout", hideTooltip);

healthBarComp.addEventListener("mouseover", showTooltipG);
healthBarComp.addEventListener("mouseout", hideTooltipG);

function showTooltipG() {
  const tooltip = document.querySelector(".health-display-g");
  tooltip.innerText = `${compHealth}`;
  tooltip.style.display = "block";
}

function hideTooltipG() {
  const tooltip = document.querySelector(".health-display-g");
  tooltip.style.display = "none";
}

function showTooltip() {
  const tooltip = document.querySelector(".health-display-p");
  tooltip.innerText = `${userHealth}`;
  tooltip.style.display = "block";
}
function hideTooltip() {
  const tooltip = document.querySelector(".health-display-p");
  tooltip.style.display = "none";
}
rock.addEventListener("click", () => round(0));

paper.addEventListener("click", () => round(1));

scissor.addEventListener("click", () => round(2));

sword.addEventListener("click", () => round(3));

reset.addEventListener("click", () => resetData());

// we know
function get_winner(a, b) {
  if (a === 3) {
    cmpAtk++;
    return "Patrat";
  } else if (b === 3) {
    usrAtk++;
    return "Giratina";
  } else {
    // Simulate the winner based on the rules of rock-paper-scissors
    // 0 stands for rock, 1 stands for paper, and 2 stands for scissors
    if ((a === 0 && b === 2) || (a === 1 && b === 0) || (a === 2 && b === 1)) {
      return "Giratina"; // Player A wins
    } else {
      return "Patrat"; // Player B wins
    }
  }
}

function round(plyr) {
  let prompt = "";
  compChoice = computer_selection();
  userChoice = plyr;
  let dmg = 1;
  desc.innerText = `G: ${choices[compChoice]} vs  P: ${choices[userChoice]}`;
  if (userChoice == 3 && compChoice == 3) {
    // Both players use swords dance
    usrAtk++;
    cmpAtk++;
    desc.innerText = `Giratina and Patrat both chose ${choices[3]}! Their attack increased!`;
    return 0;
  } else if (userChoice == compChoice) {
    desc.innerText = `Giratina and Patrat both chose ${choices[userChoice]}! The attacks cancel out...`;
    return 1;
  }

  winner = get_winner(compChoice, userChoice);
  if (winner == "Giratina") {
    let crit = get_critical();
    dmg = cmpAtk * crit;

    if (crit == 2) {
      prompt += "Giratina landed a Critical hit! ";
    }
    prompt += `Giratina used ${choices[compChoice]} which counters Patrat's ${choices[userChoice]}! Dealt ${dmg} damage...`;

    userHealth -= dmg;
    if (userHealth < 0) {
      healthBarUser.setAttribute("src", `images/health/health (${9}).png`);
    } else {
      healthBarUser.setAttribute(
        "src",
        `images/health/health (${9 - userHealth}).png`
      );
    }
  } else {
    let crit = get_critical();
    dmg = usrAtk * crit;
    if (crit == 2) {
      prompt += "Patrat landed a Critical hit! ";
    }
    prompt += `Patrat used ${choices[userChoice]} which counters Giratina's ${choices[compChoice]}! Dealt ${dmg} damage...`;

    compHealth -= dmg;
    if (compHealth < 0) {
      healthBarComp.setAttribute("src", `images/health/health (${9}).png`);
    } else {
      healthBarComp.setAttribute(
        "src",
        `images/health/health (${9 - compHealth}).png`
      );
    }
  }
  desc.innerText = prompt;
  if (userHealth <= 0 || compHealth <= 0) {
    if (userHealth <= 0) {
      desc.innerText = "Giratina wins..., Play again?";
    } else if (compHealth <= 0) {
      desc.innerText = "Patrat wins!! Play again?";
    }
    reset.style.display = "block";
  }
}
