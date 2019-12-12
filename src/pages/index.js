import React, { useState } from "react";
import Helmet from "react-helmet";
import QR from "qrcode.react";

export default () => {
  const [value, setValue] = useState("https://example.com");

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
                onChange={e => setValue(e.target.value)}
              />
            </div>
          </div>
          {value && (
            <div className="has-text-centered">
              <QR value={value} size={256} />
            </div>
          )}
        </div>
      </section>
    </>
  );
};
