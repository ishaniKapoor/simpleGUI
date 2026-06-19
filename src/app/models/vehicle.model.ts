export enum Status {
    ACTIVE = "ACTIVE",
    OFFLINE = "OFFLINE",
    CHARGING = "CHARGING",
    MAINTENANCE = "MAINTENANCE"
}

export interface Location {
    city: string;
    latitude: number;
    longitude: number;
}

export interface Vehicle {
    id: string;
    name: string;
    status: Status;
    battery: number;
    location: Location;
}
