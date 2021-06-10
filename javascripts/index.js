var square = document.querySelectorAll('.square');
var content = document.querySelectorAll('.center');
var res = document.querySelector("#res");
var head1 = document.querySelector("h1");
var title = document.querySelector("#title");
var reset = document.querySelector("#reset");
var scoreVal = document.querySelector("#scoreVal");
var score = 0;

var grid = new Array(10);

for(var i=0; i<10; i++){
	grid[i] = new Array(10);
}

// Mines : 1
// empty : 0

//generate 10 mines

intialiseGrid();

function intialiseGrid(){

	// assiging empty cells

	title.textContent = "MineSweeper";
	title.style.color = "white";
	scoreVal.textContent = "00";
	score = 0;
	for(var i=0; i<10; i++){
		for(var j=0; j<10; j++){
			var idx = i*10 + j;
			square[idx].style.backgroundColor = "purple";
			content[idx].style.color = "purple";
			grid[i][j] = 0;
		}
	}

	//assigning mines
	for(var i=0; i<10; i++){
		var x = Math.floor(Math.random()*10);
		var y = Math.floor(Math.random()*10);
		grid[x][y] = -1;
	}



}

function dfs(x,y){

	var dx = new Array(1,0,-1,0,1,1,-1,-1);
	var dy = new Array(0,1,0,-1,1,-1,1,-1);
	var cnt = 0;

	for(var i=0; i<8; i++){
		var a = x + dx[i];
		var b = y + dy[i];
		if(a>=0 && b>=0 && a<10 && b<10){
			if(grid[a][b]===-1){
				cnt++;
			}
		}
	}
	var idx = x*10 + y;
	console.log(idx);
	if(cnt>0 && grid[x][y]!=-1){
		content[idx].textContent = cnt.toString();
		content[idx].style.color = "black";
		square[idx].style.backgroundColor = "gray";
		score += 20;
		grid[x][y] = cnt;
	}
	else{
		square[idx].style.backgroundColor = "gray";
		content[idx].style.color = "gray";
		score+=20;
		grid[x][y] = 2;
		for(var i=0; i<8; i++){
			var a = x + dx[i];
			var b = y + dy[i];
			if(a>=0 && b>=0 && a<10 && b<10 && grid[a][b]===0){
				var j = a*10 + b;
				grid[a][b] = 2;
				square[j].style.backgroundColor = "gray";
				content[j].style.color = "gray";
				score += 20;
				dfs(a,b);
			}
		}
	}

	
}


function turnRed(){
	for(var i=0; i<square.length; i++){
		square[i].style.backgroundColor = "red";
		content[i].style.color = "red";
	}

	for(var i=0; i<10; i++){
		for(var j=0; j<10; j++){
			grid[i][j] = 2;
		}
	}

}

reset.addEventListener("click",function(){
	intialiseGrid();
})


for(var i=0;i<square.length;i++){
	square[i].addEventListener("contextmenu",function(){
		// console.log(this.detail);
		var index = this.textContent;
		console.log(index);
		var x = Math.floor(index/10);
		var y = index%10;
		console.log(x);
		console.log(y);
		if(grid[x][y]===-1){
			score += 50;
			square[index].style.backgroundColor = "green";
			content[index].textContent = "FLAG";
			content[index].style.color = "red";
			grid[x][y] = 2;
			scoreVal.textContent = score.toString();
		}
		else if(grid[x][y]!=2){
			title.textContent = "Game Over !!";
			title.style.color = "red";
			scoreVal.textContent = "00";
			turnRed();
			console.log('game over');
		}

	})
}


for(var i=0;i<square.length;i++){
	square[i].addEventListener("click",function(){
		var index = this.textContent;
		console.log(index);
		var x = Math.floor(index/10);
		var y = index%10;
		console.log(x);
		console.log(y);
		console.log(grid[x][y]);
		if(grid[x][y]===-1){
			title.textContent = "Game Over !!";
			title.style.color = "red";
			scoreVal.textContent = "00";
			turnRed();
			console.log('game over');
		}
		else if(grid[x][y]===0){
			dfs(x,y);
			scoreVal.textContent = score.toString();
		}

	})
}


