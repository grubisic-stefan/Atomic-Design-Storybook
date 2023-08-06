import React, { ReactNode, useState } from "react";

import { ComponentMeta, ComponentStory } from "@storybook/react";
import ACListRemote from "./ACListRemote";
import { ACLoading } from "../../../atoms";
import { ACListItem, ACListState } from "../ACListBase/ACListBase";
import { MdAdd, MdDelete, MdEdit, MdInfo } from "react-icons/md";

export default {
  title: "Organisms/ACListRemote",
  component: ACListRemote,
} as ComponentMeta<typeof ACListRemote>;

const returnActionForSonar = (icon: ReactNode, onClick: () => void) => {
  return {
    icon,
    onClick,
  };
};

const Template: ComponentStory<typeof ACListRemote> = (args) => {
  const [remoteData, setRemoteData] = useState({
    allItemsCount: 0,
    items: [],
    totalPagesNumber: 0,
  } as { items: ACListItem[]; totalPagesNumber: number; allItemsCount: number });
  const [isLoading, setIsLoading] = useState(false);

  const handleOnListStateChange = async (listState: ACListState) => {
    setIsLoading(true);

    const response = await fetch(
      `https://companify.antech-dev.com/api/v1/groups?page=${
        listState.currentPage - 1
      }&size=${listState.itemsPerPage}&sort=${listState.sort.field},${
        listState.sort.type
      }&name=${listState.searchQuery}`,
      {
        headers: {
          Authorization:
            "Bearer eyJhbGciOiJSUzI1NiJ9.eyJzdWIiOiJvd25lci0xIiwid29ya3NwYWNlIjoid29ya3NwYWNlLTEiLCJyb2xlcyI6WyJQcm9iYSBpbnYiLCJSb2xhYSIsIldPUktTUEFDRV9BRE1JTiIsIlByb2JhMSIsIldPUktTUEFDRV9NRU1CRVIiXSwiaXNzIjoiaHR0cDpcL1wvbG9jYWxob3N0OjYwMDciLCJhdWQiOiIwODZlNTk1My0wNWMzLTRkOTgtOGRlMC0wZjliYjM3OTdmZTIiLCJuYmYiOjE2NzU4Njk4NzIsInBlcm1pc3Npb25zIjpbIlJPTEVfRklORF9CWV9JRCIsIkFDQ09VTlRfUkVNT1ZFX1JPTEVTIiwiQUNDT1VOVF9BRERfUk9MRVMiLCJBQ0NPVU5UX0NIQU5HRV9QQVNTV09SRCJdLCJzY29wZSI6WyJyZWFkIl0sImV4cCI6MTY3NjczMzg3MiwiaWF0IjoxNjc1ODY5ODcyLCJ1c2VyIjoidXNlci0xIiwiYWNjb3VudCI6Im93bmVyLTEifQ.m0mLqRG8OWp51yOGeQVz95IbH3kCoFVu1FqaSghYQ6C9_URaDPnFuxVgNLHYP_LfyUrB-p3aAV7VtH7m29Cc4aRPeSlzLh3lcPV3QnOH3ZO6XJdL9yBkKNw2zPbudTzPPagab3Ww0m-5S9ik_bk9bZpHFgMAPHfHCdVS45JAtiL1xrrIfjJRhK7pgDM9W-RYUElV9TqQX094X9ocizpKE88H7CF-asGzh68p8xXw9NxJ0TQTpiDUYfba9GopmCV8hnble1MHZ3b_FXPK6XcQyAo9a-flcqBsCrrfJKc5T_EETAE4lZK7DsWVaeQ4T_IDFrwz4TD_F1KfYTugCtFWjg",
        },
      }
    );
    const responseJson = await response.json();
    const items: ACListItem[] = [];
    responseJson.content.forEach((i: any) => {
      items.push({
        id: i.uuid,
        title: i.name,
        description: i.description,
      });
    });

    setRemoteData({
      items: items,
      totalPagesNumber: responseJson.totalPages,
      allItemsCount: responseJson.totalElements,
    });
    setIsLoading(false);
  };

  return (
    <ACLoading isLoading={isLoading} loadingElement={<h1> LOADING </h1>}>
      <ACListRemote
        {...args}
        headerTitle={"List remote"}
        rows={remoteData.items}
        pagesCount={remoteData.totalPagesNumber}
        allItemsCount={remoteData.allItemsCount}
        onTableStateChange={handleOnListStateChange}
      />
    </ACLoading>
  );
};

export const Primary = Template.bind({});
Primary.args = {
  headerTitle: "List remote",
  headerActions: [
    returnActionForSonar(<MdAdd />, () => {
      console.log("ADD");
    }),
    returnActionForSonar(<MdInfo />, () => {
      console.log("INFO");
    }),
  ],
  actions: [
    returnActionForSonar(<MdDelete />, () => {
      console.log("DELETE");
    }),
    returnActionForSonar(<MdEdit />, () => {
      console.log("EDIT");
    }),
  ],
};
