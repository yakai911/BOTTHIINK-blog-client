import Link from "next/link";

const MyIcon = () => {
  return (
    <Link href='/admin/crud/blog'>
      <img
        src='/moshIcon.png'
        alt='logo'
        style={{ width: 50, height: 50, marginLeft: "20px" }}
      />
    </Link>
  );
};

export default MyIcon;
