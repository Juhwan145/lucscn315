// Base class for all characters
class Character {
    constructor(name, power, alias) {
        this.name = name;
        this.power = power;
        this.alias = alias;
    }

    displayInfo() {
        return `${this.alias} (${this.name}) - Power: ${this.power}`;
    }
}

// Superhero class extending Character
class Superhero extends Character {
    constructor(name, power, alias, team) {
        super(name, power, alias);
        this.team = team;
    }

    displayInfo() {
        return `${super.displayInfo()} | Team: ${this.team}`;
    }
}

// Villain class extending Character
class Villain extends Character {
    constructor(name, power, alias, evilPlan) {
        super(name, power, alias);
        this.evilPlan = evilPlan;
    }

    displayInfo() {
        return `${super.displayInfo()} | Evil Plan: ${this.evilPlan}`;
    }
}

// Creating instances
const hero = new Superhero("Peter Parker", "Spider Sense", "Spider-Man", "Avengers");
const villain = new Villain("Norman Osborn", "Super Intelligence", "Green Goblin", "Destroy Spider-Man");

// Displaying information
console.log(hero.displayInfo());
console.log(villain.displayInfo());
