import styled from "styled-components";

export const Table = styled.div`
  width: 50%;
`;

export const Tr = styled.div`
  background-color: #fff;
  display: flex;
`;

export const Td = styled.div`
  width: 50%;
  text-align: left;
  font-weight: ${({ bold }) => (bold ? "bold" : "normal")};
`;
