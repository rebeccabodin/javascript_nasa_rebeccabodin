//en referens till input
const inputName = document.querySelector('#input-name');
// console.log(inputName);

// När jag klickar på knappen ska innehållet i inputrutan hämtas och visas i h3
const btnSubmit = document.querySelector('#btn-submit');
// console.log(btnSubmit);

//referens till h3 (contst för att den inte kommer att ändra på sig)
const textInput = document.querySelector('#text-input');
// console.log(textInput);

//referens till switchen för att byta till dark/lightmode
const switchBtn = document.querySelector('#switch-btn');
// console.log(switchBtn);
const bodyRef = document.querySelector('body');

//lyssnare på switchBtn
switchBtn.addEventListener('click', () => {
    //vad ska hända vid klick?
    // console.log('klick');
    //lägga till klassen dark (toggle = switchar när man klickar - läggs till och tas bort)
    bodyRef.classList.toggle('dark');
})

// lyssnare som lyssnar efter när user släpper upp en key (en tangent på tangentbordet)
inputName.addEventListener('keyup', () => {
    // vad som händer när user släpper upp en key
    // console.log('du skrev något i input');
    // hämta värdet i input
    // console.log(inputName.value);
    // hämta längden på värdet i input
    // console.log(inputName.value.length);
    let getValueLength = inputName.value.length;
    // kontrollera så att user har skrivit in minst 3 tecken
    if (getValueLength > 2){
        // console.log('mer än 2');
        //btn ska bli enabled
        btnSubmit.disabled = false;
    }else{
        // console.log('mindre än 2');
        //btn ska bli disabled
        btnSubmit.disabled = true;
    }
});

// lyssnare som lyssnar efter när input är i focus
inputName.addEventListener('focus', () => {
    // vad ska hända när input är i fokus
    // console.log('du står i input');
    // lägga till classen focusBorder
    inputName.classList.toggle('focusBorder');
});
// för att focusBorder ska tas bort när user klickar utanför inputfältet igen
inputName.addEventListener('blur', () => {
    // vad ska hända när input är i fokus
    // console.log('du står utanför input');
    // lägga till classen focusBorder
    inputName.classList.toggle('focusBorder');
});

//skapa en lyssnare för btn
btnSubmit.addEventListener('click', (event) => {
    // för att stänga av default beteende (som är att skicka iväg formuläret) så att jag kan se vad som står i konsollen 
    event.preventDefault();
    // console.log('du klickade på knappen');
    // för att referera till h3, lägga till text in den och texten ska komma från inputfältet
    textInput.textContent = inputName.value;
    // för att rensa inputrutan på text
    inputName.value = '';
    // för att kontrollera om inputfältet är tomt och då ska knappen sättas till disabled
    if (inputName.value === ''){
        // om det är tomt 
        // console.log('tomt');
        //btn ska bli disabled
        btnSubmit.disabled = true;
    }
});

// API key: TsHiPs1TbvBXtNZhjN7sljSAg3CdrEDMqspNkuwY
// Länken: //https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos

const apiUrl = 'https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1000&api_key=TsHiPs1TbvBXtNZhjN7sljSAg3CdrEDMqspNkuwY';
const apiKey = 'TsHiPs1TbvBXtNZhjN7sljSAg3CdrEDMqspNkuwY';

//fetch för att hämta data
//första then gör om till json
//andra then är vad som ska göras med datan
fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
        //det som händer med datan
        // console.log(data.photos);
        const imagesMars = data.photos;
        const cardContainer = document.querySelector('.cards');
        //kontoll om det finns data-innehåll i arrayen (!== 0 är lika med skiljer sig från 0)
        if(imagesMars.length !== 0){
            // console.log('finns data');

            // för att brgränsa datan till 4
            const dataLimit = imagesMars.slice(0, 4);

            //loop för att loopa igenom data
            dataLimit.forEach(imageMars => {
                // för varje item i arrayen
                // console.log(imageMars);
                // anropa en funk som skapar upp ett nytt kort
                //skickar med imageMars in i funktionen
                const newCard = createCard(imageMars);
                // lägger till det nya kortet i  kontainer
                cardContainer.append(newCard);
            })
        }else{
            // när det inte finns data
            // console.log('Det finns ingen data');
            alert("Tyvärr, det finns ingen data just nu.");
        }
        //fånga upp om det blir fel i fetch:
    }).catch(error => console.log(`Detta är felet: ${error}`));

//funktion som skapar upp ett nytt kort
//innanför paranteserna skickas datan in som kommer från createCard anropet
function createCard(imageMars){
    // det som ska ske för att skapa ett nytt kort
    // console.log('createCard körs');
    // console.log(imageMars);

    // skapa upp nya html-element
    const article = document.createElement('article');
    const imgContainer = document.createElement('div');
    const h4 = document.createElement('h4');
    const img = document.createElement('img');
    const date = document.createElement('p');

    // för att lägga till klass på element
    article.classList.add('card');
    imgContainer.classList.add('imgContainer');

    // lägger till element i article
    article.append(imgContainer);

    // lägger till element i imgConatiner
    imgContainer.append(h4);
    imgContainer.append(img);
    imgContainer.append(date);

    //lägger till text i h4
    h4.textContent = imageMars.rover.name;

    //lägger till src i img
    img.src = imageMars.img_src;

    //lägger till datum i p
    date.textContent = imageMars.earth_date;

    // console.log(article);
    // skicka tillbaka det nya kortet till loopen
    return article;
}