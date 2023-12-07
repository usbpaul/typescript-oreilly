// ------------------------
// Exercise 2.1: Interfaces
// ------------------------

// Create an interface called "Plant". It should have the following properties:
// - name of type string
// - leafColor which can be either "green", "yellow", "red" or "brown"
// - isEvergreen: boolean
// Both "name" should be readonly.

type LeafColor = 'green' | 'yellow' | 'red' | 'brown';

interface Plant {
  readonly name: string;
  leafColor: LeafColor;
  isEvergreen: boolean;
}

const alocasiaZebrina: Plant = {
  name: 'Alocasia Zebrina',
  leafColor: 'green',
  isEvergreen: true,
};

// @ts-expect-error
alocasiaZebrina.name = 'Alocasia Zebrina';
// @ts-expect-error
alocasiaZebrina.leafColor = 'purple';
alocasiaZebrina.leafColor = 'green';

// ------------------------------
// Exercise 2.2: Index signatures
// ------------------------------

// Create an interface called "PlantCollection". It should hold a collection of plants by name.

interface PlantCollection {
  [name: string]: Plant;
}

const plants: PlantCollection = {
  'Alocasia Zebrina': alocasiaZebrina,
  'Photinia x fraseri': { name: 'Photinia x fraseri', leafColor: 'red', isEvergreen: true },
};


// Make sure that retrieving a plant from the collection can be undefined. Tip: there are 2 ways to accomplish this.

// @ts-expect-error
const nonExistingPlant: Plant = plants['Non-existing plant'];

// ---------------------
// Exercise 2.3: Classes
// ---------------------

// Create a class called "Household". It should have the following properties:
// - plants: a private PlantCollection
// - constructor: should accept a PlantCollection and assign it to the plants property
// - addPlant: should accept a Plant and add it to the plants property
// - removePlant: should accept a string and remove the plant from the plants property
// - printPlants: should print all plants in the plants property: 
//    "The household has the following plants: Alocasia Zebrina (green and evergreen), Photinia x fraseri (red and evergreen)"

class Household {
  private plants;
  constructor(plants: PlantCollection) {
    this.plants = plants;
  }

  addPlant(plant: Plant) {
    this.plants[plant.name] = plant;
  }

  removePlant(plantName: string) {
    delete this.plants[plantName];
  }

  describePlants() {
    const plants = Object.values(this.plants);
    const plantDescriptions = plants.map((plant) => `${plant.name} (${plant.leafColor} and ${plant.isEvergreen ? 'evergreen' : 'not evergreen'})`);
    return `The household has the following plants: ${plantDescriptions.join(', ')}`;
  }
}


const household = new Household(plants)
household.addPlant({ name: 'Fagus sylvatica', leafColor: 'green', isEvergreen: false });
household.removePlant('Alocasia Zebrina');
const description = household.describePlants();
console.log(description);
const expected = 'The household has the following plants: Photinia x fraseri (red and evergreen), Fagus sylvatica (green and not evergreen)';
if (description !== expected){
  throw new Error(
    `Description not equal.\nExpected: ${expected}\nGot:      ${description}`
  );
}


