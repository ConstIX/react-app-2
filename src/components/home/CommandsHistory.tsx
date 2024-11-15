import { Box } from '@mui/material'
import { DataGrid, GridColDef } from '@mui/x-data-grid'
import { useGetCommandsQuery } from '../../redux/services/commands'

const CommandsHistory = () => {
  const { data: history, isLoading } = useGetCommandsQuery()

  const columns: GridColDef[] = [
    { field: 'original', headerName: 'Original', width: 200, sortable: false },
    { field: 'optimized', headerName: 'Optimized', width: 200, sortable: false },
    { field: 'date', headerName: 'Date', width: 150, sortable: false },
    { field: 'time', headerName: 'Time', width: 150, sortable: false },
    { field: 'initialPosition', headerName: 'Initial Position', width: 150, sortable: false },
    { field: 'finalPosition', headerName: 'Final Position', width: 150, sortable: false }
  ]

  return (
    <Box className="h-96">
      <DataGrid
        rows={history}
        columns={columns}
        initialState={{ pagination: { paginationModel: { page: 0, pageSize: 10 } } }}
        pageSizeOptions={[10]}
        loading={isLoading}
        disableRowSelectionOnClick
        sx={{ '& .MuiDataGrid-columnHeaderTitle': { fontWeight: 'bold' } }}
      />
    </Box>
  )
}

export default CommandsHistory
