var introtext = `    /
... /
    /
... /
You open your eyes to darkness. 
    /
You lie on an uneven, crumbling something that shifts and clatters beneath you as you sit up. /
    /
Your eyes adjust quickly to the darkness and you see that you are sitting on a pile of bones. /
The stone walls of a masoleaum enclose you. /
   /
Scattered among the bones are various old and rotted objects, but two stand out to you, /
a sword and a book, which seem to radiate with an unknown power... 
   /
You reach almost unconsciously for...`

var testintro = "you see a sword and a book which one you pick?"



class Gamestats {
    constructor() {
        this.createdate = ""
        this.enemies_killed = []
        this.goblin = 0
        this.goblinheads = 0
        this.strangerquest = 0
        this.strangername = "the man"
        this.innkeeper = 0
        this.innkeepername = "the innkeeper"
        this.intro = 0
        this.cavernvisits = 0
        this.taniasring = 0
        this.introitem = ""
        this.tanias_store = 0
        this.graveyardvisits = 0
    }
}

const playerstats = new Gamestats;


class Player {
    constructor() {
        this.type = "human"
        this.name = ""
        this.displayname = ""
        this.pclass = ""
        this.weapon = ""
        this.armor = ""
        this.equippedspell = ""
        this.dmgdescriptor = ""
        this.dmgtype = ""
        this.bonusWdmg = 0
        this.bonusSdmg = 0
        this.tohitWbonus = 0
        this.tohitSbonus = 0
        this.Wcritrange = 0
        this.Scritrange = 0
        this.spells = 0
        this.spellsmax = 0
        this.spellfail_chance = 0
        this.hp = 0
        this.maxhp = 0
        this.ac = 10
        this.gold = 0
        this.exp = 0
        this.items = []
        this.questitems = []
        this.spell_list = []
        this.inn = 0
        this.speed = 0
        this.dot = 0
        this.dot_type = []
        this.status = "normal"
        this.stun = 0
        this.regen = 0
        this.dmgreduction = 0
        this.sex = ""
        this.equipment = []
        this.location = ""
}
}

const player = new Player;

function onloadscreen() {
    button_off("charbutton", "off")
    button_off("invbutton", "off")
    button_off("questsbutton", "off")
    button_off("mapbutton", "off")
    button_show("Choice5", "show")
    button_show("Choice1", "show")
    document.getElementById("Choice5").innerHTML = "New Game"
    document.getElementById("Choice5").onclick = newgamestart
    document.getElementById("Choice1").innerHTML = "Load"
}

function printLetterByLetter(destination, message, speed) {
    var letter = ''
    var i = 0;
    var interval = setInterval(function () {
        letter = message.charAt(i);
        if (letter == '/') { letter = '<br>' }
        document.getElementById(destination).innerHTML += letter
        i++;
        if (i > message.length) {
            clearInterval(interval);
        }
    }, speed);
}

function button_off(id, on) {
    if (on == "off") {
        document.getElementById(id).disabled = true;
    }
    if (on == "on") {
        document.getElementById(id).disabled = false;
    }
}

function button_show(id, show) {
    if (show == "show") {
        document.getElementById(id).style.visibility = "visible";
    }
    if (show == "hide") {
        document.getElementById(id).style.visibility = "hidden";
    }
}

// setTimeout(button_off, 2000, "continuebutton", "on") 

// function cont() {
//     document.getElementById('gamewindow').innerHTML = "";
//     button_off('continuebutton', 'off')
//     setTimeout(button_off, 2000, "printbutton", "on")
// }

function newgamestart() {
    button_show("Choice5", "hide")
    button_show("Choice1", "hide")
    document.getElementById('gametext').innerHTML = introtext
    printLetterByLetter("gamewindow", testintro, 50);
    document.getElementById("Choice7").innerHTML = "The Sword"
    document.getElementById("Choice2").innerHTML = "The Book"
    setTimeout(button_show, 2000, "Choice7", "show");
    setTimeout(button_show, 2000, "Choice2", "show");
    document.getElementById("Choice7").setAttribute( "onClick", "javascript: introchoice('sword');" );
    document.getElementById("Choice2").setAttribute( "onClick", "javascript: introchoice('book');" );
}

function introchoice(item) {
    button_show("Choice7", "hide")
    button_show("Choice2", "hide")
    document.getElementById("gamewindow").innerHTML = '' 
    if (item == "sword") {
        playerstats.introitem = "sword"
        player.pclass = "warrior"
        player.hp = 20
        player.maxhp = 20
        player.speed = 5
        player.Wcritrange = 18
        player.gold = 0
        player.spell_list.push("charge")
        player.equipment.push("Basic Sword")
        // equip("Basic Sword")
        player.location = "Cavern Crossing"
    }

    if (item == "book"){
        playerstats.introitem = "book"
        player.pclass = "wizard"
        player.hp = 15
        player.maxhp = 15
        player.speed = 2
        player.spells = 3
        player.spellsmax = 3 
        player.Wcritrange = 20
        player.Scritrange = 18
        player.gold = 0
        player.spell_list.push("firebolt")
        player.equipment.push("Basic Staff")
        // equip("Basic Staff")
        player.location = "Cavern Crossing"
    }
    printLetterByLetter("gamewindow", `You picked the ${playerstats.introitem} / /  
    and now, great ${player.pclass}, what is your name?`, 50);
    setTimeout(function(){ document.getElementById("getusername").style.display = "block" }, 4000);
    
}

function getusername() {
    
    var entry = document.getElementById("nameentry").value;
    if (entry.length > 15) {
        alert("Please use 15 characters or less")
        document.getElementById("nameentry").value = ''
    }
    if ((/[^a-zA-Z]/.test(entry))) {
        alert("Please only use letters")
        document.getElementById("nameentry").value = ''
    }
    else {
        player.name = entry
        document.getElementById("getusername").style.display = "none";
    }
    document.getElementById("gamewindow").innerHTML= ''
    printLetterByLetter("gamewindow", `Welcome, ${player.name} the ${player.pclass}!`, 50)
}