import Link from "next/link";
import { SETS } from "@/lib/data"; // <-- agora certo

export default function QuizListPage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Todos os Quizzes</h1>
      <ul className="space-y-4">
        {SETS.map((quiz) => (
          <li key={quiz.id} className="bg-white dark:bg-gray-800 p-4 rounded shadow">
            <h2 className="text-xl font-semibold">{quiz.title}</h2>
            {quiz.description && (
              <p className="text-gray-600 dark:text-gray-300">{quiz.description}</p>
            )}
            <Link
              href={`/sets/${quiz.id}`}
              className="inline-block mt-2 px-4 py-2 rounded bg-blue-500 text-white hover:bg-blue-600"
            >
              Estudar
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
