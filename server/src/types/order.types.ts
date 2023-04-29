export enum OrderStasus {
  NOT_ASSIGNED = 'not_assigned',
  IN_PROGRESS = 'in_progress',
  DONE = 'done',
  CANCEL = 'cancel',
}

export type assignOrderType = {
  orderId: string;
  driverId: string;
};

export enum CargoType {
  BULKY_CARGO = 'Bulky cargo',
  CAR_TRANSPORTER = 'Car transporter',
  REFRIGERATOR_TRAILER = 'Refrigerator trailer',
  COMMON_TRAILER = 'Common trailer',
}
