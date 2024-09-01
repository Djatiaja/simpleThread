'use client'
import { notFound, useParams  } from 'next/navigation'

export default function Page() {
    const router = useParams();
    if (router.id !== '1') {
        notFound();
    }
    return (
        <div>
        <h1>Blog</h1>
        <p>Welcome to my {router.id} blog!</p>
        </div>
    );
}