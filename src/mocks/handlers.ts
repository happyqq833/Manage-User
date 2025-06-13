import { rest } from "msw";

// Danh sách user mock
const users = [
  { username: "hr1", password: "123", role: "hr" },
  { username: "emp1", password: "123", role: "employee" },
];

// Hàm tạo token thủ công
function createFakeToken(payload: object): string {
  return btoa(JSON.stringify(payload));
}

// Hàm decode thủ công
function decodeFakeToken(token: string): any {
  try {
    return JSON.parse(atob(token));
  } catch (e) {
    return null;
  }
}

// MSW Handlers
export const handlers = [
  // Đăng nhập
  rest.post("/login", async (req, res, ctx) => {
    const { username, password } = await req.json();

    const user = users.find(
      (u) => u.username === username && u.password === password
    );

    if (!user) {
      return res(ctx.status(401), ctx.json({ message: "Sai tài khoản/mật khẩu" }));
    }

    const accessToken = createFakeToken({
      username: user.username,
      role: user.role,
      exp: Date.now() + 15 * 60 * 1000, // 15 phút
    });

    const refreshToken = createFakeToken({
      username: user.username,
      exp: Date.now() + 7 * 24 * 60 * 60 * 1000, // 7 ngày
    });

    return res(
      ctx.status(200),
      ctx.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        path: "/refresh-token",
      }),
      ctx.json({ accessToken })
    );
  }),

  // Làm mới access token
  rest.post("/refresh-token", async (req, res, ctx) => {
    const cookie = req.cookies["refreshToken"];
    if (!cookie) return res(ctx.status(401));

    const decoded = decodeFakeToken(cookie);
    if (!decoded?.username || decoded.exp < Date.now()) {
      return res(ctx.status(401));
    }

    const user = users.find((u) => u.username === decoded.username);
    if (!user) return res(ctx.status(401));

    const newAccessToken = createFakeToken({
      username: user.username,
      role: user.role,
      exp: Date.now() + 15 * 60 * 1000,
    });

    return res(ctx.json({ accessToken: newAccessToken }));
  }),

  // API cần token
  rest.get("/user-info", async (req, res, ctx) => {
    const authHeader = req.headers.get("authorization");
    if (!authHeader?.startsWith("Bearer ")) {
      return res(ctx.status(401));
    }

    const token = authHeader.split(" ")[1];
    const decoded = decodeFakeToken(token);

    if (!decoded?.username || decoded.exp < Date.now()) {
      return res(ctx.status(401));
    }

    return res(
      ctx.status(200),
      ctx.json({
        username: decoded.username,
        role: decoded.role,
      })
    );
  }),
];
