// Home page dictionary type
// Shared between app/[lang]/page.tsx and components/home/*

export interface HomeDictionary {
  title: string;
  description: string;
  banner: {
    bg_image: string;
    title: string;
    subtitle: string;
  };
  heading: string;
}
