const catNames = ['Scruffy', 'Mr. Fluffs'];

function makeCatClickHandler(name, catCounter){
	var clickCount = 0;
	return function(){
		clickCount++;
		catCounter.innerText = name + ' ' + clickCount; 
		};
};

for (var i = catNames.length ; i > 0; i--) {
	const cat = document.querySelector('#cat' + i);
	const catName = catNames[i-1];
	const catCounter = document.querySelector('#cat'+i+' p');
	const clickHandler = makeCatClickHandler(catName, catCounter); 
	catCounter.innerText = catName;
	cat.addEventListener('click', clickHandler);
}
