export default function Header({ user }: { user: string }) {
  return (
    <header className="w-full bg-gray-100 p-4 flex justify-between items-center shadow-sm">
      <h1 className="text-2xl font-bold">Home</h1>
      <p className="text-gray-600">Welcome, <span className="font-semibold">{user}</span></p>
    </header>
  );
}
