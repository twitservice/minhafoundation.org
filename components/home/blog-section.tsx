import type { Locale } from "@/lib/i18n-config";

interface BlogPost {
  id: string;
  slug: string;
  image: string;
  title: string;
  description: string;
  date: string;
}

export interface BlogSectionDictionary {
  title: string;
  subtitle: string;
  see_more: string;
  posts: BlogPost[];
}

interface BlogSectionProps {
  lang: Locale;
  dictionary: BlogSectionDictionary;
}

function withSlash(path: string) {
  return path.endsWith("/") ? path : `${path}/`;
}

export default function BlogSection({ lang, dictionary }: BlogSectionProps) {
  const { title, subtitle, see_more, posts } = dictionary;

  return (
    <section className="w-full py-16 bg-background-light">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-10">
          <h2 className="text-h2 font-bold text-primary-text">{title}</h2>
          <p className="mt-3 max-w-2xl mx-auto text-secondary-text">
            {subtitle}
          </p>
          <div className="mt-6">
            <a
              href={withSlash(`/${lang}/blogs`)}
              className="inline-flex items-center gap-2 px-8 py-3 bg-primary text-white text-sm font-medium rounded-full hover:brightness-95 transition"
            >
              {see_more} <span aria-hidden="true">&rarr;</span>
            </a>
          </div>
        </div>

        {/* Blog cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {posts.map((post) => (
            <a
              key={post.id}
              href={withSlash(`/${lang}/blogs/${post.slug}`)}
              className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300"
            >
              {/* Image */}
              <div className="relative overflow-hidden">
                <img
                  src={post.image}
                  alt={post.title}
                  loading="lazy"
                  className="w-full h-52 object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>

              {/* Content */}
              <div className="p-5">
                <h3 className="text-lg font-bold text-primary-text leading-snug line-clamp-2">
                  {post.title}
                </h3>
                <p className="mt-2 text-sm text-secondary-text leading-relaxed line-clamp-3">
                  {post.description}
                </p>
                <p className="mt-4 text-sm font-medium text-secondary">
                  {post.date}
                </p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
