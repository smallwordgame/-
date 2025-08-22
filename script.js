TIME = 90000;
PAUSE = true;
RATE = 1;
CARDID = 0;
FIRST = true;
if(randomInt(1,2) == 1){
    TEAM = "MAD";
}
else{
    TEAM = "GLAD";
}
switchTeam();
DISCARD = [];
SELECT = null;
POINTSM = [];
POINTSG = [];

const woosh = document.getElementById("woosh"); 
woosh.volume = 0.1;

start.addEventListener("click", function(){
    if(PAUSE){
        start.style.backgroundColor = "yellow";
        start.innerHTML = "pause";
        start.style.color = "black";
        PAUSE = false;
        woosh.play();
    }
    else{
        startToStart();
        PAUSE = true;
        woosh.pause();
    }
    if(FIRST){
        timer();
        find();
    }
    FIRST = false;
});

skip.addEventListener("click", function(){
    if(!FIRST){
        if(one.innerHTML != "placeholder"){
            if(TEAM == "MAD"){
                place(Mred, GAMEDATA[SELECT][1], GAMEDATA[SELECT][3]);
            }
            else{
                place(Gred, GAMEDATA[SELECT][1], GAMEDATA[SELECT][3]);
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
});

reset.addEventListener("click", function(){
    if(PAUSE){
        TIME = 90000;
        showT();
    }
});

function timer(){
    if(!PAUSE){
        showT();
        setTimeout(update, (RATE * 1000));
        if(TIME == 0){
            startToStart();
            TIME = 90000;
            PAUSE = true;
            showT();
        }
        else{
            TIME -= 1000;
        }

    }
}

Next.addEventListener("click", function(){
    switchTeam();
    TIME = 90000;
    showT();
    PAUSE = true;
    startToStart();
    FIRST = true;
    PAUSE = true;
});

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

OnePoint.addEventListener("click", function(){
    if(!FIRST){
        if(isIn == false){
            getCard();
        }
        if(one.innerHTML != "placeholder"){
            if(TEAM == "MAD"){
                if(isIn(GAMEDATA[SELECT][1], POINTSM) == false){
                    POINTSM.push(GAMEDATA[SELECT][0], GAMEDATA[SELECT][1]);
                    place(Myellow, GAMEDATA[SELECT][1], GAMEDATA[SELECT][3]);
                }
            }
            else
            {
                if(isIn(GAMEDATA[SELECT][3], POINTSM) == false){
                    POINTSM.push(GAMEDATA[SELECT][0], GAMEDATA[SELECT][1]);
                    place(Gyellow, GAMEDATA[SELECT][1], GAMEDATA[SELECT][3]);
                }
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
});

ThreePoint.addEventListener("click", function(){
    if(!FIRST){
        if(isIn == false){
            getCard();
        }
        if(one.innerHTML != "placeholder"){
            if(TEAM == "MAD"){
                if(isIn(GAMEDATA[SELECT][1], POINTSM) == false){
                    POINTSM.push(GAMEDATA[SELECT][2], GAMEDATA[SELECT][3]);
                    place(Mgreen, GAMEDATA[SELECT][1], GAMEDATA[SELECT][3]);
                }
            }
            else
            {
                if(isIn(GAMEDATA[SELECT][3], POINTSM) == false){
                    POINTSM.push(GAMEDATA[SELECT][2], GAMEDATA[SELECT][3]);
                    place(Ggreen, GAMEDATA[SELECT][1], GAMEDATA[SELECT][3]);
                }
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
                but.textContent = '△';
                but.setAttribute("onclick", "upF('" + CARDID + "', '" + whereTo.id + "', '" + escapeQuotes(topC) + "', '" + escapeQuotes(bottomC) + "')");
            div.appendChild(but);
            but = document.createElement('button');
                but.textContent = '▽';
                but.setAttribute("onclick", "downF('" + CARDID + "', '" + whereTo.id + "', '" + escapeQuotes(topC) + "', '" + escapeQuotes(bottomC) + "')");
            div.appendChild(but);
            but = document.createElement('button');
                but.textContent = 'x';
                but.setAttribute("onclick", "remove(" + CARDID + ")");
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

// function isIn(item, list) {
//     for (let i = 0; i < list.length; i++) {
//         if (list[i].includes(item) || item.includes(list[i])) {
//             return true;
//         }
//     }
//     return false;
// }

function isIn(item, list) {
    return list.some(word => String(word).includes(item) || item.includes(String(word)));
}

function switchTeam(){
    const leftNumbers = document.querySelectorAll('.LT');
    const rightNumbers = document.querySelectorAll('.RT');
    if(TEAM == "MAD"){
        TEAM = "GLAD";
        Mred.style.backgroundColor = "rgb(255, 98, 98)";
        Myellow.style.backgroundColor = "rgb(255, 255, 109)";
        Mgreen.style.backgroundColor = "rgb(120, 255, 120)";
        Gred.style.backgroundColor = "red";
        Gyellow.style.backgroundColor = "yellow";
        Ggreen.style.backgroundColor = "green";
        leftNumbers.forEach(el => el.style.color = "rgba(128, 128, 128, 0.536)");
        rightNumbers.forEach(el => el.style.color = "black");
    }
    else{
        TEAM = "MAD";
        Gred.style.backgroundColor = "rgb(255, 98, 98)";
        Gyellow.style.backgroundColor = "rgb(255, 255, 109)";
        Ggreen.style.backgroundColor = "rgb(120, 255, 120)";
        Mred.style.backgroundColor = "red";
        Myellow.style.backgroundColor = "yellow";
        Mgreen.style.backgroundColor = "green";
        leftNumbers.forEach(el => el.style.color = "black");
        rightNumbers.forEach(el => el.style.color = "rgba(128, 128, 128, 0.536)");
    }
    // console.log(TEAM);
}

function count(){
    MRcount = Mred.childElementCount;
    MYcount = Myellow.childElementCount;
    MGcount = Mgreen.childElementCount;
    Mcount = (-1 * (MRcount - 1)) + (1 * (MYcount - 1)) + (3 * (MGcount - 1));
    BIGc.innerHTML = (Mcount + " team BIG");
    // console.log("mad: " + Mcount);
    GRcount = Gred.childElementCount;
    GYcount = Gyellow.childElementCount;
    GGcount = Ggreen.childElementCount;
    Gcount = (-1 * (GRcount - 1)) + (1 * (GYcount - 1)) + (3 * (GGcount - 1));
    ROCKc.innerHTML = ("team ROCK " + Gcount);
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
    woosh.volume = TIME / 90000;
}

function placeholder(){
    one.innerHTML = "placeholder";
    three.innerHTML = "placeholder";
}