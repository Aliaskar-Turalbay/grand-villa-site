import React, { useState, useEffect } from 'react';
import {
  Menu, X, Phone, MapPin, ChevronRight, ArrowLeft, Loader2, AlertCircle,
  CheckCircle2, MessageCircle, Wifi, Clock, Ban, ShieldAlert,
  Sparkles, Shirt, Bath, GlassWater, UtensilsCrossed, Plus, Minus
} from 'lucide-react';

/* =========================================================================
   КОНФИГУРАЦИЯ И ДАННЫЕ
   ========================================================================= */

const WHATSAPP_NUMBER = '77770207773';
const HOTEL_NAME = 'Grand Villa';
const HOTEL_CITY = 'Туркестан';

const ROOMS_DATA = {
  standard: {
    id: 'standard',
    title: 'Стандарт',
    description: 'Уютные номера с классическим дизайном. Идеальный выбор для деловых поездок и комфортного отдыха в Туркестане.',
    icon: '🛏️',
    rooms: [
      { id: '101', name: 'Номер 101', floor: 1, bedType: 'Две раздельные кровати (90x200)', capacity: 2, size: '22 м²', amenities: ['Wi-Fi', 'Кондиционер', 'Телевизор', 'Холодильник', 'Душ'], price: 20000, isAvailable: true, windows: 'Окно выходит во двор', features: ['Тихий номер', 'Раздельные кровати'] },
      { id: '102', name: 'Номер 102', floor: 1, bedType: 'Две раздельные кровати (90x200)', capacity: 2, size: '22 м²', amenities: ['Wi-Fi', 'Кондиционер', 'Телевизор', 'Холодильник', 'Душ'], price: 20000, isAvailable: true, windows: 'Окно выходит во двор', features: ['Тихий номер', 'Раздельные кровати'] },
      { id: '103', name: 'Номер 103', floor: 1, bedType: 'Две раздельные кровати (90x200)', capacity: 2, size: '22 м²', amenities: ['Wi-Fi', 'Кондиционер', 'Телевизор', 'Холодильник', 'Душ'], price: 20000, isAvailable: true, windows: 'Окно выходит во двор', features: ['Тихий номер', 'Раздельные кровати'] },
      { id: '104', name: 'Номер 104', floor: 1, bedType: 'Две раздельные кровати (90x200)', capacity: 2, size: '22 м²', amenities: ['Wi-Fi', 'Кондиционер', 'Телевизор', 'Холодильник', 'Душ'], price: 20000, isAvailable: true, windows: 'Окно выходит на улицу', features: ['Раздельные кровати'] },
      { id: '105', name: 'Номер 105', floor: 1, bedType: 'Две раздельные кровати (90x200)', capacity: 2, size: '22 м²', amenities: ['Wi-Fi', 'Кондиционер', 'Телевизор', 'Холодильник', 'Душ'], price: 20000, isAvailable: true, windows: 'Окно выходит во двор', features: ['Раздельные кровати'] },
      { id: '106', name: 'Номер 106', floor: 1, bedType: 'Две раздельные кровати (90x200)', capacity: 2, size: '22 м²', amenities: ['Wi-Fi', 'Кондиционер', 'Телевизор', 'Холодильник', 'Душ'], price: 20000, isAvailable: true, windows: 'Окно выходит во двор', features: ['Раздельные кровати'] },
      { id: '107', name: 'Номер 107', floor: 1, bedType: 'Двуспальная кровать (180x200)', capacity: 2, size: '22 м²', amenities: ['Wi-Fi', 'Кондиционер', 'Телевизор', 'Холодильник', 'Душ'], price: 20000, isAvailable: true, windows: 'Окно выходит во двор', features: ['Двуспальная кровать'] },
      { id: '108', name: 'Номер 108', floor: 1, bedType: 'Две раздельные кровати (90x200)', capacity: 2, size: '22 м²', amenities: ['Wi-Fi', 'Кондиционер', 'Телевизор', 'Холодильник', 'Душ'], price: 20000, isAvailable: true, windows: 'Окно выходит во двор', features: ['Раздельные кровати'] },
      { id: '203', name: 'Номер 203', floor: 2, bedType: 'Двуспальная кровать (180x200)', capacity: 2, size: '22 м²', amenities: ['Wi-Fi', 'Кондиционер', 'Телевизор', 'Холодильник', 'Душ'], price: 20000, isAvailable: true, windows: 'Окно выходит во двор', features: ['Двуспальная кровать'] },
      { id: '204', name: 'Номер 204', floor: 2, bedType: 'Двуспальная кровать (180x200)', capacity: 2, size: '22 м²', amenities: ['Wi-Fi', 'Кондиционер', 'Телевизор', 'Холодильник', 'Душ'], price: 20000, isAvailable: true, windows: 'Окно выходит на улицу', features: ['Двуспальная кровать'] },
      { id: '205', name: 'Номер 205', floor: 2, bedType: 'Двуспальная кровать (180x200)', capacity: 2, size: '22 м²', amenities: ['Wi-Fi', 'Кондиционер', 'Телевизор', 'Холодильник', 'Душ'], price: 20000, isAvailable: true, windows: 'Окно выходит во двор', features: ['Двуспальная кровать'] },
      { id: '206', name: 'Номер 206', floor: 2, bedType: 'Двуспальная кровать (180x200)', capacity: 2, size: '22 м²', amenities: ['Wi-Fi', 'Кондиционер', 'Телевизор', 'Холодильник', 'Душ'], price: 20000, isAvailable: true, windows: 'Окно выходит во двор', features: ['Двуспальная кровать'] },
      { id: '208', name: 'Номер 208', floor: 2, bedType: 'Двуспальная кровать (180x200)', capacity: 2, size: '22 м²', amenities: ['Wi-Fi', 'Кондиционер', 'Телевизор', 'Холодильник', 'Душ'], price: 20000, isAvailable: true, windows: 'Окно выходит во двор', features: ['Двуспальная кровать'] },
      { id: '210', name: 'Номер 210', floor: 2, bedType: 'Двуспальная кровать (180x200)', capacity: 2, size: '22 м²', amenities: ['Wi-Fi', 'Кондиционер', 'Телевизор', 'Холодильник', 'Душ'], price: 20000, isAvailable: true, windows: 'Окно выходит во двор', features: ['Двуспальная кровать'] },
      { id: '303', name: 'Номер 303', floor: 3, bedType: 'Двуспальная кровать (180x200)', capacity: 2, size: '22 м²', amenities: ['Wi-Fi', 'Кондиционер', 'Телевизор', 'Холодильник', 'Душ'], price: 20000, isAvailable: true, windows: 'Окно выходит во двор', features: ['Двуспальная кровать'] },
      { id: '304', name: 'Номер 304', floor: 3, bedType: 'Двуспальная кровать (180x200)', capacity: 2, size: '22 м²', amenities: ['Wi-Fi', 'Кондиционер', 'Телевизор', 'Холодильник', 'Душ'], price: 20000, isAvailable: true, windows: 'Окно выходит на улицу', features: ['Двуспальная кровать'] },
      { id: '305', name: 'Номер 305', floor: 3, bedType: 'Двуспальная кровать (180x200)', capacity: 2, size: '22 м²', amenities: ['Wi-Fi', 'Кондиционер', 'Телевизор', 'Холодильник', 'Душ'], price: 20000, isAvailable: true, windows: 'Окно выходит во двор', features: ['Двуспальная кровать'] },
      { id: '306', name: 'Номер 306', floor: 3, bedType: 'Двуспальная кровать (180x200)', capacity: 2, size: '22 м²', amenities: ['Wi-Fi', 'Кондиционер', 'Телевизор', 'Холодильник', 'Душ'], price: 20000, isAvailable: true, windows: 'Окно выходит во двор', features: ['Двуспальная кровать'] },
      { id: '309', name: 'Номер 309', floor: 3, bedType: 'Двуспальная кровать (180x200)', capacity: 2, size: '22 м²', amenities: ['Wi-Fi', 'Кондиционер', 'Телевизор', 'Холодильник', 'Душ'], price: 20000, isAvailable: true, windows: 'Окно выходит во двор', features: ['Двуспальная кровать'] },
      { id: '311', name: 'Номер 311', floor: 3, bedType: 'Двуспальная кровать (180x200)', capacity: 2, size: '22 м²', amenities: ['Wi-Fi', 'Кондиционер', 'Телевизор', 'Холодильник', 'Душ'], price: 20000, isAvailable: true, windows: 'Окно выходит во двор', features: ['Двуспальная кровать'] },
      { id: '403', name: 'Номер 403', floor: 4, bedType: 'Двуспальная кровать (180x200)', capacity: 2, size: '22 м²', amenities: ['Wi-Fi', 'Кондиционер', 'Телевизор', 'Холодильник', 'Душ'], price: 20000, isAvailable: true, windows: 'Окно выходит во двор', features: ['Двуспальная кровать'] },
      { id: '404', name: 'Номер 404', floor: 4, bedType: 'Двуспальная кровать (180x200)', capacity: 2, size: '22 м²', amenities: ['Wi-Fi', 'Кондиционер', 'Телевизор', 'Холодильник', 'Душ'], price: 20000, isAvailable: true, windows: 'Окно выходит на улицу', features: ['Двуспальная кровать'] },
      { id: '405', name: 'Номер 405', floor: 4, bedType: 'Двуспальная кровать (180x200)', capacity: 2, size: '22 м²', amenities: ['Wi-Fi', 'Кондиционер', 'Телевизор', 'Холодильник', 'Душ'], price: 20000, isAvailable: true, windows: 'Окно выходит во двор', features: ['Двуспальная кровать'] },
      { id: '406', name: 'Номер 406', floor: 4, bedType: 'Двуспальная кровать (180x200)', capacity: 2, size: '22 м²', amenities: ['Wi-Fi', 'Кондиционер', 'Телевизор', 'Холодильник', 'Душ'], price: 20000, isAvailable: true, windows: 'Окно выходит во двор', features: ['Двуспальная кровать'] },
      { id: '408', name: 'Номер 408', floor: 4, bedType: 'Двуспальная кровать (180x200)', capacity: 2, size: '22 м²', amenities: ['Wi-Fi', 'Кондиционер', 'Телевизор', 'Холодильник', 'Душ'], price: 20000, isAvailable: true, windows: 'Окно выходит во двор', features: ['Двуспальная кровать'] },
      { id: '410', name: 'Номер 410', floor: 4, bedType: 'Двуспальная кровать (180x200)', capacity: 2, size: '22 м²', amenities: ['Wi-Fi', 'Кондиционер', 'Телевизор', 'Холодильник', 'Душ'], price: 20000, isAvailable: true, windows: 'Окно выходит во двор', features: ['Двуспальная кровать'] }
    ]
  },
  deluxe: {
    id: 'deluxe',
    title: 'Делюкс',
    description: 'Просторные номера повышенной комфортности. Отличный выбор для романтического отдыха и деловых поездок.',
    icon: '✨',
    rooms: [
      { id: '202', name: 'Номер 202', floor: 2, bedType: 'Двуспальная кровать (180x200) + односпальная', capacity: 3, size: '32 м²', amenities: ['Wi-Fi', 'Кондиционер', 'Телевизор', 'Душ'], price: 30000, isAvailable: true, windows: 'Панорамный вид' },
      { id: '211', name: 'Номер 211', floor: 2, bedType: 'Двуспальная кровать (180x200)', capacity: 2, size: '30 м²', amenities: ['Wi-Fi', 'Кондиционер', 'Телевизор', 'Душ'], price: 30000, isAvailable: true, windows: 'Два окна' },
      { id: '302', name: 'Номер 302', floor: 3, bedType: 'Двуспальная кровать (180x200) + односпальная', capacity: 3, size: '32 м²', amenities: ['Wi-Fi', 'Кондиционер', 'Телевизор', 'Душ'], price: 30000, isAvailable: true, windows: 'Панорамный вид' },
      { id: '307', name: 'Номер 307', floor: 3, bedType: 'Двуспальная кровать (180x200)', capacity: 2, size: '30 м²', amenities: ['Wi-Fi', 'Кондиционер', 'Телевизор', 'Душ'], price: 30000, isAvailable: true, windows: 'Два окна' },
      { id: '402', name: 'Номер 402', floor: 4, bedType: 'Двуспальная кровать (180x200) + односпальная', capacity: 3, size: '32 м²', amenities: ['Wi-Fi', 'Кондиционер', 'Телевизор', 'Душ'], price: 30000, isAvailable: true, windows: 'Панорамный вид' },
      { id: '411', name: 'Номер 411', floor: 4, bedType: 'Двуспальная кровать (180x200)', capacity: 2, size: '30 м²', amenities: ['Wi-Fi', 'Кондиционер', 'Телевизор', 'Душ'], price: 30000, isAvailable: true, windows: 'Два окна' }
    ]
  },
  family: {
    id: 'family',
    title: 'Семейный',
    description: 'Просторные двухкомнатные номера для комфортного проживания всей семьёй.',
    icon: '👨‍👩‍👧‍👦',
    rooms: [
      { id: '201', name: 'Номер 201', floor: 2, bedType: 'Двуспальная кровать + 2 односпальные', capacity: 4, size: '45 м²', amenities: ['Wi-Fi', 'Кондиционер', 'Телевизор', 'Душ', 'Детская кроватка'], price: 35000, isAvailable: true, windows: 'Панорамный вид' },
      { id: '207', name: 'Номер 207', floor: 2, bedType: 'Двуспальная кровать + диван-кровать', capacity: 4, size: '42 м²', amenities: ['Wi-Fi', 'Кондиционер', 'Телевизор', 'Душ'], price: 35000, isAvailable: true, windows: 'Окно выходит во двор' },
      { id: '209', name: 'Номер 209', floor: 2, bedType: 'Двуспальная кровать + 2 односпальные', capacity: 4, size: '45 м²', amenities: ['Wi-Fi', 'Кондиционер', 'Телевизор', 'Душ'], price: 35000, isAvailable: true, windows: 'Панорамный вид' },
      { id: '301', name: 'Номер 301', floor: 3, bedType: 'Двуспальная кровать + 2 односпальные', capacity: 4, size: '45 м²', amenities: ['Wi-Fi', 'Кондиционер', 'Телевизор', 'Душ', 'Детская кроватка'], price: 35000, isAvailable: true, windows: 'Панорамный вид' },
      { id: '308', name: 'Номер 308', floor: 3, bedType: 'Двуспальная кровать + диван-кровать', capacity: 4, size: '42 м²', amenities: ['Wi-Fi', 'Кондиционер', 'Телевизор', 'Душ'], price: 35000, isAvailable: true, windows: 'Два окна' },
      { id: '310', name: 'Номер 310', floor: 3, bedType: 'Двуспальная кровать + 2 односпальные', capacity: 4, size: '45 м²', amenities: ['Wi-Fi', 'Кондиционер', 'Телевизор', 'Душ'], price: 35000, isAvailable: true, windows: 'Два окна' },
      { id: '401', name: 'Номер 401', floor: 4, bedType: 'Двуспальная кровать + 2 односпальные', capacity: 4, size: '45 м²', amenities: ['Wi-Fi', 'Кондиционер', 'Телевизор', 'Душ', 'Детская кроватка'], price: 35000, isAvailable: true, windows: 'Панорамный вид' },
      { id: '407', name: 'Номер 407', floor: 4, bedType: 'Двуспальная кровать + диван-кровать', capacity: 4, size: '42 м²', amenities: ['Wi-Fi', 'Кондиционер', 'Телевизор', 'Душ'], price: 35000, isAvailable: true, windows: 'Два окна' },
      { id: '409', name: 'Номер 409', floor: 4, bedType: 'Двуспальная кровать + 2 односпальные', capacity: 4, size: '45 м²', amenities: ['Wi-Fi', 'Кондиционер', 'Телевизор', 'Душ'], price: 35000, isAvailable: true, windows: 'Два окна' }
    ]
  }
};

const WIFI_PASSWORD = '12345678';
const BREAKFAST_TIME = '08:00–10:00, ежедневно';

const HOUSE_RULES = [
  'Курение в номерах строго запрещено — при обнаружении взимается штраф.',
  'Пожалуйста, бережно относитесь к имуществу отеля.',
  'При выезде убедитесь, что ключ от номера возвращён на ресепшен.',
];

const PENALTIES = [
  { title: 'Утеря ключа от номера', amount: 5000 },
  { title: 'Пятна, порезы и повреждения мебели/текстиля', amount: 5000 },
  { title: 'Иной ущерб имуществу номера', note: 'по факту оценки ремонта' },
];

const SERVICES = [
  { id: 'cleaning', label: 'Уборка в номере', icon: Sparkles, type: 'уборка' },
  { id: 'iron', label: 'Попросить утюг', icon: Shirt, type: 'утюг' },
  { id: 'towels', label: 'Чистые полотенца', icon: Bath, type: 'полотенца' },
  { id: 'water', label: 'Принести воду', icon: GlassWater, type: 'вода' },
  { id: 'food', label: 'Заказать еду', icon: UtensilsCrossed, type: 'еда' },
];

const FOOD_MENU = [
  { id: 'f1', name: 'Бешбармак', price: 3500 },
  { id: 'f2', name: 'Плов', price: 2800 },
  { id: 'f3', name: 'Борщ', price: 2000 },
  { id: 'f4', name: 'Шашлык из баранины', price: 700 },
  { id: 'f5', name: 'Лагман', price: 2500 },
  { id: 'f6', name: 'Чай / кофе', price: 800 },
  { id: 'f7', name: 'Вода 0.5л', price: 500 },
];

/* =========================================================================
   API
   ========================================================================= */

const BACKEND_BASE_URL = 'https://grand-villa-bot-production.up.railway.app';

async function apiPost(url, payload) {
  try {
    const res = await fetch(`${BACKEND_BASE_URL}${url}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    let data = null;
    try { data = await res.json(); } catch (_) {}
    if (!res.ok) return { ok: false, status: res.status, data };
    return { ok: true, status: res.status, data };
  } catch (err) {
    return { ok: false, status: 0, data: null, networkError: true };
  }
}

async function apiGet(url) {
  try {
    const res = await fetch(`${BACKEND_BASE_URL}${url}`);
    let data = null;
    try { data = await res.json(); } catch (_) {}
    if (!res.ok) return { ok: false, status: res.status, data };
    return { ok: true, status: res.status, data };
  } catch (err) {
    return { ok: false, status: 0, data: null, networkError: true };
  }
}

function formatTenge(value) {
  return `${value.toLocaleString('ru-RU')} ₸`;
}

/* =========================================================================
   UI КОМПОНЕНТЫ
   ========================================================================= */

function ArchFrame({ className = '', strokeClass = 'gv-stroke-gold', children }) {
  return (
    <div className={`gv-arch-wrap ${className}`}>
      <svg viewBox="0 0 300 300" className="gv-arch-svg" preserveAspectRatio="none" aria-hidden="true">
        <path d="M14,296 L14,150 Q14,14 150,14 Q286,14 286,150 L286,296" fill="none" className={strokeClass} strokeWidth="2" />
        <path d="M30,296 L30,152 Q30,30 150,30 Q270,30 270,152 L270,296" fill="none" className={strokeClass} strokeWidth="0.8" strokeDasharray="4 2" opacity="0.6" />
      </svg>
      <div className="gv-arch-content">{children}</div>
    </div>
  );
}

function StarPatternBg() {
  return (
    <svg className="gv-star-bg" aria-hidden="true">
      <defs>
        <pattern id="gv-star-pattern" width="40" height="40" patternUnits="userSpaceOnUse">
          <g transform="translate(20,20)">
            <rect width="14" height="14" x="-7" y="-7" transform="rotate(45)" fill="none" stroke="currentColor" strokeWidth="0.75" />
          </g>
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#gv-star-pattern)" />
    </svg>
  );
}

function Toast({ toast, onClose }) {
  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(onClose, 4000);
    return () => clearTimeout(t);
  }, [toast, onClose]);

  if (!toast) return null;
  const isError = toast.type === 'error';
  return (
    <div className={`gv-toast ${isError ? 'gv-toast-error' : 'gv-toast-success'}`}>
      {isError ? <AlertCircle size={20} /> : <CheckCircle2 size={20} />}
      <span>{toast.message}</span>
    </div>
  );
}

/* =========================================================================
   ОСНОВНОЙ САЙТ
   ========================================================================= */

function Header({ onBookClick }) {
  const [open, setOpen] = useState(false);
  const links = [
    { label: 'Номера', href: '#rooms' },
    { label: 'Бронирование', href: '#booking-form' },
    { label: 'Контакты', href: '#footer' },
  ];
  return (
    <header className="gv-header">
      <div className="gv-header-inner">
        <div className="gv-wordmark">
          <span className="gv-wordmark-main">{HOTEL_NAME}</span>
          <span className="gv-wordmark-sub">{HOTEL_CITY}</span>
        </div>

        <nav className="gv-nav-desktop">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="gv-nav-link">{l.label}</a>
          ))}
          <button onClick={onBookClick} className="gv-btn-gold-sm">Забронировать</button>
        </nav>

        <button className="gv-nav-toggle" onClick={() => setOpen((v) => !v)} aria-label="Меню">
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {open && (
        <div className="gv-nav-mobile">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="gv-nav-link" onClick={() => setOpen(false)}>{l.label}</a>
          ))}
          <button onClick={() => { setOpen(false); onBookClick(); }} className="gv-btn-gold-sm">Забронировать</button>
        </div>
      )}
    </header>
  );
}

function Hero({ onBookClick }) {
  return (
    <section className="gv-hero">
      <StarPatternBg />
      <div className="gv-hero-inner">
        <ArchFrame className="gv-hero-arch">
          <p className="gv-eyebrow">Шёлковый путь & Комфорт</p>
          <h1 className="gv-hero-title">{HOTEL_NAME}</h1>
          <p className="gv-hero-subtitle">
            Премиальный отдых в самом сердце {HOTEL_CITY}а — в шаговой доступности от мавзолея Ходжи Ахмеда Ясави.
          </p>
          
        </ArchFrame>
      </div>
    </section>
  );
}

function RoomsGrid({ onSelectRoom, roomsAvailability }) {
  const [expandedCategory, setExpandedCategory] = useState('standard');
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [showDetails, setShowDetails] = useState(false);

  const isRoomAvailable = (room) => {
    if (roomsAvailability && Object.prototype.hasOwnProperty.call(roomsAvailability, room.id)) {
      return roomsAvailability[room.id];
    }
    return room.isAvailable;
  };

  const toggleCategory = (categoryId) => {
    setExpandedCategory(expandedCategory === categoryId ? null : categoryId);
  };

  const handleBooking = (room) => {
    let categoryId = 'standard';
    if (room.id.startsWith('2') && ['202', '211'].includes(room.id)) categoryId = 'deluxe';
    else if (room.id.startsWith('2') && ['201', '207', '209'].includes(room.id)) categoryId = 'family';
    else if (room.id.startsWith('3') && ['302', '307'].includes(room.id)) categoryId = 'deluxe';
    else if (room.id.startsWith('3') && ['301', '308', '310'].includes(room.id)) categoryId = 'family';
    else if (room.id.startsWith('4') && ['402', '411'].includes(room.id)) categoryId = 'deluxe';
    else if (room.id.startsWith('4') && ['401', '407', '409'].includes(room.id)) categoryId = 'family';

    onSelectRoom({ category: categoryId, roomNumber: room.id });
    const el = document.getElementById('booking-form');
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <section id="rooms" className="gv-section gv-section-cream">
      <p className="gv-eyebrow gv-eyebrow-dark">Наши номера</p>
      <h2 className="gv-section-title">Выберите идеальный номер</h2>

      <div className="gv-rooms-container">
        {Object.values(ROOMS_DATA).map((category) => {
          const totalRooms = category.rooms.length;
          const availableRooms = category.rooms.filter((r) => isRoomAvailable(r)).length;
          const isExpanded = expandedCategory === category.id;

          return (
            <div key={category.id} className="gv-category-card">
              <div className="gv-category-header" onClick={() => toggleCategory(category.id)}>
                <div className="gv-category-header-left">
                  <span className="gv-category-icon">{category.icon}</span>
                  <div>
                    <h3 className="gv-category-title">{category.title}</h3>
                    <p className="gv-category-subtitle">{totalRooms} номеров • <strong style={{color: '#1E6B63'}}>{availableRooms} свободно</strong></p>
                  </div>
                </div>
                <div className="gv-category-price">
                  от {formatTenge(category.rooms[0].price)}
                  <span className="gv-category-price-unit">/ночь</span>
                </div>
              </div>

              {isExpanded && (
                <div className="gv-rooms-list">
                  <p className="gv-category-desc">{category.description}</p>
                  <div className="gv-rooms-grid">
                    {category.rooms.map((room) => {
                      const available = isRoomAvailable(room);
                      return (
                        <div
                          key={room.id}
                          className={`gv-room-item ${!available ? 'gv-room-unavailable' : ''}`}
                          onClick={() => { if (available) { setSelectedRoom(room); setShowDetails(true); } }}
                        >
                          <div className="gv-room-header">
                            <span className="gv-room-number">{room.name}</span>
                            <span className={`gv-room-status ${available ? 'gv-room-available' : 'gv-room-occupied'}`}>
                              {available ? '🟢 Свободен' : '🔴 Занят'}
                            </span>
                          </div>

                          <div className="gv-room-details">
                            <div className="gv-room-detail-item"><span>Этаж:</span><strong>{room.floor}</strong></div>
                            <div className="gv-room-detail-item"><span>Кровать:</span><strong>{room.bedType}</strong></div>
                            <div className="gv-room-detail-item"><span>Вместимость:</span><strong>до {room.capacity} гостей</strong></div>
                          </div>

                          <div className="gv-room-amenities">
                            {room.amenities.slice(0, 3).map((a, i) => (
                              <span key={i} className="gv-amenity-tag">{a}</span>
                            ))}
                          </div>

                          {available && (
                            <button
                              className="gv-btn-gold-sm gv-room-book-btn"
                              onClick={(e) => { e.stopPropagation(); handleBooking(room); }}
                            >
                              Забронировать
                            </button>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {showDetails && selectedRoom && (
        <div className="gv-modal-backdrop" onClick={() => setShowDetails(false)}>
          <div className="gv-modal" onClick={(e) => e.stopPropagation()}>
            <button className="gv-modal-close" onClick={() => setShowDetails(false)}><X size={20} /></button>
            <h3 style={{fontFamily: 'Cormorant Garamond, serif', fontSize: '1.6rem', margin: '0 0 0.5rem'}}>{selectedRoom.name}</h3>
            <p style={{color: '#B8872F', fontWeight: 'bold', fontSize: '1.2rem'}}>{formatTenge(selectedRoom.price)} / ночь</p>
            <div style={{fontSize: '0.9rem', color: '#57514A', display: 'flex', flexDirection: 'column', gap: '0.4rem', margin: '1rem 0'}}>
              <p><strong>Этаж:</strong> {selectedRoom.floor}</p>
              <p><strong>Спальное место:</strong> {selectedRoom.bedType}</p>
              <p><strong>Вид:</strong> {selectedRoom.windows}</p>
            </div>
            <button className="gv-btn-gold" onClick={() => { setShowDetails(false); handleBooking(selectedRoom); }}>
              Забронировать этот номер
            </button>
          </div>
        </div>
      )}
    </section>
  );
}

function BookingForm({ selectedRoom, onBookingSuccess }) {
  const [form, setForm] = useState({
    name: '', phone: '', category: selectedRoom?.category || 'standard', checkIn: '', checkOut: ''
  });
  const [status, setStatus] = useState('idle');
  const [errorMsg, setErrorMsg] = useState('');
  const [roomOverridden, setRoomOverridden] = useState(false);

  useEffect(() => {
    if (selectedRoom?.category) {
      setForm((f) => ({ ...f, category: selectedRoom.category }));
      setRoomOverridden(false);
    }
  }, [selectedRoom]);

  const update = (key) => (e) => {
    if (key === 'category') setRoomOverridden(true);
    setForm((f) => ({ ...f, [key]: e.target.value }));
  };

  const targetRoomNumber = !roomOverridden ? selectedRoom?.roomNumber : null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    if (!form.name || !form.phone || !form.checkIn || !form.checkOut) {
      setErrorMsg('Заполните все необходимые поля.');
      return;
    }
    if (new Date(form.checkOut) <= new Date(form.checkIn)) {
      setErrorMsg('Дата выезда должна быть позже заезда.');
      return;
    }

    setStatus('loading');
    const result = await apiPost('/api/bookings', {
      name: form.name,
      phone: form.phone,
      category: form.category,
      check_in: form.checkIn,
      check_out: form.checkOut,
      room_number: targetRoomNumber || undefined,
    });

    if (result.ok) {
      setStatus('success');
      const bookedNum = result.data?.room_number || targetRoomNumber;
      if (bookedNum && onBookingSuccess) onBookingSuccess(bookedNum);
    } else {
      setStatus('error');
      setErrorMsg(result.status === 409 ? 'Номер уже забронирован на эти даты.' : 'Ошибка соединения.');
    }
  };

  if (status === 'success') {
    return (
      <section id="booking-form" className="gv-section gv-section-charcoal">
        <div className="gv-booking-success">
          <CheckCircle2 size={48} className="gv-stroke-gold" />
          <h3 style={{fontSize: '1.8rem', margin: '0.8rem 0'}}>Бронирование отправлено!</h3>
          <p>Мы свяжемся с вами по номеру {form.phone} для подтверждения.</p>
          <button className="gv-btn-outline-light" onClick={() => setStatus('idle')}>Забронировать ещё</button>
        </div>
      </section>
    );
  }

  return (
    <section id="booking-form" className="gv-section gv-section-charcoal">
      <div className="gv-booking-grid">
        <div>
          <p className="gv-eyebrow">Заполните форму</p>
          <h2 className="gv-section-title gv-section-title-light">Оформить бронирование</h2>

          <form onSubmit={handleSubmit} className="gv-form">
            {errorMsg && <div className="gv-form-error"><AlertCircle size={18} /><span>{errorMsg}</span></div>}
            {targetRoomNumber && <div className="gv-form-notice"><CheckCircle2 size={16} /><span>Вы бронируете номер {targetRoomNumber}</span></div>}

            <label className="gv-field">
              <span>Имя</span>
              <input type="text" value={form.name} onChange={update('name')} placeholder="Асель Нурланова" />
            </label>

            <label className="gv-field">
              <span>Телефон</span>
              <input type="tel" value={form.phone} onChange={update('phone')} placeholder="+7 707 ___ __ __" />
            </label>

            <label className="gv-field">
              <span>Категория</span>
              <select value={form.category} onChange={update('category')}>
                <option value="standard">Стандарт — 20 000 ₸</option>
                <option value="deluxe">Делюкс — 30 000 ₸</option>
                <option value="family">Семейный — 35 000 ₸</option>
              </select>
            </label>

            <div className="gv-field-row">
              <label className="gv-field">
                <span>Дата заезда</span>
                <input type="date" value={form.checkIn} onChange={update('checkIn')} />
              </label>
              <label className="gv-field">
                <span>Дата выезда</span>
                <input type="date" value={form.checkOut} onChange={update('checkOut')} />
              </label>
            </div>

            <button type="submit" className="gv-btn-gold" disabled={status === 'loading'}>
              {status === 'loading' ? <><Loader2 size={18} className="gv-spin" /> Отправка...</> : 'Забронировать'}
            </button>
          </form>
        </div>

        <ArchFrame className="gv-booking-arch" strokeClass="gv-stroke-gold-light">
          <p className="gv-eyebrow">{HOTEL_NAME}</p>
          <p style={{fontSize: '1rem', lineHeight: '1.6', color: '#D9D2C4'}}>
            Ждём вас в {HOTEL_CITY}е — уникальном месте Великого Шёлкового пути.
          </p>
        </ArchFrame>
      </div>
    </section>
  );
}

function WhatsAppWidget() {
  const href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent('Здравствуйте! Я хочу узнать насчет проживания...')}`;
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className="gv-whatsapp-fab">
      <MessageCircle size={22} />
      <span>Спросить в WhatsApp</span>
    </a>
  );
}

function Footer() {
  return (
    <footer id="footer" className="gv-footer">
      <div className="gv-footer-grid">
        <div>
          <p className="gv-wordmark-main" style={{color: '#fff'}}>{HOTEL_NAME}</p>
          <p style={{fontSize: '0.85rem', color: '#B8B0A2', margin: '0.2rem 0 0'}}>Ваш уютный дом в {HOTEL_CITY}е</p>
        </div>
        <div className="gv-footer-contact">
          <p><MapPin size={16} className="gv-stroke-gold-light" /> ул. Б.Саттарханова 55, {HOTEL_CITY}</p>
          <p><Phone size={16} className="gv-stroke-gold-light" /> +7 707 454 16 96</p>
        </div>
      </div>
      <p className="gv-footer-copy">© {new Date().getFullYear()} {HOTEL_NAME}. Все права защищены.</p>
    </footer>
  );
}

/* =========================================================================
   QR РУМ СЕРВИС (ЭКРАН /room/:number)
   ========================================================================= */

function RoomScreen({ roomNumber, onExit }) {
  const [activeService, setActiveService] = useState(null);
  const [toast, setToast] = useState(null);

  return (
    <div className="gv-page gv-page-room">
      <div className="gv-room-topbar">
        <button className="gv-room-back" onClick={onExit}><ArrowLeft size={18} /> На главный сайт</button>
        <span className="gv-room-badge">Номер {roomNumber}</span>
      </div>

      <div className="gv-room-inner">
        <ArchFrame>
          <p className="gv-eyebrow">{HOTEL_NAME}</p>
          <h1 style={{fontFamily: 'Cormorant Garamond, serif', fontSize: '2rem', margin: '0 0 0.5rem'}}>Добро пожаловать в номер {roomNumber}!</h1>
          <p style={{color: '#57514A', fontSize: '0.9rem'}}>Выберите услугу — мы приедем к вам в ближайшие минуты.</p>
        </ArchFrame>

        <div className="gv-service-grid">
          {SERVICES.map((s) => {
            const Icon = s.icon;
            return (
              <button key={s.id} className="gv-service-btn" onClick={() => setActiveService(s)}>
                <Icon size={28} className="gv-stroke-gold" />
                <span>{s.label}</span>
              </button>
            );
          })}
        </div>

        <div style={{marginTop: '2rem', background: '#fff', padding: '1.2rem', borderRadius: '8px', border: '1px solid rgba(184,135,47,0.2)'}}>
          <h3 style={{fontFamily: 'Cormorant Garamond, serif', fontSize: '1.3rem', margin: '0 0 0.8rem'}}>Информация</h3>
          <p style={{fontSize: '0.85rem', margin: '0.4rem 0'}}><strong>Wi-Fi Пароль:</strong> {WIFI_PASSWORD}</p>
          <p style={{fontSize: '0.85rem', margin: '0.4rem 0'}}><strong>Завтрак:</strong> {BREAKFAST_TIME}</p>
        </div>
      </div>

      {activeService && activeService.type === 'еда' ? (
        <FoodMenuModal roomNumber={roomNumber} onClose={() => setActiveService(null)} onDone={(t) => { setActiveService(null); setToast(t); }} />
      ) : activeService ? (
        <ConfirmModal service={activeService} roomNumber={roomNumber} onClose={() => setActiveService(null)} onDone={(t) => { setActiveService(null); setToast(t); }} />
      ) : null}

      <Toast toast={toast} onClose={() => setToast(null)} />
    </div>
  );
}

function ConfirmModal({ service, roomNumber, onClose, onDone }) {
  const [comment, setComment] = useState('');
  const [status, setStatus] = useState('idle');

  const handleConfirm = async () => {
    setStatus('loading');
    const res = await apiPost('/api/orders', { room_number: roomNumber, service_type: service.type, details: comment });
    if (res.ok) onDone({ type: 'success', message: 'Запрос принят администратором!' });
    else setStatus('error');
  };

  return (
    <div className="gv-modal-backdrop" onClick={onClose}>
      <div className="gv-modal" onClick={(e) => e.stopPropagation()}>
        <button className="gv-modal-close" onClick={onClose}><X size={20} /></button>
        <h3 className="gv-modal-title">{service.label}</h3>
        <label className="gv-field">
          <span>Комментарий</span>
          <textarea rows={3} value={comment} onChange={(e) => setComment(e.target.value)} placeholder="Например: сделать поскорее" />
        </label>
        <button className="gv-btn-gold" onClick={handleConfirm} disabled={status === 'loading'}>
          {status === 'loading' ? 'Отправка...' : 'Отправить запрос'}
        </button>
      </div>
    </div>
  );
}

function FoodMenuModal({ roomNumber, onClose, onDone }) {
  const [cart, setCart] = useState({});
  const [status, setStatus] = useState('idle');

  const changeQty = (id, d) => {
    setCart((c) => {
      const n = Math.max(0, (c[id] || 0) + d);
      const copy = { ...c };
      if (n === 0) delete copy[id]; else copy[id] = n;
      return copy;
    });
  };

  const total = Object.entries(cart).reduce((sum, [id, qty]) => {
    const item = FOOD_MENU.find(f => f.id === id);
    return sum + (item ? item.price * qty : 0);
  }, 0);

  const handleConfirm = async () => {
    if (total === 0) return;
    setStatus('loading');
    const details = Object.entries(cart).map(([id, qty]) => {
      const item = FOOD_MENU.find(f => f.id === id);
      return `${item.name} x${qty}`;
    }).join(', ');

    const res = await apiPost('/api/orders', { room_number: roomNumber, service_type: 'еда', details });
    if (res.ok) onDone({ type: 'success', message: 'Заказ отправлен!' });
    else setStatus('error');
  };

  return (
    <div className="gv-modal-backdrop" onClick={onClose}>
      <div className="gv-modal gv-modal-wide" onClick={(e) => e.stopPropagation()}>
        <button className="gv-modal-close" onClick={onClose}><X size={20} /></button>
        <h3 className="gv-modal-title">Меню Кухни</h3>
        <div className="gv-food-list">
          {FOOD_MENU.map((item) => (
            <div key={item.id} className="gv-food-row">
              <div>
                <p className="gv-food-name">{item.name}</p>
                <p className="gv-food-price">{formatTenge(item.price)}</p>
              </div>
              <div className="gv-qty-control">
                <button onClick={() => changeQty(item.id, -1)}><Minus size={14} /></button>
                <span>{cart[item.id] || 0}</span>
                <button onClick={() => changeQty(item.id, 1)}><Plus size={14} /></button>
              </div>
            </div>
          ))}
        </div>
        <div className="gv-food-footer">
          <span className="gv-food-total">Итого: {formatTenge(total)}</span>
          <button className="gv-btn-gold" onClick={handleConfirm} disabled={status === 'loading' || total === 0}>
            {status === 'loading' ? 'Оформление...' : 'Заказать'}
          </button>
        </div>
      </div>
    </div>
  );
}

/* =========================================================================
   GLOBAL STYLES & ROUTING
   ========================================================================= */

function GlobalStyles() {
  return (
    <style>{`
      @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@600;700&family=Manrope:wght@400;500;600;700&display=swap');

      .gv-root {
        --cream: #F9F6F0;
        --cream-deep: #F1EAD8;
        --charcoal: #1C1A17;
        --charcoal-soft: #57514A;
        --gold: #B8872F;
        --gold-light: #D1A348;
        font-family: 'Manrope', sans-serif;
        color: var(--charcoal);
        background: var(--cream);
      }
      .gv-root * { box-sizing: border-box; }
      .gv-page { display: flex; flex-direction: column; min-height: 100vh; }

      .gv-eyebrow { font-size: 0.7rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.2em; color: var(--gold); margin-bottom: 0.4rem; }
      .gv-eyebrow-dark { color: var(--gold); }
      .gv-stroke-gold { stroke: var(--gold); color: var(--gold); }
      .gv-stroke-gold-light { stroke: var(--gold-light); color: var(--gold-light); }

      /* Header */
      .gv-header { position: sticky; top: 0; z-index: 40; background: rgba(249,246,240,0.95); backdrop-filter: blur(8px); border-bottom: 1px solid rgba(184,135,47,0.2); }
      .gv-header-inner { max-width: 1140px; margin: 0 auto; padding: 1rem 1.5rem; display: flex; justify-content: space-between; align-items: center; }
      .gv-wordmark-main { font-family: 'Cormorant Garamond', serif; font-size: 1.6rem; font-weight: 700; color: var(--charcoal); }
      .gv-wordmark-sub { font-size: 0.65rem; text-transform: uppercase; letter-spacing: 0.2em; color: var(--gold); display: block; }
      .gv-nav-desktop { display: none; align-items: center; gap: 2rem; }
      .gv-nav-link { font-size: 0.9rem; color: var(--charcoal-soft); text-decoration: none; font-weight: 500; }
      .gv-nav-link:hover { color: var(--gold); }
      .gv-nav-toggle { background: none; border: none; cursor: pointer; color: var(--charcoal); }
      .gv-nav-mobile { display: flex; flex-direction: column; gap: 1rem; padding: 1rem 1.5rem; border-top: 1px solid rgba(184,135,47,0.15); }
      @media(min-width: 768px) { .gv-nav-desktop { display: flex; } .gv-nav-toggle, .gv-nav-mobile { display: none; } }

      /* Buttons */
      .gv-btn-gold, .gv-btn-gold-sm {
        display: inline-flex; align-items: center; justify-content: center; gap: 0.5rem;
        background: var(--gold); color: #fff; border: none; font-weight: 600; cursor: pointer; border-radius: 6px;
        transition: background 0.2s;
      }
      .gv-btn-gold { padding: 0.9rem 1.8rem; font-size: 0.95rem; width: 100%; }
      .gv-btn-gold-sm { padding: 0.5rem 1.2rem; font-size: 0.85rem; }
      .gv-btn-gold:hover, .gv-btn-gold-sm:hover { background: #9E7123; }

      .gv-btn-outline-light {
        padding: 0.7rem 1.4rem; background: transparent; border: 1px solid var(--gold-light); color: var(--gold-light); border-radius: 6px; cursor: pointer;
      }

      /* Hero */
      .gv-hero { position: relative; background: var(--charcoal); color: #fff; padding: 5rem 1.5rem; text-align: center; overflow: hidden; }
      .gv-star-bg { position: absolute; inset: 0; color: var(--gold); opacity: 0.05; width: 100%; height: 100%; }
      .gv-hero-inner { position: relative; z-index: 1; max-width: 640px; margin: 0 auto; }
      .gv-hero-title { font-family: 'Cormorant Garamond', serif; font-size: clamp(2.5rem, 6vw, 3.8rem); margin: 0.5rem 0 1rem; font-weight: 700; }
      .gv-hero-subtitle { font-size: 1rem; color: #D9D2C4; line-height: 1.6; margin-bottom: 2rem; }

      /* Arch frame */
      .gv-arch-wrap { position: relative; padding: 3rem 1.5rem 2rem; }
      .gv-arch-svg { position: absolute; inset: 0; width: 100%; height: 100%; }
      .gv-arch-content { position: relative; z-index: 1; }

      /* Sections & Rooms */
      .gv-section { padding: 4.5rem 1.5rem; }
      .gv-section-cream { background: var(--cream-deep); }
      .gv-section-charcoal { background: var(--charcoal); color: #fff; }
      .gv-section-title { font-family: 'Cormorant Garamond', serif; font-size: clamp(1.8rem, 4vw, 2.5rem); margin: 0 0 2rem; text-align: center; }
      .gv-section-title-light { color: #fff; }

      .gv-rooms-container { max-width: 1000px; margin: 0 auto; display: flex; flex-direction: column; gap: 1.2rem; }
      .gv-category-card { background: #fff; border: 1px solid rgba(184,135,47,0.2); border-radius: 12px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.03); }
      .gv-category-header { display: flex; justify-content: space-between; align-items: center; padding: 1.4rem 1.6rem; cursor: pointer; background: #fff; }
      .gv-category-header-left { display: flex; align-items: center; gap: 1rem; }
      .gv-category-icon { font-size: 1.8rem; }
      .gv-category-title { font-family: 'Cormorant Garamond', serif; font-size: 1.5rem; margin: 0; }
      .gv-category-subtitle { font-size: 0.8rem; color: var(--charcoal-soft); margin-top: 0.2rem; }
      .gv-category-price { font-weight: 700; color: var(--gold); font-size: 1.1rem; }
      .gv-category-price-unit { font-size: 0.75rem; color: var(--charcoal-soft); font-weight: normal; }

      .gv-rooms-list { padding: 1.2rem 1.6rem 1.6rem; border-top: 1px solid rgba(184,135,47,0.15); background: #FAF7F2; }
      .gv-category-desc { font-size: 0.9rem; color: var(--charcoal-soft); margin-bottom: 1.2rem; }
      .gv-rooms-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 1rem; }

      .gv-room-item { background: #fff; border: 1px solid rgba(184,135,47,0.2); border-radius: 8px; padding: 1rem; display: flex; flex-direction: column; gap: 0.8rem; cursor: pointer; }
      .gv-room-item:hover:not(.gv-room-unavailable) { border-color: var(--gold); transform: translateY(-2px); transition: all 0.2s; }
      .gv-room-unavailable { opacity: 0.6; cursor: not-allowed; background: #EEE; }
      .gv-room-header { display: flex; justify-content: space-between; align-items: center; }
      .gv-room-number { font-weight: 700; }
      .gv-room-status { font-size: 0.75rem; font-weight: 600; }
      .gv-room-details { font-size: 0.8rem; color: var(--charcoal-soft); display: flex; flex-direction: column; gap: 0.3rem; }
      .gv-room-detail-item { display: flex; justify-content: space-between; }
      .gv-room-amenities { display: flex; flex-wrap: wrap; gap: 0.3rem; }
      .gv-amenity-tag { font-size: 0.7rem; background: #F4EFE5; color: var(--charcoal-soft); padding: 0.15rem 0.4rem; border-radius: 4px; }

      /* Form */
      .gv-booking-grid { max-width: 960px; margin: 0 auto; display: grid; grid-template-columns: 1fr; gap: 2rem; }
      @media(min-width: 800px) { .gv-booking-grid { grid-template-columns: 1.2fr 0.8fr; align-items: center; } }
      .gv-form { display: flex; flex-direction: column; gap: 1rem; }
      .gv-field { display: flex; flex-direction: column; gap: 0.3rem; font-size: 0.85rem; color: #D9D2C4; }
      .gv-field input, .gv-field select, .gv-field textarea {
        padding: 0.75rem; border: 1px solid rgba(184,135,47,0.4); background: rgba(255,255,255,0.05); color: #fff; border-radius: 6px; font-size: 0.9rem;
      }
      .gv-field select option { background: var(--charcoal); color: #fff; }
      .gv-field-row { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; }

      .gv-form-error { background: rgba(200,60,60,0.2); border: 1px solid rgba(200,60,60,0.5); color: #FFAAAA; padding: 0.7rem; border-radius: 6px; font-size: 0.85rem; display: flex; gap: 0.5rem; align-items: center; }
      .gv-form-notice { background: rgba(184,135,47,0.2); border: 1px solid var(--gold); color: var(--gold-light); padding: 0.6rem; border-radius: 6px; font-size: 0.85rem; display: flex; gap: 0.5rem; align-items: center; }

      /* Fab & Footer */
      .gv-whatsapp-fab {
        position: fixed; bottom: 1.5rem; right: 1.5rem; z-index: 50; display: flex; align-items: center; gap: 0.5rem;
        background: #1E6B63; color: #fff; padding: 0.8rem 1.2rem; border-radius: 50px; text-decoration: none; font-size: 0.85rem; font-weight: 600; box-shadow: 0 4px 15px rgba(0,0,0,0.3);
      }
      .gv-footer { background: #141311; color: #fff; padding: 3rem 1.5rem 1.5rem; border-top: 1px solid rgba(184,135,47,0.2); }
      .gv-footer-grid { max-width: 960px; margin: 0 auto; display: flex; flex-direction: column; gap: 1.5rem; justify-content: space-between; }
      @media(min-width: 600px) { .gv-footer-grid { flex-direction: row; } }
      .gv-footer-contact { font-size: 0.85rem; color: #D9D2C4; display: flex; flex-direction: column; gap: 0.5rem; }
      .gv-footer-copy { text-align: center; font-size: 0.75rem; color: #777; margin-top: 2rem; border-top: 1px solid rgba(255,255,255,0.05); padding-top: 1rem; }

      /* Modals */
      .gv-modal-backdrop { position: fixed; inset: 0; background: rgba(0,0,0,0.6); z-index: 60; display: flex; align-items: center; justify-content: center; padding: 1rem; }
      .gv-modal { background: var(--cream); width: 100%; max-width: 440px; padding: 2rem; border-radius: 12px; position: relative; max-height: 90vh; overflow-y: auto; }
      .gv-modal-close { position: absolute; top: 1rem; right: 1rem; background: none; border: none; cursor: pointer; }
      .gv-modal-title { font-family: 'Cormorant Garamond', serif; font-size: 1.5rem; margin: 0 0 1rem; }

      .gv-food-list { display: flex; flex-direction: column; gap: 0.8rem; margin: 1rem 0; }
      .gv-food-row { display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid rgba(184,135,47,0.15); padding-bottom: 0.5rem; }
      .gv-food-name { margin: 0; font-size: 0.9rem; font-weight: 600; }
      .gv-food-price { margin: 0; font-size: 0.8rem; color: var(--charcoal-soft); }
      .gv-qty-control { display: flex; align-items: center; gap: 0.6rem; }
      .gv-qty-control button { width: 26px; height: 26px; border-radius: 50%; border: 1px solid var(--gold); background: none; color: var(--gold); cursor: pointer; display: flex; align-items: center; justify-content: center; }
      .gv-food-footer { display: flex; justify-content: space-between; align-items: center; margin-top: 1rem; }

      .gv-spin { animation: gv-spin 1s linear infinite; }
      @keyframes gv-spin { to { transform: rotate(360deg); } }

      /* QR Screen */
      .gv-page-room { background: var(--cream); }
      .gv-room-topbar { display: flex; justify-content: space-between; align-items: center; padding: 1rem 1.5rem; border-bottom: 1px solid rgba(184,135,47,0.2); }
      .gv-room-back { background: none; border: none; cursor: pointer; display: flex; align-items: center; gap: 0.4rem; font-weight: 600; }
      .gv-room-badge { background: var(--gold); color: #fff; padding: 0.3rem 0.8rem; border-radius: 20px; font-size: 0.75rem; font-weight: 700; }
      .gv-room-inner { max-width: 500px; margin: 0 auto; padding: 1.5rem; }
      .gv-service-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 0.8rem; margin-top: 1.5rem; }
      .gv-service-btn { background: #fff; border: 1px solid rgba(184,135,47,0.3); border-radius: 8px; padding: 1.2rem; cursor: pointer; display: flex; flex-direction: column; align-items: center; gap: 0.5rem; font-weight: 600; font-size: 0.85rem; }
      .gv-service-btn:hover { border-color: var(--gold); }

      .gv-toast { position: fixed; bottom: 1.5rem; left: 50%; transform: translateX(-50%); z-index: 70; display: flex; align-items: center; gap: 0.5rem; padding: 0.8rem 1.4rem; border-radius: 8px; font-weight: 600; font-size: 0.85rem; box-shadow: 0 4px 20px rgba(0,0,0,0.2); }
      .gv-toast-success { background: #1E6B63; color: #fff; }
      .gv-toast-error { background: #8A3A3A; color: #fff; }
    `}</style>
  );
}

function parseRoute(pathname) {
  const match = pathname.match(/^\/room\/([a-zA-Z0-9-]+)\/?$/);
  if (match) return { mode: 'room', roomNumber: match[1] };
  return { mode: 'landing', roomNumber: null };
}

export default function GrandVillaPortal() {
  const [route, setRoute] = useState(() => parseRoute(window.location.pathname));
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [roomsAvailability, setRoomsAvailability] = useState({});

  useEffect(() => {
    const onPopState = () => setRoute(parseRoute(window.location.pathname));
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, []);

  const loadAvailability = async () => {
    const result = await apiGet('/api/rooms/availability');
    if (result.ok && result.data?.rooms) {
      const map = {};
      for (const room of result.data.rooms) {
        map[room.room_number] = room.is_available;
      }
      setRoomsAvailability(map);
    }
  };

  useEffect(() => { loadAvailability(); }, []);

  const handleSelectRoom = (room) => {
    setSelectedRoom(room);
    const el = document.getElementById('booking-form');
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className="gv-root">
      <GlobalStyles />
      {route.mode === 'room' ? (
        <RoomScreen roomNumber={route.roomNumber} onExit={() => window.history.pushState({}, '', '/')} />
      ) : (
        <div className="gv-page">
          <Header onBookClick={() => handleSelectRoom({ category: selectedRoom?.category || 'standard', roomNumber: null })} />
          <Hero onBookClick={() => handleSelectRoom({ category: selectedRoom?.category || 'standard', roomNumber: null })} />
          <RoomsGrid onSelectRoom={handleSelectRoom} roomsAvailability={roomsAvailability} />
          <BookingForm selectedRoom={selectedRoom} onBookingSuccess={(num) => {
            setRoomsAvailability(prev => ({ ...prev, [num]: false }));
            loadAvailability();
          }} />
          <Footer />
          <WhatsAppWidget />
        </div>
      )}
    </div>
  );
}