export interface Property {
  id: number;
  ownerId: number;
  address: string;
  location: Location;
  cityId: number;
  numberOfFloors: number;
  requestStatus: PropertyRequest;
  submissionDate: number;
  completionDate: number;
}

export enum PropertyRequest {
  Accepted,Pending,Declined
}

