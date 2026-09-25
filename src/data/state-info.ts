export type StateInfo = {
  capital: string;
  languages: string;
  knownFor: string;
  about: string;
  cuisine: string;
  festival: string;
  bestTime: string;
};

export const STATE_INFO: Record<string, StateInfo> = {
  "andaman-and-nicobar-islands": {
    capital: "Port Blair",
    languages: "Hindi, English, Bengali, Tamil, Nicobarese",
    knownFor: "Radhanagar Beach, Cellular Jail, Havelock & Neil Islands, coral reefs",
    about:
      "An arc of 572 emerald islands in the Bay of Bengal, where rainforest meets some of Asia's finest beaches and coral gardens. Home to six indigenous tribes and the historic Cellular Jail, the islands are India's farthest-flung frontier of sun, sand and sea.",
    cuisine: "Fresh seafood — grilled fish, crab curry, coconut-prawn dishes",
    festival: "Island Tourism Festival (January)",
    bestTime: "October to May",
  },
  "andhra-pradesh": {
    capital: "Amaravati (de facto: Visakhapatnam)",
    languages: "Telugu, Urdu, English",
    knownFor: "Tirupati Temple, Araku Valley, Longest coastline, Kuchipudi dance",
    about:
      "The Rice Bowl of India, stitched together by the Godavari and Krishna deltas and a long Coromandel coastline. Ancient temple towns, the coffee hills of Araku and the thriving port city of Visakhapatnam give Andhra a rare blend of the sacred and the commercial.",
    cuisine: "Gongura pachadi, Pulihora, Andhra chicken curry, Pootharekulu",
    festival: "Ugadi (Telugu New Year, March/April)",
    bestTime: "November to February",
  },
  "arunachal-pradesh": {
    capital: "Itanagar",
    languages: "English (official), Nyishi, Adi, Apatani, Monpa",
    knownFor: "Tawang Monastery, Ziro Valley, Sela Pass, 26+ indigenous tribes",
    about:
      "India's Land of the Dawn-lit Mountains, where the Himalaya rises out of misty cloud forest and monasteries cling to ridgelines. More than two dozen major tribes each keep their own language, weave and festival, making it the country's great cultural mosaic.",
    cuisine: "Bamboo shoot curry, Thukpa, Apong (rice beer), Smoked meat with king chilli",
    festival: "Ziro Music Festival (September), Losar (February)",
    bestTime: "October to April",
  },
  assam: {
    capital: "Dispur (Guwahati)",
    languages: "Assamese, Bodo, Bengali, English",
    knownFor: "Kaziranga rhinos, Majuli river island, Assam tea, Brahmaputra",
    about:
      "The gateway to Northeast India, built along the mighty Brahmaputra. Assam's endless tea gardens, the one-horned rhino's floodplain grasslands and the world's largest river island give it a landscape found nowhere else in the country.",
    cuisine: "Masor tenga (sour fish curry), Khar, Pitika, Pitha rice cakes",
    festival: "Bihu (April, harvest new year)",
    bestTime: "November to April",
  },
  bihar: {
    capital: "Patna",
    languages: "Hindi, Bhojpuri, Maithili, Urdu",
    knownFor: "Bodh Gaya, Nalanda University ruins, Madhubani art, Vikramshila",
    about:
      "The cradle of empires and enlightenment — Buddha attained awakening here, and Nalanda ran the world's greatest ancient university. Today Bihar layers Maithili folk art, sacred Ganga ghats and Mauryan ruins into one deeply historic plain.",
    cuisine: "Litti chokha, Sattu paratha, Khaja, Thekua",
    festival: "Chhath Puja (October/November)",
    bestTime: "October to March",
  },
  chandigarh: {
    capital: "Chandigarh",
    languages: "English, Hindi, Punjabi",
    knownFor: "Le Corbusier's modernist plan, Rock Garden, Sukhna Lake",
    about:
      "India's first planned city, designed by Le Corbusier, remains its cleanest and greenest. Bold concrete architecture, the whimsical Rock Garden of recycled art and a lake at the Shivalik foot make it a design-lover's city.",
    cuisine: "Chole bhature, Punjabi dhaba food, Kulfi falooda",
    festival: "Rose Festival (February)",
    bestTime: "October to March",
  },
  chhattisgarh: {
    capital: "Raipur",
    languages: "Hindi, Chhattisgarhi",
    knownFor: "Chitrakote Falls, Bastar Dussehra, tribal culture, dense forests",
    about:
      "India's 'Rice Bowl of the East' is really a forest state — sal jungles, tribal heartlands and the Niagara-like Chitrakote Falls on the Indravati. Bastar's 75-day Dussehra is one of the world's longest festivals.",
    cuisine: "Chila, Faara, Bamboo pickle, Mahua-based treats, Bafauri",
    festival: "Bastar Dussehra (September/October, 75 days)",
    bestTime: "October to March",
  },
  "dadra-and-nagar-haveli-and-daman-and-diu": {
    capital: "Daman",
    languages: "Gujarati, Hindi, Portuguese legacy",
    knownFor: "Portuguese forts, Silvassa gardens, Diu beaches",
    about:
      "Three small former Portuguese enclaves on India's west coast, where whitewashed forts, quiet beaches and liquor-friendly union territory status draw weekenders from Gujarat and Mumbai.",
    cuisine: "Seafood with Portuguese influence, Diu-style fish curry",
    festival: "Nariyal Purnima, Carnival (February)",
    bestTime: "October to May",
  },
  delhi: {
    capital: "New Delhi",
    languages: "Hindi, English, Punjabi, Urdu",
    knownFor: "Red Fort, Qutub Minar, India Gate, Chandni Chowk, Humayun's Tomb",
    about:
      "Seven cities deep, Delhi is 2,000 years of empire stacked on itself — Mughal domes over Sultanate walls, Lutyens' boulevards over a modern metro web. It is India's political heart and its street-food capital in one breath.",
    cuisine: "Paranthe wali gali, Butter chicken, Chaat, Nihari, Chhole bhature",
    festival: "Republic Day Parade (26 January), Diwali",
    bestTime: "October to March",
  },
  goa: {
    capital: "Panaji",
    languages: "Konkani, Marathi, English, Portuguese legacy",
    knownFor: "Beaches, Portuguese old quarters, spice plantations, nightlife",
    about:
      "India's smallest state wears 450 years of Portuguese influence in its whitewashed churches, susegad lifestyle and vindaloo kitchens. Beyond the beach strip lie mangrove backwaters, spice farms and baroque churches of Old Goa.",
    cuisine: "Fish curry rice, Vindaloo, Xacuti, Bebinca, Feni",
    festival: "Goa Carnival (February), São João (June)",
    bestTime: "November to February",
  },
  gujarat: {
    capital: "Gandhinagar",
    languages: "Gujarati, Hindi, English",
    knownFor: "Statue of Unity, Rann of Kutch, Gir lions, Somnath, textiles",
    about:
      "A state of merchants and maharajas — white salt deserts, the last wild Asiatic lions, 1,600 km of coastline and some of India's finest stepwells and temples. Its business energy is matched by exuberant garba nights.",
    cuisine: "Undhiyu, Dhokla, Thepla, Fafda-jalebi, Kathiawadi thali",
    festival: "Navratri garba (September/October), Rann Utsav (November–February)",
    bestTime: "October to March",
  },
  haryana: {
    capital: "Chandigarh (shared)",
    languages: "Hindi, Haryanvi, Punjabi",
    knownFor: "Kurukshetra, Gurugram skyline, wrestling akharas, Sultanpur bird sanctuary",
    about:
      "The milk-and-mustard heart of North India wraps around Delhi on three sides. Ancient Kurukshetra of the Mahabharata sits beside Gurugram's glass towers — India's IT boomtown — while akharas produce Olympic wrestlers.",
    cuisine: "Bajra khichdi, Kadhi pakora, Churma, Fresh white butter with bajra roti",
    festival: "Surajkund Crafts Mela (February), Geeta Jayanti",
    bestTime: "October to March",
  },
  "himachal-pradesh": {
    capital: "Shimla (Dharamshala: winter capital)",
    languages: "Hindi, Pahari, English",
    knownFor: "Shimla, Manali, Spiti Valley, Dalai Lama's Dharamshala, apple orchards",
    about:
      "Dev Bhoomi — the land of gods — climbs from pine valleys to the barren moonscapes of Spiti and Lahaul. Colonial Shimla, Tibetan Dharamshala, apple country and high passes make it India's most loved mountain state.",
    cuisine: "Dham, Siddu, Chha gosht, Trout fish, Kiwi & apples",
    festival: "Kullu Dussehra (October), Losar",
    bestTime: "March to June, December for snow",
  },
  "jammu-and-kashmir": {
    capital: "Srinagar (summer), Jammu (winter)",
    languages: "Kashmiri, Dogri, Urdu, English",
    knownFor: "Dal Lake, Gulmarg, Vaishno Devi, saffron fields, houseboats",
    about:
      "Paradise on Earth — chinar-lined lakes and shikara gondolas in the Kashmir Valley, saffron meadows of Pampore, and the temple trails of Jammu's Dogra hills. Mughal gardens and Himalayan ski runs share one state.",
    cuisine: "Rogan josh, Wazwan feast, Yakhni, Kahwa tea, Dum aloo",
    festival: "Tulip Festival (April), Hemis, Baisakhi",
    bestTime: "March to October; December–February for snow",
  },
  jharkhand: {
    capital: "Ranchi",
    languages: "Hindi, Santhali, Nagpuri, Ho",
    knownFor: "Betla National Park, waterfalls, tribal heritage, mineral wealth",
    about:
      "A plateau state of sal forests, gushing waterfalls and ancient tribal cultures. Hundru and Dassam falls thunder off the Chota Nagpur escarpment while Santhal and Munda villages keep some of India's oldest living traditions.",
    cuisine: "Dhuska, Rugra (wild mushroom), Handia rice beer, Litti",
    festival: "Sarhul (spring tribal festival), Sohrai",
    bestTime: "October to March",
  },
  karnataka: {
    capital: "Bengaluru",
    languages: "Kannada, English, Tulu, Kodava",
    knownFor: "Hampi, Coorg coffee, Mysore Palace, Bengaluru tech, Jog Falls",
    about:
      "From the ruins of Vijayanagara at Hampi to the coffee hills of Coorg and the start-up towers of Bengaluru, Karnataka spans a millennium of empire and innovation. Mysore's palaces and Jog's thundering falls complete the sweep.",
    cuisine: "Bisi bele bath, Mangalorean fish curry, Mysore pak, Filter coffee, Dosa",
    festival: "Mysuru Dasara (September/October)",
    bestTime: "October to February",
  },
  kerala: {
    capital: "Thiruvananthapuram",
    languages: "Malayalam, English",
    knownFor: "Backwaters, Munnar tea hills, Ayurveda, Kathakali, beaches",
    about:
      "God's Own Country: a slender ribbon of palm-fringed backwaters, tea-carpeted highlands and centuries of spice-trade ports. Kathakali, houseboats and Ayurvedic healing make Kerala India's most serene escape.",
    cuisine: "Sadya feast, Karimeen pollichathu, Appam with stew, Puttu-kadala, Banana chips",
    festival: "Onam (August/September), Thrissur Pooram (April/May)",
    bestTime: "September to March",
  },
  ladakh: {
    capital: "Leh",
    languages: "Ladakhi, Urdu, Hindi, English",
    knownFor: "Pangong Lake, Nubra Valley, monasteries, Khardung La, Hemis",
    about:
      "A high-altitude desert of turquoise lakes, lunar canyons and Tibetan Buddhist monasteries perched on cliffs. Beyond Khardung La, the Nubra sand dunes and Changthang plains host nomads, double-humped camels and snow leopards.",
    cuisine: "Thukpa, Momos, Butter tea (gur gur cha), Skyu, Apricots",
    festival: "Hemis Festival (June/July), Losar",
    bestTime: "May to September",
  },
  lakshadweep: {
    capital: "Kavaratti",
    languages: "Malayalam, Jeseri, English",
    knownFor: "Coral atolls, lagoons, Agatti, Minicoy, pristine diving",
    about:
      "Thirty-six coral atolls scattered across the Arabian Sea — India's Maldives. Turquoise lagoons, coconut groves and coral reefs make it the country's most exclusive island escape, with visitor permits keeping it blissfully uncrowded.",
    cuisine: "Tuna dishes (mas), Coconut-based curries, Mus kavaab",
    festival: "Eid celebrations, Minicoy boat races",
    bestTime: "October to May",
  },
  "madhya-pradesh": {
    capital: "Bhopal",
    languages: "Hindi, English",
    knownFor: "Khajuraho, Bandhavgarh tigers, Sanchi Stupa, Orchha, Kanha",
    about:
      "The Heart of India holds the country's finest tiger parks, the erotic temples of Khajuraho, Buddhist Sanchi and the ghost-palaces of Orchha. Two UNESCO sites, nine tiger reserves and Mughal-era Bhopal make it India's great wilderness-and-heritage state.",
    cuisine: "Poha-jalebi, Bhutte ka kees, Dal bafla, Bhopali kebabs",
    festival: "Khajuraho Dance Festival (February), Tansen Samaroh (December)",
    bestTime: "October to March",
  },
  maharashtra: {
    capital: "Mumbai",
    languages: "Marathi, Hindi, English",
    knownFor: "Mumbai, Ajanta-Ellora, Konkan coast, Bollywood, Sahyadri forts",
    about:
      "India's financial engine and film factory, ringed by the fortress-crowned Sahyadris and the cave temples of Ajanta and Ellora. The Konkan coast below serves up beaches, Alphonso mangoes and fort-studded sea cliffs.",
    cuisine: "Vada pav, Puran poli, Misal, Kolhapuri thali, Modak, Seafood of Malvan",
    festival: "Ganesh Chaturthi (August/September), Gudi Padwa",
    bestTime: "October to February; Konkan monsoon is lush",
  },
  manipur: {
    capital: "Imphal",
    languages: "Meiteilon (Manipuri), English",
    knownFor: "Loktak Lake, Sangai deer, Manipuri dance, polo's birthplace",
    about:
      "A jeweled valley ringed by blue hills, where Loktak Lake floats with phumdi islands and the endangered sangai deer dances on water. The birthplace of polo and home of the graceful Manipuri classical dance.",
    cuisine: "Eromba, Chak-hao kheer (black rice), Singju, Ngari",
    festival: "Yaoshang (Holi, March), Sangai Festival (November)",
    bestTime: "October to March",
  },
  meghalaya: {
    capital: "Shillong",
    languages: "English (official), Khasi, Garo, Jaintia",
    knownFor: "Living root bridges, Cherrapunji rains, Shillong, cleanest village Mawlynnong",
    about:
      "The Abode of Clouds — wettest place on Earth, where Khasi villagers train living roots into bridges across roaring streams. Matrilineal tribes, misty plateaus and caves beneath rainforest make it uniquely otherworldly.",
    cuisine: "Jadoh, Doh khleh, Tungrymbai, Bamboo shoot dishes",
    festival: "Shad Suk Mynsiem (April), Wangala (November)",
    bestTime: "September to May",
  },
  mizoram: {
    capital: "Aizawl",
    languages: "Mizo, English, Hindi",
    knownFor: "Blue Mountains, Phawngpui, bamboo forests, Chapchar Kut",
    about:
      "Ridge after ridge of blue-green hills clothed in bamboo and orchids, with villages balancing on mountaintops. Mizos' famed hospitality and the flower dance of Chapchar Kut give India's southwest corner its gentle charm.",
    cuisine: "Bai, Vawksa rep (smoked pork), Misa mach poora, Pauthe",
    festival: "Chapchar Kut (March), Mim Kut",
    bestTime: "November to March",
  },
  nagaland: {
    capital: "Kohima",
    languages: "English (official), Nagamese, Ao, Angami",
    knownFor: "Hornbill Festival, Dzukou Valley, 17 warrior tribes, Kohima War Cemetery",
    about:
      "Land of Festivals — seventeen warrior tribes each with distinct dress, log drums and hornbill-feather headdresses. The Hornbill Festival each December gathers them all in a single extraordinary celebration of Naga culture.",
    cuisine: "Smoked pork with bamboo shoot, Axone fermented soybean, Naga king chilli dishes",
    festival: "Hornbill Festival (December 1–10)",
    bestTime: "October to May",
  },
  odisha: {
    capital: "Bhubaneswar",
    languages: "Odia, English, Hindi",
    knownFor: "Konark Sun Temple, Jagannath Puri, Chilika Lake, Odissi dance",
    about:
      "India's best-kept secret: the 13th-century Sun Temple at Konark, the chariot festival of Jagannath at Puri, and Asia's largest brackish lagoon at Chilika. Ancient Kalinga's temples and tribal belt remain wonderfully untouristy.",
    cuisine: "Dalma, Pakhala bhata, Chhena poda, Machha besara",
    festival: "Rath Yatra at Puri (June/July), Konark Dance Festival (December)",
    bestTime: "October to February",
  },
  puducherry: {
    capital: "Puducherry",
    languages: "Tamil, French, English",
    knownFor: "French Quarter, Auroville, Promenade Beach, Sri Aurobindo Ashram",
    about:
      "A slice of the French Riviera on the Coromandel coast — mustard-yellow villas, bougainvillea lanes and a seaside promenade. Nearby Auroville's golden Matrimandir draws seekers from around the world.",
    cuisine: "Creole-Tamil fusion, Baguette & Tamil breakfasts, French cafés",
    festival: "Bastille Day (July), Masi Magam",
    bestTime: "October to March",
  },
  punjab: {
    capital: "Chandigarh (shared)",
    languages: "Punjabi, Hindi, English",
    knownFor: "Golden Temple, Wagah Border, mustard fields, bhangra, dhabas",
    about:
      "The land of five rivers feeds India and feeds its soul — the Golden Temple's golden reflection in Amrit Sarovar, biryani-scented dhaba highways and the beat of dhol across mustard-yellow fields.",
    cuisine: "Sarson da saag & makki di roti, Amritsari kulcha, Butter chicken, Lassi",
    festival: "Baisakhi (April), Lohri (January), Holla Mohalla",
    bestTime: "October to March",
  },
  rajasthan: {
    capital: "Jaipur",
    languages: "Hindi, Rajasthani, English",
    knownFor: "Pink City, Thar Desert, Udaipur lakes, forts & palaces, Pushkar",
    about:
      "India's royal desert theatre — hilltop forts, mirror-palaces, camel fairs and the blue lanes of Jodhpur. Rajput valour, Mughal grandeur and desert colour make Rajasthan the country's most cinematic state.",
    cuisine: "Dal baati churma, Laal maas, Pyaaz kachori, Ghevar, Ker sangria",
    festival: "Pushkar Camel Fair (November), Desert Festival, Teej",
    bestTime: "October to March",
  },
  sikkim: {
    capital: "Gangtok",
    languages: "Nepali, Sikkimese, Lepcha, English",
    knownFor: "Kanchenjunga, Rumtek Monastery, organic farming, tea, monasteries",
    about:
      "A thumb-sized Himalayan state beneath the world's third-highest peak, Kanchenjunga. India's first fully organic state layers prayer flags, cardamom terraces and glacial lakes like Gurudongmar into one serene kingdom.",
    cuisine: "Momo, Thukpa, Phagshapa, Gundruk, Sikkimese tea",
    festival: "Losar, Pang Lhabsol (August), Dasain",
    bestTime: "March to May, October to December",
  },
  "tamil-nadu": {
    capital: "Chennai",
    languages: "Tamil, English",
    knownFor: "Madurai Meenakshi Temple, Mahabalipuram, Ooty, Chettinad, Bharatanatyam",
    about:
      "The soul of Dravidian culture — towering gopurams, 2,000-year-old Sangam poetry, Chettinad mansions and French-tinged Pondicherry next door. From Ooty's Nilgiri tea to Rameswaram's sacred sands, the temple trail is unmatched.",
    cuisine: "Idli-sambar, Chettinad chicken, Filter coffee, Pongal, Madurai bun parotta",
    festival: "Pongal (January), Meenakshi Thirukalyanam, Margazhi music season",
    bestTime: "November to February; hill stations year-round",
  },
  telangana: {
    capital: "Hyderabad",
    languages: "Telugu, Urdu, English",
    knownFor: "Charminar, Golconda Fort, Hyderabadi biryani, Ramappa Temple",
    about:
      "India's youngest state carries the Nizam's opulence — Charminar bazaars, the world's best biryani and Golconda's acoustic wonders — alongside Kakatiya-era temples and the new tech corridors of Cyberabad.",
    cuisine: "Hyderabadi biryani, Haleem, Mirchi ka salan, Qubani ka meetha, Sarva pindi",
    festival: "Bathukamma (September/October), Bonalu, Diwali",
    bestTime: "October to February",
  },
  tripura: {
    capital: "Agartala",
    languages: "Bengali, Kokborok, English",
    knownFor: "Ujjayanta Palace, Neermahal, Unakoti rock carvings, bamboo craft",
    about:
      "A princely state turned Indian state, where the Manikya dynasty's palaces meet lake temples and the colossal rock carvings of Unakoti. Bamboo craft and 19 tribes give this quiet corner its texture.",
    cuisine: "Mui borok, Berma (fermented fish), Chakhwi, Bamboo shoot dishes",
    festival: "Kharchi Puja (July), Durga Puja",
    bestTime: "October to March",
  },
  "uttar-pradesh": {
    capital: "Lucknow",
    languages: "Hindi, Urdu, Awadhi, English",
    knownFor: "Taj Mahal, Varanasi ghats, Lucknow nawabi culture, Kumbh Mela",
    about:
      "India's most populous state is its spiritual core — the Taj Mahal, the eternal ghats of Varanasi, Krishna's Braj and the nawabi elegance of Lucknow. The Kumbh here is the largest gathering of humans on Earth.",
    cuisine: "Awadhi biryani, Kebabs (Tunday), Petha, Chaat, Bedmi aloo",
    festival: "Kumbh Mela, Taj Mahotsav (February), Dev Deepawali (November)",
    bestTime: "October to March",
  },
  uttarakhand: {
    capital: "Dehradun (winter), Gairsain (summer)",
    languages: "Hindi, Garhwali, Kumaoni, English",
    knownFor: "Char Dham, Rishikesh yoga, Nainital, Valley of Flowers, Jim Corbett",
    about:
      "Devbhoomi, land of the gods — the source of the Ganga and Yamuna, the Char Dham pilgrimage, yoga capital Rishikesh and the Valley of Flowers. Corbett's tigers roam the terai below Himalayan shrines.",
    cuisine: "Kafuli, Bal mithai, Aloo ke gutke, Gahat ke dubke, Buransh juice",
    festival: "Kumbh at Haridwar, Kandali, Ganga Dussehra",
    bestTime: "March to June, September to November",
  },
  "west-bengal": {
    capital: "Kolkata",
    languages: "Bengali, English, Hindi, Nepali",
    knownFor: "Kolkata, Darjeeling tea, Sundarbans tigers, Durga Puja, Santiniketan",
    about:
      "The intellectual and cultural capital of India — adda over coffee, Durga Puja's art-laced pandals, colonial Kolkata, Darjeeling's tea gardens and the mangrove kingdom of the Royal Bengal tiger in the Sundarbans.",
    cuisine: "Machher jhol, Kosha mangsho, Rosogolla, Mishti doi, Kathi rolls, Macher paturi",
    festival: "Durga Puja (September/October), Poila Boishakh, Poush Mela",
    bestTime: "October to February; Darjeeling March–May",
  },
};
