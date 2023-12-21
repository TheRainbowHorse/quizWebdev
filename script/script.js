'use strict';
document.addEventListener('DOMContentLoaded', function() {
    const btnOpenModal = document.querySelector('#btnOpenModal');
    const modalBlock = document.querySelector('#modalBlock');
    const closeModal = document.querySelector('#closeModal');
    const questionTitle = document.querySelector('#question');
    const formAnswers = document.querySelector('#formAnswers');
    const btnPrev = document.querySelector('#prev');
    const btnNext = document.querySelector('#next');

    btnOpenModal.addEventListener('click', () => {
        modalBlock.classList.add('d-block');
        getData('questions.json').then(function(data){
            playTest(data.questions);
        });
    })

    closeModal.addEventListener('click', () => {
        modalBlock.classList.remove('d-block');
    })

    const getData = async function(url) {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`Ошибка ${response.status} по адресу ${url}`);
        }

        return await response.json();
    }

    const playTest = (questions) => {
        let questionNumber = 0;

        const renderQuestion = ({ question, answers, type }) => {
            questionTitle.textContent = question;

            formAnswers.innerHTML = '';
            answers.forEach((answer, index) => {
                formAnswers.innerHTML += `
                    <div class="answers-item d-flex flex-column">
                        <input type="${type}" id="answerItem${index + 1}" name="answer" class="d-none">
                        <label for="answerItem${index + 1}" class="d-flex flex-column justify-content-between">
                            <img class="answerImg" src="${answer.url}" alt="burger">
                            <span>${answer.title}</span>
                        </label>
                    </div>
                `;
            });
        }
        renderQuestion(questions[questionNumber]);

        btnNext.addEventListener('click', () => {
            questionNumber++;
            renderQuestion(questions[questionNumber]);
            renderControlBtns();
        });

        btnPrev.addEventListener('click', () => {
            questionNumber--;
            renderQuestion(questions[questionNumber]);
            renderControlBtns();
        });

        const renderControlBtns = () => {
            if (questionNumber == 0) {
                btnPrev.classList.add('hide');
                btnNext.classList.remove('hide');
            }
            else if (questionNumber == questions.length - 1) {
                btnNext.classList.add('hide');
                btnPrev.classList.remove('hide');
            }
            else {
                btnPrev.classList.remove('hide');
                btnNext.classList.remove('hide');
            }

        }
        renderControlBtns();
    }
})