import Link from "next/link";

export default function NotFound() {
  return (
    <main className="container-page flex min-h-[65vh] items-center justify-center py-16">
      <div className="card w-full max-w-xl text-center">
        <p className="text-sm font-bold uppercase tracking-wider text-heritage">404</p>
        <h1 className="mt-3 text-4xl font-black">Trang không tồn tại</h1>
        <p className="mt-4 text-stone-600">
          Đường dẫn bạn truy cập không tồn tại hoặc nội dung đã được thay đổi.
        </p>
        <div className="mt-7 flex justify-center gap-3">
          <Link href="/" className="primary">Về trang chủ</Link>
          <Link href="/di-tich" className="secondary">Xem di tích</Link>
        </div>
      </div>
    </main>
  );
}
