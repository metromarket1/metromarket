import { Category, MenuItem } from './types';
import menuImage from './resources/images/Black.jpg';

export const FIREBASE_CONFIG = {
  apiKey: "AIzaSyC-3r76WFp30pm4if_7JiuYrxSx64mhmgs",
  authDomain: "metromarket-e3ac1.firebaseapp.com",
  projectId: "metromarket-e3ac1",
  storageBucket: "metromarket-e3ac1.firebasestorage.app",
  messagingSenderId: "971425298628",
  appId: "1:971425298628:web:99088387a795469c05b191",
  measurementId: "G-WLFZ4E8KNK"
};

export const MENU_IMAGE_PATH = menuImage;
export const WHATSAPP_NUMBER = "972566000166";

export const CATEGORIES: { id: Category; label: string }[] = [
  { id: 'sandwiches', label: 'سندويشات' },
  { id: 'salads', label: 'سلطات' },
  { id: 'starters', label: 'مقبلات' },
  { id: 'drinks', label: 'مشروبات' },
];

export const COMPANIES = [
  "ccc بنك فلسطين",
  "بنك الأردن الإرسال",
  "بنك الإستثمار الإرسال",
  "سلطة النقد",
  "برج عمار"
];

export const DELIVERY_TIMES = [
  "10:45 AM",
  "11:45 AM",
  "01:00 PM"
];

export const ORDER_START_TIME = {
  hour: 7,
  minute: 0
};

export const ORDER_CUTOFF_TIME = {
  hour: 12,
  minute: 30
};

// Transformed data structure for easier consumption
export const MENU_DATA: MenuItem[] = [
  // Sandwiches
  { category: 'sandwiches', name: "نقانق و جبنة", price: 18, description: "نقانق، جبنة جودا، خس، مخلل، ذرة، صوص." },
  { category: 'sandwiches', name: "أفوكادو و بيض", price: 18, description: "أفوكادو، 2 بيض مسلوق، جرجير، زيت زيتون، ملح، فلفل أسود." },
  { category: 'sandwiches', name: "مترو مكس", price: 20, description: "روست بيف، صدر حبش، جودا، شيدر، خس، مخلل، صوص." },
  { category: 'sandwiches', name: "تونة", price: 20, description: "تونة، ذرة، خيار، جبنة شيدر، مايونيز، جرجير." },
  { category: 'sandwiches', name: "حلومي", price: 24, description: "جبنة حلومي مشوية، خس، جرجير، بندورة، خيار، بيستو." },
  { category: 'sandwiches', name: "دجاج كرسبي", price: 25, description: "صدر دجاج مقلي، جبنة جودا، خس، بندورة، صوص." },
  { category: 'sandwiches', name: "أفوكادو و دجاج", price: 27, description: "أفوكادو، صدر دجاج، خس، بندورة، جودا، صوص." },
  { category: 'sandwiches', name: "دجاج وايت صوص", price: 27, description: "صدر دجاج مشوي، فطر طازج، ذرة، زيتون أسود، وايت صوص." },
  { category: 'sandwiches', name: "شاورما دجاج", price: 25, description: "صدر دجاج، خس، بندورة، مخلل، مثومة، طحينة." },
  { category: 'sandwiches', name: "برغر دجاج", price: 25, description: "صدر دجاج مقلي، خس، بندورة، مخلل، روست بيف، جبنة، صوص." },
  { category: 'sandwiches', name: "برغر لحمة", price: 30, description: "150 غرام لحم بقري طازج، فطر طازج، خس، بندورة، مخلل، جبنة شيدر، صوص." },
  { category: 'sandwiches', name: "لحمة كرانشي", price: 30, description: "150 غرام لحم مفروم طازج، شيبس، جودا، شيدر، ذرة، بندورة، صوص." },
  { category: 'sandwiches', name: "ساندويش كفتة", price: 30, description: "180 غرام كفتة، خس، بندورة، بطاطا مقلية، طحينة." },
  { category: 'sandwiches', name: "سلمون مدخّن", price: 35, description: "100 غرام سلمون مدخن، أفوكادو، خيار، صوص." },

  // Salads
  { category: 'salads', name: "سلطة سيزر", price: 22, description: "خس، شيري، خبز مقلي، بارميزان، صوص يحتوي على مايونيز." },
  { category: 'salads', name: "سلطة يونانية", price: 22, description: "خس، شيري، خيار، زيتون أسود، فيتا، ليمون، زيت زيتون." },
  { category: 'salads', name: "سلطة التفاح الأخضر", price: 22, description: "تفاح أخضر، خس، شيري، خيار، ذرة، كرانبري، صوص يحتوي لبن ومايونيز." },
  { category: 'salads', name: "وجبة صحية مع اريش", price: 25, description: "خس، جرجير، شيري، خيار، ذرة، جبنة اريش، بيضة مسلوقة، جوز عين جمل، ليمون، ملح." },
  { category: 'salads', name: "سلطة معكرونة", price: 25, description: "معكرونة، فاصوليا حمرا، زيتون اسود، ذرة، شيري، فليفلة، بارميزان، صوص بيستو ، ليمون ،ملح." },
  { category: 'salads', name: "تبولة كينوا", price: 25, description: "كينوا، خس، بقدونس، نعنع، بندورة، خيار، جوز، زبيب، ليمون، خل، زيت، ملح." },
  { category: 'salads', name: "سلطة تونة وأفوكادو", price: 27, description: "تونة، افوجادو، خس، خيار، ذرة، بذور الشيا، ليمون، لايت مايونيز." },
  { category: 'salads', name: "سلطة سوبر", price: 30, description: "150غم صدر دجاج، خس، جرجير، ذرة، شيري، خيار، فطر طازج، جرانولا، ليمون،زيت، ملح." },

  // Starters
  { category: 'starters', name: "بطاطا سادة", price: 10, description: "مقرمشة وذهبية" },
  { category: 'starters', name: "بطاطا ويدجز", price: 12, description: "متبلة ومقلية" },
  { category: 'starters', name: "بطاطا مع تشيدر وهالبينو", price: 14, description: "حار وجبني" },
  { category: 'starters', name: "بطاطا كيرلي", price: 14, description: "" },
  { category: 'starters', name: "مكس بوكس", price: 18, description: "تشكيلة مميزة" },
  { category: 'starters', name: "بطاطا مع دجاج كريسبي", price: 25, description: "اشحن طاقتك" },
  { category: 'starters', name: "أصابع كريسبي وصوصات", price: 30, description: "للمشاركة" },

  // Drinks
  { category: 'drinks', name: "عصير برتقال", price: 12, description: "عصير برتقال طازج" },
  { category: 'drinks', name: "عصير شمندر", price: 12, description: "عصير شمندر طازج" },
  { category: 'drinks', name: "عصير أخضر", price: 12, description: "عصير أخضر طازج" },
  { category: 'drinks', name: "ماء 0.5L", price: 3, description: "" },
  { category: 'drinks', name: "صودا", price: 3, description: "" },
  { category: 'drinks', name: "ميلاف كولا", price: 3, description: "كولا خالية من السكر محلاة بمستخلص التمر الطبيعي" },
  { category: 'drinks', name: "تشات سبرايت", price: 3, description: "" },
  { category: 'drinks', name: "اكس ال", price: 5, description: "" },
  { category: 'drinks', name: "بفاريا تفاح", price: 4, description: "" },
  { category: 'drinks', name: "فيدا", price: 6, description: "" },

];