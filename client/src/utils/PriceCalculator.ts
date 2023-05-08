interface Cargo {
  id: number;
  name: string;
}

const cargoTypeValue: Cargo[] = [
  { id: 1, name: "Bulky cargo" },
  { id: 2, name: "Car transporter" },
  { id: 3, name: "Refrigerator trailer" },
  { id: 4, name: "Common trailer" },
];

function calculateShippingCost(distance: number, cargoType: string, weight: number, volume: number): number {
  const weightCost = weight * 0.1;
  const volumeCost = volume * 0.3;
  let cargoTypeCost = 0;

  const selectedCargoType = cargoTypeValue.find((cargo) => cargo.name === cargoType);

  if (selectedCargoType) {
    switch (selectedCargoType.name) {
      case "Bulky cargo":
        cargoTypeCost = 130;
        break;
      case "Car transporter":
        cargoTypeCost = 100;
        break;
      case "Refrigerator trailer":
        cargoTypeCost = 50;
        break;
      case "Common trailer":
        cargoTypeCost = 10;
        break;
      default:
        cargoTypeCost = 0;
    }
  }

  const totalCost = weightCost + volumeCost + cargoTypeCost;

  return totalCost * (distance * 0.1);
}

export default calculateShippingCost;