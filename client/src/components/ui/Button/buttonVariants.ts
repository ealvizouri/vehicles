const buttonVariants = new Map();

const buttonBaseStyle = `
  cursor-pointer
  font-bold
  my-2
  py-2
  px-4
  rounded
  focus:outline-none
  focus:shadow-outline
  disabled:opacity-50
`;

buttonVariants.set(
  'primary', 
  `
    ${buttonBaseStyle}
    bg-blue-500
    hover:bg-blue-700
    text-white
    disabled:hover:bg-blue-500
  `
);

buttonVariants.set(
  'secondary',
  `
    ${buttonBaseStyle}
    bg-gray-500
    hover:bg-gray-700
    text-white
    disabled:hover:bg-gray-500
  `
);

buttonVariants.set(
  'danger',
  `
    ${buttonBaseStyle}
    bg-red-500
    hover:bg-red-700
    text-white
    disabled:hover:bg-red-500
  `
);

buttonVariants.set(
  'link',
  `
    ${buttonBaseStyle}
    bg-transparent-500
    hover:bg-transparent-700
    text-gray-800
    disabled:hover:bg-transparent-500
  `
);

export default buttonVariants;