class Vampire {
  constructor(name, yearConverted) {
    this.name = name;
    this.yearConverted = yearConverted;
    this.offspring = [];
    this.creator = null;
  }

  /** Simple tree methods **/
  // test 

  // Adds the vampire as an offspring of this vampire
  addOffspring(vampire) {
    this.offspring.push(vampire);
    vampire.creator = this;
  }

  // Returns the total number of vampires created by that vampire
  get numberOfOffspring() {
    return this.offspring.length;
  }

  // Returns the number of vampires away from the original vampire this vampire is
  get numberOfVampiresFromOriginal() {
    let vampireCount = 0;
    let currentVampire = this;

    while (currentVampire.creator) {
      currentVampire = currentVampire.creator;
      vampireCount++;
    }

    return vampireCount;
  }

  // Returns true if this vampire is more senior than the other vampire. (Who is closer to the original vampire)
  isMoreSeniorThan(vampire) {
    if (this.numberOfVampiresFromOriginal < vampire.numberOfVampiresFromOriginal) {
      return true;
    }
    return false;
  }

  /** Stretch **/

  // Returns the closest common ancestor of two vampires.
  // The closest common anscestor should be the more senior vampire if a direct ancestor is used.
  // For example:
  // * when comparing Ansel and Sarah, Ansel is the closest common anscestor.
  // * when comparing Ansel and Andrew, Ansel is the closest common anscestor.
  closestCommonAncestor(vampire) {
    let currentVamp = this;

    if (currentVamp.numberOfVampiresFromOriginal === 0) {
      return currentVamp
    } else if (vampire.numberOfVampiresFromOriginal === 0) {
      return vampire;
    }

    while (currentVamp.numberOfVampiresFromOriginal !== vampire.numberOfVampiresFromOriginal) {
      if (currentVamp.numberOfVampiresFromOriginal < vampire.numberOfVampiresFromOriginal) {
        vampire = vampire.creator;
      } else if (currentVamp.numberOfVampiresFromOriginal > vampire.numberOfVampiresFromOriginal) {
        currentVamp = currentVamp.creator;
      }
    }

    while (currentVamp.name !== vampire.name) {
      currentVamp = currentVamp.creator;
      vampire = vampire.creator;
    }

    return currentVamp;

  }

  // Returns the vampire object with that name, or null if no vampire exists with that name
  vampireWithName(name) {
    let vampName;

    if (this.name === name) {
      return this;
    }

    for (const child of this.offspring) {
      vampName = child.vampireWithName(name);
      if (vampName) {
        return vampName;
      }
    }

    return null;
  }

  // Returns the total number of vampires that exist
  get totalDescendents() {
    let total = 0;

    for (let child of this.offspring) {
      total += child.totalDescendents;
    }

    total += this.numberOfOffspring;

    return total;
  }

  // Returns an array of all the vampires that were converted after 1980
  get allMillennialVampires() {
    let millenials = [];

    if (this.yearConverted > 1980) {
      millenials.push(this);
    }

    for (let child of this.offspring) {
      let results = child.allMillennialVampires;
      millenials = millenials.concat(results);
    }

    return millenials;
  }
}

module.exports = Vampire;

