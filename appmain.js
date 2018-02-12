
var xstart=20;
var ystart=148;
var xend=280;
var yend=500;
var width=60;
var height = 30;
var row=0;
var column=0;
var remaining=280;
var isfull=false;
var isfirst=true;
var noOfProducts=0;
var whereToSearch=0;
/*var pic= new Image();
pic.src="aquariumfish.jpg";

var pic2= new Image();
pic2.src="aquariumfish.jpg";*/

var src1="red.jpg";
var src2="blue.png";

var imageObjs=[];
var shelf=[];
function doFirst2(){
	x= document.getElementById("shelfcanvas");
	canvas = x.getContext("2d");
	mypic = document.getElementById("img");
	mypic.addEventListener("dragstart",function (e){

		e.dataTransfer.setData('picsent',src1);
		e.dataTransfer.setData('width',35);
		e.dataTransfer.setData('height',30);
}, false);
	
	mypic2 = document.getElementById("img2");
	mypic2.addEventListener("dragstart",function (e){

		e.dataTransfer.setData('picsent',src2);
		e.dataTransfer.setData('width',35);
		e.dataTransfer.setData('height',30);
}, false);
	//imageObjs.push(shelf);
	leftbox = document.getElementById("leftbox");
	leftbox.addEventListener("dragenter",function(e){
		e.preventDefault();
	},false);
	leftbox.addEventListener("dragover",function(e){
		e.preventDefault();
		
	},false);
	leftbox.addEventListener("drop",dropped,false);
}

/*function startDrag(e){

		e.dataTransfer.setData('picsent',src1);
}*/

function dropped(e){
		e.preventDefault();
		console.log(e.pageX+'  '+e.pageY);
		var receivedsrc=e.dataTransfer.getData('picsent');
		width = parseInt(e.dataTransfer.getData('width'));
		height = parseInt(e.dataTransfer.getData('height'));
		
	
	noOfProducts++;
if(isfirst){
	xstart=20;
	remaining-=width;
	isfirst=false;
	endpointX=width;
	console.log('isfirst');
}	
else{
		if(remaining < width)
				{
					if(ystart + height >= yend-height){
						isfull=true;
					}
					else{
					//imageObjs.push([]);
					ystart+=25+153-30;
					remaining=280-width;
					console.log('xstart = 0');
					xstart=20;
					row++;
					whereToSearch=noOfProducts-1;
					endpointX=width;
					column=0;
					}
				}
				else
				{
				console.log('xstart ++');
					remaining-=width;
					
					xstart=endpointX;
					endpointX=endpointX+width;
					column++;
				}
		
	}	
	
	if(!isfull){
	console.log('end  '+endpointX+' width '+width+'  xstart   '+xstart+' remaining '+remaining);
		img={
			src: receivedsrc,
			row : row,
			column : column,
			//xstart : xstart,
			ystart : ystart,
			width : width,
			height : height,
			xstopped: e.pageX
			
		};
			//imageObjs[row].push(img);
			//shelf.push(img);
			canvas.clearRect(0,0,300,500);
			doFirst(shelves);
			manipulateImages();
			for(var i = 0 ; i <imageObjs.length; i++){
			
			for(var j = 0 ; j < imageObjs[i].length;j++){
		//	console.log(imageObjs[i][j].xstart+'   '+imageObjs[i][j].ystart);
			var pic = new Image();
			pic.src = imageObjs[i][j].src;
			
			canvas.drawImage(pic,imageObjs[i][j].xfinal,imageObjs[i][j].ystart,imageObjs[i][j].width,imageObjs[i][j].height);
			
				}
				}
				
				
		//leftbox.innerHTML = e.dataTransfer.getData('Text');
		
}else{
alert('Full');
}
}
function manipulateImages(){
wheretoplace();
getShelfReady();
for(var i = 0 ; i <imageObjs.length; i++){
		var totalwidth=0;
		for(var j = 0 ; j < imageObjs[i].length;j++){
			totalwidth+=imageObjs[i][j].width;
		}
		console.log('total width '+totalwidth);
		var gaps = (xend - totalwidth)/(imageObjs[i].length+1);
		console.log('gaps '+gaps);
		for(var j = 0 ; j < imageObjs[i].length;j++){
			imageObjs[i][j].xfinal = imageObjs[i][j].xstart+(j+1)*gaps+20;
			console.log('xfinal '+imageObjs[i][j].xfinal);
		}
}

}

function wheretoplace(){

var inserted=false;
if(shelf.length==0)
	shelf.push(img);
else{

for(var i = whereToSearch ; i < shelf.length;i++)
	{
	console.log('val ' +img.xstopped+'   '+parseInt(shelf[i].xfinal+shelf[i].width+5));
		if(img.xstopped < shelf[i].xfinal+shelf[i].width+5)
		{
			shelf.splice(i,0,img);
			inserted=true;
			console.log('before');
			break;
		}	
		
		
	}
	if(!inserted)
		shelf.push(img);
}
}

function getShelfReady(){
	var firstRow=0;
	imageObjs=[];
	imageObjs.push([]);
	//shelf.push(img);
	var xs=0;
	for(var i = 0 ; i < shelf.length;i++)
	{
		if(firstRow==shelf[i].row)
			{
				//console.log('true');
				shelf[i].xstart=xs;
				xs=xs+shelf[i].width;
				imageObjs[firstRow].push(shelf[i]);
			}	
		else{
			//console.log('false');
			firstRow++;
			xs=0;
			shelf[i].xstart=xs;
				xs=xs+shelf[i].width;
			imageObjs.push([]);
			imageObjs[firstRow].push(shelf[i])
			
		}		
	}
}

window.addEventListener("load",doFirst2, false);