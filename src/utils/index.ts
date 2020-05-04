export const convertDataStation = (data: Array<any>) => {
  return data.map((station: any) => {
    return {
      address: station.address,
      name: station.name,
      province: station.province,
      _id: station._id,
    }
  })
}

export const convertDataTrip = (data: Array<any>) => {
  return data.map((trip: any) => {
    return {
      fromStationId: trip.fromStationId,
      price: trip.price,
      startTime: trip.startTime,
      toStationId: trip.toStationId,
      _id: trip._id
    }
  })
}