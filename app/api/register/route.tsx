'use server'
import { PrismaClient, User } from '@prisma/client'
import { NextResponse } from 'next/server';

export async function POST(req:Response) {
    const data = await req.json();
    const prisma = new PrismaClient();

    const email = data.email;
    const prevEmail:User|null  = await prisma.user.findUnique({
        where: {
            Email: email
        }});

    if (prevEmail !== null) {
        return NextResponse.json({
            status: 400,
            body: 'Email sudah terdaftar',
            succes: false
        });
    }
    prisma.user.create({
        data: {
            Name: data.name,
            Email: data.email,
            Password: data.password
        }
    });

    return NextResponse.json({
        status: 200,
        body: 'Akun berhasil dibuat',
        succes: true
    });
}