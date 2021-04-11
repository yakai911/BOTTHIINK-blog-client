import Image from "next/image";
import Link from "next/link";

const MyBrand = ({ width, height, fontSize }) => (
  <div
    style={{
      display: "flex",
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
    }}>
    <Link href='/'>
      <span
        style={{
          fontSize: fontSize ?? "28px",
          fontWeight: 700,
          fontFamily: "-apple-system",
          marginRight: "10px",
        }}>
        BOT THK
      </span>
    </Link>
    <div>
      <Image
        src='/moshIcon.svg'
        alt='brand'
        qulity={100}
        width={width}
        height={height}
      />
    </div>
  </div>
);

export default MyBrand;
