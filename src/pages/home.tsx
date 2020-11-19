import React from "react";
import styled from "styled-components";

const WelcomePage = styled.div`
  padding: 3rem 3rem 3rem 3rem;
  background-image: url("page-bkgrd.png");
  background-repeat: no-repeat;
  background-color: #fff;
`;

const WelcomeMessage = styled.div`
  text-align: left;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica,
    Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
  color: #495057;
  font-weight: 400;
  font-size: 1.5rem;
`;

const Home = () => {
  return (
    <WelcomePage>
      <WelcomeMessage>Welcome to your digital portfolio manager</WelcomeMessage>
      <WelcomeMessage>
        Please select an option from the left to proceed
      </WelcomeMessage>
    </WelcomePage>
  );
};

export default Home;
