
var Model = {
	catNames: ['Scruffy', 'Mr. Fluffs', 'Sugar & Spice','Tiger','Lydia'],
	catList: [],
	init: function(){
		this.catList = [];
		this.catNames.forEach(function(cat, ix){ 
			Model.catList.push({
				name: cat,
				number: ix,
				visible: false
			});
		});
		this.catList[0].visible = true;
	}
};

var Octopus = {
	init: function(){
		Model.init();
		CatMenuView.init(Model.catNames); // give it the cat names option tags
		CatView.init(Model.catList); // give it the catList to build DOM elements
	},
	update: function(newCatNum){  //called by CatMenuView. this tells catView to update cat shown
		CatView.update(newCatNum); // give it the catList to build divs
	}
}
	
var CatMenuView = { 			//builds menu with event listener for change. Listener will ask Octopus to update
	init: function(catList) {
		container = document.querySelector('.container');   
		container.innerHTML = '';
		menuContainer = document.createElement('div');
		menuContainer.setAttribute('id', 'menu-container');
		this.catMenu = document.createElement('select');
		this.catMenu.setAttribute('id', 'catMenu');
		menuContainer.appendChild(this.catMenu);
		container.appendChild(menuContainer);

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
		this.render();
 	},
	update: function(newCatNum){
		this.container.lastChild.classList.toggle('hidden');
		this.catList[newCatNum].classList.toggle('hidden');
		this.container.removeChild(this.container.lastChild);
		this.render();
	},
	render: function(){
		for (var i=0; i < this.catList.length; i++) {
			if (!this.catList[i].classList.contains('hidden')){
				this.container.appendChild(this.catList[i]);
				break; // should only be one
			};
		}
	},
	createCat: function(catNum, cat){
		var catDiv =   document.createElement('div');   // make a div
		catDiv.classList.add('cat');
		if (!cat.visible){ catDiv.classList.add('hidden'); }
		catDiv.setAttribute('id', 'cat'+catNum);
		
		var catImg =   document.createElement('img');  // make a img
		catImg.classList.add('cat-pic');
		catImg.setAttribute('src', 'src/cat'+catNum+'.jpg');
		catImg.setAttribute('alt', 'kitty cat');
		
		var catCount = document.createElement('p');     // make a p tag to hold cat name and counter
		catCount.classList.add('cat-count');

		var clickHandler = this.makeCatClickHandler(cat.name, catCount);
		catCount.innerText = cat.name;
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

