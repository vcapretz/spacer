import Image from "next/image";
import Link from "next/link";

async function getData(id: string) {
  const launchResponse = await fetch(
    `https://api.spacexdata.com/v5/launches/${id}`
  );

  if (!launchResponse.ok) {
    throw new Error("Erro ao carregar dados");
  }

  const launch = await launchResponse.json();

  const { crew } = launch;
  const crewResponse = [];

  for (const crewMember of crew) {
    const response = await fetch(
      `https://api.spacexdata.com/v4/crew/${crewMember.crew}`
    );
    const data = await response.json();
    crewResponse.push({ ...data, role: crewMember.role });
  }

  const rocketResponse = await fetch(
    `https://api.spacexdata.com/v4/rockets/${launch.rocket}`
  );

  return {
    launch,
    crew: crewResponse,
    rocket: await rocketResponse.json(),
  };
}

export default async function LaunchPage({
  params,
}: {
  params: { launchId: string };
}) {
  const { launch, crew, rocket } = await getData(params.launchId);

  return (
    <div className="min-h-screen bg-neutral-900 text-white w-full">
      <main className="flex flex-col gap-6 max-w-7xl p-8 mx-auto">
        <Link
          href="/"
          className="text-indigo-400 hover:underline hover:text-indigo-200"
        >
          Início
        </Link>
        <h1 className="text-white text-2xl font-semibold">{launch.name}</h1>

        <div className="grid grid-cols-2">
          <div>
            <h2 className="text-white text-xl mb-6">Membros</h2>
            {crew.map((crewMember) => (
              <div key={crewMember.id} className="flex py-4 gap-4">
                <Image
                  alt={crewMember.name}
                  src={crewMember.image}
                  width={80}
                  height={80}
                />

                <div className="flex flex-col gap-2">
                  <span className="font-semibold text-lg">
                    {crewMember.name}
                  </span>
                  <span>Agência: {crewMember.agency}</span>
                  <span>Posição: {crewMember.role}</span>
                </div>
              </div>
            ))}
          </div>

          <div>
            <h2 className="text-white text-xl mb-6">Foguete</h2>

            <p className="font-semibold text-lg">
              {rocket.name} | {rocket.stages} estágios
            </p>

            <p>
              Custo:{" "}
              {new Intl.NumberFormat(undefined, {
                style: "currency",
                currency: "USD",
              }).format(rocket.cost_per_launch / 100)}{" "}
              dólares
            </p>

            {rocket.flickr_images[0] && (
              <Image
                alt={rocket.name}
                src={rocket.flickr_images[0]}
                width={400}
                height={400}
              />
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
