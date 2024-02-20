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
      }}
    >
      {content}
    </Markdown>
  );
};
