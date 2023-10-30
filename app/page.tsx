import Image from "next/image";
import ggg from "./signin.png"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <p className="m-40 text-center text-xl">
        Under Maintenance
        <br />
        You can view the project on figma:
        <br/>
        <a href="https://www.figma.com/file/fUAeNhJwbc2ka73nfguHLy/Your-Fitness-Journey?type=design&node-id=0%3A1&mode=design&t=OiXPJJupINZfrXei-1">
      <Image
      className="m-5"
        src={ggg}
        alt="figma file"
        width={350}
        height={150}
      ></Image></a>
      </p>
    </main>
  );
}
