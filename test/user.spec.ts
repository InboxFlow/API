import { describe, expect, test } from "vitest";
import app from "~/infra/http/server";

const user_data = JSON.stringify({
  name: "John Doe",
  mail: "john@mail.com",
  password: "Abc@123",
});

describe("User", () => {
  let token = "";
  let user_id = "";

  test("Create a user", async () => {
    const response = await app.request("/users", {
      body: user_data,
      method: "POST",
      headers: { "Content-Type": "application/json" },
    });

    const requestToJson = await response.json();

    expect(response.status).toBe(201);
    expect(requestToJson).toMatchObject({
      success: true,
      message: "User created successfully! Verify your email",
    });
  });

  test("Sign a user", async () => {
    const response = await app.request("/auth", {
      body: user_data,
      method: "POST",
      headers: { "Content-Type": "application/json" },
    });

    const requestToJson = await response.json();

    token = requestToJson.data.token;
    user_id = requestToJson.data.user.id;

    expect(response.status).toBe(200);
    expect(requestToJson).toMatchObject({
      success: true,
      message: "User signed!",
      data: {
        token: expect.any(String),
        user: {
          id: expect.any(String),
          name: expect.any(String),
          mail: expect.any(String),
          verified: expect.any(Boolean),
          created_at: expect.any(String),
          updated_at: expect.any(String),
        },
      },
    });
  });

  test("Delete a user", async () => {
    const response = await app.request(`/users/${user_id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });

    const requestToJson = await response.json();

    expect(response.status).toBe(201);
    expect(requestToJson).toMatchObject({
      success: true,
      message: "User deleted successfully!",
    });
  });
});
