import styled from "styled-components";

export const HomeContainer = styled.main`
  display: flex;
  flex-direction: column;
  flex: 1;
  align-items: center;
  justify-content: center;

  form {
    display: flex;
    flex-direction: column;
    gap: 3.5rem;
    align-items: center;
  }
`;

export const BaseButton = styled.button`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;

  border: 0;
  padding: 1rem;
  border-radius: 8px;
  cursor: pointer;
  background-color: ${(props) => props.theme["green-500"]};
  color: ${(props) => props.theme["gray-100"]};

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }

  &:not(:disabled):hover {
    background-color: ${(props) => props.theme["green-700"]};
    transition: all ease 0.3s;
  }
`;

export const CountDownButton = styled(BaseButton)`
  background-color: ${(props) => props.theme["green-500"]};

  &:not(:disabled):hover {
    background-color: ${(props) => props.theme["green-700"]};
  }
`;

export const StopButton = styled(BaseButton)`
  background-color: ${(props) => props.theme["red-500"]};

  &:not(:disabled):hover {
    background-color: ${(props) => props.theme["red-700"]};
  }
`;
