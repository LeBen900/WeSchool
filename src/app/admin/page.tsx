import { requireRole } from "@/lib/auth";
import { db } from "@/lib/supabase/server";

const TABLES = [
  "historical_sites",
  "posts",
  "surveys",
  "student_products",
  "likes",
  "votes",
] as const;

export default async function Admin() {
  await requireRole(["admin", "teacher"]);
  const supabase = await db();

  const counts = await Promise.all(
    TABLES.map(async (table) => {
      const { count, error } = await supabase
        .from(table)
        .select("*", { count: "exact", head: true });

      return { table, count: error ? 0 : count ?? 0 };
    })
  );

  return (
    <main className="container-page py-12">
      <h1 className="text-4xl font-black">Admin Dashboard</h1>
      <p className="mt-2 text-stone-600">
        Tổng quan dữ liệu và quản trị nội dung.
      </p>

      <div className="mt-8 grid gap-4 md:grid-cols-3">
        {counts.map((item) => (
          <div className="card" key={item.table}>
            <span className="text-sm text-stone-500">{item.table}</span>
            <b className="mt-2 block text-4xl">{item.count}</b>
          </div>
        ))}
      </div>

      <div className="card mt-8">
        <h2 className="text-xl font-bold">Quản trị nội dung</h2>
        <p className="mt-2 text-stone-600">
          CRUD, kiểm duyệt, khảo sát, Like, bình chọn và người dùng được bảo vệ
          bằng Supabase Auth + RLS.
        </p>
      </div>
    </main>
  );
}
