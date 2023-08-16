import React, { useState } from "react";
// import { ReactSummernote } from "react-summernote";

import "react-summernote/dist/react-summernote.css"; // import styles
import "react-summernote/lang/summernote-ru-RU"; // you can import any other locale
// Import bootstrap(v3 or v4) dependencies
// import "bootstrap/js/modal";
// import "bootstrap/js/dropdown";
// import "bootstrap/js/tooltip";

import "bootstrap/dist/css/bootstrap.css";
import "./Summereneote.css";
const Summernote = () => {
  return (
    <div style={{ padding: 30, width: 1000 }}>
      {/* <ReactSummernote
        value="Default value"
        options={{
          //   lang: "ru-RU",
          height: 350,
          dialogsInBody: true,
          toolbar: [
            ["style", ["style"]],
            ["font", ["bold", "underline", "clear"]],
            ["fontname", ["fontname"]],
            ["para", ["ul", "ol", "paragraph"]],
            ["table", ["table"]],
            ["insert", ["link", "picture", "video"]],
            ["view", ["fullscreen", "codeview"]],
          ],
        }}
        onChange={this.onChange}
      /> */}
    </div>
  );
};

export default Summernote;
