import { useCallback, FC } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate  } from 'react-router-dom';
import Button from '../../components/ui/Button';

/* interface VehicleProps {
  vin: string
  model_id: number
  make_id: number
  year: number
  email: string
  image: string
} */

const Vehicle: FC = () => {
  const navigate = useNavigate();
  /*
  { model_id, make_id, year, email, image }
   */
  const { vin } = useParams();

  const onEditClick = useCallback(() => {
    navigate(`/vehicle/edit/${vin}`);
  }, [vin]);

  return (
    <div>
      <Button onClick={onEditClick}>Edit</Button>
      <Button variant="danger">Delete</Button>
      <ul>
        <li>{vin}</li>
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