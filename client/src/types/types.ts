export type SignInDataType = {
  email: string;
  password: string;
};

export type SignUpDataType = {
  name: string;
  surname: string;
  phone: string;
  email: string;
  password: string;
};

export type JwtType = {
  id: string;
  email: string;
  role: string;
}

export type UserType = {
  id: string;
  name: string;
  surname: string;
  phone: string,
  email: string;
  role: string,
  orders: OrderType[];
}


export enum OrderStatus {
  NOT_ASSIGNED = 'not_assigned',
  IN_PROGRESS = 'in_progress',
  DONE = 'done',
}

export type OrderCreds = {
  name: string,
  weight: string,
  from: string,
  to: string,
  image: any,
}

export type OrderType = {
  id: number,
  name: string,
  weight: string,
  from: string,
  to: string,
  image: string,
  status: OrderStatus,
  track_code: string,
  ownerId?: UserType,
  driverId?: DriverType
}

export type AssignOrderToDriver = {
  orderId: string,
  driverId: string,
}

export type DriverType = {
  id: number,
  email: string,
  password: string,
  name: string,
  surname: string,
  age: string,
  photo: string,
  truckId?: null | TruckType,
  orders: [] | OrderType[]
}

export type DriverCreds = {
  email: string,
  password: string,
  name: string,
  surname: string,
  age: string,
  photo?: any
}

export type AssignTruckType = {
  driverId: string,
  truckId: string,
}

export type TruckType = {
  id: number,
  name: string,
  model: string,
  year: string,
  loadCapacity: string,
  photo: string,
  driverId: DriverType,
}

export type TruckCreds = {
  name: string;
  model:string;
  year: string;
  loadCapacity: string;
  photo: string;
}