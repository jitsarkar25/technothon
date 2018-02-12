shelvespos = [];

function doFirst(shelves){
	
	
	canvas.clearRect(0,0,canvas.width,canvas.height);
	canvas = x.getContext("2d");
	canvas.fillStyle = grd;
	canvas.fillRect(20, 20, 300, 500);
	
	var remainingshelf=480-(shelves*10);
	gapsshelf=remainingshelf/(parseInt(shelves)+1);

	//ystart=gapsshelf+20;
	console.log('gapsshelf '+gapsshelf+' remainingshelf '+remainingshelf);
	
	var pos=10;
	canvas.shadowColor="#959595";
	for(var i=0;i<shelves;i++){
		pos+=gapsshelf+10;
		console.log('pos '+pos);
		canvas.fillRect(20, pos, 300, 10);
	}
	canvas.shadowColor="";
	
}

function btnClicked(){
	shelves++; //document.getElementById('noOfShelves').value;
	//alert(shelves);
	shelvespos = [];
		
	doFirst(shelves);
	putShelfPosition();
	ystart=gapsshelf+20;
	console.log('start y top row '+ystart);

	changedShelves=true;
	//manipulateImages();
	isfull=false;
	placeOnShelf();
	
}
function putShelfPosition(){
	var initpos=0;
	for(var i=0;i<shelves;i++)
	{	
		if(i!=0)
			initpos+=gapsshelf+10;
		else
			initpos+=gapsshelf;
		shelvespos.push(initpos);
	}
}

function removeshelf(){
	if(shelves==1)
		alert('Minimum 1 shelf is required');
	 else if(currentRow>shelves-1){
		alert('Items present cannot remove shelf');
	}	 
	 else{
		shelves--;
		doFirst(shelves);
		ystart=gapsshelf+20;
		placeOnShelf();
	 }
}

function setup(){
	x = document.getElementById('shelfcanvas');
	canvas = x.getContext("2d");
	 grd = canvas.createLinearGradient(0, 0, x.width, x.height);
	grd.addColorStop(0, "white");

	grd.addColorStop(1, "#e5e0e0");

		canvas.fillStyle = grd;
		canvas.fillRect(20, 20, 300, 500);
		canvas.fillStyle="#d0d1d1";
		canvas.shadowColor="";
		canvas.shadowBlur = 30;
		canvas.shadowOffsetX = 3;
		canvas.shadowOffsetY = 10;
		shelves=1;
		doFirst(shelves);
		ystart=gapsshelf+20;
		
}
window.addEventListener("load",setup,false);
