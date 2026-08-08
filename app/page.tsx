import { FaNodeJs } from "react-icons/fa"
import HomePage from "./HomePage"

async function getData() {
  const DB_URL = process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL + '/.json';
  const res = await fetch(DB_URL, { cache: 'no-store' }); // This is fine for static
  const data = await res.json();
  return data;
}

export default async function Page() {
  const data = await getData();

  if (!data) {
    return (
      <div className='h-screen w-screen flex flex-col items-center justify-center gap-5 text-violet-600 fixed z-30 bg-gray-100 dark:bg-grey-900'>
        <FaNodeJs size={100} className='animate-pulse' />
        <p className='animate-pulse text-xl'>Data could not be retrieved</p>
      </div>
    );
  }

  return <HomePage data={data} />;
}

