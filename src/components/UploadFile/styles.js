import styled, { css } from "styled-components";

const dragActive = css`
  border-color: #0b64f4;
`;

const dragReject = css`
  border-color: #e57878;
`;

export const DropContainer = styled.div.attrs({
  className: "dropzone",
})`
  border: 2px dashed #ddd;
  border-radius: 4px;
  width: 100%;
  height: 100%;
  cursor: pointer;

  transition: height 0.2s ease;

  ${(props) => props.isDragActive && dragActive};
  ${(props) => props.isDragRegect && dragReject};
`;

const messageColors = {
  default: "#757373",
  error: "#e57878",
  sucess: "#0B64F4",
};

export const UploadMessage = styled.p`
  font-size: 1.1rem;
  display: flex;
  color: ${(props) => messageColors[props.type || "default"]};
  justify-content: center;
  align-items: center;
  padding: 15px 0;
`;
