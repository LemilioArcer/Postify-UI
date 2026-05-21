import { Link, useParams } from "react-router";
import { FaBars, FaChevronDown } from "react-icons/fa";
import useFetch from "../hooks/useFetch";
import Bottoms from "../components/Bottoms";

const Profile = () => {
  const { userId } = useParams();

  const { data: posts, loading, error } = useFetch(
    userId ? `http://localhost:8000/users/${userId}/posts` : null
  );

  return (
    <div className="min-h-screen bg-white text-black">
      
      <header className="sticky top-0 bg-white border-b border-gray-200 px-4 py-2 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h1 className="text-xl font-bold">Arcelinho</h1>
          <FaChevronDown className="text-xs text-gray-500" />
        </div>
        <FaBars className="text-2xl cursor-pointer" />
      </header>

      <main className="mx-auto max-w-lg pt-6 pb-20">
        
        <div className="px-4 mb-6 flex items-center justify-between gap-6">
          <div className="h-20 w-20 rounded-full bg-gray-200 flex items-center justify-center text-2xl font-bold">
            A
          </div>
          
          <div className="flex-1 flex justify-around text-center">
            <div>
              <p className="text-lg font-bold">{posts?.length || 0}</p>
              <p className="text-xs text-gray-500">Publics.</p>
            </div>
            <div>
              <p className="text-lg font-bold">67k</p>
              <p className="text-xs text-gray-500">Seguidores</p>
            </div>
            <div>
              <p className="text-lg font-bold">3</p>
              <p className="text-xs text-gray-500">Seguidos</p>
            </div>
          </div>
        </div>

        <div className="px-5 mb-6">
          <h2 className="font-bold text-sm">Arcelinho</h2>
          <p className="text-sm text-gray-600 mt-1">
            si lees esto me debes un punto extra
          </p>
        </div>

        <div className="px-4 mb-6 flex gap-2">
          <button className="flex-1 bg-gray-100 py-2 rounded-lg text-sm font-semibold">Editar perfil</button>
          <button className="flex-1 bg-gray-100 py-2 rounded-lg text-sm font-semibold">Compartir</button>
        </div>

        <div className="border-t border-gray-200 pt-3">
          {loading && <p className="text-center text-gray-500">Cargando...</p>}
          {error && <p className="text-center text-red-500">Error al cargar posts</p>}
          
          <ul className="grid grid-cols-3 gap-1">
            {posts?.map((post) => (
              <li key={post.id} className="aspect-square bg-gray-100 border border-gray-200 p-2 overflow-hidden">
                <Link to={`/posts/${post.id}`} className="w-full h-full block text-xs text-gray-800">
                  {post.description}
                </Link>
              </li>
            ))}
          </ul>
        </div>

      </main>

      <Bottoms userId={userId} />
    </div>
  );
};

export default Profile;