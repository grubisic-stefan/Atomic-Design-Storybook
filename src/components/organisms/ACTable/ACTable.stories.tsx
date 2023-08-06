import React, { useState } from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { MdDelete, MdEdit, MdInfo, MdAdd } from "react-icons/md";

import { ACTable, IACTableRow, IACTableState } from "./ACTable";
import ACLoading from "../../atoms/ACLoading";
import { ACFilterItem } from "../../molecules/ACFilter/ACFilter";
import { ACSpinner } from "../../atoms";

export default {
  title: "Organisms/ACTable",
  component: ACTable,
} as ComponentMeta<typeof ACTable>;

const testData: any[] = [];
for (let i = 0; i < 5; i++) {
  testData.push({
    uuid: i.toString(),
    name: "Project test " + i,
    description: "Project test " + i + " description",
    status: "FINISHED",
    client: "bbae9705-66a2-45b5-9151-eb6a66250c39",
    budgetLimit: true,
    timeLimit: true,
    hexColor: "#4287f5",
    hidden: false,
  });
}

const Template: ComponentStory<typeof ACTable> = (args) => {
  const [remoteTableData, setRemoteTableData] = useState({
    allItemsCount: 0,
    items: [],
    totalPagesNumber: 0,
  } as { items: IACTableRow[]; totalPagesNumber: number; allItemsCount: number });
  const [isLoading, setIsLoading] = useState(false);
  const [filter, setFilter] = useState([
    {
      field: "name",
      title: "Name",
      filterType: "text",
    },
    {
      field: "statusSingle",
      title: "Status Single",
      filterType: "selectSingle",
      filterSelectData: [],
    },
    {
      field: "statusMulti",
      title: "Status Multi",
      filterType: "selectMulti",
      filterSelectData: [],
    },
  ] as ACFilterItem[]);

  const handleOnTableStateChange = async (tableState: IACTableState) => {
    console.log("tableState", tableState);
    setIsLoading(true);

    let filterQueryString = "";
    Object.keys(tableState.filter).forEach((key) => {
      if (tableState.filter[key] !== "") {
        filterQueryString += `${key}=${tableState.filter[key]}&`;
      }
    });

    const response = await fetch(
      `https://companify.antech-dev.com/api/v1/projects?${filterQueryString}page=${
        tableState.currentPage - 1
      }&size=${tableState.itemsPerPage}&sort=${tableState.sort.field},${
        tableState.sort.type
      }`,
      {
        headers: {
          Authorization:
            "Bearer eyJhbGciOiJSUzI1NiJ9.eyJzdWIiOiJhY2NvdW50LTEiLCJhY2NvdW50IjoiYWNjb3VudC0xIiwidXNlciI6InVzZXItMSIsIndvcmtzcGFjZSI6IndvcmtzcGFjZS0xIiwicm9sZXMiOlsiV09SS1NQQUNFX09XTkVSIl0sImV4cCI6MTgyODgyODgwMH0.JL5c6HV6dwqfDqVTIJEcjrDHa2qAlhkelgPGOa27pkCBrhWoYtrG_dtL7-7KU7mX-Z7tMYaPPqp3of5Ibs_wXVWeJpioK2v5W0ZE8fUs3g5w3YJ6nwUOCtCVdLFf1CgtpM8F774czDPgiwMIdUiJ7DDLZL3osAwLjmqnS-UtLC2StGLhe6Ve_S8buDuME2aDjlGCSLCl5XDwx9VxoXm6818Fg7xqpw1IsiFAA0-0Q9yXgZ-1vkoHQ9TceY8gdzR3sczYx5y37EoN7_zm7mBDKTON4V8BZB39enQQp7RfxbmJDfgRDTTbHkFHoTtxRhBqTHEbcb9oQVjAOdSCN0OodA",
        },
      }
    );
    const responseJson = await response.json();
    const itemsResponse = responseJson.content as any[];
    const itemsTable: IACTableRow[] = [];
    itemsResponse.forEach((item) => {
      itemsTable.push({
        rawData: item,
        render: {
          ...item,
          name: (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
              }}
            >
              <div
                style={{
                  backgroundColor: item.hexColor,
                  width: "20px",
                  height: "20px",
                  borderRadius: "200px",
                }}
              ></div>
              <span style={{ fontStyle: "italic" }}> {item.name} </span>
            </div>
          ),
          createdAt: new Date(item.createdAt).toLocaleDateString("sr-RS"),
          status: item.status.replace("_", " "),
        },
      });
    });

    setRemoteTableData({
      items: itemsTable,
      allItemsCount: responseJson.totalElements,
      totalPagesNumber: responseJson.totalPages,
    });
    setIsLoading(false);
  };

  const handleOnShowFilter = async () => {
    setIsLoading(true);
    const response = await fetch(
      `https://companify.antech-dev.com/api/v1/projects`,
      {
        headers: {
          Authorization:
            "Bearer eyJhbGciOiJSUzI1NiJ9.eyJzdWIiOiJhY2NvdW50LTEiLCJhY2NvdW50IjoiYWNjb3VudC0xIiwidXNlciI6InVzZXItMSIsIndvcmtzcGFjZSI6IndvcmtzcGFjZS0xIiwicm9sZXMiOlsiV09SS1NQQUNFX09XTkVSIl0sImV4cCI6MTgyODgyODgwMH0.JL5c6HV6dwqfDqVTIJEcjrDHa2qAlhkelgPGOa27pkCBrhWoYtrG_dtL7-7KU7mX-Z7tMYaPPqp3of5Ibs_wXVWeJpioK2v5W0ZE8fUs3g5w3YJ6nwUOCtCVdLFf1CgtpM8F774czDPgiwMIdUiJ7DDLZL3osAwLjmqnS-UtLC2StGLhe6Ve_S8buDuME2aDjlGCSLCl5XDwx9VxoXm6818Fg7xqpw1IsiFAA0-0Q9yXgZ-1vkoHQ9TceY8gdzR3sczYx5y37EoN7_zm7mBDKTON4V8BZB39enQQp7RfxbmJDfgRDTTbHkFHoTtxRhBqTHEbcb9oQVjAOdSCN0OodA",
        },
      }
    );

    const responseJson = await response.json();
    const filterStatusDataTemp: any[] = [];
    responseJson.content.forEach((item: any) => {
      if (
        !filterStatusDataTemp.some((status) => status.value === item.status)
      ) {
        filterStatusDataTemp.push({ value: item.status, render: item.status });
      }
    });

    const filterTemp = [...filter];

    for (const filterTempItem of filterTemp) {
      if (
        filterTempItem.field === "statusSingle" ||
        filterTempItem.field === "statusMulti"
      ) {
        filterTempItem.filterSelectData = filterStatusDataTemp;
      }
    }

    setFilter(filterTemp);
    setIsLoading(false);
  };

  return (
    <ACLoading isLoading={isLoading} loadingElement={<ACSpinner />}>
      <ACTable
        {...args}
        rows={remoteTableData.items}
        onTableStateChange={handleOnTableStateChange}
        pagesCount={remoteTableData.totalPagesNumber}
        allItemsCount={remoteTableData.allItemsCount}
        filter={filter}
        onShowFilter={handleOnShowFilter}
      />
    </ACLoading>
  );
};

export const Primary = Template.bind({});
Primary.args = {
  columns: [
    { field: "name", title: "Name" },
    {
      field: "createdAt",
      title: "Created at",
    },
    { field: "description", title: "Description" },
    { field: "client", title: "Client" },
    {
      field: "status",
      title: "Status",
    },
  ],
  headerTitle: "Table header",
  selection: true,
  actions: [
    {
      icon: <MdDelete />,
      onClick: ({ rowData, tableState }) => {
        console.log("Delete");
        console.log(rowData);
      },
    },
    {
      rowData(rowData) {
        return {
          icon: <MdEdit />,
          onClick: ({ rowData, tableState }) => {
            console.log("Edit", rowData);
          },
          hide(rowData) {
            return rowData.rawData.status === "IN_PROGRESS";
          },
        };
      },
    },
    {
      rowData(rowData) {
        return {
          icon: <MdInfo />,
          onClick: ({ rowData, tableState }) => {
            console.log("Info", rowData);
          },
          disabled(rowData) {
            return rowData.rawData.status === "IN_PROGRESS";
          },
        };
      },
    },
  ],
  multipleSelectionsActions: [
    {
      icon: <MdDelete />,
      onClick: ({ rowData, tableState }) => {
        console.log("MULTIPLE ROWS DELETE");
        console.log(rowData);
        console.log(tableState);
      },
    },
  ],
  headerActions: [
    {
      icon: <MdAdd />,
      onClick: () => {
        console.log("ADD");
      },
    },
  ],
  paginationStyle: {
    stylePaginationItem: {
      borderRadius: "8px",
    },
  },
  color: "primary",
  onItemClicked(row) {
    console.log(row);
  },
  enableSorting: true,
};
