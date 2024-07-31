import { createUser, getTianqi, getUsers } from "@/service";

export default async function Demo() {
  const tianqi = await getTianqi();
  const users = await getUsers();

  // async function create() {
  //   createUser({
  //     name: "123",
  //     email: "245933567@qq.com",
  //   });
  // }

  return (
    <main>
      <pre>{JSON.stringify(users, null, 2)}</pre>
      <pre>{JSON.stringify(tianqi, null, 2)}</pre>
      {/* <button
        onClick={async () => {
          create();
        }}
      >
        123
      </button> */}
    </main>
  );
}
