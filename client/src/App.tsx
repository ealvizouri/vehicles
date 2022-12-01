import React, { useCallback } from 'react';
import * as Yup from 'yup';
import { Form } from 'react-final-form'
/* import { Counter } from './features/counter/Counter'; */
import Vehicles from './features/vehicles/Vehicles';
import './App.css';
import Input from './components/form/Input';
import Select from './components/form/Select';
import Button from './components/ui/Button';

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

function App() {
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
    <div className="App">
      {/* <header className="App-header">
        <Counter />
        
      </header> */}
      <Vehicles />
      <Form
        onSubmit={onSubmit}
        validate={validate}
      >
        {props => {
          console.log(props);
          return (
            <form onSubmit={props.handleSubmit}>
              <Input label="Name" name="name" type="text" />
              <Select label="Make" name="make" options={makes} />
              
              <Button type="submit" variant="primary" disabled={props.invalid}>Submit</Button>
            </form>
          )
        }}
      </Form>
    </div>
  );
}

export default App;
