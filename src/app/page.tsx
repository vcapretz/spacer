import Image from "next/image";
import Link from "next/link";

async function getData() {
  const latestResponse = await fetch(
    "https://api.spacexdata.com/v5/launches/latest"
  );
  const nextResponse = await fetch(
    "https://api.spacexdata.com/v5/launches/next"
  );

  if (!latestResponse.ok || !nextResponse.ok) {
    throw new Error("Erro ao carregar dados");
  }

  return {
    latest: await latestResponse.json(),
    next: await nextResponse.json(),
  };
}

export default async function Home() {
  const { latest, next } = await getData();

  return (
    <div className="min-h-screen bg-neutral-900 text-white w-full">
      <main className="flex flex-col gap-6 max-w-7xl p-8 mx-auto">
        <h1 className="text-white text-2xl font-semibold">
          Lançamentos SpaceX
        </h1>

        <div>
          <h2 className="text-white text-xl">Último</h2>

          <div className="mt-4 p-6 rounded border border-gray-500 flex gap-4 items-center">
            <Image
              style={{ width: 60 }}
              src={latest.links.patch.small}
              alt="Patch image"
              width={200}
              height={236}
            />

            <div className="flex flex-col">
              <span className="text-gray-300 text-sm">Nome</span>
              <span className="font-semibold">{latest.name}</span>
            </div>

            <div className="flex flex-col">
              <span className="text-gray-300 text-sm">Vôo</span>
              <span className="font-semibold">#{latest.flight_number}</span>
            </div>

            <div className="flex flex-col">
              <span className="text-gray-300 text-sm">Sucesso</span>
              <span className="font-semibold">
                {latest.success ? "✅" : "🔥"}
              </span>
            </div>

            <div className="flex flex-col">
              <span className="text-gray-300 text-sm">Data</span>
              <span className="font-semibold">
                {new Date(latest.date_utc).toLocaleDateString()}
              </span>
            </div>

            <div className="flex-1 flex justify-end">
              <Link
                className="text-indigo-400 hover:underline hover:text-indigo-200"
                href={`/launch/${latest.id}`}
              >
                Ver detalhes {">"}
              </Link>
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-white text-xl">Próximo</h2>

          <div className="mt-4 p-6 rounded border border-gray-500 flex gap-4 items-center">
            <div className="flex flex-col">
              <span className="text-gray-300 text-sm">Nome</span>
              <span className="font-semibold">{next.name}</span>
            </div>

            <div className="flex flex-col">
              <span className="text-gray-300 text-sm">Vôo</span>
              <span className="font-semibold">#{next.flight_number}</span>
            </div>

            <div className="flex flex-col">
              <span className="text-gray-300 text-sm">Cápsula reutilizada</span>
              <span className="font-semibold">
                {next.fairings.reused ? "✅" : "❌"}
              </span>
            </div>

            <div className="flex flex-col">
              <span className="text-gray-300 text-sm">Data</span>
              <span className="font-semibold">
                {new Date(next.date_utc).toLocaleDateString()}
              </span>
            </div>

            <div className="flex-1 flex justify-end">
              <Link
                target="_blank"
                className="text-indigo-400 hover:underline hover:text-indigo-200"
                href={next.links.webcast}
              >
                Assistir lançamento {">"}
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
