import { FC, ReactNode } from "react";
import Markdown from "react-markdown";

interface RenderMarkdownProps {
  content: string;
}

interface ComponentProps {
  children: ReactNode;
}

export const RenderMarkDown: FC<RenderMarkdownProps> = ({ content }) => {
  const P: FC<ComponentProps> = ({ children }) => <p className="text-dark-navy">{children}</p>;
  const Header: FC<ComponentProps> = ({ children }) => <h3 className="text-dark-navy font-bold text-lg">{children}</h3>;
  const Link: FC<ComponentProps> = ({ children }) => <a className="text-royal-blue cursor-pointer hover:underline underline-offset-2">{children}</a>;
  return (
    <Markdown
      components={{
        p({ children, ...props }) {
          return <P {...props}>{children}</P>;
        },
        h1({ children, ...props }) {
          return <Header {...props}>{children}</Header>;
        },
        h2({ children, ...props }) {
          return <Header {...props}>{children}</Header>;
        },
        h3({ children, ...props }) {
          return <Header {...props}>{children}</Header>;
        },
        h4({ children, ...props }) {
          return <Header {...props}>{children}</Header>;
        },
        h5({ children, ...props }) {
          return <Header {...props}>{children}</Header>;
        },
        h6({ children, ...props }) {
          return <Header {...props}>{children}</Header>;
        },
        a({ children, ...props }) {
          return <Link {...props}>{children}</Link>;
        },
      }}
    >
      {content}
    </Markdown>
  );
};
