const catNames = ['Scruffy', 'Mr. Fluffs', 'Sugar & Spice','Tiger','Lydia'];
const catList = [];
const container = document.querySelector('.container');
var currentCat = null;
const catMenu = document.querySelector('#catMenu');

catMenu.addEventListener('change', function (event) {
    currentCat.classList.toggle('hidden');
	currentCat = catList[event.target.value];
	currentCat.classList.toggle('hidden');
});



function createCat(catNum){
	const catDiv =   document.createElement('div');   // make a div
	catDiv.classList.add('cat');
	catDiv.classList.add('hidden'); // initially hide them all
	catDiv.setAttribute('id', 'cat'+catNum);
	
	const catImg =   document.createElement('img');  // make a img
	catImg.classList.add('cat-pic');
	catImg.setAttribute('src', 'src/cat'+catNum+'.jpg');
	catImg.setAttribute('alt', 'kitty cat');
	
	const catCount = document.createElement('p');     // make a p tag to hold cat name and counter
	catCount.classList.add('cat-count');
	
	catDiv.appendChild(catImg);	
	catDiv.appendChild(catCount);
	catList.push(catDiv);
	
	return catDiv;
};

function createCatMenuItem(catName, catNum){
	const catOption = document.createElement('option');
	catOption.setAttribute('value', catNum);
	catOption.innerText = catName;
	catMenu.appendChild(catOption);
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
	createCatMenuItem(catNames[i], i);

	var counter = thisCat.querySelector('p')
	var clickHandler = makeCatClickHandler(catNames[i], counter);
	
	counter.innerText = catNames[i];
	thisCat.addEventListener('click', clickHandler);
	container.appendChild(thisCat);
}

currentCat = document.querySelector('.cat');
currentCat.classList.toggle('hidden');



