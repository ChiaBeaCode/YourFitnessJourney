import Image from "next/image";
import figma from "./images/signin.png";
import {AiFillGithub} from "react-icons/ai"

export default function Home() {
  return (
    <main className="flex flex-col cursor-default h-screen">
      <section className="flex justify-center flex-col py-4 px-6 mx-auto mt-10 rounded-3xl border-4 border-slate-600 bg-white opacity-90">
        <div className="text-center">
          <p className="text-2xl underline pb-6">Under Maintenace</p>
          <p className=" text-xl">Project can be viewed at:</p>
        </div>
        <div className="flex flex-row pt-8 pb-4 pr-10 gap-9">
        <div className="flex flex-col text-center">
          <h1 className="text-xl pb-2 underline">Figma</h1>
          <a href="https://www.figma.com/file/fUAeNhJwbc2ka73nfguHLy/Your-Fitness-Journey?type=design&node-id=0%3A1&mode=design&t=OiXPJJupINZfrXei-1">
            <Image
              className="m-5"
              src={figma}
              alt="figma file"
              width={250}
              height={150}
            ></Image>
          </a>
          {/* bg-gradient-to-b from-slate-500 */}
        </div>
        <div className="flex flex-col text-center">
          <h1 className="text-xl pb-4 underline">GitHub</h1>
          <a href="https://github.com/ChiaBeaCode/BuildingYourFitnessJourney">
            <AiFillGithub className=" text-8xl"/>
          </a>
          {/* bg-gradient-to-b from-slate-500 */}
        </div>
        </div>
      </section>
    </main>
  );
}
