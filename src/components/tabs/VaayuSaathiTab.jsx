import { useState } from 'react';
import { Apple, Package, Monitor, Skull, Info, X } from 'lucide-react';

export default function VaayuSaathiTab({ lang = 'EN' }) {
  const [selectedCategory, setSelectedCategory] = useState(null);

  const translations = {
    EN: {
      header: "TAP WHAT YOU HAVE",
      categories: {
        organic: "FOOD & PLANTS",
        recyclable: "PAPER & PLASTIC",
        electronic: "ELECTRONICS",
        hazardous: "DANGER"
      },
      results: {
        organic: {
          title: "GREEN BIN",
          instruction: "PUT IN GREEN BIN TO MAKE SOIL",
          examples: "Banana peel, Leaves, Leftover food"
        },
        recyclable: {
          title: "BLUE BIN",
          instruction: "PUT IN BLUE BIN TO REMAKE",
          examples: "Clean bags, Dry paper, Empty bottles"
        },
        electronic: {
          title: "SPECIAL DROP",
          instruction: "GIVE TO E-WASTE SHOP",
          examples: "Broken phones, Old batteries, Wires"
        },
        hazardous: {
          title: "WARNING",
          instruction: "KEEP AWAY FROM CHILDREN",
          examples: "Paint, Chemicals, Medicines"
        }
      }
    },
    HI: {
      header: "अपने पास मौजूद कचरे पर टैप करें",
      categories: {
        organic: "भोजन और पौधे",
        recyclable: "कागज और प्लास्टिक",
        electronic: "इलेक्ट्रॉनिक्स",
        hazardous: "खतरा"
      },
      results: {
        organic: {
          title: "हरा कूड़ादान",
          instruction: "मिट्टी बनाने के लिए हरे कूड़ेदान में डालें",
          examples: "केले के छिलके, पत्तियां, बचा हुआ भोजन"
        },
        recyclable: {
          title: "नीला कूड़ादान",
          instruction: "पुनर्चक्रण के लिए नीले कूड़ेदान में डालें",
          examples: "साफ बैग, सूखा कागज, खाली बोतलें"
        },
        electronic: {
          title: "विशेष ड्रॉप",
          instruction: "ई-कचरा दुकान को दें",
          examples: "टूटे फोन, पुरानी बैटरी, तार"
        },
        hazardous: {
          title: "चेतावनी",
          instruction: "बच्चों से दूर रखें",
          examples: "पेंट, रसायन, दवाएं"
        }
      }
    },
    BN: {
      header: "আপনার কাছে কী আছে তা ট্যাপ করুন",
      categories: {
        organic: "খাবার ও গাছপালা",
        recyclable: "কাগজ ও প্লাস্টিক",
        electronic: "ইলেকট্রনিক্স",
        hazardous: "বিপদ"
      },
      results: {
        organic: {
          title: "সবুজ বিন",
          instruction: "সার তৈরির জন্য সবুজ বিনে রাখুন",
          examples: "কলার খোসা, পাতা, অবশিষ্ট খাবার"
        },
        recyclable: {
          title: "নীল বিন",
          instruction: "পুনরায় তৈরির জন্য নীল বিনে রাখুন",
          examples: "পরিষ্কার ব্যাগ, শুকনো কাগজ, খালি বোতল"
        },
        electronic: {
          title: "বিশেষ ড্রপ",
          instruction: "ই-বর্জ্য দোকানে দিন",
          examples: "ভাঙা ফোন, পুরনো ব্যাটারি, তার"
        },
        hazardous: {
          title: "সতর্কতা",
          instruction: "শিশুদের থেকে দূরে রাখুন",
          examples: "রঙ, রাসায়নিক, ওষুধ"
        }
      }
    },
    MR: {
      header: "तुमच्याकडे काय आहे त्यावर क्लिक करा",
      categories: {
        organic: "अन्न आणि झाडे",
        recyclable: "कागज आणि प्लास्टिक",
        electronic: "इलेक्ट्रॉनिक्स",
        hazardous: "धोका"
      },
      results: {
        organic: {
          title: "हिरवा डबा",
          instruction: "खत बनवण्यासाठी हिरव्या डब्यात टाका",
          examples: "केळ्याचे साल, पाने, उरलेले अन्न"
        },
        recyclable: {
          title: "निळा डबा",
          instruction: "पुनर्निर्मितीसाठी निळ्या डब्यात टाका",
          examples: "स्वच्छ पिशव्या, सुका कागद, रिकाम्या बाटल्या"
        },
        electronic: {
          title: "विशेष ड्रॉप",
          instruction: "ई-कचरा दुकानात द्या",
          examples: "तुटलेले फोन, जुन्या बॅटरी, तारा"
        },
        hazardous: {
          title: "चेतावणी",
          instruction: "मुलांपासून लांब ठेवा",
          examples: "रंग, रसायने, औषधे"
        }
      }
    },
    TE: {
      header: "మీ దగ్గర ఏముందో దానిపై నొక్కండి",
      categories: {
        organic: "ఆహారం & మొక్కలు",
        recyclable: "కాగితం & ప్లాస్టిక్",
        electronic: "ఎలక్ట్రానిక్స్",
        hazardous: "ప్రమాదం"
      },
      results: {
        organic: {
          title: "ఆకుపచ్చ డబ్బా",
          instruction: "ఎరువు తయారీకి ఆకుపచ్చ డబ్బాలో వేయండి",
          examples: "అరటి తొక్క, ఆకులు, మిగిలిన ఆహారం"
        },
        recyclable: {
          title: "నీలి డబ్బా",
          instruction: "రీసైక్లింగ్ కోసం నీలి డబ్బాలో వేయండి",
          examples: "ఖాళీ సంచులు, పొడి కాగితం, ఖాళీ సీసాలు"
        },
        electronic: {
          title: "ప్రత్యేక డ్రాప్",
          instruction: "ఇ-వ్యర్థాల దుకాణంలో ఇవ్వండి",
          examples: "పాడైన ఫోన్లు, పాత బ్యాటరీలు, వైర్లు"
        },
        hazardous: {
          title: "హెచ్చరిక",
          instruction: "పిల్లలకు దూరంగా ఉంచండి",
          examples: "పెయింట్, రసాయనాలు, మందులు"
        }
      }
    },
    TA: {
      header: "உங்களிடம் இருப்பதைத் தட்டுங்கள்",
      categories: {
        organic: "உணவு & தாவரங்கள்",
        recyclable: "காகிதம் & பிளாஸ்டிக்",
        electronic: "மின்னணுவியல்",
        hazardous: "ஆபத்து"
      },
      results: {
        organic: {
          title: "பச்சை தொட்டி",
          instruction: "உரம் தயாரிக்க பச்சை தொட்டியில் போடவும்",
          examples: "வாழைப்பழத் தோல், இலைகள், மீதமுள்ள உணவு"
        },
        recyclable: {
          title: "நீல தொட்டி",
          instruction: "மறுசுழற்சிக்காக நீல தொட்டியில் போடவும்",
          examples: "சுத்தமான பைகள், உலர்ந்த காகிதம், காலி பாட்டில்கள்"
        },
        electronic: {
          title: "சிறப்பு மையம்",
          instruction: "மின்-கழிவு கடையில் கொடுக்கவும்",
          examples: "உடைந்த போன்கள், பழைய பேட்டரிகள், கம்பிகள்"
        },
        hazardous: {
          title: "எச்சரிக்கை",
          instruction: "குழந்தைகளிடமிருந்து தள்ளி வைக்கவும்",
          examples: "பெயிண்ட், இரசாயனங்கள், மருந்துகள்"
        }
      }
    },
    GU: {
      header: "તમારી પાસે શું છે તેના પર ટેપ કરો",
      categories: {
        organic: "ખોરાક અને છોડ",
        recyclable: "કાગળ અને પ્લાસ્ટિક",
        electronic: "ઇલેક્ટ્રોનિક્સ",
        hazardous: "જોખમ"
      },
      results: {
        organic: {
          title: "લીલી કચરાપેટી",
          instruction: "ખાતર બનાવવા માટે લીલી કચરાપેટીમાં નાખો",
          examples: "કેળાની છાલ, પાંદડા, વધેલો ખોરાક"
        },
        recyclable: {
          title: "વાદળી કચરાપેટી",
          instruction: "રિમેકિંગ માટે વાદળી કચરાપેટીમાં નાખો",
          examples: "ચોખ્ખી બેગ, સૂકો કાગળ, ખાલી બોટલો"
        },
        electronic: {
          title: "ખાસ ડ્રોપ",
          instruction: "ઇ-વેસ્ટ શોપ પર આપો",
          examples: "તૂટેલા ફોન, જૂની બેટરીઓ, વાયરો"
        },
        hazardous: {
          title: "ચેતવણી",
          instruction: "બાળકોથી દૂર રાખો",
          examples: "રંગ, રસાયણો, દવાઓ"
        }
      }
    }
  };

  const t = translations[lang] || translations['EN'];

  // Big category buttons data
  const categories = [
    {
      id: 'organic',
      icon: <Apple className="w-24 h-24 mb-4" />,
      title: t.categories.organic,
      color: 'text-green-500',
      bgClass: 'bg-green-500/10 hover:bg-green-500/20',
      borderColor: 'border-green-500',
      shadow: 'hover:shadow-[0_0_30px_rgba(34,197,94,0.3)]',
    },
    {
      id: 'recyclable',
      icon: <Package className="w-24 h-24 text-blue-400 mb-4" />,
      title: t.categories.recyclable,
      color: 'text-blue-400',
      bgClass: 'bg-blue-400/10 hover:bg-blue-400/20',
      borderColor: 'border-blue-400',
      shadow: 'hover:shadow-[0_0_30px_rgba(96,165,250,0.3)]',
    },
    {
      id: 'electronic',
      icon: <Monitor className="w-24 h-24 text-purple-400 mb-4" />,
      title: t.categories.electronic,
      color: 'text-purple-400',
      bgClass: 'bg-purple-400/10 hover:bg-purple-400/20',
      borderColor: 'border-purple-400',
      shadow: 'hover:shadow-[0_0_30px_rgba(192,132,252,0.3)]',
    },
    {
      id: 'hazardous',
      icon: <Skull className="w-24 h-24 text-red-500 mb-4" />,
      title: t.categories.hazardous,
      color: 'text-red-500',
      bgClass: 'bg-red-500/10 hover:bg-red-500/20',
      borderColor: 'border-red-500',
      shadow: 'hover:shadow-[0_0_30px_rgba(239,68,68,0.3)]',
    }
  ];

  // Visual Result Cards Data
  const categoryResults = {
    'organic': {
      ...t.results.organic,
      color: 'text-green-500',
      bgColor: 'bg-green-500/20',
      borderColor: 'border-green-500',
    },
    'recyclable': {
      ...t.results.recyclable,
      color: 'text-blue-400',
      bgColor: 'bg-blue-400/20',
      borderColor: 'border-blue-400',
    },
    'electronic': {
      ...t.results.electronic,
      color: 'text-purple-400',
      bgColor: 'bg-purple-400/20',
      borderColor: 'border-purple-400',
    },
    'hazardous': {
      ...t.results.hazardous,
      color: 'text-red-500',
      bgColor: 'bg-red-500/20',
      borderColor: 'border-red-500',
    }
  };

  return (
    <div className="w-full flex justify-center animate-in fade-in duration-500">
      <div className="w-full max-w-4xl space-y-8 text-center pb-20">
        
        <div className="mb-10">
          <h2 className="text-xl sm:text-3xl font-mono text-blue-text font-bold mb-4 uppercase">{t.header}</h2>
        </div>

        {/* Visual Category Selection Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 p-4">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`flex flex-col items-center justify-center p-8 sm:p-12 rounded-3xl border-2 transition-all duration-300 ${cat.borderColor} ${cat.bgClass} ${cat.shadow} group relative overflow-hidden`}
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-white/20 blur-sm translate-y-[-100%] group-hover:animate-[scan_2s_ease-in-out_infinite]"></div>
              
              <div className={`transition-transform duration-300 group-hover:scale-110 ${cat.color}`}>
                {cat.icon}
              </div>
              
              <span className={`text-xl sm:text-2xl font-mono font-bold tracking-widest mt-6 ${cat.color}`}>
                {cat.title}
              </span>
            </button>
          ))}
        </div>

        {/* Result Overlay Card */}
        {selectedCategory && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-base/90 backdrop-blur-md animate-in fade-in zoom-in-95 duration-300">
            <div className={`w-full max-w-2xl bg-navy-card border-4 rounded-3xl p-6 sm:p-10 relative shadow-2xl ${categoryResults[selectedCategory].borderColor}`}>
              
              <button 
                onClick={() => setSelectedCategory(null)}
                className="absolute top-4 right-4 sm:top-6 sm:right-6 text-blue-muted hover:text-white transition-colors"
              >
                <X className="w-8 h-8 sm:w-12 sm:h-12" />
              </button>

              <div className="flex flex-col items-center text-center mt-6 sm:mt-10">
                <div className={`w-24 h-24 sm:w-40 sm:h-40 rounded-full flex items-center justify-center mb-6 sm:mb-10 ${categoryResults[selectedCategory].bgColor} border-2 ${categoryResults[selectedCategory].borderColor} shadow-[0_0_50px_rgba(0,0,0,0.5)]`}>
                  {categories.find(c => c.id === selectedCategory).icon}
                </div>
                
                <h1 className={`text-3xl sm:text-6xl font-mono font-bold mb-4 sm:mb-8 ${categoryResults[selectedCategory].color} tracking-tighter uppercase`}>
                  {categoryResults[selectedCategory].title}
                </h1>
                
                <div className="bg-navy-base rounded-2xl p-4 sm:p-8 border border-navy-border w-full">
                  <p className="text-xl sm:text-3xl font-sans text-white font-bold leading-tight mb-4 sm:mb-6">
                    {categoryResults[selectedCategory].instruction}
                  </p>
                  
                  <div className="flex items-center justify-center gap-2 sm:gap-3 text-blue-muted mt-4 sm:mt-8 border-t border-navy-border/50 pt-4 sm:pt-8 text-sm sm:text-xl">
                    <Info className="w-5 h-5 sm:w-8 sm:h-8" />
                    <p className="font-sans">{categoryResults[selectedCategory].examples}</p>
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
