import { getMessages } from "../actions";
import { GET_MESSAGES } from "../constants";

describe("Messages actions", () => {
  describe("Default Action", () => {
    it("has a type of GET_MESSAGES", () => {
      const expected = {
        type: GET_MESSAGES,
      };
      expect(getMessages()).toEqual(expected);
    });
  });
});
