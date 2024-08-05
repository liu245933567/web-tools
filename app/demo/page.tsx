import { getTianqi } from "@/service";

export default async function Demo() {
  const tianqi = await getTianqi();

  return (
    <main>
      <pre>{JSON.stringify(tianqi, null, 2)}</pre>
    </main>
  );
}
