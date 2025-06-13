// handlers.ts
import { rest } from 'msw'
import { mockUsers } from './data/users'

export const handlers = [
  rest.post('/api/login', async (req, res, ctx) => {
    const { username, password } = await req.json()
    const user = mockUsers.find(u => u.username === username && u.password === password)

    if (!user) {
      return res(
        ctx.status(401),
        ctx.json({
          message: 'Đăng nhập thất bại',
          traceId: crypto.randomUUID(),
          data: null,
          errorCodes: [{ code: 'AUTH_FAILED', message: 'Sai tài khoản hoặc mật khẩu' }],
        })
      )
    }

    return res(
      ctx.status(200),
      ctx.json({
        message: 'Đăng nhập thành công',
        traceId: crypto.randomUUID(),
        data: {
          token: 'fake-jwt-token',
          role: user.role,
          username: user.username,
          avatar: user.avatar,
        },
      })
    )
  }),
]
