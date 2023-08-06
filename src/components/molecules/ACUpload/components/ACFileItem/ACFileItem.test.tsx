import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";

import ACFileItem from "./ACFileItem";
import userEvent from "@testing-library/user-event";
import { Type } from "../../../../atoms/ACAvatar/ACAvatar.stories";

describe("ACFileItem", () => {
  const blobImg: Blob = new Blob(["name-img"], { type: "image/png" });
  const filePng: File = new File([blobImg], "./Image1.txt", {
    type: blobImg.type,
  });
  const defaultValue = { url: "url", id: "1" };

  it("Should render ACFileItem", () => {
    render(
      <ACFileItem
        type="video"
        defaultValue={defaultValue}
        setFiles={jest.fn}
        setItemModal={jest.fn}
      />
    );
    const upload = screen.getByTestId(`ACFile-${defaultValue.id}`);
    expect(upload).toBeInTheDocument();
  });

  it("Should fire delete on delete btn click", () => {
    render(
      <ACFileItem
        type="pdf"
        defaultValue={defaultValue}
        setFiles={jest.fn}
        setItemModal={jest.fn}
      />
    );
    const upload = screen.getByTestId(`ACFile-${defaultValue.id}`);
    userEvent.hover(upload);

    const btnDelete = upload.children[0].children[1].children[0];
    expect(fireEvent.click(btnDelete)).toBeTruthy();
  });

  it("Should fire view on view btn click", () => {
    render(
      <ACFileItem
        type="image"
        defaultValue={defaultValue}
        setFiles={jest.fn}
        setItemModal={jest.fn}
      />
    );
    const upload = screen.getByTestId(`ACFile-${defaultValue.id}`);
    userEvent.hover(upload);

    const btnView = upload.children[0].children[0].children[0];
    expect(fireEvent.click(btnView)).toBeTruthy();
  });

  it("Should fire delete on single item btn click", () => {
    render(
      <ACFileItem
        type="pdf"
        defaultValue={defaultValue}
        setFiles={jest.fn}
        setItemModal={jest.fn}
      />
    );
    const upload = screen.getByTestId(`ACFile-${defaultValue.id}`);
    userEvent.hover(upload);

    const btnDelete = upload.children[0].children[1].children[0];
    expect(fireEvent.click(btnDelete)).toBeTruthy();
  });
});
