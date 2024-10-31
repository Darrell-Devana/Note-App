export default function Home() {
  return (
    <div className="flex flex-col gap-6 mx-auto">
      <h1 className="font-bold text-3xl">Welcome, Darrell Devana</h1>
      {/* Dashboard content */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="rounded-lg outline outline-gray-100 bg-white p-6 shadow-md">
            <h2 className="mb-4 text-xl font-semibold">Card {i + 1}</h2>
            <p className="text-gray-600">
              This is some placeholder content for the dashboard card.
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
