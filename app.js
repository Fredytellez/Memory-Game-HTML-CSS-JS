const cards = document.querySelectorAll(".card");

let matchCard = 0;
let cardOne, cardTwo;
let disableDeck = false; // no permite que se elijan mas de 2 cartas sin verificar si coinciden o no.

function flipCard(e) {
  let clickedCard = e.target; //para añadir una clase al elemento que el usuario da click
  if (clickedCard !== cardOne && !disableDeck) {
    clickedCard.classList.add("flip");
    if (!cardOne) {
      //retorna el valor de cardOne para clickCard
      return (cardOne = clickedCard);
    }
    cardTwo = clickedCard;
    disableDeck = true; //no permite que se elijan mas de 2 cartas sin verificar si coinciden o no.
    let cardOneImg = cardOne.querySelector("img").src,
      cardTwoImg = cardTwo.querySelector("img").src;
    matchCards(cardOneImg, cardTwoImg);
  }
}

function matchCards(img1, img2) {
  //si las dos cartas img coinciden
  if (img1 === img2) {
    matchCard++; //Incrementa el valor de la coincidencia en 1
    // Si el valor de la coincidencia es 8 esto significa que el usuario coincidio todas las cartas(8 * 2 = 16)
    if (matchCard == 8) {
      setTimeout(() => {
        return shuffleCard();
      }, 1000); // Llama a la funcion shuffleCard después de un segundo
    }
    cardOne.removeEventListener("click", flipCard);
    cardTwo.removeEventListener("click", flipCard);
    cardOne = cardTwo = ""; // configura el valor en blanco para ambas cartas
    disableDeck = false; //no permite que se elijan mas de 2 cartas sin verificar si coinciden o no.
    return; //reinicia el valor
  }
  // Si las dos cartas no coinciden
  setTimeout(() => {
    // Añade la clase Shake a las dos cartas despues de 400milisegundos
    cardOne.classList.add("shake");
    cardTwo.classList.add("shake");
  }, 400);

  setTimeout(() => {
    // retira las clases shake y flip de las dos cartas despues de 1.2 segundos
    cardOne.classList.remove("shake", "flip");
    cardTwo.classList.remove("shake", "flip");
    cardOne = cardTwo = ""; // configura el valor en blanco para ambas cartas
    disableDeck = false; // no permite que se elijan mas de 2 cartas sin verificar si coinciden o no.
  }, 1200);
}

function shuffleCard() {
  matchCard = 0;
  cardOne = cardTwo = "";
  disableDeck = false;
  //Crea un array de 16 items y cada item es repetido dos veces
  let arr = [1, 2, 3, 4, 5, 6, 7, 8, 1, 2, 3, 4, 5, 6, 7, 8];
  arr.sort(() => (Math.random() > 0.5 ? 1 : -1)); //clasifica el array de items aleatoriamente

  // remueve la clase flip de todas las cartas pasando por la imagen aleatoria de cada carta
  cards.forEach((card, index) => {
    card.classList.remove("flip");
    let imgTag = card.querySelector("img");
    imgTag.src = `Assets/img-${arr[index]}.png`;
    card.addEventListener("click", flipCard);
  });
}

shuffleCard();

cards.forEach((card) => {
  //Añade el evento click a todas las cartas
  card.addEventListener("click", flipCard);
});
