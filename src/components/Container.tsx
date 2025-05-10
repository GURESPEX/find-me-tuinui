import { PropsWithChildren } from "react";

type ContainerProps = PropsWithChildren;

const Container = ({ children }: ContainerProps) => {
  return (
    <div className="relative w-screen h-screen overflow-auto">{children}</div>
  );
};

export default Container;
