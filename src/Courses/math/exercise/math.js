let response;
let text;
let solution;
async function fetchRandomQuestion() {
    response = await fetch('../../../Data/MATH/algebra.json');
    text = await response.text();
    console.log(text);
    const lines = text.trim().split('\n');
    const randomIndex = Math.floor(Math.random() * lines.length);
    const randomData = JSON.parse(lines[randomIndex]);
    const randomProblem = randomData.problem;
    solution = randomData.solution;

    const div = document.getElementById('mathQuestion');
    div.innerText = randomProblem;
};

document.getElementById('new-question-btn').addEventListener('click', fetchRandomQuestion);

async function fetchPredefinedSolution() {
    const solutionParts = solution.split('#### ');
    console.log(solutionParts[solutionParts.length - 1].trim())
    return solutionParts[solutionParts.length - 1].trim(); // Extracting the solution part after "#### "
}

document.getElementById('answer-form').addEventListener('submit', async function(e) {
    e.preventDefault();
    const predefinedSolution = await fetchPredefinedSolution();
    const userInput = document.getElementById('user-input').value;
    const resultDiv = document.getElementById('result');
    if (userInput === predefinedSolution) {
        resultDiv.innerText = "Correct!";
        resultDiv.style.color = "green";
    } else {
        resultDiv.innerText = "Incorrect. Try again.";
        resultDiv.style.color = "red";
    }
});

// Load a random question on initial page load
window.onload = fetchRandomQuestion;