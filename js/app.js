const catNames = ['Scruffy', 'Mr. Fluffs'];

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
	
	const container = document.querySelector('.container');
	container.appendChild(catDiv);
};




function makeCatClickHandler(name, catCounter){
	var clickCount = 0;
	return function(){
		clickCount++;
		catCounter.innerText = name + ' ' + clickCount; 
		};
};

for (var i = catNames.length ; i > 0; i--) { 
	createCat(i);  // create html to display cat and counter

	const cat = document.querySelector('#cat' + i);
	const catName = catNames[i-1];
	const catCounter = document.querySelector('#cat'+i+' p');
	
	const clickHandler = makeCatClickHandler(catName, catCounter);
	catCounter.innerText = catName;
	cat.addEventListener('click', clickHandler);
}
