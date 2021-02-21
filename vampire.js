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
    return this.numberOfVampiresFromOriginal < vampire.numberOfVampiresFromOriginal ? true : false;
  }

  /** Stretch **/

  // Returns the closest common ancestor of two vampires.
  // The closest common anscestor should be the more senior vampire if a direct ancestor is used.
  // For example:
  // * when comparing Ansel and Sarah, Ansel is the closest common anscestor.
  // * when comparing Ansel and Andrew, Ansel is the closest common anscestor.
  closestCommonAncestor(vampire) {
    if (vampire === this) {
      return this;
    }

    // if (vampire === this.creator || this === vampire.creator) {
    //   return vampire.isMoreSeniorThan(this) ? vampire : this;
    // }

    // if one or the other is the creator
    if (vampire === this.creator || this === vampire.creator) {
      return vampire === this.creator ? vampire : this;
    }

    // if same creator
    if (vampire.creator === this.creator) {
      return this.creator;

    // if not the same creator
    } else {
      // if any of vampire is root
      if (vampire.creator === null || this.creator === null) {
        return vampire.creator === null ? vampire : this;

      // return the one that is more senior?? works for test 5 some reason but wrong code probably
      // } else if (vampire.isMoreSeniorThan(this) || this.isMoreSeniorThan(vampire)) {
      //   return vampire.isMoreSeniorThan(this) ? vampire.creator : this.creator;
      
    
    } else if (vampire.isMoreSeniorThan(this)) {
      let seniorCreator = vampire.creator;
      let oneUpSeniorCreator = seniorCreator.creator;

      let juniorCreator = this.creator;
      let oneUpJuniorCreator = juniorCreator.creator;
      // let twoUpCreator = oneUpJuniorCreator.creator;

      if (oneUpSeniorCreator === oneUpJuniorCreator) {
        return oneUpSeniorCreator;
      }
    
        // if they don't have the same creator, go up in branch until they reach same creator
      // } else {
      //   let moreSeniorVampire;
      //   let moreJuniorVampire;

      //   if (vampire.isMoreSeniorThan(this)) {
      //     moreSeniorVampire = vampire;
      //     moreJuniorVampire = this;

      //   } else {
      //     moreSeniorVampire = this;
      //     moreJuniorVampire = vampire;
      //   }
        
      //   // let commonCreator;
      //   let oneHigherCreator = moreJuniorVampire.creator;
        
      //   if (moreSeniorVampire.creator === oneHigherCreator.creator) {
      //     return oneHigherCreator;
      //   }

        // return commonCreator;
      }
    }
  }
}

module.exports = Vampire;

