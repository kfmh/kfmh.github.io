
let response
let text
let answer
async function fetchRandomQuestion() {
    response = await fetch('../../../Data/grade_school_math/test.jsonl');
    text = await response.text();
    const lines = text.trim().split('\n');
    const randomIndex = Math.floor(Math.random() * lines.length);
    const randomQuestion = JSON.parse(lines[randomIndex]).question;
    answer = JSON.parse(lines[randomIndex]).answer;

    const div = document.getElementById('mathQuestion');
    div.innerText = randomQuestion;
};

document.getElementById('new-question-btn').addEventListener('click', fetchRandomQuestion);

async function fetchPredefinedAnswer() {
    const answerParts = answer.split('#### ');
    console.log(answerParts[answerParts.length - 1].trim())
    return answerParts[answerParts.length - 1].trim();  // Extracting the answer part after "#### "
}

document.getElementById('answer-form').addEventListener('submit', async function(e) {
    e.preventDefault();
    const predefinedAnswer = await fetchPredefinedAnswer();
    const userInput = document.getElementById('user-input').value;
    const resultDiv = document.getElementById('result');
    if (userInput === predefinedAnswer) {
        resultDiv.innerText = "Correct!";
        resultDiv.style.color = "green";
    } else {
        resultDiv.innerText = "Incorrect. Try again.";
        resultDiv.style.color = "red";
    }
});
// Load a random question on initial page load
window.onload = fetchRandomQuestion;
