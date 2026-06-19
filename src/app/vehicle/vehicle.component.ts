import { Component, OnInit } from '@angular/core';
import { Vehicle, Status } from '../models/vehicle.model';
import { VehiclesService } from '../services/vehicles.service';

@Component({
  selector: 'app-vehicle',
  templateUrl: './vehicle.component.html',
  styleUrls: ['./vehicle.component.css']
})
export class VehicleComponent implements OnInit {

  vehicles: Vehicle[] = [];
  filteredVehicles: Vehicle[] = [];
  searchTerm = '';
  selectedStatus = 'all';
  sortOrder: 'asc' | 'desc' | 'none' = 'none';

  columns = [
    { key: 'id', label: 'ID' },
    { key: 'name', label: 'Model' },
    { key: 'battery', label: 'Battery' },
    { key: 'city', label: 'City', get: (v: Vehicle) => v.location?.city }
  ]

  constructor(private vehiclesService: VehiclesService) { }

  ngOnInit(): void {
    this.vehicles = this.vehiclesService.getVehicles();
    this.filteredVehicles = this.vehicles;
  }

  trackById(_: number, v: Vehicle) {
    return v.id;
  }

  onSearch(searchTerm: string): void {
    this.searchTerm = searchTerm;
    this.applyFilters();
  }

  filterTable(status: string): void {
    this.selectedStatus = status;
    this.applyFilters();
  }

  sortAsc(): void {
    this.sortOrder = 'asc';
    this.applyFilters();
  }

  sortDesc(): void {
    this.sortOrder = 'desc';
    this.applyFilters();
  }

  clearSort(): void {
    this.sortOrder = 'none';
    this.applyFilters();
  }

  private applyFilters(): void {
    const term = this.searchTerm.trim().toLowerCase();
    const status = this.selectedStatus.toLowerCase();

    const filtered = this.vehicles.filter(vehicle => {
      const cityCheck = vehicle.location?.city?.toLowerCase() ?? '';
      const idCheck = vehicle.id.toLowerCase();
      const statusCheck = String(vehicle.status).toLowerCase();

      const matchesSearch = !term || cityCheck.includes(term) || idCheck.includes(term);
      const matchesStatus = status === 'all' || statusCheck === status;
      return matchesSearch && matchesStatus;
    });

    this.filteredVehicles = this.applySort(filtered);
  }

  private applySort(vehicles: Vehicle[]): Vehicle[] {
    if (this.sortOrder === 'none') {
      return vehicles;
    }

    return [...vehicles].sort((a, b) => {
      return this.sortOrder === 'asc'
        ? a.battery - b.battery
        : b.battery - a.battery;
    });
  }

  getValue(vehicle: Vehicle, key: string): any {
    return (vehicle as any)[key];
  }


  // filter active vehicles
  getActive(vehicles: Vehicle[]): Vehicle[] {
    return vehicles.filter(vehicle => vehicle.status === Status.ACTIVE);
  }

  // sort by battery ascending
  sortByBatteryAsc(vehicles: Vehicle[]): Vehicle[] {
    return vehicles.sort((a, b) => a.battery - b.battery);
  }

  // group by city
  groupByCity(vehicles: Vehicle[]): Record<string, Vehicle[]> {
    return vehicles.reduce((acc, vehicle) => {
      const city = vehicle.location.city;
      if (!acc[city]) {
        acc[city] = [];
      }
      acc[city].push(vehicle);
      return acc;
    }, {} as Record<string, Vehicle[]>);
  }

  // count vehicles in each status
  countVehiclesByStatus(vehicles: Vehicle[]): Record<Status, number> {
    return vehicles.reduce((acc, vehicle) => {
      if (!acc[vehicle.status]) {
        acc[vehicle.status] = 0;
      }
      acc[vehicle.status] += 1;
      return acc;
    }, {} as Record<Status, number>);
  }

  // remove duplicate ids
  removeDuplicateIds(vehicles: Vehicle[]): Vehicle[] {
    const seen = new Set<string>();
    return vehicles.filter(vehicle => {
      if (seen.has(vehicle.id)) return false;
      seen.add(vehicle.id);
      return true;
    })
  }
}
