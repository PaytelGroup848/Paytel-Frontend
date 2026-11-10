import { useState } from "react";

function navigateTo(path) {
  if (window.location.pathname === path) {
    return;
  }

  window.location.assign(path);
}

function scrollToLandingSection(id) {
  const scroll = () => {
    const target = document.getElementById(id);
    if (!target) {
      return false;
    }

    const top = target.getBoundingClientRect().top + window.scrollY - 96;
    window.scrollTo({ top, behavior: "smooth" });
    return true;
  };

  if (!scroll()) {
    window.location.assign(`/#${encodeURIComponent(id)}`);
  }
}
