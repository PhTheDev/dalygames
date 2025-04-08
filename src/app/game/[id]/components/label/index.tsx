interface LabelProps {
  name: string;
}

export default function Label({ name }: LabelProps) {
  return (
    <div className="flex-grow sm:flex-grow-0 bg-slate-200 text-gray-800 px-3 py-1 rounded-md hover:bg-slate-300 transition-all duration-300">
      <p>{name}</p>
    </div>
  );
}
