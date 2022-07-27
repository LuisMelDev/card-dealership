import { Injectable, NotFoundException } from '@nestjs/common';

export interface Car {
  id: number;
  name: string;
  year: string;
  color: string;
}

@Injectable()
export class CarsService {
  private readonly cars: Car[] = [
    {
      id: 1,
      name: 'Ford',
      year: '1954',
      color: 'red',
    },
    {
      id: 2,
      name: 'Chevrolet',
      year: '1955',
      color: 'blue',
    },
    {
      id: 3,
      name: 'Toyota',
      year: '1956',
      color: 'green',
    },
  ];

  findAll(): Car[] {
    return this.cars;
  }

  findOneById(id: number): Car {
    const car = this.cars.find((car) => car.id === id);

    if (!car) throw new NotFoundException('Car not found');

    return car;
  }
}
