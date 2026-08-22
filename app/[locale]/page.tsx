import { redirect } from 'next/navigation';

interface PageProps {
  params: {
    locale: string;
  };
}

export default async function Page({ params: { locale } }: PageProps) {
  redirect(`/${locale}/dashboard`);
}
