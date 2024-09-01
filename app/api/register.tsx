'use server'
import { PrismaClient } from '@prisma/client'
import { redirect } from 'next/navigation';
import { NextRequest, NextResponse } from 'next/server';
import bycrypt from "bcryptjs";

export default async function register(params:FormData) {
    const name = params.get("name")?.toString();
    const password = params.get("password")?.toString();
    const emailPost = params.get("email");
    const database = new PrismaClient();

    if (params.get('password') !== params.get('password ulang')) {
        return NextResponse.json({
            status: 400,
            body: 'Password tidak sama'
        });
    }
    
    if (emailPost === null|| emailPost === undefined || emailPost === '') {
        return NextResponse.json({
            status: 400,
            body: 'Email tidak boleh kosong'
        });
    }

    if (params.get('password') === null || password === undefined || password.length < 8) {
        return NextResponse.json({
            status: 400,
            body: 'Password minimal 8 karakter'
        });
    }

    const preEmail = await database.user.findUnique({
        where: {
            Email: emailPost?.toString()
        }
    });

    if (preEmail === null) {
        return NextResponse.json({
            status: 400,
            body: 'Email sudah terdaftar'
        });
    }
    const salt = await bycrypt.genSalt(10);
    const hashPassword = await bycrypt.hash(password, salt);


    await database.user.create({
        data: {
            Name: name || '',
            Email: emailPost.toString(),
            Password: hashPassword
        }
    });

    ;
    return NextResponse.json({
        status: 200,
        message: 'success',
        body: 'Berhasil register',
        success: true
    })
}