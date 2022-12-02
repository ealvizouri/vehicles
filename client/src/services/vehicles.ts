import _fetch from 'app/fetch';
import type { VehicleType } from 'app/store/vehicleSlice';

export const fetchVehicles = async () => {
  return await _fetch({
    endpoint: 'vehicles'
  });
};

export const fetchVehicle = async (vin: string) => {
  return await _fetch({
    endpoint: `vehicles/${vin}`
  });
};

/* REGARDING FormData instead of JSON
https://github.com/expressjs/multer/issues/776
*/

export const saveVehicle = async (vehicle: VehicleType | FormData ) => {
  return await _fetch({
    endpoint: 'vehicles',
    method: 'POST',
    isJson: false,
    body: vehicle
  });
}

export const updateVehicle = async (vehicle: VehicleType | FormData ) => {
  return await _fetch({
    endpoint: 'vehicles',
    method: 'PUT',
    isJson: false,
    body: vehicle
  });
}
