import PropTypes from "prop-types";
import useInView from "../hooks/useInView.js";

export default function Reveal({ children, as: Tag = "div", className = "", delay = 0, style, ...rest }) {
  const [ref, inView] = useInView(0.15);
  return (
    <Tag
      ref={ref}
      className={`reveal ${inView ? "in" : ""} ${className}`.trim()}
      style={delay ? { ...style, transitionDelay: `${delay}ms` } : style}
      {...rest}
    >
      {children}
    </Tag>
  );
}

Reveal.propTypes = {
  children: PropTypes.node,
  as: PropTypes.elementType,
  className: PropTypes.string,
  delay: PropTypes.number,
  style: PropTypes.object,
};
