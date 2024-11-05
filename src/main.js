import { backEndData } from "./js/pixabay-api.js";
import { markupCard } from "./js/render-functions.js";
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const gallery = document.querySelector('.gallery');
const form = document.querySelector('.searchImg');
const showMoreBtn = document.querySelector('.show-more');
const perPage = 15;
let pageCount;
let imagesShown;
let currentItemCounter;

const iziWarning = () => iziToast.show({
    message: "Input is empty!",
    position: "topRight",
    icon: 'ico-warning',
    backgroundColor: "orangered",
    messageSize: "16",
    messageColor: "#fff",
    theme: "dark",
    maxWidth: "350px",
});
const iziError = () => iziToast.show({
    message: "Sorry, there are no images matching your search query. Please try again!",
    position: "topRight",
    backgroundColor: "#EF4040",
    messageSize: "16",
    messageColor: "#fff",
    theme: "dark",
    maxWidth: "350px",
    icon: "ico-error",
});
const iziInfo = () => iziToast.info({
    message: "We're sorry, but you've reached the end of search results.",
    position: "topRight",
    messageSize: "16",
    messageColor: "#fff",
    theme: "dark",
    maxWidth: "350px",
    backgroundColor: "#4e75ff",

});

const lightbox = new SimpleLightbox('.gallery a', {
    captions: true,
    captionsData: 'alt',
    captionPosition: 'bottom',
    captionDelay: 250,
});

const loader = () => document.querySelector("span").classList.toggle("loader");
let searchText = '';

const handleForm = async (event) => {
    event.preventDefault();
    pageCount = 1;
    imagesShown = perPage;
    showMoreBtn.classList.add("hidden");
    searchText = form.elements.searchText.value.toLowerCase().trim()
    if (!searchText) return iziWarning();
    gallery.innerHTML = "";
    loader();
    try {
        const takenData = await backEndData(searchText, perPage, pageCount)
        if (!takenData.hits.length) return iziError();
        gallery.insertAdjacentHTML("beforeend", markupCard(takenData.hits).join(""));
        lightbox.refresh();
        if (takenData.totalHits >= imagesShown) showMoreBtn.classList.remove("hidden");
    }
    catch (e) { console.log(e); }
    finally {
        loader()
        form.reset();
    }
};


const showMoreImages = async () => {
    currentItemCounter = gallery.childElementCount;
    pageCount++;
    imagesShown = perPage * pageCount;
    loader();
    showMoreBtn.classList.add("hidden");
    try {
        const updateData = await backEndData(searchText, perPage, pageCount)
        gallery.insertAdjacentHTML("beforeend", markupCard(updateData.hits).join(""));
        lightbox.refresh();
        scrollToNewImages();
        if (updateData.totalHits > imagesShown) showMoreBtn.classList.remove("hidden");
        else iziInfo();
    }
    catch (e) { console.log(e) }
    finally { loader() }
};
const scrollToNewImages = () => {
    // const galleryItemHeight = gallery.querySelector('.card').getBoundingClientRect().height;
    // window.scrollBy({
    //     top: currentItemCounter,
    //     // top: galleryItemHeight * 2,
    //     behavior: 'smooth'
    // });
    const firstNewItem = gallery.children[currentItemCounter];
    firstNewItem.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
    });
}

form.addEventListener('submit', handleForm);
showMoreBtn.addEventListener('click', showMoreImages);