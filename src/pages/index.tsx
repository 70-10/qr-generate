import React, { useState, useEffect } from "react";
import Helmet from "react-helmet";
import { generateQRCodeAsync, download } from "../qrcode";
import "./style.css";

export default () => {
  const [value, setValue] = useState("https://example.com");
  const [svg, setSvg] = useState("");

  const setQRSvg = async (value: string) => {
    if (value === "") {
      return;
    }

    try {
      const url = await generateQRCodeAsync(value, { type: "svg" });
      setSvg(url);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    setQRSvg(value);
  });

  return (
    <>
      <Helmet>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/bulma@0.8.0/css/bulma.min.css"
        />
      </Helmet>
      <section className="section">
        <div className="container">
          <h1 className="title">QR Code Generate</h1>
          <div className="field">
            <div className="control is-expanded">
              <input
                type="text"
                className="input is-rounded"
                value={value}
                onChange={async e => {
                  setValue(e.target.value);
                  await setQRSvg(e.target.value);
                }}
              />
            </div>
          </div>
          {value && svg && (
            <>
              <button className="button" onClick={() => download(svg)}>
                Download PDF
              </button>
              <div
                id="qr"
                className="has-text-centered"
                dangerouslySetInnerHTML={{
                  __html: svg
                }}
              />
            </>
          )}
        </div>
      </section>
    </>
  );
};
