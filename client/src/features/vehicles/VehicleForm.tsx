import { useEffect, useState, useCallback, FC } from 'react';
import { Form } from 'react-final-form';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { fetchMakes, fetchModels, selectMakes, selectModels } from 'app/store/makeModelSlice';
import vehicleValidationSchema from './vehicleValidationSchema';
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
  const { vin } = useParams();
  const [imageFile, setImageFile] = useState<File | null>(null);
  const disptach = useAppDispatch();
  const makes = useAppSelector(selectMakes);
  const models = useAppSelector(selectModels);
  const validate = useCallback(async (values: any) => {
    const errors: any = {};
    try {
      await vehicleValidationSchema.validate(values, {
        abortEarly: false
      });
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
  }, []);
  const onFileChange = useCallback((file: File | null) => {
    setImageFile(file)
  }, []);
  const onSubmit = async (values: any) => {
    const formData = new FormData();
    Object.keys(values)
      .filter(item => item !== 'image')
      .forEach(key => {
        console.log(key, values[key]);
        formData.set(key, values[key]);
      });

    if (imageFile) {
      try {
        /* const image = await toBase64(imageFile); */
        formData.set('image', imageFile);
        /* console.log(imageFile, image); */
      } catch (e) {
        console.error(e);
      }
    }
    console.log(formData.getAll('image'));
    if (vin) {
      updateVehicle(formData);
    } else {
      saveVehicle(formData);
    }
  }

  useEffect(() => {
    disptach(fetchMakes());
    disptach(fetchModels(2));
  }, [disptach]);

  useEffect(() => {
    if (vin) {
      fetchVehicle(vin)
        .then(data => {
          console.log(data);
        });
    }
  }, [vin]);
  return (
    <Form
      onSubmit={onSubmit}
      validate={validate}
      initialValues={{
        vin: 'LKJASD81JA123',
        make_id: 2,
        model_id: 6,
        year: 2022,
        email: 'asd@asd.com',
        milage: 12500
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
            <InputFile label="Picture" name="image" onFileChange={onFileChange} accept="image/*" />
            <Button type="submit" variant="primary" disabled={props.invalid}>Submit</Button>
          </form>
        )
      }}
    </Form>
  );
}

export default VehicleForm;