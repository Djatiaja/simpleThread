import { ImageProps } from 'next/image';
import Link from 'next/link';

interface PostCardProps {
    title: string;
    content: string;
    img: {src: string, alt: string} ;
    href: string;
    category: string;
    date: string;
}

export default function PostCard(props:PostCardProps) {
    return (
        <>
        <Link href={props.href}>
        <div className='h-96 w-72 mx-5 mb-10 bg-gray-100 content-start '>
            <img className='rounded-xl mb-5' {...props.img} />
            <div className='px-4'>
            <div className='flex flex-row '>
                    <p className='mt-2'>{props.date}</p>
                <div className='p-2 mx-3 bg-gray-200 rounded-2xl'>
                        {props.category}
                </div>
            </div>
            <h2 className='text-lg font-bold my-3 '>{props.title}</h2>
            <p>{props.content}</p>
            </div>
        </div>
        </Link>
        </>
    );
}