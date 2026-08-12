import type { MDXComponents } from "mdx/types";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h2: (props) => <h2 className="case-heading" {...props} />,
    h3: (props) => <h3 className="case-subheading" {...props} />,
    p: (props) => <p className="case-paragraph" {...props} />,
    ul: (props) => <ul className="case-list" {...props} />,
    ol: (props) => <ol className="case-list case-list-numbered" {...props} />,
    blockquote: (props) => <blockquote className="editorial-quote" {...props} />,
    ...components,
  };
}
