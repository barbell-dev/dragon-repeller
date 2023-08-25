let xp = 0;
let health = 100;
let gold = 50;
let currentWeapon = 0; //corresponds to the index of the weapon in the weapons array. You start with a stick by default.
let fighting;
let monsterHealth;
let inventory = ["stick"];

/*Var allows the most changing(can lead to bugs). const cannot be updated/changed.*/
const button1 = document.querySelector("#button1");
const button2 = document.querySelector("#button2");
const button3 = document.querySelector("#button3");
const text = document.querySelector("#text");
const xpText = document.querySelector("#xpText");
const healthText = document.querySelector("#healthText");
const goldText = document.querySelector("#goldText");
const monsterStats = document.querySelector("#monsterStats");
const monsterNameText = document.querySelector("#monsterName");
const monsterHealthText = document.querySelector("#monsterHealth");
const locations = [
  {
    name: "town square",
    "button text": ["Got to store", "Go to cave", "Fight Slime"],
    "button functions": [goStore, goCave, fightSlime],
    text: "You are in the town square. You see a sign that says \"Store\""
  },
  {
    name: "store",
    "button text": ["Buy 10 health (10 gold)", "Buy weapon (30 gold)", "Go to town square."],
    "button functions": [buyHealth, buyWeapon, goTown],
    text: "You've entered the store"
  },
  {
    name: "cave",
    "button text": ["Fight Dragon", "Fight Beast", "Go to town square"],
    "button functions": [fightDragon, fightBeast, goTown],
    text: "You have entered the cave. You can see some monsters!"
  },
  {
    name: "fight",
    "button text": ["Attack", "Dodge", "Run"],
    "button functions": [attack, dodge, goTown],
    text: "You are fighting a monster"
  },
  {
    name: "kill monster",
    "button text": ["Fight beast", "Fight Dragon", "Go to Town Square"],
    "button functions": [fightBeast, fightDragon, goTown],
    text: "You have slayed the monster! Congratulations !"
  },
  {
    name: "defeated",
    "button text": ["Replay?", "Replay?", "Replay?"],
    "button functions": [restart, restart, restart],
    text: "You have been slayed by the monster. Better luck next time."
  }
];
const weapons = [{
  name: "stick",
  power: 5
},
{
  name: "dagger",
  power: 10
}, {
  name: "sword",
  power: 50
}, {
  name: "clawhammer",
  power: 100
}]
const monsters = [
  {
    name: "slime",
    level: 2,
    health: 15
  },
  {
    name: "beast",
    level: 8,
    health: 60
  },
  {
    name: "dragon",
    level: 20,
    health: 300
  }]
//initialise buttons
button1.onclick = goStore;
button2.onclick = goCave;
button3.onclick = fightSlime;
// button4.onclick = sellWeapon;
function update(location) {
  button1.innerText = location["button text"][0];
  button2.innerText = location["button text"][1];
  button3.innerText = location["button text"][2];
  button1.onclick = location["button functions"][0];
  button2.onclick = location["button functions"][1];
  button3.onclick = location["button functions"][2];
  text.innerText = location.text;  // \ is the escape sequence that says the double quote should be rendered on the screen.
}
function goTown() {
  update(locations[0]);
  monsterStats.style.display = "none"; //trying to displpay monster stats when fihgitng the monster


}
function goStore() {
  update(locations[1])
}
function goCave() {
  update(locations[2])
}

function buyHealth() {
  if (gold >= 10) {
    gold -= 10;
    health += 10;
    healthText.innerText = health;
    goldText.innerText = gold;
  }
  else {
    text.innerText = "You are short on gold."
  }
}

function buyWeapon() {
  if (currentWeapon < weapons.length - 1) {
    if (gold >= 30) {
      gold -= 30;
      currentWeapon++;
      goldText.innerText = gold;
      let newWeapon = weapons[currentWeapon].name;

      text.innerText = "You now have a new weapon : " + newWeapon + ".";
      inventory.push(newWeapon);
      // console.log(inventory);
      text.innerText += "In your inventory , you now have : " + inventory;
    }
    else {
      text.innerText = "You dont have enough gold to buy a new weapon.";
    }
  }
  else {
    text.innerText = "You already have the most powerful weapon!";
    button2.innerText = "Sell weapon(15 gold)"//Trying to sell weapons for gold as you already have the most powerful weapon.
    button2.onclick = sellWeapon;
  }

}
function sellWeapon() {
  if (inventory.length >= 1) {
    currentWeapon -= 1;
    soldWeapon = inventory.pop();
    text.innerText = "You have sold your " + soldWeapon + ".";
    gold += 15;
    goldText.innerText = gold;
  }
  else {
    text.innerText = "Your inventory is empty!";
  }
}


function fightSlime() {
  fighting = 0; //fighting = 0 indicates that the user is fighting the slime(first element in the monster's array)
  goFight();
  
}
function fightBeast() {
  fighting = 1;
  goFight();
}
function fightDragon() {
  fighting = 2;
  goFight();
  // console.log("Going to fight the dragon.");
}

function goFight() {
  update(locations[3]);
  monsterHealth = monsters[fighting].health;
  monsterStats.style.display = "block"; //trying to displpay monster stats when fighting the monster
  monsterName.innerText = monsters[fighting].name;
  monsterHealthText.innerText = monsterHealth;

}
function attack() {
  //Math.random() returns a random number between 0 and 1.

  health -= monsters[fighting].level;
  monsterHealth -= weapons[currentWeapon].power +
    Math.floor(Math.random() * xp) + 1;
  monsterHealthText.innerText = monsterHealth;
  healthText.innerText = health;
  if (health <= 0) {
    lose();
  }
  else if (monsterHealth <= 0) {
    if(fighting!=2){
      defeatMonster();  
      fighting++;
    }
    else{
      winGame();
    }
    }
}

function dodge() {
  text.innerText = "You dodge the attack from the " + monsters[fighting].name + "."

}
function defeatMonster() {
  gold += Math.floor(monsters[fighting].level) * 10;
  xp += monsters[fighting].level;
  goldText.innerText = gold;
  xpText.innerText = xp;
  update(locations[4]);
}
function lose() {

  update(locations[5]);
}
function restart() {
  xp = 0;
  gold = 50;
  health = 100;
  healthText.innerText = health;
  goldText.innerText = gold;
  xpText.innerText = xp;
  goTown();
}
function winGame(){
  text.innerText = "Congratulations ! You have sayed all the monsters !"
  update(locations[5]);
}