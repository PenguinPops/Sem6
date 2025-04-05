const mongoose = require("mongoose")
const supertest = require("supertest")
const createServer = require("./server")
const Post = require("./models/Post")

let app

beforeEach(async () => {
  await mongoose.connect("mongodb://localhost:27017/postsdb_test")
  app = createServer()
})

afterEach(async () => {
  await mongoose.connection.db.dropDatabase()
  await mongoose.connection.close()
})

describe("POST /api/posts", () => {
  test("powinien utworzyć nowy post", async () => {
    const data = {
      title: "Testowy post",
      content: "Treść testowego posta"
    }

    const response = await supertest(app)
      .post("/api/posts")
      .send(data)
      .expect(201)

    // Sprawdzenie odpowiedzi
    expect(response.body._id).toBeTruthy()
    expect(response.body.title).toBe(data.title)
    expect(response.body.content).toBe(data.content)

    // Sprawdzenie czy post został zapisany w bazie
    const post = await Post.findById(response.body._id)
    expect(post).toBeTruthy()
    expect(post.title).toBe(data.title)
    expect(post.content).toBe(data.content)
  })
})

describe("GET /api/posts", () => {
  test("powinien zwrócić wszystkie posty", async () => {
    // Utworzenie testowego posta
    const post = await Post.create({
      title: "Testowy post",
      content: "Treść testowego posta"
    })

    const response = await supertest(app)
      .get("/api/posts")
      .expect(200)

    // Sprawdzenie odpowiedzi
    expect(Array.isArray(response.body)).toBeTruthy()
    expect(response.body.length).toBe(1)
    expect(response.body[0]._id).toBe(post.id)
    expect(response.body[0].title).toBe(post.title)
    expect(response.body[0].content).toBe(post.content)
  })
})

describe("DELETE /api/posts/:id", () => {
  test("powinien usunąć post", async () => {
    // Utworzenie testowego posta
    const post = await Post.create({
      title: "Testowy post",
      content: "Treść testowego posta"
    })

    const response = await supertest(app)
      .delete(`/api/posts/${post._id}`)
      .expect(200)

    // Sprawdzenie odpowiedzi
    expect(response.body.message).toBe("Post deleted")

    // Sprawdzenie czy post został usunięty z bazy
    const deletedPost = await Post.findById(post._id)
    expect(deletedPost).toBeNull()
  })

  test("powinien zwrócić błąd 404 jeśli post nie istnieje", async () => {
    const nonExistingId = new mongoose.Types.ObjectId()

    const response = await supertest(app)
      .delete(`/api/posts/${nonExistingId}`)
      .expect(404)

    expect(response.body.message).toBe("Post not found")
  })
})