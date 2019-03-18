// Enforcing const and let
const num = 4;
num = 3;





// Enforcing type of previous
let newNum = 4;
newNum = "test";





// Type annotations
const annotatedConstant: number = 4;
const wronglyAnnotatedConstant: number = "test";





// INTERFACES, TYPE GUARDS
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





// No numPeople object, and no age on the dog object
const myHouse: Household = { 
  dogs: [
    { 
      name: "Chip", 
      breed: "Healer",
    },
    { 
      name: "Dewey", 
      breed: "Corgi", 
      age: 13,
      favoriteToy: {
        name: "squeaker",
        material: "rubber"
      },
    },
  ]}; 





const getOldestDog = (house: Household) => 
  house.dogs.sort((dog1: Dog, dog2: Dog) => dog1.age - dog2.age)[0]

// Since the favoriteToy prop is nullable, we get an array of objects that are either of type Toy or undefined.
// Any time we use an object inside a list returned from this function, the compiler will ensure that we are using typeguards
const getFavoriteToys = (house: Household): (Toy | undefined)[] => 
  house.dogs.map(dog => dog.favoriteToy);

const getMaterial = (toy: Toy) => 
  toy.material;





// We can't map wtih getMaterial because it only takes a Toy--
// some of these may be undefined!
getFavoriteToys(myHouse).map(getMaterial); 

const getMaterialUndefinedSafe = (toy: Toy | undefined): string => {
  return toy.material; // remove
  // This is enough to verify that the object passed in is a Toy,
  // since the toy parameter is either a Toy or undefined.
  if (toy) { 
    return toy.material;
  }
  return "";
}

// Now, we have no type error
getFavoriteToys(myRealHouse).map(getMaterialUndefinedSafe);





// We can define enumerated values!
// Strings or numbers are valid!
enum CardinalDirection {
  North = "N",
  South = "S",
  East = "E",
  West = "W",
}

// We can use those enumerated values as objects in our TS, 
// but we won't have access to them at runtime.
// TS just fills in the enumerated values with their real values
const oppositeDirections = {
  [CardinalDirection.West]: CardinalDirection.East,
  [CardinalDirection.East]: CardinalDirection.West,
  [CardinalDirection.North]: CardinalDirection.South,
  [CardinalDirection.South]: CardinalDirection.North,
}

const getOppositeDirection = (direction: CardinalDirection) => {
  return oppositeDirections[direction];
}

// TS won't accept any other passed values as being typesafe
getOppositeDirection("North"); 

// TS isn't smart enough to know that this value has a map in the enum
getOppositeDirection("N"); 

// But if we use the enumerated value, it accepts it
getOppositeDirection(CardinalDirection.North); 

// We can define types unioning the literal values
type primesUnder10 = 2 | 3 | 5 | 7;

// Any time we define an object with this interface, 
// we know it has a float property, and its value is either left or right.
interface SomeCSSStylingThing {
  float: "left" | "right"; 
}

// GENERICS

class Queue<T> {
  private data: T[] = [];
  push(item: T): void { this.data.push(item); }
  pop(): T | undefined { return this.data.pop(); }
}

const stringQueue = new Queue<string>();


// TYPE ASSERTION

// Sometimes, TypeScript will get in your way, 
// and you won't know how to fix it

let newDog = {} as Dog; // !!!
newDog.name = "Precious";
newDog.age = 11;
newDog.breed = "Chihuahua";

const ourToys = getFavoriteToys({ dogs: [newDog], numPeople: 3 });

// Be VERY careful!
// Generally, you want to avoid this as much as possible.

// Note that none of these types are at run time, so you don't
// have access to this information except when typescript compiles
// it to JS.
// Once you tell TS to make an exception about the behavior you specify,
// it's up to you to make sure your program doesn't throw exceptions

export const test = null;