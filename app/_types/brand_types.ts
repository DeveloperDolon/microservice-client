export type BrandType<T> = {
  id?: string;
  name: string;
  banner: T;
  logo: T;
  title: string;
  description: string;
  location: string;
};
