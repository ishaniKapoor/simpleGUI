import { Injectable } from '@angular/core';
import { Status, Vehicle } from '../models/vehicle.model';

@Injectable({
  providedIn: 'root'
})
export class VehiclesService {

  constructor() { }

  getVehicles(): Vehicle[] {
    return generateMockData();
  }
}

export function generateMockData(): Vehicle[] {
  return mockData;
}

const mockData: Vehicle[] = [
  {
    id: '0',
    name: 'Tesla Model 3',
    status: Status.ACTIVE,
    battery: 20,
    location: {
      city: 'Detroit',
      latitude: 13,
      longitude: 24
    }
  },
  {
    id: '1',
    name: 'Tesla Model Y',
    status: Status.ACTIVE,
    battery: 20,
    location: {
      city: 'Detroit',
      latitude: 20,
      longitude: 240
    }
  },
  {
    id: '2',
    name: 'Waymo One',
    status: Status.OFFLINE,
    battery: 0,
    location: {
      city: 'New York City',
      latitude: 140,
      longitude: 24
    }
  },
  {
    id: '3',
    name: 'Cruise Origin',
    status: Status.CHARGING,
    battery: 50,
    location: {
      city: 'San Francisco',
      latitude: 800,
      longitude: 300
    }
  },
  {
    id: '4',
    name: 'Lucid Air',
    status: Status.MAINTENANCE,
    battery: 100,
    location: {
      city: 'Los Angeles',
      latitude: 130,
      longitude: 240
    }
  },
  {
    id: '5',
    name: 'Rivian R1T',
    status: Status.ACTIVE,
    battery: 0,
    location: {
      city: 'New York City',
      latitude: 5,
      longitude: 24
    }
  },
  {
    id: '6',
    name: 'Hyundai Ioniq',
    status: Status.CHARGING,
    battery: 50,
    location: {
      city: 'Austin',
      latitude: 400,
      longitude: 24
    }
  },
  {
    id: '7',
    name: 'BMW i4',
    status: Status.ACTIVE,
    battery: 50,
    location: {
      city: 'Dallas',
      latitude: 13,
      longitude: 600
    }
  },
  {
    id: '8',
    name: 'Nissan Leaf',
    status: Status.CHARGING,
    battery: 30,
    location: {
      city: 'San Diego',
      latitude: 10,
      longitude: 650
    }
  }
];
