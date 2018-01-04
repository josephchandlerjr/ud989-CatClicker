
function makeCatClickHandler(cat, catCounter){
	var clickCount = 0;
	return function(){
		clickCount++;
		catCounter.innerText = clickCount; 
		};
};
console.log(document.querySelector('#cat-count1'));
const cat1 = document.querySelector('#cat1');
const catOneHandler = makeCatClickHandler(document.querySelector('#cat1'),document.querySelector('#cat-count1'));
cat1.addEventListener('click', catOneHandler);

const cat2 = document.querySelector('#cat2');
const catTwoHandler = makeCatClickHandler(document.querySelector('#cat2'),document.querySelector('#cat-count2'));
cat2.addEventListener('click', catTwoHandler);