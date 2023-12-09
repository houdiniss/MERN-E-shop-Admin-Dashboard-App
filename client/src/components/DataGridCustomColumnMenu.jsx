import React from "react";
import {
  GridColumnMenu,
  GridColumnMenuFilterItem
}
from "@mui/x-data-grid";



const CustomColumnMenu = (props) => {
  return (
    <GridColumnMenu
      {...props}
      slots={{
        columnMenuSortItem: null,
      }}
    >
    </GridColumnMenu>
  );
};

export default CustomColumnMenu;