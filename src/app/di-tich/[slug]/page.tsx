import Link from "next/link";
import { notFound } from "next/navigation";
import { db } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

type Props = {
  params: Promise<{ slug: string }>;
};

export default async function SiteDetailPage({ params }: Props) {
  const { slug } = await params;
  const supabase = await db();

  const { data: site, error } = await supabase
    .from("historical_sites")
    .select("*")
    .eq("slug", slug)
    .eq("status", "approved")
    .maybeSingle();

  if (error || !site) {
    notFound();
  }

  const { data: images } = await supabase
    .from("site_images")
    .select("*")
    .eq("site_id", site.id)
    .order("sort_order", { ascending: true });

  return (
    <main className="container-page py-10">
      <Link href="/di-tich" className="text-sm font-semibold text-heritage">
        ← Quay lại danh sách di tích
      </Link>

      <article className="mt-6 overflow-hidden rounded-3xl border border-stone-200 bg-white shadow-sm">
        {images?.[0]?.file_url ? (
          <img
            src={images[0].file_url}
            alt={images[0].alt_text || site.name}
            className="h-72 w-full object-cover md:h-96"
          />
        ) : (
          <div className="grid h-72 place-items-center bg-stone-100 text-stone-400 md:h-96">
            Chưa có hình ảnh
          </div>
        )}

        <div className="p-6 md:p-10">
          <p className="text-sm font-bold uppercase tracking-wider text-heritage">
            Di tích lịch sử
          </p>
          <h1 className="mt-2 text-3xl font-black md:text-5xl">{site.name}</h1>

          {site.address && (
            <p className="mt-4 text-stone-600">📍 {site.address}</p>
          )}

          {site.description && (
            <section className="mt-8">
              <h2 className="text-2xl font-bold">Giới thiệu</h2>
              <p className="mt-3 whitespace-pre-line leading-8 text-stone-700">
                {site.description}
              </p>
            </section>
          )}

          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <Info label="Thời kỳ hình thành" value={site.formation_period} />
            <Info label="Giá trị lịch sử" value={site.historical_value} />
            <Info label="Giá trị văn hóa" value={site.cultural_value} />
          </div>

          {site.map_url && (
            <a
              href={site.map_url}
              target="_blank"
              rel="noreferrer"
              className="primary mt-8 inline-flex"
            >
              Xem vị trí trên bản đồ
            </a>
          )}
        </div>
      </article>
    </main>
  );
}

function Info({ label, value }: { label: string; value?: string | null }) {
  return (
    <div className="rounded-2xl bg-stone-50 p-5">
      <p className="text-sm text-stone-500">{label}</p>
      <p className="mt-2 font-semibold text-stone-800">{value || "Chưa cập nhật"}</p>
    </div>
  );
}
