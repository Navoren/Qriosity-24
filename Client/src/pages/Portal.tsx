import React, { useState, useEffect } from 'react';
import Navbar from '../common/components/Navbar';
import '../Styles/Home.css';
import '../Styles/portal.css';

const Portal = () => {
//   const [questionsData, setQuestionsData] = useState([]);
const questionsData = [
    {
        "QuestionNumber": 1,
        "QuestionStatement": "What is the capital of France?",
        "Answer": "Paris",
        "Hints": "It's known as the 'City of Love'",
    },
    {
        "QuestionNumber": 2,
        "QuestionStatement": "Who wrote 'Romeo and Juliet'?",
        "Answer": "William Shakespeare",
        "Hints": "He is often referred to as the 'Bard of Avon'",
    },
    {
        "QuestionNumber": 3,
        "QuestionStatement": "What is the largest planet in our solar system?",
        "Answer": "Jupiter",
        "Hints": "It's named after the king of the Roman gods",
    },
    {
        "QuestionNumber": 4,
        "QuestionStatement": "Which element has the chemical symbol 'H'?",
        "Answer": "Hydrogen",
        "Hints": "It is the lightest and most abundant element in the universe",
    },
    {
        "QuestionNumber": 5,
        "QuestionStatement": "In what year did the Titanic sink?",
        "Answer": "1912",
        "Hints": "It was a tragic event during the maiden voyage of the ship",
    },
    {
        "QuestionNumber": 6,
        "QuestionStatement": "What is the capital of Japan?",
        "Answer": "Tokyo",
        "Hints": "It is one of the most populous cities in the world",
    }
];
  let [currentQuestionIndex, setCurrentQuestionIndex] = useState(1);
  let [currentAnswerIndex, setCurrentAnswerIndex] = useState(0);
  let [questionTimerSeconds, setQuestionTimerSeconds] = useState(0);
  let [cooldownTimerSeconds, setCooldownTimerSeconds] = useState(30);
  let [cooldownFlag, setCooldownFlag] = useState(false);
  let [submitFlag, setSubmitFlag] = useState(false);
  const nextButton = document.getElementById('nextButton') as HTMLButtonElement;
  const submitButton = document.getElementById('submitButton') as HTMLButtonElement;
  const hintButton = document.getElementById('hintButton') as HTMLButtonElement;
  const commentBox = document.getElementById('commentBox');


  // Quiz Timer
  const [countdownSeconds, setCountdownSeconds] = useState(calculateRemainingTimeInSeconds());
  function calculateRemainingTimeInSeconds() {
    const targetDate = new Date('2024-01-15T12:00:00'); // Replace with your target date and time
    const currentTime = new Date();
    const timeDifference = targetDate.getTime() - currentTime.getTime();
    return Math.max(Math.floor(timeDifference / 1000), 0);
  }
  useEffect(() => {
    const countdownInterval = setInterval(() => {
      setCountdownSeconds((prevSeconds) => {
        if (prevSeconds > 0) {
          return prevSeconds - 1;
        } else {
          clearInterval(countdownInterval);
          if (commentBox) {
            commentBox.textContent = 'Countdown is over!';
          }
          return 0;
        }
      });
    }, 1000);
    return () => clearInterval(countdownInterval);
  }, []);


  // Display Questions Numbers
  const displayQuestionNumbers = (nextQuestionNumber: number) => {
    const questionNumbersContainer = document.querySelector('.displayQuestionNumbers');
    const firstQuestionNumber = 1;
  
    if (questionNumbersContainer) {
      if (nextQuestionNumber === 2) {
        const firstLiElement = document.createElement('li');
        firstLiElement.textContent = firstQuestionNumber.toString();
        const secondLiElement = document.createElement('li');
        secondLiElement.textContent = nextQuestionNumber.toString();
        questionNumbersContainer.appendChild(firstLiElement);
        questionNumbersContainer.appendChild(secondLiElement);
      } else if (nextQuestionNumber <= questionsData.length) {
        const liElement = document.createElement('li');
        liElement.textContent = nextQuestionNumber.toString();
        questionNumbersContainer.appendChild(liElement);
      } else if (nextQuestionNumber == questionsData.length+1) {
        const theLiElement = document.createElement('li');
        theLiElement.textContent = 'The'
        const endLiElement = document.createElement('li');
        endLiElement.textContent = 'End'
        questionNumbersContainer.appendChild(theLiElement);
        questionNumbersContainer.appendChild(endLiElement);
      }
    }
  };

  // Display Questions
  const displayQuestion = (question: any) => {
    setQuestionTimerSeconds(0);
    setCooldownTimerSeconds(30);    
    setCooldownFlag(false);
    setSubmitFlag(false);
    const questionHTML = `
      <div>
        <p>${question.QuestionNumber}. ${question.QuestionStatement}</p>
      </div>
    `;
    const questionsContainer = document.querySelector('.questions');
    if (questionsContainer) {
      questionsContainer.innerHTML = questionHTML;
    }
    const commentContainer = document.querySelector('#commentBox');
    if (commentContainer) {
      commentContainer.innerHTML = ``;
    }
    displayQuestionNumbers(question.QuestionNumber + 1);
  };

  const displayHint = () => {
    let hintData = 'Hint is still locked.';
    if ( questionsData[currentAnswerIndex].Hints ){
      hintData = questionsData[currentAnswerIndex].Hints.toString();
    } 
    if (commentBox) {
      commentBox.textContent = hintData;
    }
  }

  const checkAnswer = () => {
    const userAnswerInput = document.getElementById('userAnswer') as HTMLInputElement;
    if (userAnswerInput) {
      const userAnswer = userAnswerInput.value.toLowerCase();
      const correctAnswer = questionsData[currentAnswerIndex].Answer.toLowerCase();
      console.log(correctAnswer);
      if ( (userAnswer === correctAnswer) && (!submitFlag) ) {        
        setCurrentAnswerIndex((prevIndex) => (prevIndex + 1));
        setCooldownFlag(true);
        setSubmitFlag(true);
        submitButton.disabled = true;
        hintButton.disabled = true;
        if (commentBox) {
          commentBox.textContent = 'Correct answer.';
        } 
        if (nextButton) {
          nextButton.disabled = true;
          setTimeout(() => {
            if (nextButton) {
              nextButton.disabled = false;
            }
          }, 3000);         

        }
      }else {
        if (commentBox) {
          commentBox.textContent = 'Incorrect answer. Please try again.';
        }
      }
    }
  };

  const showNextQuestion = () => {
    setQuestionTimerSeconds(0);
    setSubmitFlag(false);
    submitButton.disabled = false;
    hintButton.disabled = false;
    if (submitFlag && currentQuestionIndex<questionsData.length) {
      cooldownFlag = false;
      setCurrentQuestionIndex((prevIndex) => (prevIndex + 1));
      displayQuestion(questionsData[currentQuestionIndex]);
      const userAnswerInput = document.getElementById('userAnswer') as HTMLInputElement;
      if (userAnswerInput) {
        userAnswerInput.value = '';
      }
    }else if (submitFlag && currentQuestionIndex==questionsData.length){
      if (commentBox) {
        commentBox.textContent = 'Completed all the questions.';
      }
    } else {
      if (commentBox) {
        commentBox.textContent = 'First attempt the question correctly then you are allowed to move further.';
      }
    }
  };

  const updateQuestionTimer = () => {
    if (!cooldownFlag){
      setQuestionTimerSeconds((prevSeconds) => prevSeconds + 1);
    }
    else if (cooldownFlag && cooldownTimerSeconds !== 0) {
      setCooldownTimerSeconds((prevCooldownSeconds) => prevCooldownSeconds - 1);
    }
  };

  useEffect(() => {
    const intervalId = setInterval(updateQuestionTimer, 1000);
    questionTimerSeconds = intervalId;

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [questionTimerSeconds, cooldownTimerSeconds, cooldownFlag]);

  return (
    <div className="portalContainer">
      <Navbar />
      <div className="quizContainer p-4">

        {/* Quiz Timer */}
        <div id="quizTimer" className="text-lg mb-4">
          {countdownSeconds > 0 ? (
            <>
              <p className="time">
                {Math.floor(countdownSeconds / 3600)}h : {Math.floor((countdownSeconds % 3600) / 60)}m : {countdownSeconds % 60}s
              </p>
              <p className="info"> Time remaining </p>
            </>
          ) : (
            <>
            <p className="time"> 00h : 00m : 00s </p>
            <p className="info"> Qriosity-2024 is over!!! </p>
            </>
          )}
        </div>

        {/* Question Div */}
        <div className="flex h-[1/2] flex-col sm:flex-row">
          <div className="questionNumber w-[350px] border border-gray-300 p-4 mb-4 rounded-xl">
            <h1 className='tracking-wider max-w-max mx-auto mb-4'> Question Numbers </h1>
            <ul className="displayQuestionNumbers grid grid-cols-4 gap-2">
              <li> 1 </li>
              <li> 2 </li>
            </ul>
          </div>
          <div className="questions-container flex-col mx-auto sm:w-[375px]">
            <div className='questionAnswer'>
            <div className="questions mb-4 h-[5rem] p-4 m-4 text-white">
              <p>{questionsData[0].QuestionNumber}. {questionsData[0].QuestionStatement}</p>
            </div>
            <input
              type="text"
              id="userAnswer"
              placeholder="Enter your answer"
              className="border p-2 mb-4 text-black mx-auto px-auto max-w-max-content"
            />
            </div>
            <div className='hintSubmitBlock p-2 mb-4 flex justify-between'>
              <button
                id="hintButton"
                onClick={displayHint}
                className="bg-blue-500 text-white px-4 py-2 mr-2 rounded"
              >
                Hint
              </button>
              <button
                id="submitButton"
                onClick={checkAnswer}
                className="bg-blue-500 text-white px-4 py-2 mr-2 rounded"
              >
                Submit
              </button>
            </div>
            <div id="questionTimer" className="mt-4 h-[3rem] text-nowrap ">
              {cooldownFlag ? (
                cooldownTimerSeconds > 0 ? (
                  `Please wait for the cooldown period (${cooldownTimerSeconds} seconds remaining)`
                ) : (
                  `You solved this question in: ${questionTimerSeconds} seconds`
                )
              ) : (
                `Time spent on current question: ${questionTimerSeconds} seconds`
              )}
            </div>
            <div id="commentBox" className='mt-4 px-4 h-[3rem] py-2 text-white text-nowrap'></div>
          </div>
        </div>

        {/* Next Button */}
        <div className='nextBlock p-2 mb-4 flex justify-center'>
          <button
            id="nextButton"
            onClick={showNextQuestion}
            className="bg-green-500 text-white px-4 py-2 rounded"
          >
            Next
          </button>
        </div>

      </div>
    </div>
  );
};

export default Portal;