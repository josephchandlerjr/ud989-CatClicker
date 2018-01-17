
var Model = {
	catNames: ['Scruffy','Mr. Fluffs','Sugar & Spice','Tiger','Lydia'],
	init: function(){
		this.catList = [];
		this.catNames.forEach(function(cat, ix){ 
			Model.catList.push({
				name: cat,
				number: ix,
				clicks: 0
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
		CatView.update(Model.catList, newCatNum); 
	},
	updateView: function(catNum){
		Model.catList[catNum].clicks++;
		CatView.update(Model.catList, catNum);
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
		this.render(catList, 0);
 	},
	update: function(catList,newCatNum){
		this.container.removeChild(this.container.lastChild);
		this.render(catList, newCatNum);
	},
	render: function(catList, ix){
		this.container.appendChild(this.createCat(ix, catList[ix]));
	},
	createCat: function(catNum, cat){
		var catDiv =   document.createElement('div');   // make a div
		catDiv.classList.add('cat');
		
		var catImg =   document.createElement('img');  // make a img
		catImg.classList.add('cat-pic');
		catImg.setAttribute('src', 'src/cat'+catNum+'.jpg');
		catImg.setAttribute('alt', 'kitty cat');
		
		var catCount = document.createElement('p');
		catCount.innerText = cat.name + ' ' + cat.clicks;     
		catCount.classList.add('cat-count');
		var clickHandler = this.makeCatClickHandler(catNum, catCount);
		catDiv.addEventListener('click', clickHandler);

		catDiv.appendChild(catImg);	
		catDiv.appendChild(catCount);		
		return catDiv;
	},
	makeCatClickHandler: function(ix, catCounter){
		return function(){
			Octopus.updateView(ix);
			};
	},
};

Octopus.init();

