declare global {
  type PostProps = {
    title: string
    body: text
  };

  type ArticleProps = {
    id: string;
    title: string;
    body: string;
    user: {
      id: string;
      name: string;
    };
    updated_at: string;
  }
}

export { PostProps, ArticleProps };