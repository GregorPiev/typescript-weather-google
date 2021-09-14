import * as faker from 'faker';
import { IMappable } from './CustomMap';

export class User implements IMappable {
  name: string;
  location: {
    lat: number;
    lng: number;
  };
  color = 'black';

  constructor() {
    this.name = faker.name.firstName();
    this.location = {
      lat: parseFloat(faker.address.latitude()),
      lng: parseFloat(faker.address.longitude())
    };
  }

  markerContent(): string {
    return `${this.name}`;
  }
}
