import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import ACLoading from "./ACLoading";

describe("Loading", () => {
  it("checks that loading is visible when isLoading is true", async () => {
    render(
      <ACLoading loadingElement={<h1> loading </h1>} isLoading>
        <h1> content </h1>
      </ACLoading>
    );
    expect(screen.getByTestId("loading")).toBeInTheDocument();
  });
});
