export enum OrderStasus {
  NOT_ASSIGNED = 'not assigned',
  IN_PROGRESS = 'in progress',
  DONE = 'done',
}

export type assignOrderType = {
  orderId: string;
  driverId: string;
};
