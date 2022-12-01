import { FC, useCallback } from 'react';
import * as Yup from 'yup';
import { Form } from 'react-final-form';
import { useParams } from 'react-router-dom';

import Input from '../../components/form/Input';
import Select from '../../components/form/Select';
import Button from '../../components/ui/Button';

const validationSchema = Yup.object().shape({
  name: Yup.string().required()
});

type InnerItem = {
  path: string,
  message: string
}

const makes = [
  {
    text: 'Volkswagen',
    value: 1
  },
  {
    text: 'BMW',
    value: 2
  }
]

const VehicleForm: FC = () => {
  const { vin } = useParams();
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
  }
  return (
    <Form
      onSubmit={onSubmit}
      validate={validate}
    >
      {props => {
        console.log(props);
        return (
          <form onSubmit={props.handleSubmit}>
            <Input label="VIN" name="vin" type="text" />
            <Input label="Name" name="name" type="text" />
            <Select label="Make" name="make" options={makes} />
            <Select label="Make" name="make" options={makes} />
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