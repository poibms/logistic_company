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

export enum CargoType {
  BULKY_CARGO = 'Bulky cargo',
  CAR_TRANSPORTER = 'Car transporter',
  REFRIGERATOR_TRAILER = 'Refrigerator trailer',
  COMMON_TRAILER = 'Common trailer',
}

export enum OrderStatus {
  NOT_ASSIGNED = 'not_assigned',
  IN_PROGRESS = 'in_progress',
  DONE = 'done',
  CANCELED = 'canceled',
}

export type OrderCreds = {
  name: string,
  weight: string,
  fromCity: string,
  fromStreet: string,
  fromHouse: string,
  fromBuilding: string,
  toCity: string,
  toStreet: string,
  toHouse: string,
  toBuilding: string,
  price: number,
  cargo_type: string,
  distance: number, 
  volume: string,
  height: string,
  width: string,
  long: string,
  image: any,
  delivery_date: Date;
}

export type OrderType = {
  id: number,
  name: string,
  weight: string,
  from: string,
  to: string,
  image: string,
  volume: string,
  height: string,
  width: string,
  long: string,
  cargo_type: string,
  distance: number,
  date_of_the_order: string;
  expected_delivery_date: string;
  actual_delivery_date: string | null;
  fuel: number;
  price: number,
  status: OrderStatus,
  err_message: string;
  track_code: string,
  ownerId: UserType,
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
  driving_experience: string,
  docs_img: string,
  photo: string,
  truckId?: null | TruckType,
  orders: [] | OrderType[]
}

export type DriverCreds = {
  email: string,
  password: string,
  name: string,
  surname: string,
  driving_experience: string,
  photo?: any
}
export type DriverUpdateType = {
  id?: string,
  name: string,
  surname: string,
  driving_experience: string,
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
  busy_weight: number,
  photo: string,
  fuel_consumption: string;
  plate: string,
  vin: string,
  trailer_vin: string,
  trailer_height: string,
  trailer_width: string,
  trailer_long: string,
  docs_img: string;
  trailer_volume: string,
  truck_type: CargoType,
  driverId: DriverType,
}

export type TruckCreds = {
  name: string;
  model:string;
  year: string;
  loadCapacity: string;
  trailer_volume: string,
  truck_type: string,
  fuel_consumption: string,
  plate: string,
  vin: string,
  trailer_vin: string,
  trailer_height: string,
  trailer_width: string,
  trailer_long: string,
  docs_img: string;
  photo: string;
}

export type TruckUpdateType = {
  id?: string,
  trailer_volume: string,
  loadCapacity: string,
  fuel_consumption: string,
  plate: string,
  trailer_vin: string,
  trailer_height: string,
  trailer_width: string,
  trailer_long: string,
  photo?: any
}