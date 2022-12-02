import { useEffect, useCallback, FC } from 'react';
import * as Yup from 'yup';
import { useFormState, Form } from 'react-final-form';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { fetchMakes, fetchModels, selectMakes, selectModels } from 'app/store/makeModelSlice';

import Input from '../../components/form/Input';
import Select from '../../components/form/Select';
import Button from '../../components/ui/Button';

const validationSchema = Yup.object().shape({
  vin: Yup
        .string()
        .min(11)
        .max(17)
        .matches(/^[0-9A-Z]+$/, 'VIN must be UPPERCASE and alphanumeric')
        .required('VIN is required'),
  name: Yup
    .string()
    .required('Name is required'),
  make_id: Yup
    .number()
    .required('Make is required'),
  model_id: Yup
    .number()
    .required('Model is required'),
  year: Yup
    .number()
    .required('Year is required'),
  milage: Yup
    .number()
    .required('Milage is required'),
  image: Yup.mixed().test(
      "image",
      "The picture is too large",
      (value) => !value.length || value[0].size <= 2
    ),

});

type InnerItem = {
  path: string,
  message: string
}

const VehicleForm: FC = () => {
  const { vin } = useParams();
  const disptach = useAppDispatch();
  const makes = useAppSelector(selectMakes);
  const models = useAppSelector(selectModels);
  const validate = useCallback(async (values: any) => {
    const errors: any = {};
    try {
      await validationSchema.validate(values, {
        abortEarly: false
      });
    } catch(e: any) {
      if (Array.isArray(e.inner)) {
        e.inner.forEach((item: InnerItem) => {
          errors[item.path] = item.message;
        })
      }
    }
    return errors;
  }, []);
  const onSubmit = (values: any) => {
    console.log(values);
  }

  useEffect(() => {
    disptach(fetchMakes());
  }, []);
  return (
    <Form
      onSubmit={onSubmit}
      validate={validate}
    >
      {props => {
        return (
          <form onSubmit={props.handleSubmit}>
            <Input label="VIN" name="vin" type="text" />
            <Input label="Name" name="name" type="text" />
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
            <Input label="Milage" name="milage" type="number" />
            <Input label="Picture" name="image" type="file" />
            <Button type="submit" variant="primary" disabled={props.invalid}>Submit</Button>
          </form>
        )
      }}
    </Form>
  );
}

export default VehicleForm;