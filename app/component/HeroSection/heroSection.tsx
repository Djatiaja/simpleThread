'use client'
import Link from "next/link"
import PostCard from "../postCard/postCard"
import { use, useEffect } from "react";

export const revalidate = 60;

interface Post{
    blogs_id : number;
    title: string;
    img_url: string;
    img_alt: string;
    content: string;
    category: string;
    date_posted: string;
} 

export default async function HeroSection() {
    
    let posts:Post[]= await fetch('https://jsonplaceholder.typicode.com/posts').then(res => 
        res.json());

    return (
<div className="flex flex-row pt-5 px-10 justify-center pb-10 w-1000 h-fit flex-wrap ">
    <PostCard
        title='My first blog'
        content='This is my first blog post'
        img={{src: 'https://placehold.co/384x256?text=Hello+World', alt: 'image'}}
        href={`/blogs/`}
        category='Tech'
        date='2022-01-01'
      />

      {
        posts.map((post, index) => (
            <PostCard
                key={post.blogs_id}
                title={post.title}
                content={post.content}
                img={{src: 'https://placehold.co/384x256?text=Hello+World', alt: 'image'}}
                href={`/blogs/${index + 2}`}
                category={post.category}
                date={post.date_posted}
            />
            ))
      }

      <div className="flex-col h-96 w-72 bg-slate-400 rounded-lg">
        <Link href={'/blogs'} className='flex justify-center items-center h-72 w-full text-9xl' >
        +
        </Link>
        <div className='flex w-full justify-center items-center text-3xl'>
          Add new blogs
        </div>
      </div>
</div>

    );
}