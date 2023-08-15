const searchButton = document.getElementById("searchButton");
const postIdInput = document.getElementById("postIdInput");
const postContainer = document.getElementById("postContainer");
const commentsContainer = document.getElementById("commentsContainer");

function fetchPost(id) {
    return fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)
        .then(response => {
            if (!response.ok) {
                throw new Error("Post not found");
            }
            return response.json();
        });
}

function fetchComments(id) {
    return fetch(`https://jsonplaceholder.typicode.com/posts/${id}/comments`)
        .then(response => response.json());
}

searchButton.addEventListener("click", () => {
    const postId = parseInt(postIdInput.value);
    if (postId >= 1 && postId <= 100) {
        fetchPost(postId)
            .then(post => {
                postContainer.innerHTML = `
                    <h2>Post ${post.id}: ${post.title}</h2>
                    <p>${post.body}</p>
                    <button id="commentsButton">Комментарии</button>
                `;
                const commentsButton = document.getElementById("commentsButton");
                commentsButton.addEventListener("click", () => {
                    fetchComments(post.id)
                        .then(comments => {
                            const commentsHtml = comments.map(comment => `<p><strong>${comment.name}:</strong> ${comment.body}</p>`).join("");
                            commentsContainer.innerHTML = commentsHtml;
                        })
                        .catch(error => {
                            commentsContainer.innerHTML = "<p>Ошибка загрузки комментариев</p>";
                            console.error(error);
                        });
                });
            })
            .catch(error => {
                postContainer.innerHTML = "<p>Ошибкаю, пост не найден</p>";
                commentsContainer.innerHTML = "";
                console.error(error);
            });
    } else {
        postContainer.innerHTML = "<p>Введите ID от 1 до 100</p>";
        commentsContainer.innerHTML = "";
    }
});
