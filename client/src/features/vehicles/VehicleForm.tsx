import { useEffect, useState, useCallback, FC } from 'react';
import { Form } from 'react-final-form';
import { useParams, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { fetchMakes, fetchModels, selectMakes, selectModels } from 'app/store/makeModelSlice';
import type { VehicleType } from 'app/store/vehicleSlice';
import { vehicleCreateValidationSchema, vehicleUpdateValidationSchema } from './vehicleValidationSchema';
import { fetchVehicle, saveVehicle, updateVehicle } from 'services/vehicles';

import Input from 'components/form/Input';
import InputFile from 'components/form/InputFile';
import Select from 'components/form/Select';
import Button from 'components/ui/Button';

type InnerItem = {
  path: string,
  message: string
}

const VehicleForm: FC = () => {
  const navigate = useNavigate();
  const { vin } = useParams();
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string>('');
  const [initialValues, setInitialValues] = useState<VehicleType | null>(null);
  const disptach = useAppDispatch();
  const makes = useAppSelector(selectMakes);
  const models = useAppSelector(selectModels);
  const validate = useCallback(async (values: any) => {
    const errors: any = {};
    try {
      if (vin) {
        await vehicleUpdateValidationSchema.validate(values, {
          abortEarly: false
        });
      } else {
        await vehicleCreateValidationSchema.validate(values, {
          abortEarly: false
        });
      }
  } catch(e: any) {
    if (Array.isArray(e.inner)) {
        e.inner.forEach((item: InnerItem) => {
          errors[item.path] = item.message;
        });
      } else {
        console.error(e);
      }
    }
    return errors;
  }, [vin]);
  const onFileChange = useCallback((file: File | null) => {
    setImageFile(file);
  }, []);
  const onSubmit = async (values: any) => {
    const formData = new FormData();
    Object.keys(values)
      .filter(item => !['image', 'imageUrl'].includes(item))
      .forEach(key => {
        formData.set(key, values[key]);
      });

    if (imageFile) {
      try {
        formData.set('image', imageFile);
      } catch (e) {
        console.error(e);
      }
    }
    if (vin) {
      var {data, err} = await updateVehicle(formData);
      if (!err) {
        navigate(`/vehicle/view/${vin}`);
      }
    } else {
      var {data, err} = await saveVehicle(formData);
      if (!err) {
        navigate(`/vehicle/view/${data.vin}`);
      }
    }
  }

  useEffect(() => {
    disptach(fetchMakes());
    disptach(fetchModels(2));
  }, [disptach]);

  useEffect(() => {
    if (vin) {
      fetchVehicle(vin)
        .then(({data, err}) => {
          if (err) {
            console.error(err);
          } else {
            setInitialValues({
              vin: data.vin,
              make_id: data.make_id,
              model_id: data.model_id,
              year: data.year,
              email: data.email,
              milage: data.milage
            });
            setImageUrl(data.image);
          }
        });
    }
  }, [vin]);

  if (vin && initialValues === null) {
    return (
      <div>
        Loading
      </div>
    );
  }
  return (<div>
    <div>
        <Button
          onClick={() => navigate('/')}
        >
          Back
        </Button>
      </div>
      <Form
        onSubmit={onSubmit}
        validate={validate}
        initialValues={initialValues ?? {
          vin: '',
          make_id: 0,
          model_id: 0,
          year: '',
          email: '',
          milage: ''
        }}
      >
        {props => {
          return (
            <form onSubmit={props.handleSubmit}>
              <Input label="VIN" name="vin" type="text" />
              <Select
                valueKey="id"
                textKey="name"
                label="Make"
                name="make_id"
                placeholder="Select a make"
                options={makes}
                onChange={(e) => disptach(fetchModels(parseInt(e.target.value)))}
              />
              <Select
                valueKey="id"
                textKey="name"
                label="Models"
                name="model_id"
                placeholder="Select a model"
                options={models}
              />
              <Input label="Year" name="year" type="number" />
              <Input label="E-mail" name="email" type="text" />
              <Input label="Milage" name="milage" type="number" />
              <InputFile label={`Picture`} name="image" onFileChange={onFileChange} accept="image/*" />
              {imageUrl && <>
                <p className="text-sm text-gray-600 font-bold pl-1">
                  By choosing another image, the current one will be replaced.
                </p>
                <div>
                  <img className="max-w-sm" alt="vehicle" src={`${process.env.REACT_APP_VEHICLE_IMG_URL}${imageUrl}`} />
                </div>
              </>}
              <div className="flex justify-end">
                <Button type="submit" variant="primary" disabled={props.invalid && !props.dirtySinceLastSubmit}>Submit</Button>
              </div>
            </form>
          )
        }}
      </Form>
  </div>
  );
}

export default VehicleForm;