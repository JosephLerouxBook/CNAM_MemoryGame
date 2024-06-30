// GLOBAL VARIABLE
imgList = ["img/coeur/2.png", //0
    "img/coeur/2.png", //1
    "img/coeur/3.png", //2
    "img/coeur/4.png", //3
    "img/coeur/5.png", //4
    "img/coeur/6.png", //5
    "img/coeur/7.png", //6
    "img/coeur/8.png", //7
    "img/coeur/9.png", //8
    "img/coeur/10.png", //9
    "img/coeur/valet.png", //10
    "img/coeur/dame.png", //11
    "img/coeur/roi.png", //12
    "img/coeur/ace.png"]; //13
imgListSize = imgList.length - 1
backCard = "img/coeur/back.png";
nbrOfCard = 10;
carteRetourner = 0;
playerPoint = 0;
playerNbrOfTry = 0;

// FONCTIONS
function getRandomNbr(max){
    nbr = Math.floor(Math.random() * max);
    //console.log(nbr);
    return nbr;
}

function getNbrList(listSize, max){
    list = [];
    for(i = 0; i < listSize; i++){
        tmp = getRandomNbr(max);
        while(list.includes(tmp) == true){
            tmp = getRandomNbr(max);
        }
        list.push(tmp);
    }
    return list;
}

function mixingList(listOfCard, listOfPos){
    listOfPosSize = listOfPos.length;
    finalList = [];
    j = 0;
    for (let pos of listOfPos) {
        finalList[pos] = 0; 
    }
    for(i = 0; i < listOfPosSize; i++){
        finalList[listOfPos[i]] += listOfCard[j];
        if(i % 2 == 1){
            j++;
        }
    }
    return finalList;
}

function verifierScore(){
    if(playerPoint == nbrOfCard/2){
        resultElement = document.getElementById("result");
        resultElement.innerHTML = "Vous avez réussi ! en "+playerNbrOfTry+" coups";
        //resultElement.style.border = "thick double #32a1ce";
    }
}

function ajoutEventListener(nbrOfCard, imgList, finalPlayingList){
    for(i = 0; i < nbrOfCard; i++){
        let htmlCard = document.getElementById(i);
        htmlCard.addEventListener("click", function(){
            if(carteRetourner < 2) {
                htmlCard.src = imgList[finalPlayingList[htmlCard.id]];
                carteRetourner += 1;
                playerNbrOfTry += 1;
            }
            console.log(carteRetourner);
            if(carteRetourner == 2) {
                if(htmlCard.src == tmp1stCard.src){
                    htmlCard.style.visibility = "hidden";
                    tmp1stCard.style.visibility = "hidden";
                    playerPoint++;
                    carteRetourner = 0;
                }else {
                    setTimeout(() => {
                        htmlCard.src = backCard;
                        tmp1stCard.src = backCard;
                        carteRetourner = 0;
                    }, 1000);
                }

            } else {
                tmp1stCard = htmlCard;
            }
        });
    }
}

// MAIN
playingBoard = document.getElementById("playingBoard");

listOfCard = getNbrList(nbrOfCard / 2, imgListSize);
listOfPos = getNbrList(nbrOfCard, nbrOfCard);
finalPlayingList = mixingList(listOfCard, listOfPos);


//Remplit le board avec des cartes retourner
for(i = 0; i < nbrOfCard; i++){
    if (i == nbrOfCard / 2){
        playingBoard.innerHTML += `<br>`;
    }
    playingBoard.innerHTML += `<img src="`+backCard+`" class="playingCard_Class" id="`+i+`">`;
}
ajoutEventListener(nbrOfCard, imgList, finalPlayingList);
let intervalSortiDeJeu = setInterval(verifierScore, 500);
