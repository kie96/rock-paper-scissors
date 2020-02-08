// Mask of Player Choices
let rpsCombos = {
    P1_ROCK     : 0,
    P1_PAPER    : 1,
    P1_SCISSORS : 2,
    P2_ROCK     : 4,
    P2_PAPER    : 8,
    P2_SCISSORS : 16
}

// Generates a random number from 0 to range
function randomNumber(range) {
    return Math.floor(Math.random() * range);
}

// Prompts the Player to select a hand (rock, paper, or scissors)
function playerHand() {
    let playerSelection = prompt("Please choose: Rock, Papaer, Scissors, or Random\n");
    playerSelection = playerSelection.toLowerCase();
    let invalidInput = true;

    // if the input is invalid, re-prompt the user and loop back to check the selection
    while (invalidInput) {
        switch(playerSelection) {
            case "rock":
                invalidInput = false;
                return rpsCombos.P1_ROCK;
                break;
            case "paper":
                invalidInput = false;
                return rpsCombos.P1_PAPER;
                break;
            case "scissors":
                invalidInput = false;
                return rpsCombos.P1_SCISSORS;
                break;
            case "random":
                invalidInput = false;
                return randomHand(true);
                break;
            default: 
                console.log("Invalid Input!\n");
                playerSelection = prompt("Please choose again: Rock, Papaer, Scissors, or Random\n");
                playerSelection = playerSelection.toLowerCase();
                break;
        }
    }
}

// Generate a random hand selection (rock, paper, or scissors)
function randomHand(isPlayer) {
    let hand = randomNumber(3);
    // If a player called randomHand() use the Player Masks
    if (isPlayer) {
        switch(hand) {
            case 0:
                return rpsCombos.P1_ROCK;
                break;
            case 1:
                return rpsCombos.P1_PAPER;
                break;
            case 2:
                return rpsCombos.P1_SCISSORS;
                break;
            default:
                return undefined;
                break;
        }
    }
    // If the cpu called randomHand() use the Player Masks
    else {
        switch(hand) {
            case 0:
                return rpsCombos.P2_ROCK;
                break;
            case 1:
                return rpsCombos.P2_PAPER;
                break;
            case 2:
                return rpsCombos.P2_SCISSORS;
                break;
            default:
                return undefined;
                break;
        }
    }
}

// Play one round of Rock, Paper, and Scissors against a computer opponent
function rpsRound(playerHand) {
    let player = playerHand;
    let cpu = randomHand(false);
    let outcome = player | cpu;

    switch(outcome) {
        case 4: // P: ROCK | C: ROCK
            console.log("Player: ROCK vs. CPU: ROCK - TIE, No Point\n")
            gameMessage = "Two rocks, that's a tie!";
            return "TIE";
            break;
        case 5: // P: PAPER | C: ROCK
            console.log("Player: PAPER vs. CPU: ROCK - Point for Player\n")
            gameMessage = "Paper beats rock, Player wins this round!";
            return "Player";
            break;
        case 6: // P: SCISSORS | C: ROCK
            console.log("Player: SCISSORS vs. CPU: ROCK - Point for CPU\n")
            gameMessage = "Scissors loses to rock, CPU wins this round!";
            return "CPU";
            break;
        case 8: // P: ROCK | C: PAPER
            console.log("Player: ROCK vs. CPU: PAPER - Point for CPU\n")
            gameMessage = "Rock loses to paper, CPU wins this round!";
            return "CPU";
            break;
        case 9: // P: PAPER | C: PAPER
            console.log("Player: PAPER vs. CPU: PAPER - TIE, No Point\n")
            gameMessage = "Two papers, that's a tie!";
            return "TIE";
            break;
        case 10: // P: SCISSORS | C: PAPER
            console.log("Player: SCISSORS vs. CPU: PAPER - Point for Player\n")
            gameMessage = "Scissors beats paper, Player wins this round!";
            return "Player";
            break;
        case 16: // P: ROCK | C: SCISSORS
            console.log("Player: ROCK vs. CPU: SCISSORS - Point for Player\n")
            gameMessage = "Rock beats scissors, Player wins this round!";
            return "Player";
            break;
        case 17: // P: PAPER | C: SCISSORS
            console.log("Player: PAPER vs. CPU: SCISSORS - Point for CPU\n")
            gameMessage = "Paper loses to scissors, CPU wins this round!";
            return "CPU";
            break;
        case 18: // P: SCISSORS | C: SCISSORS
            console.log("Player: SCISSORS vs. CPU: SCISSORS - TIE, No Point\n")
            gameMessage = "Two scissors, that's a tie!";
            return "TIE";
            break;
        default:
            console.log("Error: Player or CPU Selection was invalid!\n")
            return undefined;
            break;
    }
}

// Reset the Round and both Scores
function newGame(e) {
    playerScore = 0;
    cpuScore = 0;
    roundNum = 1;
    gameOver = false;

    standings.textContent = "New Game!";
    playerDiv.textContent = "Player Score: " + playerScore;
    cpuDiv.textContent = "CPU Score: " + cpuScore;

}

// Translate the button seleced to rock, paper, or scissors then start round
function selectAndPlay(e) {
    if(!gameOver) {
        let playerSelection = 0;

        if (e.id == "rock_button") {
            playerSelection = rpsCombos.P1_ROCK;
        }
        if (e.id == "paper_button") {
            playerSelection = rpsCombos.P1_PAPER;
        }
        if (e.id == "scissors_button") {
            playerSelection = rpsCombos.P1_SCISSORS;
        }

        let result = rpsRound(playerSelection);

        if (result == "Player") {
            playerScore++;
        }
        else if (result == "CPU") {
            cpuScore++;
        }

        if (playerScore < 5 && cpuScore < 5) {
            standings.textContent = "Round: " + roundNum + ": " + gameMessage;
            playerDiv.textContent = "Player Score: " + playerScore;
            cpuDiv.textContent = "CPU Score: " + cpuScore;
            roundNum++;
        }
         else if (playerScore == 5 || cpuScore == 5) {
            gameOver = true;
            if (playerScore == 5) {
                standings.textContent = "Round " + roundNum + ": Player Wins!";
                playerDiv.textContent = "Player Score: " + playerScore;
                cpuDiv.textContent = "CPU Score: " + cpuScore;
            }
            else {
                standings.textContent = "Round " + roundNum + ": CPU Wins!";
                playerDiv.textContent = "Player Score: " + playerScore;
                cpuDiv.textContent = "CPU Score: " + cpuScore;
            }
        }
    }
}

// global variables
let playerScore = 0;
let cpuScore = 0;
let roundNum = 1;
let gameOver = false;
let gameMessage = "";

// Query and style all of the nodes on the document.

const body = document.querySelector("body");
body.style.backgroundColor = "#d3d3d3"

const heading = document.querySelector("#heading");
heading.style.textAlign = "center"

const rock_b = document.querySelector("#rock_button");
const paper_b = document.querySelector("#paper_button");
const scissors_b = document.querySelector("#scissors_button");
const game_b = document.querySelector("#game_button");
game_b.style.margin = "20px 10px 40px 20px";
game_b.style.textAlign = "center";
game_b.style.fontSize = "20px";
game_b.style.width = "200px";
game_b.style.height = "40px";

const newGameDiv = document.querySelector("#newGameDiv");
newGameDiv.style.textAlign = "center";

const buttonDiv = document.querySelector("#buttonDiv");
buttonDiv.style.textAlign = "center";

// querySelectorAll will return a nodelist
const buttons = document.querySelectorAll('.play_button');

// we use the .forEach method to iterate through each button
buttons.forEach((button) => {
    button.style.fontSize = "20px";
    button.style.margin = "20px 20px 20px 20px";
    button.style.width = "100px";
    button.style.height = "100px";
    //button.style.textAlign = "center";
    button.style.verticalAlign = "center";

});

const scoreBoard = document.querySelector("#scoreBoard");
scoreBoard.style.textAlign = "center";

const standings = document.querySelector("#standings");
standings.style.display = "block";

const playerDiv = document.querySelector("#playerDiv");
standings.style.display = "block";
const cpuDiv = document.querySelector("#cpuDiv");

// Add event listeners for each button
rock_b.addEventListener("click", selectAndPlay);
paper_b.addEventListener("click", selectAndPlay);
scissors_b.addEventListener("click", selectAndPlay);
game_b.addEventListener("click", newGame);
