const request = require("supertest");
const app = require("../src/index");

describe("GET /health", () => {
  it("returns 200 and status ok", async () => {
    const res = await request(app).get("/health");
    expect(res.statusCode).toBe(200);
    expect(res.body.status).toBe("ok");
  });
});

describe("GET /", () => {
  it("returns service metadata", async () => {
    const res = await request(app).get("/");
    expect(res.statusCode).toBe(200);
    expect(res.body.service).toBe("devops-demo-api");
  });
});
