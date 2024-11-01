export default function Card({
  key,
  title,
  content,
}: {
  key: number;
  title: string;
  content: string;
}) {
  return (
    <div
      key={key}
      className="rounded-lg outline outline-gray-100 bg-white p-6 shadow-md"
    >
      <h2 className="mb-4 text-xl font-semibold">{title}</h2>
      <p className="text-gray-600 text-ellipsis overflow-hidden line-clamp-2">
        {content.slice(0, 150)}
      </p>
    </div>
  );
}
