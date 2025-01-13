// script.js

const questions = [
    {
      question: "What is the capital of France?",
      options: ["Berlin", "Madrid", "Paris", "Rome"],
      answer: 2,
    },
    {
      question: "What is 2 + 2?",
      options: ["3", "4", "5", "6"],
      answer: 1,
    },
    {
      question: "Who developed JavaScript?",
      options: ["Brendan Eich", "Mark Zuckerberg", "James Gosling", "Dennis Ritchie"],
      answer: 0,
    },
    {
      question: "Which planet is known as the Red Planet?",
      options: ["Earth", "Mars", "Venus", "Jupiter"],
      answer: 1,
    },
  ];
  
  let currentQuestionIndex = 0;
  let userAnswers = [];
  
  function loadQuestion() {
    const questionContainer = document.getElementById("question-container");
    const question = questions[currentQuestionIndex];
  
    questionContainer.innerHTML = `
      <p><strong>${question.question}</strong></p>
      <div>
        ${question.options
          .map(
            (option, index) => `
              <label>
                <input type="radio" name="option" value="${index}" />
                ${option}
              </label>
            `
          )
          .join("<br>")}
    `;
  
    // Enable Next button only when an option is selected
    const nextBtn = document.getElementById("next-btn");
    nextBtn.disabled = true;
  
    document.querySelectorAll('input[name="option"]').forEach((input) => {
      input.addEventListener("change", () => {
        nextBtn.disabled = false;
      });
    });
  }
  
  function nextQuestion() {
    // Save the selected answer
    const selectedOption = document.querySelector('input[name="option"]:checked');
    if (selectedOption) {
      userAnswers[currentQuestionIndex] = parseInt(selectedOption.value);
    }
  
    // Move to the next question
    currentQuestionIndex++;
  
    if (currentQuestionIndex < questions.length) {
      loadQuestion();
    } else {
      showResults();
    }
  }
  
  function submitQuiz() {
    // Save the last answer if any
    const selectedOption = document.querySelector('input[name="option"]:checked');
    if (selectedOption) {
      userAnswers[currentQuestionIndex] = parseInt(selectedOption.value);
    }
    showResults();
  }
  
  function showResults() {
    const resultContainer = document.getElementById("result");
    const correctAnswers = userAnswers.filter((answer, index) => answer === questions[index].answer).length;
    const score = (correctAnswers / questions.length) * 100;
  
    resultContainer.innerHTML = `
      <h2>Your Results</h2>
      <p>You got ${correctAnswers} out of ${questions.length} questions correct.</p>
      <p>Your score: ${score}%</p>
    `;
  
    // Hide the quiz container and show results
    document.querySelector(".quiz-box").style.display = "none";
    document.getElementById("buttons-container").style.display = "none";
  }
  
  // Initial load
  loadQuestion();
  