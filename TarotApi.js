const searchBar = document.querySelector('.searchBar');
const findButton = document.querySelector('.find');
const picContainer = document.querySelector('#imgContainer');
const nameContainer = document.querySelector('.name');
const descriptionContainer = document.querySelector('.description');
const previousButton = document.querySelector('.previous');
const randomButton = document.querySelector('.random');
const nextButton = document.querySelector('.next');
const zodiacContainer = document.querySelector(`.zodiac`)
const meaningUpContainer = document.querySelector('.meaning-up')
const meaningReverseContainer =document.querySelector(`.meaning-reverse`)

const tarotCardsUrl = 'https://tarotapi.dev/api/v1/cards';
let cardsWithImages = [];
let currentCardIndex = -1;


fetch(tarotCardsUrl)
  .then(response => response.json())
  .then(data => {
    const customImages = {
      "The Magician": "https://images.squarespace-cdn.com/content/v1/6282048f3ddae806d695b4b8/c96a0228-142d-4c97-a1d9-10fd070c0ff7/1-the-magician.jpg?format=1000w",
      "The Fool" : "https://images.squarespace-cdn.com/content/v1/6282048f3ddae806d695b4b8/2513a85e-30d5-4148-9939-3680e77bedd5/0-the-Fool.jpg?format=1000w",
      "The High Priestess" : "https://images.squarespace-cdn.com/content/v1/6282048f3ddae806d695b4b8/ec01b997-14bf-4f0b-9dbd-45f01f4604b0/2-the-high-priestess.jpg?format=1000w",
      "The Empress": "https://images.squarespace-cdn.com/content/v1/6282048f3ddae806d695b4b8/c983f001-86eb-4e35-83e9-db31f5466aab/3-the-empress.jpg?format=1000w",
      "The Emperor": "https://images.squarespace-cdn.com/content/v1/6282048f3ddae806d695b4b8/69b98d88-1945-4633-b7e8-78301e787178/4-the-emperor.jpg?format=1000w",
      "The Hierophant": "https://images.squarespace-cdn.com/content/v1/6282048f3ddae806d695b4b8/f270ff74-8d43-475c-bf99-c75f1f1ad1a9/5-the-heirophant.jpg?format=1000w",
      "The Lovers": "https://images.squarespace-cdn.com/content/v1/6282048f3ddae806d695b4b8/fa9cd98c-6f26-4bef-bf23-8ae95433eabb/6-the-lovers.jpg?format=1000w",
      "The Chariot": "https://images.squarespace-cdn.com/content/v1/6282048f3ddae806d695b4b8/bd1a45e5-df38-4bdb-a5a5-72f9a8f08978/7-the-chariot.jpg?format=1000w",
      "Fortitude": "https://images.squarespace-cdn.com/content/v1/6282048f3ddae806d695b4b8/74730a26-4296-480a-9819-8ffc1f9436b4/8-strength.jpg?format=1000w",
      "The Hermit": "https://images.squarespace-cdn.com/content/v1/6282048f3ddae806d695b4b8/ca03944f-fd4b-485d-8d20-7432a2d008af/9-the-hermit.jpg?format=1000w",
      "Wheel Of Fortune": "https://images.squarespace-cdn.com/content/v1/6282048f3ddae806d695b4b8/a0aa3ac1-4924-4818-b2fe-5ad4f2db44e7/10-wheel-of-fortune.jpg?format=1000w",
      "Justice": "https://images.squarespace-cdn.com/content/v1/6282048f3ddae806d695b4b8/1a8a6507-9ea9-4475-b240-03880348d306/11-justice.jpg?format=1000w",
      "The Hanged Man": "https://images.squarespace-cdn.com/content/v1/6282048f3ddae806d695b4b8/a4e7a49a-fa00-48f0-916a-4e94791b75cd/12-the-hanged-man.jpg?format=1000w",
      "Death": "https://images.squarespace-cdn.com/content/v1/6282048f3ddae806d695b4b8/407dbfa0-4fc5-45cd-8f1d-ddb08945d773/13-death.jpg?format=1000w",
      "Temperance": "https://images.squarespace-cdn.com/content/v1/6282048f3ddae806d695b4b8/97fd4b8d-b870-41a2-affb-b642bcfe731e/14-temperance.jpg?format=1000w",
      "The Devil": "https://images.squarespace-cdn.com/content/v1/6282048f3ddae806d695b4b8/a4792876-26db-43be-9f9c-e04cc0abda62/15-the-devil.jpg?format=1000w",
      "The Tower": "https://images.squarespace-cdn.com/content/v1/6282048f3ddae806d695b4b8/71bcbff8-cfa9-4442-9666-063f4d944150/16-the-tower.jpg?format=1000w",
      "The Star": "https://images.squarespace-cdn.com/content/v1/6282048f3ddae806d695b4b8/5728c266-4ab9-4e33-9e0b-8ef43b9e186e/17-the-star.jpg?format=1000w",
      "The Moon": "https://images.squarespace-cdn.com/content/v1/6282048f3ddae806d695b4b8/8459c6ec-377e-4ed0-9405-8444d0e9b275/18-the-moon.jpg?format=1000w",
      "The Sun": "https://images.squarespace-cdn.com/content/v1/6282048f3ddae806d695b4b8/0a9023d8-e10a-4854-ab7b-fdf93903ef80/19-the-sun.jpg?format=1000w",
      "The Last Judgment": "https://images.squarespace-cdn.com/content/v1/6282048f3ddae806d695b4b8/573fe533-88e2-4448-9e5b-e92c0e60891e/20-judgement.jpg?format=750w",
      "The World": "https://images.squarespace-cdn.com/content/v1/6282048f3ddae806d695b4b8/b3acd622-41bf-4743-aee1-25578d1d57bf/21-the-world.jpg?format=1000w",
      "Page of Wands": "https://images.squarespace-cdn.com/content/v1/6282048f3ddae806d695b4b8/44d6b1be-772d-4474-9c12-18e71cc999d3/Page-of-wands.jpg?format=1000w",
      "Knight of Wands": "https://images.squarespace-cdn.com/content/v1/6282048f3ddae806d695b4b8/90c4a8c5-9a48-4fb3-9827-10c7624d3530/Knight-of-wands.jpg?format=1000w",
      "Queen of Wands": "https://images.squarespace-cdn.com/content/v1/6282048f3ddae806d695b4b8/7dafd6e3-547d-4647-9b96-76f6dd21de40/Queen-of-wands.jpg?format=1000w",
      "King of Wands": "https://images.squarespace-cdn.com/content/v1/6282048f3ddae806d695b4b8/c53e3d85-5dc3-42d1-8f8f-033ba6386be0/King-of-wands.jpg?format=1000w",
      "Ace of Wands": "https://images.squarespace-cdn.com/content/v1/6282048f3ddae806d695b4b8/c1071d78-6d2c-4018-9270-549c546548b2/Ace-of-wands.jpg?format=1000w",
      "Two of Wands": "https://images.squarespace-cdn.com/content/v1/6282048f3ddae806d695b4b8/5eeb42e4-85a5-489e-8ea2-66e6d9b47913/Two-of-wands.jpg?format=1000w",
      "Three of Wands": "https://images.squarespace-cdn.com/content/v1/6282048f3ddae806d695b4b8/ff90ebe6-9f18-4120-8c4c-5edc5703a098/Three-of-wands.jpg?format=1000w",
      "Four of Wands": "https://images.squarespace-cdn.com/content/v1/6282048f3ddae806d695b4b8/51b380fd-31c9-4210-a439-f96f12971bc7/Four-of-wands.jpg?format=1000w",
      "Five of Wands": "https://images.squarespace-cdn.com/content/v1/6282048f3ddae806d695b4b8/02550e20-0c1b-4414-b494-d97fe63e851b/Five-of-wands.jpg?format=1000w",
      "Six of Wands": "https://images.squarespace-cdn.com/content/v1/6282048f3ddae806d695b4b8/66a628ed-de9a-4bc7-ac94-8fa7fa3b7589/Six-of-wands.jpg?format=1000w",
      "Seven of Wands": "https://images.squarespace-cdn.com/content/v1/6282048f3ddae806d695b4b8/dc9f1ba9-2f8a-4b9a-85ab-21132fcb5f4b/Seven-ofwands.jpg?format=1000w",
      "Eight of Wands": "https://images.squarespace-cdn.com/content/v1/6282048f3ddae806d695b4b8/223d65ba-7ffe-40a4-964a-711dda3bdd17/Eight-of-wands.jpg?format=1000w",
      "Nine of Wands": "https://images.squarespace-cdn.com/content/v1/6282048f3ddae806d695b4b8/87232d05-d933-4dd1-a9af-d1d0d7733e52/Nine-of-wands.jpg?format=1000w",
      "Ten of Wands": "https://images.squarespace-cdn.com/content/v1/6282048f3ddae806d695b4b8/07c6962c-ad0c-441b-9622-96b42a7a50b0/Ten-of-wands.jpg?format=1000w",
      "Page of Cups": "https://images.squarespace-cdn.com/content/v1/6282048f3ddae806d695b4b8/f8e43794-4c25-4255-b63b-37fe41dcb67e/Page-of-cups.jpg?format=1000w",
      "Knight of Cups": "https://images.squarespace-cdn.com/content/v1/6282048f3ddae806d695b4b8/d391776b-e052-4f9f-9da4-db6a51aef950/Knight-of-cups.jpg?format=1000w",
      "Queen of Cups": "https://images.squarespace-cdn.com/content/v1/6282048f3ddae806d695b4b8/218d9829-96b6-4d50-80f6-78419d081792/Queen-of-cups.jpg?format=1000w",
      "King of Cups": "https://images.squarespace-cdn.com/content/v1/6282048f3ddae806d695b4b8/f1bbc77f-7838-4cc9-9325-7f6c61ab610a/King-of-cups.jpg?format=1000w",
      "Ace of Cups": "https://images.squarespace-cdn.com/content/v1/6282048f3ddae806d695b4b8/2ffcfd93-0bf0-4d27-ac2a-a01af21a76dc/Ace-of-cups.jpg?format=1000w",
      "Two of Cups": "https://images.squarespace-cdn.com/content/v1/6282048f3ddae806d695b4b8/4bc24747-44bd-4131-99aa-9cf0bc21803c/2-of-cups.jpg?format=1000w",
      "Three of Cups": "https://images.squarespace-cdn.com/content/v1/6282048f3ddae806d695b4b8/9ea0b9f8-6ad3-4742-a3dc-811d018b2651/3-of-cups.jpg?format=1000w",
      "Four of Cups": "https://images.squarespace-cdn.com/content/v1/6282048f3ddae806d695b4b8/500373e5-c416-4759-8c20-d5be381556b5/4-of-cups.jpg?format=1000w",
      "Five of Cups": "https://images.squarespace-cdn.com/content/v1/6282048f3ddae806d695b4b8/3ff28187-7600-46dc-ace8-e1dc5651586c/5-of-cups.jpg?format=1000w",
      "Six of Cups": "https://images.squarespace-cdn.com/content/v1/6282048f3ddae806d695b4b8/2b09c678-696c-4173-b700-c367151a0654/6-of-cups.jpg?format=1000w",
      "Seven of Cups": "https://images.squarespace-cdn.com/content/v1/6282048f3ddae806d695b4b8/2adb63b1-c418-4f17-9e3c-dc8c56636bf3/7-of-cups.jpg?format=1000w",
      "Eight of Cups": "https://images.squarespace-cdn.com/content/v1/6282048f3ddae806d695b4b8/a3ddde00-6adc-4b19-890e-ba5f5e100ecc/8-of-cups.jpg?format=1000w",
      "Nine of Cups": "https://images.squarespace-cdn.com/content/v1/6282048f3ddae806d695b4b8/3b6a935a-2fac-475b-a216-a172f799586a/9-of-cups.jpg?format=1000w",
      "Ten of Cups": "https://images.squarespace-cdn.com/content/v1/6282048f3ddae806d695b4b8/ab8e7b65-072f-4fe3-a0dc-e17293cde773/10-of-cups.jpg?format=1000w",
      "Page of Pentacles": "https://images.squarespace-cdn.com/content/v1/6282048f3ddae806d695b4b8/57674448-33ca-4c5c-9bd0-196c7c5859a9/Page-of-pentacles.jpg?format=1000w",
      "Knight of Pentacles": "https://images.squarespace-cdn.com/content/v1/6282048f3ddae806d695b4b8/5de1b615-e393-4289-9cc6-18a4ac23e9c0/Knight-of-pentacles.jpg?format=500w",
      "Queen of Pentacles": "https://images.squarespace-cdn.com/content/v1/6282048f3ddae806d695b4b8/5c394b12-5937-4a84-bbfa-9374d7564b2d/Queen-of-pentacles.jpg?format=500w",
      "King of Pentacles": "https://images.squarespace-cdn.com/content/v1/6282048f3ddae806d695b4b8/1ddd6453-46d3-4519-b9ec-f12690360b85/King-of-pentacles.jpg?format=500w",
      "Ace of Pentacles": "https://images.squarespace-cdn.com/content/v1/6282048f3ddae806d695b4b8/b798dabb-dfa2-4a5d-8405-26d877333b84/Ace-of-pentacles.jpg?format=500w",
      "Two of Pentacles": "https://images.squarespace-cdn.com/content/v1/6282048f3ddae806d695b4b8/9bd36fd9-f025-482c-8125-4dcc7e69c0e8/2-of-pentacles.jpg?format=500w",
      "Three of Pentacles": "https://images.squarespace-cdn.com/content/v1/6282048f3ddae806d695b4b8/4adec704-ffcd-44ad-b699-a039df6a5e9b/3-of-pentacles.jpg?format=500w",
      "Four of Pentacles": "https://images.squarespace-cdn.com/content/v1/6282048f3ddae806d695b4b8/afa12ecf-1a27-4b58-88b7-11345aba5eb6/4-of-pentacles.jpg?format=500w",
      "Five of Pentacles": "https://images.squarespace-cdn.com/content/v1/6282048f3ddae806d695b4b8/24a7d6ee-a588-4f78-9020-9d3526861d43/5-of-pentacles.jpg?format=500w",
      "Six of Pentacles": "https://images.squarespace-cdn.com/content/v1/6282048f3ddae806d695b4b8/0f48f819-3a03-4067-8858-698bdb45e906/6-of-pentacles.jpg?format=500w",
      "Seven of Pentacles": "https://images.squarespace-cdn.com/content/v1/6282048f3ddae806d695b4b8/64549e86-038a-40dd-8eac-57635bcc7782/7-of-pentacles.jpg?format=500w",
      "Eight of Pentacles": "https://images.squarespace-cdn.com/content/v1/6282048f3ddae806d695b4b8/c0b3fac8-7a4d-4a7a-8c3e-03671888eef4/8-of-pentacles.jpg?format=750w",
      "Nine of Pentacles": "https://images.squarespace-cdn.com/content/v1/6282048f3ddae806d695b4b8/509d1e0d-ca4c-4f02-b0fe-763fc6ecd2b6/9-of-pentacles.jpg?format=750w",
      "Ten of Pentacles": "https://images.squarespace-cdn.com/content/v1/6282048f3ddae806d695b4b8/a9f2ec34-e379-48c5-ac09-00c9f41e52e0/10-of-pentacles.jpg?format=750w",
      "Page of Swords": "https://images.squarespace-cdn.com/content/v1/6282048f3ddae806d695b4b8/bdf04c48-2262-4d36-b4bf-d96ee166afc6/Page-of-swords.jpg?format=750w",
      "Knight of Swords": "https://images.squarespace-cdn.com/content/v1/6282048f3ddae806d695b4b8/be70fa29-3ced-49fa-9f81-15d19c8597c3/Knight-of-swords.jpg?format=750w",
      "Queen of Swords": "https://images.squarespace-cdn.com/content/v1/6282048f3ddae806d695b4b8/e692898c-659c-4a59-9b24-7825cc9fa37e/Queen-of-swords.jpg?format=750w",
      "King of Swords": "https://images.squarespace-cdn.com/content/v1/6282048f3ddae806d695b4b8/bbcc1d32-4605-4208-890f-d23a1d3cdaae/King-of-swords.jpg?format=750w",
      "Ace of Swords": "https://images.squarespace-cdn.com/content/v1/6282048f3ddae806d695b4b8/1b905adf-ff5a-4e11-b1ef-65325d1791af/Ace-of-swords.jpg?format=750w",
      "Two of Swords": "https://images.squarespace-cdn.com/content/v1/6282048f3ddae806d695b4b8/6e2f51e4-a6ca-4391-840f-586381b52bf2/2-of-swords.jpg?format=750w",
      "Three of Swords": "https://images.squarespace-cdn.com/content/v1/6282048f3ddae806d695b4b8/f1169791-e7a8-414b-9790-c30d35fa05eb/3-of-swords.jpg?format=750w",
      "Four of Swords": "https://images.squarespace-cdn.com/content/v1/6282048f3ddae806d695b4b8/d2260364-e24c-40c3-8275-f70a8388df15/4-of-swords.jpg?format=750w",
      "Five of Swords": "https://images.squarespace-cdn.com/content/v1/6282048f3ddae806d695b4b8/5e4efa6f-20e1-4182-8e20-d5ac540476c7/5-of-swords.jpg?format=750w",
      "Six of Swords": "https://images.squarespace-cdn.com/content/v1/6282048f3ddae806d695b4b8/59a29771-d596-4b44-94b0-f1cb8d29e9de/6-of-swords.jpg?format=750w",
      "Seven of Swords": "https://images.squarespace-cdn.com/content/v1/6282048f3ddae806d695b4b8/04e05889-4c9f-4400-8004-db773a8c9967/7-of-swords.jpg?format=750w",
      "Eight of Swords": "https://images.squarespace-cdn.com/content/v1/6282048f3ddae806d695b4b8/d910d2fd-7fd0-44c1-8a01-fb0741e63226/8-of-swords.jpg?format=750w",
      "Nine of Swords": "https://images.squarespace-cdn.com/content/v1/6282048f3ddae806d695b4b8/f41380e0-7583-4aeb-8d7b-1067f260a575/9-of-swords.jpg?format=750w",
      "Ten of Swords": "https://images.squarespace-cdn.com/content/v1/6282048f3ddae806d695b4b8/ba227e6f-bb67-4dc1-b1f3-84124cd29ab1/10-of-swords.jpg?format=750w",
    };
    const zodiacData = {
        "The Fool": "Aquarius",
        "The Magician": "Gemini",
        "The High Priestess": "Cancer",
        "The Empress": "Taurus",
        "The Emperor": "Aries",
        "The Hierophant": "Taurus",
        "The Lovers": "Gemini",
        "The Chariot": "Cancer",
        "Fortitude": "Leo",
        "The Hermit": "Virgo",
        "Wheel Of Fortune": "Sagittarius/Pisces",
        "Justice": "Libra",
        "The Hanged Man": "Pisces",
        "Death": "Scorpio",
        "Temperance": "Sagittarius",
        "The Devil": "Capricorn",
        "The Tower": "Aries/Scorpio",
        "The Star": "Aquarius",
        "The Moon": "Pisces",
        "The Sun": "Leo",
        "The Last Judgement": "Scorpio",
        "The World": "Capricorn/Aquarius",
        "Page of Wands": "Aries/Sagittarius",
        "Knight of Wands": "Sagittarius",
        "Queen of Wands": "Leo",
        "King of Wands": "Aries/Leo",
        "Ace of Wands": "Aries",
        "Two of Wands": "Aries",
        "Three of Wands": "Aries",
        "Four of Wands": "Aries",
        "Five of Wands": "Leo",
        "Six of Wands": "Leo",
        "Seven of Wands": "Leo",
        "Eight of Wands": "Sagittarius",
        "Nine of Wands": "Sagittarius",
        "Ten of Wands": "Sagittarius",
        "Page of Cups": "Pisces/Cancer",
        "Knight of Cups": "Pisces/Scorpio",
        "Queen of Cups": "Pisces/Cancer",
        "King of Cups": "Pisces",
        "Ace of Cups": "Pisces/Cancer/Scorpio",
        "Two of Cups": "Cancer",
        "Three of Cups": "Cancer ",
        "Four of Cups": "Cancer",
        "Five of Cups": "Scorpio",
        "Six of Cups": "Scorpio",
        "Seven of Cups": "Scorpio",
        "Eight of Cups": "Pisces",
        "Nine of Cups": "Pisces",
        "Ten of Cups": "Pisces",
        "Page of Pentacles": "Taurus",
        "Knight of Pentacles": "Capricorn/Virgo/Taurus",
        "Queen of Pentacles": "Capricorn",
        "King of Pentacles": "Taurus/Capricorn",
        "Ace of Pentacles": "Capricorn/Virgo/Taurus",
        "Two of Pentacles": "Capricorn",
        "Three of Pentacles": "Capricorn",
        "Four of Pentacles": "Capricorn",
        "Five of Pentacles": "Taurus",
        "Six of Pentacles": "Taurus",
        "Seven of Pentacles": "Taurus",
        "Eight of  Pentacles": "Virgo",
        "Nine of Pentacles": "Virgo",
        "Ten of Pentacles": "Virgo",
        "Page of Swords": "Aquarius/Libra/Gemini",
        "Knight of Swords": "Aquarius",
        "Queen of Swords": "Libra",
        "King of Swords": "Libra/Aquarius",
        "Ace of Swords": "Aquarius",
        "Two of Swords": "Libra",
        "Three of Swords": "Libra",
        "Four of Swords": "Libra",
        "Five of Swords": "Aquarius",
        "Six of Swords": "Aquarius",
        "Seven of Swords": "Aquarius",
        "Eight of Swords": "Gemini",
        "Nine of Swords": "Gemini",
        "Ten of Swords": "Gemini",
      };



    cardsWithImages = data.cards.map(card => ({
      ...card,
      image: customImages[card.name] || card.image,
      zodiac: zodiacData[card.name] || "N/A"
    }));
  })
  .catch(error => {
    console.error('Error fetching the tarot cards:', error);
  });

function displayCard(card) {
  picContainer.src = card.image;
  picContainer.alt = card.name;
  nameContainer.textContent = card.name;
  descriptionContainer.textContent = card.desc;
  zodiacContainer.textContent =  card.zodiac;
  meaningUpContainer.textContent = card.meaning_up;
  meaningReverseContainer.textContent = card.meaning_rev;
}

findButton.addEventListener('click', () => {
  const searchValue = searchBar.value.trim()-1;
  
  const cardIndex = parseInt(searchValue, 10);
  
  if (!isNaN(cardIndex) && cardIndex >= 0 && cardIndex < cardsWithImages.length) {
    currentCardIndex = cardIndex;
    displayCard(cardsWithImages[currentCardIndex]);
  } else {
    alert(`Please enter a valid number between 0 and ${cardsWithImages.length - 1}.`);
  }
});




// function displayCard(index) {
//     if (index >= 0 && index < cardsWithImages.length) {
//       const card = cardsWithImages[index];
//       nameContainer.textContent = card.name;
//       descriptionContainer.textContent = card.description;
//       picContainer.src = customImages[card.name] || card.image; // Use custom image if available
//       zodiacContainer.textContent = zodiacData[card.name] || "Unknown";
//       meaningUpContainer.textContent = card.meaning_up || "No Meaning Up";
//       meaningReverseContainer.textContent = card.meaning_reversed || "No Meaning Reversed";
//     }
//   }
  
//   // Search functionality
//   findButton.addEventListener('click', () => {
//     const searchQuery = searchBar.value.toLowerCase();
//     const cardIndex = cardsWithImages.findIndex(card => card.name.toLowerCase() === searchQuery);
    
//     if (cardIndex !== -1) {
//       currentCardIndex = cardIndex; // Update the current card index
//       displayCard(currentCardIndex); // Display the found card
//     } else {
//       alert("Card not found!"); // Optional: alert if card isn't found
//     }
//   });








  searchBar.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      findButton.click();
    }
  });



randomButton.addEventListener('click', () => {
  currentCardIndex = Math.floor(Math.random() * cardsWithImages.length);
  displayCard(cardsWithImages[currentCardIndex]);
});

previousButton.addEventListener('click', () => {
  if (currentCardIndex > 0) {
    currentCardIndex--;
    displayCard(cardsWithImages[currentCardIndex]); 
  } else {
    alert("You are at the first card.");
  }
});

nextButton.addEventListener('click', () => {
  if (currentCardIndex < cardsWithImages.length - 1) {
    currentCardIndex++;
    displayCard(cardsWithImages[currentCardIndex]);
  } else {
    alert("You are at the last card.");
  }
});
