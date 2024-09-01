import Link from "next/link";
export default function Page() {
    return (
      <>
        <div className="flex w-full h-screen justify-center items-center ">
          <div className="flex w-96 h-96 items-center flex-col bg-gray-400 p-10 rounded-xl">
            <h2 className="font-bold text-4xl">Login</h2>
            <form className="mt-10 ">
              <table  >
                <tr className="mb-3">
                  <td>
                    <label htmlFor="email"> Email</label>
                  </td>
                  <td>
                    :
                    <input type="email" id="email" placeholder="Email" />
                  </td>
                </tr>
                <tr>
                  <td>
                    <label htmlFor="password"> password</label>
                  </td>
                  <td>
                    :
                    <input
                      type="password"
                      id="password"
                      placeholder="password"
                    />
                  </td>
                </tr>
              </table>
              <Link href={'/register'}> register account</Link><br />

              <button type="submit" className="align-bottom">Submit</button>
            </form>
          </div>
        </div>
      </>
    );
}