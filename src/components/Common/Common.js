import { Link } from "react-router-dom";
import { styled } from "styled-components";

export const Wrapper = styled.div`

  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

export const Inputs = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 10px;
  margin-right: 10px;
`;

export const Form = styled.div`
  display: flex;
  height: 100%;
`;

export const Title = styled.h1`
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 30px;
`;

export const Button = styled.button`
  font-size: 1rem;
  height: 30px;
  background-color: black;
  color: white;
  padding: 20px;
  border-radius: 10px;
`;

export const Input = styled.input`
  font-size: 20px;
  height: 40px;
  width: 300px;
  border-radius: 10px;
  padding: 10px;
  &:: placeholder {
    color: darkgray;
    font-size: 20px;
    font-weight: 500;
  }
`;
