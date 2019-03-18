// Enforcing const and let
const num = 4;
num = 3;





// Enforcing type of previous
let newNum = 4;
newNum = "test";






// Type annotations
const annotatedConstant: number = 4;
const wronglyAnnotatedConstant: number = "test";


// Interfaces
interface Toy {
  name: string;
  material: string;
}

interface Dog {
  name: string;
  breed: string;
  age: number;
  favoriteToy?: Toy;
}

interface Household {
  dogs: Dog[];
  numPeople: number;
}

const myHouse: Household = { dogs: [{ name: "Chip", breed: "Healer" }]}; // Add numPeople first, then age
const myRealHouse: Household = { dogs: [{ name: "Chip", breed: "Healer", age: 10 }], numPeople: 4 };

const getOldestDog = (house: Household) => house.dogs.sort((dog1: Dog, dog2: Dog) => dog1.age - dog2.age)

const getFavoriteToys = (house: Household): (Toy | undefined)[] => house.dogs.map(dog => dog.favoriteToy);

const getMaterial = (toy: Toy) => toy.material;

getFavoriteToys(myRealHouse).map(getMaterial);

const getMaterialUndefinedSafe = (toy: Toy | undefined): string => {
  if (toy) {
    return toy.material;
  }
  return "";
}

getFavoriteToys(myRealHouse).map(getMaterialUndefinedSafe);

export const test = null;