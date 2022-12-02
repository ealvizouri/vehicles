import { useMemo, FC } from 'react';

interface CardProps {
  imageUrl?: string,
  title: string
}

const Card: FC<CardProps> = ({ imageUrl, title }: CardProps) => {
  const imageAlt = useMemo(
    () => imageUrl ? imageUrl.split('/').pop() : '',
    [imageUrl]
  );
  return (
    <div className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
      {imageUrl && <img src={imageUrl} alt={imageAlt} />}
      <h5 className="mb-2 text-2xl tracking-tight text-gray-900 dark:text-white">
        VIN: <span className="font-bold">
          {title}
        </span>
      </h5>
      <p className="font-normal text-gray-700 dark:text-gray-400">
        Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.
      </p>
    </div>
  );
}

export default Card;