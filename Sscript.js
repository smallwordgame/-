TIME = 90000;
PAUSE = true;
RATE = 1;
CARDID = 0;
FIRST = 0;
FIGURES = [[]];
TOTAL = 0;
EXPAND = [
    ["Gred", false],
    ["Gyellow", false],
    ["Ggreen", false]
]
if(randomInt(1,2) == 1){
    TEAM = "MAD";
}
else{
    TEAM = "GLAD";
}
DISCARD = [];
SELECT = null;
POINTSM = [];
POINTSG = [];

// const woosh = document.getElementById("woosh"); 
// woosh.volume = 0.1;

start.addEventListener("click", function(){
    if(PAUSE){
        start.style.backgroundColor = "yellow";
        startL.innerHTML = "pause";
        startS.innerHTML = "⏸";
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
        FIRST += 1;
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
            showT();
            FIRST += 1;
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
    figgg = document.createElement('figure');
        figgg.id = CARDID;
        if(EXPAND[findSection(whereTo.id)][1]){
            figgg.classList.add("outterH");
        }
        else{
            figgg.classList.add("outter");
        }
        p = document.createElement('p');
        p.innerHTML = "&nbsp";
        figgg.appendChild(p);
        figg = document.createElement('figure');
            figg.id = CARDID + "out";
            if(EXPAND[findSection(whereTo.id)][1]){
                figg.classList.add("outH");
            }
            else{
                figg.classList.add("out");
            }
            p = document.createElement('p');
            p.innerHTML = "&nbsp";
            figg.appendChild(p);
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
            figg.appendChild(fig);
        figgg.appendChild(figg);
    // console.log(whereTo);
    // console.log(typeof whereTo);
    whereTo.appendChild(figgg);
    setsetFigures();
    if(EXPAND[findSection(whereTo.id)][1] == false){
        hide(whereTo);
    }

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

function redF(oldid, whereIs, topC, bottomC) {
    place(whereIs[0] + "red", topC, bottomC);
    remove(oldid);
}

function yellowF(oldid, whereIs, topC, bottomC) {
    place(whereIs[0] + "yellow", topC, bottomC);
    remove(oldid);
}

function greenF(oldid, whereIs, topC, bottomC) {
    place(whereIs[0] + "green", topC, bottomC);
    remove(oldid);
}

function remove(oldid){
    elementToRemove = document.getElementById(oldid);
    if (elementToRemove) {
    elementToRemove.remove();
    }
    count();
    setsetFigures();
}

function isIn(item, list) {
    return list.some(word => String(word).includes(item) || item.includes(String(word)));
}

function count(){
    GRcount = Gred.childElementCount;
    GYcount = Gyellow.childElementCount;
    GGcount = Ggreen.childElementCount;
    Gcount = (-1 * (GRcount - 2)) + (1 * (GYcount - 2)) + (3 * (GGcount - 2));
    GenralC.innerHTML = ("points = " + Gcount);
    // console.log("GLAD: " + Gcount); 
}

function startToStart(){
    start.style.backgroundColor = "lime";
    startL.innerHTML = "start";
    startS.innerHTML = "▸";
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
    if(FIRST > 0){
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
        pieCtx.arc(pieCanvas.width / 2, pieCanvas.height / 2, 89, 0, 2 * Math.PI);
        pieCtx.fillStyle = "grey";
        pieCtx.fill();

        //drawn over portion
        pieCtx.beginPath();
        pieCtx.moveTo(pieCanvas.width / 2, pieCanvas.height / 2);
        pieCtx.arc(pieCanvas.width / 2, pieCanvas.height / 2, 90, startAngle, endAngle, false);
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

function setsetFigures() {
    setFigures("Mred");
    setFigures("Myellow");
    setFigures("Mgreen");
    setFigures("Gred");
    setFigures("Gyellow");
    setFigures("Ggreen");
    TOTAL = 0;
    for(i = 0; i < FIGURES.length; i++){
        TOTAL += (FIGURES[i].length / 3);
    }
}

function setFigures(sectionId) {
    jabba = document.getElementById(sectionId);
    if (!jabba) {
        // console.warn("No section found for:", sectionId);
        return;
    }

    tempA = jabba.querySelectorAll("figure");

    if (sectionId === "Gred") { FIGURES[0] = tempA; }
    if (sectionId === "Gyellow") { FIGURES[1] = tempA; }
    if (sectionId === "Ggreen") { FIGURES[2] = tempA; }
}

RredE.addEventListener("click", function(){
    EXPAND[0][1] = toggleBool(3, "RredE", EXPAND[0][1]);
    hide(EXPAND[0][0]);
});

RyellowE.addEventListener("click", function(){
    EXPAND[1][1] = toggleBool(4, "RyellowE", EXPAND[1][1]);
    hide(EXPAND[1][0]);
});

RgreenE.addEventListener("click", function(){
    EXPAND[2][1] = toggleBool(5, "RgreenE", EXPAND[2][1]);
    hide(EXPAND[2][0]);
});


function toggleBool(number, el, current){
    el = document.getElementById(el);
    if(current){
        el.innerHTML= "expand";
        return(false);
    }
    else{
        el.innerHTML= "shrink";
        return(true);
    }
}

function hide(location){
    section = null;
    sectionID = null;
    if(typeof location == "object"){
        section = location;
        sectionID = location.id;
    }
    else{
        sectionID = location
        section = document.getElementById(location);
    }

    if (!section) {
        console.warn("Section not found:", location);
    }

    sectionN = findSection(sectionID);
    // console.log("location = " + typeof(location) + " " + location);    
    // console.log("sectionN = " + typeof(sectionN) + " " + sectionN);
    // console.log(EXPAND[sectionN][1]);

    if(EXPAND[sectionN][1] == true){
        for(i = 0; i < (FIGURES[sectionN].length - 2); i++){
            fig = FIGURES[sectionN][i];
            if(fig.classList.contains("hide")){
                fig.classList.toggle("hide");
            }
            if(fig.classList.contains("outter")){
                fig.classList.remove("outter");
                fig.classList.add("outterH");
            }

            newID = document.getElementById(fig.id + "out");
            if (newID) {
                if(newID.classList.contains("out")){
                    newID.classList.remove("out");
                    newID.classList.add("outH");
                }
            }
        }
    }
    else {
        if((FIGURES[sectionN].length - 2) > 1){
            temp = FIGURES[sectionN][0].id;
            for(i = 1; i < (FIGURES[sectionN].length - 2); i++){
                if(FIGURES[sectionN][i].id > FIGURES[sectionN][i - 1].id){
                    temp = FIGURES[sectionN][i].id;
                }
            }
            for(i = 0; i < (FIGURES[sectionN].length - 2); i++) {
                fig = FIGURES[sectionN][i];
                if(fig.classList.contains("outterH")){
                    fig.classList.add("outter");
                    fig.classList.remove("outterH");
                }

                newID = document.getElementById(fig.id + "out");
                if (newID) {
                    if(newID.classList.contains("outH")){
                        newID.classList.add("out");
                        newID.classList.remove("outH");
                    }
                }


                if (fig.classList.contains("outter") && !fig.classList.contains("hide") && fig.id != temp) {
                    fig.classList.add("hide");
                }
                if(fig.id == temp && fig.classList.contains("hide")){
                    fig.classList.add("hide");
                }
            }
        }
    }
}

function findSection(location){
    if (location === "Gred") { return(0); }
    if (location === "Gyellow") { return(1); }
    if (location === "Ggreen") { return(2); }
}