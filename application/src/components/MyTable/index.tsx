import { useCallback, useState } from 'react';
import { DataGrid, GridCellEditCommitParams, GridColumns } from '@mui/x-data-grid';
import { Snackbar } from '@mui/material';
import Client from '../../interfaces/client';
import { api } from '../../services/api';

type MyTableProps = {
  allClients: Client[];
};

const columns: GridColumns = [
  { field: 'nome', headerName: 'Nome', width: 600, editable: true },
  { field: 'empresa', headerName: 'Empresa', width: 350, editable: true },
  { field: 'cidade', headerName: 'Cidade', width: 350, editable: true },
  { field: 'pais', headerName: 'País', width: 180, editable: true }
];

export default function MyTable({ allClients }: MyTableProps) {
  const [rows, setRows] = useState(allClients);
  const [successfullySnackbar, setSuccessfullySnackbar] = useState(false);
  const [errorSnackbar, setErrorSnackbar] = useState(false);

  const handleSuccessfullySnackbarClose = () => {
    setSuccessfullySnackbar(false);
  };

  const handleErrorSnackbarClose = () => {
    setErrorSnackbar(false);
  };

  const vertical = 'bottom';
  const horizontal = 'center';

  const handleCellEditCommit = useCallback(
    async (params: GridCellEditCommitParams) => {
      try {
        const response =
        {
          [params.field]: params.value,
        };

        api.get(`clients/${Number(params.id)}`)
          .then((response) => {
            api.put(`clients/${Number(params.id)}`, {
              ...response.data,
              [params.field]: params.value
            })//.then((response) => console.log(response.data));

            setSuccessfullySnackbar(true);
          });

        setSuccessfullySnackbar(true);
        setRows((prev) =>
          prev.map((row) => (row.id === params.id ? { ...row, ...response } : row)),
        );
      } catch (error) {
        setErrorSnackbar(true);
        setRows((prev) => [...prev]);
      }
    },
    [],
  );

  return (
    <div style={{ height: 800, width: '100%' }}>
      <DataGrid rows={allClients} columns={columns} onCellEditCommit={handleCellEditCommit} />

      <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        open={successfullySnackbar}
        onClose={handleSuccessfullySnackbarClose}
        message='Usuário salvo com sucesso'
        key={'successfully'}
      />

      <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        open={errorSnackbar}
        onClose={handleErrorSnackbarClose}
        message='Erro ao salvar usuário'
        key={'error'}
      />
    </div>
  )
}
