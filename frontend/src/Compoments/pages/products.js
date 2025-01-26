import ErosTheBittersweetImage from './images/ErosTheBittersweet.jfif';  // Relative path from products.js
import Zwgr from './images/IstoriesZwgrafikhs.jpg';  // Correct path
import Fiamma from './images/La-misteriosa-fiamma-della-Regina-Loana.jpg';  // Correct path
import Yokai from './images/SevenJapaneseTales.jpeg';  // Correct path
import Asia from './images/SouthEastAsiaAnarchy.jpg';  // Correct path
import Island from './images/TheIslandOfTheDayBefore.jpg';  // Correct path
import Land from './images/LegendaryLands.jpg';  // Correct path
import Beauty from './images/OnBeauty.jpg';  // Correct path


export const products = [
{
    id: 1,
    name:'Eros the Bittersweet',
    price: 12,
    image: ErosTheBittersweetImage,
    description:'The book traces the concept of eros in ancient Greece through its representations in writings of the time.',
    slug:'eros-the-bittersweet'
},

{
    id: 2,
    name:'Stories of Painting',
    price: 19.88,
    image: Zwgr,
    description:'Daniel Arasse takes the reader on a journey through the history of art from the invention of perspective to the disappearance of the motif.',
    slug:'histories-of-painting'
}

,

{
    id: 3,
    name:'The mysterious flame of Queen Loana',
    price: 18.99,
    image: Fiamma,
    description:' The book is  a literary exploration of the traditional phenomenon whereby a persons life flashes before him or her, as a 59-year-old Milanese antiquarian book dealer( who has lost his episodic memory due to a stroke) struggles to regain the one memory he seeks above all others: the face of the girl he loved ever since he was a student.',
    slug:'regina-loana'
},

{
    id: 4,
    name:'Legendary Lands',
    price: 16.99,
    image: Land,
    description:' Legendary lands and places are of various kinds and have only one characteristic in common: whether they depend on ancient legends whose origins are lost in the mists of time or whether they are an effect of a modern invention, they have created flows of belief.',
    slug:'legendary'
}
,

{
    id: 5,
    name:'Seven Japanese Tales',
    price: 17.99,
    image: Yokai,
    description:'Junichiro Tanizakis Seven Japanese Tales collects stories that explore the boundary at which love becomes self-annihilation, where the contemplation of beauty gives way to fetishism, and where tradition becomes an instrument of voluptuous cruelty.',
    slug:'tanizaki'
},

{
    id: 6,
    name:'The art of not being governed',
    price: 27.99,
    image:  Asia ,
    description:'An anti-history of human civilization',
    slug:'zomia'
},
{
    id: 7,
    name:'The island of the day before',
    price: 15.99,
    image:  Island,
    description:'another extended meditation on the subjective nature of reality that demonstrates the deceptive nature of all signs and metaphors. Eco presents his historical romance as the collected letters of Roberto de La Griva, a shipwrecked 17th-century nobleman who becomes stranded on an abandoned ship, the Daphne, anchored off a mysterious Pacific island. With no way of locating himself or finding a way home, Roberto abandons himself to philosophical contemplation, roaming the crewless ship and composing letters to his beloved Lilia, a woman he has admired from afar.',
    slug:'zomia'
},
{
    id: 8,
    name:'On Beauty',
    price: 20,
    image: Beauty ,
    description:'The book On Beauty by Umberto Eco explores the concept of beauty and its significance in human culture and society. It is a philosophical exploration of the various dimensions of beauty, ranging from art and aesthetics to personal appearance and the role of beauty in social interactions.',
    slug:'beauty'
}


];