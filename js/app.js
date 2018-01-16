
var Model = {
	catNames: ['Scruffy','Mr. Fluffs','Sugar & Spice','Tiger','Lydia'],
	init: function(){
		this.catList = [];
		this.catNames.forEach(function(cat, ix){ 
			Model.catList.push({
				name: cat,
				number: ix,
			});
		});
	}
};

var Octopus = {
	init: function(){
		Model.init();
		CatMenuView.init(Model.catNames); 
		CatView.init(Model.catList); 
	},
	update: function(newCatNum){  
		CatView.update(newCatNum); 
	}
}
	
var CatMenuView = { 			
	init: function(catList) {	//
		this.catMenu = document.querySelector('#catMenu');
		catList.forEach(function(elem, ix){ CatMenuView.createCatMenuItem(elem,ix);});
		this.catMenu.addEventListener('change', function (event) {
			Octopus.update(event.target.value);
		});
	},
	createCatMenuItem: function(catName, catNum){
		var catOption = document.createElement('option');
		catOption.setAttribute('value', catNum);
		catOption.innerText = catName;
		this.catMenu.appendChild(catOption);
	}
};

var CatView = {
	catList: [],
	container: document.querySelector('.container'),
	init: function(catList){
		catList.forEach(function(elem, ix){
				CatView.catList.push(CatView.createCat(ix, elem));
		});
		this.render(0);
 	},
	update: function(newCatNum){
		this.container.removeChild(this.container.lastChild);
		this.render(newCatNum);
	},
	render: function(i){
		this.container.appendChild(this.catList[i]);
	},
	createCat: function(catNum, cat){
		var catDiv =   document.createElement('div');   // make a div
		catDiv.classList.add('cat');
		
		var catImg =   document.createElement('img');  // make a img
		catImg.classList.add('cat-pic');
		catImg.setAttribute('src', 'src/cat'+catNum+'.jpg');
		catImg.setAttribute('alt', 'kitty cat');
		
		var catCount = document.createElement('p');
		catCount.innerText = cat.name;     
		catCount.classList.add('cat-count');
		var clickHandler = this.makeCatClickHandler(cat.name, catCount);
		catDiv.addEventListener('click', clickHandler);

		catDiv.appendChild(catImg);	
		catDiv.appendChild(catCount);		
		return catDiv;
	},
	makeCatClickHandler: function(name, catCounter){
		var clickCount = 0;
		return function(){
			clickCount++;
			catCounter.innerText = name + ' ' + clickCount; 
			};
	},
};

Octopus.init();

