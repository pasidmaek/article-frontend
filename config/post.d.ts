declare global {
  type PostProps = {
    title: string
    body: text
  };

  type ArticleProps = {
    created_at: string | number | Date;
    id: string;
    title: string;
    body: string;
    user: {
      id: string;
      name: string;
    };
    craeted_at: string;
    updated_at: string;
  }
}

export { PostProps, ArticleProps };