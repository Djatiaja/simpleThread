'use client'

import { useFormStatus } from "react-dom";
import toast from "react-hot-toast";
import {z} from "zod";


function Button(){
    const status = useFormStatus();
    return (
        <button type="submit" className="self-center mt-5 p-2 bg-white rounded-xl" disabled={status.pending}>Submit</button>
    );
}

const userSchema = z.object({
    id: z.string().uuid().optional(),
    nama: z.string().min(1).max(50),
    email: z.string().email(),
    password: z.string().min(8, {
        message: 'Password minimal 8 karakter',
    }).max(50
        ,{
            message: 'Password maksimal 50 karakter',
        }
    ),
    passwordUlang: z.string().min(8, {
        message: 'Password minimal 8 karakter',
    }).max(50,{
        message: 'Password maksimal 50 karakter',
    }),
});

const checkPassword = z.object({
    password: z.string().min(8).max(50),
    passwordUlang: z.string().min(8).max(50),
}).refine(data => data.password === data.passwordUlang, {
    message: 'Password tidak sama',});

export default function Page() {

    async function addUser(form: FormData) {
        const user = {
            nama: form.get('nama'),
            email: form.get('email'),
            password: form.get('password'),
            passwordUlang: form.get('passwordUlang'),
        }
        console.log(user)

        const password = {
            password: form.get('password'),
            passwordUlang: form.get('passwordUlang'),
        }
        const passwordResult = checkPassword.safeParse(password)
        if (!passwordResult.success) {
            for (const error of passwordResult.error.errors) {
                toast.error(error.message + " password")
            }
            return
        }
        const result = userSchema.safeParse(user)
        if (!result.success) {
            for (const error of result.error.errors) {
                toast.error(error.message + " user")
            }
            return
        }

        const response = await fetch('/api/register', {
            method: 'POST',
            body: JSON.stringify(user)
        })
    }



  return (
    <>
      <div className="flex w-full h-screen justify-center items-center ">
        <div className="flex w-auto h-96 items-center flex-col bg-gray-400 p-10 rounded-xl">
          <h2 className="font-bold text-4xl">Register</h2>
          <form className="mt-10" action={addUser}>
              <tr className="mb-3">
                <td>
                  <label htmlFor="name"> Nama</label>
                </td>
                <td>
                  :
                  <input type="text" id="name" placeholder="Nama"  name="nama" />
                </td>
              </tr>
              <tr className="mb-3">
                <td>
                  <label htmlFor="email" aria-required> Email</label>
                </td>
                <td>
                  :
                  <input type="email" id="email" placeholder="Email"   name="email" />
                </td>
              </tr>
              <tr>
                <td>
                  <label htmlFor="password" > password</label>
                </td>
                <td>
                  :
                  <input type="password" id="password" placeholder="password"  name="password" />
                </td>
              </tr>
              <tr>
                <td>
                  <label htmlFor="password" > password ulang</label>
                </td>
                <td>
                  :
                  <input
                    type="password"
                    name="passwordUlang"
                    id="passwordUlang"
                    placeholder="password ulang"
                    
                    
                  />
                </td>
              </tr>
          <Button />
          </form>
        </div>
      </div>
    </>
  );
}