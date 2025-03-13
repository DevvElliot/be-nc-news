const endpointsJson = require("../endpoints.json");
const db = require("../db/connection");
const seed = require("../db/seeds/seed");
const data = require("../db/data/test-data/index");
const request = require("supertest");
const app = require("../app");
/* Set up your test imports here */

/* Set up your beforeEach & afterAll functions here */
beforeAll(() => seed(data));

afterAll(() => db.end());

describe("GET /api", () => {
    test("200: Responds with an object detailing the documentation for each endpoint", () => {
        return request(app)
            .get("/api")
            .expect(200)
            .then(({ body: { endpoints } }) => {
                expect(endpoints).toEqual(endpointsJson);
            });
    });
});

describe("GET /api/topics", () => {
    test("200: responds with an array of topics", () => {
        return request(app)
            .get("/api/topics")
            .expect(200)
            .then(({ body: {topics} }) => {
                expect(topics.length).toBe(3);
                topics.forEach((topic) => {
                    expect(typeof topic.slug).toBe("string");
                    expect(typeof topic.description).toBe("string");
                });
            });
    });
});

describe("GET /api/articles", () => {
    test("200: responds with an array of articles", () => {
        return request(app)
            .get("/api/articles")
            .expect(200)
            .then(({ body: {articles} }) => {
                console.log(articles)
                expect(articles.length).toBe(13);
                articles.forEach((article) => {
                    expect(typeof article.article_id).toBe("number")
                    expect(typeof article.title).toBe("string")
                    expect(typeof article.topic).toBe("string")
                    expect(typeof article.author).toBe("string")
                    expect(article.body).toBe(undefined)
                    expect(typeof article.created_at).toBe("string")
                    expect(typeof article.votes).toBe("number")
                    expect(typeof article.article_img_url).toBe("string")
                    expect(typeof article.comment_count).toBe("number")
                    
                });
            });
    });
});

describe("GET /api/articles/:article_id", () => {
    test("200: responds with the correct article of article id", () => {
        return request(app)
            .get("/api/articles/5")
            .expect(200)
            .then(({ body: {article} }) => {
                expect(article.length).toBe(1);
                article.forEach((article) => {
                    expect(article.article_id).toBe(5)
                    expect(article.title).toBe("UNCOVERED: catspiracy to bring down democracy")
                    expect(article.topic).toBe("cats")
                    expect(article.author).toBe("rogersop")
                    expect(article.body).toBe("Bastet walks amongst us, and the cats are taking arms!")
                    expect(article.votes).toBe(0)
                    expect(article.article_img_url).toBe("https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700")
                    
                });
            });
    });

    test("404: responds with an object saying 404 not found", () => {
        return request(app)
            .get("/api/articles/999")
            .expect(404)
            .then(({ body: {msg} }) => {
                expect(msg).toBe("Not found (articleId does not exist)")
            });
    });
});