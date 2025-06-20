import { rest } from "msw";
import { RequestForm } from "../services/employee/createRequest/type";

// Danh sách user mock với ID và thông tin chi tiết
const users = [
  {
    id: "1",
    username: "LanNN",
    password: "123",
    role: "hr",
    fullName: "Nguyễn Ngọc Lan",
    dob: "1990-01-01",
    phone: "0909000000",
    address: "123 Lê Lợi, Q1, TP.HCM",
    department: "Phòng Nhân sự",
    position: "Trưởng phòng",
    avatar: "https://example.com/hr1.jpg",
    email: "lan@gmail.com"
  },
  {
    id: "2",
    username: "Nam Tran",
    password: "123",
    role: "employee",
    fullName: "Trần Văn Nam",
    dob: "1995-06-15",
    phone: "0909111111",
    address: "456 Trần Hưng Đạo, Q5, TP.HCM",
    department: "Phòng Kỹ thuật",
    position: "Nhân viên lập trình",
    avatar: "https://example.com/emp1.jpg",
    email: "nam@gmail.com"

  },
  {
    id: "3",
    username: "emp2",
    password: "123",
    role: "employee",
    fullName: "Trần Văn He",
    dob: "1995-06-15",
    phone: "0909111111",
    address: "456 Trần Hưng Đạo, Q5, TP.HCM",
    department: "Phòng Kỹ thuật",
    position: "Nhân viên lập trình",
    avatar: "https://example.com/emp1.jpg",
    email: "he@hmail.com"

  },
  {
    id: "4",
    username: "emp3",
    password: "123",
    role: "employee",
    fullName: "Trần Văn Ha",
    dob: "1995-06-15",
    phone: "0909111111",
    address: "456 Trần Hưng Đạo, Q5, TP.HCM",
    department: "Phòng Kỹ thuật",
    position: "Nhân viên lập trình",
    avatar: "https://example.com/emp1.jpg",
    email: "ha@hmail.com"

  },
  {
    id: "5",
    username: "emp4",
    password: "123",
    role: "employee",
    fullName: "Trần Văn HaHa",
    dob: "1995-06-15",
    phone: "0909111111",
    address: "456 Trần Hưng Đạo, Q5, TP.HCM",
    department: "Phòng Kỹ thuật",
    position: "Nhân viên lập trình",
    avatar: "https://example.com/emp1.jpg",
    email: "ha@hmail.com"

  },
  {
    id: "5",
    username: "emp4",
    password: "123",
    role: "employee",
    fullName: "Trần Văn HaHa",
    dob: "1995-06-15",
    phone: "0909111111",
    address: "456 Trần Hưng Đạo, Q5, TP.HCM",
    department: "Phòng Kỹ thuật",
    position: "Nhân viên lập trình",
    avatar: "https://example.com/emp1.jpg",
    email: "ha@hmail.com"

  },
  {
    id: "5",
    username: "emp4",
    password: "123",
    role: "employee",
    fullName: "Trần Văn HaHa",
    dob: "1995-06-15",
    phone: "0909111111",
    address: "456 Trần Hưng Đạo, Q5, TP.HCM",
    department: "Phòng Kỹ thuật",
    position: "Nhân viên lập trình",
    avatar: "https://example.com/emp1.jpg",
    email: "ha@hmail.com"

  },
];
let requestForms: any = Array.from({ length: 23 }).map((_, index) => {
  return {
    id: index + 1,
    name: `Đơn xin nghỉ phép #${index + 1}`,
    reason: `Lý do ${index + 1}`,
    createdAt: new Date(2025, 5, index + 1).toISOString(),
    createdBy: {
      id: index % 5,
      username: `user${index % 5}`,
      role: "employee",
    },
    approver: {
      id: 99,
      username: "boss",
      role: "hr",
    },
  };
});


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
  rest.post("/request-form", async (req, res, ctx) => {
    const body = await req.json();

    // Tạo đối tượng mới
    const newRequest: RequestForm = {
      id: crypto.randomUUID(), // Tạo ID ngẫu nhiên
      name: body.name,
      reason: body.reason,
      createdBy: body.createdBy,
      createdAt: new Date().toISOString(),
    };

    requestForms.push(newRequest);

    return res(
      ctx.status(200),
      ctx.json({
        message: "Tạo đơn thành công",
        traceId: crypto.randomUUID(),
        data: newRequest,
      })
    );
  }),
  rest.put("/request-form/:id", async (req, res, ctx) => {
    const { id } = req.params;
    const updatedData = await req.json();

    const index = requestForms.findIndex((item: any) => String(item.id) === String(id));

    if (index === -1) {
      return res(
        ctx.status(404),
        ctx.json({
          message: "Không tìm thấy đơn để cập nhật",
          traceId: crypto.randomUUID(),
          data: null,
        })
      );
    }

    // Cập nhật dữ liệu (giữ nguyên id)
    requestForms[index] = {
      ...requestForms[index],
      ...updatedData,
      id: requestForms[index].id,
    };

    return res(
      ctx.status(200),
      ctx.json({
        message: "Cập nhật đơn thành công",
        traceId: crypto.randomUUID(),
        data: requestForms[index],
      })
    );
  }),
  rest.get("/request-form", (req, res, ctx) => {
    const page = Number(req.url.searchParams.get("page") ?? "0");
    const size = Number(req.url.searchParams.get("size") ?? "5");

    const start = page * size;
    const end = start + size;

    const pageContent = requestForms.slice(start, end).map((form: any) => ({
      ...form,
      // Gán status giả lập nếu chưa có sẵn, có thể random hoặc theo logic nào đó
      status:
        form.status ??
        ["approved", "rejected", "pending"][
        Math.floor(Math.random() * 3)
        ],
    }));

    return res(
      ctx.status(200),
      ctx.json({
        message: "Lấy danh sách đơn thành công",
        traceId: crypto.randomUUID(),
        data: {
          content: pageContent,
          totalElements: requestForms.length,
          totalPages: Math.ceil(requestForms.length / size),
          pageNumber: page,
          pageSize: size,
        },
      })
    );
  }),

  rest.get("/request-form/:id", (req, res, ctx) => {
    const { id } = req.params;

    const form = requestForms.find((item: any) => String(item.id) === String(id));

    if (!form) {
      return res(
        ctx.status(404),
        ctx.json({
          message: "Không tìm thấy đơn",
          traceId: crypto.randomUUID(),
          data: null,
        })
      );
    }

    return res(
      ctx.status(200),
      ctx.json({
        message: "Lấy chi tiết đơn thành công",
        traceId: crypto.randomUUID(),
        data: {
          ...form,
          status:
            form.status ??
            ["approved", "rejected", "pending"][
            Math.floor(Math.random() * 3)
            ],
        },
      })
    );
  }),

  rest.get("/users-list", (req, res, ctx) => {
    const page = Number(req.url.searchParams.get("page") ?? "0");
    const size = Number(req.url.searchParams.get("size") ?? "5");

    // Lọc role === 'employee'
    const employeeList = users
      .filter((u) => u.role === "employee")
      .map((u) => ({
        id: u.id,
        fullName: u.fullName,
        address: u.address,
        department: u.department,
      }));

    const start = page * size;
    const end = start + size;
    const pageContent = employeeList.slice(start, end);

    return res(
      ctx.status(200),
      ctx.json({
        message: "Lấy danh sách employee thành công",
        traceId: crypto.randomUUID(),
        data: {
          content: employeeList,
          totalElements: employeeList.length,
          totalPages: Math.ceil(employeeList.length / size),
          pageNumber: page,
          pageSize: size,
        },
      })
    );
  }),

  rest.get("/user/:id", (req, res, ctx) => {
    const { id } = req.params;

    const user = users.find((u) => u.id === id);

    if (!user) {
      return res(
        ctx.status(404),
        ctx.json({
          message: "Không tìm thấy người dùng",
          traceId: crypto.randomUUID(),
          data: null,
        })
      );
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

  rest.post("/users", async (req, res, ctx) => {
    const body = await req.json();

    const newUser = {
      ...body,
      id: crypto.randomUUID(), // tạo ID ngẫu nhiên
    };

    users.push(newUser);

    return res(
      ctx.status(201),
      ctx.json({
        message: "Thêm người dùng thành công",
        traceId: crypto.randomUUID(),
        data: newUser,
      })
    );
  }),

  rest.put("/users/:id", async (req, res, ctx) => {
    const { id } = req.params;
    const body = await req.json();

    const index = users.findIndex((u) => u.id === id);
    if (index === -1) {
      return res(
        ctx.status(404),
        ctx.json({
          message: "Không tìm thấy người dùng để cập nhật",
          traceId: crypto.randomUUID(),
          data: null,
        })
      );
    }

    users[index] = { ...users[index], ...body };

    return res(
      ctx.status(200),
      ctx.json({
        message: "Cập nhật người dùng thành công",
        traceId: crypto.randomUUID(),
        data: users[index],
      })
    );
  }),

  rest.delete("/users/:id", (req, res, ctx) => {
    const { id } = req.params;

    const index = users.findIndex((u) => u.id === id);
    if (index === -1) {
      return res(
        ctx.status(404),
        ctx.json({
          message: "Không tìm thấy người dùng để xóa",
          traceId: crypto.randomUUID(),
          data: null,
        })
      );
    }

    const deletedUser = users.splice(index, 1)[0];

    return res(
      ctx.status(200),
      ctx.json({
        message: "Xóa người dùng thành công",
        traceId: crypto.randomUUID(),
        data: deletedUser,
      })
    );
  }),

];
