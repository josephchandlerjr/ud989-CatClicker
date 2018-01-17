
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
		this.setCurrentCat(this.getCats()[0]);
		console.log(this.catList);
	},
	setCurrentCat: function(num){ this.currentCat = this.catList[num]; },
	getCats: function(){return this.catList;},
	getCurrentCat: function(){ return this.currentCat; }
};

var octopus = {
	init: function(){
		model.init();
		menuView.init(model.catNames); 
		view.init(model.getCats()); 
	},
	update: function(newCatNum){  
		model.setCurrentCat(newCatNum);
		view.update(model.catList, newCatNum); 
	},
	updateClicks: function(catNum){
		model.getCats()[catNum].clicks++;
		view.update(model.getCats(), catNum);   // this'll always be current cat sooooooooooo
	},
	getCurrentCat: function() { return model.getCurrentCat(); }
}
	
var menuView = { 			
	init: function(catList) {
		this.catMenu = document.querySelector('#catMenu');
		catList.forEach(function(elem, ix){ menuView.createCatMenuItem(elem,ix);});
		this.catMenu.addEventListener('change', function (event) {
			octopus.update(event.target.value);
		});
	},
	createCatMenuItem: function(catName, catNum){
		var catOption = document.createElement('option');
		catOption.setAttribute('value', catNum);
		catOption.innerText = catName;
		this.catMenu.appendChild(catOption);
	}
};

var view = {
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
		
		var catCount = document.createElement('p')     // make a p
		catCount.innerText = cat.name + ' ' + cat.clicks;     
		catCount.classList.add('cat-count');
		catDiv.addEventListener('click', this.makeCatClickHandler(catNum));

		catDiv.appendChild(catImg);	
		catDiv.appendChild(catCount);		
		return catDiv;
	},
	makeCatClickHandler: function(ix){
		return function(){ octopus.updateClicks(ix);};
	},
};

octopus.init();

