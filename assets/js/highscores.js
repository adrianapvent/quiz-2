const highScoresList = document.querySelector('#highScoresList')
const highScores = JSON.parse(localStorage.getItem('highScores')) || []

highScoresList.innerHTML =
highScores.map(Score => {
    return `<li class="high score">${Score.name} - ${Score.score}</li>`
}).join('')