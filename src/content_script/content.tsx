import Button from "@components/Button";
import React from "react";
import { createRoot } from "react-dom/client";

(function init() {
  const rootElement = document.createElement("div");
  rootElement.id = "ts-ext-root";
  document.body.appendChild(rootElement);
  if (rootElement) {
    createRoot(rootElement!).render(
      <Button
        id="ts-ext-btn"
        tooltip="Button injected by content script!"
        bgColor="#47a150"
        handleClick={() => alert("Thanks for clicking!")}
      >
        Click Me!
      </Button>
    );
  } else {
    console.error("Target element not found.");
  }
})();
