export interface Trip {
  fromStationId: object | string,
  price: number,
  startTime: string | Date,
  toStationId: object | string,
  _id?: string,
  seats?: Array<any>,
}