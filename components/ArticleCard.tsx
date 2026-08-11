export function ArticleCard({
  article,
}: {
  article: { category: string; title: string; summary: string; href: string };
}) {
  return (
    <article className="border-t border-border pt-5">
      <p className="eyebrow">{article.category}</p>
      <h3 className="mt-4 font-serif text-h3 font-medium">
        <a className="text-link" href={article.href} target="_blank" rel="noreferrer">
          {article.title}
        </a>
      </h3>
      <p className="mt-3 text-secondary">{article.summary}</p>
    </article>
  );
}
