import { useState } from 'react';
import CityAnalysisTab from './components/tabs/CityAnalysisTab';
import WasteIDTab from './components/tabs/WasteIDTab';
import VaayuSaathiTab from './components/tabs/VaayuSaathiTab';

import { LayoutDashboard, Target, Users } from 'lucide-react';

import logo from './assets/logo.png';

function App() {
  const [activeTab, setActiveTab] = useState('city_analysis');
  const [lang, setLang] = useState('EN'); 

  const languages = [
    { code: 'EN', name: 'English' },
    { code: 'HI', name: 'हिन्दी' },
    { code: 'BN', name: 'বাংলা' },
    { code: 'MR', name: 'मराठी' },
    { code: 'TE', name: 'తెలుగు' },
    { code: 'TA', name: 'தமிழ்' },
    { code: 'GU', name: 'ગુજરાતી' }
  ];

  const translations = {
    EN: {
      tagline: "Breathe data. Act local.",
      data_core: "DATA_CORE",
      scanner: "SCANNER",
      saathi: "SAATHI_GUI",
      status: "STATUS: VAAYU_LOCAL_INTELLIGENCE_CORE_ACTIVE"
    },
    HI: {
      tagline: "डेटा को महसूस करें। स्थानीय कार्य करें।",
      data_core: "डेटा_कोर",
      scanner: "स्कैनर",
      saathi: "साथी_जीयूआई",
      status: "स्थिति: वायु_स्थानीय_इंटेलिजेंस_कोर_सक्रिय"
    },
    BN: {
      tagline: "ডেটা উপলব্ধি করুন। স্থানীয়ভাবে কাজ করুন।",
      data_core: "ডেটা_কোর",
      scanner: "স্ক্যানার",
      saathi: "সাথী_জিইউআই",
      status: "অবস্থা: বায়ু_স্থানীয়_ইন্টেলিজেন্স_কোর_সক্রিয়"
    },
    MR: {
      tagline: "डेटा अनुभवा. स्थानिक कृती करा.",
      data_core: "डेटा_कोअर",
      scanner: "स्कॅनर",
      saathi: "साथी_जीयूआय",
      status: "स्थिती: वायू_स्थानिक_इंटेलिजन्स_कोअर_सक्रिय"
    },
    TE: {
      tagline: "డేటాను అనుభవించండి. స్థానికంగా పని చేయండి.",
      data_core: "డేటా_కోర్",
      scanner: "స్కానర్",
      saathi: "సాథి_GUI",
      status: "స్థితి: వాయు_స్థానిక_ఇంటెలిజెన్స్_కోర్_క్రియాశీలకంగా_ఉంది"
    },
    TA: {
      tagline: "தரவை உணருங்கள். உள்ளூரில் செயல்படுங்கள்.",
      data_core: "தரவு_மையம்",
      scanner: "ஸ்கேனர்",
      saathi: "சாதி_GUI",
      status: "நிலை: வாயு_உள்ளூர்_புத்திசாலித்தன_மையம்_செயலில்_உள்ளது"
    },
    GU: {
      tagline: "ડેટાનો અનુભવ કરો. સ્થાનિક રીતે કાર્ય કરો.",
      data_core: "ડેટા_કોર",
      scanner: "સ્કેનર",
      saathi: "સાથી_GUI",
      status: "સ્થિતિ: વાયુ_સ્થાનિક_ઇન્ટેલિજન્સ_કોર_સક્રિય_છે"
    }
  };

  const t = translations[lang] || translations['EN'];

  // Main Dashboard
  return (
    <div className="min-h-screen bg-navy-base text-blue-text font-sans flex flex-col pt-8 sm:pt-12 items-center">
      {/* Header */}
      <header className="w-full max-w-6xl px-4 sm:px-6 mb-8 flex flex-col lg:flex-row items-center justify-between gap-6">
        <div className="flex flex-col md:flex-row items-center gap-6 text-center md:text-left">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-green-neon/50 shadow-[0_0_20px_rgba(0,230,118,0.2)]">
              <img src={logo} alt="VAAYU AI Logo" className="w-full h-full object-cover" />
            </div>
            <div>
              <h1 className="text-3xl font-bold font-mono tracking-tighter">VAAYU<span className="text-green-neon">_AI</span></h1>
              <p className="text-blue-muted text-sm tracking-wide">{t.tagline}</p>
            </div>
          </div>
          
          {/* Multi-Language Chips */}
          <div className="flex flex-wrap justify-center gap-2 bg-navy-card/50 p-1.5 rounded-xl border border-navy-border shadow-inner">
            {languages.map((l) => (
              <button 
                key={l.code}
                onClick={() => setLang(l.code)}
                className={`px-3 py-1 rounded-lg font-mono text-[10px] transition-all border ${lang === l.code ? 'bg-green-neon/10 text-green-neon border-green-neon shadow-[0_0_10px_rgba(0,230,118,0.1)]' : 'text-blue-muted border-transparent hover:border-navy-border hover:bg-navy-base'}`}
              >
                {l.name}
              </button>
            ))}
          </div>
        </div>
        
        <div className="flex gap-2 bg-navy-card p-1 rounded-lg border border-navy-border shadow-lg overflow-x-auto w-full sm:w-auto overflow-y-hidden scrollbar-hide">
          <button 
            onClick={() => setActiveTab('city_analysis')}
            className={`flex items-center whitespace-nowrap gap-2 px-4 py-2 font-mono text-sm rounded-md transition-all ${activeTab === 'city_analysis' ? 'bg-navy-border text-green-neon border border-green-neon/50 shadow-[0_0_10px_rgba(0,230,118,0.1)]' : 'text-blue-muted hover:text-blue-text hover:bg-navy-base'}`}
          >
            <LayoutDashboard size={16} /> {t.data_core}
          </button>
          <button 
            onClick={() => setActiveTab('waste_id')}
            className={`flex items-center whitespace-nowrap gap-2 px-4 py-2 font-mono text-sm rounded-md transition-all ${activeTab === 'waste_id' ? 'bg-navy-border text-green-neon border border-green-neon/50 shadow-[0_0_10px_rgba(0,230,118,0.1)]' : 'text-blue-muted hover:text-blue-text hover:bg-navy-base'}`}
          >
            <Target size={16} /> {t.scanner}
          </button>
          <button 
            onClick={() => setActiveTab('vaayu_saathi')}
            className={`flex items-center whitespace-nowrap gap-2 px-4 py-2 font-mono text-sm rounded-md transition-all ${activeTab === 'vaayu_saathi' ? 'bg-navy-border text-green-neon border border-green-neon/50 shadow-[0_0_10px_rgba(0,230,118,0.1)]' : 'text-blue-muted hover:text-blue-text hover:bg-navy-base'}`}
          >
            <Users size={16} /> {t.saathi}
          </button>
        </div>
      </header>
      
      {/* Offline Mode Indicator */}
      <div className="w-full max-w-6xl px-4 sm:px-6 mb-6">
        <div className="bg-navy-card border border-navy-border rounded px-4 py-2 flex items-center justify-center text-xs font-mono">
           <span className="w-2 h-2 rounded-full bg-green-neon animate-pulse shadow-[0_0_5px_rgba(0,230,118,0.5)] shrink-0 mr-2"></span>
           <span className="text-teal-accent">{t.status}</span>
        </div>
      </div>

      {/* Main Content Area */}
      <main className="w-full max-w-6xl px-4 sm:px-6 flex-grow pb-12">
        {activeTab === 'city_analysis' && (
          <CityAnalysisTab lang={lang} />
        )}
        {activeTab === 'waste_id' && (
          <WasteIDTab lang={lang} />
        )}
        {activeTab === 'vaayu_saathi' && (
          <VaayuSaathiTab lang={lang} />
        )}
      </main>
    </div>
  );
}

export default App;
