const taxesSwitch = document.getElementById("flexSwitchCheckDefault");
const taxesToggle = document.getElementsByClassName("taxes-toggle");
taxesSwitch.addEventListener("click", () => {
  for (let info of taxesToggle) {
    if (info.style.display != "inline") {
      info.style.display = "inline";
    } else {
      info.style.display = "none";
    }
  }
});
