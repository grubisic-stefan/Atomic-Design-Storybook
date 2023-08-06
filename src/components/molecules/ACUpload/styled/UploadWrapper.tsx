import React from "react";
import styled from "styled-components";

interface StyledProps {
  wrapper?: {
    background?: string;
    width?: string;
    height?: string;
    mainColor?: string;
    mainColorLowerOpacity?: string;
    backgroundLowerOpacity?: string;
    backgroundHigherOpacity?: string;
  };
  listContainer?: {
    width?: string;
    height?: string;
    textButton?: boolean;
  };
  listItem?: {
    width?: string;
    height?: string;
  };
  firstInOrder?: string;
}

const Wrapper = styled.div<StyledProps>`
  width: 100%;
  height: 100%;

  &[data-color="primary"] {
    .ACUploadInput-container {
      padding: 40px;
      width: 100%;
      height: 100%;
      background-color: #1985dd0c;
      &:hover,
      &[data-hover-drop="true"] {
        background-color: #1985dd18;
      }
      &::before {
        border: 4px dashed #1985dd5b;
      }
      &:hover::before,
      &[data-hover-drop="true"]::before {
        border-color: #1985ddfd;
      }
    }

    .ACUploadInput-input button {
      border: 2px solid #1984dd;
      color: #fff;
      background-color: #1984dd;
      margin-top: 20px;
    }

    .ACFile-Item {
      outline: 3px solid #289adc;

      .ACFile-Item-Button {
        background-color: transparent;
      }
      .ACFile-Item-Image-Logo {
        color: #1984dd;
      }
      .ACFile-Buttons {
        background-color: #1984dd;
      }
    }
  }
  &[data-color="secondary"] {
    .ACUploadInput-container {
      padding: 40px;
      width: 100%;
      height: 100%;
      background-color: #19dd850c;

      &:hover,
      &[data-hover-drop="true"] {
        background-color: #43e0992f;
      }
      &::before {
        border: 4px dashed #19dd8573;
      }
      &:hover::before,
      &[data-hover-drop="true"]::before {
        border-color: #19dd85;
      }
    }
    .ACUploadInput-input button {
      margin-top: 20px;
      border: 2px solid #19dd85;
      color: #fff;
      background-color: #19dd85;
    }
    .ACUploadInput-input:hover button {
      background-color: #31e896;
    }
    .ACFile-Item {
      outline: 3px solid #19dd85;

      .ACFile-Item-Button {
        background-color: transparent;
      }
      .ACFile-Item-Image-Logo {
        color: #19dd85;
      }
      .ACFile-Buttons {
        background-color: #19dd85;
      }
    }
  }
  /* &[data-color="custom"] {

    
    display:flex;
    .ACUploadInput-container {
      width: ${({ wrapper }) => wrapper?.width || "100%"};
      height: ${({ wrapper }) => wrapper?.height || "100%"};
      padding:40px;

      background-color:${({ wrapper }) => wrapper?.background || "#1985dd0c"} ;

      &:hover,
      &[data-hover-drop="true"] {
        background-color: ${({ wrapper }) => wrapper?.backgroundHigherOpacity};
      }
      &::before {
        border: 4px dashed ${({ wrapper }) => wrapper?.mainColorLowerOpacity};
      }
      &:hover::before,
      &[data-hover-drop="true"]::before {
        border-color: ${({ wrapper }) => wrapper?.mainColor};
      }
    }
    .ACUploadInput-input button {
      border: 2px solid ${({ wrapper }) => wrapper?.mainColor};
      color: #fff;
      background-color: ${({ wrapper }) => wrapper?.mainColor};
    }
    .ACUploadInput-input:hover button {
      background-color: ${({ wrapper }) => wrapper?.mainColorLowerOpacity};
    }
    .ACFile-Item {
      outline: 3px solid ${({ wrapper }) => wrapper?.mainColor};
      .ACFile-Item-Button {
        background-color: transparent;
      }
      .ACFile-Item-Image-Logo {
        color: ${({ wrapper }) => wrapper?.mainColor};
      }
      .ACFile-Buttons {
        background-color: ${({ wrapper }) => wrapper?.mainColor};
      }

      .ACFile-Item-Button:hover {
        opacity: 0.6;
      }
    }

    .ACUploadInput-input {
      color: ${({ wrapper }) => wrapper?.mainColor || "#585f58"};
      position: ${(props) =>
    props?.listContainer?.textButton === true ? "absolute" : "static"};
      top: ${(props) =>
    props?.listContainer?.textButton === true ? "50%" : "0px"};
      left: ${(props) =>
    props?.listContainer?.textButton === true ? "50%" : "0px"};
      transform: ${(props) =>
    props?.listContainer?.textButton === true
      ? "translate(-50%,-50%)"
      : "translate(0%)"};
      width: 100%;
      height: 100%;
      div {
        width: 100%;
        height: 100%;
      }
      .AC-Button {
        position: ${({ listContainer }) =>
    listContainer?.textButton === true ? "absolute" : "static"};
        top: ${({ listContainer }) =>
    listContainer?.textButton === true ? "50%" : "0px"};
        left: ${({ listContainer }) =>
    listContainer?.textButton === true ? "50%" : "0px"};
        transform: ${({ listContainer }) =>
    listContainer?.textButton === true
      ? "translate(-50%,-50%)"
      : "translate(0%)"};
        display: ${({ listContainer }) =>
    listContainer?.textButton === true ? "flex" : "inline-block"};
        flex-direction: ${({ listContainer }) =>
    listContainer?.textButton === true ? "column" : "row"};
        height: 100%;
        width: 100%;
        svg {
          font-size: ${({ listContainer }) =>
    listContainer?.textButton === true ? "2.5rem" : "1rem"};
        }
      }
    }
    .ACUploadInput-container {
      color: ${({ wrapper }) => wrapper?.mainColor || "#585f58"};
    }
  } */

  &[data-color="custom"] {
    &[data-orientation="horizontal"] {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(130px, 145px));
    }

    &[data-orientation="vertical"] {
      display: flex;
      flex-direction: column;
    }

    justify-items: flex-start;
    gap: 20px;

    > div:not(.ACBackdrop, .ACTransition) {
      height: 100%;
      height: 145px;
    }

    .ACUploadInput-container {
      height: ${({ wrapper }) => wrapper?.height || "100%"};
      width: ${({ wrapper }) => wrapper?.width || "100%"};
      color: ${({ wrapper }) => wrapper?.mainColor || "#585f58"};

      &:hover,
      &[data-hover-drop="true"] {
        background-color: ${({ wrapper }) =>
          wrapper?.background || "transparent"};
      }
      &::before {
        border: 3px dashed
          ${({ wrapper }) => wrapper?.background || "#554f5975"};
        border-radius: 5px;
      }

      &:hover::before,
      &[data-hover-drop="true"]::before {
        border-color: rgb(79, 70, 229);
      }
    }
    .ACUploadInput-input .AC-Button {
      height: 100%;
      display: flex;
      flex-direction: column;
      p {
        color: #171618;
        font-weight: 500;
      }
    }

    .ACFile-Item {
      outline: 1px solid #554f5975;
      border-radius: 2px;
      .ACFile-Item-Button {
        background-color: transparent;
      }
      .ACFile-Buttons {
        border-radius: 0px;
        border-radius: 3px;
        background-color: rgba(17, 24, 39, 0.7);

        width: 82%;
        height: 83%;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
      }

      .ACFile-Item-Button:hover {
        opacity: 0.6;
      }
    }

    .ACUploadInput-input {
      color: #181918;
      width: 100%;
      height: 100%;
      position: relative;
      top: 0px;
      left: 0px;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      gap: 20px;
      width: 100%;

      div {
        width: 100%;
        height: 100%;
      }
      input + div {
        display: none !important;
      }
      svg {
        font-size: 5rem;
        color: #181719d5;
      }
    }
  }

  &[data-color="tasty"] {
    &[data-orientation="horizontal"] {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(130px, 145px));
    }

    &[data-orientation="vertical"] {
      display: flex;
      flex-direction: column;
    }

    justify-items: flex-start;
    gap: 20px;

    > div:not(.ACBackdrop, .ACTransition) {
      height: 100%;
      height: 145px;
    }

    .ACUploadInput-container {
      width: fit-content;
      height: 100%;
      width: 100%;
      color: #585f58;

      &:hover,
      &[data-hover-drop="true"] {
        background-color: transparent;
      }
      &::before {
        border: 3px dashed #554f5975;
        border-radius: 5px;
      }
      &:hover::before,
      &[data-hover-drop="true"]::before {
        border-color: rgb(79, 70, 229);
      }
    }
    .ACUploadInput-input .AC-Button {
      height: 100%;
      display: flex;
      flex-direction: column;
      p {
        color: #171618;
        font-weight: 500;
      }
    }
    .ACUploadInput-input:hover button {
      /* background-color: red; */
    }
    .ACFile-Item {
      outline: 1px solid #554f5975;
      border-radius: 2px;
      .ACFile-Item-Button {
        background-color: transparent;
      }
      .ACFile-Buttons {
        border-radius: 0px;
        border-radius: 3px;
        background-color: rgba(17, 24, 39, 0.7);

        width: 82%;
        height: 83%;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
      }

      .ACFile-Item-Button:hover {
        opacity: 0.6;
      }
    }

    .ACUploadInput-input {
      color: #181918;
      width: 100%;
      height: 100%;
      position: relative;
      top: 0px;
      left: 0px;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      gap: 20px;
      width: 100%;

      div {
        width: 100%;
        height: 100%;
      }
      input + div {
        display: none !important;
      }
      svg {
        font-size: 5rem;
        color: #181719d5;
      }
    }
  }
  .ACUploadInput-container[data-disabled="true"] {
    background-color: #9fa5a528 !important;
    &::before {
      border: 4px dashed #797c7c3c !important;
    }
    p,
    svg {
      color: #abadad;
    }
    .ACUploadInput-input button {
      cursor: default;
      background-color: #797c7c3c !important;
      border: none;
    }
    .ACUploadInput-input:hover button {
      cursor: default;
      background-color: #797c7c3c !important;
    }
    .ACUploadInput-input input:hover {
      cursor: default;
    }
  }
  .ACUploadInput-container {
    order: ${({ firstInOrder }) => (firstInOrder === "upload" ? 0 : 1)};
    padding: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    position: relative;
    gap: 5px;
    font-family: sans-serif;
    transition: all 0.15s linear;

    &::before {
      content: "";
      position: absolute;
      top: 0px;
      bottom: 0px;
      left: 0px;
      right: 0px;
      transition: all 0.2s linear;
    }

    &[data-hover-drop="true"] {
      .ACUploadInput-input,
      .ACUploadInput-input ~ p {
        opacity: 0.4;
      }
    }
  }
  .ACUploadInput-input input {
    position: absolute;
    z-index: 3;
    opacity: 0;
    height: 100%;
    width: 100%;
    left: 0px;
  }
  .ACUploadInput-input input:hover {
    cursor: pointer;
  }
  .ACUploadInput-input button {
    padding: 12px 5px;
    border-radius: 8px;
    border: none;
    width: 100%;
    font-size: 1.1rem;

    width: 100%;
    z-index: 1;
    transition: 0.15s all ease;
  }

  button + svg {
    margin-top: 30px;
  }
  .main {
    padding-bottom: 10px;
    margin-top: -10px;
    font-weight: 900;
  }
  .ACFile-Item-Wrapper {
    position: relative;
    width: 100%;
  }

  .ACFile-Item {
    height: 100%;
    transition: all 0.2s ease;
    box-shadow: none;
    position: relative;
    border-radius: 10px;
    padding: 3px;
    .ACFile-Item-Image {
      width: 100%;
      height: 100%;
      border-radius: inherit;
      object-fit: cover;

      .ACFile-Item-Image-Logo {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
      .ACFile-Item-Image-Logo:not(svg) {
        padding: 10px;
        border-radius: 14px;
      }
      .ACFile-Item-Image-Logo:is(svg) {
        padding: 30px;
        color: #554f5975;
      }
    }
    .ACFile-Buttons {
      position: absolute;
      right: 0px;
      top: 0px;
      opacity: 0;
      border-radius: inherit;
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .AC-Button-contained-primary {
      box-shadow: none;
      font-size: 120%;
    }
  }

  .ACFile-Item:hover {
    .ACFile-Buttons {
      opacity: 1;
    }
  }

  input[type="file"] + div {
    width: 100%;
    position: relative;
  }

  .ACFile-Buttons > div:first-of-type {
    margin-left: -3px;
  }

  .ACFile-Item-Delete-Modal {
    background-color: #fff;
    padding: 20px;
    width: 50vw;
    max-width: 500px;
  }

  .ACFile-Item-Delete-Modal-Info-Wrapper {
    display: flex;
    justify-content: space-between;
    width: 100%;

    & > div:first-of-type {
      width: 100%;
      display: flex;
      gap: 10px;

      & > div:last-of-type {
        & > div:first-of-type {
          font-size: 1.225rem;
          margin-bottom: 0.5em;
        }

        & > div:last-of-type {
          color: #818181;
          font-size: 1rem;
        }
      }
    }
  }

  .ACFile-Item-Delete-Modal-Icon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 50px;
    background-color: rgba(208, 55, 55, 0.2);
    border-radius: 50%;
    min-width: 50px;
    max-height: 50px;
    padding-bottom: 3px;
  }
  .ACFile-Item-Delete-Modal-Buttons {
    margin-top: 2em;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    width: 100%;
    gap: 10px;
  }

  .ACFile-Item-Image-Modal {
    width: 50vw;
    background-color: #ffffff;
    padding: 20px;
    border-radius: 10px;
    box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
    h2 {
      width: 100%;
      font-family: "Lucida Sans", "Lucida Sans Regular", "Lucida Grande",
        "Lucida Sans Unicode", Geneva, Verdana, sans-serif;
      font-weight: 100;
      font-size: 1rem;
      display: flex;
      justify-content: space-between;
      margin-bottom: 1em;
      align-items: center;
    }
    & > div {
      padding: 3px;
      width: 100%;
      height: 100%;
      /* max-height:300px; */
    }
    .ACFile-Item-Image {
      /* padding: 3px; */
      width: 100%;
      height: 100%;
      max-height: 300px;
      object-fit: scale-down;
    }
  }

  .ACUpload-Stats {
    position: absolute;
    bottom: 0px;
    left: 0px;
    padding: 20px;
    color: black;
    font-weight: 900;
  }

  @media screen and (max-width: 700px) {
    .ACFile-Item-Image-Modal {
      width: 85vw;
    }
  }
`;

interface Props {
  dataset: {
    color: string;
    disabled: boolean;
    orientation: string;
  };
  key: string | number;
  role: string;
  className: string;
  children: React.ReactNode;
  styled?: StyledProps;
}

export const UploadWrapper = ({
  dataset: { color, disabled, orientation },
  role,
  className,
  children,
  key,
  styled,
}: Props) => (
  <Wrapper
    role={role}
    className={className}
    data-color={color}
    data-orientation={orientation}
    data-disabled={disabled}
    key={key}
    {...styled}
  >
    {children}
  </Wrapper>
);
