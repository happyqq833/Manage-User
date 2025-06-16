import { rest } from "msw";

// Danh sách user mock với ID và thông tin chi tiết
const users = [
  {
    id: "1",
    username: "hr1",
    password: "123",
    role: "hr",
    fullName: "Nguyễn Thị HR",
    dob: "1990-01-01",
    phone: "0909000000",
    address: "123 Lê Lợi, Q1, TP.HCM",
    department: "Phòng Nhân sự",
    position: "Trưởng phòng",
    avatar: "https://example.com/hr1.jpg",
  },
  {
    id: "2",
    username: "emp1",
    password: "123",
    role: "employee",
    fullName: "Trần Văn Employee",
    dob: "1995-06-15",
    phone: "0909111111",
    address: "456 Trần Hưng Đạo, Q5, TP.HCM",
    department: "Phòng Kỹ thuật",
    position: "Nhân viên lập trình",
    avatar: "https://example.com/emp1.jpg",
  },
];

// Tạo token giả lập
function createFakeToken(payload: object): string {
  const header = { alg: "HS256", typ: "JWT" };
  const base64Encode = (obj: object) =>
    btoa(JSON.stringify(obj)).replace(/=/g, "").replace(/\+/g, "-").replace(/\//g, "_");

  const encodedHeader = base64Encode(header);
  const encodedPayload = base64Encode(payload);
  const signature = "mocked-signature";

  return `${encodedHeader}.${encodedPayload}.${signature}`;
}

function decodeFakeToken(token: string) {
  try {
    const payload = token.split(".")[1];
    const base64 = payload.replace(/-/g, "+").replace(/_/g, "/");
    const padded = base64.padEnd(base64.length + (4 - (base64.length % 4)) % 4, "="); // Fix padding
    return JSON.parse(atob(padded));
  } catch (e) {
    return null;
  }
}

export const handlers = [
  // Đăng nhập
  rest.post("/login", async (req, res, ctx) => {
    const { username, password } = await req.json();
    const user = users.find(u => u.username === username && u.password === password);

    if (!user) {
      return res(ctx.status(401), ctx.json({ message: "Sai tài khoản/mật khẩu" }));
    }

    const accessToken = createFakeToken({
      id: user.id,
      username: user.username,
      role: user.role,
      exp: Date.now() + 15 * 60 * 1000, // 15 phút
    });

    const refreshToken = createFakeToken({
      id: user.id,
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
    if (!decoded?.id || decoded.exp < Date.now()) {
      return res(ctx.status(401));
    }

    const user = users.find(u => u.id === decoded.id);
    if (!user) return res(ctx.status(401));

    const newAccessToken = createFakeToken({
      id: user.id,
      username: user.username,
      role: user.role,
      exp: Date.now() + 15 * 60 * 1000,
    });

    return res(ctx.json({ accessToken: newAccessToken }));
  }),

  // Trả thông tin chi tiết người dùng
  rest.get("/user/:id", async (req, res, ctx) => {
    const { id } = req.params;

    const authHeader = req.headers.get("authorization");
    if (!authHeader?.startsWith("Bearer ")) {
      return res(ctx.status(401));
    }

    const token = authHeader.split(" ")[1];
    const decoded = decodeFakeToken(token);

    // if (!decoded?.id || decoded.exp < Date.now()) {
    //   return res(ctx.status(401));
    // }

    // if (decoded.id !== id) {
    //   return res(ctx.status(403), ctx.json({ message: "Không có quyền truy cập" }));
    // }

    const user = users.find(u => u.id === id);
    if (!user) {
      return res(ctx.status(404), ctx.json({ message: "Không tìm thấy người dùng" }));
    }

    return res(
      ctx.status(200),
      ctx.json({
        message: "Lấy thông tin người dùng thành công",
        traceId: crypto.randomUUID(),
        data: {
          id: user.id,
          username: user.username,
          fullName: user.fullName,
          dob: user.dob,
          phone: user.phone,
          address: user.address,
          department: user.department,
          position: user.position,
          role: user.role,
          avatar: user.avatar,
        }
      })
    );
  }),
];
