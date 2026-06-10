import test, { expect } from "playwright/test";

test.describe("Edit page test",async()=>{
test.beforeEach(async({page})=>{
    await page.route("*/apis/refresh",async refresh=>{
        refresh.fulfill({
            status:200,
            contentType:"application/json",
            body:JSON.stringify({message:{success:true,access:"fake_access"}})
        })
    })
await page.goto("/edit-task")
})









test("edit page test case",async({page})=>{
    await expect(page.getByPlaceholder("Task id")).toBeVisible()
    await expect(page.getByPlaceholder("Update Title")).toBeVisible()
    await expect(page.getByPlaceholder("Update Description")).toBeVisible()
    await expect(page.getByRole("button",{name:"Edit"})).toBeVisible()

    await page.getByPlaceholder("Task id").fill("12345")
    await page.getByPlaceholder("Update Title").fill("t")
    await page.getByPlaceholder("Update Description").fill("d")

    await page.route("*/apis/update-task",async route=>{
        route.fulfill({
            status:200,
            contentType:"application/json",
            body:JSON.stringify({message:"task updated"})
        })
    })

    page.on("dialog",async dilog=>{
        expect(dilog.type()).toBe("alert")
        expect(dilog.message()).toBe("task updated")
        dilog.accept()
    })

    await page.getByRole("button",{name:"Edit"}).click()
})



})