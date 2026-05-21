import { Link, useParams } from "react-router";
import { FaHeart, FaRegComment, FaArrowLeft, FaRegHeart, FaRegBookmark, FaPaperPlane } from "react-icons/fa";
import useFetch from "../hooks/useFetch";
import Bottoms from "../components/Bottoms";

function formatDate(iso) {
  if (!iso) return "";
  return new Date(iso).toLocaleDateString("es-MX", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

const Posts = () => {
  const { postId } = useParams();
  const url = postId ? `http://localhost:8000/posts/${postId}` : null;
  const { data, loading, error } = useFetch(url);

  if (loading) {
    return (
      <PageShell>
        <p className="py-20 text-center text-gray-500">Cargando publicación…</p>
      </PageShell>
    );
  }

  if (error) {
    return (
      <PageShell>
        <p className="py-20 text-center text-red-500">
          No se pudo cargar el post ({error})
        </p>
      </PageShell>
    );
  }

  if (!data) return null;

  const likesCount = data.likes?.length ?? 0;
  const commentsCount = data.comments?.length ?? 0;

  return (
    <PageShell userId={data.user_id}>
      <header className="sticky top-0 z-40 border-b border-gray-100 bg-white shadow-sm">
        <div className="mx-auto flex max-w-lg items-center gap-4 px-4 py-3">
          <Link
            to={`/profile/${data.user_id}`}
            className="text-black transition hover:text-gray-600"
          >
            <FaArrowLeft className="text-xl"/>
          </Link>
          <h1 className="text-xl font-bold text-black">Publicación</h1>
        </div>
      </header>

      <main className="mx-auto max-w-lg bg-white pt-1 pb-28">
        <article className="overflow-hidden bg-white">
          <div className="flex items-center gap-3 px-4 py-3 border-b border-gray-100">
            <Link to={`/profile/${data.user_id}`} className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 text-lg font-bold border border-gray-200 shadow-inner">
                {String(data.user_id).slice(0, 1).toUpperCase()}
            </Link>
            <div>
              <Link to={`/profile/${data.user_id}`} className="text-sm font-semibold text-black hover:underline">
                Usuario {String(data.user_id).slice(0, 8)}…
              </Link>
              <p className="text-xs text-gray-500">
                {formatDate(data.created_at)}
              </p>
            </div>
          </div>

          <div className="px-5 py-5 border-b border-gray-100">
            <p className="text-base leading-relaxed text-black">
                <Link to={`/profile/${data.user_id}`} className="font-semibold text-black mr-1.5 hover:underline">
                    Usuario {String(data.user_id).slice(0, 8)}…
                </Link>
              {data.description}
            </p>
          </div>

          <div className="flex items-center justify-between px-5 py-3 border-b border-gray-100">
            <div className="flex items-center gap-4 text-2xl text-black">
                <FaRegHeart className="cursor-pointer hover:text-red-500 transition" />
                <FaRegComment className="cursor-pointer hover:text-gray-600 transition" />
                <FaPaperPlane className="text-xl cursor-pointer hover:text-gray-600 transition" />
            </div>
            <FaRegBookmark className="text-2xl cursor-pointer hover:text-gray-600 transition" />
          </div>

          <div className="px-5 py-3 text-sm text-black border-b border-gray-100">
            <p className="font-semibold">
              {likesCount} {likesCount === 1 ? "like" : "likes"}
            </p>
            <p className="text-gray-600 mt-1">
              Ver los {commentsCount} {commentsCount === 1 ? "comentario" : "comentarios"}
            </p>
          </div>

          {likesCount > 0 && (
            <section className="px-5 py-4 border-b border-gray-100">
              <h2 className="mb-4 text-sm font-semibold text-black">A {likesCount} personas les gusta esto</h2>
              <ul className="space-y-2">
                {data.likes.slice(0, 3).map((like) => (
                  <li
                    key={`${like.user_id}-${like.created_at}`}
                    className="flex items-center gap-2 text-sm text-black"
                  >
                    <div className="h-6 w-6 rounded-full bg-gray-100 border border-gray-200 shadow-inner flex items-center justify-center text-xs font-bold">
                        {String(like.user_id).slice(0, 1).toUpperCase()}
                    </div>
                    <span className="font-semibold">
                      Usuario {String(like.user_id).slice(0, 8)}…
                    </span>
                    <span className="text-xs text-gray-500 ml-auto">
                        {formatDate(like.created_at)}
                    </span>
                  </li>
                ))}
                {likesCount > 3 && <p className="text-xs text-gray-500 pt-1">...y {likesCount - 3} más</p>}
              </ul>
            </section>
          )}

          <section className="px-5 py-5 pb-8">
            <h2 className="mb-5 text-sm font-semibold text-black">
              Comentarios
            </h2>
            {commentsCount === 0 ? (
              <p className="rounded-xl bg-gray-50 px-4 py-8 text-center text-sm text-gray-500 border border-gray-100 shadow-inner">
                Aún no hay comentarios. Sé el primero.
              </p>
            ) : (
              <ul className="space-y-4">
                {data.comments.map((comment) => (
                  <li
                    key={comment.id}
                    className="flex items-start gap-3"
                  >
                    <div className="h-8 w-8 rounded-full bg-gray-100 border border-gray-200 shadow-inner flex items-center justify-center text-xs font-bold mt-0.5">
                        {String(comment.user_id).slice(0, 1).toUpperCase()}
                    </div>
                    <div className="flex-1">
                        <p className="text-sm text-black">
                            <span className="font-semibold mr-1.5 hover:underline cursor-pointer">
                                Usuario {String(comment.user_id).slice(0, 8)}…
                            </span>
                            {comment.content}
                        </p>
                        <p className="mt-1.5 text-xs text-gray-500">
                          {formatDate(comment.created_at)} · <span className="font-semibold cursor-pointer">Responder</span>
                        </p>
                    </div>
                    <FaRegHeart className="text-xs text-gray-400 mt-1 cursor-pointer hover:text-red-500" />
                  </li>
                ))}
              </ul>
            )}
          </section>
        </article>
      </main>
    </PageShell>
  );
};

function PageShell({ children, userId }) {
  return (
    <div className="min-h-screen bg-white">
      {children}
      <Bottoms userId={userId} />
    </div>
  );
}

export default Posts;