const newPostHandler = async (event) => {
  event.preventDefault();
  const title = document.querySelector("#postTitle").value.trim();
  const post_content = document.querySelector("#postContent").value.trim();

  if (title && post_content) {
    const response = await fetch("/api/posts", {
      method: "POST",
      body: JSON.stringify({
        title,
        post_content,
      }),
      headers: { "Content-Type": "application/json" },
    });
    if (response.ok) {
      document.location.replace("/");
    } else {
      alert(response.statusText);
    }
  }
};

document.querySelector(".post-form").addEventListener("submit", newPostHandler);

// const delButtonHandler = async (event) => {
//   if (event.target.hasAttribute("data-id")) {
//     const id = event.target.getAttribute("data-id");

//     const response = await fetch(`/api/posts/${id}`, {
//       method: "DELETE",
//     });

//     if (response.ok) {
//       document.location.replace("/profile");
//     } else {
//       alert("Failed to delete project");
//     }
//   }
// };

// document
//   .querySelector("#delete-btn")
//   .addEventListener("click", delButtonHandler);
