import { describe, expect, it, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { useGameStore } from "@psz/game-state";
import { App } from "./App";

describe("routing", () => {
  beforeEach(() => {
    localStorage.clear();
    useGameStore.getState().reset();
  });

  it("renders the forum at /forum", () => {
    render(
      <MemoryRouter initialEntries={["/forum"]}>
        <App />
      </MemoryRouter>
    );
    expect(screen.getByText("平顺镇高中论坛")).toBeTruthy();
    expect(screen.getByText("关于我校一名学生死亡情况的说明")).toBeTruthy();
  });

  it("renders the school at /school", () => {
    render(
      <MemoryRouter initialEntries={["/school"]}>
        <App />
      </MemoryRouter>
    );
    expect(screen.getByText("平顺镇高中")).toBeTruthy();
  });

  it("shows the underworld gate without a ladder", () => {
    render(
      <MemoryRouter initialEntries={["/underworld"]}>
        <App />
      </MemoryRouter>
    );
    expect(screen.getByText("此地址不属于阳间")).toBeTruthy();
  });

  it("opens the underworld when a ladder is obtained", () => {
    const store = useGameStore.getState();
    store.setFlag("ladderObtained", true);
    store.setFlag("enteredUnderworld", true);
    render(
      <MemoryRouter initialEntries={["/underworld"]}>
        <App />
      </MemoryRouter>
    );
    expect(screen.getByText("阴间内部网站")).toBeTruthy();
  });
});
