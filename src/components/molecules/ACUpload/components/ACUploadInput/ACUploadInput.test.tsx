import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";

import ACUploadInput from "./ACUploadInput";
import userEvent from "@testing-library/user-event";

describe("ACUploadInput", () => {
  test("should pass", async () => {
    render(
      <ACUploadInput
        files={[]}
        isSmall={false}
        multiple={false}
        setFiles={jest.fn}
      />
    );
    const blob: Blob = new Blob(["name"], { type: "image/png" });
    const file: File = new File([blob], "Image" + blob.size, {
      type: blob.type,
    });
    const input = screen.getByTestId("ACUploadInput-upload");
    userEvent.upload(input, file);
  });
});
