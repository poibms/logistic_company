export enum OrderStasus {
  NOT_ASSIGNED = 'not_assigned',
  IN_PROGRESS = 'in_progress',
  DONE = 'done',
}

export type assignOrderType = {
  orderId: string;
  driverId: string;
};
