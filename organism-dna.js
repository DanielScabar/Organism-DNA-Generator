const randomNumber = (scope) => {
  return Math.floor(Math.random() * scope);
};

// Returns a random DNA base
const returnRandBase = () => {
  const dnaBases = ["A", "T", "C", "G"];
  return dnaBases[randomNumber(4)];
};

// Returns a random single strand of DNA containing 15 bases
const mockUpStrand = () => {
  const newStrand = [];
  for (let i = 0; i < 15; i++) {
    newStrand.push(returnRandBase());
  }
  return newStrand;
};

const pAequorFactory = (specimenNum, dna) => {
  pAequor = {
    specimenNum,
    dna,
    mutate() {
      const dnaIndex = randomNumber(15);
      let newBase = returnRandBase();

      while (this.dna[dnaIndex] === newBase) {
        newBase = returnRandBase();
      }

      this.dna[dnaIndex] = newBase;
      return this.dna;
    },
    compareDNA(obj) {
      let count = 0;
      for (let i = 0; i < obj.dna.length; i++) {
        if (this.dna[i] === obj.dna[i]) {
          count++;
        }
      }
      console.log(
        `speciment #${this.specimenNum} and specimen #${
          obj.specimenNum
        } have ${((count / 15) * 100).toFixed(1)}% DNA in common.`
      );
    },
    willLikelySurvive() {
      let count = 0;
      for (const base of this.dna) {
        if (base === "C" || base === "G") {
          count++;
        }
      }
      return count / 15 >= 0.6 ? true : false;
    },
    complementStrand() {
      const complementStrand = this.dna.map((element) => {
        switch (element) {
          case "A":
            return "T";
          case "T":
            return "A";
          case "C":
            return "G";
          case "G":
            return "C";
        }
      });

      return complementStrand;
    }
  };
  return pAequor;
};

let pAequorAquarium = [];
for (let i = 0; i < 30; i++) {
  pAequorAquarium.push(pAequorFactory(i, mockUpStrand()));
}

console.log(pAequorAquarium[0].dna);
console.log(pAequorAquarium[0].complementStrand());
