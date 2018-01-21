
var model = {
	catNames: ['Scruffy','Mr. Fluffs','Sugar & Spice','Tiger','Lydia'],
	currentCat: null,
	catList: null,
	init: function(){
		this.catList = [];
		this.catNames.forEach(function(cat, ix){ 
			model.catList.push({
				name: cat,
				number: ix,
				clicks: 0,
				imgSrc: 'src/cat'+ix+'.jpg'
			});
		});
		this.setCurrentCat(0);
	},
	setCurrentCat: function(num){ this.currentCat = this.getCats()[num]; },
	getCats: function(){return this.catList;},
	getCurrentCat: function(){ return this.currentCat; },
	getCatNames: function() { return this.catNames; }
};

var octopus = {
	init: function(){
		model.init();
		menuView.init(model.getCats()); 
		view.init(model.getCurrentCat()); 
	},
	update: function(newCatNum){  
		model.setCurrentCat(newCatNum);
		view.update(model.getCurrentCat()); 
		console.log(model.getCurrentCat());
	},
	updateClicks: function(catNum){
		model.getCats()[catNum].clicks++;
		view.update(model.getCurrentCat());   // this'll always be current cat sooooooooooo
	},
	getCurrentCat: function() { return model.getCurrentCat(); }
}
	
var menuView = { 			
	init: function(cats) {  // takes a list of cat objects and builds menu
		this.catMenu = document.querySelector('#catMenu');
		this.render(cats);
	},
	render: function(cats){
		cats.forEach(function(cat){menuView.createCatMenuItem(cat);});
		this.catMenu.addEventListener('change', function (event) {
			octopus.update(event.target.value);
		});
	},
	createCatMenuItem: function(cat){  //takes cat object and appends option tag to catMenu
		var catOption = document.createElement('option');
		catOption.setAttribute('value', cat.number);
		catOption.innerText = cat.name;
		this.catMenu.appendChild(catOption);
	}
};

var view = {
	container: document.querySelector('.container'),
	init: function(cat){
		this.adminNameField = document.querySelector("#name");
		this.adminURLField = document.querySelector("#imgURL");
		this.adminClicksField = document.querySelector("#clicks");
		this.adminCancelButton = document.querySelector('#cancel');
		this.adminSaveButton = document.querySelector('#save');
		this.adminForm = document.querySelector('#adminForm');
		
		this.adminButton = document.querySelector('#admin');
		this.adminButton.addEventListener('click', function(self){
			return function(){
				console.log(self);
				self.toggleAdminDisplay();
				};
			}(this));
		this.render(cat);
 	},
	toggleAdminDisplay: function(){
		this.adminCancelButton.classList.toggle('hidden');
		this.adminSaveButton.classList.toggle('hidden');
		this.adminForm.classList.toggle('hidden');		
	},
	update: function(cat){
		this.container.removeChild(this.container.lastChild);
		this.render(cat);
	},
	render: function(cat){
		this.container.appendChild(this.createCat(cat));
	},
	createCat: function(cat){
		var catDiv =   document.createElement('div');   // make a div
		catDiv.classList.add('cat');
		
		var catImg =   document.createElement('img');  // make a img
		catImg.classList.add('cat-pic');
		catImg.setAttribute('src', cat.imgSrc);
		catImg.setAttribute('alt', 'kitty cat');
		
		var catCount = document.createElement('p')     // make a p
		catCount.innerText = cat.name + ' ' + cat.clicks;     
		catCount.classList.add('cat-count');
		catDiv.addEventListener('click', this.makeCatClickHandler(cat.number));

		catDiv.appendChild(catImg);	
		catDiv.appendChild(catCount);		
		return catDiv;
	},
	makeCatClickHandler: function(ix){
		return function(){ octopus.updateClicks(ix);};
	},
};

octopus.init();

