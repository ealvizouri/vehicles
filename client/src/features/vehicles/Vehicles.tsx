import { useEffect, useMemo, useState, useCallback, FC } from 'react';
import { Column, useTable } from 'react-table';
import { useNavigate  } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { randomNum } from 'app/utils';
import type { VehicleType } from 'app/store/vehicleSlice';
import { fetchVehicles, selectVehicles } from 'app/store/vehicleSlice';
import { deleteVehicle } from 'services/vehicles';
import Button from 'components/ui/Button';
import ModalConfirm from 'components/ui/Modal/ModalConfirm';

type ColumnsObject = VehicleType & { actions?: any }

const Vehicles: FC = () => {
  const [vehicleToRemove, setVehicleToRemove] = useState<string | null>(null);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const vehicles = useAppSelector(selectVehicles);

  const removeVehicle = useCallback(async () => {
    if (vehicleToRemove) {
      const { err} = await deleteVehicle(vehicleToRemove);
      if (err) {
        console.log(err);
        return;
      }
      setVehicleToRemove(null);
      dispatch(fetchVehicles());
    }
  }, [vehicleToRemove, dispatch]);

  const columns: Column<ColumnsObject>[] = useMemo(
    () => [
      {
        Header: 'Image',
        accessor: 'image' as keyof ColumnsObject, // accessor is the "key" in the data
        Cell: (props: any) => (
          <div className="flex justify-center">
            <img
              src={`${process.env.REACT_APP_VEHICLE_IMG_URL}${props.value}?r=${randomNum()}`}
              alt={`Vehicle from ${props.row.values.email}`}
              className="max-h-[200px]"
            />
          </div>
        )
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
        Cell: ({ row }: any) => <Button onClick={() => navigate(`/vehicle/view/${row.values.vin}`)}>View</Button>
      },
    ],
    [navigate]
  )
  const tableInstance = useTable<ColumnsObject>({ columns, data: vehicles as ColumnsObject[] })

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = tableInstance;

  useEffect(() => {
    dispatch(fetchVehicles());
  }, [dispatch]);
 
  return (
    <div className="max-w-screen-md">
      <ModalConfirm
        id={`remove-modal-${vehicleToRemove}`}
        open={vehicleToRemove !== null}
        onConfirm={removeVehicle}
        onCancel={() => setVehicleToRemove(null)}
      >
        {vehicleToRemove ?
        `You are about to remove a vehicle with VIN: ${vehicleToRemove}`
        : null}
      </ModalConfirm>
      <div className="flex justify-end py-3">
        <Button onClick={() => navigate(`/vehicle/new`)}>New Vehicle</Button>
      </div>
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
    </div>
  );
}

export default Vehicles;