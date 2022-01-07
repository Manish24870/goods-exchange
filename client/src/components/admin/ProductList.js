import React from "react";
import moment from "moment";
import { Box } from "@mui/material";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import { Delete } from "@mui/icons-material";

const ProductList = (props) => {
  // Define the columns
  const dataColumns = [
    { field: "id", headerName: "Id", width: 120 },
    { field: "product", headerName: "Product Name", width: 170 },
    { field: "owner", headerName: "Owner", width: 120 },
    { field: "postedAt", headerName: "Posted At", type: "date", width: 120 },
    {
      field: "actions",
      headerName: "Actions",
      type: "actions",
      width: 120,
      getActions: (params) => [
        <GridActionsCellItem
          icon={<Delete color="secondary" />}
          label="Delete"
          onClick={() => props.adminDeleteProduct(params.id)}
        />,
      ],
    },
  ];

  // Define the value for each rows
  const dataRows = [];
  props.adminProducts.forEach((product) => {
    dataRows.push({
      id: product._id,
      product: product.name,
      owner: product.owner.username,
      postedAt: moment(product.postedAt).format("MMM Do YYYY"),
    });
  });

  return (
    <Box>
      <DataGrid
        rows={dataRows}
        columns={dataColumns}
        autoHeight={true}
        density="comfortable"
        pageSize={10}
        rowsPerPageOptions={[10]}
      />
    </Box>
  );
};

export default ProductList;
