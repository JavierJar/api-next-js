import { NextResponse } from "next/server";

type Todo = { id: number; title: string; done: boolean };

// Estado en memoria (solo dev/demo)
let TODOS: Todo[] = [
  { id: 1, title: "Aprender Next.js", done: false },
  { id: 2, title: "Crear API", done: true },
];

export async function GET() {
  return NextResponse.json(TODOS);
}

export async function POST(req: Request) {
  try {
    const body = await req.json() as Partial<Todo>;
    if (!body.title || typeof body.title !== "string") {
      return NextResponse.json({ error: "title requerido" }, { status: 400 });
    }
    const newTodo: Todo = {
      id: TODOS.length ? Math.max(...TODOS.map(t => t.id)) + 1 : 1,
      title: body.title.trim(),
      done: Boolean(body.done),
    };
    TODOS.push(newTodo);
    return NextResponse.json(newTodo, { status: 201 });
  } catch {
    return NextResponse.json({ error: "JSON inválido" }, { status: 400 });
  }
}
