import React , {useState} from 'react';
import { DataGrid } from "@mui/x-data-grid";
import { Box, useTheme } from "@mui/material";
import { useGetTransactionsQuery } from "state/api";
import Header from "components/Header";
import DataGridCustomToolbar from "components/DataGridCustomToolbar";


function Transactions() {
  const theme = useTheme();

  const [page , setPage] = useState(0);
  const [pageSize , setPageSize] = useState(20);
  const [sort , setSort] = useState({});
  const [search , setSearch] = useState("");

  const { data , isLoading} = useGetTransactionsQuery({
    page,
    pageSize,
    sort: JSON.stringify(sort),
    search,
  });
  console.log("Transactions ~ data:", data);


  const columns = [
    {
      field: "_id",
      headerName: "ID",
      flex: 1,
    },
    {
      field: "userId",
      headerName: "User ID",
      flex: 1,
    },
    {
      field: "createdAt",
      headerName: "CreatedAt",
      flex: 1,
    },
    {
      field: "products",
      headerName: "# of Products",
      flex: 0.5,
      sortable: false,
      renderCell: (params) => params.value.length
    },
    {
      field: "cost",
      headerName: "Cost",
      flex: 1,
      renderCell: (params) => `$${Number(params.value).toFixed(2)}`,
    },
  ];




  return (
    <Box m="1.5rem 2.5rem">
      <Header title="Transactions" subtitle="Entire List of Transactions" />
      <Box
        height="80vh"
        sx={{
          "& .MuiDataGrid-root" : {
            border: "none"
          },
          "& .MuiDataGrid-cell" : {
            borderBottom: "none"
          },
          "& .MuiDataGrid-columnHeaders" : {
            backgroundColor: theme.palette.background.alt,
            color: theme.palette.secondary[100],
            borderBottom: "none"
          },
          "& .MuiDataGrid-virtualScroller" : {
            backgroundColor: theme.palette.primary.light,
          },
          "& .MuiDataGrid-footerContainer" : {
            backgroundColor: theme.palette.background.alt,
            color: theme.palette.secondary[100],
            borderTop: "none"
          },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text" : {
            color: `${theme.palette.secondary[200]} !important`
          },
        }}
      >
        <DataGrid 
          loading={isLoading || !data}
          getRowId={(row) => row._id}
          rows={(data && data.transactions) || []}
          columns={columns}
          paginationMode='server'
          rowCount={(data && data.total) || 0}
          page={page}
          pageSize={pageSize}
          sortingMode='server'
          onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
          onSortModelChange={(newSortModel) => setSort(...newSortModel)}
          slots={{
            toolbar: DataGridCustomToolbar
          }}
        />
      </Box>
    </Box>
  )
}

export default Transactions;