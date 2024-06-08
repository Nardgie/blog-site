const commentHandler = {    
    // Function to handle the comment form submission
    newCommentHandler: async (event) => {
        event.preventDefault();
        const comment_text = document
          .querySelector("#comment-content-1")
          .value.trim();
        const post_id = document.querySelector("#postID").value.trim();
        
        if (comment_text && post_id) {
            const response = await fetch("/api/comments", {
                method: "POST",
                body: JSON.stringify({
                    comment_text,
                    post_id,
                }),
                headers: { "Content-Type": "application/json" },
            });
            if (response.ok) {
                document.location.reload();
            } else {
                alert(response.statusText);
            }
        }
    }
}