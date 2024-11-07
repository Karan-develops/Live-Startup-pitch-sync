declare module "next-auth" {
  interface Session {
    id: string;
  }
  interface jwt {
    id: string;
  }
}
