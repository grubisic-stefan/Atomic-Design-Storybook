import React, { CSSProperties, FC, useEffect, useMemo, useState } from "react";
import "./ACFilter.scss";
import ACButton from "../../atoms/ACButton";
import { ACToolTip } from "../../atoms";
import { ACInput } from "../../atoms";
import { AiOutlineClear, AiOutlineClose } from "react-icons/ai";
import ACAutocompleteV2 from "../ACAutocompleteV2";

export interface ACFilterSelectItem {
  value: string;
  render: string;
}

export interface ACFilterItem {
  field: string;
  title: string;
  filterType: "text" | "number" | "selectSingle" | "selectMulti" | "date";
  filterSelectData?: ACFilterSelectItem[];
}

export interface ACFilterProps {
  filter: ACFilterItem[];
  onFilterChanged: (filter: any) => void;
  closeButtonVisible?: boolean;
  onCloseButtonClick?: () => void;
  style?: CSSProperties;
  dataTestId?: string;
  handleActions?: (
    action: "sort" | "currentPage" | "itemsPerPage" | "filter",
    actionValue: any
  ) => void;
  tooltipsStyle?: CSSProperties;
}

const ACFilter: FC<ACFilterProps> = ({
  filter,
  closeButtonVisible = false,
  style,
  onFilterChanged,
  onCloseButtonClick,
  dataTestId,
  handleActions,
  tooltipsStyle,
}) => {
  const initializeEmptyFilter = useMemo(() => {
    let emptyFilter: any = {};
    filter?.forEach((filterItem) => {
      emptyFilter[filterItem.field] = "";
    });
    return emptyFilter;
  }, [filter]);

  const [filterState, setFilterState] = useState(initializeEmptyFilter);

  useEffect(() => {
    const modifiedFilterForUser = { ...filterState };
    for (const filterItem of filter) {
      if (filterItem.filterType === "selectSingle") {
        modifiedFilterForUser[filterItem.field] =
          filterState[filterItem.field].value || "";
      }
      if (filterItem.filterType === "selectMulti") {
        if (filterState[filterItem.field] !== "") {
          modifiedFilterForUser[filterItem.field] = filterState[
            filterItem.field
          ]
            .map((item: ACFilterSelectItem) => item.value)
            .join(",");
        }
      }
    }
    const handlerTimeOut = setTimeout(() => {
      onFilterChanged(modifiedFilterForUser);
      handleActions && handleActions("filter", modifiedFilterForUser);
    }, 500);
    return () => {
      clearTimeout(handlerTimeOut);
    };
  }, [filterState]);

  const resetFilter = () => {
    filter?.forEach((filterItem) => {
      setFilterState((prevState: any) => ({
        ...prevState,
        [filterItem.field]: "",
      }));
    });
  };

  return (
    <div data-testid="ACFilter" style={style} className={`ACFilter`}>
      <div className="ACFilter-inputs">
        {filter.map((filterItem) => (
          <React.Fragment key={filterItem.field}>
            {(filterItem.filterType === "text" ||
              filterItem.filterType === "number" ||
              filterItem.filterType === "date") && (
              <ACInput
                id={filterItem.title}
                label={filterItem.title}
                style={{
                  affixWrapper: { borderRadius: "7px" },
                }}
                value={filterState[filterItem.field]}
                onChange={(e) => {
                  setFilterState((prevState: any) => ({
                    ...prevState,
                    [filterItem.field]: e.target.value,
                  }));
                }}
                type={`${filterItem.filterType}`}
                fullWidth
              />
            )}
            {(filterItem.filterType === "selectSingle" ||
              filterItem.filterType === "selectMulti") && (
              <ACAutocompleteV2
                multiple={filterItem.filterType === "selectMulti"}
                fullWidth
                dataTestId={dataTestId}
                value={filterState[filterItem.field]}
                onChange={function (event: any, value: any): void {
                  setFilterState((prevState: any) => ({
                    ...prevState,
                    [filterItem.field]: event.ac.value,
                  }));
                }}
                options={filterItem.filterSelectData!}
                renderInput={function (params: {}): React.ReactElement<
                  any,
                  string | React.JSXElementConstructor<any>
                > {
                  return <ACInput {...params} />;
                }}
                getOptionLabel={(option) => {
                  return option.render;
                }}
                label={filterItem.title}
              />
            )}
          </React.Fragment>
        ))}
      </div>

      <div className="ACFilter-buttons">
        <ACToolTip label="Clear" position="bottomCenter" style={tooltipsStyle}>
          <ACButton
            size="small"
            variant="text"
            iconButton
            onClick={resetFilter}
          >
            <AiOutlineClear color="#25566b" size={20} />
          </ACButton>
        </ACToolTip>

        {closeButtonVisible && (
          <ACToolTip
            label="Close"
            position="bottomCenter"
            style={tooltipsStyle}
          >
            <ACButton
              onClick={onCloseButtonClick}
              className="ACFilter-closeButton"
              size="small"
              variant="text"
              iconButton
            >
              <AiOutlineClose color="#25566b" size={20} />
            </ACButton>
          </ACToolTip>
        )}
      </div>
    </div>
  );
};

export default ACFilter;
