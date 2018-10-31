const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const blackCellColor="#595959";
const whiteCellColor="white";
const activeColor="#237716";
let clickX;
let turn="white";
let clickY;
let whiteKing;
let blackKing;
let kingColor;
let winCheckKingColor;
let nextCell;
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
    chessPlate[i].number=i;
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
    
    chessPlate[i].isActive=true;
    if(chessPlate[i].figure!=null && chessPlate[i].isActive)
    {
    cellCanMove=true;
    }
    if(prevActiveCell!=undefined)
    {
       clearCells();
       nextCell=chessPlate[i];
       
       if(cellCanMove && prevActiveCell!=undefined&& prevActiveCell.figure!=null &&prevActiveCell.figure.move()==true && turn==prevActiveCell.figure.color )
        { 
        if(chessPlate[i].figure==null || chessPlate[i].figure.color!=prevActiveCell.figure.color )
        {        
            if(turn=="white")
            {
                kingColor=whiteKing;
                winCheckKingColor=blackKing;
            }  
            else
            {
                kingColor=blackKing;
                winCheckKingColor=whiteKing;
            }
                let tempFigure=prevActiveCell.figure;
                let tempFigure2=chessPlate[i].figure;
                let tempX=prevActiveCell.coords.x;
                let tempY=prevActiveCell.coords.y;
                let tempSquare=prevActiveCell.figure.square;
                let tempMoveMade=prevActiveCell.figure.moveMade;
                chessPlate[i].figure=prevActiveCell.figure;
                chessPlate[i].figure.x=chessPlate[i].coords.x;
                chessPlate[i].figure.y=chessPlate[i].coords.y;
                chessPlate[i].figure.square=chessPlate[i];
                prevActiveCell.figure=null;
                chessPlate[i].figure.moveMade=true;  
                if(winCheckKingColor.mate()!=true)
        {
            ctx.font = "100px Arial";
            ctx.fillStyle = "green";
            ctx.strokeText(kingColor.color+' win',canvas.clientWidth/2-cellWidth*2,canvas.clientHeight/2);
            ctx.fillText(kingColor.color  +' win',canvas.clientWidth/2-cellWidth*2,canvas.clientHeight/2);
        }
                if(kingColor.checkMate(false)==false)
                {    
                    prevActiveCell.figure=tempFigure;
                    prevActiveCell.figure.moveMade=tempMoveMade;
                    prevActiveCell.figure.x=tempX;
                    prevActiveCell.figure.y=tempY;
                    prevActiveCell.figure.square=tempSquare
                    chessPlate[i].figure=tempFigure2;
                }
                else
                {
                    if(turn=="white")
        {
            turn="black";
        }
        else
        {
            turn="white";
        } 
        cellCanMove=false;
       
                }
        
        }       
        
       }
      else if(cellCanMove && prevActiveCell!=undefined&& prevActiveCell.figure!=null &&prevActiveCell.figure.type==1 && 
        turn==prevActiveCell.figure.color && chessPlate[i].figure.color==prevActiveCell.figure.color && prevActiveCell.figure.moveMade==false && chessPlate[i].figure.moveMade==false && prevActiveCell!=chessPlate[i] )
       {
        console.log("castling");
        if(turn=="white")
        {
            kingColor=whiteKing;
            winCheckKingColor=blackKing;
        }  
        else
        {
            kingColor=blackKing;
            winCheckKingColor=whiteKing;
        }
        let tempFigure=prevActiveCell.figure;
        let tempFigure2=chessPlate[i].figure;
        let tempX=prevActiveCell.coords.x;
        let tempY=prevActiveCell.coords.y;
        let tempSquare=prevActiveCell.figure.square;
        let tempSquare2=chessPlate[i].figure.square;
        let tempX2=chessPlate[i].coords.x;
        let tempY2=chessPlate[i].coords.y;
        let tempMoveMade1=prevActiveCell.figure.moveMade;
        let tempMoveMade2=chessPlate[i].figure.moveMade;
        if(prevActiveCell.figure.color=="white") // white castling
        {
        if(prevActiveCell.figure.x>chessPlate[i].figure.x && chessPlate[1].figure==null && chessPlate[2].figure==null &&  chessPlate[3].figure==null ) // white long castling
        {
        chessPlate[3].figure=tempFigure2;
        chessPlate[3].figure.x=chessPlate[3].coords.x;
        chessPlate[3].figure.y=chessPlate[3].coords.y;
        chessPlate[3].figure.square=chessPlate[3];
        chessPlate[3].figure.moveMade=true;
        chessPlate[i].figure=null;
        chessPlate[2].figure=tempFigure;
        chessPlate[2].figure.x=chessPlate[2].coords.x;
        chessPlate[2].figure.y=chessPlate[2].coords.y;
        chessPlate[2].figure.square=chessPlate[2];
        chessPlate[2].figure.moveMade=true;  
        prevActiveCell.figure=null;
        castlingCheck();
        }  
        else if(prevActiveCell.figure.x<chessPlate[i].figure.x && chessPlate[5].figure==null && chessPlate[6].figure==null ) // white short castling
        {
        chessPlate[5].figure=tempFigure2;
        chessPlate[5].figure.x=chessPlate[5].coords.x;
        chessPlate[5].figure.y=chessPlate[5].coords.y;
        chessPlate[5].figure.square=chessPlate[5];
        chessPlate[5].figure.moveMade=true;  
        chessPlate[i].figure=null;
        chessPlate[6].figure=tempFigure;
        chessPlate[6].figure.x=chessPlate[6].coords.x;
        chessPlate[6].figure.y=chessPlate[6].coords.y;
        chessPlate[6].figure.square=chessPlate[6];
        chessPlate[6].figure.moveMade=true;  
        prevActiveCell.figure=null;
        castlingCheck();
        }   
        }
        else //black castling
        {
        if(prevActiveCell.figure.x>chessPlate[i].figure.x && chessPlate[58].figure==null && chessPlate[59].figure==null &&  chessPlate[57].figure==null ) //black long castling
        {
        chessPlate[59].figure=tempFigure2;
        chessPlate[59].figure.x=chessPlate[59].coords.x;
        chessPlate[59].figure.y=chessPlate[59].coords.y;
        chessPlate[59].figure.square=chessPlate[59];
        chessPlate[59].figure.moveMade=true;
        chessPlate[i].figure=null;
        chessPlate[58].figure=tempFigure;
        chessPlate[58].figure.x=chessPlate[58].coords.x;
        chessPlate[58].figure.y=chessPlate[58].coords.y;
        chessPlate[58].figure.square=chessPlate[58];
        chessPlate[58].figure.moveMade=true;  
        prevActiveCell.figure=null;
        castlingCheck();
        }  
        else if(prevActiveCell.figure.x<chessPlate[i].figure.x && chessPlate[61].figure==null && chessPlate[62].figure==null ) // black short castling
        {
        chessPlate[61].figure=tempFigure2;
        chessPlate[61].figure.x=chessPlate[61].coords.x;
        chessPlate[61].figure.y=chessPlate[61].coords.y;
        chessPlate[61].figure.square=chessPlate[61];
        chessPlate[61].figure.moveMade=true;  
        chessPlate[i].figure=null;
        chessPlate[62].figure=tempFigure;
        chessPlate[62].figure.x=chessPlate[62].coords.x;
        chessPlate[62].figure.y=chessPlate[62].coords.y;
        chessPlate[62].figure.square=chessPlate[62];
        chessPlate[62].figure.moveMade=true;  
        prevActiveCell.figure=null;
        castlingCheck();
        } 
        }
 function castlingCheck()
 {
    if(winCheckKingColor.mate()!=true)
    {
        ctx.font = "100px Arial";
        ctx.fillStyle = "green";
        ctx.strokeText(kingColor.color+' win',canvas.clientWidth/2-cellWidth*2,canvas.clientHeight/2);
        ctx.fillText(kingColor.color  +' win',canvas.clientWidth/2-cellWidth*2,canvas.clientHeight/2);
    }
            if(kingColor.checkMate(false)==false)
            {    
                prevActiveCell.figure=tempFigure;
                prevActiveCell.figure.x=tempX;
                prevActiveCell.figure.y=tempY;
                prevActiveCell.figure.square=tempSquare;
                prevActiveCell.figure.moveMade=tempMoveMade1;
                chessPlate[i].figure=tempFigure2;
                chessPlate[i].figure.x=tempX2;
                chessPlate[i].figure.y=tempY2;
                chessPlate[i].figure.square=tempSquare2;
                chessPlate[i].figure.moveMade=tempMoveMade2;
                
            }
            else
            {
                if(turn=="white")
    {
        turn="black";
    }
    else
    {
        turn="white";
    } 
    cellCanMove=false;
    
            }
 }
        
       }


       drawFigures();



       ctx.fillRect(prevActiveCell.coords.x-cellWidth, prevActiveCell.coords.y-cellHeight, cellWidth,cellHeight);
       prevActiveCell.isActive=false;
       

      
       
    }
    prevActiveCell=chessPlate[i];
    ctx.fillStyle = activeColor;
    ctx.fillRect(chessPlate[i].coords.x-cellWidth, chessPlate[i].coords.y-cellHeight, cellWidth,cellHeight);  
   
    if(cellCanMove==false)
    {
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
  
    
}
}
}

canvas.addEventListener('click', function(event) {
    let rect = canvas.getBoundingClientRect();
    clickX = event.clientX - rect.left;
    clickY = event.clientY - rect.top;
  
    cellClick()
}, false);


function ping()
{
 
   let r;
   r++;
}
class Figure 
{
draw(x,y)
{
ctx.drawImage(this.sprite,this.x-cellWidth,this.y-cellHeight, cellWidth, cellHeight);
}
constructor(color, square)
{     
this.color=color;
this.square=square;
this.x=square.coords.x;
this.y=square.coords.y;
this.moveMade=false;
this.type=0;
}    
}
class Rook extends Figure
{
    constructor(color, square)
    {
        super(color, square);
        square.figure=this;
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
this.draw(this.x-cellWidth,this.y-cellHeight);
    }
   move(kingX, kingY, mate)
   {
        this.nextX=nextCell.coords.x;
        this.nextY=nextCell.coords.y;
        this.nextCell=nextCell;
        if(kingX!=undefined && kingY!=undefined)
        {
            if(mate)
            {
            this.nextCell=winCheckKingColor.square;
            }
            else
            {
            this.nextCell=kingColor.square;
            }
           
        this.nextX=kingX;
        this.nextY=kingY;
        }   
   if(this.x==this.nextX|| this.y==this.nextY)
   {

   
       let checkX=[]
       if(this.x==this.nextX)
       {
       if(this.y>=this.nextY)
       {
        for(let i=this.square.number+8; i<this.nextCell.number; i+=8)
        {
         checkX.push(chessPlate[i]);
        }
       if(checkX.every(elem=>elem.figure==null)==true || checkX.length==0)
       {
         checkX=[]
         return true; 
       }
       else
       {
           return false;
       }
       }
       else
       {
        for(let i=this.square.number-8; i>this.nextCell.number; i-=8)
        {
         checkX.push(chessPlate[i]);
        }
       if(checkX.every(elem=>elem.figure==null)==true)
       {
         checkX=[]
         return true; 
       }
       else
       {
           return false;
       }
       }
    }
    else
    {
        if(this.x<=this.nextX)
        {
        for(let i=this.square.number+1; i<this.nextCell.number; i++)
        {
         checkX.push(chessPlate[i]);
        }
        if(checkX.every(elem=>elem.figure==null)==true || checkX.length==0)
        {
          checkX=[]
          return true; 
        }
        else
        {
            return false;
        }
    }
    else
    {
        for(let i=this.square.number-1; i>this.nextCell.number; i--)
        {
         checkX.push(chessPlate[i]);
        }
        if(checkX.every(elem=>elem.figure==null)==true || checkX.length==0)
        {
          checkX=[]
          return true; 
        }
        else
        {
            return false;
        }
    }
    }

} 
    else 
    {
        return false;
    }
   }
    
}
class Bishop extends Figure
{
    constructor(color, square)
    {
        super(color, square);
        square.figure=this;
if(this.color=="white")
{
    this.sprite=new Image();
    this.sprite.src="img/whiteBishop.png";
    
}
else
{
    this.sprite=new Image();
    this.sprite.src="img/blackBishop.png";
}
this.draw(this.x-cellWidth,this.y-cellHeight);
    }
    move(kingX, kingY, mate)
    {
        this.nextX=nextCell.coords.x;
        this.nextY=nextCell.coords.y;
        this.nextCell=nextCell;
        if(kingX!=undefined && kingY!=undefined)
        {
        this.nextX=kingX;
        this.nextY=kingY
        if(mate)
        {
        this.nextCell=winCheckKingColor.square;
        }
        else
        {
        this.nextCell=kingColor.square;
        }
       
        }
        this.square=prevActiveCell;
        this.dX=Math.abs(this.nextX-this.x);
        this.dY=Math.abs(this.nextY-this.y);
        if(this.dX==this.dY)
        {
            let checkX=[]
            if(this.y>=this.nextY)
            {

            
            if(this.x<=this.nextX)
            {
             for(let i=this.square.number+9; i<this.nextCell.number; i+=9)
             {
                checkX.push(chessPlate[i]);
             }
            if(checkX.every(elem=>elem.figure==null)==true)
            {
              
              checkX=[]
              return true; 
            }
            }
            else
            {
            for(let i=this.square.number+7; i<this.nextCell.number; i+=7)
             {
             checkX.push(chessPlate[i]);
             }
             if(checkX.every(elem=>elem.figure==null)==true)
             {
            
             checkX=[]
             return true;    
            }
        }
        }
        else
        {
            if(this.x<=this.nextX)
            {
             for(let i=this.square.number-7; i>this.nextCell.number; i-=7)
             {
                checkX.push(chessPlate[i]);
             }
            if(checkX.every(elem=>elem.figure==null)==true)
            {
                
              checkX=[]
              return true; 
            }
            }
            else
            {
            for(let i=this.square.number-9; i>this.nextCell.number; i-=9)
             {
             checkX.push(chessPlate[i]);
             }
             if(checkX.every(elem=>elem.figure==null)==true)
             {
          
             checkX=[]
             return true;    
            }

         

        }
        }
    }
        else
        {
            return false;
        }
    }     
}

class Queen extends Figure
{
    constructor(color, square)
    {
        super(color, square);
        square.figure=this;
if(this.color=="white")
{
    this.sprite=new Image();
    this.sprite.src="img/whiteQueen.png";
    
}
else
{
    this.sprite=new Image();
    this.sprite.src="img/blackQueen.png";
}
this.draw(this.x-cellWidth,this.y-cellHeight);
    }
    move(kingX, kingY, mate)
    {
        this.nextX=nextCell.coords.x;
        this.nextY=nextCell.coords.y;
        this.nextCell=nextCell;
        if(kingX!=undefined && kingY!=undefined )
        {
        this.nextX=kingX;
        this.nextY=kingY;
        if(mate==true)
        {
        this.nextCell=winCheckKingColor.square;
        }
        else
        {
        this.nextCell=kingColor.square
        }
        }
      // else{
       //  this.square=prevActiveCell;
      //  }
        
        this.dX=Math.abs(this.nextX-this.x);
        this.dY=Math.abs(this.nextY-this.y);

        if(this.x==this.nextX||this.y==this.nextY || this.dX==this.dY)
        {
            let moveType;
            //1-straight     2-curve
            if(this.x==this.nextX||this.y==this.nextY)
            {
                moveType=1;
            }
            else
            {
                moveType=2;
            }
        if(moveType==1)
      {
        let checkX=[]
        if(this.x==this.nextX)
        {
        if(this.y>=this.nextY)
        {
         for(let i=this.square.number+8; i<=this.nextCell.number-8; i+=8)   // for(let i=this.square.number+8; i<this.nextCell.number; i+=8) 
         {
          checkX.push(chessPlate[i]);
         }
        if(checkX.every(elem=>elem.figure==null)==true )
        {
          checkX=[]
          return true; 
        }
        else
        {
            return false;
        }
        }
        else
        {
         for(let i=this.square.number-8; i>=this.nextCell.number+8; i-=8) //for(let i=this.square.number-8; i>this.nextCell.number; i-=8)
         {
          checkX.push(chessPlate[i]);
         }
        if(checkX.every(elem=>elem.figure==null)==true )
        {
          checkX=[]
          return true; 
        }
        else
        {
            return false;
        }
        }
     }
     else
     {
         if(this.x<=this.nextX)
         {
         for(let i=this.square.number+1; i<this.nextCell.number; i++)
         {
          checkX.push(chessPlate[i]);
         }
         if(checkX.every(elem=>elem.figure==null)==true )
         {
           checkX=[]
           return true; 
         }
         else
         {
             return false;
         }
     }
     else
     {
         for(let i=this.square.number-1; i>this.nextCell.number; i--)
         {
          checkX.push(chessPlate[i]);
         }
         if(checkX.every(elem=>elem.figure==null)==true )
         {
           checkX=[]
           return true; 
         }
         else
         {
             return false;
         }
     }
     }
      } 
        else
        {
            let checkX=[]
            if(this.y>=this.nextY)
            {

            
            if(this.x<=this.nextX)
            {
             for(let i=this.square.number+9; i<this.nextCell.number; i+=9)
             {
                checkX.push(chessPlate[i]);
             }
            if(checkX.every(elem=>elem.figure==null)==true )
            {
             
              checkX=[]
              return true; 
            }
            else
            {
                return false;
            }
            }
            else
            {
            for(let i=this.square.number+7; i<this.nextCell.number; i+=7)
             {
             checkX.push(chessPlate[i]);
             }
             if(checkX.every(elem=>elem.figure==null)==true )
             {
            
             checkX=[]
             return true;    
            }
            else
            {
                return false;
            }
        }
        }
        else
        {
            if(this.x<=this.nextX)
            {
             for(let i=this.square.number-7; i>this.nextCell.number; i-=7)
             {
                checkX.push(chessPlate[i]);
             }
            if(checkX.every(elem=>elem.figure==null)==true )
            {
               
              checkX=[]
              return true; 
            }
            else
            {
                return false;
            }
            }
            else
            {
            for(let i=this.square.number-9; i>this.nextCell.number; i-=9)
             {
             checkX.push(chessPlate[i]);
             }
             if(checkX.every(elem=>elem.figure==null)==true )
             {
            
             checkX=[]
             return true;    
            }
            else
            {
                return false;
            }

            

        }
        }
        }
    }
        else
        {
            return false;
        }
    }
}

class Knight extends Figure
{
    constructor(color, square)
    {
        super(color, square);
        square.figure=this;
if(this.color=="white")
{
    this.sprite=new Image();
    this.sprite.src="img/whiteKnight.png";
    
}
else
{
    this.sprite=new Image();
    this.sprite.src="img/blackKnight.png";
}
this.draw(this.x-cellWidth,this.y-cellHeight);
    }
    move(kingX, kingY, mate)
    {
        this.nextX=nextCell.coords.x;
        this.nextY=nextCell.coords.y;
        if(kingX!=undefined && kingY!=undefined)
        {
        this.nextX=kingX;
        this.nextY=kingY;
        if(mate)
        {
        this.nextCell=winCheckKingColor.square;
        }
        else
        {
        this.nextCell=kingColor.square;
        }
       
        }
        this.dX=Math.abs(this.nextX-this.x);
        this.dY=Math.abs(this.nextY-this.y);
        if(this.dX==cellWidth*2 && this.dY==cellHeight|| this.dX==cellWidth && this.dY==cellHeight*2)
        {
            return true;
        }
        else
        {
            return false;
        }
    }
}

class King extends Figure
{
    constructor(color, square)
    {
        super(color, square);
        square.figure=this;
        this.type=1;
if(this.color=="white")
{
    this.sprite=new Image();
    this.sprite.src="img/whiteKing.png";
    
}
else
{
    this.sprite=new Image();
    this.sprite.src="img/blackKing.png";
}
this.draw(this.x-cellWidth,this.y-cellHeight);
    }
    move(kingX, kingY, mate)
    {
        this.nextX=nextCell.coords.x;
        this.nextY=nextCell.coords.y;
        if(kingX!=undefined && kingY!=undefined )
        {
        this.nextX=kingX;
        this.nextY=kingY;
        if(mate)
        {
        this.nextCell=winCheckKingColor.square;
        }
        else
        {
        this.nextCell=kingColor.square;
        }
        }
        this.dX=Math.abs(this.nextX-this.x);
        this.dY=Math.abs(this.nextY-this.y);
        if(this.x==this.nextX && this.dY==cellHeight ||this.y==this.nextY &&this.dX==cellWidth ||this.dY==this.dY && this.dX==cellWidth && this.dY==cellHeight)
        {
            return true;
        }
        else
        {
            return false;
        }
    }
    checkMate(mate)
    {
      
            let check=[];
        for(let i=0;i<chessPlate.length;i++)
        {
        if(chessPlate[i].figure!=null && chessPlate[i].figure.color!=this.color)
        {
            check.push(chessPlate[i])
        }
        }
        if(check.every(elem=>elem.figure.move(this.x, this.y, mate)==false)==true)
        {
            return true;
        }
        else
        {
            return false;
        }
      
}
mate()
{
    let check=[];
    for(let i=0;i<chessPlate.length;i++)
    {
    if(chessPlate[i].figure!=null && chessPlate[i].figure.color==this.color)
    {
        check.push(chessPlate[i]);
    }
    }
    for(let i=0;i<check.length;i++)
    {
        for(let j=0;j<chessPlate.length;j++)
        {
            if(check[i].figure.move(chessPlate[j].coords.x, chessPlate[j].coords.y, true)==true )
            {
                let tempFigure=check[i].figure;
                let tempFigure2=chessPlate[j].figure;
                let tempX=check[i].coords.x;
                let tempY=check[i].coords.y;
                let tempSquare=check[i].figure.square;
                chessPlate[j].figure=check[i].figure;
                chessPlate[j].figure.x=chessPlate[j].coords.x;
                chessPlate[j].figure.y=chessPlate[j].coords.y;
                chessPlate[j].figure.square=chessPlate[j];
                check[i].figure=null;
                if(this.checkMate(true)==true)
                {
                    check[i].figure=tempFigure;
                   check[i].figure.x=tempX;
                   check[i].figure.y=tempY;
                   check[i].figure.square=tempSquare;
                    chessPlate[j].figure=tempFigure2;
                   
                    return true;
                }
                
                else 
                {    
                    
                   check[i].figure=tempFigure;
                   check[i].figure.x=tempX;
                  check[i].figure.y=tempY;
                  check[i].figure.square=tempSquare;
                  chessPlate[j].figure=tempFigure2;
                  // check=[];
                    continue;
                } 
        }
       else
       {
          continue;
       }
        }
    
}
}
}

class Pawn extends Figure
{
    constructor(color, square)
    {
        super(color, square);
        square.figure=this;
        this.startY=this.y;
if(this.color=="white")
{
    this.sprite=new Image();
    this.sprite.src="img/whitePawn.png";
    
}
else
{
    this.sprite=new Image();
    this.sprite.src="img/blackPawn.png";
}
this.draw(this.x-cellWidth,this.y-cellHeight);
    }
    move(kingX,kingY, mate)
    {
        this.nextX=nextCell.coords.x;
        this.nextY=nextCell.coords.y;
        this.nextCell=nextCell;
        if(kingX!=undefined && kingY!=undefined) 
        {
        this.nextX=kingX;
        this.nextY=kingY
        if(mate)
        {
        this.nextCell=winCheckKingColor.square;
        }
        else
        {
        this.nextCell=kingColor.square;
        }
       
        }
      //  this.dY=Math.abs(this.nextY-this.y)
      this.dY=this.y-this.nextY;
       // this.square=prevActiveCell;
        if(this.color=="white" && this.x==this.nextX && this.nextCell.figure==null)
        {
            if(this.y==this.startY )
            {
                if(this.dY<=cellHeight*2)
                {
                    this.dY=0;
                    return true;
                }
                else
                {
                    return false;
                }
            }
            else
            {
                if(this.dY==cellHeight)
                {
                    this.dY=0;
                    return true;
                }
                else
            {
                return false;
            }
            }
        }
        else if(this.color=="white" && this.dY==cellHeight && this.nextCell.figure!=null && this.nextX==this.x+cellWidth ||this.color=="white" && this.dY==cellHeight && this.nextCell.figure!=null && this.nextX==this.x-cellWidth)
        {

            return true;
        }
        else if(this.color=="black" && this.x==this.nextX && this.nextCell.figure==null)
        {
            if(this.y==this.startY )
            {
                if(this.dY>=-cellHeight*2)
                {
                    this.dY=0;
                    return true;
                }
                else
                {
                    return false;
                }
            }
            else
            {
                if(this.dY==-cellHeight)
                {
                    this.dY=0;
                    return true;
                }
                else
                {
                    return false;
                }
            }
        }
        else if(this.color=="black"  && this.dY==-cellHeight&&this.nextCell.figure!=null && this.nextX==this.x+cellWidth || this.color=="black"&&this.dY==-cellHeight  && this.nextCell.figure!=null &&this.nextX==this.x-cellWidth)
        {
            this.dY=0;
            return true;
        }
        else
        {
            this.dY=0;
            return false;
        }
    }
}


    

function setFigures()
{
    if(false)
    {

    
let whiteRook=new Rook("white", chessPlate[0]);
let whiteRook2=new Rook("white", chessPlate[7]);
let blackRook=new Rook("black", chessPlate[63]);
let blackRook2=new Rook("black", chessPlate[56]);
let whiteBishop=new Bishop("white", chessPlate[2]);
let whiteBishop2=new Bishop("white", chessPlate[5]);
let blackBishop=new Bishop("black", chessPlate[61]);
let blackBishop2=new Bishop("black", chessPlate[58]);
let whiteQueen=new Queen("white", chessPlate[3]);
let blackQueen=new Queen("black", chessPlate[59]);
let whiteKnight=new Knight("white", chessPlate[1]);
let whiteKnight2=new Knight("white", chessPlate[6]);
let blackKnight=new Knight("black", chessPlate[62]);
let blackKnight2=new Knight("black", chessPlate[57]);
whiteKing=new King("white", chessPlate[4]);
blackKing=new King("black", chessPlate[60]);
//let whitePawn= new Pawn("white", chessPlate[8])
//let whitePawn2= new Pawn("white", chessPlate[9])
//let whitePawn3= new Pawn("white", chessPlate[10])
//let whitePawn4= new Pawn("white", chessPlate[11])
//let whitePawn5= new Pawn("white", chessPlate[12])
let whitePawn6= new Pawn("white", chessPlate[13])
let whitePawn7= new Pawn("white", chessPlate[14])
let whitePawn8= new Pawn("white", chessPlate[15])
let blackPawn= new Pawn("black",chessPlate[55])
let blackPawn2= new Pawn("black",chessPlate[54])
let blackPawn3= new Pawn("black",chessPlate[53])
//let blackPawn4= new Pawn("black",chessPlate[52])
//let blackPawn5= new Pawn("black",chessPlate[51])
//let blackPawn6= new Pawn("black",chessPlate[50])
//let blackPawn7= new Pawn("black",chessPlate[49])
//let blackPawn8= new Pawn("black",chessPlate[48])
    }
if(true)
{


whiteKing=new King("white", chessPlate[4]);
blackKing=new King("black", chessPlate[60]);
let blackRook=new Rook("black", chessPlate[63]);
let blackRook2=new Rook("black", chessPlate[56]);
let whiteQueen=new Queen("white", chessPlate[3]);
let whiteRook=new Rook("white", chessPlate[0]);
let whiteRook2=new Rook("white", chessPlate[7]);
let blackKnight=new Knight("black", chessPlate[62]);
let blackKnight2=new Knight("black", chessPlate[57]);
let blackBishop=new Bishop("black", chessPlate[61]);
let blackBishop2=new Bishop("black", chessPlate[58]);
let blackQueen=new Queen("black", chessPlate[59]);
}
setTimeout(drawFigures,100)
}
setFigures();
