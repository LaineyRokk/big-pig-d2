var scores, turnScore, activePlayer, gamerPlaying;
var btnRoll = document.querySelector('.btnRoll');
var btnHold = document.querySelector('.btnHold');

var diceimgs = {
  diceimg1:
  "http://cdn.pbrd.co/images/70YJMCVVR.png"
  diceimg2:
  "http://cdn.pbrd.co/images/711lemsMX.png"
  diceimg3:
  "http://cdn.pbrd.co/images/711NjfjV5.png"
  diceimg4:
  "http://cdn.pbrd.co/images/712dK3C2z.png"
  diceimg5:
  "http://cdn.pbrd.co/images/70Zqc4icX.png"
  diceimg6:
  "http://cdn.pbrd.co/images/712DzRw22.png"
  diceimg7:
  "http://cdn.pbrd.co/images/713n3lHQN.png"
  diceimg8:
  "http://cdn.pbrd.co/images/713JSMJDr.png"
  diceimg9:
  "http://cdn.pbrd.co/images/HvoZ04Gb.png"
  diceimg10:
  "http://cdn.pbrd.co/images/HvqN3Kjq.png"
  diceimg11:
  "http://cdn.pbrd.co/images/714IXBStH.png"
  diceimg12:
  "http://cdn.pbrd.co/images/714ZovsdD.png"
};
init();

documnet.querySelector('.btn-roll').addEventListener('click', function(){
  if(gamePlaying) {
    var dice = Math.floor(Math.random()* 6) + 1;

    var diceDOM = document.querySelector('.dice');
    diceDOM.styles.disply = 'block';
    diceDOM.src = diceimg['diceimg' + activePlayer + dice];

    document.querySelector('#current-' + activePlayer).innerHTML = '<em>' + dice + '</em>';

    if(dice !== 1){
      hideRolledMsg();
      turnScore += dice;
      document.querySelector('#current-' + activePlayer).textContent = turnScore;
    } else{
      disableBtn(btnRoll, 1000);
      hideRolledMsg();
      document.querySelector('.player-'+activePlayer+'-rolled-1').style.visibility = 'visible';
      nextPlayer();
    }
  }
});

document.querySelector('.btn-hold').addEventListener('click', function(){
		if (gamePlaying) {
			disableBtn(btnRoll, 1000);
			// Add current score to global score
			scores[activePlayer] += turnScore;

			//Update the UI
			document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

			//check if player won the game

			if (scores[activePlayer] >= 50) {
				document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
				document.querySelector('.dice').style.display = 'none';
				document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner-' + activePlayer);
				document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active-' + activePlayer);
				gamePlaying = false;

			} else {
				nextPlayer();
			}
		}


});


document.querySelector('.btn-new').addEventListener('click', init);

document.querySelector('.btn-rules').addEventListener('click', function(){
	    var games = document.getElementsByClassName('game-board');
		for(i=0;i<games.length;i++){
			games[i].style.display = 'none';
		}

	    document.querySelector('.btn-back').style.display = 'block';
		var rules = document.getElementsByClassName('rules-section');
		for(i=0;i<rules.length;i++){
			rules[i].style.display = 'block';
		}

});

document.querySelector('.btn-back').addEventListener('click', function(){
	    var games = document.getElementsByClassName('game-board');
		for(i=0;i<games.length;i++){
			games[i].style.display = 'block';
		}

	    document.querySelector('.btn-back').style.display = 'none';
		var rules = document.getElementsByClassName('rules-section');
		for(i=0;i<rules.length;i++){
			rules[i].style.display = 'none';
		}

});

function init() {
	scores = [0,0];
	turnScore = 0;
	activePlayer = 0;
	gamePlaying = true;
	document.querySelector('.dice').style.display = 'none';
	document.getElementById('score-0').textContent = '0';
	document.getElementById('score-1').textContent = '0';
	document.getElementById('current-1').textContent = '0';
	document.getElementById('current-2').textContent = '0';
	document.querySelector('.player-1-rolled-1').style.visibility = 'hidden';
	document.querySelector('.player-2-rolled-1').style.visibility = 'hidden';

	document.querySelector('#name-1').textContent = 'Player 1';
	document.querySelector('#name-2').textContent = 'Player 2';
	document.querySelector('.player-1-section').classList.add('active-0');
	document.querySelector('.player-1-section').classList.remove('winner-1');
	document.querySelector('.player-2-section').classList.remove('winner-2');

}

function nextPlayer() {
	//next player
		var icons = document.getElementsByTagName('i');
		for(i=0;i<icons.length;i++){
			icons[i].classList.remove('color-' + activePlayer);
		}

		document.querySelector('.dice').style.display = 'none';
		document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active-' + activePlayer);
		activePlayer ===0 ? activePlayer = 1 : activePlayer = 0;
		turnScore = 0;

		for(i=0;i<icons.length;i++){
			icons[i].classList.add('color-' + activePlayer);
		}
		document.querySelector('.player-' + activePlayer + '-panel').classList.add('active-' + activePlayer);
		document.querySelector('#current-1').textContent = '0';
		document.querySelector('#current-2').textContent = '0';
}

function disableBtn(btn, time) {
	   //disable button
		btn.disabled = true;
      	setTimeout(function(){btn.disabled = false;},time);
}

function hideRolledMsg(){
	document.querySelector('.player-1-rolled-1').style.visibility = 'hidden';
	document.querySelector('.player-2-rolled-1').style.visibility = 'hidden';
}
