// components/layouts/MainLayout.tsx
import React from "react";
import StyledHeader from "../Header";

type Props = {
  children: React.ReactNode;
};

const MainLayout = ({ children }: Props) => {
  return (
    <>
      <StyledHeader />
      <main>{children}</main>
    </>
  );
};

export default MainLayout;
