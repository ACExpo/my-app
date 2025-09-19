"use client";

import { useState, useRef } from "react";
import { Camera, Trash2, FileText } from "lucide-react";

export default function ProfilePage() {
  // Mock inicial
  const [user, setUser] = useState({
    name: "John Doe",
    nickname: "jdoe",
    email: "jdoe@example.com",
    motto: "Keep learning, keep growing 🚀",
    bio: "Software developer passionate about building learning platforms.",
    avatar: "",
    banner: "",
    badge: "Pro User",
    stats: {
      quizzes: 12,
      flashcards: 340,
      followers: 128,
    },
    socials: {
      github: "https://github.com/johndoe",
      linkedin: "https://linkedin.com/in/johndoe",
      twitter: "https://twitter.com/johndoe",
      cv: "/cv/john-doe-cv.pdf", // ✅ novo campo para CV/Resume
    },
    themeColor: "#3b82f6", // cor personalizada
  });

  const [isEditing, setIsEditing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const bannerInputRef = useRef<HTMLInputElement | null>(null);

  // Atualizar estado dos inputs (nível raiz)
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  };

  // Upload avatar
  const handleAvatarClick = () => fileInputRef.current?.click();
  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () =>
        setUser((prev) => ({ ...prev, avatar: reader.result as string }));
      reader.readAsDataURL(file);
    }
  };

  // Remover avatar
  const handleRemoveAvatar = () => {
    setUser((prev) => ({ ...prev, avatar: "" }));
  };

  // Upload banner
  const handleBannerClick = () => bannerInputRef.current?.click();
  const handleBannerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () =>
        setUser((prev) => ({ ...prev, banner: reader.result as string }));
      reader.readAsDataURL(file);
    }
  };

  // Validação
  const isValidEmail = (email: string) => /\S+@\S+\.\S+/.test(email);

  // Salvar perfil
  const handleSave = () => {
    if (!isValidEmail(user.email)) {
      alert("Digite um email válido.");
      return;
    }
    setIsEditing(false);
    alert("Perfil salvo com sucesso ✅ (mock)");
  };

  return (
    <div className="p-6 space-y-6">
      {/* Cover / Banner (altura ajustada + responsivo) */}
      <div
        className="relative h-48 md:h-56 rounded-lg overflow-hidden bg-gray-300 dark:bg-gray-700 cursor-pointer group"
        onClick={handleBannerClick}
      >
        {user.banner && (
          <img
            src={user.banner}
            alt="Banner"
            className="w-full h-full object-cover"
          />
        )}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition">
          <Camera className="text-white" size={28} />
        </div>
        <input
          type="file"
          accept="image/*"
          ref={bannerInputRef}
          onChange={handleBannerChange}
          className="hidden"
        />
      </div>

      {/* Avatar + Info (tamanhos e offset ajustados) */}
      <div className="flex items-center gap-6 -mt-14 md:-mt-16 px-4">
        {/* Avatar */}
        <div
          className="relative w-28 h-28 md:w-32 md:h-32 rounded-full overflow-hidden group cursor-pointer border-4 border-white dark:border-gray-900 shadow"
          onClick={handleAvatarClick}
        >
          {user.avatar ? (
            <img
              src={user.avatar}
              alt="Avatar"
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-gray-400 flex items-center justify-center text-white text-2xl">
              +
            </div>
          )}

          {/* Overlay */}
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center gap-3 transition">
            <Camera className="text-white" size={22} />
            {user.avatar && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleRemoveAvatar();
                }}
              >
                <Trash2 className="text-red-400" size={22} />
              </button>
            )}
          </div>
        </div>
        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          onChange={handleAvatarChange}
          className="hidden"
        />

        {/* Info */}
        <div>
          {isEditing ? (
            <>
              <input
                type="text"
                name="name"
                value={user.name}
                onChange={handleChange}
                className="text-3xl font-bold bg-gray-100 dark:bg-gray-700 rounded px-2 py-1"
              />
              <input
                type="text"
                name="nickname"
                value={user.nickname}
                onChange={handleChange}
                className="text-gray-500 dark:text-gray-400 block mt-1 bg-gray-100 dark:bg-gray-700 rounded px-2 py-1"
              />
            </>
          ) : (
            <>
              <h1 className="text-3xl font-bold">{user.name}</h1>
              <p className="text-gray-500 dark:text-gray-400">@{user.nickname}</p>
            </>
          )}
          <span className="text-xs bg-yellow-300 text-black px-2 py-0.5 rounded mt-1 inline-block">
            {user.badge}
          </span>
        </div>
      </div>

      {/* Motto */}
      <div className="px-4">
        {isEditing ? (
          <input
            type="text"
            name="motto"
            value={user.motto}
            onChange={handleChange}
            className="text-sm bg-gray-100 dark:bg-gray-700 rounded px-2 py-1 w-full"
          />
        ) : (
          <p className="text-sm text-gray-600 dark:text-gray-300">
            {user.motto}
          </p>
        )}
      </div>

      {/* Bio */}
      <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-2">About</h2>
        {isEditing ? (
          <textarea
            name="bio"
            value={user.bio}
            onChange={handleChange}
            rows={4}
            className="w-full bg-gray-100 dark:bg-gray-700 rounded px-2 py-1"
          />
        ) : (
          <p className="text-gray-700 dark:text-gray-300">{user.bio}</p>
        )}
      </div>

      {/* Email */}
      <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-2">Contact</h2>
        {isEditing ? (
          <input
            type="email"
            name="email"
            value={user.email}
            onChange={handleChange}
            className="w-full bg-gray-100 dark:bg-gray-700 rounded px-2 py-1"
          />
        ) : (
          <p className="text-gray-700 dark:text-gray-300">📧 {user.email}</p>
        )}
      </div>

      {/* Estatísticas */}
      <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6 grid grid-cols-3 text-center">
        <div>
          <p className="text-2xl font-bold">{user.stats.quizzes}</p>
          <p className="text-sm text-gray-500">Quizzes</p>
        </div>
        <div>
          <p className="text-2xl font-bold">{user.stats.flashcards}</p>
          <p className="text-sm text-gray-500">Flashcards</p>
        </div>
        <div>
          <p className="text-2xl font-bold">{user.stats.followers}</p>
          <p className="text-sm text-gray-500">Followers</p>
        </div>
      </div>

      {/* Links sociais + CV */}
      <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6 space-y-2">
        <h2 className="text-xl font-semibold mb-2">Social Links & CV</h2>

        {/* GitHub */}
        {isEditing ? (
          <input
            type="url"
            placeholder="GitHub URL"
            value={user.socials.github}
            onChange={(e) =>
              setUser((prev) => ({
                ...prev,
                socials: { ...prev.socials, github: e.target.value },
              }))
            }
            className="w-full bg-gray-100 dark:bg-gray-700 rounded px-2 py-1"
          />
        ) : (
          user.socials.github && (
            <a
              href={user.socials.github}
              target="_blank"
              className="block text-blue-500 hover:underline"
            >
              GitHub: {user.socials.github}
            </a>
          )
        )}

        {/* LinkedIn */}
        {isEditing ? (
          <input
            type="url"
            placeholder="LinkedIn URL"
            value={user.socials.linkedin}
            onChange={(e) =>
              setUser((prev) => ({
                ...prev,
                socials: { ...prev.socials, linkedin: e.target.value },
              }))
            }
            className="w-full bg-gray-100 dark:bg-gray-700 rounded px-2 py-1"
          />
        ) : (
          user.socials.linkedin && (
            <a
              href={user.socials.linkedin}
              target="_blank"
              className="block text-blue-500 hover:underline"
            >
              LinkedIn: {user.socials.linkedin}
            </a>
          )
        )}

        {/* Twitter */}
        {isEditing ? (
          <input
            type="url"
            placeholder="Twitter URL"
            value={user.socials.twitter}
            onChange={(e) =>
              setUser((prev) => ({
                ...prev,
                socials: { ...prev.socials, twitter: e.target.value },
              }))
            }
            className="w-full bg-gray-100 dark:bg-gray-700 rounded px-2 py-1"
          />
        ) : (
          user.socials.twitter && (
            <a
              href={user.socials.twitter}
              target="_blank"
              className="block text-blue-500 hover:underline"
            >
              Twitter: {user.socials.twitter}
            </a>
          )
        )}

        {/* CV (novo) */}
        {isEditing ? (
          <input
            type="url"
            placeholder="Link do seu CV (PDF)"
            value={user.socials.cv}
            onChange={(e) =>
              setUser((prev) => ({
                ...prev,
                socials: { ...prev.socials, cv: e.target.value },
              }))
            }
            className="w-full bg-gray-100 dark:bg-gray-700 rounded px-2 py-1"
          />
        ) : (
          user.socials.cv && (
            <a
              href={user.socials.cv}
              target="_blank"
              className="inline-flex items-center gap-2 text-green-500 hover:underline"
            >
              <FileText size={16} /> Download CV
            </a>
          )
        )}
      </div>

      {/* Tema personalizado */}
      <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-2">Theme</h2>
        {isEditing ? (
          <input
            type="color"
            value={user.themeColor}
            onChange={(e) =>
              setUser((prev) => ({ ...prev, themeColor: e.target.value }))
            }
          />
        ) : (
          <div
            className="w-10 h-10 rounded-full border"
            style={{ backgroundColor: user.themeColor }}
          />
        )}
      </div>

      {/* Botões */}
      <div className="flex gap-4">
        {isEditing ? (
          <>
            <button
              onClick={handleSave}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Save
            </button>
            <button
              onClick={() => setIsEditing(false)}
              className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500"
            >
              Cancel
            </button>
          </>
        ) : (
          <button
            onClick={() => setIsEditing(true)}
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          >
            Edit Profile
          </button>
        )}
      </div>
    </div>
  );
}
