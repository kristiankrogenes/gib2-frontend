import "animate.css";
import { fadeInUp } from "react-animations";
import Radium from "radium";

export const styles = {
  fadeInUp: {
    animation: "x 1s",
    animationName: Radium.keyframes(fadeInUp, "fadeInUp"),
  },
};
