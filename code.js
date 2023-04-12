
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

function choose(choices) {
    var index = Math.floor(Math.random() * choices.length);
    return choices[index];
  }

function inlist(a, b) {
    for (item in a) {
        if (b.includes(item)){
            return true;
        }
    }
    return false;
}

var scrolled = false;
function updateScroll(){
    if(!scrolled){
        var element = document.getElementById("gamewindow");
        element.scrollTop = element.scrollHeight;
    }
}





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

class Weapon {
    constructor() {
        this.name = ""
        this.displayname = ""
        this.dmgtype = ""
        this.mindmg = 0
        this.maxdmg = 0
        this.dmg_bonus = 0
        this.spelldmg_bonus = 0
        this.dmgtype_bonus = ""
        this.tohit_bonus = 0
        this.tohitS_bonus = 0
        this.speed_bonus = 0
        this.spells_bonus = 0
        this.maxspells_bonus = 0
        this.maxhp_bonus = 0
}
}

class Armor {
    constructor() {
        this.name = ""
        this.displayname = ""
        this.ac_bonus = 0
        this.speed_bonus = 0
        this.spells_bonus = 0
        this.maxspells_bonus = 0
        this.maxhp_bonus = 0
        this.regen_bonus = 0
        this.dmgreduction_bonus = 0
        this.spellfail_chance = 0
    }
}
const playerWeapon = new Weapon()
const playerArmor = new Armor()
const player = new Player;
const tania = new Player;

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
    document.getElementById("infobar").style.display = "none"
    document.getElementById("charactersheet").style.display = "none"
    document.getElementById("inventory").style.display = "none"
    document.getElementById("specattack").style.display = "none"
    document.getElementById("wiz_stats").style.display = "none"

}

function printLetterByLetter(destination, message, speed) {
    var sound = new Audio('sounds/textscroll.wav');
    sound.volume = 0.4;
    sound.playbackRate = 0.9;
    var letter = ''
    var i = 0;
    var interval = setInterval(function () {
        letter = message.charAt(i);
        if (letter != '/') {sound.play();} 
        if (letter == '/') { letter = '<br>'; sound.pause()}
        document.getElementById(destination).innerHTML += letter
        i++;
        if (i > message.length) {
            clearInterval(interval);
            sound.pause();
            sound.currentTime = 0
            
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
    printLetterByLetter("gamewindow", testintro, 30);
    document.getElementById("Choice7").innerHTML = "The Sword"
    document.getElementById("Choice2").innerHTML = "The Book"
    setTimeout(button_show, 1500, "Choice7", "show");
    setTimeout(button_show, 1500, "Choice2", "show");
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
        equip("Basic Sword")
        player.location = "Cavern Crossing"
        document.getElementById("specattack").style.display = "block"
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
        equip("Basic Staff")
        player.location = "Cavern Crossing"
        document.getElementById("wiz_stats").style.display = "block"
    }
    printLetterByLetter("gamewindow", `You picked the ${playerstats.introitem} ///  .  .  .    
    and now, great ${player.pclass}, what is your name?`, 30);
    setTimeout(function(){ document.getElementById("getusername").style.display = "block" }, 3000);
    
}

function hideallbuttons() {
    button_show("Choice7", "hide");
    button_show("Choice6", "hide");
    button_show("Choice5", "hide");
    button_show("Choice1", "hide");
    button_show("Choice2", "hide");
    button_show("Choice3", "hide");
    button_show("c-Choice7", "hide");
    button_show("c-Choice6", "hide");
    button_show("c-Choice5", "hide");
    button_show("c-Choice1", "hide");
    button_show("c-Choice2", "hide");
    button_show("c-Choice3", "hide");
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
    printLetterByLetter("gamewindow", `Welcome, ${player.name} the ${player.pclass}!`, 30)
    button_off("charbutton", "on")
    button_off("invbutton", "on")
    document.getElementById("Choice3").innerHTML = "Go to Cavern Crossing"
    setTimeout(button_show, 1500, "Choice3", "show");
    document.getElementById("Choice3").setAttribute( "onClick", "javascript: cavernCrossing(9000);" );
}




function charactersheet() {
    if (document.getElementById("infobar").style.display == "block" && document.getElementById("charactersheet").style.display == "block") {
        document.getElementById("infobar").style.display = "none"
        document.getElementById("charactersheet").style.display = "none"
    }
    else {
        document.getElementById("infobar").style.animationFillMode = "backwards"
        document.getElementById("infobar").style.display = "block"
        document.getElementById("charactersheet").style.display = "block"
        document.getElementById("inventory").style.display = "none"
        document.getElementById("weapon_name").innerHTML= `${playerWeapon.name}`
        document.getElementById("armor_name").innerHTML= `${playerArmor.name}`
        document.getElementById("healthvalue").innerHTML= `${player.hp} / ${player.maxhp}`
        document.getElementById("status").innerHTML= `${playerWeapon.status}`
        document.getElementById("spellsvalue").innerHTML= `${player.spells} / ${player.spellsmax}`
        document.getElementById("spellslist").innerHTML= `${player.spell_list}`
        document.getElementById("attacklist").innerHTML= `${player.spell_list}`
        document.getElementById("nameandclass").innerHTML= `${player.name} the ${player.pclass}`

    }
}

function inventoryscreen() {
    if (document.getElementById("infobar").style.display == "block" && document.getElementById("inventory").style.display == "block") {

        document.getElementById("infobar").style.display = "none"
        document.getElementById("inventory").style.display = "none"
    }
    else {

        document.getElementById("infobar").style.display = "block"
        document.getElementById("inventory").style.display = "block"
        document.getElementById("charactersheet").style.display = "none"
    }
}

function cavernCrossing(delay) {
    hideallbuttons(); 
    document.getElementById("allwindow").style.backgroundImage = "url(images/townbg.jpg)";
    document.getElementById("gamewindow").innerHTML= '';
    if (playerstats.intro == 1){
        printLetterByLetter("gamewindow", `You stand at the entrance to Cavern Crossing, a small cluster of buildings surrounded by trees. `, 20);}
    else if (playerstats.intro == 0) {
        printLetterByLetter("gamewindow", `You stand at the entrance to Cavern Crossing, a small cluster of buildings surrounded by trees. /// You see a larger, two story building with a sign at the entrance that says 'Diamond's Inn' /// A bit further down the road you see smaller building that looks like a house, but with a sign above the door that says 'Tania's'`, 20);
        playerstats.intro = 1;}
    setTimeout(button_show, delay, "Choice7", "show");
    setTimeout(button_show, delay, "Choice6", "show");
    document.getElementById("Choice7").innerHTML = "Enter Diamond's inn";
    document.getElementById("Choice6").innerHTML = "Enter Tania's";
    document.getElementById("Choice7").setAttribute( "onClick", "javascript: diamond_inn();" );
    document.getElementById("Choice6").setAttribute( "onClick", "javascript: hideallbuttons(); tanias_store();" );
    if (playerstats.innkeepername == "Thom" && playerstats.cavernvisits == 0) {
        document.getElementById("Choice5").innerHTML = "Search for the cavern Thom mentioned";
        setTimeout(button_show, delay, "Choice5", "show");
        document.getElementById("Choice5").setAttribute( "onClick", "javascript: thecavern();" );}
    else if (playerstats.cavernvisits > 0){
        document.getElementById("Choice5").innerHTML = "Go to the Cavern";
        setTimeout(button_show, delay, "Choice5", "show");
        document.getElementById("Choice5").setAttribute( "onClick", "javascript: thecavern();" );}
    if (playerstats.strangerquest >= 2){
        document.getElementById("Choice1").innerHTML = "Go west, back toward the graveyard";
        setTimeout(button_show, delay, "Choice1", "show");
        document.getElementById("Choice1").setAttribute( "onClick", "javascript: thegraveyard();" );}
}

function tanias_store() {
    hideallbuttons(); 
    document.getElementById("gamewindow").innerHTML= '';
    document.getElementById("allwindow").style.backgroundImage = "url(images/tanias.png)";
    if (playerstats.tanias_store == 0){
        tania.items = ["Health Potion", "Mana Potion"];}
    if (playerstats.tanias_store == 0 && tania.equipment.length < 2){
        if (inlist(tania.equipment,softArmorList) == false) {
            tania.equipment.push(
                choose(softArmorList));}
        if (inlist(tania.equipment, basicWeaponList) == false){
            tania.equipment.push(
                choose(basicWeaponList))};}
    playerstats.tanias_store = 1
    if (playerstats.taniasring == 0){
        delay = 9000
        printLetterByLetter("gamewindow", `You enter Tania's. / / Inside, the walls are lined with shelves packed with books and bottles and plants in pots or tied in dried bundles, as well as many other things you can't identify... some which appear to be bodyparts, or organs. / / The woman behind the counter looks up from her mortar and pestle. She has long, black hair and bright blue eyes. She wears an icy gem that seems to glow with power tight against her throat. / / 'What do you want, stranger?'`, 20);
        playerstats.taniasring = 1;}
    else if (playerstats.taniasring == 1){
        delay = 0
        printLetterByLetter("gamewindow", `The woman behind the counter looks up from her mortar and pestle. 'Hi again, what do you want?'`);}
    else if (playerstats.taniasring == 2){
        delay = 0
        printLetterByLetter("gamewindow", `Tania looks up from her mortar and pestle. '${player.name}, you're back. Did you find her... did you find her ring?'`);}
    else if (playerstats.taniasring == 3){
        delay = 0
        printLetterByLetter("gamewindow", `Tania looks up from her mortar and pestle and smiles warmly at you. 'Hi ${player.name}, what do you need?'`);}
    document.getElementById("Choice7").innerHTML = "Buy";
    document.getElementById("Choice6").innerHTML = "Sell";
    document.getElementById("Choice5").innerHTML = "Leave";
    setTimeout(button_show, delay, "Choice7", "show");
    setTimeout(button_show, delay, "Choice6", "show");
    setTimeout(button_show, delay, "Choice5", "show");
    document.getElementById("Choice7").setAttribute( "onClick", "javascript: tania_buy();" )
    document.getElementById("Choice6").setAttribute( "onClick", "javascript: tania_sell();" )
    document.getElementById("Choice5").setAttribute( "onClick", "javascript: cavernCrossing(0);")
    if (playerstats.taniasring == 1 && playerstats.innkeepername == "Thom" && playerstats.cavernvisits > 0) {
        document.getElementById("Choice4").innerHTML = "Ask about a light source"
        setTimeout(button_show, 1000, "Choice4", "show");
        document.getElementById("Choice1").setAttribute( "onClick", "javascript: taniaringquest();" )}
    if (player.questitems.includes("Tania's ring")){
        document.getElementById("Choice4").innerHTML = "Tania's ring"
        setTimeout(button_show, 1000, "Choice4", "show");
        document.getElementById("Choice1").setAttribute( "onClick", "javascript: taniaringquest();" )}
    }

function tania_buy() {
    hideallbuttons(); 
    document.getElementById("gamewindow").innerHTML= '';
    printLetterByLetter("gamewindow", `I've got a few things for sale, what are you interested in?`, 30);
    document.getElementById("Choice7").innerHTML = "Potions";
    document.getElementById("Choice6").innerHTML = "Armor and weapons";
    document.getElementById("Choice5").innerHTML = "Back";
    button_show("Choice7", "show")
    button_show("Choice6", "show")
    button_show("Choice5", "show")
    document.getElementById("Choice7").setAttribute( "onClick", "javascript: buy(tania.items, player.items);" );
    document.getElementById("Choice6").setAttribute( "onClick", "javascript: buy(tania.equipment, player.equipment);" );
    document.getElementById("Choice5").setAttribute( "onClick", "javascript: tanias_store();");
}           

function tania_sell(){
    hideallbuttons(); 
    document.getElementById("gamewindow").innerHTML= ''
    printLetterByLetter("gamewindow", `What do you want to sell?`,30)
    document.getElementById("Choice7").innerHTML = "Items"
    document.getElementById("Choice6").innerHTML = "Equipment"
    document.getElementById("Choice5").innerHTML = "Back"
    button_show("Choice7", "show")
    button_show("Choice6", "show")
    button_show("Choice5", "show")
    document.getElementById("Choice7").setAttribute( "onClick", "javascript: sell(player.items);" )
    document.getElementById("Choice6").setAttribute( "onClick", "javascript: sell(player.equipment);" )
    document.getElementById("Choice5").setAttribute( "onClick", "javascript: tanias_store();")
}

function taniaringquest() {
    document.getElementById("gamewindow").innerHTML= ''
    // if (playerstats.taniasring == 1 && playerstats.innkeepername == "Thom"){
    //     printLetterByLetter("gamewindow", `'A light source? Well, yes, I've got many kinds. What do you need it for?' / /
    //     ... / /
    //     Her eyes widen. 'The cavern... you want to go in there? You're crazy! Don't you know what's in there? Strange green-fleshed red-eyed creatures shaped like people but not people at all! They harass this town, they even took my... '
    //     / / 'But, well... it's your life. If you want to buy something, who am I to disagree. I'd suggest this lantern, which will work best in--'
    //     / /... / /
    //     'Oh, you don't have any money? Of course you don't, look at you. Just get lost then!'
    //  // ...// You turn to leave, and the woman catches sight of the ${playerstats.introitem}, which you tucked into your belt.
    //     / /'Wait,' she says. Then, mutters to herself, which you can just hear: '...${player.sex} must be from the outpost beyond the...' / /She looks up at you. 'What's your name, stranger?'
    //     //...//
    //     '${player.name}? I'm Tania, as you might have guessed from the sign this is my shop. That means I can give you anything I want on loan. / / If you really mean to go into that cavern, I'll let you borrow this lantern. But, there's something of mine that I want you to look for in there.'
    //     // 
    //     Tania takes something from beneath the counter, and lays it before you. / / It is a drawing, very intricate and colored, of a gold ring with an icey blue gem very similar to the one around her neck. 
    //     /
    //     'This is the ring of my... sister. She died, last year.'
    //     /'And before I could have a ceremoney, or a burrial... before I could even say goodbye,
    //     / /'her body was stolen in the night.
    //     / /'I know it was those creatures from the cavern, I know it was. They have plagued this town for years.  \n'They steal equipment, food, children... and they stole her.
    //     / / 'I don't want to know what happened to her. I can't bear to think of it. But if you see her ring, please bring it to me. \nOkay?'")
    //     'Thank you, ${player.name}'` 
    //     if player.sex == "she":
    //         print_slow(
    //             "Tania takes your hand for a moment. 'You know, you remind me of her in a way...'")
    //     print_Xslow("  ")
    //     print_slow("'Be careful in there.' Tania rummages under the counter for a moment. 'Take these potions with you, too. \n'And if you return, I'll have more for sale.")
    //     input("Press enter to continue: ")
    //     clear()
    //     if player.pclass == "wizard":
    //         print_slow(
    //             "Tania gives you a Health Potion, a Mana Potion, and her lantern.")
    //         player.items.append("Health Potion")
    //         player.items.append("Mana Potion")
    //         player.questitems.append("Tania's lantern")
    //         playerstats.taniasring = 2
    //         cavern_treasure.append("a ring")
    //     if player.pclass == "warrior":
    //         print_slow(
    //             "Tania gives you two Health Potions, and her lantern.")
    //         player.items.append("Health Potion")
    //         player.items.append("Health Potion")
    //         player.questitems.append("Tania's lantern")
    //         playerstats.taniasring = 2
    //         cavern_treasure.append("a ring")
    //     input("Press enter to continue: ")
    //     break}
    // else if (player.questitems.includes("Tania's ring")){
    //     clear()
    //     print_slow(
    //         "You take the ring out of your pocket and hand it to Tania. She takes it with a gasp, and tears well up in her eyes.")
    //     print_slow(f"'Oh, thank you {player.name}, thank you!")
    //     if player.sex == "she":
    //         print_slow(
    //             "Tania throws her arms around you, and seems about to kiss you before pulling suddenly back.")
    //         print_slow("'Ah, I'm sorry, I... I...  it's just...")
    //     print_slow(
    //         "'I never imagined you would really find it... it was only a wild hope. And now it's come true!")
    //     if player.sex == "she":
    //         print_slow("'And truly, you remind me of her so...'")
    //     input("Press enter to continue: ")
    //     clear()
    //     print_slow(
    //         "You try to hand the lantern back to Tania, but she waves you off.")
    //     print_slow("'No, no, keep it. That, and, my deepest thanks...")
    //     input("Press enter to continue: ")
    //     clear()
    //     print("You gain 25 experience points.")
    //     player.exp += 25
    //     player.questitems.remove("Tania's ring")
    //     playerstats.taniasring = 3
    //     input("Press enter to continue: ")}

}


function diamond_inn(){
    document.getElementById("allwindow").style.backgroundImage = "url(images/innbg.png)";
    document.getElementById("gamewindow").innerHTML= ''
    hideallbuttons();
    if (playerstats.strangerquest == 0)
        printLetterByLetter("gamewindow", `You stand in the inn. It is mostly empty, but for the innkeeper washing mugs behind the bar, and a grizzled figure sitting in a dark corner.`, 15)
    else
        {printLetterByLetter("gamewindow", `You stand in the inn. The innkeeper is working behind the counter, and ${playerstats.strangername} sits alone in a dark corner.`)}
    if (playerstats.enemies_killed.length > 0 && playerstats.strangerquest == 0){ 
        setTimeout(printLetterByLetter, 2000, "gamewindow", `The man in the corner glances up at you...`)}
    document.getElementById("Choice7").innerHTML = `Talk to ${playerstats.innkeepername}`
    document.getElementById("Choice6").innerHTML = `Talk to ${playerstats.strangername}`
    document.getElementById("Choice5").innerHTML = "Leave"
    button_show("Choice7", "show")
    button_show("Choice6", "show")
    button_show("Choice5", "show")
    document.getElementById("Choice7").setAttribute( "onClick", "javascript: talk_thom();" )
    document.getElementById("Choice6").setAttribute( "onClick", "javascript: talk_stranger();" )
    document.getElementById("Choice5").setAttribute( "onClick", "javascript: cavernCrossing();")
    }

function talk_thom() {
    document.getElementById("allwindow").style.backgroundImage = "url(images/thomclose.png)";
    document.getElementById("gamewindow").addEventListener('click', function(){scrolled = true;})
    document.getElementById("gamewindow").addEventListener('wheel', function(){scrolled = true;})
    document.getElementById("gamewindow").innerHTML= ''
    hideallbuttons();
    setInterval(updateScroll,100);
    if (player.inn == 0){
        if (playerstats.innkeepername == "the innkeeper"){
            printLetterByLetter("gamewindow", `The innkeeper looks up from his work. 'Hello there stranger. Looks like you could use some rest and a meal. Where do you hail from?'
            / / ...
            / / 'Don't remember?... I see...  well, take some comfort knowing you're not the first to come through here with some memory propblems. / Do you at least know your name?' 
            / /... 
            / / 'Pleased to meet you, ${player.name}, I'm Thom. Some people around here call me Diamond, and I don't mind much, but it ain't my name, just the inn's name. / This whole town, Cavern Crossing, was founded by a bunch of folks who set up to dig in the cave just outside of town. / There was supposed to be gems in that cave, they never stopped talking about diamonds, those folks... but all they found was death. / Still, to this day, that cave brings nothing but trouble to this town...' 
            //  //
            Thom wipes his hands on a rag and tosses it asside.
            /'Ah, but nevermind my rambling. I'm sure you want to rest now. 
            / / 'I've got an available room with a warm bed, meal included, it will get you all rested up, only 5 gold. Or, if you find yourself short of money, you can sleep in the barn for free. It's not much, but you'll feel a bit better in the morning. / / What'll it be?'`, 10)
            playerstats.innkeepername = "Thom"}
        else
            {printLetterByLetter("gamewindow", `'Hi again, ${player.name}. What'll it be?'`)}
        document.getElementById("Choice7").innerHTML = `Rent the room`
        document.getElementById("Choice6").innerHTML = `Sleep in the barn`
        document.getElementById("Choice5").innerHTML = "Back"
        button_show("Choice7", "show")
        button_show("Choice6", "show")
        button_show("Choice5", "show")
        document.getElementById("Choice7").setAttribute( "onClick", "javascript: rent_room();" )
        document.getElementById("Choice6").setAttribute( "onClick", "javascript: sleep_barn();" )
        document.getElementById("Choice5").setAttribute( "onClick", "javascript: diamond_inn();")
        }
    else
        {printLetterByLetter("gamewindow", `The innkeeper smiles at you. 'I hope you feel rested. See you around, ${player.pclass}'`)
        document.getElementById("Choice7").innerHTML = `Talk to ${playerstats.innkeepername}`
        document.getElementById("Choice6").innerHTML = `Talk to ${playerstats.strangername}`
        document.getElementById("Choice5").innerHTML = "Leave"
        button_show("Choice7", "show")
        button_show("Choice6", "show")
        button_show("Choice5", "show")
        document.getElementById("Choice7").setAttribute( "onClick", "javascript: talk_thom();" )
        document.getElementById("Choice6").setAttribute( "onClick", "javascript: talk_stranger();")
        document.getElementById("Choice5").setAttribute( "onClick", "javascript: cavernCrossing();")
    }

}
function rent_room() {
    hideallbuttons();
    document.getElementById("gamewindow").innerHTML= ''
    if (player.gold >= 5){
        player.gold -= 5;
        player.hp += 20;
        player.spells += 3;
        if (player.hp > player.maxhp)
            {player.hp = player.maxhp}
        if (player.spells > player.spellsmax)
            {player.spells = player.spellsmax}
        day_pass();
        playerstats.innkeeper += 1;
        printLetterByLetter("gamewindow", `Thom takes 5 gold from you and hands you a key to a room. You eat a delicious meal, then go up to sleep on a soft bed in a quiet room.  // It is a very restful night. In the morning you blink at the sunlight and stretch, feeling refreshed.`)
        document.getElementById("Choice6").innerHTML = `Continue`
        setTimeout(button_show, 3000, "Choice6", "show")
        document.getElementById("Choice6").setAttribute( "onClick", "javascript: diamond_inn();" )

    }

    else {printLetterByLetter("gamewindow", `Thom rubs his chin. 'Ah, you don't have enough gold for that I'm afraid. You're welcome to sleep in the barn, though.'`)
        document.getElementById("Choice6").innerHTML = `Sleep in the barn`
        document.getElementById("Choice5").innerHTML = "Back"
        button_show("Choice6", "show")
        button_show("Choice5", "show")
        document.getElementById("Choice6").setAttribute( "onClick", "javascript: sleep_barn();" )
        document.getElementById("Choice5").setAttribute( "onClick", "javascript: diamond_inn();")
    }

}

function sleep_barn() {
    hideallbuttons();
    document.getElementById("gamewindow").innerHTML= ''
    printLetterByLetter("gamewindow", `Thom leads you out to the barn, and shows you where you can lay down in some hay. \nThe sounds and smells of the animals make it difficult to sleep, but you manage to get some rest.`)
    player.hp += 10
    player.spells += 1
    playerstats.innkeeper += 1
    if (player.hp > player.maxhp)
        {player.hp = player.maxhp}
    if (player.spells > player.spellsmax)
        {player.spells = player.spellsmax}
    day_pass()
    document.getElementById("Choice6").innerHTML = `Continue`
    setTimeout(button_show, 3000, "Choice6", "show")
    document.getElementById("Choice6").setAttribute( "onClick", "javascript: diamond_inn();" )

}

function day_pass(){
    player.inn = 1;
    playerstats.tanias_store = 0;
}


    // elif choice == "2":
    //     clear()
    //     if len(playerstats.enemies_killed) == 0:
    //         print_slow(
    //             f"You approaches the man in the corner, but he doesn't look up. He won't even aknowledge that you are there.")
    //         input("Press enter to continue")
    //         clear()
    //     if len(playerstats.enemies_killed) > 0 and playerstats.strangerquest == 0:
    //         print_slow(f"The man's eyes glint at you from the shadow beneath his hood. \n 'I see you can take care of yourself. \nSo many people come here and wander into that cavern and die, it's not worth talking to anyone until they've been in there. \nSince you might not be a waste of my time, I've got a proposition for you.'")
    //         input("Press enter to continue")
    //         clear()
    //         print_slow(
    //             "'Bring me five goblin heads and I'll reward you with 50 gold, \nand also, I'll tell you a little secret that might help you on your way...'")
    //         print_Xslow("...")
    //         print_slow(
    //             "'My name? Eh... let's just stay strangers for now. Until I know you're worth my time...")
    //         playerstats.strangername = "the stranger"
    //         input("Press enter to continue")
    //         clear()
    //         playerstats.strangerquest = 1
    //         continue
    //     if playerstats.strangerquest == 1 and playerstats.goblinheads < 5:
    //         print_slow(
    //             "The stranger nods at you. 'Let me know when you have all those heads. I'll be waiting here.'")
    //         input("Press enter to continue")
    //         clear()
    //     if playerstats.goblinheads == 5 and playerstats.strangerquest == 1:
    //         print_slow(
    //             f"The stranger smiles and takes the bag of bloody heads from you. \n 'Wow, I didn't think you'd really be able to do it. I'm impressed. What's your name, {player.pclass}?")
    //         print_Xslow("...")
    //         print_slow(
    //             f"{player.name}, eh? Well, nice to meet you, {player.name}, I'm Griz. Here's what I promised you. I'm a man of my word, you know.")
    //         print_slow(
    //             f"Griz hands you a bag of gold. \nYou gain 50 gold.")
    //         print_slow("You gain 35 experience points.")
    //         input("Press enter to continue")
    //         clear()
    //         player.exp += 35
    //         player.gold += 50
    //         playerstats.goblinheads -= 5
    //         playerstats.strangername = "Griz"
    //         playerstats.strangerquest = 2
    //         print_slow(
    //             f"Griz leans in close. He smells of blood and smoke. \n'Now, I'll tell you my secret. \nJust west of town, beyond the graveyard, there's a place where people like you gather to train, \nand to learn new abilities and ways of fighting. I'm sure you can learn something there.' \nGriz leans back in his chair and smiles at you. 'And if they give you any trouble, just say Griz sent you. \nGood luck, {player.name}. Talk to me again later, maybe I'll have something else for you.'")
    //         input("Press enter to continue")
    //         clear()
    //         continue
    //     if playerstats.strangerquest == 2:
    //         print_slow(
    //             f"Griz smiles at you. 'Hey {player.name}, glad to see you. I hear you've killed {playerstats.goblin} goblins since you've been in town. The goblin king is getting worried...")
    //         input("Press enter to continue")
    //         clear()
    //         }




// EQUIPMENT


// # this returns the price, cost and description of the items in the game
function price_cost(item){
    sellfor = 0
    buyfor = 0
    desc = ""
    // SWORDS
    if (item == "Basic Sword"){ 
        sellfor = 5
        buyfor = 10
        desc = "This is a basic sword, nothing special, it cuts things."}
    else if (item == "Rusted Sword"){
        sellfor = 1
        buyfor = 3
        desc = "This doesn't look very sharp..."}
    else if (item == "Sharp Sword"){
        sellfor = 15
        buyfor = 35
        desc = "This looks pretty sharp, does slightly more damage than the average sword."}
    else if (["Jeweled Sword", "Jeweled Staff", "Jeweled Mace"].includes(item)){ 
        sellfor = 35
        buyfor = 100
        desc = "This doesn't do anything special, but it sure is pretty... pretty expensive."}
// MACES
    else if (item == "Basic Mace"){  
        sellfor = 5
        buyfor = 10
        desc = "This is a basic Mace, nothing special, it hits things."}
    else if (item == "Rusted Mace"){
        sellfor = 1
        buyfor = 3
        desc = "This looks like it might fall apart..."}
    else if (item == "Heavy Mace"){
        sellfor = 15
        buyfor = 35
        desc = "This looks pretty heavy, does slightly more damage than the average Mace."}
// # STAFFS (wizard basic weapon)
    else if (item == "Basic Staff"){  
        sellfor = 5
        buyfor = 10
        desc = "This is a basic Staff, nothing special."}
    else if (item == "Cracked Staff"){
        sellfor = 1
        buyfor = 3
        desc = "This looks like it might fall apart..."}
    else if (item == "Runed Staff"){
        sellfor = 15
        buyfor = 35
        desc = "This looks slightly magical, it adds 1 to your spell dammage."}
    // # armor
    else if (item == "Padded Cloth Armor"){
        sellfor = 10
        buyfor = 25
        desc = "Better protection than normal clothing, but not by much. Gives a +1 to armor. \nSpells cast while wearing this have a 5% chance of failure"}
    else if (item == "Leather Armor"){
        sellfor = 15
        buyfor = 35
        desc = "Tough leather armor, the minimum protection a warrior would want. Gives a +2 to armor. \nSpells cast while wearing this have a 10% chance of failing."}
    else if (item == "Spiked Leather Armor"){
        sellfor = 25
        buyfor = 55
        desc = "Tough, thick, protective armor, but slightly slowing. Gives a +3 to armor, but a -1 to speed. \n Spells cast while wearing this have a 15% chance of failing."}
    else if (item == "Runed Staff"){
        sellfor = 15
        buyfor = 35
        desc = "This looks slightly magical, it adds 1 to your spell dammage."}
    // # potions
    else if (item == "Health Potion"){
        sellfor = 3
        buyfor = 5
        desc = "This is a basic health potion. It heals the user for 3-6 health."}
    else if (item == "Mana Potion"){
        sellfor = 3
        buyfor = 5
        desc = "This is a basic mana potion, it refills 1 spell."}
    else
        {printLetterByLetter("gamewindow", `something is wrong with price_cost`, 30)}
    return sellfor, buyfor, desc
}

// # various categories of weapons and armor, used to select random, but not entirely random, items. 
const softArmorList = ["Padded Cloth Armor", "Leather Armor", "Spiked Leather Armor"]
const hardArmorList = ["Scale Armor", "Chainmail Armor", "Plate Armor"]
const basicArmorList = softArmorList + hardArmorList
const basicSwordList = ["Rusted Sword", "Basic Sword",
                  "Sharp Sword", "Jeweled Sword"]
const basicMaceList = ["Rusted Mace", "Basic Mace", "Heavy Mace", "Jeweled Mace"]
const basicStaffList = ["Cracked Staff", "Basic Staff",
                   "Runed Staff", "Jeweled Staff"]
const basicWeaponList = basicSwordList + basicMaceList + basicStaffList
const allWeaponsList = basicWeaponList
const allArmorList = softArmorList + hardArmorList
const allEquipablesList = allWeaponsList + allArmorList


function equip(item) {
    if (allWeaponsList.includes(item)){
        if (playerWeapon.name){
            player.equipment.append(playerWeapon.name)}
        playerWeapon.name = item
        playerWeapon.displayname = item}
    if (allArmorList.includes(item)){
        if (playerArmor.name){
            player.equipment.append(playerArmor.name)}
        playerArmor.name = item
        playerArmor.displayname = item}
    player.equipment.splice(player.equipment.indexOf(item), 1);
    if (item == "Basic Sword"){
        playerWeapon.dmgtype = "slash"
        playerWeapon.mindmg = 1
        playerWeapon.maxdmg = 6}
    else if (item == "Rusted Sword"){
        playerWeapon.dmgtype = "slash"
        playerWeapon.mindmg = 1
        playerWeapon.maxdmg = 5}
    else if (item == "Sharp Sword"){
        playerWeapon.dmgtype = "slash"
        playerWeapon.mindmg = 1
        playerWeapon.maxdmg = 7}
    else if (item == "Jeweled Sword"){
        playerWeapon.dmgtype = "slash"
        playerWeapon.mindmg = 1
        playerWeapon.maxdmg = 6}
    else if (item == "Basic Mace"){
        playerWeapon.dmgtype = "blunt"
        playerWeapon.mindmg = 1
        playerWeapon.maxdmg = 6}
    else if (item == "Rusted Mace"){
        playerWeapon.dmgtype = "blunt"
        playerWeapon.mindmg = 1
        playerWeapon.maxdmg = 5}
    else if (item == "Heavy Mace"){
        playerWeapon.dmgtype = "blunt"
        playerWeapon.mindmg = 1
        playerWeapon.maxdmg = 7}
    else if (item == "Jeweled Mace"){
        playerWeapon.dmgtype = "blunt"
        playerWeapon.mindmg = 1
        playerWeapon.maxdmg = 6}
    else if (item == "Basic Staff"){
        playerWeapon.dmgtype = "blunt"
        playerWeapon.mindmg = 1
        playerWeapon.maxdmg = 4}
    else if (item == "Cracked Staff"){
        playerWeapon.dmgtype = "blunt"
        playerWeapon.mindmg = 1
        playerWeapon.maxdmg = 3}
    else if (item == "Runed Staff"){
        playerWeapon.dmgtype = "blunt"
        playerWeapon.mindmg = 1
        playerWeapon.maxdmg = 4
        playerWeapon.spelldmg_bonus = 1}
    else if (item == "Jeweled Staff"){
        playerWeapon.dmgtype = "blunt"
        playerWeapon.mindmg = 1
        playerWeapon.maxdmg = 4}
    else if (item == "Padded Cloth Armor"){
        playerArmor.ac_bonus = 1
        playerArmor.spellfail_chance = 5}
    else if (item == "Leather Armor"){
        playerArmor.ac_bonus = 2
        playerArmor.spellfail_chance = 10
        playerArmor.speed_bonus = -1}
    else if (item == "Spiked Leather Armor"){
        playerArmor.ac_bonus = 3
        playerArmor.spellfail_chance = 15
        playerArmor.speed_bonus = -2}
    else
        {{printLetterByLetter("gamewindow", `that is not equipable`, 30)}}
}