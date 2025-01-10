test("TextEncoder is globally defined in Jest", () => {
  console.log(global.TextEncoder);
  expect(global.TextEncoder).toBeDefined();
});
