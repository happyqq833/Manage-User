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
    username: "emp1",
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
let requestForms: any = Array.from({ length: 20 }).map((_, index) => {
  return {
    id: index + 1,
    name: `leave`,
    reason: `Lý do ${index + 1}`,
    createdAt: new Date().toISOString().split('T')[0],
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
    status: 'pending'
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
      createdAt: new Date().toISOString().split('T')[0],
      status: body.status
    };

    requestForms.unshift(newRequest);

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
    const page = Number(req.url.searchParams.get("page") ?? "1") - 1; // 👈 fix
    const size = Number(req.url.searchParams.get("size") ?? "5");

    const name = req.url.searchParams.get("name")?.toLowerCase() ?? "";
    const status = req.url.searchParams.get("status")?.toLowerCase() ?? "";

    const filtered = requestForms.filter((form: any) => {
      const nameMatch = name ? form.name.toLowerCase().includes(name) : true;
      const statusMatch = status ? form.status?.toLowerCase().includes(status) : true;
      return nameMatch && statusMatch;
    });

    const start = page * size;
    const end = start + size;
    const pageContent = filtered.slice(start, end);

    return res(
      ctx.status(200),
      ctx.json({
        message: "Lấy danh sách đơn thành công",
        traceId: crypto.randomUUID(),
        data: {
          content: pageContent,
          totalElements: filtered.length,
          totalPages: Math.ceil(filtered.length / size),
          pageNumber: page + 1, // 👈 trả lại 1-based cho client
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
    const page = Number(req.url.searchParams.get("page") ?? "1") - 1; // 👈 fix
    const size = Number(req.url.searchParams.get("size") ?? "5");
    const fullName = req.url.searchParams.get("fullName")?.toLowerCase() ?? "";
    const department = req.url.searchParams.get("department")?.toLowerCase() ?? "";
    const search = req.url.searchParams.get("search")?.toLowerCase() ?? "";

    // Lọc role === 'employee' + tìm kiếm
    const employeeList = users
      .filter((u) => u.role === "employee")
      .filter((u) => {
        const nameMatch = fullName ? u.fullName.toLowerCase().includes(fullName) : true;
        const deptMatch = department ? u.department.toLowerCase().includes(department) : true;
        const searchMatch = search ? u.fullName.toLowerCase().includes(search) || u.department.toLowerCase().includes(search) : true;
        return nameMatch && deptMatch && searchMatch;
      })
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
          content: pageContent,
          totalElements: employeeList.length,
          totalPages: Math.ceil(employeeList.length / size),
          pageNumber: page + 1, // 👈 trả lại đúng số trang 1-based
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

    users.unshift(newUser); // 👈 Cho lên đầu danh sách

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
