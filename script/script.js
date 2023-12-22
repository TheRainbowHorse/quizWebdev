'use strict';
document.addEventListener('DOMContentLoaded', function() {
    const btnOpenModal = document.querySelector('#btnOpenModal');
    const modalBlock = document.querySelector('#modalBlock');
    const closeModal = document.querySelector('#closeModal');
    const questionTitle = document.querySelector('#question');
    const formAnswers = document.querySelector('#formAnswers');
    const btnPrev = document.querySelector('#prev');
    const btnNext = document.querySelector('#next');
    const btnSend = document.querySelector('#send');

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
        const userAnswers = [];
        let questionNumber = 0;

        const renderQuestion = ({ question, answers, type }) => {
            questionTitle.textContent = question;

            formAnswers.innerHTML = '';
            answers.forEach((answer, index) => {
                formAnswers.innerHTML += `
                    <div class="answers-item d-flex justify-content-center">
                        <input type="${type}" id="answerItem${index + 1}" name="answer" class="d-none" value="${answer.title}">
                        <label for="answerItem${index + 1}" class="d-flex flex-column justify-content-between">
                            <img class="answerImg" src="${answer.url}" alt="burger">
                            <span>${answer.title}</span>
                        </label>
                    </div>
                `;
            });
        }
        renderQuestion(questions[questionNumber]);

        const checkAnswer = () => {
            const obj = {};
            const inputs = [...formAnswers.elements].filter((input) => input.checked || input.id == 'phoneNumber');
            inputs.forEach((input, index) => {
                if (questionNumber >= 0 && questionNumber <= questions.length - 1) {
                    obj[`${index}_${questions[questionNumber].question}`] = input.value;
                }
                if (questionNumber == questions.length) {
                    obj[`Номер телефона`] = input.value;
                }
            });
            userAnswers.push(obj);
            console.log("userAnswers:", userAnswers)
        }
        
        btnNext.onclick = () => {
            checkAnswer();
            questionNumber++;
            if (questionNumber >= 0 && questionNumber <= questions.length - 1) {
                renderQuestion(questions[questionNumber]);
            }
            renderControlBtns();
        };

        btnPrev.onclick = () => {
            questionNumber--;
            if (questionNumber >= 0 && questionNumber <= questions.length - 1) {
                renderQuestion(questions[questionNumber]);
            }
            renderControlBtns();
        };

        btnSend.onclick = () => {
            checkAnswer();
            questionNumber++;
            renderControlBtns();
        };

        const renderControlBtns = () => {
            if (questionNumber >= 0 && questionNumber <= questions.length - 1) {
                btnSend.classList.add('d-none');
                btnNext.classList.remove('d-none');
                btnPrev.classList.remove('d-none');
            }
            switch (questionNumber) {
                case 0:
                    btnPrev.classList.add('d-none');
                    break;
                case questions.length:
                    btnPrev.classList.add('d-none');
                    btnNext.classList.add('d-none');
                    btnSend.classList.remove('d-none');

                    formAnswers.innerHTML = `
                        <div class="form-group">
                            <label for="phoneNumber">Enter your number</label>
                            <input type="phone" class="form-control" id="phoneNumber">
                        </div>
                    `;
                    break;
                case questions.length + 1:
                    questionTitle.textContent = 'Спасибо за пройденный тест!';
                    formAnswers.textContent = '';
                    setTimeout(() => {
                        modalBlock.classList.remove('d-block');
                    }, 2000);
                    break;
            }
        }
        renderControlBtns();
    }
})