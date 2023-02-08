"use client";

import React, { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export default function Home() {
  const [request, setRequest] = useState<{ city?: string; country?: string }>(
    {}
  );
  let [itinerary, setItinerary] = useState<string[]>([]);

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  async function hitAPI() {
    if (!request.city) return;
    setMessage("Building itinerary...");
    setLoading(true);
    setItinerary([]);

    setTimeout(() => {
      setMessage("Getting closer ...");
    }, 7000);

    setTimeout(() => {
      setMessage("Almost there ...");
    }, 15000);

    const response = await fetch("/api/get-itinerary", {
      method: "POST",
      body: JSON.stringify({
        city: request.city,
      }),
    });

    const { itinerary } = await response.json();

    const linkedItinerary: string[] = itinerary.map(
      (bar: string) =>
        `[${bar}](https://www.google.com/search?q=${encodeURIComponent(
          bar + " " + request.city
        )})`
    );

    setItinerary(linkedItinerary);
    setLoading(false);
  }

  return (
    <div className="app-container">
      <h1 style={styles.header} className="hero-header">
        Bar Crawl
      </h1>
      <form
        style={styles.formContainer}
        className="form-container"
        onSubmit={(e) => e.preventDefault()}
      >
        <input
          style={styles.input}
          placeholder="City"
          onChange={(e) =>
            setRequest((request) => ({
              ...request,
              city: e.target.value,
            }))
          }
        />
        <input
          style={styles.input}
          placeholder="Country"
          onChange={(e) =>
            setRequest((request) => ({
              ...request,
              country: e.target.value,
            }))
          }
        />
        <button type="submit" className="input-button" onClick={hitAPI}>
          Build Itinerary
        </button>
      </form>
      <div className="results-container">
        {loading && <p>{message}</p>}
        {itinerary?.map((bar) => (
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              a: (props) => {
                return (
                  <a target="_blank" rel="no-opener" href={props.href}>
                    {props.children}
                  </a>
                );
              },
            }}
          >
            {bar}
          </ReactMarkdown>
        ))}
      </div>
    </div>
  );
}

const styles = {
  header: {
    textAlign: "center" as "center",
    color: "#c683ff",
    fontWeight: "900",
    fontFamily: "Poppins",
    fontSize: "68px",
  },
  input: {
    padding: "10px 14px",
    marginBottom: "4px",
    outline: "none",
    fontSize: "16px",
    width: "100%",
    borderRadius: "8px",
  },
  formContainer: {
    display: "flex",
    flexDirection: "column" as "column",
    margin: "20px auto 0px",
    padding: "20px",
    boxShadow: "0px 0px 12px rgba(198, 131, 255, .2)",
    borderRadius: "10px",
  },
  result: {
    color: "white",
  },
};
