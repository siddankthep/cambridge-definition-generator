document.addEventListener("DOMContentLoaded", function () {
  const list = document.getElementById("examples-list");

  list.addEventListener("keydown", function (e) {
    if (e.key === "Enter" && e.target.classList.contains("example-text")) {
      e.preventDefault();

      const currentDiv = e.target;
      const currentLi = currentDiv.closest("li");

      // If current field is empty, don't create new one
      if (currentDiv.textContent.trim() === "") {
        return;
      }

      // Create new list item
      const newItem = document.createElement("li");
      newItem.innerHTML =
        '<div class="example-text" contenteditable="true"></div>';

      // Insert after current item
      currentLi.after(newItem);

      // Focus on new item
      const newDiv = newItem.querySelector(".example-text");
      newDiv.focus();
    }

    // Optional: Delete empty item on Backspace
    if (e.key === "Backspace" && e.target.classList.contains("example-text")) {
      const currentDiv = e.target;
      const currentLi = currentDiv.closest("li");

      // Only delete if empty and not the last item
      if (currentDiv.textContent.trim() === "" && list.children.length > 1) {
        e.preventDefault();
        const prevLi = currentLi.previousElementSibling;
        currentLi.remove();

        // Focus on previous item
        if (prevLi) {
          const prevDiv = prevLi.querySelector(".example-text");
          prevDiv.focus();

          // Move cursor to end
          const range = document.createRange();
          const selection = window.getSelection();
          range.selectNodeContents(prevDiv);
          range.collapse(false);
          selection.removeAllRanges();
          selection.addRange(range);
        }
      }
    }
  });
});

function saveAsImage() {
  const container = document.getElementById("background-container");

  html2canvas(container, {
    backgroundColor: "#ffffff",
    scale: 2,
    logging: false,
    useCORS: true,
  }).then((canvas) => {
    const link = document.createElement("a");
    const word = document.getElementById("word").textContent.trim();
    link.download = `${word}-definition.png`;
    link.href = canvas.toDataURL("image/png");
    link.click();
  });
}
