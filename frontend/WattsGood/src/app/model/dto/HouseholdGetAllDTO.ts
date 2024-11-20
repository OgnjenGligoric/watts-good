export interface HouseholdGetAllDTO {
    id: number;
    apartmentNumber: number;
    propertyId: number;
    address: string;
    cityName: string;
    squareMeters: number;
    floorNumber: number;
    lastHeartbeatTimestamp: number;
    active: boolean;
  }
  