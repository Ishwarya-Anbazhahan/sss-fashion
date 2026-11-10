// Images come from sssfashions.store. To host them yourself, run download-images.sh
// and change BASE to "/images/".
export const BASE = "/images/";
export const img = (file) => BASE + file;

export const products = [
  { id: 1, ta: "கோவில் ஹாரம்", name: "Temple Haram", category: "Gold", image: img("haram.jpg"), text: "Worn on the neck over a Kanjivaram through the muhurtham, with goddess and peacock work falling to the chest." },
  { id: 2, ta: "காசு மாலை", name: "Kasu Malai", category: "Gold", image: img("kasu.jpg"), text: "Worn on the neck at a Tamil wedding, a garland of Lakshmi coins that rests flat against the collarbone and chest." },
  { id: 3, ta: "ஒட்டியாணம்", name: "Oddiyanam", category: "Gold", image: img("oddiyanam.jpg"), text: "Clasped at the waist over a bridal saree or madisar, and left on through the oonjal." },
  { id: 4, ta: "ஜிமிக்கி", name: "Jimikki", category: "Gold", image: img("jimikki.jpg"), text: "Worn on the ear for the wedding day, bell jhumkas with a drop that moves when the bride turns." },
  { id: 5, ta: "வங்கி", name: "Vanki", category: "Gold", image: img("vanki.jpg"), text: "Worn on the upper arm, one on each side, with the temple set at the muhurtham." },
  { id: 6, ta: "முத்து மாலை", name: "Muthu Malai", category: "Gold", image: img("muthu.jpg"), text: "A pearl strand worn on the neck for a temple visit, and under the heavier gold at the wedding." },
  { id: 7, ta: "லட்சுமி ஹாரம்", name: "Lakshmi Haram", category: "Gold", image: img("lakshmi.jpg"), text: "Worn on the neck, the Lakshmi pendant sitting at the chest over the bridal silk." },
  { id: 8, ta: "கொலுசு", name: "Kolusu", category: "Silver", image: img("kolusu.jpg"), text: "Sterling silver anklets worn on the ankle for a temple Friday and the walk into the wedding hall." },
  { id: 9, ta: "மெட்டி", name: "Metti", category: "Silver", image: img("metti.jpg"), text: "Toe rings worn on the second toe from the wedding morning onward." },
  { id: 10, ta: "சிலம்பு", name: "Silambu", category: "Silver", image: img("silambu.jpg"), text: "A heavier hollow anklet worn on the ankle, the kind that sounds on the way into a temple." },
  { id: 11, ta: "பூ ஜடை", name: "Poo Jadai", category: "Silver", image: img("poojadai.jpg"), text: "Pinned into the jasmine braid for a temple round and the wedding morning." },
  { id: 12, ta: "கொழை மாலை", name: "Kozha Malai", category: "Silver", image: img("kozha.jpg"), text: "A sterling silver chain worn on the neck for a temple visit and a family function." },
  { id: 13, ta: "மூக்குத்தி", name: "Diamond Mookuthi", category: "Diamond", image: img("mookuthi.jpg"), text: "A nose pin worn for the bridal look, with a fine chain that can rest against the cheek." },
  { id: 14, ta: "வைர ஸ்டட்", name: "Diamond Studs", category: "Diamond", image: img("studs.jpg"), text: "Studs worn close to the ear through the wedding day and on ordinary days after, with silk or cotton." },
  { id: 15, ta: "குட்டை வைர ஹாரம்", name: "Short Diamond Haram", category: "Diamond", image: img("diamond-haram.jpg"), text: "A short haram worn on the neck over the bridal blouse, stones set in a Tamil bridal line." }
];

export const categories = [
  { ta: "தங்கம்", name: "Gold", caption: "Temple and bridal gold", image: img("lakshmi.jpg") },
  { ta: "வெள்ளி", name: "Silver", caption: "Sterling silver for ankle, toe, braid and neck", image: img("silambu.jpg") },
  { ta: "வைரம்", name: "Diamond", caption: "Nose pin, studs and short haram", image: img("studs.jpg") }
];
