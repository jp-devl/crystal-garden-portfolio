import { describe, expect, it } from "vitest";
import { coverUrlFor, mapRepos } from "@/data/projects";

const repo = {
  id: 1, name: "livraria", description: null, html_url: "https://github.com/jp-devl/livraria",
  language: "TypeScript", stargazers_count: 0, fork: false, private: false, default_branch: "main",
};

describe("GitHub portfolio rules", () => {
  it("uses the exact repository-name cover filename", () => {
    expect(coverUrlFor("livraria")).toBe("https://raw.githubusercontent.com/jp-devl/livraria/main/assets/livraria-capa.png");
  });
  it("preserves the repository's branch inside the assets path", () => {
    expect(coverUrlFor("livraria", "master")).toBe("https://raw.githubusercontent.com/jp-devl/livraria/master/assets/livraria-capa.png");
  });
  it("excludes private repositories", () => {
    expect(mapRepos([repo, { ...repo, id: 2, private: true }]).map((p) => p.id)).toEqual(["1"]);
  });
  it("excludes forks", () => {
    expect(mapRepos([repo, { ...repo, id: 2, fork: true }]).map((p) => p.id)).toEqual(["1"]);
  });
  it("uses João Pedro's default description when missing", () => {
    expect(mapRepos([repo])[0]?.description).toBe("Projeto desenvolvido por João Pedro");
  });
});