import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import gh from "parse-github-url";
import Head from "next/head";
import { getRepos } from "../services/repos";
import styles from "../styles/Home.module.css";

export default function Home() {
  const router = useRouter();
  const [input, setInput] = useState("");
  const [searchStatus, setSearchStatus] = useState("");
  const [feelingLuckyStatus, setFeelingLuckyStatus] = useState("");
  const inputRef = useRef();

  function parseRepo(text) {
    const { owner = "", name = "" } = gh(text) || {};
    return {
      owner,
      repo: name
    };
  }

  async function getRepoDetails(text) {
    await setSearchStatus("loading");
    const details = parseRepo(text);
    if (details && details.repo && details.owner) {
      router.push({
        pathname: "/issues",
        search: "?" + new URLSearchParams(details).toString()
      });
    } else {
      await setSearchStatus("");
    }
  }

  async function handleInputKeyUp(e) {
    const value = e.target.value || "";
    await setInput(value);
    if (e.key === "Enter") {
      getRepoDetails(value);
    }
  }

  async function handleFeelingLucky() {
    if (feelingLuckyStatus !== "loading") {
      await setFeelingLuckyStatus("loading");

      const reposList = await getRepos();
      if (reposList?.data?.items?.length) {
        const randomNum = Math.floor(Math.random() * reposList.data.items.length);
        const repo = reposList.data.items[randomNum];
        if (repo?.html_url) {
          getRepoDetails(repo.html_url);
        } else {
          await setFeelingLuckyStatus("");
        }
      } else {
        await setFeelingLuckyStatus("");
      }
    }
  }

  useEffect(() => {
    inputRef.current.focus();
  });

  return (
    <div>
      <Head>
        <title>Issues Explorer</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={`is-flex is-justify-content-center is-align-items-center ${styles.main}`}>
        <div className="has-text-centered">
          <div>
            <img className={`mb-1 ${styles.logo}`} src="/logo.svg" alt="search" />
          </div>
          <p className={`mb-5 has-text-white is-size-4 is-uppercase ${styles.title}`}>
            Issues Explorer
          </p>
          <div className="control has-icons-left has-icons-right">
            <input
              className="input is-rounded is-medium is-info is-hovered"
              type="input"
              placeholder="Enter Repo URL..."
              ref={inputRef}
              onKeyUp={handleInputKeyUp}
            />
            <span className="icon is-left">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="has-text-grey-light">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
            </span>
            <span
              onClick={() => getRepoDetails(input)}
              onKeyUp={() => getRepoDetails(input)}
              className="icon is-right is-clickable"
              role="button"
              tabIndex="0">
              {searchStatus === "loading" ? (
                <img
                  src="/loader-dark.svg"
                  className={`${searchStatus === "loading" ? "" : "is-invisible"} ${styles.loader}`}
                  alt="loading"></img>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className={input.length ? "has-text-primary" : "has-text-grey-light"}>
                  <polyline points="9 10 4 15 9 20"></polyline>
                  <path d="M20 4v7a4 4 0 0 1-4 4H4"></path>
                </svg>
              )}
            </span>
          </div>
          <div className="mb-6 pb-6 is-flex is-justify-content-center is-align-items-start">
            <button
              onClick={handleFeelingLucky}
              className={`is-flex is-align-items-center mt-3 mb-6 is-size-6 has-text-white ${styles.button}`}>
              I&apos;m Feeling Lucky{" "}
              <img
                src="/loader.svg"
                className={`${feelingLuckyStatus === "loading" ? "" : "is-invisible"} ${
                  styles.loader
                }`}
                alt="loading"></img>
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
