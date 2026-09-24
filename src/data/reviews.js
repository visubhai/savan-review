export const CHIPS_DATA = [
  // Left Column Priority Items (First 3 Auto-Selected on link open)
  { 
    id: 'staff', 
    label: { en: 'Driver & Office Staff', gu: 'ડ્રાઇવર અને ઓફિસ સ્ટાફ', hi: 'ड्राइवर व ऑफिस स्टाफ' }, 
    icon: '👨‍💼', 
    col: 'left' 
  },
  { 
    id: 'timing', 
    label: { en: 'Punctual Bus Timing', gu: 'સમયસર બસ સર્વિસ', hi: 'समय पर बस सेवा' }, 
    icon: '⏰', 
    col: 'left' 
  },
  { 
    id: 'parcel', 
    label: { en: 'Parcel & Cargo Service', gu: 'પાર્સલ અને કાર્ગો સર્વિસ', hi: 'पार्सल व कार्गो सर्विस' }, 
    icon: '📦', 
    col: 'left' 
  },
  { 
    id: 'new_bus', 
    label: { en: 'Brand New Bus', gu: 'નવી લક્ઝરી બસ', hi: 'नई लग्जरी बस' }, 
    icon: '🚍', 
    col: 'left' 
  },
  { 
    id: 'rest_stop', 
    label: { en: 'Good Rest Stop', gu: 'સારો હોટલ હોલ્ટ', hi: 'अच्छा होटल स्टॉप' }, 
    icon: '🍽', 
    col: 'left' 
  },
  
  // Right Column Routes (First 4 items)
  { 
    id: 'route_ahmedabad', 
    label: { en: 'Surat ⇄ Ahmedabad', gu: 'સુરત ⇄ અમદાવાદ', hi: 'सूरत ⇄ अहमदाबाद' }, 
    icon: '🚌', 
    col: 'right' 
  },
  { 
    id: 'route_mumbai', 
    label: { en: 'Surat ⇄ Mumbai', gu: 'સુરત ⇄ મુંબઈ', hi: 'सूरत ⇄ मुंबई' }, 
    icon: '🚌', 
    col: 'right' 
  },
  { 
    id: 'route_pune', 
    label: { en: 'Surat ⇄ Pune', gu: 'સુરત ⇄ પુણે', hi: 'सूरत ⇄ पुणे' }, 
    icon: '🚌', 
    col: 'right' 
  },
  { 
    id: 'route_rajkot', 
    label: { en: 'Surat ⇄ Rajkot', gu: 'સુરત ⇄ રાજકોટ', hi: 'सूरत ⇄ राजकोट' }, 
    icon: '🚌', 
    col: 'right' 
  },

  // Secondary Features
  { 
    id: 'sleeper', 
    label: { en: 'Comfortable Sleeper', gu: 'આરામદાયક સ્લીપર', hi: 'आरामदायक स्लीपर' }, 
    icon: '🛏', 
    col: 'left' 
  },
  { 
    id: 'hygiene', 
    label: { en: 'Clean & Hygienic', gu: 'એકદમ સ્વચ્છ બસ', hi: 'साफ-सुथरी बस' }, 
    icon: '✨', 
    col: 'right' 
  },
  { 
    id: 'ac', 
    label: { en: 'Good AC', gu: 'સરસ AC કૂલિંગ', hi: 'बढ़िया AC कूलिंग' }, 
    icon: '❄️', 
    col: 'left' 
  },
  { 
    id: 'charging', 
    label: { en: 'Charging Facility', gu: 'મોબાઇલ ચાર્જિંગ', hi: 'चार्जिंग सुविधा' }, 
    icon: '🔋', 
    col: 'right' 
  },
  { 
    id: 'booking', 
    label: { en: 'Easy Booking', gu: 'સરળ બુકિંગ', hi: 'आसान बुकिंग' }, 
    icon: '🎫', 
    col: 'left' 
  },
  { 
    id: 'overall', 
    label: { en: 'Overall Experience', gu: '૧૦૦% સંતોષકારક સફર', hi: 'शानदार अनुभव' }, 
    icon: '💯', 
    col: 'right' 
  },
];

export const CONNECTORS = {
  en: [
    "Also,",
    "Additionally,",
    "On top of that,",
    "Furthermore,",
    "Besides that,",
    "Special mention to the fact that",
    "What stood out was that",
    "To add to that,",
    "Moreover,"
  ],
  gu: [
    "તેમજ,",
    "વધુમાં,",
    "સાથે સાથે,",
    "ખાસ કરીને,",
    "ખરેખર,",
    "ઉપરાંત,"
  ],
  hi: [
    "साथ ही,",
    "इसके अलावा,",
    "विशेष रूप से,",
    "सचमुच,",
    "और तो और,"
  ]
};

export const localizedReviewData = {
  // GUJARATI SENTENCE TEMPLATES
  gu: {
    openings: [
      "સાવન ટ્રાવેલ્સ સાથે ખૂબ જ સુંદર અને આરામદાયક મુસાફરી રહી.",
      "સાવન ટ્રાવેલ્સમાં મુસાફરી કરવાનો મારો અનુભવ ખૂબ જ શ્રેષ્ઠ રહ્યો.",
      "સાવન ટ્રાવેલ્સની સર્વિસ ખરેખર ખૂબ જ પ્રશંસનીય છે.",
      "સુરતથી સફર માટે સાવન ટ્રાવેલ્સ હંમેશા મારી પહેલી પસંદ છે.",
      "ખૂબ જ સરસ, સલામત અને શાંત મુસાફરીનો અનુભવ રહ્યો.",
      "સાવન ટ્રાવેલ્સની સુવિધા અને વ્યવસ્થા એકદમ શ્રેષ્ઠ છે."
    ],
    staff: [
      "ડ્રાઇવર અને સાવન ટ્રાવેલ્સ ઓફિસ સ્ટાફનો સ્વભાવ ખૂબ જ નમ્ર અને મદદરૂપ હતો.",
      "સુરત ઓફિસ સ્ટાફ અને બસ ડ્રાઇવરે સામાન મુકવામાં ખૂબ જ સારી મદદ કરી.",
      "ડ્રાઇવિંગ ખૂબ જ સુરક્ષિત અને શાંત હતું, તેમજ ઓફિસ સ્ટાફનું વર્તન પણ ઉત્તમ રહ્યું.",
      "ઓફિસ ટીમ (7567529600) તરફથી ખૂબ જ ઝડપી અને સંતોષકારક જવાબ મળ્યો.",
      "બસ ડ્રાઇવર અને કંડક્ટર ખૂબ જ વિનમ્ર અને વ્યવસ્થિત હતા."
    ],
    timing: [
      "બસ બિલકુલ સમયસર ઉપડી અને નિયત સમયે પહોંચાડી દીધી.",
      "સમયપાલન બાબતે સાવન ટ્રાવેલ્સ ૧ નંબર છે, જરાય મોડું ન થયું.",
      "પીકઅપ અને ડ્રોપ બંને જગ્યાએ બસ એકદમ સમયસર હતી.",
      "મુસાફરી દરમિયાન સમયનું ખૂબ જ સરસ આયોજન જોવા મળ્યું."
    ],
    parcel: [
      "સાવન ટ્રાવેલ્સ ઓફિસની પાર્સલ સર્વિસ ખૂબ જ ઝડપી, સુરક્ષિત અને ભરોસાપાત્ર છે.",
      "મેં સાવન ટ્રાવેલ્સ ઓફિસથી પાર્સલ મોકલ્યું હતું જે સમયસર અને સલામત પહોંચી ગયું.",
      "સુરતથી અન્ય શહેરોમાં તાત્કાલિક પાર્સલ મોકલવા માટે સાવન ટ્રાવેલ્સ ઉત્તમ છે.",
      "ઓફિસ સ્ટાફ (7567529600 / 7567529700) પાર્સલ બુકિંગ ખૂબ જ ઝડપથી કરી આપે છે."
    ],
    new_bus: [
      "નવી લક્ઝરી બસ હતી અને તેનું એર સસ્પેન્શન ખૂબ જ સ્મૂધ હતું.",
      "બસ એકદમ નવી, આધુનિક અને અવાજ વગરની હતી.",
      "નવી બસની સુવિધા અને ગાદી ખૂબ જ આરામદાયક લાગી."
    ],
    rest_stop: [
      "હોટલ સ્ટોપ ખૂબ જ સ્વચ્છ, સારો અને સારો નાસ્તો-જમવાનું મળે તેવો હતો.",
      "જમવા માટે રોકેલી હોટલ એકદમ ચોખ્ખી અને ફેમિલી માટે યોગ્ય હતી."
    ],
    route_ahmedabad: [
      "સુરતથી અમદાવાદ અને અમદાવાદથી સુરત માટે સૌથી બેસ્ટ બસ સર્વિસ છે.",
      "સુરત - અમદાવાદ રૂટ પર સાવન ટ્રાવેલ્સની મુસાફરી ખૂબ જ ઝડપી અને આરામદાયક રહી."
    ],
    route_mumbai: [
      "સુરતથી મુંબઈ અને મુંબઈથી સુરત માટે ઉત્તમ સ્લીપર કોચ છે.",
      "મુંબઈ રૂટ પર સમયસર અને સુરક્ષિત પહોંચાડવા બદલ સાવન ટ્રાવેલ્સનો આભાર."
    ],
    route_pune: [
      "સુરતથી પુણે અને પુણેથી સુરત રાત્રિ મુસાફરી માટે શ્રેષ્ઠ બસ છે.",
      "પુણે રૂટ પર ડ્રાઇવરે ખૂબ જ સલામત અને શાંત ડ્રાઇવિંગ કર્યું."
    ],
    route_rajkot: [
      "સુરતથી રાજકોટ અને રાજકોટથી સુરત જવા માટે સૌથી વિશ્વાસુ ટ્રાવેલ્સ છે.",
      "સુરત - રાજકોટ રૂટ પર બસ સમયસર પહોંચી અને ઊંઘ પણ સરસ આવી."
    ],
    sleeper: [
      "સ્લીપર બર્થ ખૂબ જ પહોળો, સ્વચ્છ અને આરામદાયક હતો.",
      "ચાદર અને ઓશિકા એકદમ સાફ-સુથરા મળ્યા, ઊંઘ ખૂબ સરસ આવી."
    ],
    hygiene: [
      "બસની અંદર એકદમ ચોખ્ખાઈ અને તાજગીભરી સુગંધ હતી.",
      "ક્યાંય ધૂળ કે ગંદકી નહોતી, સ્વચ્છતા ૧૦/૧૦ હતી."
    ],
    ac: [
      "AC કૂલિંગ એકદમ માપનું અને સુખદ હતું.",
      "રાત્રે એસીનું તાપમાન ખૂબ જ અનુકૂળ રાખવામાં આવ્યું હતું."
    ],
    charging: [
      "દરેક સીટ પાસે મોબાઇલ ચાર્જિંગ પોઇન્ટ ચાલુ હતો.",
      "ચાર્જિંગની સુવિધા હોવાથી પ્રવાસમાં કોઈ ચિંતા ન રહી."
    ],
    booking: [
      "ટિકિટ બુકિંગ અને બોર્ડિંગ ખૂબ જ સરળ અને ઝડપી રહ્યું.",
      "ઓફિસથી ટિકિટ કન્ફર્મેશન તરત મળી ગયું."
    ],
    overall: [
      "એકંદરે ૧૦૦% સંતોષકારક સફર રહી, ખૂબ મજા આવી!",
      "સાવન ટ્રાવેલ્સને ૫ માંથી ૫ સ્ટાર આપું છું."
    ],
    closings: [
      "દરેક મિત્રો અને પરિવારજનોને સાવન ટ્રાવેલ્સમાં મુસાફરી કરવાની ભલામણ કરું છું.",
      "ફરીથી જ્યારે પણ જવું હશે ત્યારે સાવન ટ્રાવેલ્સ જ પસંદ કરીશ!",
      "ઉત્તમ સેવા માટે સાવન ટ્રાવેલ્સની આખી ટીમને ખૂબ ખૂબ અભિનંદન!",
      "સુરતમાં બસ મુસાફરી અને પાર્સલ માટે શ્રેષ્ઠ વિકલ્પ છે."
    ]
  },

  // ENGLISH SENTENCE TEMPLATES (Existing SEO Rich)
  en: {
    openings: [
      "Had a great experience traveling with Savan Travels.",
      "Really enjoyed my journey with Savan Travels.",
      "Had a very pleasant travel experience with Savan Travels.",
      "Very happy with my experience traveling with Savan Travels.",
      "Overall, a wonderful travel experience with Savan Travels.",
      "Savan Travels provided an excellent journey from start to finish.",
      "My trip with Savan Travels was smooth, relaxing, and hassle-free."
    ],
    staff: [
      "The bus driver and Savan Travels office staff were very helpful, polite, and professional.",
      "Great coordination between the office staff at Surat office and the bus driver on board.",
      "The driver drove very safely while the office staff handled boarding and baggage with utmost care.",
      "Special thanks to the Savan Travels office staff (7567529600) for guidance and the driver for smooth, cautious highway driving."
    ],
    timing: [
      "The bus arrived and reached the destination strictly on schedule.",
      "Really appreciated the punctual pickup and drop timing of Savan Travels.",
      "No unnecessary delays, departed right on time and reached as promised.",
      "Punctual bus service made my travel schedule completely stress-free."
    ],
    parcel: [
      "Savan Travels office provides fast, safe, and reliable parcel cargo delivery service.",
      "Sent my parcel package through Savan Travels office and it reached safely on time.",
      "Best parcel delivery office in Surat for sending urgent packages safely.",
      "Highly recommend Savan Travels office (7567529600 / 7567529700) for fast parcel courier booking."
    ],
    new_bus: [
      "Rode in their brand new luxury bus fleet which was immaculate and quiet.",
      "The bus was a brand new luxury coach with top-class air suspension."
    ],
    rest_stop: [
      "Great rest stop selection with clean washrooms and hygienic food options.",
      "Clean rest stop with good quality food and neat restroom facilities."
    ],
    route_ahmedabad: [
      "Best bus service for Surat to Ahmedabad and Ahmedabad to Surat travel.",
      "Had a very comfortable journey on the Surat to Ahmedabad route with Savan Travels."
    ],
    route_mumbai: [
      "Superb luxury sleeper bus service from Surat to Mumbai and Mumbai to Surat.",
      "Best overnight sleeper bus route between Surat and Mumbai with punctual boarding."
    ],
    route_pune: [
      "Smooth and peaceful travel experience from Surat to Pune and Pune to Surat.",
      "Best sleeper bus option available for Surat to Pune overnight journey."
    ],
    route_rajkot: [
      "Excellent bus service on Surat to Rajkot and Rajkot to Surat route.",
      "Punctual timing and smooth ride on the Surat to Rajkot journey."
    ],
    sleeper: [
      "The sleeper berth was spacious, cozy, and comfortable.",
      "Pillows and bedsheets in the sleeper were clean and soft."
    ],
    hygiene: [
      "The bus was spotless, clean, and well hygienic.",
      "The cleanliness of the bus interior was truly impressive."
    ],
    ac: [
      "The AC cooling was set at a perfect, pleasant temperature.",
      "Good AC performance kept the bus cool and fresh."
    ],
    charging: [
      "Working charging ports at every seat were very useful.",
      "Mobile charging facilities were fully functional and handy."
    ],
    booking: [
      "Ticket booking and boarding were instant and hassle-free.",
      "Seamless online booking experience with quick confirmation."
    ],
    overall: [
      "Superb experience overall, highly impressed!",
      "10/10 travel experience with Savan Travels."
    ],
    closings: [
      "Would definitely recommend Savan Travels to everyone.",
      "Overall, a very pleasant and satisfying experience.",
      "Highly recommended for anyone looking for reliable travel and parcel service!",
      "Five stars for their great service, parcel office, and comfortable bus!"
    ]
  },

  // HINDI SENTENCE TEMPLATES
  hi: {
    openings: [
      "सावन ट्रैवल्स के साथ यात्रा का अनुभव बहुत ही शानदार रहा।",
      "सावन ट्रैवल्स ने हमारे सफर को बहुत आरामदायक और सुरक्षित बनाया।",
      "सूरत से यात्रा के लिए सावन ट्रैवल्स हमेशा बेहतरीन सेवा प्रदान करता है।",
      "सावन ट्रैवल्स की बस सेवा और सुविधाएं वाकई बहुत अच्छी हैं।"
    ],
    staff: [
      "बस ड्राइवर और सावन ट्रैवल्स ऑफिस स्टाफ बहुत ही मददगार और विनम्र रहे।",
      "सूरत ऑफिस स्टाफ और ड्राइवर ने बोर्डिंग व लगेज में बहुत सहयोग किया।",
      "ड्राइवर ने बहुत सुरक्षित ड्राइविंग की और ऑफिस स्टाफ (7567529600) का व्यवहार बहुत अच्छा था।"
    ],
    timing: [
      "बस बिल्कुल सही समय पर रवाना हुई और समय पर गंतव्य पर पहुंची।",
      "सावन ट्रैवल्स की समयबद्धता सचमुच काबिले तारीफ है।"
    ],
    parcel: [
      "सावन ट्रैवल्स ऑफिस की पार्सल डिलीवरी सेवा बहुत तेज, सुरक्षित और भरोसेमंद है।",
      "मैंने सावन ट्रैवल्स ऑफिस से पार्सल भेजा था जो समय पर सुरक्षित पहुंच गया।",
      "पार्सल बुकिंग के लिए सावन ट्रैવल्स ऑफिस (7567529600 / 7567529700) सबसे बढ़िया विकल्प है।"
    ],
    new_bus: [
      "बस एकदम नई लग्जरी कोच थी, जिसका सस्पेंशन बहुत आरामदायक था।",
      "नई गाड़ी में सफर करके बिल्कुल भी थकान महसूस नहीं हुई।"
    ],
    rest_stop: [
      "होटल स्टॉप बहुत साफ-सुथरा और परिवार के लिए बहुत उपयुक्त था।"
    ],
    route_ahmedabad: [
      "सूरत से अहमदाबाद और अहमदाबाद से सूरत के लिए सबसे बेहतरीन बस सेवा है।"
    ],
    route_mumbai: [
      "सूरत से मुंबई और मुंबई से सूरत के लिए सबसे आरामदायक स्लीपर बस है।"
    ],
    route_pune: [
      "सूरत से पुणे रूट पर सावन ट्रैवल्स का सफर बहुत ही शांतिपूर्ण और आरामदायक रहा।"
    ],
    route_rajkot: [
      "सूरत से राजकोट और राजकोट से सूरत रूट पर समय पर पहुंचाने के लिए धन्यवाद।"
    ],
    sleeper: [
      "स्लीपर बर्थ काफी चौड़ी, आरामदायक और साफ-सुथरी थी।"
    ],
    hygiene: [
      "बस में स्वच्छता का विशेष ध्यान रखा गया था, सब कुछ साफ था।"
    ],
    ac: [
      "AC की कूलिंग बहुत बढ़िया और आरामदायक थी।"
    ],
    charging: [
      "सीट के पास मोबाइल चार्जिंग पॉइंट सही तरीके से काम कर रहा था।"
    ],
    booking: [
      "टिकट बुकिंग और बस में चढ़ने की प्रक्रिया बहुत आसान थी।"
    ],
    overall: [
      "कुल मिलाकर 10/10 का अनुभव रहा, पूरी तरह संतुष्ट हूं!"
    ],
    closings: [
      "मैं अपने सभी परिचितों को सावन ट्रैवल्स में सफर करने की सलाह दूंगा।",
      "अगली बार भी सावन ट्रैवल्स से ही यात्रा करूंगा। 5 स्टार सर्विस!"
    ]
  }
};
