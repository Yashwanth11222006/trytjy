import { useState } from 'react';
import { Search, Loader2, AlertTriangle, Droplets, Wind, Zap, Activity, Leaf, ShieldAlert } from 'lucide-react';

const TRANSLATIONS = {
  EN: {
    placeholder: "ENTER INDIAN CITY NAME / E.g. Mumbai, Bengaluru...",
    analyze: "ANALYZE",
    loading: "ESTABLISHING CONNECTION TO SATELLITE NETWORK...",
    target: "TARGET",
    overall_score: "Overall Score",
    risk_level: "RISK",
    projection: "PROJECTION_2030",
    interventions: "RECOMMENDED_INTERVENTIONS",
    calculator: "IMPACT_CALCULATOR_SIM",
    waste_redirected: "Waste Redirected",
    co2_prevented: "CO2 Prevented",
    water_preserved: "Water Preserved",
    forest_equivalent: "Forest Equivalent",
    impact: "Impact",
    difficulty: "Diff",
    context: "Context",
    economic_impact: "Impact",
    tonnes: "T",
    litres: "L",
    trees: "Trees",
    crore: "Crore",
    regional_command: "Regional Command",
    low: "Low",
    medium: "Medium",
    high: "High",
    critical: "Critical",
    sdg_alignment: "requires immediate SDG alignment",
    waste_mgmt: "Waste Mgmt",
    water_contam: "H2O Contam",
    air_quality: "Air Quality",
    recycling: "Recycling",
    air_qa_short: "AIR_QA",
    h2o_contam_short: "H2O_CONTAM",
    waste_mgmt_short: "WASTE_MGMT",
    recycle_rt_short: "RECYCLE_RT"
  },
  HI: {
    placeholder: "भारतीय शहर का नाम दर्ज करें / जैसे मुंबई, बेंगलुरु...",
    analyze: "विश्लेषण करें",
    loading: "सैटेलाइट नेटवर्क से कनेक्शन स्थापित किया जा रहा है...",
    target: "लक्ष्य",
    overall_score: "कुल स्कोर",
    risk_level: "जोखिम",
    projection: "प्रक्षेपण_2030",
    interventions: "अनुशंसित_हस्तक्षेप",
    calculator: "प्रभाव_कैलकुलेटर_सिम",
    waste_redirected: "कचरा पुनर्निर्देशित",
    co2_prevented: "CO2 रोका गया",
    water_preserved: "पानी बचाया गया",
    forest_equivalent: "वन समकक्ष",
    impact: "प्रभाव",
    difficulty: "कठिनाई",
    context: "संदर्भ",
    economic_impact: "प्रभाव",
    tonnes: "टन",
    litres: "लीटर",
    trees: "पेड़",
    crore: "करोड़",
    regional_command: "क्षेत्रीय कमान",
    low: "कम",
    medium: "मध्यम",
    high: "उच्च",
    critical: "गंभीर",
    sdg_alignment: "को तत्काल SDG संरेखण की आवश्यकता है",
    waste_mgmt: "कचरा प्रबंधन",
    water_contam: "जल प्रदूषण",
    air_quality: "वायु गुणवत्ता",
    recycling: "पुनर्चक्रण",
    air_qa_short: "वायु_गुणवत्ता",
    h2o_contam_short: "जल_प्रदूषण",
    waste_mgmt_short: "कचरा_प्रबंधन",
    recycle_rt_short: "पुनर्चक्रण_दर"
  },
  BN: {
    placeholder: "ভারতীয় শহরের নাম দিন / যেমন: মুম্বাই, ব্যাঙ্গালোর...",
    analyze: "বিশ্লেষণ",
    loading: "স্যাটেলাইট নেটওয়ার্কের সাথে সংযোগ স্থাপন করা হচ্ছে...",
    target: "লক্ষ্য",
    overall_score: "সামগ্রিক স্কোর",
    risk_level: "ঝুঁকি",
    projection: "২০৩০_প্রক্ষেপণ",
    interventions: "প্রস্তাবিত_হস্তক্ষেপ",
    calculator: "প্রভাব_ক্যালকুলেটর",
    waste_redirected: "বর্জ্য পুনর্নির্দেশ",
    co2_prevented: "কার্বন ডাই অক্সাইড হ্রাস",
    water_preserved: "জল সংরক্ষণ",
    forest_equivalent: "বনের সমতুল্য",
    impact: "প্রভাব",
    difficulty: "কঠিনতা",
    context: "প্রেক্ষাপট",
    economic_impact: "প্রভাব",
    tonnes: "টন",
    litres: "লিটার",
    trees: "গাছ",
    crore: "কোটি",
    regional_command: "আঞ্চলিক কমান্ড",
    low: "কম",
    medium: "মাঝারি",
    high: "উচ্চ",
    critical: "সংকটজনক",
    sdg_alignment: "অবিলম্বে SDG সারিবদ্ধকরণ প্রয়োজন",
    waste_mgmt: "বর্জ্য ব্যবস্থাপনা",
    water_contam: "জল দূষণ",
    air_quality: "বায়ুর গুণমান",
    recycling: "রিসাইক্লিং",
    air_qa_short: "বায়ু_গুণ",
    h2o_contam_short: "জল_দূষণ",
    waste_mgmt_short: "বর্জ্য_ব্যবহ",
    recycle_rt_short: "রিসাইক্ল_হার"
  },
  MR: {
    placeholder: "भारतीय शहराचे नाव टाका / उदा. मुंबई, बेंगळुरू...",
    analyze: "विश्लेषण करा",
    loading: "सॅटेलाइट नेटवर्कशी संपर्क स्थापित केला जात आहे...",
    target: "लक्ष्य",
    overall_score: "एकूण गुण",
    risk_level: "धोका",
    projection: "२०३०_अंदाज",
    interventions: "शिफारस केलेले उपाय",
    calculator: "प्रभाव_कॅल्क्युलेटर",
    waste_redirected: "कचरा वळवला",
    co2_prevented: "CO2 प्रतिबंध",
    water_preserved: "पाणी वाचवले",
    forest_equivalent: "वन समतुल्य",
    impact: "प्रभाव",
    difficulty: "काठिण्य",
    context: "संदर्भ",
    economic_impact: "प्रभाव",
    tonnes: "टन",
    litres: "लिटर",
    trees: "झाडे",
    crore: "कोटी",
    regional_command: "प्रादेशिक कमांड",
    low: "कमी",
    medium: "मध्यम",
    high: "जास्त",
    critical: "गंभीर",
    sdg_alignment: "तात्काळ SDG संरेखण आवश्यक आहे",
    waste_mgmt: "कचरा व्यवस्थापन",
    water_contam: "जल प्रदूषण",
    air_quality: "हवेची गुणवत्ता",
    recycling: "पुनर्चक्रण",
    air_qa_short: "हवा_गुण",
    h2o_contam_short: "जल_प्रदूषण",
    waste_mgmt_short: "कचरा_व्य",
    recycle_rt_short: "रिसायकल_दर"
  },
  TE: {
    placeholder: "భారతీయ నగరం పేరు నమోదు చేయండి / ఉదా. ముంబై, బెంగళూరు...",
    analyze: "విశ్లేషించు",
    loading: "శాటిలైట్ నెట్‌వర్క్‌కు అనుసంధానం చేయబడుతోంది...",
    target: "లక్ష్యం",
    overall_score: "మొత్తం స్కోరు",
    risk_level: "ప్రమాదం",
    projection: "2030_అంచనా",
    interventions: "సూచించిన పరిష్కారాలు",
    calculator: "ప్రభావ_క్యాలిక్యులేటర్",
    waste_redirected: "వ్యర్థాల తగ్గింపు",
    co2_prevented: "CO2 నియంత్రణ",
    water_preserved: "నీటి పొదుపు",
    forest_equivalent: "అడవుల సమానం",
    impact: "ప్రభావం",
    difficulty: "కష్టం",
    context: "సందర్భం",
    economic_impact: "ప్రభావం",
    tonnes: "టన్నులు",
    litres: "లీటర్లు",
    trees: "చెట్లు",
    crore: "కోట్లు",
    regional_command: "ప్రాంతీయ కమాండ్",
    low: "తక్కువ",
    medium: "మధ్యస్థం",
    high: "ఎక్కువ",
    critical: "కీలకం",
    sdg_alignment: "తక్షణ SDG అమరిక అవసరం",
    waste_mgmt: "వ్యర్థాల నిర్వహణ",
    water_contam: "నీటి కాలుష్యం",
    air_quality: "గాలి నాణ్యత",
    recycling: "రీసైక్లింగ్",
    air_qa_short: "గాలి_నాణ్యత",
    h2o_contam_short: "నీటి_కాలుష్యం",
    waste_mgmt_short: "వ్యర్థాల_నిర్",
    recycle_rt_short: "రీసైక్లింగ్_రేటు"
  },
  TA: {
    placeholder: "இந்திய நகரத்தின் பெயரை உள்ளிடவும் / எ.கா. மும்பை, பெங்களூரு...",
    analyze: "பகுப்பாய்வு",
    loading: "செயற்கைக்கோள் நெட்வொர்க்குடன் இணைப்பு ஏற்படுத்தப்படுகிறது...",
    target: "இலக்கு",
    overall_score: "ஒட்டுமொத்த மதிப்பெண்",
    risk_level: "ஆபத்து",
    projection: "2030_முன்கணிப்பு",
    interventions: "பரிந்துரைக்கப்பட்ட தீர்வுகள்",
    calculator: "தாக்க_கணக்கீடு",
    waste_redirected: "கழிவு மாற்றம்",
    co2_prevented: "CO2 தடுப்பு",
    water_preserved: "நீர் சேமிப்பு",
    forest_equivalent: "வனம் சமமானது",
    impact: "தாக்கம்",
    difficulty: "சிரமம்",
    context: "சூழல்",
    economic_impact: "தாக்கம்",
    tonnes: "டன்",
    litres: "லிட்டர்",
    trees: "மரங்கள்",
    crore: "கோடி",
    regional_command: "பிராந்திய கட்டளை",
    low: "குறைவு",
    medium: "நடுத்தரம்",
    high: "அதிகம்",
    critical: "தீவிரம்",
    sdg_alignment: "உடனடி SDG சீரமைப்பு தேவை",
    waste_mgmt: "கழிவு மேலாண்மை",
    water_contam: "நீர் மாசு",
    air_quality: "காற்று தரம்",
    recycling: "மறுசுழற்சி",
    air_qa_short: "காற்று_தரம்",
    h2o_contam_short: "நீர்_மாசு",
    waste_mgmt_short: "கழிவு_மேலா",
    recycle_rt_short: "மறுசுழற்சி_விகிதம்"
  },
  GU: {
    placeholder: "ભારતીય શહેરનું નામ દાખલ કરો / દા.ત. મુંબઈ, બેંગલુરુ...",
    analyze: "વિશ્લેષણ",
    loading: "સેટેલાઇટ નેટવર્ક સાથે જોડાણ સ્થાપિત થઈ રહ્યું છે...",
    target: "લક્ષ્ય",
    overall_score: "કુલ સ્કોર",
    risk_level: "જોખમ",
    projection: "2030_અંદાજ",
    interventions: "ભલામણ કરેલ ઉપાયો",
    calculator: "પ્રભાવ_કેલ્ક્યુલેટર",
    waste_redirected: "કચરો ઘટાડ્યો",
    co2_prevented: "CO2 નિવારણ",
    water_preserved: "પાણી બચાવ્યું",
    forest_equivalent: "જંગલ સમકક્ષ",
    impact: "પ્રભાવ",
    difficulty: "મુશ્કેલી",
    context: "સંદર્ભ",
    economic_impact: "પ્રભાવ",
    tonnes: "ટન",
    litres: "લિટર",
    trees: "વૃક્ષો",
    crore: "કરોડ",
    regional_command: "પ્રાદેશિક કમાન્ડ",
    low: "ઓછું",
    medium: "મધ્યમ",
    high: "ઉચ્ચ",
    critical: "ગંભીર",
    sdg_alignment: "તાત્કાલિક SDG સંરેખણની જરૂર છે",
    waste_mgmt: "કચરા વ્યવસ્થાપન",
    water_contam: "જળ પ્રદૂષણ",
    air_quality: "હવાની ગુણવત્તા",
    recycling: "પુનઃચક્રણ",
    air_qa_short: "હવા_ગુણ",
    h2o_contam_short: "જળ_પ્રદૂષણ",
    waste_mgmt_short: "કચરા_વ્ય",
    recycle_rt_short: "રિસાયકલ_દર"
  }
};

// Mock Data Generator for Hackathon Demo
const getMockCityData = (cityName, lang) => {
  const name = cityName.trim().toUpperCase();
  const seed = name.length + (name.charCodeAt(0) || 0);
  const scoreBase = (seed * 13) % 40 + 30; // 30-70 range
  const t = TRANSLATIONS[lang] || TRANSLATIONS['EN'];

  const risks_translated = {
    wasteManagement: {
      EN: { reason: "Landfill saturation reaching 85% capacity.", context: "Unsorted municipal solid waste (MSW) backlog in outskirts." },
      HI: { reason: "लैंडफिल संतृप्ति 85% क्षमता तक पहुँच रही है।", context: "बाहरी इलाकों में बिना छांटे गए नगरपालिका ठोस कचरे का बैकलॉग।" },
      BN: { reason: "ল্যান্ডফিল ৮৫% পূর্ণ হয়ে গিয়েছে।", context: "শহরের উপকণ্ঠে অসংগৃহীত বর্জ্যের স্তূপ জমেছে।" },
      MR: { reason: "लँडफिल कचरा ८५% क्षमतेपर्यंत पोहोचला आहे.", context: "शहराच्या बाहेरील भागात कचरा वर्गीकरण न झाल्याने समस्या आहे." },
      TE: { reason: "ల్యాండ్‌ఫిల్ నిల్వ సామర్థ్యం 85%కి చేరుకుంది.", context: "నగర శివారుల్లో వ్యర్థాల సేకరణ సక్రమంగా లేదు." },
      TA: { reason: "குப்பை நிலக்களம் 85% திறனை எட்டியுள்ளது.", context: "நகர ஒதுக்குப்புறங்களில் கழிவுகள் வரிசைப்படுத்தப்படாமல் உள்ளது." },
      GU: { reason: "લેન્ડફિલ 85% ક્ષમતા સુધી પહોંચી ગઈ છે.", context: "શહેરના બહારના વિસ્તારોમાં કચરાના નિકાલની સમસ્યા છે." }
    },
    waterContamination: {
      EN: { reason: "Groundwater nitrate levels exceeding safety limits.", context: "Secondary aquifer showing chemical runoff traces." },
      HI: { reason: "भूजल नाइट्रेट का स्तर सुरक्षा सीमा से अधिक है।", context: "द्वितीयक जलभृत रासायनिक अपवाह के निशान दिखा रहा है।" },
      BN: { reason: "ভূগর্ভস্থ জলে নাইট্রেটের মাত্রা বিপদসীমার উপরে।", context: "রাসায়নিক বর্জ্যের কারণে জলস্তর দূষিত হচ্ছে।" },
      MR: { reason: "भूजलातील नायट्रेट पातळी मर्यादेबाहेर आहे.", context: "रासायनिक कचऱ्यामुळे जलसाठे दूषित होत आहेत." },
      TE: { reason: "భూగర్భ జలాల్లో నైట్రేట్ స్థాయిలు పెరిగాయి.", context: "రసాయన వ్యర్థాల వల్ల జలవనరులు కలుషితమవుతున్నాయి." },
      TA: { reason: "நிலத்தடி நீரில் நைட்ரேட் அளவு அதிகரித்துள்ளது.", context: "ரசாயனக் கழிவுகளால் நீர் நிலைகள் பாதிக்கப்பட்டுள்ளன." },
      GU: { reason: "ભૂગર્ભ જળમાં નાઈટ્રેટનું પ્રમાણ વધી ગયું છે.", context: "રાસાયણિક કચરાને કારણે પાણી પ્રદૂષિત થઈ રહ્યું છે." }
    },
    airQuality: {
      EN: { reason: "PM2.5 concentrations 4x above WHO guidelines.", context: "Transport corridor emissions compounding seasonal haze." },
      HI: { reason: "PM2.5 सांद्रता WHO के दिशा-निर्देशों से 4 गुना ऊपर है।", context: "परिवहन गलियारे का उत्सर्जन मौसमी धुंध को बढ़ा रहा है।" },
      BN: { reason: "বাতাসে PM2.5 এর মাত্রা বিশ্ব স্বাস্থ্য সংস্থার গাইডলাইনের চেয়ে ৪ গুণ বেশি।", context: "যানবাহনের ধোঁয়া শহরের কুয়াশার সাথে মিশে দূষণ বাড়াচ্ছে।" },
      MR: { reason: "हवेतील PM2.5 ची पातळी धोक्याच्या वर आहे.", context: "वाहतुकीमुळे होणारे उत्सर्जन हवेची गुणवत्ता खराब करत आहे." },
      TE: { reason: "PM2.5 స్థాయిలు WHO మార్గదర్శకాల కంటే 4 రెట్లు ఎక్కువగా ఉన్నాయి.", context: "వాహనాల పొగ వల్ల గాలి నాణ్యత దెబ్బతింటోంది." },
      TA: { reason: "PM2.5 அளவு WHO வழிகாட்டுதல்களை விட 4 மடங்கு அதிகம்.", context: "போக்குவரத்து புகை காற்றை மாசுபடுத்தி வருகிறது." },
      GU: { reason: "PM2.5 નું પ્રમાણ WHO માર્ગદર્શિકા કરતા 4 ગણું વધારે છે.", context: "વાહનોના ધુમાડાને કારણે હવાની ગુણવત્તા બગડી રહી છે." }
    },
    recyclingRate: {
      EN: { reason: "Post-consumer plastic recovery rate below 12%.", context: "Informal sector handling 90% of material flow." },
      HI: { reason: "उपभोक्ता के बाद प्लास्टिक रिकवरी दर 12% से नीचे है।", context: "अनौपचारिक क्षेत्र 90% सामग्री प्रवाह को संभाल रहा है।" },
      BN: { reason: "প্লাস্টিক রিসাইক্লিং হার ১২% এর নিচে।", context: "অসংগঠিত ক্ষেত্র প্রায় ৯০% বর্জ্য সামলাচ্ছে।" },
      MR: { reason: "प्लास्टिक पुनर्वापर दर १२% च्या खाली आहे.", context: "कचरा वेचणारी ही यंत्रणा ९०% काम करत आहे." },
      TE: { reason: "ప్లాస్టిక్ రీసైక్లింగ్ రేటు 12% కంటే తక్కువ ఉంది.", context: "అసంఘటిత రంగమే 90% వ్యర్థాలను రీసైకిల్ చేస్తోంది." },
      TA: { reason: "பிளாஸ்டிக் மறுசுழற்சி விகிதம் 12% க்கும் குறைவாக உள்ளது.", context: "முறைசாரா துறையே 90% கழிவுகளை கையாள்கிறது." },
      GU: { reason: "પ્લાસ્ટિક રિસાયક્લિંગ દર 12% થી ઓછો છે.", context: "અસંગઠિત ક્ષેત્ર 90% કચરાનું સંચાલન કરે છે." }
    }
  };

  const solutions_translated = [
    {
      title: { EN: "Decentralized Composting", HI: "विकेंद्रीकृत कंपोस्टिंग", BN: "বিকেন্দ্রীভূত কম্পোস্টিং", MR: "विकेंद्रित खत प्रकल्प", TE: "వికేంద్రీకృత కంపోస్టింగ్", TA: "பரவலாக்கப்பட்ட மட்குதல்", GU: "વિકેન્દ્રિત ખાતર યોજના" },
      desc: { EN: "Convert organic waste at source to reduce landfill load by 40%.", HI: "लैंडफिल लोड को 40% तक कम करने के लिए स्रोत पर जैविक कचरे को बदलें।", BN: "উৎসেই জৈব বর্জ্য প্রক্রিয়াকরণ করে ল্যান্ডফিলের চাপ ৪০% কমান।", MR: "उगमस्थानी कचरा प्रक्रिया करून लँडफिलचा ताण ४०% कमी करा.", TE: "వ్యర్థాలను మూలంలోనే వేరు చేసి ల్యాండ్‌ఫిల్ భారాన్ని 40% తగ్గించండి.", TA: "கழிவுகளை உற்பத்தி இடத்திலேயே மக்கச் செய்வதன் மூலம் குப்பைக் கிடங்கு சுமையை 40% குறைக்கலாம்.", GU: "સ્ત્રોત પર જ જૈવિક કચરાનો નિકાલ કરીને લેન્ડફિલનો ભાર 40% ઘટાડો." }
    },
    {
      title: { EN: "EV Transit Corridors", HI: "ईवी ट्रांजिट कॉरिडोर", BN: "ইভি ট্রানজিট করিডোর", MR: "ईव्ही वाहतूक मार्ग", TE: "EV రవాణా కారిడార్లు", TA: "மின்னணு வாகன போக்குவரத்து", GU: "EV પરિવહન માર્ગ" },
      desc: { EN: "Replace diesel feeders with electric micro-mobility for better air quality.", HI: "बेहतर वायु गुणवत्ता के लिए डीजल फीडर को इलेक्ट्रिक माइक्रो-मोबिलिटी से बदलें।", BN: "বায়ু দূষণ কমাতে ডিজেল চালিত যানবাহনের বদলে ইলেকট্রিক যান ব্যবহার করুন।", MR: "चांगल्या हवा गुणवत्तेसाठी डिझेल गाड्यांऐवजी इलेक्ट्रिक वाहनांचा वापर करा.", TE: "మెరుగైన గాలి నాణ్యత కోసం డీజిల్ వాహనాల స్థానంలో ఎలక్ట్రిక్ వాహనాలను వాడండి.", TA: "நல்ல காற்று தரத்திற்காக டீசல் வாகனங்களுக்கு பதிலாக மின்சார வாகனங்களை பயன்படுத்துங்கள்.", GU: "વધુ સારી હવાની ગુણવત્તા માટે ડીઝલ વાહનોને બદલે ઇલેક્ટ્રિક વાહનોનો ઉપયોગ કરો." }
    },
    {
      title: { EN: "Methane Capture System", HI: "मीथेन कैप्चर सिस्टम", BN: "মিথেন ক্যাপচার সিস্টেম", MR: "मिथेन वायु संकलन यंत्रणा", TE: "మీథేన్ క్యాప్చర్ వ్యవస్థ", TA: "மீத்தேன் வாயு சேகரிப்பு", GU: "મિથેન કેપ્ચર સિસ્ટમ" },
      desc: { EN: "Install bio-gas recovery at primary dumpsites to prevent CO2 release.", HI: "CO2 रिलीज को रोकने के लिए प्राथमिक डंपसाइट पर बायो-गैस रिकवरी स्थापित करें।", BN: "গ্রিনহাউস গ্যাস কমাতে বর্জ্য ফেলার জায়গায় মিথেন সংগ্রহ করার ব্যবস্থা করুন।", MR: "CO2 उत्सर्जन रोखण्यासाठी कचरा डेपोमध्ये बायोगॅस निर्मिती करा.", TE: "CO2 విడుదలను అరికట్టడానికి వ్యర్థాల నిల్వ ప్రాంతాలలో బయో-గ్యాస్ ప్లాంట్లను ఏర్పాటు చేయండి.", TA: "CO2 வெளியீட்டைத் தடுக்க குப்பைக் கிடங்குகளில் உயிரி எரிவாயு சேகரிப்பு முறையை நிறுவுங்கள்.", GU: "CO2 ઉત્સર્જન રોકવા માટે ડમ્પસાઇટ્સ પર બાયો-ગેસ રિકવરી પ્લાન્ટ સ્થાપો." }
    }
  ];

  const warnings = {
    EN: "CRITICAL RESOURCE DEPLETION LIKELY BY Q3 2029",
    HI: "2029 की तीसरी तिमाही तक संसाधनों की भारी कमी होने की संभावना है",
    BN: "২০২৯ সালের মধ্যে বড়োসড়ো সম্পদ সংকট দেখা দিতে পারে",
    MR: "२०२९ पर्यंत मोठी साधनसामग्री टंचाई जाणवू शकते",
    TE: "2029 నాటికి భారీ వనరుల కొరత ఏర్పడే అవకాశం ఉంది",
    TA: "2029 ஆம் ஆண்டிற்குள் கடும் வளத் தட்டுப்பாடு ஏற்பட வாய்ப்புள்ளது",
    GU: "2029 સુધીમાં સંસાધનોની ભારે અછત થવાની શક્યતા છે"
  };

  return {
    "city": cityName,
    "state": t.regional_command,
    "population": (seed / 10).toFixed(1) + " " + t.crore,
    "overallScore": scoreBase,
    "overallLevel": scoreBase < 40 ? t.low : scoreBase < 65 ? t.medium : t.high,
    "summary": lang === 'EN' 
      ? `Sustainability audit for ${cityName} reveals significant vectors in waste processing and air quality. Regional infrastructure ${t.sdg_alignment}.`
      : lang === 'HI' ? `${cityName} के लिए स्थिरता ऑडिट अपशिष्ट प्रसंस्करण और वायु गुणवत्ता में महत्वपूर्ण कारकों को प्रकट करता है। क्षेत्रीय बुनियादी ढांचे ${t.sdg_alignment}।`
      : lang === 'BN' ? `${cityName}-এর জন্য স্থায়িত্ব নিরীক্ষা বর্জ্য প্রক্রিয়াকরণ এবং বায়ুর গুণমানে উল্লেখযোগ্য কারণগুলি প্রকাশ করে। আঞ্চলিক পরিকাঠামোয় ${t.sdg_alignment}।`
      : lang === 'MR' ? `${cityName} साठीची शाश्वतता तपासणी कचरा प्रक्रिया आणि हवेच्या गुणवत्तेत महत्त्वाचे घटक दर्शवते. प्रादेशिक पायाभूत सुविधांना ${t.sdg_alignment}.`
      : lang === 'TE' ? `${cityName} కోసం నిర్వహించిన ఆడిట్ వ్యర్థాల ప్రాసెసింగ్ మరియు గాలి నాణ్యతలో కీలక సమస్యలను వెల్లడించింది. ప్రాంతీయ మౌలిక సదుపాయాలకు ${t.sdg_alignment}.`
      : lang === 'TA' ? `${cityName} க்கான நிலைத்தன்மை தணிக்கை கழிவு மேலாண்மை மற்றும் காற்று தரத்தில் முக்கிய காரணிகளை வெளிப்படுத்துகிறது. பிராந்திய உள்கட்டமைப்பு ${t.sdg_alignment}.`
      : lang === 'GU' ? `${cityName} માટે સસ્ટેનેબિલિટી ઓડિટ કચરાના નિકાલ અને હવાની ગુણવત્તામાં મહત્વપૂર્ણ પરિબળો દર્શાવે છે. પ્રાદેશિક માળખાગત સુવિધાઓને ${t.sdg_alignment}.`
      : `Audit for ${cityName} reveals ${t.low} sustainability.`,
    "highestRisk": seed % 2 === 0 ? "wasteManagement" : "airQuality",
    "risks": {
      "wasteManagement": {
        "score": (scoreBase + 10) % 100,
        "level": t.medium,
        "reason": (risks_translated.wasteManagement[lang] || risks_translated.wasteManagement['EN']).reason,
        "localContext": (risks_translated.wasteManagement[lang] || risks_translated.wasteManagement['EN']).context,
        "economicImpact": "4.2B",
        "climateLink": "SDG 13"
      },
      "waterContamination": {
        "score": (scoreBase - 5 + 100) % 100,
        "level": t.low,
        "reason": (risks_translated.waterContamination[lang] || risks_translated.waterContamination['EN']).reason,
        "localContext": (risks_translated.waterContamination[lang] || risks_translated.waterContamination['EN']).context,
        "economicImpact": "1.8B",
        "climateLink": "SDG 6"
      },
      "airQuality": {
        "score": (scoreBase + 25) % 100,
        "level": t.high,
        "reason": (risks_translated.airQuality[lang] || risks_translated.airQuality['EN']).reason,
        "localContext": (risks_translated.airQuality[lang] || risks_translated.airQuality['EN']).context,
        "economicImpact": "9.5B",
        "climateLink": "SDG 13"
      },
      "recyclingRate": {
        "score": (scoreBase - 15 + 100) % 100,
        "level": t.critical,
        "reason": (risks_translated.recyclingRate[lang] || risks_translated.recyclingRate['EN']).reason,
        "localContext": (risks_translated.recyclingRate[lang] || risks_translated.recyclingRate['EN']).context,
        "economicImpact": "0.4B",
        "climateLink": "SDG 12"
      }
    },
    "solutions": [
      {
        "sdg": "SDG 12",
        "icon": "🌿",
        "title": (solutions_translated[0].title[lang] || solutions_translated[0].title['EN']),
        "description": (solutions_translated[0].desc[lang] || solutions_translated[0].desc['EN']),
        "difficulty": t.low,
        "impact": t.high
      },
      {
        "sdg": "SDG 11",
        "icon": "🏙️",
        "title": (solutions_translated[1].title[lang] || solutions_translated[1].title['EN']),
        "description": (solutions_translated[1].desc[lang] || solutions_translated[1].desc['EN']),
        "difficulty": t.medium,
        "impact": t.high
      },
      {
        "sdg": "SDG 13",
        "icon": "🌍",
        "title": (solutions_translated[2].title[lang] || solutions_translated[2].title['EN']),
        "description": (solutions_translated[2].desc[lang] || solutions_translated[2].desc['EN']),
        "difficulty": t.medium,
        "impact": t.high
      }
    ],
    "impactCalculator": {
      "wasteTonnesReduced": seed * 120,
      "waterLitresSaved": seed * 45000,
      "co2TonnesPrevented": seed * 12,
      "recyclingImprovement": 15.5,
      "treesEquivalent": seed * 85
    },
    "projection2030": {
      "wasteManagement": Math.max(0, scoreBase - 10),
      "waterContamination": Math.max(0, scoreBase - 15),
      "airQuality": Math.max(0, scoreBase - 5),
      "recyclingRate": Math.min(100, scoreBase + 20),
      "warningMessage": scoreBase > 60 ? (warnings[lang] || warnings['EN']) : ""
    }
  };
};

const getRiskColor = (score) => {
  if (score < 40) return 'text-green-neon';
  if (score < 70) return 'text-yellow-400';
  return 'text-red-500';
};

const getRiskBg = (score) => {
  if (score < 40) return 'bg-green-neon';
  if (score < 70) return 'bg-yellow-400';
  return 'bg-red-500';
};

const formatNumber = (num) => {
  return new Intl.NumberFormat('en-IN').format(num);
};

function MetricCard({ icon, title, metric, lang }) {
  const colorClass = getRiskColor(metric.score);
  const bgClass = getRiskBg(metric.score);
  const t = TRANSLATIONS[lang] || TRANSLATIONS['EN'];
  
  return (
    <div className="bg-navy-card border border-navy-border rounded-xl p-5 hover:bg-navy-card/80 transition-colors group relative overflow-hidden flex flex-col justify-between h-full">
      <div className={`absolute -right-4 -bottom-4 w-16 h-16 ${bgClass} opacity-[0.03] group-hover:opacity-[0.08] rounded-full blur-xl transition-opacity`}></div>
      
      <div>
        <div className="flex items-center justify-between mb-4 text-blue-muted group-hover:text-blue-text transition-colors">
          <div className="flex items-center gap-2">
            <span className="text-teal-accent">{icon}</span>
            <span className="font-mono text-sm uppercase tracking-wider font-bold">{title}</span>
          </div>
          <span className="font-mono text-[10px] uppercase text-blue-muted/70 px-2 py-1 bg-navy-base rounded border border-navy-border">
            {metric.level}
          </span>
        </div>
        
        <div className="mb-4">
           <div className="flex items-baseline gap-1 mb-2">
             <span className={`text-3xl font-mono font-bold ${colorClass}`}>{metric.score}</span>
           </div>
           <div className="h-1 w-full bg-navy-base rounded overflow-hidden mb-4">
              <div className={`h-full ${bgClass} transition-all duration-1000 ease-out`} style={{ width: `${metric.score}%` }}></div>
           </div>
           <p className="font-sans text-sm text-blue-text/90 italic border-l-2 border-navy-border pl-2 py-1">
             "{metric.reason}"
           </p>
        </div>
      </div>

      <div className="space-y-2 mt-4 pt-4 border-t border-navy-border/50 font-mono text-xs">
         <div className="flex flex-col gap-1">
           <span className="text-teal-accent/70 uppercase">{t.context}:</span>
           <span className="text-blue-muted line-clamp-2">{metric.localContext}</span>
         </div>
         <div className="flex justify-between items-center bg-navy-base/50 px-2 py-1.5 rounded mt-2">
           <span className="text-red-400">{t.economic_impact}: ₹{metric.economicImpact}</span>
           <span className="text-blue-400 border border-blue-400/30 px-1 rounded">{metric.climateLink}</span>
         </div>
      </div>
    </div>
  );
}

export default function CityAnalysisTab({ lang = 'EN' }) {
  const [city, setCity] = useState('');
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const [error, setError] = useState('');
  const t = TRANSLATIONS[lang] || TRANSLATIONS['EN'];

  const analyzeCity = async (e) => {
    e.preventDefault();
    if (!city.trim()) return;

    setLoading(true);
    setError('');
    setData(null);

    // Artificial delay for "processing" feel
    setTimeout(() => {
      try {
        const mockData = getMockCityData(city, lang);
        localStorage.setItem('vaayu_last_city', mockData.city);
        setData(mockData);
      } catch (err) {
        setError(lang === 'EN' ? 'Intelligence node timeout. Please retry.' : 'ইন্টেলিজেন্স নোড টাইমআউট। অনুগ্রহ করে পরে চেষ্টা করুন।');
      } finally {
        setLoading(false);
      }
    }, 1500);
  };

  return (
    <div className="w-full flex justify-center animate-in fade-in duration-500">
      <div className="w-full max-w-5xl space-y-6">
        
        {/* Search Bar */}
        <form onSubmit={analyzeCity} className="relative">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-teal-accent" />
          </div>
          <input
            type="text"
            className="block w-full pl-12 pr-4 py-4 bg-navy-card/80 border border-navy-border rounded-xl text-blue-text font-mono text-lg focus:outline-none focus:ring-1 focus:ring-green-neon focus:border-green-neon transition-all placeholder:text-blue-muted/50"
            placeholder={t.placeholder}
            value={city}
            onChange={(e) => setCity(e.target.value)}
            disabled={loading}
          />
          <button
            type="submit"
            disabled={loading || !city.trim()}
            className="absolute inset-y-2 right-2 px-6 bg-green-neon/10 hover:bg-green-neon/20 border border-green-neon text-green-neon font-mono font-bold rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
          >
            {loading ? <Loader2 className="animate-spin h-5 w-5" /> : t.analyze.toUpperCase()}
          </button>
        </form>

        {error && (
          <div className="bg-red-500/10 border border-red-500/50 rounded-lg p-4 text-red-400 font-mono text-sm flex items-center gap-3">
            <AlertTriangle className="h-5 w-5" />
            {error}
          </div>
        )}

        {/* Loading Skeleton */}
        {loading && (
          <div className="space-y-6 animate-pulse">
            <div className="h-40 bg-navy-card/50 border border-navy-border rounded-xl flex items-center justify-center">
              <div className="flex flex-col items-center gap-4 text-teal-accent font-mono">
                <Loader2 className="animate-spin h-8 w-8 text-green-neon" />
                <p>{t.loading}</p>
                <div className="flex gap-1">
                  <div className="w-2 h-2 rounded bg-green-neon animate-bounce" style={{animationDelay: '0ms'}}></div>
                  <div className="w-2 h-2 rounded bg-green-neon animate-bounce" style={{animationDelay: '150ms'}}></div>
                  <div className="w-2 h-2 rounded bg-green-neon animate-bounce" style={{animationDelay: '300ms'}}></div>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
               {[1,2,3,4].map(i => <div key={i} className="h-48 bg-navy-card/50 border border-navy-border rounded-xl"></div>)}
            </div>
          </div>
        )}

        {/* Dashboard Content */}
        {!loading && data && (
          <div className="space-y-6 animate-in slide-in-from-bottom-4 duration-700">
            {/* Header Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="md:col-span-2 bg-navy-card border border-navy-border rounded-xl p-6 relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-br from-navy-card to-navy-base opacity-50"></div>
                <div className="relative z-10 flex justify-between items-start">
                   <div>
                     <p className="text-teal-accent font-mono text-sm mb-1 uppercase">[{t.target}: {data.city}, {data.state}]</p>
                     <h2 className="text-4xl font-mono font-bold text-blue-text tracking-tight uppercase mb-2">{data.city}</h2>
                     <p className="font-sans text-sm text-blue-text/80 max-w-lg mb-4">{data.summary}</p>
                     
                     <div className="flex items-center gap-3 text-sm font-mono text-blue-muted">
                        <span className="px-2 py-1 border border-navy-border rounded bg-navy-base">
                          POPULATION: {data.population}
                        </span>
                        <span className="px-2 py-1 border border-red-500/30 rounded bg-red-500/10 text-red-400 text-[10px] md:text-sm">
                           {lang === 'EN' ? 'CRITICAL VECTOR' : lang === 'HI' ? 'महत्वपूर्ण कारक' : lang === 'BN' ? 'সংকটজনক ক্ষেত্র' : lang === 'MR' ? 'महत्त्वाचे घटक' : lang === 'TE' ? 'కీలక సమస్య' : lang === 'TA' ? 'தீவிர ஆபத்து' : 'મહત્વપૂર્ણ કારક'}: {data.highestRisk.replace(/([A-Z])/g, ' $1').trim().toUpperCase()}
                        </span>
                     </div>
                   </div>
                   <div className="text-right shrink-0">
                     <p className="text-blue-muted font-mono text-xs mb-1 uppercase">{t.overall_score}</p>
                     <div className="flex items-baseline gap-1 justify-end">
                       <span className={`text-6xl font-mono font-bold ${getRiskColor(data.overallScore)}`}>{data.overallScore}</span>
                       <span className="text-blue-muted font-mono text-xl">/100</span>
                     </div>
                     <p className={`font-mono text-xs uppercase mt-1 ${getRiskColor(data.overallScore)}`}>
                        [{data.overallLevel} {t.risk_level}]
                     </p>
                   </div>
                </div>
              </div>

              <div className="bg-navy-card border border-navy-border rounded-xl p-6 flex flex-col justify-between">
                <div>
                   <p className="text-teal-accent font-mono text-sm mb-2 flex items-center gap-2">
                     <Activity size={16} /> [{t.projection}]
                   </p>
                   <ul className="space-y-3 mt-4">
                     <li className="flex justify-between items-center text-sm font-mono">
                        <span className="text-blue-muted">{t.air_qa_short}:</span>
                        <span className={`font-bold ${getRiskColor(data.projection2030.airQuality)}`}>{data.projection2030.airQuality}</span>
                     </li>
                     <li className="flex justify-between items-center text-sm font-mono">
                        <span className="text-blue-muted">{t.h2o_contam_short}:</span>
                        <span className={`font-bold ${getRiskColor(data.projection2030.waterContamination)}`}>{data.projection2030.waterContamination}</span>
                     </li>
                     <li className="flex justify-between items-center text-sm font-mono">
                        <span className="text-blue-muted">{t.waste_mgmt_short}:</span>
                        <span className={`font-bold ${getRiskColor(data.projection2030.wasteManagement)}`}>{data.projection2030.wasteManagement}</span>
                     </li>
                     <li className="flex justify-between items-center text-sm font-mono">
                        <span className="text-blue-muted">{t.recycle_rt_short}:</span>
                        <span className={`font-bold ${getRiskColor(data.projection2030.recyclingRate)}`}>{data.projection2030.recyclingRate}</span>
                     </li>
                   </ul>
                </div>
                {data.projection2030.warningMessage && (
                  <div className="mt-4 p-2 bg-red-500/10 border border-red-500/30 rounded text-red-400 text-xs font-mono flex gap-2">
                    <ShieldAlert size={14} className="shrink-0" />
                    <span>{data.projection2030.warningMessage}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Metrics Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-4">
              <MetricCard 
                icon={<Wind size={20} />} 
                title={t.air_quality} 
                metric={data.risks.airQuality} 
                lang={lang}
              />
              <MetricCard 
                icon={<Droplets size={20} />} 
                title={t.water_contam} 
                metric={data.risks.waterContamination} 
                lang={lang}
              />
              <MetricCard 
                icon={<AlertTriangle size={20} />} 
                title={t.waste_mgmt} 
                metric={data.risks.wasteManagement} 
                lang={lang}
              />
              <MetricCard 
                icon={<Zap size={20} />} 
                title={t.recycling} 
                metric={data.risks.recyclingRate} 
                lang={lang}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Solutions List */}
              <div className="md:col-span-2 bg-navy-card border border-navy-border rounded-xl p-6">
                <p className="text-teal-accent font-mono text-sm mb-4 border-b border-navy-border/50 pb-2 flex items-center gap-2">
                  <Leaf size={16} /> [{t.interventions}]
                </p>
                <div className="space-y-4">
                  {data.solutions.map((solution, idx) => (
                    <div key={idx} className="bg-navy-base/50 border border-navy-border hover:border-green-neon/50 transition-colors rounded-lg p-5 group cursor-default flex gap-4 items-start">
                      <div className="text-3xl shrink-0 mt-1">{solution.icon}</div>
                      <div className="flex-1">
                        <div className="flex justify-between items-start mb-1">
                          <h3 className="text-blue-text font-mono font-semibold text-lg">{solution.title}</h3>
                          <span className="text-xs font-mono px-2 py-0.5 rounded bg-blue-900/30 text-blue-muted border border-blue-800 shrink-0">
                            {solution.sdg}
                          </span>
                        </div>
                        <p className="text-blue-muted font-sans text-sm leading-relaxed mb-3">{solution.description}</p>
                        <div className="flex gap-3 text-xs font-mono uppercase">
                          <span className="text-green-neon/80">{t.impact}: {solution.impact}</span>
                          <span className="text-yellow-400/80">{t.difficulty}: {solution.difficulty}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Impact Calculator */}
              <div className="bg-navy-card border border-navy-border rounded-xl p-6">
                 <p className="text-teal-accent font-mono text-sm mb-4 border-b border-navy-border/50 pb-2">
                  [{t.calculator}]
                 </p>
                 <div className="space-y-6 py-2">
                    <div>
                      <p className="text-xs font-mono text-blue-muted uppercase mb-1">{t.waste_redirected}</p>
                      <p className="text-2xl font-mono font-bold text-green-neon">{formatNumber(data.impactCalculator.wasteTonnesReduced)} {t.tonnes}</p>
                    </div>
                    <div>
                      <p className="text-xs font-mono text-blue-muted uppercase mb-1">{t.co2_prevented}</p>
                      <p className="text-2xl font-mono font-bold text-blue-400">{formatNumber(data.impactCalculator.co2TonnesPrevented)} {t.tonnes}</p>
                    </div>
                    <div>
                      <p className="text-xs font-mono text-blue-muted uppercase mb-1">{t.water_preserved}</p>
                      <p className="text-2xl font-mono font-bold text-teal-accent">{formatNumber(data.impactCalculator.waterLitresSaved)} {t.litres}</p>
                    </div>
                    <div>
                      <p className="text-xs font-mono text-blue-muted uppercase mb-1">{t.forest_equivalent}</p>
                      <p className="text-2xl font-mono font-bold text-green-500">{formatNumber(data.impactCalculator.treesEquivalent)} {t.trees}</p>
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
