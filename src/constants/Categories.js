const Categories = [
    'Adjectives','Animals','Aquatic animals','Body Parts','Buildings','Businesses','Characters',
    'Cities','Classroom Objects','Clothing','Colors','Condiments','Consonants','Countries',
    'Cuisine','Desserts','Drinks','Emotions','Even Numbers','Exercises','Flowers','Food','Fruits',
    'Furniture','Gems','Habits','Halloween','Hanukkah','Holidays','Ingredients','Insects','Internal Organs',
    'Islands','Jobs','Kitchen Utensils','Landmarks','Languages','Liquids','Measuring Units',
    'Music Types','Musical Instruments','Mythical Creatures','New Year’s','Nouns','Odd Numbers',
    'Office Supplies','Places','Plants','Prepositions','Religions','Rhyming Words','School Subjects',
    'Seasonings','Shoes','Sizes','Sounds','Sports','States','Summer','Thanksgiving','Tools','Traditions',
    'Transportation','Valentine’s Day','Vegetables','Verbs','Weather','Weddings','Winter Holidays', 
    'Swear Words'
];

const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

const capsAllowed = [
    'Characters',
    'Cities',
    'Countries',
    'Holidays',
    'Islands',
    'Landmarks',
    'Places',
    'Religions',
    'States',
    'Winter Holidays'
];

const allowCaps = (category) => {
    return capsAllowed.includes(category);
}

for(let i=0; i<alphabet.length; i++) {
    Categories.push("Words that begin with " + alphabet[i]);
}

export {Categories, allowCaps}

