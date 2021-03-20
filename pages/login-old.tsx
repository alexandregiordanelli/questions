import { useState, useEffect } from 'react'
import { NextPage } from 'next'
import Head from 'next/head'
import { postEmail } from 'services/client/post'
import { Logo } from 'components/Logo'
import cookie from 'js-cookie'
import NoSSR from 'react-no-ssr'
import { useAuth } from 'lib/auth'
import { useRouter } from 'next/router'

const linearPositionEye = (x: number): number => {
  if (x < 40) return 92 - x * 0.3
  else if (x > -1) return 80
}

const Login: NextPage = () => {
  const [emailInCookie, setEmailInCookie] = useState(cookie.get('email') ?? '')
  const [email, setEmail] = useState('')
  const [cursorPosition, setCursorPosition] = useState(-1)
  const { customer } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (emailInCookie) cookie.set('email', emailInCookie)
    else cookie.remove('email')
  }, [emailInCookie])

  useEffect(() => {
    if (customer) {
      router.push('/')
    }
  }, [customer, router])

  useEffect(() => {
    if (email.length == 0) setCursorPosition(-1)
  }, [cursorPosition, email.length])

  return (
    <>
      <Head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if (document.cookie && document.cookie.includes('token')) {
                window.location.href = "/"
              }
            `,
          }}
        />
      </Head>
      <div className="w-screen h-screen bg-gray-800 pt-4">
        <div className="bg-white p-6 flex rounded-md items-center flex-col sm:absolute top-1/2 left-1/2 transform sm:-translate-x-1/2 sm:-translate-y-1/2 sm:w-full sm:max-w-sm">
          <div className="logo relative">
            <Logo
              size={200}
              color={!(cursorPosition > -1) ? 'rgba(31, 41, 55)' : 'rgba(156, 163, 175)'}
            />
            <div
              className={`absolute ${cursorPosition > -1 ? 'block' : 'hidden'}`}
              style={{ bottom: 98, right: linearPositionEye(cursorPosition ?? 0) }}
            >
              <svg width="9px" height="13px" viewBox="0 0 9 13">
                <ellipse fill="#000000" cx="4.5" cy="6.5" rx="4.5" ry="6.5"></ellipse>
              </svg>
            </div>
          </div>
          <NoSSR>
            {!emailInCookie && (
              <form
                className="flex flex-col items-center sm:w-full sm:max-w-sm"
                method="POST"
                action={`https://questionsof.com/api/email`}
                onSubmit={async (e) => {
                  e.preventDefault()
                  await postEmail(email)
                  setEmailInCookie(email)
                }}
              >
                <label className="w-full">
                  <span className="mb-1 font-semibold text-sm leading-5">Email</span>
                  <input
                    type="text"
                    className="p-2 text-base w-full rounded text-gray-900"
                    name="email"
                    onKeyDown={(x) => {
                      const number = x.currentTarget.selectionStart
                      setTimeout(() => setCursorPosition(number), 0)
                    }}
                    onChange={(x) => setEmail(x.target.value)}
                    value={email}
                  />
                </label>
                <button
                  type="submit"
                  className="bg-green-600 text-white rounded-md mt-4 px-4 py-2 cursor-pointer w-full"
                >
                  Send Magic Link to Email
                </button>
              </form>
            )}

            {emailInCookie && (
              <>
                <p className="text-xl text-center my-4 font-medium text-gray-400">
                  Just open {emailInCookie}
                </p>
                <button
                  type="button"
                  className="text-xs text-center font-medium text-gray-400"
                  onClick={() => setEmailInCookie('')}
                >
                  Try another email
                </button>
              </>
            )}
          </NoSSR>
        </div>
      </div>
    </>
  )
}

export default Login
