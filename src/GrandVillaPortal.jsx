import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Menu, X, Phone, MapPin, ChevronRight, ArrowLeft, Loader2, AlertCircle,
  CheckCircle2, MessageCircle, Star, Wifi, Clock, Ban, ShieldAlert,
  Sparkles, Shirt, Bath, GlassWater, UtensilsCrossed, Plus, Minus, Search, Filter, Calendar
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
    description: 'Просторные номера повышенной комфортности. Отличный выбор для романтического отдыха и деловых поездок с повышенным комфортом.',
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
    description: 'Просторные двухкомнатные номера для комфортного проживания всей семьёй. Есть всё для качественного отдыха с детьми.',
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
  'Курение в номерах строго запрещено — штраф при обнаружении.',
  'Бережное отношение к инфраструктуре и отделке отеля.',
  'При выезде ключ сдаётся на стойку администрации.',
];

const PENALTIES = [
  { title: 'Утеря ключа от номера', amount: 5000 },
  { title: 'Повреждения мебели или текстиля', amount: 5000 },
  { title: 'Иной ущерб номерному фонду', note: 'по факту оценки стоимости ремонта' },
];

const SERVICES = [
  { id: 'cleaning', label: 'Уборка номера', icon: Sparkles, type: 'уборка' },
  { id: 'iron', label: 'Утюг и глажка', icon: Shirt, type: 'утюг' },
  { id: 'towels', label: 'Чистые полотенца', icon: Bath, type: 'полотенца' },
  { id: 'water', label: 'Доставка воды', icon: GlassWater, type: 'вода' },
  { id: 'food', label: 'Заказ еды', icon: UtensilsCrossed, type: 'еда' },
];

const FOOD_MENU = [
  { id: 'f1', name: 'Бешбармак', price: 3500 },
  { id: 'f2', name: 'Плов премиум', price: 2800 },
  { id: 'f3', name: 'Борщ по-домашнему', price: 2000 },
  { id: 'f4', name: 'Шашлык из баранины', price: 700 },
  { id: 'f5', name: 'Лагман уйгурский', price: 2500 },
  { id: 'f6', name: 'Кофейный сет / Чайник чая', price: 800 },
  { id: 'f7', name: 'Минеральная вода 0.5л', price: 500 },
];

/* =========================================================================
   API УТИЛИТЫ
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
   ДЕКОРАТИВНЫЕ ЭЛЕМЕНТЫ (Восточные Арочные узоры)
   ========================================================================= */

function ArchFrame({ className = '', strokeClass = 'stroke-amber-600/40', children }) {
  return (
    <div className={`relative text-center px-6 pt-12 pb-8 ${className}`}>
      <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 300 300" preserveAspectRatio="none">
        <path
          d="M14,296 L14,150 Q14,14 150,14 Q286,14 286,150 L286,296"
          fill="none"
          className={strokeClass}
          strokeWidth="1.5"
        />
        <path
          d="M24,296 L24,152 Q24,24 150,24 Q276,24 276,152 L276,296"
          fill="none"
          className={strokeClass}
          strokeWidth="0.5"
          strokeDasharray="4 2"
        />
      </svg>
      <div className="relative z-10">{children}</div>
    </div>
  );
}

function PatternBackground() {
  return (
    <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#b8872f_1px,transparent_1px)] [background-size:16px_16px]" />
  );
}

/* =========================================================================
   УВЕДОМЛЕНИЯ (TOAST)
   ========================================================================= */

function Toast({ toast, onClose }) {
  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(onClose, 4000);
    return () => clearTimeout(t);
  }, [toast, onClose]);

  if (!toast) return null;

  const isError = toast.type === 'error';
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 50, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 20, scale: 0.95 }}
        className={`fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3 px-5 py-3.5 rounded-full shadow-2xl backdrop-blur-md text-sm font-medium border ${
          isError 
            ? 'bg-rose-950/90 text-rose-200 border-rose-800/50' 
            : 'bg-emerald-950/90 text-emerald-200 border-emerald-800/50'
        }`}
      >
        {isError ? <AlertCircle className="w-5 h-5 text-rose-400" /> : <CheckCircle2 className="w-5 h-5 text-emerald-400" />}
        <span>{toast.message}</span>
      </motion.div>
    </AnimatePresence>
  );
}

/* =========================================================================
   HEADER
   ========================================================================= */

function Header({ onBookClick }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const links = [
    { label: 'Номера', href: '#rooms' },
    { label: 'Бронирование', href: '#booking-form' },
    { label: 'Контакты', href: '#footer' },
  ];

  return (
    <header className={`sticky top-0 z-40 transition-all duration-300 backdrop-blur-md ${
      scrolled 
        ? 'bg-amber-50/90 shadow-sm border-b border-amber-900/10 py-3' 
        : 'bg-amber-50/50 border-b border-transparent py-5'
    }`}>
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <div className="flex flex-col">
          <span className="font-serif font-bold text-2xl tracking-tight text-amber-950 uppercase">{HOTEL_NAME}</span>
          <span className="text-[10px] tracking-[0.3em] font-semibold text-amber-600 uppercase">{HOTEL_CITY}</span>
        </div>

        <nav className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="text-sm font-medium text-stone-700 hover:text-amber-600 transition-colors">
              {l.label}
            </a>
          ))}
          <button 
            onClick={onBookClick} 
            className="px-5 py-2.5 rounded-full bg-amber-600 hover:bg-amber-700 text-white text-xs font-semibold uppercase tracking-wider transition-all duration-200 shadow-md shadow-amber-600/20 active:scale-95"
          >
            Забронировать
          </button>
        </nav>

        <button 
          onClick={() => setOpen(!open)} 
          className="md:hidden p-2 text-stone-800 hover:text-amber-600 focus:outline-none"
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden border-t border-amber-900/10 bg-amber-50/95 overflow-hidden"
          >
            <div className="px-6 py-6 flex flex-col gap-4">
              {links.map((l) => (
                <a 
                  key={l.href} 
                  href={l.href} 
                  onClick={() => setOpen(false)}
                  className="text-base font-medium text-stone-800 hover:text-amber-600"
                >
                  {l.label}
                </a>
              ))}
              <button
                onClick={() => {
                  setOpen(false);
                  onBookClick();
                }}
                className="w-full py-3 rounded-xl bg-amber-600 text-white font-medium text-sm shadow-md"
              >
                Забронировать
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

/* =========================================================================
   HERO SECTION
   ========================================================================= */

function Hero({ onBookClick }) {
  return (
    <section className="relative min-h-[80vh] bg-stone-900 text-amber-50 flex items-center justify-center px-6 py-20 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-amber-900/30 via-stone-900 to-stone-950" />
      <PatternBackground />
      
      <div className="relative z-10 max-w-3xl mx-auto text-center">
        <ArchFrame className="backdrop-blur-sm bg-stone-900/40 rounded-2xl border border-amber-500/10 shadow-2xl p-8 md:p-12">
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-xs uppercase font-bold tracking-[0.25em] text-amber-400 mb-3"
          >
            Шёлковый Путь & Гостеприимство
          </motion.p>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-serif text-4xl md:text-6xl font-extrabold tracking-tight text-amber-100 mb-6"
          >
            {HOTEL_NAME}
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-stone-300 text-base md:text-lg leading-relaxed mb-8 max-w-xl mx-auto font-light"
          >
            Премиальный уют в самом сердце древнего {HOTEL_CITY}а. В нескольких шагах от мавзолея Ходжи Ахмеда Ясави.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <button 
              onClick={onBookClick} 
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-stone-950 font-semibold text-sm tracking-wide transition-all shadow-lg shadow-amber-500/20 active:scale-95 group"
            >
              <span>Выбрать номер</span>
              <ChevronRight size={18} className="group-hover:translate-x-0.5 transition-transform" />
            </button>
          </motion.div>
        </ArchFrame>
      </div>
    </section>
  );
}

/* =========================================================================
   ROOMS GRID (Сетка Номеров)
   ========================================================================= */

function RoomsGrid({ onSelectRoom, roomsAvailability }) {
  const [expandedCategory, setExpandedCategory] = useState('standard');
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [showDetails, setShowDetails] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const isRoomAvailable = (room) => {
    if (roomsAvailability && Object.prototype.hasOwnProperty.call(roomsAvailability, room.id)) {
      return roomsAvailability[room.id];
    }
    return room.isAvailable;
  };

  const toggleCategory = (categoryId) => {
    setExpandedCategory(expandedCategory === categoryId ? null : categoryId);
  };

  const handleRoomSelect = (room) => {
    setSelectedRoom(room);
    setShowDetails(true);
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
    <section id="rooms" className="py-20 px-6 bg-amber-50/50 relative">
      <div className="max-w-6xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <p className="text-xs uppercase font-bold tracking-[0.2em] text-amber-600 mb-2">Размещение</p>
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-stone-900">Номера и Апартаменты</h2>
        </div>

        <div className="space-y-6">
          {Object.values(ROOMS_DATA).map((category) => {
            const totalRooms = category.rooms.length;
            const availableRooms = category.rooms.filter((r) => isRoomAvailable(r)).length;
            const isExpanded = expandedCategory === category.id;

            const filteredRooms = category.rooms.filter(room => 
              room.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
              room.floor.toString().includes(searchQuery)
            );

            return (
              <div 
                key={category.id} 
                className="bg-white rounded-2xl border border-amber-900/10 shadow-xl shadow-stone-200/50 overflow-hidden transition-all duration-300"
              >
                <div 
                  className="p-6 md:p-8 flex flex-col md:flex-row md:items-center justify-between cursor-pointer hover:bg-amber-50/30 transition-colors gap-4"
                  onClick={() => toggleCategory(category.id)}
                >
                  <div className="flex items-center gap-5">
                    <span className="text-3xl p-3 bg-amber-100/50 rounded-xl">{category.icon}</span>
                    <div>
                      <h3 className="font-serif text-2xl font-bold text-stone-900">{category.title}</h3>
                      <p className="text-xs text-stone-500 font-medium mt-1">
                        Всего номеров: {totalRooms} • <span className="text-emerald-600 font-semibold">{availableRooms} свободно</span>
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between md:justify-end gap-6 border-t md:border-t-0 border-stone-100 pt-4 md:pt-0">
                    <div className="text-left md:text-right">
                      <span className="text-xs text-stone-400 font-medium block">Стоимость от</span>
                      <span className="text-xl font-bold text-amber-700">{formatTenge(category.rooms[0].price)}</span>
                      <span className="text-xs text-stone-500"> / ночь</span>
                    </div>
                    <div className={`p-2 rounded-full bg-stone-100 text-stone-600 transition-transform duration-300 ${isExpanded ? 'rotate-180 bg-amber-100 text-amber-800' : ''}`}>
                      <ChevronRight size={20} className="rotate-90" />
                    </div>
                  </div>
                </div>

                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="border-t border-stone-100 bg-stone-50/50 p-6 md:p-8"
                    >
                      <p className="text-stone-600 text-sm mb-6 max-w-3xl leading-relaxed">{category.description}</p>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-h-[500px] overflow-y-auto pr-2">
                        {filteredRooms.map((room) => {
                          const available = isRoomAvailable(room);
                          return (
                            <motion.div 
                              whileHover={{ y: -2 }}
                              key={room.id} 
                              onClick={() => available && handleRoomSelect(room)}
                              className={`p-5 rounded-xl border transition-all duration-200 flex flex-col justify-between ${
                                !available 
                                  ? 'bg-stone-100/60 border-stone-200 opacity-60 cursor-not-allowed' 
                                  : 'bg-white border-amber-900/10 hover:border-amber-500/50 hover:shadow-lg cursor-pointer'
                              }`}
                            >
                              <div>
                                <div className="flex items-center justify-between mb-3 pb-2 border-b border-stone-100">
                                  <span className="font-bold text-stone-800 text-base">{room.name}</span>
                                  <span className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-full ${
                                    available ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                                  }`}>
                                    {available ? 'Свободен' : 'Занят'}
                                  </span>
                                </div>

                                <div className="space-y-1.5 text-xs text-stone-600 mb-4">
                                  <div className="flex justify-between">
                                    <span className="text-stone-400">Этаж:</span>
                                    <span className="font-medium text-stone-700">{room.floor}</span>
                                  </div>
                                  <div className="flex justify-between">
                                    <span className="text-stone-400">Кровать:</span>
                                    <span className="font-medium text-stone-700 truncate max-w-[150px]">{room.bedType}</span>
                                  </div>
                                  <div className="flex justify-between">
                                    <span className="text-stone-400">Вместимость:</span>
                                    <span className="font-medium text-stone-700">до {room.capacity} гостей</span>
                                  </div>
                                </div>

                                <div className="flex flex-wrap gap-1.5 mb-4">
                                  {room.amenities.slice(0, 3).map((amenity, idx) => (
                                    <span key={idx} className="text-[10px] bg-amber-50 text-amber-800 font-medium px-2 py-0.5 rounded-md border border-amber-200/50">
                                      {amenity}
                                    </span>
                                  ))}
                                  {room.amenities.length > 3 && (
                                    <span className="text-[10px] bg-stone-100 text-stone-500 font-medium px-1.5 py-0.5 rounded-md">
                                      +{room.amenities.length - 3}
                                    </span>
                                  )}
                                </div>
                              </div>

                              {available && (
                                <button 
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleBooking(room);
                                  }}
                                  className="w-full py-2 rounded-lg bg-amber-600/10 hover:bg-amber-600 text-amber-800 hover:text-white text-xs font-semibold transition-colors duration-200"
                                >
                                  Забронировать
                                </button>
                              )}
                            </motion.div>
                          );
                        })}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>

      {/* Модальное окно деталей номера */}
      <AnimatePresence>
        {showDetails && selectedRoom && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-sm">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white w-full max-w-lg rounded-2xl p-6 md:p-8 shadow-2xl relative overflow-hidden"
            >
              <button 
                onClick={() => setShowDetails(false)}
                className="absolute top-4 right-4 p-2 text-stone-400 hover:text-stone-700 rounded-full hover:bg-stone-100 transition-colors"
              >
                <X size={20} />
              </button>

              <div className="flex items-baseline justify-between border-b border-stone-100 pb-4 mb-6">
                <h3 className="font-serif text-2xl font-bold text-stone-900">{selectedRoom.name}</h3>
                <span className="text-xl font-bold text-amber-600">{formatTenge(selectedRoom.price)} <span className="text-xs text-stone-400 font-normal">/ночь</span></span>
              </div>

              <div className="space-y-4 text-sm text-stone-600 mb-6">
                <div className="grid grid-cols-2 gap-4 bg-stone-50 p-4 rounded-xl">
                  <div>
                    <span className="text-stone-400 text-xs block">Этаж</span>
                    <span className="font-semibold text-stone-800">{selectedRoom.floor}</span>
                  </div>
                  <div>
                    <span className="text-stone-400 text-xs block">Площадь</span>
                    <span className="font-semibold text-stone-800">{selectedRoom.size}</span>
                  </div>
                  <div>
                    <span className="text-stone-400 text-xs block">Спальное место</span>
                    <span className="font-semibold text-stone-800">{selectedRoom.bedType}</span>
                  </div>
                  <div>
                    <span className="text-stone-400 text-xs block">Вид</span>
                    <span className="font-semibold text-stone-800">{selectedRoom.windows}</span>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-stone-800 mb-2">Удобства в номере:</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedRoom.amenities.map((item, idx) => (
                      <span key={idx} className="bg-amber-50 text-amber-900 text-xs font-medium px-3 py-1 rounded-lg border border-amber-200/60">
                        ✓ {item}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex gap-3">
                <button 
                  className="flex-1 py-3 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-semibold text-sm transition-colors shadow-md"
                  onClick={() => {
                    setShowDetails(false);
                    handleBooking(selectedRoom);
                  }}
                >
                  Забронировать
                </button>
                <button 
                  className="px-5 py-3 rounded-xl border border-stone-200 text-stone-600 hover:bg-stone-50 text-sm font-medium transition-colors"
                  onClick={() => setShowDetails(false)}
                >
                  Отмена
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}

/* =========================================================================
   BOOKING FORM SECTION
   ========================================================================= */

function BookingForm({ selectedRoom, onBookingSuccess }) {
  const [form, setForm] = useState({
    name: '',
    phone: '',
    category: selectedRoom?.category || 'standard',
    checkIn: '',
    checkOut: '',
  });
  const [status, setStatus] = useState('idle');
  const [errorMsg, setErrorMsg] = useState('');
  const [roomNumberOverridden, setRoomNumberOverridden] = useState(false);

  useEffect(() => {
    if (selectedRoom?.category) {
      setForm((f) => ({ ...f, category: selectedRoom.category }));
      setRoomNumberOverridden(false);
    }
  }, [selectedRoom]);

  const update = (key) => (e) => {
    if (key === 'category') setRoomNumberOverridden(true);
    setForm((f) => ({ ...f, [key]: e.target.value }));
  };

  const targetRoomNumber = !roomNumberOverridden ? selectedRoom?.roomNumber : null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');

    if (!form.name || !form.phone || !form.checkIn || !form.checkOut) {
      setErrorMsg('Пожалуйста, заполните все необходимые поля.');
      return;
    }
    if (new Date(form.checkOut) <= new Date(form.checkIn)) {
      setErrorMsg('Дата выезда должна быть позже даты заезда.');
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
      const bookedRoomNumber = result.data?.room_number || targetRoomNumber;
      if (bookedRoomNumber && onBookingSuccess) {
        onBookingSuccess(bookedRoomNumber);
      }
    } else {
      setStatus('error');
      setErrorMsg(
        result.status === 409
          ? (result.data?.error || 'Номер уже занят на выбытые даты.')
          : 'Ошибка отправки формы. Попробуйте еще раз.'
      );
    }
  };

  return (
    <section id="booking-form" className="py-20 px-6 bg-stone-900 text-stone-100 relative overflow-hidden">
      <PatternBackground />
      <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
        
        <div className="lg:col-span-7">
          <p className="text-xs uppercase font-bold tracking-[0.2em] text-amber-400 mb-2">Онлайн запись</p>
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-white mb-6">Забронировать проживание</h2>

          {status === 'success' ? (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-stone-800/80 border border-amber-500/30 rounded-2xl p-8 text-center space-y-4 backdrop-blur-sm"
            >
              <div className="w-16 h-16 bg-amber-500/20 text-amber-400 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 size={32} />
              </div>
              <h3 className="font-serif text-2xl font-bold text-white">Заявка принята!</h3>
              <p className="text-stone-300 text-sm max-w-md mx-auto">
                Наш менеджер свяжется с вами по номеру <span className="text-amber-400 font-semibold">{form.phone}</span> для подтверждения детали брони.
              </p>
              <button 
                onClick={() => setStatus('idle')}
                className="mt-4 px-6 py-2.5 rounded-full border border-amber-500/50 text-amber-300 hover:bg-amber-500 hover:text-stone-900 text-xs uppercase font-semibold transition-all"
              >
                Забронировать еще
              </button>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {errorMsg && (
                <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-3">
                  <AlertCircle size={18} className="shrink-0" />
                  <span>{errorMsg}</span>
                </div>
              )}

              {targetRoomNumber && (
                <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs flex items-center gap-2 font-medium">
                  <CheckCircle2 size={16} />
                  <span>Выбран конкретный номер: {targetRoomNumber}</span>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-medium text-stone-300 mb-1 block">Ваше имя</label>
                  <input 
                    type="text" 
                    value={form.name} 
                    onChange={update('name')} 
                    placeholder="Асель Нурланова" 
                    className="w-full px-4 py-3 rounded-xl bg-stone-800/80 border border-stone-700 text-white placeholder-stone-500 text-sm focus:outline-none focus:border-amber-500 transition-colors"
                  />
                </div>
                <div>
                  <label className="text-xs font-medium text-stone-300 mb-1 block">Номер телефона</label>
                  <input 
                    type="tel" 
                    value={form.phone} 
                    onChange={update('phone')} 
                    placeholder="+7 707 000 00 00" 
                    className="w-full px-4 py-3 rounded-xl bg-stone-800/80 border border-stone-700 text-white placeholder-stone-500 text-sm focus:outline-none focus:border-amber-500 transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-medium text-stone-300 mb-1 block">Категория размещения</label>
                <select 
                  value={form.category} 
                  onChange={update('category')}
                  className="w-full px-4 py-3 rounded-xl bg-stone-800/80 border border-stone-700 text-white text-sm focus:outline-none focus:border-amber-500 transition-colors"
                >
                  <option value="standard">Стандарт — 20 000 ₸ / ночь</option>
                  <option value="deluxe">Делюкс — 30 000 ₸ / ночь</option>
                  <option value="family">Семейный — 35 000 ₸ / ночь</option>
                </select>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-medium text-stone-300 mb-1 block">Дата заезда</label>
                  <input 
                    type="date" 
                    value={form.checkIn} 
                    onChange={update('checkIn')} 
                    className="w-full px-4 py-3 rounded-xl bg-stone-800/80 border border-stone-700 text-white text-sm focus:outline-none focus:border-amber-500 transition-colors"
                  />
                </div>
                <div>
                  <label className="text-xs font-medium text-stone-300 mb-1 block">Дата выезда</label>
                  <input 
                    type="date" 
                    value={form.checkOut} 
                    onChange={update('checkOut')} 
                    className="w-full px-4 py-3 rounded-xl bg-stone-800/80 border border-stone-700 text-white text-sm focus:outline-none focus:border-amber-500 transition-colors"
                  />
                </div>
              </div>

              <button 
                type="submit" 
                disabled={status === 'loading'}
                className="w-full py-4 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-stone-950 font-bold text-sm tracking-wide transition-all shadow-lg shadow-amber-500/20 active:scale-98 flex items-center justify-center gap-2 mt-4"
              >
                {status === 'loading' ? (
                  <>
                    <Loader2 size={18} className="animate-spin" />
                    <span>Отправка бронирования...</span>
                  </>
                ) : (
                  <span>Забронировать номер</span>
                )}
              </button>
            </form>
          )}
        </div>

        <div className="lg:col-span-5 hidden lg:block">
          <ArchFrame className="bg-stone-800/40 border border-amber-500/20 rounded-2xl p-8 backdrop-blur-sm text-stone-300">
            <h3 className="font-serif text-2xl font-bold text-amber-200 mb-4">{HOTEL_NAME}</h3>
            <p className="text-sm leading-relaxed mb-6">
              Мы обеспечим вам истинный южный комфорт и безупречный сервис во время вашего пребывания в {HOTEL_CITY}е.
            </p>
            <div className="space-y-3 text-xs text-stone-400">
              <div className="flex items-center gap-3">
                <Clock size={16} className="text-amber-400 shrink-0" />
                <span>Заезд с 14:00, Выезд до 12:00</span>
              </div>
              <div className="flex items-center gap-3">
                <Wifi size={16} className="text-amber-400 shrink-0" />
                <span>Высокоскоростной Wi-Fi на всей территории</span>
              </div>
            </div>
          </ArchFrame>
        </div>

      </div>
    </section>
  );
}

/* =========================================================================
   WHATSAPP & FOOTER
   ========================================================================= */

function WhatsAppWidget() {
  const message = encodeURIComponent('Здравствуйте! Поводу бронирования в Grand Villa...');
  const href = `https://wa.me/${WHATSAPP_NUMBER}?text=${message}`;
  return (
    <a 
      href={href} 
      target="_blank" 
      rel="noopener noreferrer" 
      className="fixed bottom-6 right-6 z-40 flex items-center gap-2 px-4 py-3 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white shadow-xl shadow-emerald-950/20 transition-all duration-200 hover:scale-105"
    >
      <MessageCircle size={20} />
      <span className="text-xs font-semibold hidden sm:inline">Связаться в WhatsApp</span>
    </a>
  );
}

function Footer() {
  return (
    <footer id="footer" className="bg-stone-950 text-stone-400 py-12 px-6 border-t border-stone-800">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-center pb-8 border-b border-stone-800/60">
        <div>
          <span className="font-serif font-bold text-2xl text-amber-100 uppercase block">{HOTEL_NAME}</span>
          <p className="text-xs text-stone-500 mt-1">Комфорт и традиции гостеприимства в {HOTEL_CITY}е</p>
        </div>
        <div className="flex flex-col md:items-end gap-2 text-xs">
          <p className="flex items-center gap-2"><MapPin size={14} className="text-amber-500" /> ул. Б.Саттарханова 55, {HOTEL_CITY}</p>
          <p className="flex items-center gap-2"><Phone size={14} className="text-amber-500" /> +7 707 454 16 96</p>
        </div>
      </div>
      <div className="max-w-6xl mx-auto pt-6 text-center md:text-left text-[11px] text-stone-600">
        © {new Date().getFullYear()} {HOTEL_NAME}. Все права защищены.
      </div>
    </footer>
  );
}

/* =========================================================================
   QR ROOM SERVICE SCENARIO (QR-Сервис Номера)
   ========================================================================= */

function RoomScreen({ roomNumber, onExit }) {
  const [activeService, setActiveService] = useState(null);
  const [toast, setToast] = useState(null);

  return (
    <div className="min-h-screen bg-stone-900 text-stone-100 relative pb-12">
      <PatternBackground />
      
      {/* Topbar */}
      <div className="p-4 border-b border-stone-800 bg-stone-950/80 backdrop-blur-md flex items-center justify-between sticky top-0 z-30">
        <button onClick={onExit} className="flex items-center gap-2 text-xs text-stone-400 hover:text-amber-400 font-medium">
          <ArrowLeft size={16} />
          <span>На главный сайт</span>
        </button>
        <span className="px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 font-bold text-xs">
          Номер {roomNumber}
        </span>
      </div>

      <div className="max-w-xl mx-auto px-6 pt-8 space-y-8 relative z-10">
        <ArchFrame className="bg-stone-800/40 border border-amber-500/20 rounded-2xl p-6 backdrop-blur-sm text-center">
          <h1 className="font-serif text-2xl font-bold text-amber-200">Рум-сервис {HOTEL_NAME}</h1>
          <p className="text-xs text-stone-400 mt-2">Выберите необходимую услугу, и мы доставим её в номер {roomNumber}.</p>
        </ArchFrame>

        {/* Grid услуг */}
        <div className="grid grid-cols-2 gap-3">
          {SERVICES.map((s) => {
            const Icon = s.icon;
            return (
              <button
                key={s.id}
                onClick={() => setActiveService(s)}
                className="p-4 rounded-xl bg-stone-800/60 border border-stone-700/60 hover:border-amber-500/50 hover:bg-stone-800 text-left transition-all flex flex-col justify-between h-28 group"
              >
                <Icon className="w-6 h-6 text-amber-400 group-hover:scale-110 transition-transform" />
                <span className="text-xs font-semibold text-stone-200">{s.label}</span>
              </button>
            );
          })}
        </div>

        {/* Инфо Панель */}
        <div className="space-y-4">
          <h3 className="font-serif text-lg font-bold text-amber-200 border-b border-stone-800 pb-2">Информация для гостя</h3>
          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="p-3 bg-stone-800/40 rounded-xl border border-stone-800">
              <Wifi size={16} className="text-amber-400 mb-1" />
              <span className="text-stone-400 block text-[10px]">Wi-Fi Пароль</span>
              <span className="font-semibold text-stone-200">{WIFI_PASSWORD}</span>
            </div>
            <div className="p-3 bg-stone-800/40 rounded-xl border border-stone-800">
              <Clock size={16} className="text-amber-400 mb-1" />
              <span className="text-stone-400 block text-[10px]">Время завтрака</span>
              <span className="font-semibold text-stone-200">{BREAKFAST_TIME}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Модалки Услуг */}
      <AnimatePresence>
        {activeService && activeService.type === 'еда' ? (
          <FoodModal 
            roomNumber={roomNumber} 
            onClose={() => setActiveService(null)} 
            onDone={(t) => { setActiveService(null); setToast(t); }} 
          />
        ) : activeService ? (
          <ConfirmModal 
            service={activeService} 
            roomNumber={roomNumber} 
            onClose={() => setActiveService(null)} 
            onDone={(t) => { setActiveService(null); setToast(t); }} 
          />
        ) : null}
      </AnimatePresence>

      <Toast toast={toast} onClose={() => setToast(null)} />
    </div>
  );
}

function ConfirmModal({ service, roomNumber, onClose, onDone }) {
  const [comment, setComment] = useState('');
  const [status, setStatus] = useState('idle');

  const handleConfirm = async () => {
    setStatus('loading');
    const result = await apiPost('/api/orders', {
      room_number: roomNumber,
      service_type: service.type,
      details: comment,
    });
    if (result.ok) {
      onDone({ type: 'success', message: 'Запрос принят администратором!' });
    } else {
      setStatus('error');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/80 backdrop-blur-sm">
      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="bg-stone-900 border border-stone-800 w-full max-w-sm rounded-2xl p-6 text-stone-100 relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-stone-500 hover:text-white"><X size={18} /></button>
        <h3 className="font-serif text-xl font-bold mb-4">{service.label}</h3>
        <textarea 
          rows={3} 
          value={comment} 
          onChange={(e) => setComment(e.target.value)} 
          placeholder="Уточнения к запросу..." 
          className="w-full p-3 rounded-xl bg-stone-800 border border-stone-700 text-xs text-white placeholder-stone-500 focus:outline-none focus:border-amber-500 mb-4"
        />
        <button 
          onClick={handleConfirm} 
          disabled={status === 'loading'}
          className="w-full py-3 rounded-xl bg-amber-500 hover:bg-amber-600 text-stone-950 font-bold text-xs uppercase tracking-wider transition-colors"
        >
          {status === 'loading' ? 'Отправка...' : 'Подтвердить'}
        </button>
      </motion.div>
    </div>
  );
}

function FoodModal({ roomNumber, onClose, onDone }) {
  const [cart, setCart] = useState({});
  const [status, setStatus] = useState('idle');

  const changeQty = (id, delta) => {
    setCart(prev => {
      const current = prev[id] || 0;
      const updated = Math.max(0, current + delta);
      if (updated === 0) {
        const copy = { ...prev };
        delete copy[id];
        return copy;
      }
      return { ...prev, [id]: updated };
    });
  };

  const total = Object.entries(cart).reduce((sum, [id, qty]) => {
    const item = FOOD_MENU.find(f => f.id === id);
    return sum + (item ? item.price * qty : 0);
  }, 0);

  const handleOrder = async () => {
    if (total === 0) return;
    setStatus('loading');
    const details = Object.entries(cart).map(([id, qty]) => {
      const item = FOOD_MENU.find(f => f.id === id);
      return `${item.name} x${qty}`;
    }).join(', ');

    const result = await apiPost('/api/orders', {
      room_number: roomNumber,
      service_type: 'еда',
      details,
    });

    if (result.ok) {
      onDone({ type: 'success', message: 'Заказ успешно передан на кухню!' });
    } else {
      setStatus('error');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/80 backdrop-blur-sm">
      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="bg-stone-900 border border-stone-800 w-full max-w-md rounded-2xl p-6 text-stone-100 relative max-h-[85vh] flex flex-col">
        <button onClick={onClose} className="absolute top-4 right-4 text-stone-500 hover:text-white"><X size={18} /></button>
        <h3 className="font-serif text-xl font-bold mb-4">Меню кухни</h3>
        
        <div className="overflow-y-auto space-y-3 flex-1 pr-1 mb-4">
          {FOOD_MENU.map(item => (
            <div key={item.id} className="p-3 bg-stone-800/40 border border-stone-800 rounded-xl flex items-center justify-between text-xs">
              <div>
                <span className="font-semibold block">{item.name}</span>
                <span className="text-amber-400 font-medium">{formatTenge(item.price)}</span>
              </div>
              <div className="flex items-center gap-2 bg-stone-800 rounded-lg p-1 border border-stone-700">
                <button onClick={() => changeQty(item.id, -1)} className="p-1 hover:text-amber-400"><Minus size={12} /></button>
                <span className="w-4 text-center font-bold">{cart[item.id] || 0}</span>
                <button onClick={() => changeQty(item.id, 1)} className="p-1 hover:text-amber-400"><Plus size={12} /></button>
              </div>
            </div>
          ))}
        </div>

        <div className="pt-4 border-t border-stone-800 flex items-center justify-between">
          <div>
            <span className="text-[10px] text-stone-400 block">Итого к оплате</span>
            <span className="text-lg font-bold text-amber-400">{formatTenge(total)}</span>
          </div>
          <button 
            disabled={total === 0 || status === 'loading'}
            onClick={handleOrder}
            className="px-6 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 disabled:opacity-40 text-stone-950 font-bold text-xs uppercase transition-colors"
          >
            {status === 'loading' ? 'Оформляем...' : 'Заказать'}
          </button>
        </div>
      </motion.div>
    </div>
  );
}

/* =========================================================================
   РОУТИНГ И ВХОДНАЯ ТОЧКА
   ========================================================================= */

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
    <div className="font-sans antialiased text-stone-800 bg-amber-50/20 selection:bg-amber-500 selection:text-white">
      {route.mode === 'room' ? (
        <RoomScreen roomNumber={route.roomNumber} onExit={() => window.history.pushState({}, '', '/')} />
      ) : (
        <main>
          <Header onBookClick={() => handleSelectRoom({ category: selectedRoom?.category || 'standard', roomNumber: null })} />
          <Hero onBookClick={() => handleSelectRoom({ category: selectedRoom?.category || 'standard', roomNumber: null })} />
          <RoomsGrid onSelectRoom={handleSelectRoom} roomsAvailability={roomsAvailability} />
          <BookingForm selectedRoom={selectedRoom} onBookingSuccess={(num) => {
            setRoomsAvailability(prev => ({ ...prev, [num]: false }));
            loadAvailability();
          }} />
          <Footer />
          <WhatsAppWidget />
        </main>
      )}
    </div>
  );
}