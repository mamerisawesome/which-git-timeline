#!/usr/bin/env node
import React from "react";
import { render } from "ink";
import { execSync } from "child_process";

import App from "./app.js";

const getCurrentBranch = (): string | null => {
  try {
    return execSync("git branch --show-current", { encoding: "utf8" }).trim();
  } catch (error) {
    return null;
  }
}

const getUsualDefaultBranchName = (): string => {
	try {
		const branches = execSync("git branch", { encoding: "utf8" }).trim().split("\n");

		for (const branch of ["main", "master"]) {
      const isCurrentTheDefaultBranch = branches.some(
        (b) => b.trim().replace("*", "").trim() === branch
      );

		  if (isCurrentTheDefaultBranch) {
        return branch;
		  }
		}

		return "main";
  } catch (error) {
		return "main";
  }
}

const getDefaultBranch = (): string => {
  try {
    const defaultRemoteBranch =
      execSync("git symbolic-ref refs/remotes/origin/HEAD 2> /dev/null", { encoding: "utf8" }).trim();

    return defaultRemoteBranch.replace("refs/remotes/origin/", "");
  } catch (error) {
    return getUsualDefaultBranchName();
  }
}

const isGitRepository = (): boolean => {
  try {
    execSync("git rev-parse --is-inside-work-tree", { encoding: "utf8" });
    return true;
  } catch (error) {
    return false;
  }
}

const main = (): void => {
  if (!isGitRepository()) {
    console.error("Not in a git repository");
    process.exit(1);
  }

  const currentBranch = getCurrentBranch();
  const defaultBranch = getDefaultBranch();
  const isMainBranch = currentBranch === defaultBranch;

  render(
    <App
      currentBranch={currentBranch}
      defaultBranch={defaultBranch}
      isMainBranch={isMainBranch}
    />
  );
}

main();
