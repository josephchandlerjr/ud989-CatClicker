
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
	getCatNames: function() { return this.catNames; },
	updateCat: function(name,src,clicks){
		currentCat = this.getCurrentCat();
		currentCat.name = name;
		currentCat.imgSrc = src;
		currentCat.clicks = clicks;
	}
};

var octopus = {
	init: function(){
		model.init();
		menuView.init(model.getCats(), this.getCurrentCat()); 
		view.init(this.getCurrentCat()); 
	},
	update: function(newCatNum){  
		model.setCurrentCat(newCatNum);
		view.update(model.getCurrentCat()); 
	},
	updateClicks: function(catNum){
		model.getCats()[catNum].clicks++;
		view.update(model.getCurrentCat()); 
	},
	getCurrentCat: function() { return model.getCurrentCat(); },
	updateCat: function(name,src,clicks){
		model.updateCat(name,src,clicks);
		menuView.init(model.getCats(), this.getCurrentCat()); 
		view.update(this.getCurrentCat()); 
		}
}
	
var menuView = { 			
	init: function(cats, currentCat) {  // takes a list of cat objects and builds menu
		this.catMenu = document.querySelector('#catMenu');
		this.catMenu.innerHTML = '';
		this.render(cats, currentCat);
	},
	render: function(cats, currentCat){
		cats.forEach(function(cat){menuView.createCatMenuItem(cat);});
		this.catMenu.addEventListener('change', function (event) {
			octopus.update(event.target.value);
		});
		this.catMenu.value = currentCat.number;
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
		this.adminCancelButton.addEventListener('click', function(self){
			return function(){
				self.toggleAdminDisplay();
				};
			}(this));
		this.adminSaveButton = document.querySelector('#save');
		this.adminSaveButton.addEventListener('click', function(self){
			return function(){
				self.updateCat();
				};
				}(this));
		this.adminForm = document.querySelector('#adminForm');		
		this.adminButton = document.querySelector('#admin');
		this.adminButton.addEventListener('click', function(self){
			return function(){
				self.toggleAdminDisplay();
				};
			}(this));
		this.render(cat);
 	},
	updateCat: function(){octopus.updateCat(this.adminNameField.value,
											this.adminURLField.value,
											this.adminClicksField.value
											);},
	toggleAdminDisplay: function(){
		this.populateAdminFields();
		this.adminCancelButton.classList.toggle('hidden');
		this.adminSaveButton.classList.toggle('hidden');
		this.adminForm.classList.toggle('hidden');		
	},
	populateAdminFields: function(){
		var cat = octopus.getCurrentCat();
		this.adminNameField.value = cat.name;
		this.adminURLField.value = cat.imgSrc;
		this.adminClicksField.value = cat.clicks;
	},
	update: function(cat){
		this.container.removeChild(this.container.lastChild);
		this.render(cat);
	},
	render: function(cat){
		this.container.appendChild(this.createCat(cat));
		this.populateAdminFields();
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

