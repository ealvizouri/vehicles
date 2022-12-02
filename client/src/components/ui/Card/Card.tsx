import { useMemo, FC, ReactNode } from 'react';

interface CardProps {
  imageUrl?: string;
  title: string;
  children: ReactNode;
}

const Card: FC<CardProps> = ({ imageUrl, title, children }: CardProps) => {
  const imageAlt = useMemo(
    () => imageUrl ? imageUrl.split('/').pop() : '',
    [imageUrl]
  );
  return (
    <div className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
      {imageUrl && <div className="flex justify-center">
        <img src={imageUrl} alt={imageAlt} className="max-h-[300px]" />
      </div>}
      <h5 className="mb-2 text-2xl tracking-tight text-gray-900 dark:text-white">
        VIN: <span className="font-bold">
          {title}
        </span>
      </h5>
      <div>
        {children}
      </div>
    </div>
  );
}

export default Card;