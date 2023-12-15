'use strict';
document.addEventListener('DOMContentLoaded', function() {
    const btnOpenModal = document.querySelector('#btnOpenModal');
    const modalBlock = document.querySelector('#modalBlock');
    const closeModal = document.querySelector('#closeModal');
    const questionTitle = document.querySelector('#question');
    const formAnswers = document.querySelector('#formAnswers');

    btnOpenModal.addEventListener('click', () => {
        modalBlock.classList.add('d-block');
        playTest();
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

    const playTest = () => {
        const renderQuestions = ({ question, answers, type }) => {
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
        getData('questions.json').then(function(data){
            renderQuestions(data.questions[0]);
        });
    }
})