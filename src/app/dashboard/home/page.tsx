import { getAllUsers } from "./actions";

export default async function Home() {
  const users = await getAllUsers();

  return (
    <main>
      Dashboard Home!
      <div>
        <h2>Users</h2>
        <ul>
          { users.map((user) => (
            <li key={ user.id }>{ user.firstName }</li>
          )) }
        </ul>
      </div>
    </main>
  );
}
