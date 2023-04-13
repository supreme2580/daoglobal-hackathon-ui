import classnames from "classnames";
import React from "react";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  classNames?: string;
}
export const PrimaryButton: React.FC<Props> = ({
  startIcon,
  endIcon,
  children,
  classNames,
  ...props
}) => {
  return (
    <button
      className={classnames(
        "btn-primary btn flex items-center gap-2 rounded-md",
        classNames
      )}
      {...props}
    >
      {startIcon}
      {children}
      {endIcon}
    </button>
  );
};
