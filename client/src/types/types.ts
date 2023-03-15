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

export type UserType = {
  id: string;
  email: string;
  role: string;
}

export enum OrderStatus {
  NOT_ASSIGNED = 'not_assigned',
  IN_PROGRESS = 'in_progress',
  DONE = 'done',
}

export type OrderType = {
  id: string,
  cargo_name: string,
  weight: string,
  from: string,
  to: string,
  image: string,
  status: OrderStatus,
  ownerId?: string,
  driverId?: string
}
