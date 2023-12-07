export default function HeaderTitle({ title }: { title: string }){
    return (
        <span className="flex justify-center p-4 text-3xl bg-cloudy-overcast ">
        {/* <h1 className="py-1 text-center text-white leading-relaxed w-6/12 after:m-auto after:h-1 after:rounded after:bg-misty-100 after:block">
          {title}
        </h1> */}
        {/* <h1 className=" text-center text-2xl mb-8 after:w-4/5 after:m-auto after:h-2 after:rounded after:bg-themeBlue-300 after:block">
          Create Account
        </h1> */}
                <h1 className=" text-xl text-center after:w-full after:m-auto after:h-1 after:rounded after:bg-themeBlue-300 after:block"> {title}</h1>
      </span>
    )
}