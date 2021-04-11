import Image from "next/image";
import Link from "next/link";

const MyIcon = ({ width, height }) => {
  return (
    <Link href='/'>
      <>
        <Image src='/moshIcon.svg' alt='logo' width={width} height={height} />
      </>
    </Link>
  );
};

export default MyIcon;
