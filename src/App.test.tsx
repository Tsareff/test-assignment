import React from "react";
import { App } from "./App";
import { shallow } from "enzyme";
import { AuthPage } from "./screens/AuthPage/AuthPage";

test("renders sign in heading", () => {
  const wrapper = shallow(<App />);

  expect(wrapper.find(AuthPage).exists()).toBeTruthy();
});
