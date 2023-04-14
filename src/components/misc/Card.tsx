import React from "react";

interface Props {
  children?: React.ReactNode;
}

export const PlainCard: React.FC<Props> = ({ children }) => {
  return (
    <div className="card w-full border-2 bg-base-100 shadow-xl ">
      <div className="card-body">{children}</div>
    </div>
  );
};
