//Game value
let min =1,
    max=10,
    winningNumber = getRandomNum(min,max),
    guessesLeft = 3;
    //console.log(winningNumber,"numb");

//UI Elements
const game = document.querySelector('#game'),
      minNum = document.querySelector('.min-num'),
      maxNum = document.querySelector('.max-num'),
      guessBtn = document.querySelector('#guess-btn'),
      guessInput = document.querySelector('#guess-input'),
      message = document.querySelector('.message'),
      imgSrc = document.createElement("img");

//Assign UI min and max
minNum.textContent = min;
maxNum.textContent = max;

//Play again
game.addEventListener('mousedown',function(e){
  if(e.target.className === "play-again"){
   // console.log("refresh");
    clear();
    window.location.reload();
  }
});

//Listen for guess
guessBtn.addEventListener('click',function(){
  let guess = parseInt(guessInput.value);
  game.appendChild(imgSrc).remove();
  message.textContent = "";
  //console.log(guess)

  //Validate
  if(isNaN(guess) || guess < min || guess > max){
  
    setMessage(`Please enter a number between  ${min} and ${max}`,"red");
    imgSrc.src = "https://media.giphy.com/media/2QuyfZIHlonwQ/giphy.gif";
    imgSrc.width ="200";
    game.appendChild(imgSrc)
  }
  // Check if won
  if(guess == winningNumber){
    // Game over - lost
    gameOver(true,`Congratulation ! ${winningNumber} is the correct answer !`,"https://media.giphy.com/media/3o7qDEq2bMbcbPRQ2c/giphy.gif","250",true);

  }else if(guess !== winningNumber && !isNaN(guess)){
    guessesLeft -= 1;
    if(guessesLeft === 0){
      // Game over - lost
      gameOver(false,`Game Over ! The correct answert was ${winningNumber}. Play again ?`,"https://media.giphy.com/media/vX9WcCiWwUF7G/giphy.gif","250",true);
    }
    else{
      // Game continues - answer won
      guessInput.value = '';

      //Tell user it s wrong number
      
      setMessage(`${guess} is not correct... ${guessesLeft} guesses left`,"red");
      imgSrc.src = "https://media.giphy.com/media/HBGQcKyibP0je/giphy.gif";
      imgSrc.width ="250";
      game.appendChild(imgSrc);
    }
  }
})

// Game Over
function gameOver(won,msg,img,width,input){
  let color;
  won === true ? color = "green" : color = "red";
  setMessage(msg, color);
  //Disable input
  guessInput.disabled = input;

  //Change border color
  guessInput.style.borderColor = color;

  imgSrc.src = img;
  imgSrc.width = width;
  game.appendChild(imgSrc)

  guessBtn.value ="Play again";
  guessBtn.className += "play-again";
}
//Random number
function getRandomNum(min,max){
  return Math.floor(Math.random()*(max-min+1)+min);
}

//Clear before refresh
function clear(){
  guessesLeft = 3;
  game.appendChild(imgSrc).remove();
  message.textContent = "";
  guessInput.value = '';
  guessInput.style.borderColor = "";
  guessInput.disabled = false;
}

//Set message
function setMessage(msg, color){
  message.style.color = color;
  message.textContent = msg;
}