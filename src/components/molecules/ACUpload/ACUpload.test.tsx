import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";

import ACUpload from "./ACUpload";

describe("ACUpload", () => {
  it("Should render ACUpload", () => {
    render(<ACUpload type="image" multiple={true} />);
    const upload = screen.getByRole("ACUpload");
    expect(upload).toBeInTheDocument();
  });
  it("Should add data attribute color", () => {
    render(<ACUpload type="image" multiple={true} color="primary" />);
    const upload = screen.getByRole("ACUpload");
    expect(upload).toHaveAttribute("data-color");
  });
  it("Should add data attribute color primary", () => {
    render(<ACUpload type="image" multiple={true} color="primary" />);
    const upload = screen.getByRole("ACUpload");
    expect(upload).toHaveAttribute("data-color", "primary");
  });
  it("Should add data attribute color primary", () => {
    render(<ACUpload type="image" multiple={true} color="secondary" />);
    const upload = screen.getByRole("ACUpload");
    expect(upload).toHaveAttribute("data-color", "secondary");
  });
  it("Should add data attribute orientation", () => {
    render(<ACUpload type="image" multiple={true} />);
    const upload = screen.getByRole("ACUpload");
    expect(upload).toHaveAttribute("data-orientation");
  });
  it("Should add data attribute color primary", () => {
    render(<ACUpload type="image" multiple={true} />);
    const upload = screen.getByRole("ACUpload");
    expect(upload).toHaveAttribute("data-orientation", "horizontal");
  });
  it("Should add data attribute color primary", () => {
    render(<ACUpload type="image" multiple={true} />);
    const upload = screen.getByRole("ACUpload");
    expect(upload).toHaveAttribute("data-orientation", "horizontal");
  });
  it("Should render disabled upload component", () => {
    render(<ACUpload type="image" multiple={true} disabled />);
    const upload = screen.getByRole("ACUploadInput-disabled");
    expect(upload).toBeInTheDocument();
  });
  it("Should get images by urls", () => {
    render(
      <ACUpload
        type="image"
        multiple={true}
        defaultValue={[
          {
            url: "https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png",
            id: "1",
          },
        ]}
      />
    );
    const upload = screen.getByRole("ACUploadInput-enabled");
    expect(upload).toBeInTheDocument();
  });
  it("Should get single url", () => {
    render(<ACUpload type="image" multiple={false} onChange={jest.fn} />);
    const upload = screen.getByRole("ACUploadInput-enabled");
    expect(upload).toBeInTheDocument();
  });
});
