const alertVariants = new Map();

const alertBaseStyle = `my-2 border-l-4 p-4`;

alertVariants.set('success', `bg-green-100 border-green-500 text-green-700 ${alertBaseStyle}`);
alertVariants.set('warning', `bg-orange-100 border-orange-500 text-orange-700 ${alertBaseStyle}`);
alertVariants.set('error', `bg-red-100 border-red-500 text-red-700 ${alertBaseStyle}`);
alertVariants.set('info', `bg-blue-100 border-blue-500 text-blue-700 ${alertBaseStyle}`);

export default alertVariants;