import * as Yup from 'yup';

const nextYear = (new Date()).getFullYear() + 1;

const vehicleValidationSchema = Yup.object().shape({
  vin: Yup
    .string()
    .min(11)
    .max(17)
    .matches(/[0-9A-Z]+/, 'VIN must be UPPERCASE and alphanumeric')
    .required('VIN is required'),
  email: Yup
    .string()
    .email('Invalid e-mail')
    .required('E-mail is required'),
  make_id: Yup
    .number()
    .required('Make is required'),
  model_id: Yup
    .number()
    .required('Model is required'),
  year: Yup
    .number()
    .min(1886, 'The first car ever made was built in 1886')
    .max(nextYear, `Year can't be greater than ${nextYear}`)
    .required('Year is required'),
  milage: Yup
    .number()
    .min(0, 'Milage must be greater or equal to Zero')
    .required('Milage is required'),
  image: Yup
    .string()
    .required('Picture is required'),
});

export default vehicleValidationSchema;