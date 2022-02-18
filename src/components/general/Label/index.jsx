import React from "react";
import PropTypes from "prop-types";
import { RootStyle } from "./styles";

export default function Label({
  color = "default",
  variant = "ghost",
  children,
  ...other
}) {
  return (
    <RootStyle ownerState={{ color, variant }} {...other}>
      {children}
    </RootStyle>
  );
}

Label.propTypes = {
  children: PropTypes.node,
  color: PropTypes.oneOf([
    "default",
    "primary",
    "secondary",
    "info",
    "success",
    "warning",
    "error",
  ]),
  variant: PropTypes.oneOf(["filled", "outlined", "ghost"]),
};
