import { useState, useEffect, useCallback, FC } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate  } from 'react-router-dom';
import type { MakeModelType } from 'app/store/makeModelSlice';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { fetchVehicle, selectVehicle } from 'app/store/vehicleSlice';
import _fetch from 'app/fetch';
import Button from 'components/ui/Button';
import Card from 'components/ui/Card';

const Vehicle: FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const vehicle = useAppSelector(selectVehicle);
  const [make, setMake] = useState<MakeModelType | null>(null);
  const [model, setModel] = useState<MakeModelType | null>(null);
  console.log(vehicle);
  /*
  { model_id, make_id, year, email, image }
   */
  const { vin } = useParams();

  const fetchMakeAndModel = useCallback(async () => {
    if (vehicle) {
      const makeRes = await _fetch({
        endpoint: `makes/${vehicle.make_id}`
      });

      if (!makeRes.err) {
        setMake(makeRes.data);
      }

      const modelRes = await _fetch({
        endpoint: `model/${vehicle.model_id}`
      });

      if (!modelRes.err) {
        setMake(modelRes.data);
      }
    }
  }, [vehicle]);

  const onEditClick = useCallback(() => {
    navigate(`/vehicle/edit/${vin}`);
  }, [navigate, vin]);

  useEffect(() => {
    if (vin) {
      dispatch(fetchVehicle(vin));
    }
  }, [dispatch, vin]);

  useEffect(() => {
    
  }, [vehicle]);

  if (!vehicle) {
    return (
      <div>
        Savage!
      </div>
    );
  }

  return (
    <div>
      <Card imageUrl={`http://localhost:3000/vehicles/${vehicle.image}`} title={vehicle.vin} />
      <Button onClick={onEditClick}>Edit</Button>
      <Button variant="danger">Delete</Button>
      <ul>
        <li>{vehicle?.vin}</li>
        {/* <li><img alt={vim} src={image} /></li>
        <li>{model_id}</li>
        <li>{make_id}</li>
        <li>{year}</li>
        <li>{email}</li> */}
      </ul>
    </div>
  );
}

export default Vehicle;