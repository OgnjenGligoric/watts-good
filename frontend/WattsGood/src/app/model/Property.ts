import {PropertyRequest} from "./PropertyRequest";
import {City} from "./City";
import {Household} from "./Household";
import {Location} from "./Location";

export interface Property {
  owner: number | null;
  address: string;
  location: Location;
  city: City;
  households: Household[];
  numberOfFloors: number;
  requestStatus: PropertyRequest;
  submissionDate: Date;
  completionDate: Date | null;
}
