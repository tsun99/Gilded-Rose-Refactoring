import { makeApiRequest } from "@/NodeTask/api";

jest.mock("axios");

describe("making api request", () => {
  it("should return true when getting 'yes'", async () => {
    jest
      .spyOn(require("axios"), "get")
      .mockResolvedValue({ data: { answer: "yes" } });

    const result = await makeApiRequest();
    expect(result).toBe(true);
  });

  it("should return galse when getting 'no"), async () => {
    jest.spyOn(require('axios'), 'get').mockResolvedValue({ data:  { answer: 'no'} });

    const result = await makeApiRequest();
    expect(result).toBe(false);
  }
});
