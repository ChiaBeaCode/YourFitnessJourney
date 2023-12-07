import { BiError } from "react-icons/bi";

type ErrorMessageProps = {
    errorMessage: string;
}

export default function ErrorMessage(props: ErrorMessageProps){
    const {errorMessage} = props
    return (
        <section className="flex justify-start text-sm text-red-600 font-medium bg-red-200 rounded px-2 py-1.5 mb-1 w-fit">
            <BiError className="text-xl mr-1" />{errorMessage}
        </section>
    )
}