document
  .getElementById("postsContainer")
  .addEventListener("click", async (event) => {
    event.preventDefault();
    
    if (event.target.className === "likeButton") {
      
      const likeCounter = event.path[1].childNodes[7].childNodes[1]
      const id = event.path[1].id;
      const response = await fetch(`posts/vote/${id}`);
      const result  = await response.json();
      likeCounter.innerText = `Likes: ${result.likes}`
    }
  });



  