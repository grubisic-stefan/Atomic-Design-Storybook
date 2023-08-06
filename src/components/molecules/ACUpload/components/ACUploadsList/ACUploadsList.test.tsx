import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";

import ACUploadsList from "./ACUploadsList";
import userEvent from "@testing-library/user-event";

describe("ACUploadsList", () => {
  global.URL.createObjectURL = jest.fn(() => "details");

  const onChange = jest.fn();
  const onDefaultDelete = jest.fn();

  const blobImg: Blob = new Blob(["name-img"], { type: "image/png" });
  const filePng: File = new File([blobImg], "Image1" + blobImg.size, {
    type: blobImg.type,
  });

  const blobPdf: Blob = new Blob(["name-pdf"], { type: "application/pdf" });
  const filePdf: File = new File([blobPdf], "PDF-File" + blobPdf.size, {
    type: blobPdf.type,
  });

  const blobVideo: Blob = new Blob(["name-video"], { type: "video/mov" });
  const fileVideo: File = new File([blobVideo], "Video-File" + blobVideo.size, {
    type: blobVideo.type,
  });

  it("Should render ACUploadsListItem", () => {
    render(
      <ACUploadsList
        defaultValue={[{ url: "url", id: "1" }]}
        type={"image"}
        setFiles={jest.fn}
        multiple={true}
      />
    );
    const list = screen.getByRole("ACUploadsListItem");
    expect(list).toBeInTheDocument();
  });

  it("Should open modal on eye click then close, the type is img", () => {
    render(
      <ACUploadsList files={[filePng]} type={"image"} setFiles={jest.fn} />
    );
    const upload = screen.getByTestId(`ACFile-${filePng.name}`);
    userEvent.hover(upload);
    const btnView = upload.children[0].children[0].children[0];
    fireEvent.click(btnView);
    const backdrop = screen.getByTestId("ACBackdropRoot");
    expect(fireEvent.click(backdrop)).toBeTruthy();
  });

  it("Should open modal on eye click then close, the type is pdf", () => {
    render(<ACUploadsList files={[filePdf]} type={"pdf"} setFiles={jest.fn} />);
    const upload = screen.getByTestId(`ACFile-${filePdf.name}`);
    userEvent.hover(upload);
    const btnView = upload.children[0].children[0].children[0];
    fireEvent.click(btnView);
    const backdrop = screen.getByTestId("ACBackdropRoot");
    expect(fireEvent.click(backdrop)).toBeTruthy();
  });

  it("Should open modal on eye click then close, the type is video", () => {
    render(
      <ACUploadsList files={[fileVideo]} type={"image"} setFiles={jest.fn} />
    );
    const upload = screen.getByTestId(`ACFile-${fileVideo.name}`);
    userEvent.hover(upload);
    const btnView = upload.children[0].children[0].children[0];
    fireEvent.click(btnView);
    const backdrop = screen.getByTestId("ACBackdropRoot");
    expect(fireEvent.click(backdrop)).toBeTruthy();
  });

  it("Delete Default multiple", () => {
    render(
      <ACUploadsList
        defaultValue={[{ url: "url", id: "1" }]}
        type={"image"}
        setFiles={jest.fn}
        multiple={true}
        onChange={onChange}
        onDeleteDefault={onDefaultDelete}
      />
    );
    const list = screen.getByRole("ACUploadsListItem");
    expect(list).toBeInTheDocument();
    const deleteBtn = screen.getAllByTestId(`acButton`)[1];
    fireEvent.click(deleteBtn);
    expect(onDefaultDelete).toHaveBeenCalled();
  });
  it("Delete Default single", () => {
    render(
      <ACUploadsList
        defaultValue={{ url: "url", id: "1" }}
        type={"pdf"}
        setFiles={jest.fn}
        onChange={onChange}
        onDeleteDefault={onDefaultDelete}
      />
    );
    const list = screen.getByRole("ACUploadsListItem");
    expect(list).toBeInTheDocument();
    const deleteBtn = screen.getAllByTestId(`acButton`)[1];
    fireEvent.click(deleteBtn);
    expect(onDefaultDelete).toHaveBeenCalled();
  });
  it("delete file multiple", () => {
    render(
      <ACUploadsList
        files={[filePng]}
        type={"image"}
        setFiles={jest.fn}
        multiple={true}
        onChange={onChange}
        onDeleteDefault={onDefaultDelete}
      />
    );
    const list = screen.getByRole("ACUploadsListItem");
    expect(list).toBeInTheDocument();
    const deleteBtn = screen.getAllByTestId(`acButton`)[1];
    fireEvent.click(deleteBtn);
    expect(onChange).toHaveBeenCalled();
  });
  it("delete file single", () => {
    render(
      <ACUploadsList
        files={[filePng]}
        type={"image"}
        setFiles={jest.fn}
        onChange={onChange}
        onDeleteDefault={onDefaultDelete}
      />
    );
    const list = screen.getByRole("ACUploadsListItem");
    expect(list).toBeInTheDocument();
    const deleteBtn = screen.getAllByTestId(`acButton`)[1];
    fireEvent.click(deleteBtn);
    expect(onChange).toHaveBeenCalled();
  });
});
