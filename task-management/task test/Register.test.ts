import test, { expect } from "playwright/test";

test.describe("test of register page",()=>{
    test.beforeEach(async({page})=>{
await page.goto("http://localhost:5173/register")
    })

test("register success",async({page})=>{
    
await expect(page.getByPlaceholder("name")).toBeVisible()
await expect(page.getByPlaceholder("email")).toBeVisible()
await expect(page.getByPlaceholder("password")).toBeVisible()
await expect(page.getByRole("button",{name:"Register"})).toBeVisible()

await page.getByPlaceholder("name").fill("tejas")
await page.getByPlaceholder("email").fill("t@gmail.com")
await page.getByPlaceholder("password").fill("12345")



await page.route("*/apis/register",async route=>
    route.fulfill({
        status:200,
        contentType:"application/json",
        body:JSON.stringify({message:"register success"})
    })
)

page.on("dialog",async dilog=>{
    expect(dilog.type()).toBe("alert")
    expect(dilog.message()).toBe("register success")
    await dilog.accept()
})

await page.getByRole("button",{name:"Register"}).click()
})



})