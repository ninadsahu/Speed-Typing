const quote_url = 'https://api.quotable.io/random'

const mainh1 = document.querySelector('main h1')
const textArea = document.querySelector('textarea') //input
const mainP = document.querySelector('main p') //random quote
const result = document.querySelector('main h3')
const playAgain = document.querySelector('button')

const quoteDisplay = document.getElementById('para') //random quote
const typingInput = document.getElementById('longInput') //user types here

const timer = document.getElementById('timer')

const displaySpeed = document.getElementById('speed')
const displayAccuracy = document.getElementById('acc')


let words = 0 //counter for words typed
let correctchar = 0 //counter for correct char
let totalchar = 0 //counter for total char
let time = 60
let totalcorrectchar = 0
let flag = 0


typingInput.addEventListener('input', () => {
    if (flag === 0) {
        flag++
        startTimer()
    }
    const arrQuote = quoteDisplay.querySelectorAll('span')
    const arrInput = typingInput.value.split('')
    correctchar = 0
    let chars = arrQuote.length
    arrQuote.forEach((charSpan, index) => {
        const char = arrInput[index]
        if (char == null) {
            charSpan.classList.remove('correct')
            charSpan.classList.remove('incorrect')
        } else if (char === charSpan.innerText) { //correct character typed
            charSpan.classList.add('correct')
            charSpan.classList.remove('incorrect')
            correctchar++
        } else if (char !== charSpan.innerText) { //wrong character typed
            charSpan.classList.add('incorrect')
            charSpan.classList.remove('correct')
        }
    })
    if (arrInput.length >= chars) { //condition to renderNewQuote
        console.log('will print new quote')
        words += typingInput.value.split(' ').length
        totalchar += arrInput.length
        totalcorrectchar += correctchar
        console.log("totalcorrectchar" + totalcorrectchar)
        rendernewquote()
    }
})

function getrandomquote() {
    return fetch(quote_url)
        .then(response => response.json())
        .then(data => data.content)
}

async function rendernewquote() {
    typingInput.value = null //clears input everytime a new quote is displayed
    console.log('posting new quote')
    const quote = await getrandomquote()
    quoteDisplay.innerHTML = ''
    quote.split('').forEach(element => { //will enclose every char (of above quote) within a <span>
        const charSpan = document.createElement('span')
        charSpan.innerText = element
        quoteDisplay.appendChild(charSpan)
    });
}

function startTimer() {
    var x = setInterval(function() {
        if (time > 0) {
            time--
        } else if (time === 0) {
            //results
            const arrInput = typingInput.value.split('')
            const arrQuote = quoteDisplay.querySelectorAll('span')
            let chars = arrQuote.length
            arrQuote.forEach((charSpan, index) => {
                const char = arrInput[index]
                if (char === charSpan.innerText) { //correct character typed
                    totalcorrectchar++
                    console.log(totalcorrectchar)
                }
            })
            totalchar += typingInput.value.split('').length
            words += typingInput.value.split(' ').length

            //assigning values to results
            displaySpeed.innerText = words
            console.log("Total CHAR" + totalchar)
            console.log("correct" + totalcorrectchar)
            displayAccuracy.innerText = Math.round((totalcorrectchar / totalchar) * 100)

            //after time expires, hide the quote,input and display results,playAgain button
            playAgain.classList.remove('hide')
            result.classList.remove('hide')
            mainh1.classList.add('hide')
            textArea.classList.add('hide')
            mainP.classList.add('hide')

            clearInterval(x)
        }
        //updating timer
        timer.innerHTML = time
    }, 1000)
}

rendernewquote()