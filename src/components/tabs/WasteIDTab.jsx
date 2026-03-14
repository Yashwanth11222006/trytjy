import { useState, useRef, useEffect } from 'react';
import { ScanSearch, Loader2, AlertTriangle, CheckCircle2, Info, Camera, VideoOff, Aperture, X, Zap } from 'lucide-react';
import * as tf from '@tensorflow/tfjs';
import * as mobilenet from '@tensorflow-models/mobilenet';

const TRANSLATIONS = {
  EN: {
    demographic: "SELECT_TARGET_DEMOGRAPHIC",
    placeholder: "SCAN ITEM: E.g. 'coca cola bottle' or 'broken laptop'",
    scan: "SCAN",
    match_found: "MATCH_FOUND",
    category: "Category",
    protocol: "PROTOCOL",
    actionable_tip: "Actionable Tip",
    uploading: "UPLOADING IMAGE DATA... INITIALIZING NEURAL MATCH...",
    wet: "Wet",
    dry: "Dry",
    recyclable: "Recyclable",
    electronic: "Electronic",
    hazardous: "Hazardous",
    kid: "Kid",
    student: "Student",
    adult: "Adult",
    camera_mode: "Digital Eye",
    enable_camera: "ENABLE NEURAL FEED",
    capture: "CAPTURE & ANALYZE",
    camera_error: "Neural link failed. Check hardware permissions.",
    sim_notice: "LIVE NEURAL SCAN ACTIVE",
    loading_model: "CALIBRATING NEURAL CORE...",
    vision_ready: "VISION SYSTEM ONLINE",
    retry: "RETRY SCAN",
    manual: "EDIT NAME",
    save: "SAVE"
  },
  HI: {
    demographic: "लक्षित_जनसांख्यिकी_चुनें",
    placeholder: "वस्तु स्कैन करें: जैसे 'कोका कोला की बोतल' या 'टूटा हुआ लैपटॉप'",
    scan: "स्कैन",
    match_found: "मिलान_मिला",
    category: "श्रेणी",
    protocol: "प्रोटोकॉल",
    actionable_tip: "कार्रवाई योग्य टिप",
    uploading: "इमेज डेटा अपलोड किया जा रहा है... न्यूरल मैच शुरू हो रहा है...",
    wet: "गीला",
    dry: "सूखा",
    recyclable: "पुनर्चक्रण योग्य",
    electronic: "इलेक्ट्रॉनिक",
    hazardous: "खतरनाक",
    kid: "बच्चा",
    student: "छात्र",
    adult: "वयस्क",
    camera_mode: "डिजिटल आंख",
    enable_camera: "न्यूरल फीड सक्षम करें",
    capture: "कैप्चर और विश्लेषण",
    camera_error: "न्यूरल लिंक विफल। हार्डवेयर अनुमति जांचें।",
    sim_notice: "लाइव न्यूरल स्कैन सक्रिय",
    loading_model: "न्यूरल कोर को कैलिब्रेट किया जा रहा है...",
    vision_ready: "विज़न सिस्टम ऑनलाइन",
    retry: "फिर से स्कैन करें",
    manual: "नाम बदलें",
    save: "सहेजें"
  },
  BN: {
    demographic: "লক্ষ্য_জনসংখ্যা_নির্বাচন_করুন",
    placeholder: "আইটেম স্ক্যান করুন: যেমন 'কোকা কোলা বোতল' বা 'ভাঙা ল্যাপটপ'",
    scan: "স্ক্যান",
    match_found: "মিল_পাওয়া_গেছে",
    category: "বিভাগ",
    protocol: "প্রটোকল",
    actionable_tip: "কার্যকরী পরামর্শ",
    uploading: "ইমেজ ডেটা আপলোড করা হচ্ছে... নিউরাল ম্যাচ শুরু হচ্ছে...",
    wet: "ভেজা",
    dry: "শুকনো",
    recyclable: "পুনর্ব্যবহারযোগ্য",
    electronic: "ইলেকট্রনিক",
    hazardous: "বিপজ্জনক",
    kid: "শিশু",
    student: "ছাত্র",
    adult: "প্রাপ্তবয়স্ক",
    camera_mode: "ডিজিটাল চোখ",
    enable_camera: "নিবিড় পর্যবেক্ষণ শুরু করুন",
    capture: "ছবি তুলুন এবং বিশ্লেষণ করুন",
    camera_error: "ক্যামেরা সংযোগ বিচ্ছিন্ন। অনুমতি পরীক্ষা করুন।",
    sim_notice: "লাইভ নিউরাল স্ক্যান সক্রিয়",
    loading_model: "নিউরল কোর ক্যালিব্রেট করা হচ্ছে...",
    vision_ready: "ভিশন সিস্টেম অনলাইন",
    retry: "আবার স্ক্যান করুন",
    manual: "নাম পরিবর্তন",
    save: "সংরক্ষণ"
  },
  MR: {
    demographic: "लक्ष्य_लोकसंख्या_निवडा",
    placeholder: "वस्तू स्कॅन करा: उदा. 'कोका कोला बाटली' किंवा 'तुटलेला लॅपटॉप'",
    scan: "स्कॅन",
    match_found: "जुळणी_सापडली",
    category: "वर्ग",
    protocol: "प्रोटोकॉल",
    actionable_tip: "उपयुक्त टीप",
    uploading: "इमेज डेटा अपलोड होत आहे... न्यूरल मॅच सुरू होत आहे...",
    wet: "ओला",
    dry: "सुका",
    recyclable: "पुनर्चक्रणक्षम",
    electronic: "इलेक्ट्रॉनिक",
    hazardous: "धोकादायक",
    kid: "मुलगा",
    student: "विद्यार्थी",
    adult: "प्रौढ",
    camera_mode: "डिजिटल डोळा",
    enable_camera: "कॅमेरा सुरू करा",
    capture: "कॅप्चर आणि विश्लेषण",
    camera_error: "कॅमेरा त्रुटी. कृपया परवानगी तपासा.",
    sim_notice: "लाइव्ह न्यूरल स्कॅन सक्रिय",
    loading_model: "न्यूरल कोअर कॅलिब्रेट होत आहे...",
    vision_ready: "व्हिजन सिस्टम ऑनलाइन",
    retry: "पुन्हा स्कॅन करा",
    manual: "नाव बदला",
    save: "जतन करा"
  },
  TE: {
    demographic: "లక్ష్య_జనాభాను_ఎంచుకోండి",
    placeholder: "వస్తువును స్కాన్ చేయండి: ఉదా. 'కోకా కోలా బాటిల్' లేదా 'పాడైన ల్యాప్‌టాప్'",
    scan: "స్కాన్",
    match_found: "సరిపోలిక_కనుగొనబడింది",
    category: "వర్గం",
    protocol: "ప్రోటోకాల్",
    actionable_tip: "ఉపయోగకరమైన చిట్కా",
    uploading: "చిత్ర డేటా అప్‌లోడ్ అవుతోంది... న్యూరల్ మ్యాచ్ ప్రారంభమవుతోంది...",
    wet: "తడి",
    dry: "పొడి",
    recyclable: "రీసైక్లింగ్",
    electronic: "ఎలక్ట్రానిక్",
    hazardous: "ప్రమాదకరం",
    kid: "పిల్లవాడు",
    student: "విద్యార్థి",
    adult: "పెద్దవారు",
    camera_mode: "డిజిటల్ కన్ను",
    enable_camera: "కెమెరాను ప్రారంభించండి",
    capture: "క్యాప్చర్ & విశ్లేషించండి",
    camera_error: "కెమెరా పనిచేయడం లేదు. అనుమతులు తనిఖీ చేయండి.",
    sim_notice: "లైవ్ న్యూరల్ స్కాన్ యాక్టివ్‌గా ఉంది",
    loading_model: "న్యూరల్ కోర్ క్రమాంకనం చేయబడుతోంది...",
    vision_ready: "విజన్ సిస్టమ్ ఆన్‌లైన్",
    retry: "మళ్ళీ స్కాన్ చేయండి",
    manual: "పేరు మార్చు",
    save: "సేవ్ చేయి"
  },
  TA: {
    demographic: "இலக்கு_மக்களைத்_தேர்ந்தெடுக்கவும்",
    placeholder: "பொருளை ஸய்கேன் செய்யவும்: எ.கா. 'கோகா கோலா பாட்டில்' அல்லது 'உடைந்த லேப்டாப்'",
    scan: "ஸ்கேன்",
    match_found: "பொருத்தம்_கண்டறியப்பட்டது",
    category: "வகை",
    protocol: "நெறிமுறை",
    actionable_tip: "செயல்பாட்டு உதவிக்குறிப்பு",
    uploading: "படத் தரவு பதிவேற்றப்படுகிறது... நியூரல் மேட்ச் தொடங்குகிறது...",
    wet: "ஈரமான",
    dry: "உலர்",
    recyclable: "மறுசுழற்சி",
    electronic: "மின்னணு",
    hazardous: "ஆபத்தானது",
    kid: "குழந்தை",
    student: "மாணவர்",
    adult: "பெரியவர்",
    camera_mode: "டிஜிட்டல் கண்",
    enable_camera: "கேமராவை இயக்கு",
    capture: "படம் பிடித்து பகுப்பாய்வு செய்",
    camera_error: "கேமரா கோளாறு. அனுமதிகளைச் சரிபார்க்கவும்.",
    sim_notice: "லைவ் நியூரல் ஸ்கேன் செயலில் உள்ளது",
    loading_model: "நியூரல் கோர் அளவீடு செய்யப்படுகிறது...",
    vision_ready: "விஷன் சிஸ்டம் ஆன்லைன்",
    retry: "மீண்டும் ஸ்கேன் செய்க",
    manual: "பெயரை மாற்றுக",
    save: "சேமி"
  },
  GU: {
    demographic: "લક્ષ્ય_વસ્તી_પસંદ_કરો",
    placeholder: "વસ્તુ સ્કેન કરો: દા.ત. 'કોકા કોલા બોટલ' અથવા 'તૂટેલું લેપટોપ'",
    scan: "શ્રેણી",
    match_found: "મેચ_મળી",
    category: "શ્રેણી",
    protocol: "પ્રોટોકોલ",
    actionable_tip: "ઉપયોગી ટિપ",
    uploading: "ઇમેજ ડેટા અપલોડ થઈ રહ્યો છે... ન્યુરલ મેચ શરૂ થઈ રહી છે...",
    wet: "ભીનો",
    dry: "સૂકો",
    recyclable: "રિસાયકલ",
    electronic: "ઇલેક્ટ્રોનિક",
    hazardous: "જોખમી",
    kid: "બાળક",
    student: "વિદ્યાર્થી",
    adult: "પુખ્ત",
    camera_mode: "ડિજિટલ આંખ",
    enable_camera: "કેમેરા સક્ષમ કરો",
    capture: "કેપ્ચર અને વિશ્લેષણ",
    camera_error: "કેમેરામાં ક્ષતિ. પરવાનગી તપાસો.",
    sim_notice: "લાઈવ ન્યુરલ સ્કેન સક્રિય",
    loading_model: "ન્યુરલ કોર માપાંકિત કરવામાં આવી રહ્યો છે...",
    vision_ready: "વિઝન સિસ્ટમ ઓનલાઇન",
    retry: "ફરીથી સ્કેન કરો",
    manual: "નામ બદલો",
    save: "સાચવો"
  },
};

// Mock Waste Database for mapping predictions
const WASTE_DB = {
  'plastic bottle': {
    matches: ['water bottle', 'plastic bottle', 'pop bottle', 'soda bottle', 'coke'],
    item: { EN: 'PET Plastic Bottle', HI: 'पीईटी प्लास्टिक की बोतल', BN: 'পিইটি প্লাস্টিকের বোতল', MR: 'PET प्लास्टिक बाटली', TE: 'PET ప్లాస్టిక్ బాటిల్', TA: 'PET பிளாஸ்டிக் பாட்டில்', GU: 'PET પ્લાસ્ટિક બોટલ' },
    category: 'Recyclable',
    categoryEmoji: '♻️',
    explanation: {
      kid: {
        EN: 'This is a magic bottle! If you put it in the blue bin, it can turn into a new t-shirt or a toy!',
        HI: 'यह एक जादुई बोतल है! यदि आप इसे नीले कूड़ेदान में डालते हैं, तो यह एक नई टी-शर्ट या खिलौने में बदल सकती है!',
        BN: 'এটি একটি জাদুকরী বোতল! নীল বিনে রাখলে এটি নতুন জামা বা খেলনায় পরিণত হতে পারে!',
        MR: 'ही एक जादूची बाटली आहे! निळ्या कचरापेटीत टाकल्यास त्यापासून नवीन टी-शर्ट किंवा खेळणी बनू शकतात!',
        TE: 'ఇది ఒక మాయా బాటిల్! నీలి రంగు డబ్బాలో వేస్తే, ఇది కొత్త టి-షర్ట్ లేదా బొమ్మగా మారుతుంది!',
        TA: 'இது ஒரு மாயாஜால பாட்டில்! நீல நிறத் தொட்டியில் போட்டால் அது புதிய சட்டையாகவோ பொம்மையாகவோ மாறும்!',
        GU: 'આ એક જાદુઈ બોટલ છે! જો તમે તેને વાદળી કચરાપેટીમાં નાખશો, તો તે નવી ટી-શર્ટ કે રમકડામાં ફેરવાઈ શકે છે!'
      },
      student: {
        EN: 'Polyethylene Terephthalate (PET) is highly recyclable. Proper disposal supports SDG 12 by reducing virgin plastic production.',
        HI: 'पॉलीइथाइलीन टेरेफ्थेलेट (पीईटी) अत्यधिक पुनर्चक्रण योग्य है। उचित निपटान वर्जिन प्लास्टिक उत्पादन को कम करके SDG 12 का समर्थन करता है।',
        BN: 'পিইটি (PET) প্লাস্টিক পুনর্ব্যবহারযোগ্য। সঠিক নিষ্কাশন নতুন প্লাস্টিক উৎপাদন কমিয়ে SDG 12 অর্জনে সহায়তা করে।',
        MR: 'PET हे सहजपणे पुनर्चক্রণ करता येणारे प्लास्टिक आहे. योग्य विल्हेवाट लावल्याने नवीन प्लास्टिक निर्मिती कमी होऊन SDG 12 ला मदत होते.',
        TE: 'PET ప్లాస్టిక్ సులభంగా రీసైకిల్ అవుతుంది. దీని ద్వారా వర్జిన్ ప్లాస్టిక్ వాడకం తగ్గి SDG 12 నెరవేరుతుంది.',
        TA: 'PET பிளாஸ்டிக் எளிதில் மறுசுழற்சி செய்யக்கூடியது. இதன் மூலம் புதிய பிளாસ્ટிக் உற்பத்தியைக் குறைத்து SDG 12 அடைய உதவலாம்.',
        GU: 'PET પ્લાસ્ટિક સરળતાથી રિસાયકલ થઈ શકે છે. તેના યોગ્ય નિકાલથી પ્લાસ્ટિકનું ઉત્પાદન ઘટે છે અને SDG 12 ને મદદ મળે છે.'
      },
      adult: {
        EN: 'Empty, crush, and place in the blue recycling bin. Ensure the cap is screwed on or removed as per local collection rules.',
        HI: 'खाली करें, कुचलें और नीले रीसाइक्लिंग बिन में रखें। सुनिश्चित करें कि स्थानीय संग्रह नियमों के अनुसार कैप लगा हुआ है या हटा दिया गया है।',
        BN: 'খালি করুন, দুমড়ে দিন এবং নীল রিসাইক্লিং বিনে রাখুন। স্থানীয় নিয়ম অনুযায়ী ক্যাপটি লাগিয়ে বা খুলে রাখুন।',
        MR: 'बाटली रिकामी करा, चपटा करा आणि निळ्या रिसायकल डब्यात टाका. स्थानिक नियमांनुसार झाकण काढून किंवा लावून ठेवा.',
        TE: 'బాటిల్ ఖాళీ చేసి, దాన్ని నొక్కి నీలి రంగు డబ్బాలో వేయండి. స్థానిక నిబంధనల ప్రకారం మూతను ఉంచాలా లేదా తీసేయాలా చూసుకోండి.',
        TA: 'பாட்டிலை காலி செய்து, நசுக்கி நீல நிற மறுசுழற்சி தொட்டியில் போடவும். உள்ளூர் விதிமுறைப்படி மூடியை வைக்கவும் அல்லது நீக்கவும்.',
        GU: 'બોટલ ખાલી કરો, તેને કચડી નાખો અને વાદળી રિસાયકલ બિનમાં મૂકો. સ્થાનિક નિયમો મુજબ કેપનું ધ્યાન રાખો.'
      }
    },
    disposalTip: {
      EN: 'In your city, plastic collection happens every Tuesday. Check for the nearest "Sahakari" recycling center.',
      HI: 'आपके शहर में, प्लास्टिक संग्रह हर मंगलवार को होता है। निकटतम "सहकारी" रीसाइक्लिंग केंद्र की जाँच करें।',
      BN: 'আপনার শহরে প্রতি মঙ্গলবার প্লাস্টিক সংগ্রহ করা হয়। আপনার কাছের রিসাইক্লিং সেন্টারের খোঁজ নিন।',
      MR: 'तुमच्या शहरात दर मंगळवारी प्लास्टिक कचरा संकलन होते. जवळच्या अधिकृत संकलन केंद्राची माहिती घ्या.',
      TE: 'మీ నగరంలో ప్రతి మంగళవారం ప్లాస్టిక్ సేకరణ జరుగుతుంది. సమీపంలోని రీసైక్లింగ్ కేంద్రాన్ని వెతకండి.',
      TA: 'உங்கள் நகரத்தில் ஒவ்வொரு செவ்வாய்க்கிழமையும் பிளாஸ்டிக் சேகரிக்கப்படுகிறது. அருகிலுள்ள மறுசுழற்சி மையத்தைச் சரிபார்க்கவும்.',
      GU: 'તમારા શહેરમાં દર મંગળવારે પ્લાસ્ટિક કચરો એકત્રિત કરવામાં આવે છે. નજીકના રિસાયક્લિંગ સેન્ટરની તપાસ કરો.'
    }
  },
  'banana peel': {
    matches: ['banana', 'peel', 'fruit', 'skin'],
    item: { EN: 'Banana Peel', HI: 'केले का छिलका', BN: 'কলা খোসা', MR: 'केळ्याचे साल', TE: 'అరటి తొక్క', TA: 'வாழைப்பழத் தோல்', GU: 'કેળાની છાલ' },
    category: 'Wet',
    categoryEmoji: '🍏',
    explanation: {
      kid: {
        EN: 'Banana skins are food for the earth! Put them in the green bin to help plants grow big and strong.',
        HI: 'केले के छिलके धरती का भोजन हैं! पौधों को बड़ा और मजबूत बनाने में मदद करने के लिए उन्हें हरे बिन में डालें।',
        BN: 'কলার খোসা পৃথিবীর খাবার! গাছপালাকে বড় করতে এইগুলো সবুজ বিনে ফেলো।',
        MR: 'केळ्याचे साल पृथ्वीसाठी अन्न आहे! वनस्पतींच्या वाढीसाठी ते हिरव्या कचरापेटीत टाका.',
        TE: 'అరటి తొక్కలు భూమికి ఆహారం! మొక్కలు పెరగడానికి వీటిని ఆకుపచ్చ డబ్బాల్లో వేయండి.',
        TA: 'வாழைப்பழத் தோல்கள் பூமிக்கு உணவு! செடிகள் வளர இவற்றை பச்சை நிறத் தொட்டியில் போடவும்.',
        GU: 'કેળાની છાલ પૃથ્વી માટે ખોરાક છે! છોડના વિકાસ માટે તેને લીલા કચરાપેટીમાં નાખો.'
      },
      student: {
        EN: 'Organic waste like this undergoes aerobic decomposition. It is perfect for composting to create nutrient-rich humus.',
        HI: 'इस तरह का जैविक कचरा एरोबिक अपघटन से गुजरता है। यह पोषक तत्वों से भरपूर ह्यूमस बनाने के लिए खाद बनाने के लिए एकदम सही है।',
        BN: 'এই ধরনের জৈব বর্জ্য প্রাকৃতিকভাবে পচে যায়। এটি চমৎকার সার বা হিউমাস তৈরির জন্য আদর্শ।',
        MR: 'हा सेंद्रिय कचरा आहे. याचे नैसर्गिक विघटन होऊन उत्तम खत तयार होते.',
        TE: 'ఇది సేంద్రియ వ్యర్థం. దీని ద్వారా మొక్కలకు అవసరమైన మంచి ఎరువు తయారవుతుంది.',
        TA: 'இது கரிம கழிவு. இது இயற்கையாக மட்கி செடிகளுக்கு உரமாகும்.',
        GU: 'આ જૈવિક કચરો છે. તેનું કુદરતી રીતે વિઘટન થઈને ઉત્તમ ખાતર તૈયાર થાય છે.'
      },
      adult: {
        EN: 'Dispose in the green compost bin. Avoid mixing with plastic liners to maintain compost purity.',
        HI: 'हरे रंग के कंपोस्ट बिन में निपटान करें। कंपोस्ट की शुद्धता बनाए रखने के लिए प्लास्टिक लाइनर के साथ मिलाने से बचें।',
        BN: 'সবুজ কম্পোস্ট বিনে ফেলুন। প্লাস্টিকের ব্যাগে পুরবেন না যাতে সারের বিশুদ্ধতা বজায় থাকে।',
        MR: 'हिरव्या खतकुंडीत टाका. प्लास्टिक थैल्यांचा वापर टाळा जेणेकरून खताचा दर्जा चांगला राहील.',
        TE: 'ఆకుపచ్చ కంపోస్ట్ డబ్బాలో వేయండి. ఎరువు స్వచ్ఛత కోసం ప్లాస్టిక్ కవర్లను వాడకండి.',
        TA: 'பச்சை நிறத் தொட்டியில் போடவும். எருவின் தரத்தை பராமரிக்க பிளாஸ்டிக் பைகளைத் தவிர்க்கவும்.',
        GU: 'લીલા કમ્પોસ્ટ બિનમાં નિકાલ કરો. ખાતરની શુદ્ધતા જાળવવા પ્લાસ્ટિકનો ઉપયોગ ટાળો.'
      }
    },
    disposalTip: {
      EN: 'Most apartments in Indian metros now have mandatory on-site composting pits for wet waste.',
      HI: 'भारतीय महानगरों के अधिकांश अपार्टमेंटों में अब गीले कचरे के लिए अनिवार्य ऑन-साइट कंपोस्टिंग गड्ढे हैं।',
      BN: 'ভারতের বড় শহরগুলোর অ্যাপার্টমেন্টে এখন ভেজা বর্জ্য থেকে সার তৈরির নিজস্ব ব্যবস্থা আছে।',
      MR: 'भारतीय शहरांतील बहुतांश सोसायट्यांमध्ये आता कचऱ्यावर प्रक्रिया करण्यासाठी प्रकल्प अनिवार्य आहेत.',
      TE: 'భారతదేశంలోని ప్రధాన నగరాల్లోని అపార్ట్‌మెంట్లలో తడి వ్యర్థాల కోసం కంపోస్ట్ పిట్స్ తప్పనిసరి అయ్యాయి.',
      TA: 'இந்திய நகரங்களில் உள்ள பெரும்பாலான அடுக்குமாடி குடியிருப்புகளில் இப்போது மக்கும் கழிவுகளுக்கான வசதிகள் உள்ளன.',
      GU: 'ભારતના મોટા શહેરોમાં હવે ભીના કચરા માટે સોસાયટીમાં જ કમ્પોઝ પ્લાન્ટ હોવો અનિવાર્ય છે.'
    }
  },
  'broken laptop': {
    matches: ['laptop', 'computer', 'notebook', 'keyboard', 'screen', 'monitor', 'mouse'],
    item: { EN: 'Generic E-Waste', HI: 'सामान्य ई-कचरा', BN: 'ই-বর্জ্য', MR: 'ई-कचरा', TE: 'E-వ్యర్థాలు', TA: 'மின்னணு கழிவு', GU: 'ઇ-કચરો' },
    category: 'Hazardous',
    categoryEmoji: '⚠️',
    explanation: {
      kid: {
        EN: 'This has batteries and wires that can be dangerous. Only a grown-up should take this to a special tech-dump!',
        HI: 'इसमें बैटरी और तार हैं जो खतरनाक हो सकते हैं। केवल एक वयस्क को ही इसे विशेष टेक-डंप पर ले जाना चाहिए!',
        BN: 'এতে বিপদজনক ব্যাটারি ও তার আছে। বড়দের সাহায্য নিয়ে এটি টেক-বর্জ্য বিনে ফেলো।',
        MR: 'यांच्या बॅटरी आणि तारा धोकादायक असू शकतात. मोठ्यांच्या मदतीनेच याचा योग्य निकाल लावा.',
        TE: 'ఇందులో ప్రమాదకరమైన బ్యాటరీలు మరియు వైర్లు ఉంటాయి. పెద్దల సహాయంతో దీనిని ఇ-వ్యర్థాల సేకరణ కేంద్రానికి పంపండి.',
        TA: 'இதில் அபாயகரமான பேட்டரிகள் மற்றும் கம்பிகள் உள்ளன. பெரியவர்களின் உதவியுடன் இதை மின்-கழிவு மையத்தில் ஒப்படைக்கவும்.',
        GU: 'આમાં બેટરી અને વાયરો હોય છે જે જોખમી હોઈ શકે છે. તેને ખાસ ઇ-વેસ્ટ સેન્ટર પર જ મોકલો.'
      },
      student: {
        EN: 'Electronic waste contains heavy metals like Lead and Mercury. It requires specialized mechanical recycling to prevent toxic leaching.',
        HI: 'इलेक्ट्रॉनिक कचरे में सीसा और पारा जैसी भारी धातुएं होती हैं। जहरीले रिसाव को रोकने के लिए इसे विशेष यांत्रिक पुनर्चक्रण की आवश्यकता होती है।',
        BN: 'ই-বর্জ্য পারদ ও সিসার মতো ভারী ধাতু থাকে। পরিবেশ দূষণ রুখতে এটি বিশেষ পদ্ধতিতে রিসাইক্লিং করা দরকার।',
        MR: 'ई-कचऱ्यामध्ये घातक धातू असतात. पर्यावरणाचे संरक्षण करण्यासाठी याचे विशेष पुनर्चक्रण होणे गरजेचे आहे.',
        TE: 'ఇ-వ్యర్థాలలో సీసం మరియు పాదరసం వంటి భార లోహాలు ఉంటాయి. వీటిని ప్రత్యేక పద్ధతిలో రీసైకిల్ చేయాలి.',
        TA: 'மின்-கழிவுகளில் ஈயம் மற்றும் பாதரசம் போன்ற உலோகங்கள் உள்ளன. இவற்றை முறையாக மறுசுழற்சி செய்ய வேண்டு.',
        GU: 'ઇ-કચરામાં લેડ અને મર્ક્યુરી જેવી ઝેરી ધાતુઓ હોય છે. તેનું ખાસ પદ્ધતિથી રિસાયક્લિંગ થવું જોઈએ.'
      },
      adult: {
        EN: 'Do not throw in regular bins. Schedule a pickup with an authorized E-waste recycler like Attero or Croma.',
        HI: 'नियमित कूड़ेदानों में न फेंकें। एटेरो या क्रोमा जैसे अधिकृत ई-कचरा रिसाइक्लर के साथ पिकअप शेड्यूल करें।',
        BN: 'সাধারণ বিনে ফেলবেন না। অনুমোদিত ই-বর্জ্য সংগ্রাহক সংস্থার (যেমন Attero) সাথে যোগাযোগ করুন।',
        MR: 'नियमित कचरापेटीत टाकू नका. अधिकृत ई-कचरा संकलन केंद्रांशी संपर्क साधा.',
        TE: 'సాధారణ డబ్బాల్లో వేయవద్దు. అధికృత రీసైక్లర్ల ద్వారా మాత్రమే దీనిని పంపండి.',
        TA: 'வழக்கமான குப்பைத் தொட்டியில் போட வேண்டாம். அங்கீகரிக்கப்பட்ட மறுசுழற்சி மையங்களை அணுகவும்.',
        GU: 'નિયમિત બિનમાં ફેંકશો નહીં. સત્તાવાર ઇ-કચરો રિસાયકલરનો સંપર્ક કરો.'
      }
    },
    disposalTip: {
      EN: 'Many "Croma" or "Reliance Digital" stores have E-waste collection bins at their entrances.',
      HI: 'कई "क्रोमा" या "रिलायंस डिजिटल" स्टोर के प्रवेश द्वार पर ई-कचरा संग्रह बिन हैं।',
      BN: 'অনেক বড় রিটেইল স্টোরের প্রবেশপথে ই-বর্জ্য ফেলার জন্য ড্রপবক্স থাকে।',
      MR: 'अनेक मोठ्या इलेक्ट्रॉनिक स्टोअर्समध्ये ई-कचरा संकलन पेट्या उपलब्ध असतात.',
      TE: 'అనేక ప్రధాన ఎలక్ట్రానిక్ స్టోర్లలో ఇ-వ్యర్థాల సేకరణ డబ్బాలు ఉంటాయి.',
      TA: 'பல மின்னணு கடைகளில் மின்-கழிவுகளைச் சேகரிக்க தனித் தொட்டிகள் உள்ளன.',
      GU: 'ઘણા મોટા ઇલેક્ટ્રોનિક સ્ટોર્સમાં ઇ-કચરો માટે સ્પેશિયલ બિન હોય છે.'
    }
  },
  'paper': {
    matches: ['paper', 'newspaper', 'book', 'magazine', 'cardboard', 'carton', 'envelope', 'notebook'],
    item: { EN: 'Paper / Cardboard', HI: 'कागज / कार्डबोर्ड', BN: 'কাগজ / কার্ডবোর্ড', MR: 'कागद / पुठ्ठा', TE: 'కాగితం / కార్డ్బోర్డ్', TA: 'காகிதம் / அட்டை', GU: 'કાગળ / કાર્ડબોર્ડ' },
    category: 'Recyclable',
    categoryEmoji: '📄',
    explanation: {
      kid: { EN: 'Paper can be born again! If we recycle it, we save trees.', HI: 'कागज का पुनर्जन्म हो सकता है! यदि हम इसे रीसायकल करते हैं, तो हम पेड़ों को बचाते हैं।' },
      student: { EN: 'Cellulose fibers can be processed 5-7 times. Recycling 1 ton of paper saves 17 trees.', HI: 'सेल्युलोज फाइबर को 5-7 बार संसाधित किया जा सकता है। 1 टन कागज को रीसायकल करने से 17 पेड़ बचते हैं।' },
      adult: { EN: 'Keep dry and flat. Avoid soiled paper (like pizza boxes) as oil contaminates the batch.', HI: 'सूखा और सपाट रखें। गंदे कागज (जैसे पिज्जा बॉक्स) से बचें क्योंकि तेल बैच को दूषित करता है।' }
    },
    disposalTip: { EN: 'Bundle with string and give to your local "Raddi-wala" for small cash rewards.', HI: 'रस्सी से बांधें और छोटे नकद पुरस्कारों के लिए अपने स्थानीय "रद्दी-वाला" को दें।' }
  },
  'glass': {
    matches: ['bottle', 'glass', 'jar', 'beaker', 'vial', 'carafe', 'goblet', 'wine'],
    item: { EN: 'Glass Container', HI: 'कांच का कंटेनर', BN: 'কাঁচের পাত্র', MR: 'काचेचे भांडे' },
    category: 'Recyclable',
    categoryEmoji: '🫙',
    explanation: {
      kid: { EN: 'Glass never wears out! It can be melted and made into brand new jars forever.', HI: 'कांच कभी खराब नहीं होता! इसे पिघलाया जा सकता है और हमेशा के लिए नए जार बनाए जा सकते हैं।' },
      student: { EN: 'Cullet (crushed glass) melts at lower temperatures than raw materials, saving energy.', HI: 'कलेट (कुचला हुआ कांच) कच्चे माल की तुलना में कम तापमान पर पिघलता है, जिससे ऊर्जा की बचत होती है।' },
      adult: { EN: 'Rinse thoroughly. Segregate by color if possible. Do not mix with mirrors or window glass.', HI: 'अच्छी तरह से धो लें। यदि संभव हो तो रंग के आधार पर अलग करें। दर्पण या खिड़की के कांच के साथ न मिलाएं।' }
    },
    disposalTip: { EN: 'Check for local glass workshops or dedicated municipal glass bins.', HI: 'स्थानीय कांच कार्यशालाओं या समर्पित नगरपालिका कांच के डिब्बों की जाँच करें।' }
  },
  'metal': {
    matches: ['can', 'tin', 'foil', 'metal', 'iron', 'steel', 'aluminum', 'pot', 'pan'],
    item: { EN: 'Metal / Aluminum', HI: 'धातु / एल्यूमीनियम', BN: 'ধাতু / অ্যালুমিনিয়াম' },
    category: 'Recyclable',
    categoryEmoji: '🥫',
    explanation: {
      kid: { EN: 'Metal cans are strong! They can become parts of airplanes or bicycles.', HI: 'धातु के डिब्बे मजबूत होते हैं! वे हवाई जहाज या साइकिल के हिस्से बन सकते हैं।' },
      student: { EN: 'Aluminum recycling saves 95% of the energy needed to make new metal from ore.', HI: 'एल्यूमीनियम रीसाइक्लिंग से अयस्क से नई धातु बनाने के लिए आवश्यक ऊर्जा का 95% बचता है।' },
      adult: { EN: 'Clean food residue. Crush cans to save space. Aluminum foil must be clean to be recycled.', HI: 'भोजन के अवशेष साफ करें। जगह बचाने के लिए डिब्बों को कुचलें। पुनर्चक्रित करने के लिए एल्यूमीनियम पन्नी साफ होनी चाहिए।' }
    },
    disposalTip: { EN: 'Kabadiwalas highly value metal. It has the highest recycling rate in India.', HI: 'कबाड़ीवाले धातु को बहुत महत्व देते हैं। भारत में इसकी रीसाइक्लिंग दर सबसे अधिक है।' }
  }
};

const getMockWasteData = (query, lang) => {
  const q = query.toLowerCase().trim();
  const t = TRANSLATIONS[lang] || TRANSLATIONS['EN'];
  
  // Advanced keyword matching
  let bestMatch = null;
  let highestScore = 0;

  for (const [key, details] of Object.entries(WASTE_DB)) {
    let score = 0;
    if (q.includes(key)) score += 10;
    details.matches?.forEach(m => {
      if (q.includes(m)) score += 5;
    });

    if (score > highestScore) {
      highestScore = score;
      bestMatch = details;
    }
  }

  if (bestMatch) {
    return {
      item: bestMatch.item[lang] || bestMatch.item['EN'],
      category: t[bestMatch.category.toLowerCase()] || bestMatch.category,
      categoryEmoji: bestMatch.categoryEmoji,
      explanation: {
        kid: bestMatch.explanation.kid[lang] || bestMatch.explanation.kid['EN'],
        student: bestMatch.explanation.student[lang] || bestMatch.explanation.student['EN'],
        adult: bestMatch.explanation.adult[lang] || bestMatch.explanation.adult['EN']
      },
      disposalTip: bestMatch.disposalTip[lang] || bestMatch.disposalTip['EN']
    };
  }

  // Generic fallback for unknown items
  return {
    item: query,
    category: t.dry,
    categoryEmoji: '📦',
    explanation: {
      kid: lang === 'EN' ? 'This looks like dry waste. Make sure it goes in the right bin so the trash-hero can pick it up!' : t.dry_explanation_kid || 'Loading...',
      student: lang === 'EN' ? 'General inorganic material. Should be segregated to ensure it doesn\'t contaminate the wet waste stream.' : t.dry_explanation_student || 'Loading...',
      adult: lang === 'EN' ? 'Place in the dry waste bin. Ensure it is relatively clean and dry before disposal.' : t.dry_explanation_adult || 'Loading...'
    },
    disposalTip: lang === 'EN' ? 'General dry waste is typically sorted by local municipal workers for further processing.' : t.dry_tip || 'Loading...'
  };
};

export default function WasteIDTab({ lang = 'EN' }) {
  const [mode, setMode] = useState('Adult');
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const [error, setError] = useState('');
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [cameraError, setCameraError] = useState('');
  
  // Vision States
  const [model, setModel] = useState(null);
  const [modelLoading, setModelLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState('');
  
  const videoRef = useRef(null);
  const streamRef = useRef(null);
  const t = TRANSLATIONS[lang] || TRANSLATIONS['EN'];

  // Load Model once on mount
  useEffect(() => {
    async function loadModel() {
      try {
        await tf.ready();
        const loadedModel = await mobilenet.load();
        setModel(loadedModel);
        setModelLoading(false);
      } catch (err) {
        console.error("Model load failure:", err);
        setCameraError(t.camera_error);
      }
    }
    loadModel();
  }, []);

  const identifyWaste = async (e, directQuery = null) => {
    if (e) e.preventDefault();
    const finalQuery = directQuery || query;
    if (!finalQuery.trim()) return;

    setLoading(true);
    setError('');
    setData(null);
    setIsEditing(false);

    // Artificial delay for "scanning" feel
    setTimeout(() => {
      try {
        const mockData = getMockWasteData(finalQuery, lang);
        setData({ ...mockData, modeUsed: mode, rawQuery: finalQuery });
      } catch (err) {
        setError(lang === 'EN' ? 'Scanner optics failure. Please recount item.' : 'স্ক্যানার বিভ্রাট। অনুগ্রহ করে পরে कोशिश करें।');
      } finally {
        setLoading(false);
      }
    }, 1200);
  };

  const startCamera = async () => {
    setCameraError('');
    
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      setCameraError("Camera API not supported in this browser (Insecure context?)");
      return;
    }

    try {
      // Use more flexible constraints for desktop/laptop compatibility
      const constraints = {
        video: {
          facingMode: { ideal: 'environment' },
          width: { ideal: 640 },
          height: { ideal: 640 }
        }
      };

      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      streamRef.current = stream;
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        // Ensure play is called explicitly
        try {
          await videoRef.current.play();
        } catch (playErr) {
          console.error("Video play failed:", playErr);
        }
      }
      setIsCameraActive(true);
    } catch (err) {
      console.error("Camera access error:", err);
      // Fallback: try with just video: true if specific constraints fail
      try {
        const fallbackStream = await navigator.mediaDevices.getUserMedia({ video: true });
        streamRef.current = fallbackStream;
        if (videoRef.current) {
          videoRef.current.srcObject = fallbackStream;
        }
        setIsCameraActive(true);
      } catch (fallbackErr) {
        console.error("Camera fallback failed:", fallbackErr);
        setCameraError(t.camera_error + " (" + err.name + ")");
      }
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    setIsCameraActive(false);
  };

  const captureAndScan = async () => {
    if (!model || !videoRef.current) return;

    setLoading(true);
    setCameraError('');
    
    try {
      // Ensure video is playing and has frames
      if (videoRef.current.readyState < 2) {
        // Wait a bit if video isn't ready
        await new Promise(resolve => setTimeout(resolve, 500));
      }

      // Check if video dimensions are valid
      if (videoRef.current.videoWidth === 0 || videoRef.current.videoHeight === 0) {
        throw new Error("Video stream has no graphical data. Check camera hardware.");
      }

      // Perform classification
      const predictions = await model.classify(videoRef.current);
      
      if (predictions && predictions.length > 0) {
        // Find the best match class name
        // Sometimes prediction is "water bottle, plastic bottle"
        const topResult = predictions[0].className.toLowerCase();
        console.log("Vision Raw Prediction:", predictions);
        
        // DO NOT stop camera here so user can scan again easily
        // stopCamera(); 
        
        // Set query to the first part of the result for better DB matching
        const cleanQuery = topResult.split(',')[0].trim();
        setQuery(cleanQuery);
        identifyWaste(null, cleanQuery);
      } else {
        setCameraError("Vision failed to focus. Try again.");
        setLoading(false);
      }
    } catch (err) {
      console.error("Vision Process Failure:", err);
      // More descriptive error based on common failure points
      let msg = "Neural processing error. Check lighting.";
      if (err.message.includes("hardware")) msg = "Camera hardware timed out. Refreshing feed...";
      if (err.name === "SecurityError") msg = "Browser security blocked the scan. Use HTTPS or localhost.";
      
      setCameraError(msg + " (" + (err.message || "Unknown") + ")");
      setLoading(false);
    }
  };

  useEffect(() => {
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  const getCategoryTheme = (category) => {
    const defaultCats = ['wet', 'dry', 'recyclable', 'electronic', 'hazardous'];
    const lowerCat = category?.toLowerCase();
    
    let normalized = lowerCat;
    for (const [key, value] of Object.entries(t)) {
      if (value.toLowerCase() === lowerCat && defaultCats.includes(key)) {
        normalized = key;
        break;
      }
    }

    if (normalized === 'wet') return { color: 'text-green-500', border: 'border-green-500/50', bg: 'bg-green-500/10' };
    if (normalized === 'dry' || normalized === 'recyclable') return { color: 'text-blue-400', border: 'border-blue-400/50', bg: 'bg-blue-400/10' };
    if (normalized === 'electronic') return { color: 'text-purple-400', border: 'border-purple-400/50', bg: 'bg-purple-400/10' };
    if (normalized === 'hazardous') return { color: 'text-red-500', border: 'border-red-500/50', bg: 'bg-red-500/10' };
    return { color: 'text-gray-400', border: 'border-gray-400/50', bg: 'bg-gray-400/10' };
  };

  return (
    <div className="w-full flex justify-center animate-in fade-in duration-500">
      <div className="w-full max-w-3xl space-y-8 pb-20">
        
        {/* Model Loading State */}
        {modelLoading && (
          <div className="flex items-center justify-center gap-3 p-4 bg-navy-card rounded-xl border border-teal-accent/20 animate-pulse">
             <Loader2 className="animate-spin text-teal-accent" size={20} />
             <p className="font-mono text-teal-accent text-sm uppercase tracking-widest">{t.loading_model}</p>
          </div>
        )}

        {!modelLoading && (
          <div className="flex items-center justify-center gap-2 text-[10px] font-mono text-teal-accent/50 uppercase tracking-widest">
            <Zap size={12} fill="currentColor" /> {t.vision_ready}
          </div>
        )}

        {/* Mode & Camera Toggle */}
        <div className="flex flex-col items-center gap-6">
           <div className="flex flex-col items-center">
             <p className="text-teal-accent font-mono text-sm mb-3">[{t.demographic}]</p>
             <div className="flex bg-navy-card p-1 rounded-lg border border-navy-border shadow-lg">
               {['Kid', 'Student', 'Adult'].map((m) => (
                 <button
                   key={m}
                   onClick={() => setMode(m)}
                   className={`px-4 sm:px-8 py-2 font-mono text-[10px] sm:text-sm rounded-md transition-all ${mode === m ? 'bg-navy-border text-green-neon border border-green-neon/50 shadow-[0_0_10px_rgba(0,230,118,0.1)]' : 'text-blue-muted hover:text-blue-text hover:bg-navy-base'}`}
                 >
                   {t[m.toLowerCase()]?.toUpperCase() || m.toUpperCase()}
                 </button>
               ))}
             </div>
           </div>

           <button 
             disabled={modelLoading}
             onClick={isCameraActive ? stopCamera : startCamera}
             className={`flex items-center gap-3 px-6 py-3 rounded-full border-2 transition-all font-mono text-sm shadow-lg ${isCameraActive ? 'border-red-500 text-red-500 bg-red-500/10' : 'border-teal-accent text-teal-accent bg-teal-accent/10 hover:bg-teal-accent/20 disabled:opacity-30'}`}
           >
             {isCameraActive ? <VideoOff size={18} /> : <Camera size={18} />}
             {isCameraActive ? "DISCONNECT FEED" : t.camera_mode.toUpperCase()}
           </button>
        </div>

        {/* Camera Feed View */}
        {isCameraActive && (
          <div className="relative group max-w-md mx-auto aspect-square overflow-hidden rounded-3xl border-4 border-teal-accent/30 shadow-[0_0_50px_rgba(20,184,166,0.3)] animate-in zoom-in duration-500">
            <video 
              ref={videoRef} 
              autoPlay 
              playsInline 
              muted
              className="w-full h-full object-cover grayscale brightness-125 contrast-125"
            />
            
            {/* Neural Scan Overlay */}
            <div className="absolute inset-0 pointer-events-none">
              <div className="h-full w-0.5 bg-teal-accent/50 absolute left-1/2 -translate-x-1/2 animate-[scan-line_4s_ease-in-out_infinite]"></div>
              <div className="w-full h-0.5 bg-teal-accent/50 absolute top-1/2 -translate-y-1/2 animate-[scan-line-h_5s_ease-in-out_infinite]"></div>
              
              <div className="absolute top-4 left-4 text-[8px] font-mono text-teal-accent space-y-1 bg-navy-base/20 p-2 rounded">
                <p>NEURAL_CORE: [ACTIVE]</p>
                <p>LATENCY: 0.04ms</p>
                <p>TFJS_VERSION: 4.22.0</p>
                <p>MAP_KEY: WASTE_V1</p>
              </div>

              <div className="absolute top-4 right-4 animate-pulse">
                <Aperture className="text-teal-accent" size={20} />
              </div>

              {/* Viewfinder corners */}
              <div className="absolute top-8 left-8 w-12 h-12 border-t-2 border-l-2 border-teal-accent"></div>
              <div className="absolute top-8 right-8 w-12 h-12 border-t-2 border-r-2 border-teal-accent"></div>
              <div className="absolute bottom-8 left-8 w-12 h-12 border-b-2 border-l-2 border-teal-accent"></div>
              <div className="absolute bottom-8 right-8 w-12 h-12 border-b-2 border-r-2 border-teal-accent"></div>

              <div className="absolute bottom-10 left-0 w-full text-center">
                 <p className="bg-navy-base/80 inline-block px-4 py-1 text-teal-accent font-mono text-[10px] rounded border border-teal-accent/20">
                    {t.sim_notice}
                 </p>
              </div>
            </div>

            <button 
              onClick={captureAndScan}
              className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-teal-accent text-navy-base px-8 py-4 rounded-xl font-mono font-bold hover:scale-105 active:scale-95 transition-all shadow-[0_0_30px_rgba(20,184,166,0.6)] flex items-center gap-2 group"
            >
              <Camera size={24} className="group-hover:rotate-12 transition-transform" />
              {t.capture.toUpperCase()}
            </button>
          </div>
        )}

        {cameraError && (
          <div className="bg-red-500/10 border border-red-500/50 rounded-xl p-4 text-red-400 font-mono flex items-center gap-3 max-w-md mx-auto">
             <AlertTriangle className="h-6 w-6 shrink-0" />
             <p>{cameraError}</p>
             <button onClick={() => setCameraError('')} className="ml-auto"><X size={16}/></button>
          </div>
        )}

        {/* Search Bar */}
        {!isCameraActive && (
          <form onSubmit={identifyWaste} className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-teal-accent">
              <ScanSearch className="h-6 w-6" />
            </div>
            <input
              type="text"
              className="block w-full pl-14 pr-4 py-5 bg-navy-card/80 border-2 border-navy-border rounded-xl text-blue-text font-mono text-xl focus:outline-none focus:ring-1 focus:ring-green-neon focus:border-green-neon transition-all placeholder:text-blue-muted/40 shadow-inner"
              placeholder={t.placeholder}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              disabled={loading}
            />
            <button
              type="submit"
              disabled={loading || !query.trim()}
              className="absolute inset-y-3 right-3 px-4 sm:px-8 bg-green-neon/10 hover:bg-green-neon/20 border border-green-neon text-green-neon font-mono font-bold text-sm sm:text-lg rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {loading ? <Loader2 className="animate-spin h-6 w-6" /> : t.scan.toUpperCase()}
            </button>
          </form>
        )}

        {error && (
          <div className="bg-red-500/10 border border-red-500/50 rounded-xl p-4 text-red-400 font-mono flex items-center gap-3">
            <AlertTriangle className="h-6 w-6 shrink-0" />
            <p>{error}</p>
          </div>
        )}

        {/* Loading Skeleton */}
        {loading && (
          <div className="bg-navy-card border border-navy-border rounded-2xl p-6 sm:p-8 animate-pulse text-center space-y-4">
             <ScanSearch className="h-10 w-10 text-teal-accent/50 mx-auto animate-bounce" />
             <p className="font-mono text-blue-muted text-sm uppercase">{t.uploading}</p>
             <div className="h-2 w-full max-w-sm mx-auto bg-navy-base rounded-full overflow-hidden">
               <div className="h-full bg-green-neon/50 w-full animate-[scan_1s_ease-in-out_infinite]"></div>
             </div>
          </div>
        )}

        {/* Results Dashboard */}
        {!loading && data && (
          <div className="bg-navy-card border border-navy-border rounded-2xl p-6 sm:p-8 animate-in slide-in-from-bottom-4 duration-700 relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 left-0 w-full h-1 bg-green-neon/30 blur-sm animate-pulse shadow-[0_0_20px_rgba(0,230,118,0.5)]"></div>
            
            <div className="flex flex-col md:flex-row gap-8 items-start relative z-10">
              <div className="w-full md:w-1/3">
                 <p className="text-teal-accent font-mono text-[10px] mb-2 flex items-center gap-2 opacity-70 uppercase tracking-tighter">
                   <CheckCircle2 size={12} /> [{t.match_found}]
                 </p>
                 
                 {isEditing ? (
                   <div className="flex gap-2 mb-4">
                     <input 
                       className="bg-navy-base border border-teal-accent/30 rounded px-2 py-1 font-mono text-sm text-blue-text w-full focus:outline-none focus:border-teal-accent"
                       value={editValue}
                       onChange={(e) => setEditValue(e.target.value)}
                       autoFocus
                     />
                     <button 
                       onClick={() => identifyWaste(null, editValue)}
                       className="bg-teal-accent text-navy-base px-3 py-1 rounded font-mono text-[10px] font-bold"
                     >
                       {t.save}
                     </button>
                   </div>
                 ) : (
                   <h2 className="text-2xl sm:text-3xl font-mono border-b border-navy-border/50 pb-4 mb-4 text-blue-text capitalize flex items-center justify-between">
                     {data.item}
                     <button 
                       onClick={() => { setIsEditing(true); setEditValue(data.rawQuery || data.item); }}
                       className="text-blue-muted hover:text-teal-accent p-1"
                       title={t.manual}
                     >
                       <Info size={14} />
                     </button>
                   </h2>
                 )}
                 
                 <div className="space-y-4">
                   <div>
                     <p className="text-blue-muted font-mono text-[10px] uppercase mb-2 opacity-50">{t.category}</p>
                     <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded border ${getCategoryTheme(data.category).border} ${getCategoryTheme(data.category).bg} ${getCategoryTheme(data.category).color} font-mono uppercase tracking-wider text-xs shadow-sm`}>
                       <span className="text-lg">{data.categoryEmoji}</span>
                       {data.category}
                     </div>
                   </div>

                   {/* Quick Action: Retry or Back to Camera */}
                   {isCameraActive && (
                     <button 
                       onClick={() => { setData(null); setQuery(''); }}
                       className="w-full flex items-center justify-center gap-2 py-3 border border-teal-accent/30 rounded-xl text-teal-accent font-mono text-xs hover:bg-teal-accent/10 transition-colors"
                     >
                       <Zap size={14} /> {t.retry}
                     </button>
                   )}
                 </div>
              </div>

              <div className="w-full md:w-2/3 space-y-6">
                <div className="bg-navy-base/80 border border-navy-border rounded-xl p-6 relative">
                  <div className="absolute top-0 right-4 -mt-3 bg-navy-base px-2 text-green-neon font-mono text-[8px] sm:text-xs border border-green-neon/30 rounded">
                    {t.protocol}: {t[data.modeUsed.toLowerCase()]?.toUpperCase() || data.modeUsed.toUpperCase()}
                  </div>
                  <p className="font-sans text-blue-text/90 leading-relaxed text-lg">
                    {data.explanation[data.modeUsed.toLowerCase()]}
                  </p>
                </div>

                <div className="flex items-start gap-4">
                  <div className="mt-1">
                    <Info className="text-teal-accent h-6 w-6" />
                  </div>
                  <div className="flex-1 p-4 bg-teal-accent/5 border border-teal-accent/20 rounded-lg">
                    <p className="text-teal-accent font-mono text-xs mb-1 uppercase tracking-wide opacity-80">{t.actionable_tip}</p>
                    <p className="font-sans text-blue-text text-sm leading-relaxed">
                      {data.disposalTip}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
