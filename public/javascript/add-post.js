async function addNewPost(event) {
  event.preventDefault();

  const title = document.querySelector('#post-title').value;
  const post_url = document.querySelector('#post-url').value;
  const recipe_text = document.querySelector('#post-description').value;

  const response = await fetch(`/api/post`, {
    method: 'POST',
    body: JSON.stringify({
      title,
      post_url,
      recipe_text
    }),
    headers: {
      'Content-Type': 'application/json'
    }
  });

  if (response.ok) {
    document.location.replace('/');
  } else {
    alert(response.statusText);
  }
}

document.querySelector('.new-post-form').addEventListener('submit', addNewPost);
