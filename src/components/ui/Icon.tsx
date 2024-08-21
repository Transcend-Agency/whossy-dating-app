interface IconProps extends React.SVGAttributes<HTMLOrSVGElement> {
  src: string;
  src2?: string;
  color?: string;
  color2?: string;
}

const Icon: React.FC<IconProps> = ({
  src,
  src2,
  color = "black",
  color2,
  ...props
}) => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill={color}
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d={src}
      //   fill="#F2243E"
    />
    <path d={src2} fill={color2}/>
  </svg>
);

export default Icon;
