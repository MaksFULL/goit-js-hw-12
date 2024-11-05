export const markupCard = array =>
    array.map(
        ({
            webformatURL,
            largeImageURL,
            tags,
            likes,
            views,
            comments,
            downloads,
        }) => `
<li class="card">
<a href="${largeImageURL}">
<img src="${webformatURL}" class="image" height="200px" width="360px" alt="${tags}" />
</a>
<div class="informations">
    <div class="current-info">
    <p class="title-info">Likes</p>
    <p class="count">${likes}</p>
  </div>
  <div class="current-info">
    <p class="title-info">Views</p>
    <p class="count">${views}</p>
  </div>
  <div class="current-info">
      <p class="title-info">Comments</p>
      <p class="count">${comments}</p>
  </div>
  <div class="current-info">
      <p class="title-info">Downloads</p>
      <p class="count">${downloads}</p>
  </div>
</div>
</li>`
    );