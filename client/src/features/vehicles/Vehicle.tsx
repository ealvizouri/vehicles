import { useState, useEffect, useCallback, FC } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate  } from 'react-router-dom';
import type { MakeModelType } from 'app/store/makeModelSlice';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { fetchVehicle, selectVehicle } from 'app/store/vehicleSlice';
import _fetch from 'app/fetch';
import { deleteVehicle } from 'services/vehicles';
import Button from 'components/ui/Button';
import ModalConfirm from 'components/ui/Modal/ModalConfirm';
import Card from 'components/ui/Card';

const Vehicle: FC = () => {
  const [vehicleToRemove, setVehicleToRemove] = useState<string>('');
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const vehicle = useAppSelector(selectVehicle);
  const [make, setMake] = useState<MakeModelType | null>(null);
  const [model, setModel] = useState<MakeModelType | null>(null);
  const modalId = 'remove-modal';
  const { vin } = useParams();

  const removeVehicle = useCallback(async () => {
    if (vehicleToRemove) {
      const { err} = await deleteVehicle(vehicleToRemove);
      if (err) {
        console.error(err);
        return;
      }
      setVehicleToRemove('');
      navigate('/');
    }
  }, [vehicleToRemove, navigate]);

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
        setModel  (modelRes.data);
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
    fetchMakeAndModel();
  }, [vehicle, fetchMakeAndModel]);

  if (!vehicle) {
    return (
      <div>
        Loading...
      </div>
    );
  }

  return (
    <div>
      <ModalConfirm
        id={modalId}
        open={vehicleToRemove.length > 0}
        onConfirm={removeVehicle}
        onCancel={() => setVehicleToRemove('')}
      >
        {vehicleToRemove && `You are about to remove a vehicle with VIN: ${vehicleToRemove}`}
      </ModalConfirm>
      <div>
        <Button
          onClick={() => navigate('/')}
        >
          Back
        </Button>
      </div>
      <Card imageUrl={`${process.env.REACT_APP_VEHICLE_IMG_URL}${vehicle.image}`} title={vehicle.vin}>
        <ul>
          <li>
            Make: <span className="font-bold">{make?.name}</span>
          </li>
          <li>
            Model: <span className="font-bold">{model?.name}</span>
          </li>
          <li>
            Year: <span className="font-bold">{vehicle?.year}</span>
          </li>
          <li>
            Milage: <span className="font-bold">{vehicle?.milage}</span>
          </li>
          <li>
            Owner's email: <span className="font-bold">{vehicle?.email}</span>
          </li>
        </ul>
      </Card>
      <div className="flex justify-end mt-5">
        <Button onClick={onEditClick}>Edit</Button>
        <Button
          variant="danger"
          className="ml-3"
          onClick={() => {
            setVehicleToRemove(vin ?? '');
          }}
          data-modal-button={modalId}
        >Delete</Button>
      </div>
    </div>
  );
}

export default Vehicle;