// Chat widget i18n dictionary — extend by adding a new locale key.
export type ChatLocale = "en" | "hi" | "bn";

export const CHAT_LOCALES: { code: ChatLocale; label: string; native: string }[] = [
  { code: "en", label: "English", native: "English" },
  { code: "hi", label: "Hindi", native: "हिन्दी" },
  { code: "bn", label: "Bengali", native: "বাংলা" },
];

type Dict = {
  header_title: string;
  header_status: string;
  reset: string;
  close: string;
  open_chat: string;
  greeting: string;
  menu_prompt: string;
  chip_services: string;
  chip_quote: string;
  chip_contact: string;
  chip_projects: string;
  chip_certs: string;
  chip_faq: string;
  chip_hours: string;
  chip_human: string;
  chip_back: string;
  chip_menu: string;
  chip_ask_another: string;
  chip_start_quote: string;
  services_prompt: string;
  contact_prompt: string;
  contact_title: string;
  hours_msg: (h: string) => string;
  projects_msg: string;
  open_projects: string;
  certs_msg: string;
  view_certs: string;
  faq_prompt: string;
  faq_services_q: string;
  faq_services_a: string;
  faq_timeline_q: string;
  faq_timeline_a: string;
  faq_certifications_q: string;
  faq_certifications_a: string;
  faq_coverage_q: string;
  faq_coverage_a: string;
  faq_payment_q: string;
  faq_payment_a: string;
  faq_warranty_q: string;
  faq_warranty_a: string;
  faq_tender_q: string;
  faq_tender_a: string;
  quote_intro: string;
  quote_name: string;
  quote_email_prompt: (n: string) => string;
  quote_email_invalid: string;
  quote_phone: string;
  quote_budget: string;
  quote_budget_ranges: string[];
  quote_brief: string;
  quote_attach_prompt: string;
  quote_attach_add: string;
  quote_attach_skip: string;
  quote_attach_continue: string;
  quote_attach_error_size: string;
  quote_attach_error_type: string;
  quote_attach_max: string;
  quote_sending: string;
  quote_success_title: string;
  quote_success_body: (ref: string) => string;
  quote_send_wa: string;
  quote_send_email: string;
  human_intro: string;
  human_time_prompt: string;
  human_time_options: string[];
  human_topic: string;
  human_success: (ref: string) => string;
  fallback: string;
  input_placeholder: string;
  input_email_placeholder: string;
  input_phone_placeholder: string;
  input_name_placeholder: string;
  input_brief_placeholder: string;
  service_solar: string;
  service_electrical: string;
  service_civil: string;
  service_govt: string;
  service_ads: string;
  save_failed: string;
  send: string;
  language: string;
};

const en: Dict = {
  header_title: "Praharsh Assistant",
  header_status: "Online · replies in a few minutes",
  reset: "Reset",
  close: "Close chat",
  open_chat: "Chat with us",
  greeting:
    "Hi 👋 — I'm the Praharsh Assistant. Pick an option below or type your question. I'll route you to the right team.",
  menu_prompt: "What would you like to do next?",
  chip_services: "Explore Services",
  chip_quote: "Request a Quote",
  chip_contact: "Contact & Location",
  chip_projects: "View Projects",
  chip_certs: "Certifications",
  chip_faq: "Common Questions",
  chip_hours: "Business Hours",
  chip_human: "Talk to a Human",
  chip_back: "Back",
  chip_menu: "Main Menu",
  chip_ask_another: "Ask another",
  chip_start_quote: "Start a Quote",
  services_prompt: "Which service are you interested in?",
  contact_prompt: "Here's how to reach us — tap any option:",
  contact_title: "Reach us directly",
  hours_msg: (h) =>
    `We're available ${h}. Outside these hours, drop a message and we'll reply the next business morning.`,
  projects_msg:
    "See our recent work — solar street lighting, high-mast, roads and government supply.",
  open_projects: "Open Projects Page",
  certs_msg:
    "We are ISO 9001:2015 certified, GeM verified, UDYAM & GST registered, and PWD / UPPCL empanelled.",
  view_certs: "View Certifications",
  faq_prompt: "Tap any question for an instant answer:",
  faq_services_q: "What services do you offer?",
  faq_services_a:
    "We deliver eight verticals: Solar street lighting, High-mast & electrical, Civil & road infrastructure, Government/GeM supply, Outdoor advertising, Digital media, Branding & signage, and Renewable energy projects.",
  faq_timeline_q: "What are typical project timelines?",
  faq_timeline_a:
    "Small orders (up to 100 units) ship in 2–3 weeks. District-scale solar or high-mast programs run 45–90 days. Road & civil packages are scoped project-wise with milestone Gantt charts.",
  faq_certifications_q: "Which certifications do you hold?",
  faq_certifications_a:
    "ISO 9001:2015 (Quality), ISO 14001 (Environment), ISO 45001 (Safety), GeM Authorized Seller, MSME/UDYAM, GST, PWD & UPPCL empanelment.",
  faq_coverage_q: "Which regions do you serve?",
  faq_coverage_a:
    "We execute across 25+ Indian states with strong presence in UP, Bihar, MP, Uttarakhand, Delhi-NCR, Rajasthan, Jharkhand and the North-East.",
  faq_payment_q: "What are your payment terms?",
  faq_payment_a:
    "Standard terms: 30% advance on order, 40% on dispatch, 30% on installation & sign-off. GeM/Government tenders follow the buyer's payment schedule.",
  faq_warranty_q: "Do you offer warranty & AMC?",
  faq_warranty_a:
    "Yes — 5-year comprehensive warranty on solar systems, 2-year on high-mast & LED, and optional AMC packages with quarterly preventive maintenance.",
  faq_tender_q: "Do you participate in GeM & PSU tenders?",
  faq_tender_a:
    "Yes — GeM Authorized Seller with active bid participation. We handle EMD, technical bid, BOQ, compliance affidavits and post-award execution end-to-end.",
  quote_intro:
    "Great — a 30-second form. Which service is this quote for?",
  quote_name: "Perfect. What's your **name**?",
  quote_email_prompt: (n) => `Thanks ${n}! Your **email**?`,
  quote_email_invalid:
    "That doesn't look like a valid email — please try again.",
  quote_phone: "Your **phone number** (with country code)?",
  quote_budget: "Approximate **budget range** for this project?",
  quote_budget_ranges: [
    "< ₹5 Lakh",
    "₹5 – 25 Lakh",
    "₹25 Lakh – 1 Cr",
    "₹1 – 5 Cr",
    "> ₹5 Cr",
    "Not sure yet",
  ],
  quote_brief:
    "Briefly describe your **requirement** (quantity, location, timeline).",
  quote_attach_prompt:
    "Optional: attach **drawings, BOQ, or spec sheets** (PDF · DWG · DOC · XLS · JPG/PNG, up to 5 files, 10 MB each).",
  quote_attach_add: "Add files",
  quote_attach_skip: "Skip",
  quote_attach_continue: "Continue",
  quote_attach_error_size: "File too large — max 10 MB per file.",
  quote_attach_error_type: "Unsupported file type.",
  quote_attach_max: "Maximum 5 files.",
  quote_sending: "Sending your enquiry…",
  quote_success_title: "✅ Received — thank you!",
  quote_success_body: (ref) =>
    `Your enquiry is logged (ref: **${ref}**). Our team responds within 1 business hour. You can also forward the summary to WhatsApp or email below.`,
  quote_send_wa: "Send on WhatsApp",
  quote_send_email: "Email Instead",
  human_intro:
    "Let's get you a real person. A few quick details and we'll call you back.",
  human_time_prompt: "What's the **best time** to reach you?",
  human_time_options: [
    "Morning (10 AM – 1 PM)",
    "Afternoon (1 PM – 4 PM)",
    "Evening (4 PM – 7 PM)",
    "Any time",
  ],
  human_topic: "What's the **topic** you'd like to discuss?",
  human_success: (ref) =>
    `✅ Handoff request received (ref: **${ref}**). A team member will call you at your preferred time. For urgent matters, please call us directly.`,
  fallback:
    "I can help with services, quotes, projects or contact info. Choose one below, or tap **Talk to a Human** to reach our team.",
  input_placeholder: "Type a message or pick an option…",
  input_email_placeholder: "you@example.com",
  input_phone_placeholder: "+91 98xxx xxxxx",
  input_name_placeholder: "Your name",
  input_brief_placeholder: "Describe your requirement…",
  service_solar: "Solar Street Lighting",
  service_electrical: "High-Mast & Electrical",
  service_civil: "Civil & Road Works",
  service_govt: "Government Supply (GeM)",
  service_ads: "Outdoor & Digital Ads",
  save_failed:
    "We couldn't save your request just now, but you can still send it via WhatsApp or email below.",
  send: "Send",
  language: "Language",
};

const hi: Dict = {
  header_title: "प्रहर्ष सहायक",
  header_status: "ऑनलाइन · कुछ मिनटों में उत्तर",
  reset: "रीसेट",
  close: "चैट बंद करें",
  open_chat: "हमसे बात करें",
  greeting:
    "नमस्ते 👋 — मैं प्रहर्ष सहायक हूँ। नीचे विकल्प चुनें या अपना प्रश्न लिखें, मैं आपको सही टीम से जोड़ूँगा।",
  menu_prompt: "आगे क्या करना चाहेंगे?",
  chip_services: "सेवाएँ देखें",
  chip_quote: "कोटेशन माँगें",
  chip_contact: "संपर्क व स्थान",
  chip_projects: "प्रोजेक्ट देखें",
  chip_certs: "प्रमाणपत्र",
  chip_faq: "आम प्रश्न",
  chip_hours: "कार्य समय",
  chip_human: "प्रतिनिधि से बात करें",
  chip_back: "वापस",
  chip_menu: "मुख्य मेनू",
  chip_ask_another: "और पूछें",
  chip_start_quote: "कोटेशन शुरू करें",
  services_prompt: "किस सेवा में रुचि है?",
  contact_prompt: "हम तक इन तरीक़ों से पहुँचें:",
  contact_title: "सीधे संपर्क करें",
  hours_msg: (h) =>
    `हम ${h} उपलब्ध हैं। इसके बाद संदेश छोड़ें, अगली सुबह उत्तर मिलेगा।`,
  projects_msg:
    "हमारे हाल के कार्य देखें — सोलर स्ट्रीट लाइट, हाई-मास्ट, सड़कें व सरकारी आपूर्ति।",
  open_projects: "प्रोजेक्ट पेज खोलें",
  certs_msg:
    "हम ISO 9001:2015 प्रमाणित, GeM पंजीकृत, UDYAM व GST पंजीकृत तथा PWD/UPPCL सूचीबद्ध हैं।",
  view_certs: "प्रमाणपत्र देखें",
  faq_prompt: "किसी भी प्रश्न पर टैप करें — तुरंत उत्तर मिलेगा:",
  faq_services_q: "आप कौन-कौन सी सेवाएँ देते हैं?",
  faq_services_a:
    "आठ मुख्य क्षेत्र: सोलर स्ट्रीट लाइटिंग, हाई-मास्ट व इलेक्ट्रिकल, सिविल व सड़क, सरकारी/GeM आपूर्ति, आउटडोर विज्ञापन, डिजिटल मीडिया, ब्रांडिंग व साइनेज, और नवीकरणीय ऊर्जा।",
  faq_timeline_q: "प्रोजेक्ट पूरा होने में कितना समय लगता है?",
  faq_timeline_a:
    "छोटे ऑर्डर (100 यूनिट तक) 2–3 सप्ताह। ज़िला-स्तरीय सोलर या हाई-मास्ट कार्यक्रम 45–90 दिन। सड़क व सिविल पैकेज परियोजना-अनुसार।",
  faq_certifications_q: "आपके पास कौन से प्रमाणपत्र हैं?",
  faq_certifications_a:
    "ISO 9001:2015 (गुणवत्ता), ISO 14001 (पर्यावरण), ISO 45001 (सुरक्षा), GeM विक्रेता, MSME/UDYAM, GST, PWD व UPPCL सूचीबद्ध।",
  faq_coverage_q: "कौन-कौन से क्षेत्रों में सेवा देते हैं?",
  faq_coverage_a:
    "25+ भारतीय राज्यों में — विशेष उपस्थिति UP, बिहार, MP, उत्तराखंड, दिल्ली-NCR, राजस्थान, झारखंड व उत्तर-पूर्व में।",
  faq_payment_q: "भुगतान की शर्तें क्या हैं?",
  faq_payment_a:
    "मानक: ऑर्डर पर 30% अग्रिम, डिस्पैच पर 40%, इंस्टॉलेशन व साइन-ऑफ़ पर 30%। GeM/सरकारी टेंडर क्रेता की शर्तों के अनुसार।",
  faq_warranty_q: "क्या वारंटी व AMC मिलता है?",
  faq_warranty_a:
    "जी हाँ — सोलर सिस्टम पर 5 साल की व्यापक वारंटी, हाई-मास्ट व LED पर 2 साल, तिमाही रखरखाव के साथ AMC पैकेज उपलब्ध।",
  faq_tender_q: "क्या आप GeM व PSU टेंडर में भाग लेते हैं?",
  faq_tender_a:
    "जी हाँ — GeM अधिकृत विक्रेता। EMD, तकनीकी बिड, BOQ, अनुपालन शपथ-पत्र व निष्पादन तक पूरा प्रबंधन।",
  quote_intro:
    "बढ़िया — 30 सेकंड का फ़ॉर्म। यह कोटेशन किस सेवा के लिए है?",
  quote_name: "अच्छा! आपका **नाम** क्या है?",
  quote_email_prompt: (n) => `धन्यवाद ${n}! आपका **ईमेल**?`,
  quote_email_invalid: "यह ईमेल सही नहीं लगता — कृपया पुनः लिखें।",
  quote_phone: "आपका **फ़ोन नंबर** (देश कोड सहित)?",
  quote_budget: "इस प्रोजेक्ट का अनुमानित **बजट**?",
  quote_budget_ranges: [
    "< ₹5 लाख",
    "₹5 – 25 लाख",
    "₹25 लाख – 1 करोड़",
    "₹1 – 5 करोड़",
    "> ₹5 करोड़",
    "अभी तय नहीं",
  ],
  quote_brief:
    "अपनी **आवश्यकता** संक्षेप में बताएँ (मात्रा, स्थान, समयसीमा)।",
  quote_attach_prompt:
    "वैकल्पिक: **ड्राइंग, BOQ या स्पेसिफ़िकेशन** जोड़ें (PDF · DWG · DOC · XLS · JPG/PNG, अधिकतम 5 फ़ाइल, 10 MB प्रत्येक)।",
  quote_attach_add: "फ़ाइल जोड़ें",
  quote_attach_skip: "छोड़ें",
  quote_attach_continue: "आगे बढ़ें",
  quote_attach_error_size: "फ़ाइल बहुत बड़ी है — अधिकतम 10 MB।",
  quote_attach_error_type: "फ़ाइल प्रकार समर्थित नहीं।",
  quote_attach_max: "अधिकतम 5 फ़ाइलें।",
  quote_sending: "आपका अनुरोध भेजा जा रहा है…",
  quote_success_title: "✅ प्राप्त हो गया — धन्यवाद!",
  quote_success_body: (ref) =>
    `आपका अनुरोध दर्ज हो गया (संदर्भ: **${ref}**). हमारी टीम 1 कार्य-घंटे में उत्तर देगी। नीचे WhatsApp या ईमेल से भी भेज सकते हैं।`,
  quote_send_wa: "WhatsApp पर भेजें",
  quote_send_email: "ईमेल भेजें",
  human_intro:
    "हम आपको प्रतिनिधि से जोड़ते हैं — कुछ जानकारी दें, हम कॉल करेंगे।",
  human_time_prompt: "आपको कब कॉल करना ठीक रहेगा?",
  human_time_options: [
    "सुबह (10 AM – 1 PM)",
    "दोपहर (1 PM – 4 PM)",
    "शाम (4 PM – 7 PM)",
    "कभी भी",
  ],
  human_topic: "किस विषय पर बात करना चाहेंगे?",
  human_success: (ref) =>
    `✅ हैंडऑफ़ अनुरोध दर्ज (संदर्भ: **${ref}**). टीम आपके चुने समय पर कॉल करेगी। तुरंत आवश्यकता हो तो सीधे कॉल करें।`,
  fallback:
    "मैं सेवाओं, कोटेशन, प्रोजेक्ट या संपर्क में सहायता कर सकता हूँ। नीचे विकल्प चुनें या **प्रतिनिधि से बात करें**।",
  input_placeholder: "संदेश लिखें या विकल्प चुनें…",
  input_email_placeholder: "you@example.com",
  input_phone_placeholder: "+91 98xxx xxxxx",
  input_name_placeholder: "आपका नाम",
  input_brief_placeholder: "अपनी आवश्यकता बताएँ…",
  service_solar: "सोलर स्ट्रीट लाइटिंग",
  service_electrical: "हाई-मास्ट व इलेक्ट्रिकल",
  service_civil: "सिविल व सड़क कार्य",
  service_govt: "सरकारी आपूर्ति (GeM)",
  service_ads: "आउटडोर व डिजिटल विज्ञापन",
  save_failed:
    "अभी सहेजा नहीं जा सका, लेकिन आप नीचे WhatsApp या ईमेल से भेज सकते हैं।",
  send: "भेजें",
  language: "भाषा",
};

const bn: Dict = {
  header_title: "প্রহর্ষ সহায়ক",
  header_status: "অনলাইন · কয়েক মিনিটে উত্তর",
  reset: "রিসেট",
  close: "চ্যাট বন্ধ করুন",
  open_chat: "আমাদের সাথে চ্যাট",
  greeting:
    "হাই 👋 — আমি প্রহর্ষ সহায়ক। নিচে একটি অপশন বেছে নিন বা প্রশ্ন লিখুন, আমি সঠিক টিমে পাঠিয়ে দেব।",
  menu_prompt: "এরপর কী করতে চান?",
  chip_services: "পরিষেবা দেখুন",
  chip_quote: "কোটেশন চান",
  chip_contact: "যোগাযোগ ও ঠিকানা",
  chip_projects: "প্রকল্প দেখুন",
  chip_certs: "সার্টিফিকেশন",
  chip_faq: "সাধারণ প্রশ্ন",
  chip_hours: "কার্যসময়",
  chip_human: "প্রতিনিধির সাথে কথা",
  chip_back: "পিছনে",
  chip_menu: "মূল মেনু",
  chip_ask_another: "আরও জিজ্ঞাসা",
  chip_start_quote: "কোটেশন শুরু",
  services_prompt: "কোন পরিষেবায় আগ্রহী?",
  contact_prompt: "আমাদের সাথে সরাসরি যোগাযোগ করুন:",
  contact_title: "সরাসরি যোগাযোগ",
  hours_msg: (h) =>
    `আমরা ${h} উপলব্ধ। এই সময়ের বাইরে বার্তা রাখুন, পরের সকালে উত্তর পাবেন।`,
  projects_msg:
    "সাম্প্রতিক কাজ দেখুন — সোলার স্ট্রিট লাইট, হাই-মাস্ট, সড়ক ও সরকারি সরবরাহ।",
  open_projects: "প্রকল্প পাতা খুলুন",
  certs_msg:
    "আমরা ISO 9001:2015, GeM, UDYAM, GST এবং PWD/UPPCL তালিকাভুক্ত।",
  view_certs: "সার্টিফিকেট দেখুন",
  faq_prompt: "যেকোনো প্রশ্নে ট্যাপ করুন — সাথে সাথে উত্তর:",
  faq_services_q: "আপনারা কী কী পরিষেবা দেন?",
  faq_services_a:
    "আটটি বিভাগ: সোলার স্ট্রিট লাইট, হাই-মাস্ট ও ইলেকট্রিক্যাল, সিভিল ও সড়ক, সরকারি/GeM সরবরাহ, আউটডোর বিজ্ঞাপন, ডিজিটাল মিডিয়া, ব্র্যান্ডিং, ও নবায়নযোগ্য শক্তি।",
  faq_timeline_q: "প্রকল্প শেষ হতে কত সময় লাগে?",
  faq_timeline_a:
    "ছোট অর্ডার (১০০ ইউনিট পর্যন্ত) ২–৩ সপ্তাহ। জেলা-স্তরের সোলার/হাই-মাস্ট ৪৫–৯০ দিন। সড়ক ও সিভিল প্যাকেজ প্রকল্পভিত্তিক।",
  faq_certifications_q: "কী কী সার্টিফিকেট আছে?",
  faq_certifications_a:
    "ISO 9001:2015, ISO 14001, ISO 45001, GeM Authorized Seller, MSME/UDYAM, GST, PWD ও UPPCL তালিকাভুক্ত।",
  faq_coverage_q: "কোন কোন এলাকায় কাজ করেন?",
  faq_coverage_a:
    "২৫+ ভারতীয় রাজ্যে — বিশেষত UP, বিহার, MP, উত্তরাখণ্ড, দিল্লি-NCR, রাজস্থান, ঝাড়খণ্ড ও উত্তর-পূর্বে।",
  faq_payment_q: "পেমেন্ট শর্ত কী?",
  faq_payment_a:
    "মানক: অর্ডারে ৩০% অগ্রিম, ডিসপ্যাচে ৪০%, ইনস্টলে ৩০%। GeM/সরকারি টেন্ডার ক্রেতার শিডিউল অনুযায়ী।",
  faq_warranty_q: "ওয়ারেন্টি ও AMC আছে কি?",
  faq_warranty_a:
    "হ্যাঁ — সোলারে ৫ বছর, হাই-মাস্ট ও LED-তে ২ বছর, ত্রৈমাসিক রক্ষণাবেক্ষণসহ AMC।",
  faq_tender_q: "GeM ও PSU টেন্ডারে অংশ নেন?",
  faq_tender_a:
    "হ্যাঁ — GeM অনুমোদিত বিক্রেতা। EMD, টেকনিক্যাল বিড, BOQ, কমপ্লায়েন্স ও নির্বাহন পর্যন্ত সম্পূর্ণ।",
  quote_intro: "চমৎকার — ৩০ সেকেন্ডের ফর্ম। কোন পরিষেবার জন্য কোটেশন?",
  quote_name: "খুব ভালো। আপনার **নাম** কী?",
  quote_email_prompt: (n) => `ধন্যবাদ ${n}! আপনার **ইমেইল**?`,
  quote_email_invalid: "ইমেইলটি সঠিক নয় — আবার লিখুন।",
  quote_phone: "আপনার **ফোন নম্বর** (দেশের কোডসহ)?",
  quote_budget: "এই প্রকল্পের আনুমানিক **বাজেট**?",
  quote_budget_ranges: [
    "< ₹৫ লক্ষ",
    "₹৫ – ২৫ লক্ষ",
    "₹২৫ লক্ষ – ১ কোটি",
    "₹১ – ৫ কোটি",
    "> ₹৫ কোটি",
    "এখনও নিশ্চিত নই",
  ],
  quote_brief: "আপনার **প্রয়োজন** সংক্ষেপে লিখুন (পরিমাণ, স্থান, সময়সীমা)।",
  quote_attach_prompt:
    "ঐচ্ছিক: **ড্রয়িং, BOQ বা স্পেসিফিকেশন** সংযুক্ত করুন (PDF · DWG · DOC · XLS · JPG/PNG, সর্বোচ্চ ৫টি ফাইল, প্রতিটি ১০ MB)।",
  quote_attach_add: "ফাইল যোগ করুন",
  quote_attach_skip: "এড়িয়ে যান",
  quote_attach_continue: "এগিয়ে যান",
  quote_attach_error_size: "ফাইল অনেক বড় — সর্বোচ্চ ১০ MB।",
  quote_attach_error_type: "ফাইল টাইপ সমর্থিত নয়।",
  quote_attach_max: "সর্বোচ্চ ৫টি ফাইল।",
  quote_sending: "পাঠানো হচ্ছে…",
  quote_success_title: "✅ পেয়েছি — ধন্যবাদ!",
  quote_success_body: (ref) =>
    `আপনার অনুরোধ নথিভুক্ত (রেফ: **${ref}**). টিম ১ কার্য-ঘণ্টায় উত্তর দেবে। নিচে WhatsApp বা ইমেইলে পাঠাতে পারেন।`,
  quote_send_wa: "WhatsApp-এ পাঠান",
  quote_send_email: "ইমেইল পাঠান",
  human_intro: "কিছু বিবরণ দিন — আমরা কল করব।",
  human_time_prompt: "কখন কল করা সবচেয়ে ভালো?",
  human_time_options: [
    "সকাল (১০ AM – ১ PM)",
    "দুপুর (১ PM – ৪ PM)",
    "সন্ধ্যা (৪ PM – ৭ PM)",
    "যেকোনো সময়",
  ],
  human_topic: "কোন বিষয়ে কথা বলতে চান?",
  human_success: (ref) =>
    `✅ হ্যান্ডঅফ অনুরোধ গৃহীত (রেফ: **${ref}**). আপনার পছন্দের সময়ে কল আসবে।`,
  fallback:
    "সেবা, কোটেশন, প্রকল্প বা যোগাযোগে সাহায্য করতে পারি। নিচে অপশন বেছে নিন।",
  input_placeholder: "বার্তা লিখুন বা অপশন বেছে নিন…",
  input_email_placeholder: "you@example.com",
  input_phone_placeholder: "+91 98xxx xxxxx",
  input_name_placeholder: "আপনার নাম",
  input_brief_placeholder: "প্রয়োজন লিখুন…",
  service_solar: "সোলার স্ট্রিট লাইটিং",
  service_electrical: "হাই-মাস্ট ও ইলেকট্রিক্যাল",
  service_civil: "সিভিল ও সড়ক",
  service_govt: "সরকারি সরবরাহ (GeM)",
  service_ads: "আউটডোর ও ডিজিটাল বিজ্ঞাপন",
  save_failed:
    "এখন সংরক্ষণ করা যায়নি, তবে নিচে WhatsApp বা ইমেইলে পাঠাতে পারেন।",
  send: "পাঠান",
  language: "ভাষা",
};

const DICT: Record<ChatLocale, Dict> = { en, hi, bn };

export function t(locale: ChatLocale): Dict {
  return DICT[locale] ?? DICT.en;
}
