"use strict";

let name = prompt("What is your name?", 'Guest');

const tableNamePlayer = name;
const tableNameComputer = "Computer";

alert(`Dear ${tableNamePlayer}, before start, fill your sheeps, please.`);

let coordsOfSheepsPlayer = new Map();
let coordsOfSheepsComputer = new Map();

let buttonName = `Press to start.`;
let gameStarted = false;
let gameEnd = false;
let computer = [];
let player = [];
for (let i=0; i<100; i++){
  computer.push(0);
  player.push(0);
}

  function makeTable(classOfCells){
    let table = '';
    table+="<table>";
    for (let i=0; i<10; i++){
      table+="<tr>";
      for (let j=0; j<10; j++){
        table+=`<td onclick=walk(this.id) id=${classOfCells}${i}${j} onclick class=${classOfCells}></td>`;
      }
      table+="</tr>";
    }
    table+="</table>";
    return table;
  }


  function startGame(){
      if (gameEnd) {
          alert("Game is ended. Refresh this page to start again.");
  }
  else {
      if (sheepsAmount(player).join()==[80, 4, 3, 2, 1].join()) {
        alert(`Now, ${tableNamePlayer}, game is starded. You are first`);
      coordsOfSheepsPlayer = getCoordsOfSheeps(player);
      console.log(coordsOfSheepsPlayer);
      computer = setRandomSheeps(computer);
      coordsOfSheepsComputer = getCoordsOfSheeps(computer);
      console.log(coordsOfSheepsComputer);
      drawSheeps(computer, tableNameComputer);
      gameStarted = true;
        } else alert("Fill your sheeps");

    }
 }

function getAiCoords(nameOfField){
    let field = nameOfField==tableNamePlayer ? player : computer;
    for (let i=0; i<100; i++){
        if (field[i]==-1 && !getCoordsOfKilledSheep(nameOfField, i)){
            if ((i+1)%10!=0 && field[i+1] == -1){
                //horizontal
                let floor = 1;
                if ((i+1)%10!=0 && field[i+1]==-1){
                    floor = 2;
                }
                if ((i+2)%10!=0 && field[i+2]==-1){
                    floor = 3;
                }
                console.log("floor");
                console.log(floor);
                if (floor >1) {
                    let rand = Math.random()>0.5 ? 0 : 1;
                    let randCoord = [i-1+(floor+1)*rand, i-1+(floor+1)*(1-rand)];
                    console.log("randCoord");
                    console.log(randCoord);
                    if (field[randCoord[0]] >=0){
                        return randCoord[0];
                    } else return randCoord[1];
                }

            }
            if ((i+10)<100 && field[i+10] == -1){
                //vertical
                let floor = 1;
                if ((i+10)<100 && field[i+10]==-1){
                    floor = 2;
                }
                if ((i+20)<100 && field[i+20]==-1){
                    floor = 3;
                }
                console.log("floor");
                console.log(floor);
                if (floor > 1) {
                    let rand = Math.random()>0.5 ? 0 : 1;
                    let randCoord = [i-10+(floor*10+10)*rand, i-10+(floor*10+10)*(1-rand)];
                    console.log("randCoord");
                    console.log(randCoord);
                    if (field[randCoord[0]] >=0){
                        return randCoord[0];
                    } else return randCoord[1];
                }
            }
            //random
            let coords = []
            if ((i-10)>9 && (field[i-10]>=0)){
                coords.push(i-10);
            }
            if ((i+10)<100 && (field[i+10]>=0)){
                coords.push(i+10);
            }
            if ((i-1)%10!=9 && (field[i-1]>=0)){
                coords.push(i-1);
            }
            if ((i+1)%10!=0 && (field[i+1]>=0)){
                coords.push(i+1);
            }
            let random = Math.round((Math.random()*100))%coords.length;
            return coords[random];
        }
    }
    return null;
}

  function getCoordsOfKilledSheep(nameOfField, coord){
    let coordsOfSheeps = nameOfField==tableNamePlayer ? coordsOfSheepsPlayer : coordsOfSheepsComputer;
    let field = nameOfField==tableNamePlayer ? player : computer;
    let sheep = coordsOfSheeps.get(coord);
    //console.log(sheep);
    if (sheep){
      for (let i=0; i<sheep.length; i++){
        if (field[sheep[i]] == 1){
          return null;
        }
      }
      return sheep;
    } else return null;
  }

  function fillAroundOfKilledSheep(field, sampleOfSheep){
    for (let i=0; i<sampleOfSheep.length; i++){
    let center = sampleOfSheep[i];

    let left = center - 1;
    let right = center + 1;
    let up = center - 10;
    let down = center + 10;
    let leftUp = center - 11;
    let leftDown = center + 9;
    let rightUp = center - 9;
    let rightDown = center + 11;
    let leftValue = 0;
    let rightValue = 0;
    let upValue = 0;
    let downValue = 0;
    let leftUpValue = 0;
    let leftDownValue = 0;
    let rightUpValue = 0;
    let rightDownValue = 0;

    if (center%10==0){
      leftValue = -1;
    } else leftValue = field[left];

    if (center%10==9){
      rightValue = -1;
    } else rightValue = field[right];

    if (center>=0 && center<=9){
      upValue = -1;
    } else upValue = field[up];

    if (center>=90 && center<=99){
      downValue = -1;
    } else downValue = field[down];

    if (center%10==0 || (center>=0 && center<=9)){
      leftUpValue = -1;
    } else leftUpValue = field[leftUp];

    if (center%10==0 || (center>=90 && center<=99)){
      leftDownValue = -1;
    } else leftDownValue = field[leftDown];

    if (center%10==9 || (center>=0 && center<=9)){
      rightUpValue = -1;
    } else rightUpValue = field[rightUp];

    if (center%10==9 || center>=90 && center<=99){
      rightDownValue = -1;
    } else rightDownValue = field[rightDown];

        if (leftValue!=-1) {
          field[left] = -2;
        }

        if (rightValue!=-1) {
          field[right] = -2;
        }

        if (upValue!=-1) {
          field[up] = -2;
        }

        if (downValue!=-1) {
          field[down] = -2;
        }

        if (leftUpValue!=-1) {
          field[leftUp] = -2;
        }

        if (leftDownValue!=-1) {
          field[leftDown] = -2;
        }

        if (rightUpValue!=-1) {
          field[rightUp] = -2;
        }

        if (rightDownValue!=-1) {
          field[rightDown] = -2;
        }

  }
}
let numberOfWalkPlayer = 0;
function walk(idOfItem){
if (gameEnd){
    alert("Game is ended. Refresh this page to start again.");
}
else {
  if (gameStarted){
    if (idOfItem.slice(0, idOfItem.length-2)=="Computer"){
      let id = +idOfItem.slice(-2);
      if (computer[id] == 0 || computer[id] == 1){
          computer[id]-=2;
          console.log(("Player\n" + (++numberOfWalkPlayer) + ': ' + id));
          let sheep = getCoordsOfKilledSheep(tableNameComputer, id);
          if (sheep) fillAroundOfKilledSheep(computer, sheep);
          drawSheeps(computer, tableNameComputer);
          }
          else {
              alert("Restricted. Try again");
              return;
              }
      let amountOfSheeps = sheepsAmount(computer);
      let totalAmountOfSheeps = amountOfSheeps[1] + amountOfSheeps[2] + amountOfSheeps[3] + amountOfSheeps[4];
      if (totalAmountOfSheeps == 0){
          drawSheeps(computer, tableNameComputer);
          alert("You win!")
          gameStarted = false;
          gameEnd = true;
          return;
      }

      if (computer[id] == -2){
        setTimeout(walkComputer, 1000);
      }
    } else alert("Wrong field");
  } else setSheepPlayer(idOfItem);
}

}

let numberOfWalkComputer = 0;

function walkComputer() {
    let amountOfSheeps = sheepsAmount(player);
    let totalAmountOfSheeps = amountOfSheeps[1] + amountOfSheeps[2] + amountOfSheeps[3] + amountOfSheeps[4];
    if (totalAmountOfSheeps == 0) {
      alert("You lose. Computer win.");
      gameStarted = false;
      gameEnd = true;
      return;
    }
    let id = 0;
    id = getAiCoords(tableNamePlayer);
    console.log("AiCoords");
    console.log(id);
    if (id!=null) {
        player[id]-=2;
        console.log(("Computer\n" + (++numberOfWalkComputer) + ': ' + id));
        let sheep = getCoordsOfKilledSheep(tableNamePlayer, id);
        if (sheep) fillAroundOfKilledSheep(player, sheep);
        drawSheeps(player, tableNamePlayer);

        if (player[id] == -1){
            setTimeout(walkComputer, 1000);
        }
        else {
            return;
        }
    }

    if (id==null) {

        id = Math.round(Math.random()*100000)%100;
        console.log("randId" + " = " + id);

        if (player[id] >= 0) {
          player[id]-=2;
          console.log(("Computer\n" + (++numberOfWalkComputer) +': ' + id));
          let sheep = getCoordsOfKilledSheep(tableNamePlayer, id);
          if (sheep) fillAroundOfKilledSheep(player, sheep);
          drawSheeps(player, tableNamePlayer);
          if (player[id] == -1){
              setTimeout(walkComputer, 1000);
          }
          else {
              return;
          }
      }
      else {
          walkComputer();
      }
    }
}

function setRandom(){
    if (!gameStarted && !gameEnd){
        for (let i=0; i<100; i++){
            player[i] = 0;
        }
    player = setRandomSheeps(player);
    drawSheeps(player, tableNamePlayer);
    pressButtonChangeColor();
}
else {
    alert("Don't allowed.");
}
}

  function setSheepPlayer(idOfItem){

    let id = +idOfItem.slice(-2);
    let playerClone = player.slice();
    playerClone[id] = 1 - playerClone[id];
    let amountOfSheeps = sheepsAmount(player);
    if (!isOk(playerClone) || idOfItem.slice(0, idOfItem.length-2)=="Computer"){
      alert("Wrong input");
    }
    else {
      player[id] = 1 - player[id];
      drawSheeps(player, tableNamePlayer);
      if (sheepsAmount(player).join()==[80, 4, 3, 2, 1].join()){
        drawSheeps(player, tableNamePlayer);
        //alert("All your sheeps are okey, you can start the game");
      }
    }
  }

  function pressButtonChangeColor(){
  }

function printHTML(){
  let textHTML = '';
  textHTML+=`<h1>${tableNamePlayer}</h1>`;
  textHTML+=`<br><input value='Set Random sheeps' onclick="setRandom()" type='button'><br><br>`;
  textHTML+=makeTable(tableNamePlayer);
  textHTML+=`<br><input id='pressButton' value='${buttonName}' onclick="startGame()" type='button'>`;
  textHTML+=`<h1>${tableNameComputer}</h1>`;
  textHTML+=makeTable(tableNameComputer);
  document.write(textHTML);
  //initCells(tableNamePlayer);
  //initCells(tableNameComputer);
  drawSheeps(player, tableNamePlayer);
  drawSheeps(computer, tableNameComputer);
}


function setRandomSheeps(field){
  field = setRandomSheep(field, 4);
  field = setRandomSheep(field, 3);
  field = setRandomSheep(field, 3);
  field = setRandomSheep(field, 2);
  field = setRandomSheep(field, 2);
  field = setRandomSheep(field, 2);
  field = setRandomSheep(field, 1);
  field = setRandomSheep(field, 1);
  field = setRandomSheep(field, 1);
  field = setRandomSheep(field, 1);
  return field;
}

function setRandomSheep(field, n){
  loop:
  while (true) {
  let fieldClone = field.slice();
  let v = Math.random()*10;
  let h = Math.random()*(11-n);
  let position = 0;
  v = Math.ceil(v)-1;
  h = Math.ceil(h)-1;
  if (Math.random()>0.5){
    position = v*10 + h;
    for (let i=position; i<position+n; i++){
      if (fieldClone[i] == 1){
        continue loop;
      }
      fieldClone[i] = 1;
    }
  }
  else{
    position = h*10 + v;
    for (let i=position; i<position+n*10; i+=10){
      if (fieldClone[i] == 1){
        continue loop;
      }
      fieldClone[i] = 1;
    }
  }
  //console.log(fieldClone);

  if (isOk(fieldClone)){
    return fieldClone;
  }

}

}

 function drawSheeps(field, name){
   let cells = document.getElementsByClassName(name);
   for (let i=0; i<cells.length; i++){
     if (field[i]==0){
       cells[i].style.background="#A3C2F0";
     }
     if (field[i]==1 && name!=tableNameComputer){
       cells[i].style.background="#FFFFFF";
     }
     //-2 - промах
     if (field[i]==-2){
       cells[i].style.background="#929292";
     }
     //-1 - попал
     if (field[i]==-1){
       //cells[i].style.background="#FA1F1F";
       cells[i].style.background="#FF9CA2";
       cells[i].innerHTML = "<center>X</center>";
     }
   }
 }


 function isOk(field){
   for (let i=0; i<100; i++){
     let center = i;
     if (field[center] == 1){
       let left = center - 1;
       let right = center + 1;
       let up = center - 10;
       let down = center + 10;
       let leftUp = center - 11;
       let leftDown = center + 9;
       let rightUp = center - 9;
       let rightDown = center + 11;
       let leftValue = 0;
       let rightValue = 0;
       let upValue = 0;
       let downValue = 0;
       let leftUpValue = 0;
       let leftDownValue = 0;
       let rightUpValue = 0;
       let rightDownValue = 0;

       if (center%10==0){
         leftValue = null;
       } else leftValue = field[left];

       if (center%10==9){
         rightValue = null;
       } else rightValue = field[right];

       if (center>=0 && center<=9){
         upValue = null;
       } else upValue = field[up];

       if (center>=90 && center<=99){
         downValue = null;
       } else downValue = field[down];

       if (center%10==0 || (center>=0 && center<=9)){
         leftUpValue = null;
       } else leftUpValue = field[leftUp];

       if (center%10==0 || (center>=90 && center<=99)){
         leftDownValue = null;
       } else leftDownValue = field[leftDown];

       if (center%10==9 || (center>=0 && center<=9)){
         rightUpValue = null;
       } else rightUpValue = field[rightUp];

       if (center%10==9 || center>=90 && center<=99){
         rightDownValue = null;
       } else rightDownValue = field[rightDown];

       if (leftValue==1 || rightValue==1){
        if ( upValue==1 || downValue==1){
           return false;
         }
       }

      if (upValue==1 || downValue==1) {
       if ( leftValue==1 || rightValue==1){
           return false;
         }
      }

      if (leftUpValue==1 || rightUpValue==1 || leftUpValue==1 || rightDownValue==1){
        return false;
      }

     }
   }

   let amountOfSheeps = sheepsAmount(field);
  if (amountOfSheeps.length>5) return false;
  if ((amountOfSheeps[1] + amountOfSheeps[2] + amountOfSheeps[3] + amountOfSheeps[4]) >10 ) return false;
  if ((amountOfSheeps[2] + amountOfSheeps[3] + amountOfSheeps[4]) > 6) return false;
  if ((amountOfSheeps[3] + amountOfSheeps[4]) > 3) return false;
  if (amountOfSheeps[4]> 1 ) return false;

   return true;
 }

 function getCoordsOfSheeps(field){
   let coordsOfSheeps = new Map();

   for (let i=0; i<=90; i+=10){
     let coords = [];
     for (let k=i; k<=i+9; k++){
       if (Math.abs(field[k]) == 1){
         coords.push(k);
       }
       if (k%10==9 || field[k+1]==0) {
         if (coords.length>1){
           for (let item=0; item<coords.length; item++){
             coordsOfSheeps.set(coords[item], coords);
           }
        }
         coords = [];
       }
     }
   }

   for (let i=0; i<=9; i++){
     let coords = [];
     for (let k=i; k<=i+90; k+=10){
       if (Math.abs(field[k]) == 1){
         coords.push(k);
       }
       if ((k>=90 && k<=99) || field[k+10]==0) {
         if (coords.length>1){
           for (let item=0; item<coords.length; item++){
             coordsOfSheeps.set(coords[item], coords);
           }
        }
         coords = [];
       }
     }
   }

   for (let i=0; i<100; i++){
     let center = i;
     if (Math.abs(field[center])==1){

       let left = center - 1;
       let right = center + 1;
       let up = center - 10;
       let down = center + 10;
       let leftValue = 0;
       let rightValue = 0;
       let upValue = 0;
       let downValue = 0;

       if (center%10==0){
         leftValue = null;
       } else leftValue = field[left];

       if (center%10==9){
         rightValue = null;
       } else rightValue = field[right];

       if (center>=0 && center<=9){
         upValue = null;
       } else upValue = field[up];

       if (center>=90 && center<=99){
         downValue = null;
       } else downValue = field[down];

       if (Math.abs(leftValue)!=1 && Math.abs(rightValue)!=1 && Math.abs(upValue)!=1 && Math.abs(downValue)!=1){
         coordsOfSheeps.set(center, [center]);
       }
     }
   }
   return coordsOfSheeps;
 }

function sheepsAmount(field){
  let amount = [0, 0, 0, 0, 0];
  for (let i=0; i<=90; i+=10){
    let temp = 0;
    for (let k=i; k<=i+9; k++){
      if (field[k]==1)
      {
      temp+=1;
    }
      if (k%10==9 || field[k+1]==0) {
        amount[temp]+=1;
        temp = 0;
      }
    }
  }

  for (let i=0; i<=9; i++){
    let temp = 0;
    for (let k=i; k<=i+90; k+=10){
      if (field[k]==1)
      {
      temp+=1;
    }
      if ((k>=90 && k<=99) || field[k+10]==0) {
        amount[temp]+=1;
        temp = 0;
      }
    }
  }

  amount[1] = 0;

  for (let i=0; i<100; i++){
    let center = i;
    if (field[center]==1){

      let left = center - 1;
      let right = center + 1;
      let up = center - 10;
      let down = center + 10;
      let leftValue = 0;
      let rightValue = 0;
      let upValue = 0;
      let downValue = 0;

      if (center%10==0){
        leftValue = null;
      } else leftValue = field[left];

      if (center%10==9){
        rightValue = null;
      } else rightValue = field[right];

      if (center>=0 && center<=9){
        upValue = null;
      } else upValue = field[up];

      if (center>=90 && center<=99){
        downValue = null;
      } else downValue = field[down];

      if (leftValue!=1 && rightValue!=1 && upValue!=1 && downValue!=1){
        amount[1]+=1;
      }
    }
  }
  amount[0]=80;
  return amount;
}
