const cat = document.querySelector('#cat');
const catCount = document.querySelector('#cat-count');
var clickCount = 0;

cat.addEventListener('click', function clickHandler(){
	const catCount = document.querySelector('#cat-count');
	clickCount++;
	catCount.innerText = clickCount; 
	});