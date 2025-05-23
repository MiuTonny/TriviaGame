/**
 * Displays a welcome message and the number of loaded questions.
 *  Tracks the time taken to complete the quiz.
 *  Iterates through each trivia question, prompting the user for an answer.
 *  Gives immediate feedback on whether the answer was correct or incorrect.
 *  Updates the game state score based on user performance.
 *  Displays the final score and total time taken once all questions are answered.
 *  Prompts the user to play again, and if confirmed, restarts the game loop.
 * @param {object} gameState - The shared game state including score and current question.
 */

import inquirer from 'inquirer';
import chalk from 'chalk';

export async function showMainMenu(gameState) {
    console.log(chalk.bold("\n Trivia Main Menu"));

    const { action } = await inquirer.prompt([
        {
            type: "list",
            name: "action",
            message: "what would you like to do",
            choices: [
                "Start Quiz",
                "View Score",
                "Quit"
            ]
        }
    ]);

    switch ( action ) {
        case "Start Quiz":
        gameState.score = 0;
        await startTriviaGame(gameState);
        await showMainMenu(gameState);
        break;

        case "View Score":
            console.log(chalk.green(`\n Your current score: ${gameState.score}\n`));
            await showMainMenu(gameState);
            break;

        case "Quit":
            console.log(chalk.blue("\n Thanks for wasting your time!"));
            process.exit(0);    
    }
}

const questions = [ {
    question: "which Pokemon is basically a rock with arms and skipped leg day?",
    choices: ["Onix", "Butterfree", "Geodude"],
    answer: "Geodude"
},
{
     question: "Why did Psyduck bring an aspirin to battle?",
     choices: ["To bribe Nurse Joy", "Because he knew he'd get a headache again", "To throw it like a pokeball"],
     answer: "Because he knew he'd get a headache again"
},
{
    question:"Which pokemon is more likely to win a karaoke constest?",
    choices: ["Mr.Mime", "Jigglypuff", "Diglett"],
    answer: "Jigglypuff"
},
{
    question: "whats Pickachu's favorite type of workout?",
    choices: ["Crossfit", "thunderball", "Shock therapy"],
    answer: "Shock therapy"
},
{   
    question: "If Snorlax had a job, what would it be?",
    choices: ["Sleep study test subject", "Pillow salesman", "Professional mattress tester"],
    answer: "Professional mattress tester"
},
{
    question: "Which Pokémon could never survive in a glass house?",
    choices: ["Jigglypuff", "Butterfree", "Machop"],
    answer: "Machop"
},
{
    question: "7. What do you call it when a Magikarp tells an amazing story?",
    choices: [" A splashback", "A fish tale", "A gill spill"],
    answer: "A fish tale"
}, 
{
    question: "Which Pokémon would make the worst hairstylist?",
    choices: [" Alakazam", "Electrode", "Tangela"],
    answer: "Electrode"
},
{
    question: "Why don’t you play hide-and-seek with Haunter?",
    choices: ["He teleports too much", "Because he always ghosts you", " He never counts properly"],
    answer: "Because he always ghosts you"
},
{
    question: "What does a Gengar eat for breakfast?",
    choices: ["Ghost toast", "Spookloops", "Boo-berry cereal"],
    answer: "Boo-berry cereal"
}
]

export async function startTriviaGame(gameState) {
  console.log(chalk.cyan.bold("Welcome to the Trivia Game!"));

  const allQuestions = questions.map(q => q.question);
  console.log(chalk.gray(`\n ${allQuestions.length} questions loaded.`));

  const startTime = Date.now();

  for (const q of questions) {
    const { userAnswer } = await inquirer.prompt([{
        type: 'list',
        name: 'userAnswer',
        message: q.question,
        choices: q.choices
    }
   ]);

   if (userAnswer === q.answer) {
    console.log(chalk.green("Correct!\n"));
    gameState.score++;
   } else {
    console.log(chalk.red(`Wrong! Dumb ass The correct answer was: ${q.answer}\n`));
   }
  }

   const endTime = Date.now();
   const totalTime = ((endTime - startTime) / 1000).toFixed(1);

  console.log(chalk.yellowBright(`Game Over! You scored ${gameState.score} out of ${questions.length}.\n`))
  console.log(chalk.magenta(`Time taken: ${totalTime} seconds\n`));

  const { playAgain } = await inquirer.prompt([
    {
        type: "confirm",
        name: "playAgain",
        message: "Would you like to play again?",
        default: false
    }
  ]);

  if (playAgain) {
    gameState.score = 0;
    await startTriviaGame(gameState);
  }
}
