export interface User {
  id:number;
  email:string;
  password:string;
  name:string;
  surname:string;
  country:string;
  city:string;
  street:string;
  phone:string;
  blocked:boolean;
  active:boolean;
  role:Role;
}

export enum Role{
  User = 'User', Admin= 'Admin', SuperAdmin= 'SuperAdmin', Official= 'Official'
}