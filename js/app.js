const catNames = ['Scruffy', 'Mr. Fluffs', 'Sugar'];
const container = document.querySelector('.container');

function createCat(catNum){
	const catDiv =   document.createElement('div');   // make a div
	catDiv.classList.add('cat');
	catDiv.setAttribute('id', 'cat'+catNum);
	
	const catImg =   document.createElement('img');  // make a img
	catImg.classList.add('cat-pic');
	catImg.setAttribute('src', 'src/cat'+catNum+'.jpg');
	catImg.setAttribute('alt', 'kitty cat');
	
	const catCount = document.createElement('p');     // make a p tag to hold cat name and counter
	catCount.classList.add('cat-count');
	
	catDiv.appendChild(catImg);
	catDiv.appendChild(catCount);
	
	return catDiv;
};

function makeCatClickHandler(name, catCounter){
	var clickCount = 0;
	return function(){
		clickCount++;
		catCounter.innerText = name + ' ' + clickCount; 
		};
};

for (var i = 0 ; i < catNames.length; i++) { 
	var thisCat = createCat(i);  // create html to display cat and counter

	var counter = thisCat.querySelector('p')
	var clickHandler = makeCatClickHandler(catNames[i], counter);
	
	counter.innerText = catNames[i];
	thisCat.addEventListener('click', clickHandler);
	container.appendChild(thisCat);
}
