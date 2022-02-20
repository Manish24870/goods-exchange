import React from "react";
import { Box } from "@mui/material";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import { Delete, ArrowUpward, ArrowDownward } from "@mui/icons-material";

const UserList = (props) => {
  // Define the columns
  const dataColumns = [
    { field: "id", headerName: "Id", width: 120 },
    { field: "username", headerName: "Username", width: 120 },
    { field: "email", headerName: "Email", width: 180 },
    { field: "phone", headerName: "Phone", width: 110 },
    { field: "admin", headerName: "Is Admin", type: "boolean", width: 90 },
    {
      field: "reputation",
      headerName: "Reputation",
      width: 110,
    },
    {
      field: "actions",
      headerName: "Actions",
      type: "actions",
      width: 120,
      getActions: (params) => [
        <GridActionsCellItem
          icon={<Delete color="secondary" />}
          label="Delete"
          onClick={() => props.adminDeleteUser(params.id)}
        />,
        <GridActionsCellItem
          icon={
            params.getValue(params.id, "admin") ? (
              <ArrowDownward color="info" />
            ) : (
              <ArrowUpward color="info" />
            )
          }
          onClick={
            params.getValue(params.id, "admin")
              ? () => props.adminDemoteUser(params.id)
              : () => props.adminPromoteUser(params.id)
          }
          label="Update Role"
        />,
      ],
    },
  ];

  // Define the value for each rows
  const dataRows = [];
  props.adminUsers.forEach((user) => {
    dataRows.push({
      id: user._id,
      username: user.username,
      email: user.email,
      phone: user.phone,
      admin: user.role === "admin" ? true : false,
      reputation: user.reputation,
    });
  });

  // Render JSX
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

export default UserList;
