class Vampire {
  constructor(name, yearConverted) {
    this.name = name;
    this.yearConverted = yearConverted;
    this.offspring = [];
    this.creator = null;
  }

  /** Simple tree methods **/

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
    let numberOfVampire = 0;
    let currentVampire = this;

    while (currentVampire.creator) {
      currentVampire = currentVampire.creator;
      numberOfVampire++;
    }
    return numberOfVampire;
  }

  // Returns true if this vampire is more senior than the other vampire. (Who is closer to the original vampire)
  isMoreSeniorThan(vampire) {
    return (
      this.numberOfVampiresFromOriginal < vampire.numberOfVampiresFromOriginal
    );
  }

  /** Tree traversal methods **/

  // Returns the vampire object with that name, or null if no vampire exists with that name
  vampireWithName(name) {
    if (this.name === name) {
      return this;
    }

    for (const offspringVamp of this.offspring) {
      if (offspringVamp.vampireWithName(name)) {
        return offspringVamp.vampireWithName(name);
      }
    }

    return null;
  }

  // Returns the total number of vampires that exist
  get totalDescendents() {
    let total = 0;

    if (this.offspring.length > 0) {
      for (const offspringVamp of this.offspring) {
        total++;

        if (offspringVamp.offspring.length > 0) {
          total += offspringVamp.totalDescendents;
        }
      }
    }

    return total;
  }

  // Returns an array of all the vampires that were converted after 1980
  get allMillennialVampires() {
    let vampires = [];

    if (this.yearConverted > 1980) {
      vampires.push(this);
    }

    for (const offspring of this.offspring) {
      const millennialOffspring = offspring.allMillennialVampires;
      vampires = vampires.concat(millennialOffspring);
    }

    return vampires;
  }

  /** Stretch **/

  // Returns the closest common ancestor of two vampires.
  // The closest common anscestor should be the more senior vampire if a direct ancestor is used.
  // For example:
  // * when comparing Ansel and Sarah, Ansel is the closest common anscestor.
  // * when comparing Ansel and Andrew, Ansel is the closest common anscestor.
  closestCommonAncestor(vampire) {
    if (vampire === this) return this;

    // If one or the other is the creator
    if (vampire === this.creator) return vampire;
    if (this === vampire.creator) return this;

    // If same creator
    if (vampire.creator === this.creator) return this.creator;

    // If any of vampire is root
    if (vampire.creator === null) return vampire;
    if (this.creator === null) return this;

    // Use recursion/depth tree traversal to move up tree node comparing higher-order ancestor
    if (vampire.creator !== this.creator) {
      let creatorClosestAncestor;
      let upperVampire;

      if (this.isMoreSeniorThan(vampire)) {
        upperVampire = vampire.creator;
        while (!creatorClosestAncestor) {
          creatorClosestAncestor = this.closestCommonAncestor(upperVampire);
          upperVampire = upperVampire.creator;
        }
      }

      if (vampire.isMoreSeniorThan(this)) {
        upperVampire = this.creator;
        while (!creatorClosestAncestor) {
          creatorClosestAncestor = upperVampire.closestCommonAncestor(vampire);
          upperVampire = upperVampire.creator;
        }
      }

      return creatorClosestAncestor;
    }
  }
}

module.exports = Vampire;
