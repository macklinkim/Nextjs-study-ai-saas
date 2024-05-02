import Image from "next/image";

interface EmptyProps {
  label: string;
}
const Empty = ({
  label
}: EmptyProps) => {
  return (<div className="h-full py-5 flex flex-col items-center justify-center">
    <div className="relative h-72 w-72">
      <Image alt="Empty" fill src="/empty.png" />
    </div>
    <p className="text-muted-foreground text-sm text-center ">{label}</p><p className="text-sm"></p>
  </div>);
}

export default Empty;