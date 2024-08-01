declare global {
  type UserProps = {
    email: string;
    password: string;
    name?: string | null;
  };
}

export {UserLogin};