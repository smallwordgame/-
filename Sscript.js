TIME = 90000;
PAUSE = true;
RATE = 1;
CARDID = 0;
FIRST = 0;
if(randomInt(1,2) == 1){
    TEAM = "MAD";
}
else{
    TEAM = "GLAD";
}
// switchTeam();
DISCARD = [];
SELECT = null;
POINTSM = [];
POINTSG = [];

// const woosh = document.getElementById("woosh"); 
// woosh.volume = 0.1;

start.addEventListener("click", function(){
    if(PAUSE){
        start.style.backgroundColor = "yellow";
        start.innerHTML = "pause";
        start.style.color = "black";
        PAUSE = false;
        // woosh.play();
    }
    else{
        startToStart();
        PAUSE = true;
        // woosh.pause();
    }
    if(FIRST == 0){
        timer();
        find();
        FIRST += 1;
    }
    if(FIRST == 1){
        find();
    }
});

skip.addEventListener("click", function(){
    minusPressed();
});

reset.addEventListener("click", function(){
    if(PAUSE){
        TIME = 90000;
        showT();
        FIRST = 1;
        PAUSE = true;
    }
});

function timer(){
    if(!PAUSE){
        showT();
        if(TIME == 0){
            startToStart();
            TIME = 90000;
            PAUSE = true;
            FIRST = 1;
            showT();
        }
        else{
            TIME -= 1000;
        }
    }
    setTimeout(update, (RATE * 1000));
}

function getCard(){
    one.innerHTML = GAMEDATA[SELECT][1];
    three.innerHTML = GAMEDATA[SELECT][3];
    DISCARD.push(SELECT);
}

function find(){
    SELECT = randomInt(1,GAMEDATA.length);
    if(DISCARD.length == 0){
        getCard(SELECT);
    }
    else{
        if(DISCARD.includes(SELECT) == false){
            getCard();
        }
    }
}

document.addEventListener('keydown', function handler(event) {
    if (event.key === '1') {
      console.log('The "1" key was pressed once!');
        onePressed();
    }
    if (event.key === '3') {
        console.log('The "3" key was pressed once!');
        threePressed();
    }
    if (event.key === '-') {
        console.log('The "-" key was pressed once!');
        minusPressed();
    }
});

OnePoint.addEventListener("click", function(){
    onePressed();
});

ThreePoint.addEventListener("click", function(){
    threePressed();
});

function place(whereTo, topC, bottomC){
    if(typeof whereTo === 'string') whereTo = document.getElementById(whereTo);
    CARDID ++
    fig = document.createElement('figure');
        fig.id = CARDID;
        fig.classList.add("points");
        div = document.createElement('div');
            div.setAttribute('data-style', 'content');
            p = document.createElement('p');
                p.textContent = topC;
            div.appendChild(p);
            p = document.createElement('p');
                p.textContent = bottomC;
            div.appendChild(p);
        fig.appendChild(div);
        div = document.createElement('div');
            div.setAttribute('data-style', 'contentb');
            but = document.createElement('button');
                but.textContent = '-1';
                but.setAttribute("onclick", "redF('" + CARDID + "', '" + whereTo.id + "', '" + escapeQuotes(topC) + "', '" + escapeQuotes(bottomC) + "')");
                but.style.backgroundColor = "rgb(255, 98, 98)";
                but.classList.add("but");
            div.appendChild(but);
            but = document.createElement('button');
                but.textContent = '+1';
                but.setAttribute("onclick", "yellowF('" + CARDID + "', '" + whereTo.id + "', '" + escapeQuotes(topC) + "', '" + escapeQuotes(bottomC) + "')");
                but.style.backgroundColor = "rgb(255, 255, 109)";
                but.classList.add("but");
            div.appendChild(but);
            but = document.createElement('button');
                but.textContent = '+3';
                but.setAttribute("onclick", "greenF('" + CARDID + "', '" + whereTo.id + "', '" + escapeQuotes(topC) + "', '" + escapeQuotes(bottomC) + "')");
                but.style.backgroundColor = "rgb(120, 255, 120)";
                but.classList.add("but");
            div.appendChild(but);
            but = document.createElement('button');
                    but.textContent = 'x';
                    but.setAttribute("onclick", "remove(" + CARDID + ")");
                    but.style.backgroundColor = "red";
                    but.classList.add("but");
            div.appendChild(but);
        fig.appendChild(div);
    fig.style.backgroundColor = "grey";
    // console.log(whereTo);
    // console.log(typeof whereTo);
    whereTo.appendChild(fig);
}

function escapeQuotes(str) {
    return String(str).replace(/'/g, "\\'");
}

function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}


function update(){
    timer();
}

function upF(oldid, whereIs, topC, bottomC) {
    if(whereIs.includes('red')){
        whereTo = "green"
    }
    if(whereIs.includes('yellow')){
        whereTo = "red"
    }
    if(whereIs.includes('green')){
        whereTo = "yellow"
    }
    place(whereIs[0] + whereTo, topC, bottomC);
    remove(oldid);
}

function downF(oldid, whereIs, topC, bottomC) {
    if(whereIs.includes('red')){
        whereTo = "yellow"
    }
    if(whereIs.includes('yellow')){
        whereTo = "green"
    }
    if(whereIs.includes('green')){
        whereTo = "red"
    }
    place(whereIs[0] + whereTo, topC, bottomC);
    remove(oldid);
}

function remove(oldid){
    elementToRemove = document.getElementById(oldid);
    if (elementToRemove) {
    elementToRemove.remove();
    }
    count();
}

function isIn(item, list) {
    return list.some(word => String(word).includes(item) || item.includes(String(word)));
}

function count(){
    GRcount = Gred.childElementCount;
    GYcount = Gyellow.childElementCount;
    GGcount = Ggreen.childElementCount;
    Gcount = (-1 * (GRcount - 1)) + (1 * (GYcount - 1)) + (3 * (GGcount - 1));
    GenralC.innerHTML = ("points = " + Gcount);
    // console.log("GLAD: " + Gcount); 
}

function startToStart(){
    start.style.backgroundColor = "lime";
    start.innerHTML = "start";
    start.style.color = "white";
}

function showT(){
    if(TIME < 10000){
        time.innerHTML = String(TIME).substr(0, 1);
    }
    else{
        time.innerHTML = String(TIME).substr(0, 2);
    }
}

function placeholder(){
    one.innerHTML = "placeholder";
    three.innerHTML = "placeholder";
}

function onePressed(){
    if(FIRST > 0){
        if(isIn == false){
            getCard();
        }
        if(one.innerHTML != "placeholder"){
            if(isIn(GAMEDATA[SELECT][3], POINTSM) == false){
                POINTSM.push(GAMEDATA[SELECT][0], GAMEDATA[SELECT][1]);
                place(Gyellow, GAMEDATA[SELECT][1], GAMEDATA[SELECT][3]);
            }
        }
        if(TIME == 90000){
            placeholder();
        }
        else{
            find();
        }
        count();
    }
}

function threePressed(){
    if(FIRST > 0){
        if(isIn == false){
            getCard();
        }
        if(one.innerHTML != "placeholder"){
            if(isIn(GAMEDATA[SELECT][3], POINTSM) == false){
                POINTSM.push(GAMEDATA[SELECT][2], GAMEDATA[SELECT][3]);
                place(Ggreen, GAMEDATA[SELECT][1], GAMEDATA[SELECT][3]);
            }
        }
        if(TIME == 90000){
            placeholder();
        }
        else{
            find();
        }
        count();
    }
}

function minusPressed(){
    if(FIRST > 0FIRST){
        if(one.innerHTML != "placeholder"){
            place(Gred, GAMEDATA[SELECT][1], GAMEDATA[SELECT][3]);
        }
        if(TIME == 90000){
            placeholder();
        }
        find();
        count();
    }
}

document.addEventListener("DOMContentLoaded", () => {
    const pieCanvas = document.getElementById("pieTimer");
    const pieCtx = pieCanvas.getContext("2d");

    function drawPieTimer() {
        const total = 90000;
        const elapsed = total - TIME;
        const fraction = elapsed / total;

        const startAngle = -Math.PI / 2;
        const endAngle = startAngle + (fraction * 2 * Math.PI);

        pieCtx.clearRect(0, 0, pieCanvas.width, pieCanvas.height);

        //back
        pieCtx.beginPath();
        pieCtx.arc(pieCanvas.width / 2, pieCanvas.height / 2, 99, 0, 2 * Math.PI);
        pieCtx.fillStyle = "grey";
        pieCtx.fill();

        //drawn over portion
        pieCtx.beginPath();
        pieCtx.moveTo(pieCanvas.width / 2, pieCanvas.height / 2);
        pieCtx.arc(pieCanvas.width / 2, pieCanvas.height / 2, 100, startAngle, endAngle, false);
        pieCtx.closePath();
        pieCtx.fillStyle = "lightgrey";
        pieCtx.fill();
    }

    const originalShowT = window.showT;
    window.showT = function() {
        if (originalShowT) originalShowT();
        drawPieTimer();
    };
});