let rows, cols;
let scl = 20;
let w , h;

let flying = 0;

let terrain;

function setup(){
  createCanvas(windowWidth, windowHeight, WEBGL);
  w = width + 900;
  h = height + 1200;
  
  cols = Math.floor(w / scl);
  rows = Math.floor(h /scl);
  
  terrain = create2DArray(cols, rows);
}

function draw(){
  
  flying -= 0.1;
  let yoffset = flying;
  
  for(let y = 0; y < rows; y++){
    let xoffset = 0;
    for(let x = 0; x < cols; x++){
      terrain[x][y] = map(noise(xoffset, yoffset), 0, 1, -100, 100);
      xoffset += 0.15;
    }
    yoffset += 0.15;
  }
  
  background(0);
  stroke(255);
  noFill();
   
  translate(0, height/2, 0);
  rotateX(PI/3);
  
  translate(-w/2, -h/2);
  
  for(let y = 0; y < rows-1; y++){
    beginShape(TRIANGLE_STRIP);
    for(let x = 0; x < cols; x++){
        vertex(x*scl,y*scl, terrain[x][y]);
        vertex(x*scl,(y+1)*scl, terrain[x][y+1]);
    }
    endShape();
  }

}

function create2DArray(cols, rows){
  let arr = new Array(cols);
  for(let i = 0; i < arr.length; i++){
    arr[i] = new Array(rows);
  }
  return arr;
}