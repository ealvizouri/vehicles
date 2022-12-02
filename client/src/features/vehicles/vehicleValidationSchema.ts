import * as Yup from 'yup';

const nextYear = (new Date()).getFullYear() + 1;

const vin = Yup
  .string()
  .min(11)
  .max(17)
  .matches(/[0-9A-Z]+/, 'VIN must be UPPERCASE and alphanumeric')
  .required('VIN is required');

const email = Yup
  .string()
  .email('Invalid e-mail')
  .required('E-mail is required');

const make_id = Yup.number().required('Make is required');

const model_id = Yup.number().required('Model is required');

const year = Yup
    .number()
    .min(1886, 'The first car ever made was built in 1886')
    .max(nextYear, `Year can't be greater than ${nextYear}`)
    .required('Year is required');

const milage = Yup
    .number()
    .min(0, 'Milage must be greater or equal to Zero')
    .required('Milage is required');

const image = Yup.string();

export const vehicleCreateValidationSchema = Yup.object().shape({
  vin,
  email,
  make_id,
  model_id,
  year,
  milage,
  image: image.required('Picture is required'),
});

export const vehicleUpdateValidationSchema = Yup.object().shape({
  vin,
  email,
  make_id,
  model_id,
  year,
  milage,
  image,
});
