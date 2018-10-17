const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const blackCellColor="#595959";
const whiteCellColor="white";
const activeColor="#237716";
let clickX;
let clickY;
let prevActiveCell;
let cellCanMove;
let cellWidth=canvas.clientWidth/8;
let cellHeight=canvas.clientHeight/8;
let chessPlate=
[A1={},B1={},C1={},D1={},E1={},F1={},G1={},H1={},      
 A2={},B2={},C2={},D2={},E2={},F2={},G2={},H2={},
 A3={},B3={},C3={},D3={},E3={},F3={},G3={},H3={},
 A4={},B4={},C4={},D4={},E4={},F4={},G4={},H4={},
 A5={},B5={},C5={},D5={},E5={},F5={},G5={},H5={},
 A6={},B6={},C6={},D6={},E6={},F6={},G6={},H6={},  
 A7={},B7={},C7={},D7={},E7={},F7={},G7={},H7={},
 A8={},B8={},C8={},D8={},E8={},F8={},G8={},H8={},          
]
console.log("start");
drawField();

setInterval(ping,100);
function drawField()
{

let offsetX=0;
let isBlack=true;
let whiteCellFirst=false;
let offsetY=canvas.clientHeight-cellHeight;
for (let i=0;i<64;i++)
{
    chessPlate[i].isActive=false;
    chessPlate[i].figure=null;
    if(offsetX>=canvas.clientWidth)
    {
        if(whiteCellFirst==true)
        {
            offsetX=0;
            whiteCellFirst=false;
        }
        else{
        offsetX=0;
        whiteCellFirst=true;
        }
        
        offsetY-=cellHeight;
    }
    chessPlate[i].coords={x:offsetX+cellWidth, y:offsetY+cellHeight};
if(isBlack)
{
    if(whiteCellFirst)
    {
        ctx.fillStyle = whiteCellColor;
        chessPlate[i].color="white";  
        
    }
    else
    {
        ctx.fillStyle = blackCellColor;
        chessPlate[i].color="black";
    }

ctx.fillRect(offsetX, offsetY, cellWidth,cellHeight);
isBlack=false;
}
else
{
    if(whiteCellFirst)
    {
        ctx.fillStyle=blackCellColor;
        chessPlate[i].color="black";
    }
    else
    {
        ctx.fillStyle = whiteCellColor;
        chessPlate[i].color="white";   
    }
ctx.fillRect(offsetX, offsetY, cellWidth,cellHeight);
isBlack=true;
}
offsetX+=cellWidth;

}
drawText();

}
function drawFigures()
{
    for(let i=0; i<chessPlate.length; i++)
    {
        if(chessPlate[i].figure!=null)
        {
            chessPlate[i].figure.draw();
        }
    }
}
function drawText(){
    ctx.font = "30px Arial";
    ctx.fillStyle = "green";
    let letter;
    for(let i=0; i<8;i++)
    {
        switch(i)
        {
            case 0:letter="A";break;
            case 1:letter="B";break;
            case 2:letter="C";break;
            case 3:letter="D";break;
            case 4:letter="E";break;
            case 5:letter="F";break;
            case 6:letter="G";break;
            case 7:letter="H";break; 
        }
    ctx.strokeText(letter,chessPlate[i].coords.x-cellWidth+50,chessPlate[i].coords.y);
    ctx.fillText(letter,chessPlate[i].coords.x-cellWidth+50,chessPlate[i].coords.y);
    }
    let counter=0;
    ctx.font = "30px Arial";
    ctx.fillStyle = "green";
    
    for(let i=0; i<7;i++)
    {
            
            ctx.strokeText(i+1,chessPlate[counter].coords.x-cellWidth,chessPlate[counter].coords.y); 
            ctx.fillText(i+1,chessPlate[counter].coords.x-cellWidth,chessPlate[counter].coords.y);
            counter+=8;
            
            
    }
    ctx.strokeText(8,chessPlate[56].coords.x-cellWidth,chessPlate[56].coords.y); 
    ctx.fillText(8,chessPlate[56].coords.x-cellWidth,chessPlate[56].coords.y);
    }
function cellClick()
{
function clearCells()
{
     if(prevActiveCell.color=="white")
        {
            ctx.fillStyle = whiteCellColor;
        }
       else
       {
        ctx.fillStyle = blackCellColor;
       }
}
    
for(let i=0;i<chessPlate.length;i++)
{
if(clickX>=chessPlate[i].coords.x-cellWidth && clickX <= chessPlate[i].coords.x && clickY<=chessPlate[i].coords.y && clickY>=chessPlate[i].coords.y-cellHeight) 
{
    if(prevActiveCell!=undefined)
    {
       clearCells();

       if(prevActiveCell.figure!=null)
       {
       cellCanMove=true;
       }
       if(cellCanMove && chessPlate[i].figure==null && prevActiveCell!=undefined )
       {
        chessPlate[i].figure=prevActiveCell.figure;
        chessPlate[i].figure.x=chessPlate[i].coords.x;
        chessPlate[i].figure.y=chessPlate[i].coords.y;
        prevActiveCell.figure=null;
        console.log(chessPlate[i].figure);
        clearCells(); 
        drawFigures();
        
        cellCanMove=false;
       }

       ctx.fillRect(prevActiveCell.coords.x-cellWidth, prevActiveCell.coords.y-cellHeight, cellWidth,cellHeight);
       prevActiveCell.isActive=false;
       

      
       
    }
    prevActiveCell=chessPlate[i];
    ctx.fillStyle = activeColor;
    ctx.fillRect(chessPlate[i].coords.x-cellWidth, chessPlate[i].coords.y-cellHeight, cellWidth,cellHeight);  
    chessPlate[i].isActive=true;
    if(cellCanMove==false)
    {
        //prevActiveCell=undefined;
        if(chessPlate[i].color=="white")
        {
        ctx.fillStyle =whiteCellColor;  
        }
        else
        {
        ctx.fillStyle=blackCellColor;
        }

        ctx.fillRect(chessPlate[i].coords.x-cellWidth, chessPlate[i].coords.y-cellHeight, cellWidth,cellHeight);  
    }
    drawText();
    drawFigures();
    console.log(cellCanMove)
    
}
}
}

canvas.addEventListener('click', function(event) {
    let rect = canvas.getBoundingClientRect();
    clickX = event.clientX - rect.left;
    clickY = event.clientY - rect.top;
   // console.log("x: " +  clickX + " y: " + clickY); 
    cellClick()
}, false);


function ping()
{
   // console.log('ping')
   let r;
   r++;
}
class Rook 
{
draw(x,y)
{
ctx.drawImage(this.sprite,this.x-cellWidth,this.y-cellHeight, cellWidth, cellHeight);

}

constructor(color, square)
{
    
this.sprite=new Image();   
this.color=color;
this.x=square.coords.x;
this.y=square.coords.y;
if(this.color=="white")
{
    this.sprite=new Image();
    this.sprite.src="img/whiteRook.png";
    
}
else
{
    this.sprite=new Image();
    this.sprite.src="img/blackRook.png";
}
square.figure=this;
this.draw(this.x-cellWidth,this.y-cellHeight);

}

    
}
function setFigures()
{

let whiteRook=new Rook("white", chessPlate[0]);
let whiteRook2=new Rook("white", chessPlate[7]);
let blackRook=new Rook("black", chessPlate[63]);
let blackRook2=new Rook("black", chessPlate[56]);



setTimeout(drawFigures,100)


}
setFigures();
