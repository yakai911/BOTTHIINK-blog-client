import { smartTrim } from "../../backend/helpers/blog";

const myLoader = ({ src, width, quality }) => {
  return `${process.env.NEXT_PUBLIC_API}${src}?w=${width}&q=${quality || 75}`;
};

export default myLoader;
