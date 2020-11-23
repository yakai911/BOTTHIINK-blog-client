import Link from "next/link";

const MyIcon = () => {
  return (
    <Link href='/'>
      <img
        src='/moshIcon.png'
        alt='logo'
        style={{ width: 50, height: 50, marginLeft: "15px" }}
      />
    </Link>
  );
};

export default MyIcon;
