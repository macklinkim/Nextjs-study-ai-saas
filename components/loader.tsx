import Image from "next/image";
interface LoaderProps {
  text?: string;
}
const Loader = ({text}: LoaderProps) => {
  return (

    <div className="flex flex-col items-center justify-center">
      <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-gray-900">
        <Image alt="loader" fill src="/logo.png" />
      </div>
      <p className="text-muted-foreground text-sm mt-5">
        {text?text:"GPT4는 생각중입니다."}
        </p>
    </div>
  );
}

export default Loader;