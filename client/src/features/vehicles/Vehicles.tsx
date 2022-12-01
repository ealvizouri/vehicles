import { useMemo, FC } from 'react';
import { Column, useTable } from 'react-table';
import { useNavigate  } from 'react-router-dom';
import Button from '../../components/ui/Button';

const base64ImageEx = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAApgAAAKYB3X3/OAAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAANCSURBVEiJtZZPbBtFFMZ/M7ubXdtdb1xSFyeilBapySVU8h8OoFaooFSqiihIVIpQBKci6KEg9Q6H9kovIHoCIVQJJCKE1ENFjnAgcaSGC6rEnxBwA04Tx43t2FnvDAfjkNibxgHxnWb2e/u992bee7tCa00YFsffekFY+nUzFtjW0LrvjRXrCDIAaPLlW0nHL0SsZtVoaF98mLrx3pdhOqLtYPHChahZcYYO7KvPFxvRl5XPp1sN3adWiD1ZAqD6XYK1b/dvE5IWryTt2udLFedwc1+9kLp+vbbpoDh+6TklxBeAi9TL0taeWpdmZzQDry0AcO+jQ12RyohqqoYoo8RDwJrU+qXkjWtfi8Xxt58BdQuwQs9qC/afLwCw8tnQbqYAPsgxE1S6F3EAIXux2oQFKm0ihMsOF71dHYx+f3NND68ghCu1YIoePPQN1pGRABkJ6Bus96CutRZMydTl+TvuiRW1m3n0eDl0vRPcEysqdXn+jsQPsrHMquGeXEaY4Yk4wxWcY5V/9scqOMOVUFthatyTy8QyqwZ+kDURKoMWxNKr2EeqVKcTNOajqKoBgOE28U4tdQl5p5bwCw7BWquaZSzAPlwjlithJtp3pTImSqQRrb2Z8PHGigD4RZuNX6JYj6wj7O4TFLbCO/Mn/m8R+h6rYSUb3ekokRY6f/YukArN979jcW+V/S8g0eT/N3VN3kTqWbQ428m9/8k0P/1aIhF36PccEl6EhOcAUCrXKZXXWS3XKd2vc/TRBG9O5ELC17MmWubD2nKhUKZa26Ba2+D3P+4/MNCFwg59oWVeYhkzgN/JDR8deKBoD7Y+ljEjGZ0sosXVTvbc6RHirr2reNy1OXd6pJsQ+gqjk8VWFYmHrwBzW/n+uMPFiRwHB2I7ih8ciHFxIkd/3Omk5tCDV1t+2nNu5sxxpDFNx+huNhVT3/zMDz8usXC3ddaHBj1GHj/As08fwTS7Kt1HBTmyN29vdwAw+/wbwLVOJ3uAD1wi/dUH7Qei66PfyuRj4Ik9is+hglfbkbfR3cnZm7chlUWLdwmprtCohX4HUtlOcQjLYCu+fzGJH2QRKvP3UNz8bWk1qMxjGTOMThZ3kvgLI5AzFfo379UAAAAASUVORK5CYII=';

interface ColumnsObject {
  image: string
  vin: string
  milage: number
  email: string
  actions: any
}

const Vehicles: FC = () => {
  const navigate = useNavigate();
  const data = useMemo(
    () => [
      {
        image: base64ImageEx,
        vin: '1HGBH41JXMN109186',
        milage: 10500,
        email: 'joe@fake.com',
        actions: ''
      },
      {
        image: base64ImageEx,
        vin: '1HGBH41JXMN109187',
        milage: 10500,
        email: 'joe@fake.com',
        actions: ''
      },
      {
        image: base64ImageEx,
        vin: '1HGBH41JXMN109188',
        milage: 10500,
        email: 'joe@fake.com',
        actions: ''
      },
    ],
    []
  );

  const columns: Column<ColumnsObject>[] = useMemo(
    () => [
      {
        Header: 'Image',
        accessor: 'image' as keyof ColumnsObject, // accessor is the "key" in the data
        Cell: (props: any) => <img src={props.value} alt={`Vehicle from ${props.row.values.email}`} />
      },
      {
        Header: 'VIN',
        accessor: 'vin' as keyof ColumnsObject,
      },
      {
        Header: 'Milage',
        accessor: 'milage' as keyof ColumnsObject,
      },
      {
        Header: 'Owner Email',
        accessor: 'email' as keyof ColumnsObject,
      },
      {
        Header: '',
        accessor: 'actions' as keyof ColumnsObject,
        Cell: ({ row }: any) => <Button onClick={() => {
          navigate(`/vehicle/view/${row.values.vin}`);
          console.log('not working');
        }}>View</Button>
      },
    ],
    [navigate]
  )
  const tableInstance = useTable<ColumnsObject>({ columns, data })

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = tableInstance;
 
  return (
    <div className="overflow-x-auto relative">
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400" {...getTableProps()}>
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          {// Loop over the header rows
          headerGroups.map(headerGroup => (
            // Apply the header row props
            <tr {...headerGroup.getHeaderGroupProps()}>
              {// Loop over the headers in each row
              headerGroup.headers.map(column => (
                // Apply the header cell props
                <th scope="col" className="py-3 px-6" {...column.getHeaderProps()}>
                  {// Render the header
                  column.render('Header')}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        {/* Apply the table body props */}
        <tbody className="bg-white border-b dark:bg-gray-800 dark:border-gray-700" {...getTableBodyProps()}>
          {// Loop over the table rows
          rows.map(row => {
            // Prepare the row for display
            prepareRow(row)
            return (
              // Apply the row props
              <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700" {...row.getRowProps()}>
                {// Loop over the rows cells
                row.cells.map(cell => {
                  // Apply the cell props
                  return (
                    <td className="py-4 px-6" {...cell.getCellProps()}>
                      {// Render the cell contents
                      cell.render('Cell')}
                    </td>
                  )
                })}
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  );
}

export default Vehicles;