import React, { useState, useEffect, useRef } from 'react';
import {
  Menu, X, Phone, MapPin, ChevronRight, ArrowLeft, Loader2, AlertCircle,
  CheckCircle2, MessageCircle, Star, Wifi, Clock, Ban, ShieldAlert, BedDouble,
  Sparkles, Shirt, Bath, GlassWater, UtensilsCrossed, Plus, Minus
} from 'lucide-react';

/* =========================================================================
   КОНФИГУРАЦИЯ И ДАННЫЕ
   ========================================================================= */

const WHATSAPP_NUMBER = '77001234567'; // TODO: заменить на реальный номер Алии
const HOTEL_NAME = 'Гранд Вилла';
const HOTEL_CITY = 'Туркестан';

const ROOMS_DATA = {
  standard: {
    id: 'standard',
    title: 'Стандарт',
    description: 'Уютные номера с классическим дизайном. Идеальный выбор для деловых поездок и комфортного отдыха в Туркестане.',
    icon: '🛏️',
    rooms: [
      // 1 этаж
      { id: '101', name: 'Номер 101', floor: 1, bedType: 'Две раздельные кровати (90x200)', capacity: 2, size: '22 м²', view: 'Внутренний двор', amenities: ['Wi-Fi', 'Кондиционер', 'Телевизор', 'Холодильник', 'Душ'], price: 20000, isAvailable: true, windows: 'Окно выходит во двор', features: ['Тихий номер', 'Раздельные кровати'] },
      { id: '102', name: 'Номер 102', floor: 1, bedType: 'Две раздельные кровати (90x200)', capacity: 2, size: '22 м²', view: 'Внутренний двор', amenities: ['Wi-Fi', 'Кондиционер', 'Телевизор', 'Холодильник', 'Душ'], price: 20000, isAvailable: true, windows: 'Окно выходит во двор', features: ['Тихий номер', 'Раздельные кровати'] },
      { id: '103', name: 'Номер 103', floor: 1, bedType: 'Две раздельные кровати (90x200)', capacity: 2, size: '22 м²', view: 'Внутренний двор', amenities: ['Wi-Fi', 'Кондиционер', 'Телевизор', 'Холодильник', 'Душ'], price: 20000, isAvailable: true, windows: 'Окно выходит во двор', features: ['Тихий номер', 'Раздельные кровати'] },
      { id: '104', name: 'Номер 104', floor: 1, bedType: 'Две раздельные кровати (90x200)', capacity: 2, size: '22 м²', view: 'Улица Яссауи', amenities: ['Wi-Fi', 'Кондиционер', 'Телевизор', 'Холодильник', 'Душ'], price: 20000, isAvailable: true, windows: 'Окно выходит на улицу', features: ['Раздельные кровати'] },
      { id: '105', name: 'Номер 105', floor: 1, bedType: 'Две раздельные кровати (90x200)', capacity: 2, size: '22 м²', view: 'Внутренний двор', amenities: ['Wi-Fi', 'Кондиционер', 'Телевизор', 'Холодильник', 'Душ'], price: 20000, isAvailable: true, windows: 'Окно выходит во двор', features: ['Раздельные кровати'] },
      { id: '106', name: 'Номер 106', floor: 1, bedType: 'Две раздельные кровати (90x200)', capacity: 2, size: '22 м²', view: 'Внутренний двор', amenities: ['Wi-Fi', 'Кондиционер', 'Телевизор', 'Холодильник', 'Душ'], price: 20000, isAvailable: true, windows: 'Окно выходит во двор', features: ['Раздельные кровати'] },
      { id: '107', name: 'Номер 107', floor: 1, bedType: 'Двуспальная кровать (180x200)', capacity: 2, size: '22 м²', view: 'Внутренний двор', amenities: ['Wi-Fi', 'Кондиционер', 'Телевизор', 'Холодильник', 'Душ'], price: 20000, isAvailable: true, windows: 'Окно выходит во двор', features: ['Двуспальная кровать'] },
      { id: '108', name: 'Номер 108', floor: 1, bedType: 'Две раздельные кровати (90x200)', capacity: 2, size: '22 м²', view: 'Внутренний двор', amenities: ['Wi-Fi', 'Кондиционер', 'Телевизор', 'Холодильник', 'Душ'], price: 20000, isAvailable: true, windows: 'Окно выходит во двор', features: ['Раздельные кровати'] },
      // 2 этаж
      { id: '203', name: 'Номер 203', floor: 2, bedType: 'Двуспальная кровать (180x200)', capacity: 2, size: '22 м²', view: 'Внутренний двор', amenities: ['Wi-Fi', 'Кондиционер', 'Телевизор', 'Холодильник', 'Душ'], price: 20000, isAvailable: true, windows: 'Окно выходит во двор', features: ['Двуспальная кровать'] },
      { id: '204', name: 'Номер 204', floor: 2, bedType: 'Двуспальная кровать (180x200)', capacity: 2, size: '22 м²', view: 'Улица Яссауи', amenities: ['Wi-Fi', 'Кондиционер', 'Телевизор', 'Холодильник', 'Душ'], price: 20000, isAvailable: true, windows: 'Окно выходит на улицу', features: ['Двуспальная кровать'] },
      { id: '205', name: 'Номер 205', floor: 2, bedType: 'Двуспальная кровать (180x200)', capacity: 2, size: '22 м²', view: 'Внутренний двор', amenities: ['Wi-Fi', 'Кондиционер', 'Телевизор', 'Холодильник', 'Душ'], price: 20000, isAvailable: true, windows: 'Окно выходит во двор', features: ['Двуспальная кровать'] },
      { id: '206', name: 'Номер 206', floor: 2, bedType: 'Двуспальная кровать (180x200)', capacity: 2, size: '22 м²', view: 'Внутренний двор', amenities: ['Wi-Fi', 'Кондиционер', 'Телевизор', 'Холодильник', 'Душ'], price: 20000, isAvailable: true, windows: 'Окно выходит во двор', features: ['Двуспальная кровать'] },
      { id: '208', name: 'Номер 208', floor: 2, bedType: 'Двуспальная кровать (180x200)', capacity: 2, size: '22 м²', view: 'Внутренний двор', amenities: ['Wi-Fi', 'Кондиционер', 'Телевизор', 'Холодильник', 'Душ'], price: 20000, isAvailable: true, windows: 'Окно выходит во двор', features: ['Двуспальная кровать'] },
      { id: '210', name: 'Номер 210', floor: 2, bedType: 'Двуспальная кровать (180x200)', capacity: 2, size: '22 м²', view: 'Внутренний двор', amenities: ['Wi-Fi', 'Кондиционер', 'Телевизор', 'Холодильник', 'Душ'], price: 20000, isAvailable: true, windows: 'Окно выходит во двор', features: ['Двуспальная кровать'] },
      // 3 этаж
      { id: '303', name: 'Номер 303', floor: 3, bedType: 'Двуспальная кровать (180x200)', capacity: 2, size: '22 м²', view: 'Внутренний двор', amenities: ['Wi-Fi', 'Кондиционер', 'Телевизор', 'Холодильник', 'Душ'], price: 20000, isAvailable: true, windows: 'Окно выходит во двор', features: ['Двуспальная кровать'] },
      { id: '304', name: 'Номер 304', floor: 3, bedType: 'Двуспальная кровать (180x200)', capacity: 2, size: '22 м²', view: 'Улица Яссауи', amenities: ['Wi-Fi', 'Кондиционер', 'Телевизор', 'Холодильник', 'Душ'], price: 20000, isAvailable: true, windows: 'Окно выходит на улицу', features: ['Двуспальная кровать'] },
      { id: '305', name: 'Номер 305', floor: 3, bedType: 'Двуспальная кровать (180x200)', capacity: 2, size: '22 м²', view: 'Внутренний двор', amenities: ['Wi-Fi', 'Кондиционер', 'Телевизор', 'Холодильник', 'Душ'], price: 20000, isAvailable: true, windows: 'Окно выходит во двор', features: ['Двуспальная кровать'] },
      { id: '306', name: 'Номер 306', floor: 3, bedType: 'Двуспальная кровать (180x200)', capacity: 2, size: '22 м²', view: 'Внутренний двор', amenities: ['Wi-Fi', 'Кондиционер', 'Телевизор', 'Холодильник', 'Душ'], price: 20000, isAvailable: true, windows: 'Окно выходит во двор', features: ['Двуспальная кровать'] },
      { id: '309', name: 'Номер 309', floor: 3, bedType: 'Двуспальная кровать (180x200)', capacity: 2, size: '22 м²', view: 'Внутренний двор', amenities: ['Wi-Fi', 'Кондиционер', 'Телевизор', 'Холодильник', 'Душ'], price: 20000, isAvailable: true, windows: 'Окно выходит во двор', features: ['Двуспальная кровать'] },
      { id: '311', name: 'Номер 311', floor: 3, bedType: 'Двуспальная кровать (180x200)', capacity: 2, size: '22 м²', view: 'Внутренний двор', amenities: ['Wi-Fi', 'Кондиционер', 'Телевизор', 'Холодильник', 'Душ'], price: 20000, isAvailable: true, windows: 'Окно выходит во двор', features: ['Двуспальная кровать'] },
      // 4 этаж
      { id: '403', name: 'Номер 403', floor: 4, bedType: 'Двуспальная кровать (180x200)', capacity: 2, size: '22 м²', view: 'Внутренний двор', amenities: ['Wi-Fi', 'Кондиционер', 'Телевизор', 'Холодильник', 'Душ'], price: 20000, isAvailable: true, windows: 'Окно выходит во двор', features: ['Двуспальная кровать'] },
      { id: '404', name: 'Номер 404', floor: 4, bedType: 'Двуспальная кровать (180x200)', capacity: 2, size: '22 м²', view: 'Улица Яссауи', amenities: ['Wi-Fi', 'Кондиционер', 'Телевизор', 'Холодильник', 'Душ'], price: 20000, isAvailable: true, windows: 'Окно выходит на улицу', features: ['Двуспальная кровать'] },
      { id: '405', name: 'Номер 405', floor: 4, bedType: 'Двуспальная кровать (180x200)', capacity: 2, size: '22 м²', view: 'Внутренний двор', amenities: ['Wi-Fi', 'Кондиционер', 'Телевизор', 'Холодильник', 'Душ'], price: 20000, isAvailable: true, windows: 'Окно выходит во двор', features: ['Двуспальная кровать'] },
      { id: '406', name: 'Номер 406', floor: 4, bedType: 'Двуспальная кровать (180x200)', capacity: 2, size: '22 м²', view: 'Внутренний двор', amenities: ['Wi-Fi', 'Кондиционер', 'Телевизор', 'Холодильник', 'Душ'], price: 20000, isAvailable: true, windows: 'Окно выходит во двор', features: ['Двуспальная кровать'] },
      { id: '408', name: 'Номер 408', floor: 4, bedType: 'Двуспальная кровать (180x200)', capacity: 2, size: '22 м²', view: 'Внутренний двор', amenities: ['Wi-Fi', 'Кондиционер', 'Телевизор', 'Холодильник', 'Душ'], price: 20000, isAvailable: true, windows: 'Окно выходит во двор', features: ['Двуспальная кровать'] },
      { id: '410', name: 'Номер 410', floor: 4, bedType: 'Двуспальная кровать (180x200)', capacity: 2, size: '22 м²', view: 'Внутренний двор', amenities: ['Wi-Fi', 'Кондиционер', 'Телевизор', 'Холодильник', 'Душ'], price: 20000, isAvailable: true, windows: 'Окно выходит во двор', features: ['Двуспальная кровать'] }
    ]
  },
  deluxe: {
    id: 'deluxe',
    title: 'Делюкс',
    description: 'Просторные номера повышенной комфортности. Отличный выбор для романтического отдыха и деловых поездок с повышенным комфортом.',
    icon: '✨',
    rooms: [
      { id: '202', name: 'Номер 202', floor: 2, bedType: 'Двуспальная кровать (180x200) + диван', capacity: 3, size: '32 м²', view: 'Мавзолей Ходжи Ахмеда Ясави', amenities: ['Wi-Fi', 'Кондиционер', 'Телевизор', 'Мини-бар', 'Душ', 'Балкон'], price: 30000, isAvailable: true, windows: 'Панорамный вид', features: ['Вид на мавзолей', 'Балкон'] },
      { id: '211', name: 'Номер 211', floor: 2, bedType: 'Двуспальная кровать (180x200)', capacity: 2, size: '30 м²', view: 'Городской пейзаж', amenities: ['Wi-Fi', 'Кондиционер', 'Телевизор', 'Мини-бар', 'Ванна', 'Балкон'], price: 30000, isAvailable: true, windows: 'Два окна', features: ['Ванна', 'Балкон'] },
      { id: '302', name: 'Номер 302', floor: 3, bedType: 'Двуспальная кровать (180x200) + диван', capacity: 3, size: '32 м²', view: 'Мавзолей Ходжи Ахмеда Ясави', amenities: ['Wi-Fi', 'Кондиционер', 'Телевизор', 'Мини-бар', 'Душ', 'Балкон'], price: 30000, isAvailable: true, windows: 'Панорамный вид', features: ['Вид на мавзолей', 'Балкон'] },
      { id: '307', name: 'Номер 307', floor: 3, bedType: 'Двуспальная кровать (180x200)', capacity: 2, size: '30 м²', view: 'Городской пейзаж', amenities: ['Wi-Fi', 'Кондиционер', 'Телевизор', 'Мини-бар', 'Ванна', 'Балкон'], price: 30000, isAvailable: true, windows: 'Два окна', features: ['Ванна'] },
      { id: '402', name: 'Номер 402', floor: 4, bedType: 'Двуспальная кровать (180x200) + диван', capacity: 3, size: '32 м²', view: 'Мавзолей Ходжи Ахмеда Ясави', amenities: ['Wi-Fi', 'Кондиционер', 'Телевизор', 'Мини-бар', 'Душ', 'Балкон'], price: 30000, isAvailable: true, windows: 'Панорамный вид', features: ['Вид на мавзолей'] },
      { id: '411', name: 'Номер 411', floor: 4, bedType: 'Двуспальная кровать (180x200)', capacity: 2, size: '30 м²', view: 'Городской пейзаж', amenities: ['Wi-Fi', 'Кондиционер', 'Телевизор', 'Мини-бар', 'Ванна'], price: 30000, isAvailable: true, windows: 'Два окна', features: ['Джакузи'] }
    ]
  },
  family: {
    id: 'family',
    title: 'Семейный',
    description: 'Просторные двухкомнатные номера для комфортного проживания всей семьёй. Есть всё для качественного отдыха с детьми.',
    icon: '👨‍👩‍👧‍👦',
    rooms: [
      { id: '201', name: 'Номер 201', floor: 2, bedType: 'Двуспальная кровать (180x200) + 2 односпальные', capacity: 4, size: '45 м²', view: 'Мавзолей Ходжи Ахмеда Ясави', amenities: ['Wi-Fi', 'Кондиционер', 'Телевизор', 'Мини-бар', 'Ванна', 'Балкон', 'Детская кроватка'], price: 35000, isAvailable: true, windows: 'Панорамный вид', features: ['Две комнаты', 'Вид на мавзолей', 'Детская кроватка'] },
      { id: '207', name: 'Номер 207', floor: 2, bedType: 'Двуспальная кровать (180x200) + диван-кровать', capacity: 4, size: '42 м²', view: 'Внутренний двор', amenities: ['Wi-Fi', 'Кондиционер', 'Телевизор', 'Мини-бар', 'Душ', 'Балкон'], price: 35000, isAvailable: true, windows: 'Окно выходит во двор', features: ['Две комнаты', 'Детская кроватка'] },
      { id: '209', name: 'Номер 209', floor: 2, bedType: 'Двуспальная кровать (180x200) + 2 односпальные', capacity: 4, size: '45 м²', view: 'Мавзолей Ходжи Ахмеда Ясави', amenities: ['Wi-Fi', 'Кондиционер', 'Телевизор', 'Мини-бар', 'Ванна', 'Балкон'], price: 35000, isAvailable: true, windows: 'Панорамный вид', features: ['Две комнаты', 'Вид на мавзолей'] },
      { id: '301', name: 'Номер 301', floor: 3, bedType: 'Двуспальная кровать (180x200) + 2 односпальные', capacity: 4, size: '45 м²', view: 'Мавзолей Ходжи Ахмеда Ясави', amenities: ['Wi-Fi', 'Кондиционер', 'Телевизор', 'Мини-бар', 'Ванна', 'Балкон', 'Детская кроватка'], price: 35000, isAvailable: true, windows: 'Панорамный вид', features: ['Две комнаты', 'Вид на мавзолей', 'Детская кроватка'] },
      { id: '308', name: 'Номер 308', floor: 3, bedType: 'Двуспальная кровать (180x200) + диван-кровать', capacity: 4, size: '42 м²', view: 'Городской пейзаж', amenities: ['Wi-Fi', 'Кондиционер', 'Телевизор', 'Мини-бар', 'Душ', 'Балкон'], price: 35000, isAvailable: true, windows: 'Два окна', features: ['Две комнаты', 'Балкон', 'Детская кроватка'] },
      { id: '310', name: 'Номер 310', floor: 3, bedType: 'Двуспальная кровать (180x200) + 2 односпальные', capacity: 4, size: '45 м²', view: 'Внутренний двор', amenities: ['Wi-Fi', 'Кондиционер', 'Телевизор', 'Мини-бар', 'Ванна', 'Балкон'], price: 35000, isAvailable: true, windows: 'Два окна', features: ['Две комнаты', 'Тихий номер'] },
      { id: '401', name: 'Номер 401', floor: 4, bedType: 'Двуспальная кровать (180x200) + 2 односпальные', capacity: 4, size: '45 м²', view: 'Мавзолей Ходжи Ахмеда Ясави', amenities: ['Wi-Fi', 'Кондиционер', 'Телевизор', 'Мини-бар', 'Ванна', 'Балкон', 'Детская кроватка'], price: 35000, isAvailable: true, windows: 'Панорамный вид', features: ['Две комнаты', 'Вид на мавзолей', 'Детская кроватка'] },
      { id: '407', name: 'Номер 407', floor: 4, bedType: 'Двуспальная кровать (180x200) + диван-кровать', capacity: 4, size: '42 м²', view: 'Городской пейзаж', amenities: ['Wi-Fi', 'Кондиционер', 'Телевизор', 'Мини-бар', 'Душ', 'Балкон'], price: 35000, isAvailable: true, windows: 'Два окна', features: ['Две комнаты', 'Балкон', 'Детская кроватка'] },
      { id: '409', name: 'Номер 409', floor: 4, bedType: 'Двуспальная кровать (180x200) + 2 односпальные', capacity: 4, size: '45 м²', view: 'Внутренний двор', amenities: ['Wi-Fi', 'Кондиционер', 'Телевизор', 'Мини-бар', 'Ванна', 'Балкон'], price: 35000, isAvailable: true, windows: 'Два окна', features: ['Две комнаты', 'Тихий номер'] }
    ]
  }
};

/* Информация для гостей номеров (QR-раздел) */
const WIFI_PASSWORD = '12345678';
const BREAKFAST_TIME = '08:00–10:00, ежедневно';

const HOUSE_RULES = [
  'Курение в номерах строго запрещено — при обнаружении взимается штраф.',
  'Пожалуйста, бережно относитесь к имуществу отеля.',
  'При выезде убедитесь, что ключ от номера возвращён на ресепшен.',
];

const PENALTIES = [
  { title: 'Утеря ключа от номера', amount: 5000 },
  { title: 'Пятна, порезы и повреждения мебели/текстиля, которые не удаётся устранить', amount: 5000 },
  { title: 'Иной ущерб имуществу номера', note: 'штраф — по факту оценки стоимости ремонта' },
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
  { id: 'f4', name: 'Шашлык из баранины', price: 4200 },
  { id: 'f5', name: 'Лагман', price: 2500 },
  { id: 'f6', name: 'Чай / кофе', price: 800 },
  { id: 'f7', name: 'Вода 0.5л', price: 500 },
];

/* =========================================================================
   API-УТИЛИТА
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
    try {
      data = await res.json();
    } catch (_) {}
    if (!res.ok) {
      return { ok: false, status: res.status, data };
    }
    return { ok: true, status: res.status, data };
  } catch (err) {
    return { ok: false, status: 0, data: null, networkError: true };
  }
}

async function apiGet(url) {
  try {
    const res = await fetch(`${BACKEND_BASE_URL}${url}`);
    let data = null;
    try {
      data = await res.json();
    } catch (_) {}
    if (!res.ok) {
      return { ok: false, status: res.status, data };
    }
    return { ok: true, status: res.status, data };
  } catch (err) {
    return { ok: false, status: 0, data: null, networkError: true };
  }
}

function formatTenge(value) {
  return `${value.toLocaleString('ru-RU')} ₸`;
}

/* =========================================================================
   ФИРМЕННЫЙ ВИЗУАЛЬНЫЙ МОТИВ — арка-портал (иван) и звёздчатый узор
   ========================================================================= */

function ArchFrame({ className = '', strokeClass = 'gv-stroke-gold', children }) {
  return (
    <div className={`gv-arch-wrap ${className}`}>
      <svg viewBox="0 0 300 300" className="gv-arch-svg" preserveAspectRatio="none" aria-hidden="true">
        <path
          d="M14,296 L14,150 Q14,14 150,14 Q286,14 286,150 L286,296"
          fill="none"
          className={strokeClass}
          strokeWidth="2.5"
        />
        <path
          d="M34,296 L34,152 Q34,34 150,34 Q266,34 266,152 L266,296"
          fill="none"
          className={strokeClass}
          strokeWidth="1"
          opacity="0.5"
        />
      </svg>
      <div className="gv-arch-content">{children}</div>
    </div>
  );
}

function StarPatternBg({ className = '' }) {
  return (
    <svg className={`gv-star-bg ${className}`} aria-hidden="true">
      <defs>
        <pattern id="gv-star-pattern" width="40" height="40" patternUnits="userSpaceOnUse">
          <g transform="translate(20,20)">
            <rect width="14" height="14" x="-7" y="-7" transform="rotate(45)" fill="none" stroke="currentColor" strokeWidth="0.75" />
            <rect width="14" height="14" x="-7" y="-7" fill="none" stroke="currentColor" strokeWidth="0.75" />
          </g>
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#gv-star-pattern)" />
    </svg>
  );
}

/* =========================================================================
   ОБЩИЕ UI-ЭЛЕМЕНТЫ
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
    <div className={`gv-toast ${isError ? 'gv-toast-error' : 'gv-toast-success'}`} role="status">
      {isError ? <AlertCircle size={20} /> : <CheckCircle2 size={20} />}
      <span>{toast.message}</span>
    </div>
  );
}

/* =========================================================================
   СЦЕНАРИЙ 1 — ЛЕНДИНГ И БРОНИРОВАНИЕ
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
            <a key={l.href} href={l.href} className="gv-nav-link">
              {l.label}
            </a>
          ))}
          <button onClick={onBookClick} className="gv-btn-gold-sm">
            Забронировать
          </button>
        </nav>

        <button className="gv-nav-toggle" onClick={() => setOpen((v) => !v)} aria-label="Меню">
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {open && (
        <div className="gv-nav-mobile">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="gv-nav-link" onClick={() => setOpen(false)}>
              {l.label}
            </a>
          ))}
          <button
            onClick={() => {
              setOpen(false);
              onBookClick();
            }}
            className="gv-btn-gold-sm"
          >
            Забронировать
          </button>
        </div>
      )}
    </header>
  );
}

function Hero({ onBookClick }) {
  return (
    <section className="gv-hero">
      <StarPatternBg className="gv-hero-bg" />
      <div className="gv-hero-inner">
        <ArchFrame className="gv-hero-arch">
          <p className="gv-eyebrow">На древнем Шёлковом пути</p>
          <h1 className="gv-hero-title">{HOTEL_NAME}</h1>
          <p className="gv-hero-subtitle">
            Дом с характером в самом сердце {HOTEL_CITY}а — рядом с мавзолеем Ходжи Ахмеда Ясави,
            в двух шагах от истории.
          </p>
          <button onClick={onBookClick} className="gv-btn-gold">
            Забронировать номер <ChevronRight size={18} />
          </button>
        </ArchFrame>
      </div>
    </section>
  );
}

function RoomsGrid({ onSelectRoom, roomsAvailability }) {
  const [expandedCategory, setExpandedCategory] = useState(null);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [showDetails, setShowDetails] = useState(false);

  // Реальный статус номера: сначала смотрим в данные с backend (roomsAvailability),
  // если по этому номеру данных ещё нет (бэкенд не ответил / номер не заведён в БД) —
  // используем захардкоженное значение по умолчанию, чтобы UI не был пустым.
  const isRoomAvailable = (room) => {
    if (roomsAvailability && Object.prototype.hasOwnProperty.call(roomsAvailability, room.id)) {
      return roomsAvailability[room.id];
    }
    return room.isAvailable;
  };

  const toggleCategory = (categoryId) => {
    setExpandedCategory(expandedCategory === categoryId ? null : categoryId);
    setSelectedRoom(null);
    setShowDetails(false);
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

    // Передаём и категорию (для формы), и конкретный номер (чтобы забронировать именно его)
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
              <div 
                className="gv-category-header"
                onClick={() => toggleCategory(category.id)}
              >
                <div className="gv-category-header-left">
                  <span className="gv-category-icon">{category.icon}</span>
                  <div>
                    <h3 className="gv-category-title">{category.title}</h3>
                    <p className="gv-category-subtitle">
                      {totalRooms} номеров • {availableRooms} свободно
                    </p>
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
                          onClick={() => available && handleRoomSelect(room)}
                        >
                          <div className="gv-room-header">
                            <span className="gv-room-number">{room.name}</span>
                            <span className={`gv-room-status ${available ? 'gv-room-available' : 'gv-room-occupied'}`}>
                              {available ? '🟢 Свободен' : '🔴 Занят'}
                            </span>
                          </div>
                          
                          <div className="gv-room-details">
                            <div className="gv-room-detail-item">
                              <span className="gv-room-detail-label">Этаж:</span>
                              <span>{room.floor}</span>
                            </div>
                            <div className="gv-room-detail-item">
                              <span className="gv-room-detail-label">Кровать:</span>
                              <span>{room.bedType}</span>
                            </div>
                            <div className="gv-room-detail-item">
                              <span className="gv-room-detail-label">Гостей:</span>
                              <span>до {room.capacity}</span>
                            </div>
                            <div className="gv-room-detail-item">
                              <span className="gv-room-detail-label">Площадь:</span>
                              <span>{room.size}</span>
                            </div>
                            <div className="gv-room-detail-item">
                              <span className="gv-room-detail-label">Вид:</span>
                              <span>{room.view}</span>
                            </div>
                          </div>

                          <div className="gv-room-amenities">
                            {room.amenities.slice(0, 4).map((amenity, idx) => (
                              <span key={idx} className="gv-amenity-tag">{amenity}</span>
                            ))}
                            {room.amenities.length > 4 && (
                              <span className="gv-amenity-tag gv-amenity-more">+{room.amenities.length - 4}</span>
                            )}
                          </div>

                          {available && (
                            <button 
                              className="gv-btn-gold-sm gv-room-book-btn"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleBooking(room);
                              }}
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

      {/* Модальное окно с деталями номера */}
      {showDetails && selectedRoom && (
        <div className="gv-modal-backdrop" onClick={() => setShowDetails(false)}>
          <div className="gv-modal gv-modal-room-details" onClick={(e) => e.stopPropagation()}>
            <button className="gv-modal-close" onClick={() => setShowDetails(false)} aria-label="Закрыть">
              <X size={20} />
            </button>
            
            <div className="gv-room-detail-header">
              <span className="gv-room-detail-number">{selectedRoom.name}</span>
              <span className="gv-room-detail-price">{formatTenge(selectedRoom.price)} / ночь</span>
            </div>

            <div className="gv-room-detail-body">
              <div className="gv-room-detail-grid">
                <div className="gv-room-detail-info">
                  <p><strong>Этаж:</strong> {selectedRoom.floor}</p>
                  <p><strong>Тип кровати:</strong> {selectedRoom.bedType}</p>
                  <p><strong>Вместимость:</strong> до {selectedRoom.capacity} гостей</p>
                  <p><strong>Площадь:</strong> {selectedRoom.size}</p>
                  <p><strong>Вид из окна:</strong> {selectedRoom.view}</p>
                  <p><strong>Окна:</strong> {selectedRoom.windows}</p>
                </div>
                
                <div className="gv-room-detail-amenities">
                  <p><strong>Удобства:</strong></p>
                  <ul>
                    {selectedRoom.amenities.map((item, idx) => (
                      <li key={idx}>✓ {item}</li>
                    ))}
                  </ul>
                </div>
              </div>

              {selectedRoom.features && selectedRoom.features.length > 0 && (
                <div className="gv-room-detail-features">
                  <p><strong>Особенности:</strong></p>
                  <div className="gv-feature-tags">
                    {selectedRoom.features.map((feature, idx) => (
                      <span key={idx} className="gv-feature-tag">⭐ {feature}</span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="gv-room-detail-actions">
              <button className="gv-btn-gold" onClick={() => {
                setShowDetails(false);
                handleBooking(selectedRoom);
              }}>
                Забронировать этот номер
              </button>
              <button className="gv-btn-outline" onClick={() => setShowDetails(false)}>
                Закрыть
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

function BookingForm({ selectedRoom, onBookingSuccess }) {
  const [form, setForm] = useState({
    name: '',
    phone: '',
    category: selectedRoom?.category || 'standard',
    checkIn: '',
    checkOut: '',
  });
  const [status, setStatus] = useState('idle'); // idle | loading | success | error
  const [errorMsg, setErrorMsg] = useState('');
  // Если гость сам меняет категорию в форме — отвязываемся от конкретного
  // кликнутого номера (иначе можно случайно забронировать "не тот" номер).
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
      setErrorMsg('Пожалуйста, заполните все поля.');
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
      // Сообщаем наверх, какой именно номер забронирован, чтобы сразу
      // пометить его "Занят" на сайте — не дожидаясь следующего опроса backend.
      const bookedRoomNumber = result.data?.room_number || targetRoomNumber;
      if (bookedRoomNumber && onBookingSuccess) {
        onBookingSuccess(bookedRoomNumber);
      }
    } else if (result.status === 409) {
      setStatus('error');
      setErrorMsg(
        result.data?.error ||
          result.data?.message ||
          'Этот номер уже забронирован на выбранные даты. Попробуйте другие даты или категорию.'
      );
    } else {
      setStatus('error');
      setErrorMsg(
        result.networkError
          ? 'Не удалось связаться с сервером. Проверьте соединение и попробуйте снова.'
          : 'Не удалось отправить бронирование. Попробуйте ещё раз чуть позже.'
      );
    }
  };

  if (status === 'success') {
    return (
      <section id="booking-form" className="gv-section gv-section-charcoal">
        <div className="gv-booking-success">
          <CheckCircle2 size={40} className="gv-stroke-gold" />
          <h3>Бронирование отправлено!</h3>
          <p>Мы свяжемся с вами по телефону {form.phone} для подтверждения.</p>
          <button className="gv-btn-outline-light" onClick={() => setStatus('idle')}>
            Забронировать ещё
          </button>
        </div>
      </section>
    );
  }

  return (
    <section id="booking-form" className="gv-section gv-section-charcoal">
      <div className="gv-booking-grid">
        <div>
          <p className="gv-eyebrow">Ваш визит</p>
          <h2 className="gv-section-title gv-section-title-light">Оформить бронирование</h2>

          <form onSubmit={handleSubmit} className="gv-form">
            {errorMsg && (
              <div className="gv-form-error">
                <AlertCircle size={18} />
                <span>{errorMsg}</span>
              </div>
            )}

            {targetRoomNumber && (
              <div className="gv-form-notice">
                <CheckCircle2 size={16} />
                <span>Вы бронируете номер {targetRoomNumber}</span>
              </div>
            )}

            <label className="gv-field">
              <span>Имя</span>
              <input type="text" value={form.name} onChange={update('name')} placeholder="Асель Нурланова" />
            </label>

            <label className="gv-field">
              <span>Телефон</span>
              <input type="tel" value={form.phone} onChange={update('phone')} placeholder="+7 7__ ___ __ __" />
            </label>

            <label className="gv-field">
              <span>Категория номера</span>
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
              {status === 'loading' ? (
                <>
                  <Loader2 size={18} className="gv-spin" /> Отправка...
                </>
              ) : (
                'Забронировать'
              )}
            </button>
          </form>
        </div>

        <ArchFrame className="gv-booking-arch" strokeClass="gv-stroke-gold-light">
          <p className="gv-eyebrow">{HOTEL_NAME}</p>
          <p className="gv-booking-arch-text">
            Ждём вас в {HOTEL_CITY}е — городе, где хранится тысяча лет истории Великого Шёлкового пути.
          </p>
        </ArchFrame>
      </div>
    </section>
  );
}

function WhatsAppWidget() {
  const message = encodeURIComponent('Привет, Алия! Я хочу узнать насчет проживания...');
  const href = `https://wa.me/${WHATSAPP_NUMBER}?text=${message}`;
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className="gv-whatsapp-fab">
      <MessageCircle size={22} />
      <span className="gv-whatsapp-fab-label">Спросить Алию</span>
    </a>
  );
}

function Footer() {
  return (
    <footer id="footer" className="gv-footer">
      <div className="gv-footer-arches">
        {[0, 1, 2].map((i) => (
          <svg key={i} viewBox="0 0 100 60" className="gv-footer-arch-svg" aria-hidden="true">
            <path d="M6,58 L6,26 Q6,4 50,4 Q94,4 94,26 L94,58" fill="none" className="gv-stroke-gold" strokeWidth="1.5" />
          </svg>
        ))}
      </div>
      <div className="gv-footer-grid">
        <div>
          <p className="gv-wordmark-main">{HOTEL_NAME}</p>
          <p className="gv-footer-muted">Ваш дом в сердце {HOTEL_CITY}а</p>
        </div>
        <div className="gv-footer-contact">
          <p><MapPin size={16} className="gv-stroke-gold-light" /> ул. Яссауи, {HOTEL_CITY}, Казахстан</p>
          <p><Phone size={16} className="gv-stroke-gold-light" /> +7 700 123 45 67</p>
        </div>
      </div>
      <p className="gv-footer-copy">© {new Date().getFullYear()} {HOTEL_NAME}. Все права защищены.</p>
    </footer>
  );
}

function LandingPage({ onSelectRoom, selectedRoom }) {
  // Реальная занятость номеров из Supabase: { '101': true, '202': false, ... }
  const [roomsAvailability, setRoomsAvailability] = useState({});

  const loadAvailability = async () => {
    const result = await apiGet('/api/rooms/availability');
    if (result.ok && result.data?.rooms) {
      const map = {};
      for (const room of result.data.rooms) {
        map[room.room_number] = room.is_available;
      }
      setRoomsAvailability(map);
    }
    // Если backend недоступен — просто оставляем предыдущее состояние
    // (RoomsGrid сам подстрахуется захардкоженным isAvailable для номеров без данных)
  };

  useEffect(() => {
    loadAvailability();
  }, []);

  // Вызывается из BookingForm сразу после успешной брони —
  // мгновенно помечаем номер занятым, не дожидаясь следующего опроса
  const handleBookingSuccess = (roomNumber) => {
    setRoomsAvailability((prev) => ({ ...prev, [roomNumber]: false }));
    // Плюс подстраховочно перезапрашиваем актуальные данные с backend
    loadAvailability();
  };

  return (
    <div className="gv-page">
      <Header onBookClick={() => onSelectRoom({ category: selectedRoom?.category || 'standard', roomNumber: null })} />
      <Hero onBookClick={() => onSelectRoom({ category: selectedRoom?.category || 'standard', roomNumber: null })} />
      <RoomsGrid onSelectRoom={onSelectRoom} roomsAvailability={roomsAvailability} />
      <BookingForm selectedRoom={selectedRoom} onBookingSuccess={handleBookingSuccess} />
      <Footer />
      <WhatsAppWidget />
    </div>
  );
}

/* =========================================================================
   СЦЕНАРИЙ 2 — QR РУМ-СЕРВИС
   ========================================================================= */

function RoomTopBar({ roomNumber, onExit }) {
  return (
    <div className="gv-room-topbar">
      <button className="gv-room-back" onClick={onExit}>
        <ArrowLeft size={18} /> {HOTEL_NAME}
      </button>
      <span className="gv-room-badge">Номер {roomNumber}</span>
    </div>
  );
}

function RoomWelcome({ roomNumber }) {
  return (
    <ArchFrame className="gv-room-welcome-arch">
      <p className="gv-eyebrow">{HOTEL_NAME}</p>
      <h1 className="gv-room-welcome-title">Добро пожаловать в номер {roomNumber}!</h1>
      <p className="gv-room-welcome-text">Выберите услугу ниже — мы отреагируем в течение нескольких минут.</p>
    </ArchFrame>
  );
}

function ServiceGrid({ onSelect }) {
  return (
    <div className="gv-service-grid">
      {SERVICES.map((s) => {
        const Icon = s.icon;
        return (
          <button key={s.id} className="gv-service-btn" onClick={() => onSelect(s)}>
            <Icon size={28} className="gv-stroke-gold" />
            <span>{s.label}</span>
          </button>
        );
      })}
    </div>
  );
}

function RoomInfoPanel() {
  return (
    <div className="gv-info-panel">
      <div className="gv-info-grid">
        <div className="gv-info-card">
          <Wifi size={22} className="gv-stroke-gold" />
          <div>
            <p className="gv-info-label">Wi-Fi</p>
            <p className="gv-info-value">Пароль: {WIFI_PASSWORD}</p>
          </div>
        </div>
        <div className="gv-info-card">
          <Clock size={22} className="gv-stroke-gold" />
          <div>
            <p className="gv-info-label">Завтрак</p>
            <p className="gv-info-value">{BREAKFAST_TIME}</p>
          </div>
        </div>
        <div className="gv-info-card">
          <Ban size={22} className="gv-stroke-gold" />
          <div>
            <p className="gv-info-label">Курение</p>
            <p className="gv-info-value">Запрещено в номерах</p>
          </div>
        </div>
        <div className="gv-info-card">
          <ShieldAlert size={22} className="gv-stroke-gold" />
          <div>
            <p className="gv-info-label">Безопасность</p>
            <p className="gv-info-value">При ЧС или подозрительной ситуации сразу звоните на ресепшен.</p>
          </div>
        </div>
      </div>

      <div className="gv-rules-block">
        <h3 className="gv-rules-title">Правила проживания</h3>
        <ul className="gv-rules-list">
          {HOUSE_RULES.map((rule, i) => (
            <li key={i}>{rule}</li>
          ))}
        </ul>

        <h3 className="gv-rules-title">Штрафы за нарушения</h3>
        <ul className="gv-penalty-list">
          {PENALTIES.map((p, i) => (
            <li key={i}>
              <span>{p.title}</span>
              <strong>{p.amount ? formatTenge(p.amount) : p.note}</strong>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function ConfirmModal({ service, roomNumber, onClose, onDone }) {
  const [comment, setComment] = useState('');
  const [status, setStatus] = useState('idle'); // idle | loading | error

  const handleConfirm = async () => {
    setStatus('loading');
    const result = await apiPost('/api/orders', {
      room_number: roomNumber,
      service_type: service.type,
      details: comment,
    });
    if (result.ok) {
      onDone({ type: 'success', message: 'Ваш запрос принят! Администратор уже спешит к вам. Уведомление отправлено на ресепшен.' });
    } else {
      setStatus('error');
    }
  };

  return (
    <div className="gv-modal-backdrop" onClick={onClose}>
      <div className="gv-modal" onClick={(e) => e.stopPropagation()}>
        <button className="gv-modal-close" onClick={onClose} aria-label="Закрыть">
          <X size={20} />
        </button>
        <service.icon size={30} className="gv-stroke-gold" />
        <h3 className="gv-modal-title">{service.label}</h3>
        <label className="gv-field">
          <span>Комментарий (необязательно)</span>
          <textarea
            rows={3}
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Например: утюг нужен срочно"
          />
        </label>

        {status === 'error' && (
          <div className="gv-form-error">
            <AlertCircle size={16} />
            <span>Не удалось отправить запрос. Попробуйте ещё раз.</span>
          </div>
        )}

        <button className="gv-btn-gold" onClick={handleConfirm} disabled={status === 'loading'}>
          {status === 'loading' ? (
            <>
              <Loader2 size={18} className="gv-spin" /> Отправка...
            </>
          ) : (
            'Отправить запрос'
          )}
        </button>
      </div>
    </div>
  );
}

function FoodMenuModal({ roomNumber, onClose, onDone }) {
  const [cart, setCart] = useState({});
  const [comment, setComment] = useState('');
  const [status, setStatus] = useState('idle');

  const changeQty = (id, delta) => {
    setCart((c) => {
      const next = { ...c, [id]: Math.max(0, (c[id] || 0) + delta) };
      if (next[id] === 0) delete next[id];
      return next;
    });
  };

  const items = Object.entries(cart).map(([id, qty]) => {
    const menuItem = FOOD_MENU.find((f) => f.id === id);
    return { ...menuItem, qty };
  });
  const total = items.reduce((sum, i) => sum + i.price * i.qty, 0);

  const handleConfirm = async () => {
    if (items.length === 0) return;
    setStatus('loading');
    const details = items.map((i) => `${i.name} x${i.qty}`).join(', ') + (comment ? ` | Комментарий: ${comment}` : '');
    const result = await apiPost('/api/orders', {
      room_number: roomNumber,
      service_type: 'еда',
      details,
    });
    if (result.ok) {
      onDone({ type: 'success', message: 'Ваш заказ принят! Администратор уже спешит к вам. Уведомление отправлено на ресепшен.' });
    } else {
      setStatus('error');
    }
  };

  return (
    <div className="gv-modal-backdrop" onClick={onClose}>
      <div className="gv-modal gv-modal-wide" onClick={(e) => e.stopPropagation()}>
        <button className="gv-modal-close" onClick={onClose} aria-label="Закрыть">
          <X size={20} />
        </button>
        <UtensilsCrossed size={30} className="gv-stroke-gold" />
        <h3 className="gv-modal-title">Menu кухни</h3>

        <div className="gv-food-list">
          {FOOD_MENU.map((item) => (
            <div key={item.id} className="gv-food-row">
              <div>
                <p className="gv-food-name">{item.name}</p>
                <p className="gv-food-price">{formatTenge(item.price)}</p>
              </div>
              <div className="gv-qty-control">
                <button onClick={() => changeQty(item.id, -1)} aria-label="Убрать одну порцию">
                  <Minus size={14} />
                </button>
                <span>{cart[item.id] || 0}</span>
                <button onClick={() => changeQty(item.id, 1)} aria-label="Добавить одну порцию">
                  <Plus size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>

        <label className="gv-field">
          <span>Комментарий (например: борщ без лука)</span>
          <textarea rows={2} value={comment} onChange={(e) => setComment(e.target.value)} placeholder="Пожелания к заказу" />
        </label>

        {status === 'error' && (
          <div className="gv-form-error">
            <AlertCircle size={16} />
            <span>Не удалось отправить заказ. Попробуйте ещё раз.</span>
          </div>
        )}

        <div className="gv-food-footer">
          <span className="gv-food-total">Итого: {formatTenge(total)}</span>
          <button className="gv-btn-gold" onClick={handleConfirm} disabled={status === 'loading' || items.length === 0}>
            {status === 'loading' ? (
              <>
                <Loader2 size={18} className="gv-spin" /> Отправка...
              </>
            ) : (
              'Оформить заказ'
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

function RoomScreen({ roomNumber, onExit }) {
  const [activeService, setActiveService] = useState(null);
  const [toast, setToast] = useState(null);

  const handleDone = (toastPayload) => {
    setActiveService(null);
    setToast(toastPayload);
  };

  return (
    <div className="gv-page gv-page-room">
      <StarPatternBg className="gv-room-bg" />
      <RoomTopBar roomNumber={roomNumber} onExit={onExit} />
      <div className="gv-room-inner">
        <RoomWelcome roomNumber={roomNumber} />
        <ServiceGrid onSelect={setActiveService} />
        <RoomInfoPanel />
      </div>

      {activeService && activeService.type === 'еда' && (
        <FoodMenuModal roomNumber={roomNumber} onClose={() => setActiveService(null)} onDone={handleDone} />
      )}
      {activeService && activeService.type !== 'еда' && (
        <ConfirmModal service={activeService} roomNumber={roomNumber} onClose={() => setActiveService(null)} onDone={handleDone} />
      )}

      <Toast toast={toast} onClose={() => setToast(null)} />
    </div>
  );
}

/* =========================================================================
   МАРШРУТИЗАЦИЯ БЕЗ react-router
   Определяет режим по window.location.pathname: "/room/:number" -> QR-режим
   ========================================================================= */

function parseRoute(pathname) {
  const match = pathname.match(/^\/room\/([a-zA-Z0-9-]+)\/?$/);
  if (match) {
    return { mode: 'room', roomNumber: match[1] };
  }
  return { mode: 'landing', roomNumber: null };
}

function DemoSwitcher({ current, goTo }) {
  return (
    <div className="gv-demo-switcher">
      <span>Демо-просмотр:</span>
      <button
        className={current.mode === 'landing' ? 'gv-demo-active' : ''}
        onClick={() => goTo('/')}
      >
        Лендинг
      </button>
      <button
        className={current.mode === 'room' ? 'gv-demo-active' : ''}
        onClick={() => goTo('/room/101')}
      >
        QR: Номер 101
      </button>
    </div>
  );
}

/* =========================================================================
   ГЛОБАЛЬНЫЕ СТИЛИ (токены дизайна)
   ========================================================================= */

function GlobalStyles() {
  return (
    <style>{`
      @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@500;600;700&family=Manrope:wght@400;500;600;700&display=swap');

      .gv-root {
        --cream: #F7F1E4;
        --cream-deep: #ECE0C7;
        --charcoal: #24221E;
        --charcoal-soft: #57514A;
        --gold: #B8872F;
        --gold-light: #DCB463;
        --teal: #1E6B63;
        font-family: 'Manrope', sans-serif;
        color: var(--charcoal);
        background: var(--cream);
        position: relative;
      }

      .gv-root * { box-sizing: border-box; }

      .gv-page { display: flex; flex-direction: column; min-height: 100vh; position: relative; }

      .gv-eyebrow {
        font-family: 'Manrope', sans-serif;
        text-transform: uppercase;
        letter-spacing: 0.18em;
        font-size: 0.7rem;
        font-weight: 700;
        color: var(--gold-light);
        margin: 0 0 0.5rem 0;
      }
      .gv-eyebrow-dark { color: var(--gold); }

      .gv-stroke-gold { stroke: var(--gold); color: var(--gold); }
      .gv-stroke-gold-light { stroke: var(--gold-light); color: var(--gold-light); }
      .gv-fill-gold { fill: var(--gold); }

      /* ---------- Header ---------- */
      .gv-header {
        position: sticky; top: 0; z-index: 40;
        background: var(--cream);
        border-bottom: 1px solid rgba(184,135,47,0.25);
      }
      .gv-header-inner {
        max-width: 1180px; margin: 0 auto; padding: 0.9rem 1.5rem;
        display: flex; align-items: center; justify-content: space-between;
      }
      .gv-wordmark { display: flex; flex-direction: column; line-height: 1.1; }
      .gv-wordmark-main {
        font-family: 'Cormorant Garamond', serif; font-weight: 700;
        font-size: 1.5rem; letter-spacing: 0.03em; color: var(--charcoal);
      }
      .gv-wordmark-sub {
        font-size: 0.65rem; text-transform: uppercase; letter-spacing: 0.2em; color: var(--gold);
      }
      .gv-nav-desktop { display: none; align-items: center; gap: 2rem; }
      .gv-nav-link { font-size: 0.9rem; color: var(--charcoal-soft); text-decoration: none; }
      .gv-nav-link:hover { color: var(--gold); }
      .gv-nav-toggle { background: none; border: none; color: var(--charcoal); cursor: pointer; }
      .gv-nav-mobile { display: flex; flex-direction: column; gap: 1rem; padding: 1rem 1.5rem 1.5rem; border-top: 1px solid rgba(184,135,47,0.2); }

      @media (min-width: 860px) {
        .gv-nav-desktop { display: flex; }
        .gv-nav-toggle { display: none; }
        .gv-nav-mobile { display: none; }
      }

      /* ---------- Buttons ---------- */
      .gv-btn-gold, .gv-btn-gold-sm {
        display: inline-flex; align-items: center; justify-content: center; gap: 0.5rem;
        background: var(--gold); color: var(--cream); border: none;
        font-weight: 600; cursor: pointer; border-radius: 2px;
        transition: background 0.2s ease, transform 0.15s ease;
      }
      .gv-btn-gold { padding: 0.9rem 1.8rem; font-size: 0.95rem; width: 100%; }
      .gv-btn-gold-sm { padding: 0.55rem 1.2rem; font-size: 0.85rem; }
      .gv-btn-gold:hover, .gv-btn-gold-sm:hover { background: #A0761F; }
      .gv-btn-gold:disabled { opacity: 0.6; cursor: not-allowed; }

      .gv-btn-outline {
        margin-top: 1rem; width: 100%; padding: 0.75rem 1.2rem;
        background: transparent; border: 1px solid var(--gold); color: var(--gold);
        font-weight: 600; cursor: pointer; border-radius: 2px; transition: all 0.2s ease;
      }
      .gv-btn-outline:hover { background: var(--gold); color: var(--cream); }

      .gv-btn-outline-light {
        margin-top: 1rem; padding: 0.7rem 1.4rem; background: transparent;
        border: 1px solid var(--gold-light); color: var(--gold-light);
        font-weight: 600; cursor: pointer; border-radius: 2px;
      }
      .gv-btn-outline-light:hover { background: var(--gold-light); color: var(--charcoal); }

      /* ---------- Hero ---------- */
      .gv-hero {
        position: relative; background: var(--charcoal); color: var(--cream);
        padding: 4rem 1.5rem 5rem; overflow: hidden;
      }
      .gv-hero-bg { position: absolute; inset: 0; color: var(--gold-light); opacity: 0.05; }
      .gv-hero-inner { position: relative; max-width: 640px; margin: 0 auto; }
      .gv-hero-arch { --arch-color: var(--gold); }
      .gv-hero-title {
        font-family: 'Cormorant Garamond', serif; font-weight: 700;
        font-size: clamp(2.4rem, 6vw, 3.6rem); margin: 0 0 1rem; color: var(--cream);
      }
      .gv-hero-subtitle { color: #D9D2C4; font-size: 1rem; line-height: 1.6; margin-bottom: 1.8rem; }

      /* ---------- Arch frame ---------- */
      .gv-arch-wrap { position: relative; text-align: center; padding: 3.2rem 1.8rem 2.4rem; }
      .gv-arch-svg { position: absolute; inset: 0; width: 100%; height: 100%; }
      .gv-arch-content { position: relative; z-index: 1; }

      /* ---------- Sections ---------- */
      .gv-section { padding: 4.5rem 1.5rem; }
      .gv-section-cream { background: var(--cream-deep); }
      .gv-section-charcoal { background: var(--charcoal); color: var(--cream); }
      .gv-section-title {
        font-family: 'Cormorant Garamond', serif; font-weight: 600;
        font-size: clamp(1.8rem, 4vw, 2.4rem); max-width: 1180px; margin: 0 auto 2.5rem;
      }
      .gv-section-title-light { color: var(--cream); margin-bottom: 1.8rem; }
      .gv-section > .gv-eyebrow, .gv-section-title { max-width: 1180px; margin-left: auto; margin-right: auto; }

      /* ---------- Улучшенные контейнеры номеров (Rooms Grid) ---------- */
      .gv-rooms-container {
        max-width: 1180px;
        margin: 0 auto;
        display: flex;
        flex-direction: column;
        gap: 1.5rem;
      }
      
      .gv-category-card {
        background: #fff;
        border: 1px solid rgba(184, 135, 47, 0.25);
        border-radius: 8px;
        overflow: hidden;
        box-shadow: 0 4px 15px rgba(36, 34, 30, 0.05);
        transition: border-color 0.2s ease;
      }
      .gv-category-card:hover {
        border-color: var(--gold);
      }

      .gv-category-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 1.5rem;
        cursor: pointer;
        background: #fff;
        user-select: none;
        transition: background 0.15s ease;
      }
      .gv-category-header:hover {
        background: #FAF8F5;
      }

      .gv-category-header-left {
        display: flex;
        align-items: center;
        gap: 1.2rem;
      }
      .gv-category-icon {
        font-size: 2rem;
      }
      .gv-category-title {
        font-family: 'Cormorant Garamond', serif;
        font-size: 1.5rem;
        font-weight: 700;
        margin: 0;
        color: var(--charcoal);
      }
      .gv-category-subtitle {
        margin: 0.2rem 0 0 0;
        font-size: 0.85rem;
        color: var(--charcoal-soft);
      }
      .gv-category-price {
        font-weight: 700;
        color: var(--gold);
        font-size: 1.2rem;
        text-align: right;
      }
      .gv-category-price-unit {
        font-size: 0.75rem;
        color: var(--charcoal-soft);
        font-weight: 500;
        margin-left: 0.25rem;
      }

      .gv-rooms-list {
        padding: 0 1.5rem 1.5rem 1.5rem;
        border-top: 1px solid rgba(184, 135, 47, 0.15);
        background: #FCFAF6;
      }
      .gv-category-desc {
        color: var(--charcoal-soft);
        font-size: 0.95rem;
        line-height: 1.6;
        margin: 1.2rem 0;
      }

      .gv-rooms-grid {
        display: grid;
        grid-template-columns: 1fr;
        gap: 1.2rem;
        max-height: 480px;
        overflow-y: auto;
        padding: 0.5rem;
      }
      @media (min-width: 640px) {
        .gv-rooms-grid { grid-template-columns: repeat(2, 1fr); }
      }
      @media (min-width: 1024px) {
        .gv-rooms-grid { grid-template-columns: repeat(3, 1fr); }
      }

      .gv-room-item {
        background: #fff;
        border: 1px solid rgba(184, 135, 47, 0.2);
        border-radius: 6px;
        padding: 1.2rem;
        display: flex;
        flex-direction: column;
        gap: 1rem;
        cursor: pointer;
        transition: transform 0.15s ease, box-shadow 0.15s ease;
      }
      .gv-room-item:hover:not(.gv-room-unavailable) {
        transform: translateY(-2px);
        box-shadow: 0 6px 20px rgba(184, 135, 47, 0.1);
        border-color: var(--gold);
      }
      .gv-room-unavailable {
        opacity: 0.65;
        cursor: not-allowed;
        background: #F3F1ED;
      }

      .gv-room-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-bottom: 1px solid rgba(184, 135, 47, 0.1);
        padding-bottom: 0.6rem;
      }
      .gv-room-number {
        font-weight: 700;
        color: var(--charcoal);
      }
      .gv-room-status {
        font-size: 0.75rem;
        font-weight: 600;
      }

      .gv-room-details {
        display: flex;
        flex-direction: column;
        gap: 0.4rem;
        font-size: 0.85rem;
        color: var(--charcoal-soft);
      }
      .gv-room-detail-item {
        display: flex;
        justify-content: space-between;
      }
      .gv-room-detail-label {
        font-weight: 600;
        color: var(--charcoal);
      }

      .gv-room-amenities {
        display: flex;
        flex-wrap: wrap;
        gap: 0.4rem;
        margin-top: auto;
      }
      .gv-amenity-tag {
        font-size: 0.7rem;
        font-weight: 600;
        background: #F4EFE5;
        color: var(--charcoal-soft);
        padding: 0.2rem 0.5rem;
        border-radius: 4px;
      }
      .gv-amenity-more {
        background: var(--gold);
        color: #fff;
      }

      .gv-room-book-btn {
        width: 100%;
        margin-top: 0.5rem;
      }

      /* Модалка с деталями номера */
      .gv-modal-room-details {
        max-width: 500px !important;
      }
      .gv-room-detail-header {
        display: flex;
        justify-content: space-between;
        align-items: baseline;
        border-bottom: 1px solid rgba(184, 135, 47, 0.2);
        padding-bottom: 0.8rem;
        margin-top: 0.5rem;
      }
      .gv-room-detail-number {
        font-family: 'Cormorant Garamond', serif;
        font-size: 1.8rem;
        font-weight: 700;
        color: var(--charcoal);
      }
      .gv-room-detail-price {
        font-weight: 700;
        color: var(--gold);
      }
      .gv-room-detail-body {
        display: flex;
        flex-direction: column;
        gap: 1.2rem;
        margin: 0.5rem 0;
      }
      .gv-room-detail-grid {
        display: grid;
        grid-template-columns: 1.1fr 0.9fr;
        gap: 1rem;
        font-size: 0.9rem;
      }
      .gv-room-detail-info p {
        margin: 0 0 0.5rem 0;
        color: var(--charcoal-soft);
      }
      .gv-room-detail-info strong {
        color: var(--charcoal);
      }
      .gv-room-detail-amenities p {
        margin: 0 0 0.4rem 0;
        font-weight: 700;
      }
      .gv-room-detail-amenities ul {
        margin: 0;
        padding-left: 0.5rem;
        list-style: none;
        display: flex;
        flex-direction: column;
        gap: 0.35rem;
        color: var(--charcoal-soft);
      }
      .gv-room-detail-features p {
        margin: 0 0 0.5rem 0;
        font-weight: 700;
      }
      .gv-feature-tags {
        display: flex;
        flex-wrap: wrap;
        gap: 0.5rem;
      }
      .gv-feature-tag {
        font-size: 0.8rem;
        font-weight: 600;
        background: #FCFAF6;
        border: 1px solid rgba(184, 135, 47, 0.25);
        color: var(--gold);
        padding: 0.3rem 0.6rem;
        border-radius: 4px;
      }
      .gv-room-detail-actions {
        display: flex;
        flex-direction: column;
        gap: 0.6rem;
        margin-top: 0.5rem;
      }
      .gv-room-detail-actions button {
        margin: 0;
      }

      /* ---------- ВОССТАНОВЛЕННЫЕ СТИЛИ ДЛЯ БРОНИРОВАНИЯ (Booking Form) ---------- */
      .gv-booking-grid {
        max-width: 1180px; margin: 0 auto; display: grid; grid-template-columns: 1fr; gap: 2.5rem;
      }
      @media (min-width: 900px) { .gv-booking-grid { grid-template-columns: 1.1fr 0.9fr; align-items: center; } }
      
      .gv-form { display: flex; flex-direction: column; gap: 1rem; max-width: 480px; }
      
      .gv-field { display: flex; flex-direction: column; gap: 0.35rem; font-size: 0.85rem; color: #D9D2C4; flex: 1; }
      .gv-section-cream .gv-field { color: var(--charcoal-soft); }
      
      .gv-field input, .gv-field select, .gv-field textarea {
        padding: 0.7rem 0.85rem; border: 1px solid rgba(184,135,47,0.4); background: rgba(255,255,255,0.05);
        color: #fff; font-family: inherit; font-size: 0.95rem; border-radius: 2px; width: 100%;
      }
      .gv-section-cream .gv-field input, .gv-section-cream .gv-field select, .gv-section-cream .gv-field textarea {
        background: var(--cream); color: var(--charcoal);
      }
      .gv-field input:focus, .gv-field select:focus, .gv-field textarea:focus {
        outline: 2px solid var(--gold); outline-offset: 1px;
      }
      .gv-field-row { display: flex; gap: 1rem; width: 100%; }
      .gv-field-row .gv-field { min-width: 0; }

      .gv-field select option {
        background: var(--charcoal);
        color: #fff;
      }

      .gv-form-error {
        display: flex; align-items: flex-start; gap: 0.5rem; background: rgba(200,60,60,0.12);
        border: 1px solid rgba(200,60,60,0.4); color: #E29999; padding: 0.7rem 0.9rem;
        font-size: 0.85rem; border-radius: 2px;
      }

      .gv-form-notice {
        display: flex; align-items: center; gap: 0.5rem; background: rgba(184,135,47,0.15);
        border: 1px solid rgba(184,135,47,0.4); color: var(--gold-light); padding: 0.6rem 0.9rem;
        font-size: 0.85rem; font-weight: 600; border-radius: 2px;
      }

      /* ---------- Booking success styling ---------- */
      .gv-booking-success {
        max-width: 480px; margin: 0 auto; text-align: center; display: flex;
        flex-direction: column; align-items: center; gap: 0.6rem;
      }
      .gv-booking-success h3 { font-family: 'Cormorant Garamond', serif; font-size: 1.6rem; margin: 0; color: var(--cream); }
      .gv-booking-success p { color: #D9D2C4; }

      /* ---------- WhatsApp widget ---------- */
      .gv-whatsapp-fab {
        position: fixed; bottom: 1.5rem; right: 1.5rem; z-index: 50;
        display: flex; align-items: center; gap: 0.5rem;
        background: var(--teal); color: #fff; padding: 0.85rem 1.1rem; border-radius: 999px;
        text-decoration: none; box-shadow: 0 8px 24px rgba(0,0,0,0.25); font-size: 0.85rem; font-weight: 600;
        transition: transform 0.15s ease;
      }
      .gv-whatsapp-fab:hover { transform: translateY(-2px); }
      .gv-whatsapp-fab-label { display: none; }
      @media (min-width: 640px) { .gv-whatsapp-fab-label { display: inline; } }

      /* ---------- Footer ---------- */
      .gv-footer { background: var(--charcoal); color: var(--cream); padding: 2.5rem 1.5rem 1.5rem; text-align: center; }
      .gv-footer-arches { display: flex; justify-content: center; gap: 0.5rem; margin-bottom: 1.5rem; opacity: 0.7; }
      .gv-footer-arch-svg { width: 50px; height: 30px; }
      .gv-footer-grid {
        max-width: 720px; margin: 0 auto 1.5rem; display: flex; flex-direction: column; gap: 1rem;
        align-items: center; text-align: center;
      }
      @media (min-width: 640px) { .gv-footer-grid { flex-direction: row; justify-content: space-between; text-align: left; } }
      .gv-footer-muted { color: #B8B0A2; font-size: 0.85rem; margin-top: 0.2rem; }
      .gv-footer-contact { display: flex; flex-direction: column; gap: 0.4rem; font-size: 0.85rem; color: #D9D2C4; }
      .gv-footer-contact p { display: flex; align-items: center; gap: 0.4rem; margin: 0; justify-content: center; }
      @media (min-width: 640px) { .gv-footer-contact p { justify-content: flex-start; } }
      .gv-footer-copy { font-size: 0.72rem; color: #8A8477; border-top: 1px solid rgba(184,135,47,0.2); padding-top: 1.2rem; }

      /* ---------- Room / QR screen ---------- */
      .gv-page-room { background: var(--cream); position: relative; }
      .gv-room-bg { position: absolute; inset: 0; color: var(--gold); opacity: 0.06; pointer-events: none; }
      .gv-room-topbar {
        position: relative; display: flex; align-items: center; justify-content: space-between;
        padding: 1rem 1.3rem; border-bottom: 1px solid rgba(184,135,47,0.25);
      }
      .gv-room-back {
        display: flex; align-items: center; gap: 0.4rem; background: none; border: none;
        color: var(--charcoal-soft); font-size: 0.85rem; cursor: pointer; font-weight: 600;
      }
      .gv-room-badge {
        background: var(--gold); color: var(--cream); font-size: 0.75rem; font-weight: 700;
        padding: 0.35rem 0.8rem; border-radius: 999px; letter-spacing: 0.05em;
      }
      .gv-room-inner { position: relative; max-width: 560px; margin: 0 auto; padding: 1.5rem 1.3rem 3rem; }
      .gv-room-welcome-title {
        font-family: 'Cormorant Garamond', serif; font-weight: 700;
        font-size: clamp(1.6rem, 5vw, 2.1rem); margin: 0 0 0.6rem;
      }
      .gv-room-welcome-text { color: var(--charcoal-soft); font-size: 0.95rem; }

      .gv-service-grid {
        display: grid; grid-template-columns: repeat(2, 1fr); gap: 0.9rem; margin-top: 2rem;
      }
      .gv-service-btn {
        display: flex; flex-direction: column; align-items: center; gap: 0.6rem;
        background: var(--cream); border: 1px solid rgba(184,135,47,0.3); padding: 1.4rem 0.8rem;
        cursor: pointer; font-size: 0.85rem; font-weight: 600; color: var(--charcoal); text-align: center;
        transition: border-color 0.15s ease, transform 0.15s ease;
      }
      .gv-service-btn:hover { border-color: var(--gold); transform: translateY(-2px); }

      .gv-info-panel { margin-top: 2.5rem; display: flex; flex-direction: column; gap: 1.6rem; }
      .gv-info-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 0.8rem; }
      @media (max-width: 420px) { .gv-info-grid { grid-template-columns: 1fr; } }
      .gv-info-card {
        display: flex; gap: 0.65rem; align-items: flex-start; background: #fff;
        border: 1px solid rgba(184,135,47,0.25); padding: 0.9rem; border-radius: 6px;
      }
      .gv-info-label { margin: 0; font-weight: 700; font-size: 0.8rem; color: var(--charcoal); }
      .gv-info-value { margin: 0.2rem 0 0; font-size: 0.78rem; color: var(--charcoal-soft); line-height: 1.4; }

      .gv-rules-block { border-top: 1px solid rgba(184,135,47,0.25); padding-top: 1.3rem; }
      .gv-rules-title {
        font-family: 'Cormorant Garamond', serif; font-size: 1.25rem; margin: 0 0 0.7rem;
      }
      .gv-rules-title + .gv-penalty-list { margin-top: 0; }
      .gv-rules-list {
        margin: 0 0 1.4rem; padding-left: 1.1rem; display: flex; flex-direction: column;
        gap: 0.45rem; font-size: 0.85rem; color: var(--charcoal-soft);
      }
      .gv-penalty-list { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; gap: 0.55rem; }
      .gv-penalty-list li {
        display: flex; justify-content: space-between; align-items: baseline; gap: 1rem;
        font-size: 0.83rem; color: var(--charcoal-soft); border-bottom: 1px dashed rgba(184,135,47,0.25);
        padding-bottom: 0.45rem;
      }
      .gv-penalty-list li strong { color: #8A3A3A; font-weight: 700; text-align: right; flex-shrink: 0; max-width: 55%; }

      /* ---------- Modal ---------- */
      .gv-modal-backdrop {
        position: fixed; inset: 0; background: rgba(36,34,30,0.6); z-index: 60;
        display: flex; align-items: flex-end; justify-content: center; padding: 0;
      }
      @media (min-width: 640px) { .gv-modal-backdrop { align-items: center; padding: 1rem; } }
      .gv-modal {
        position: relative; background: var(--cream); width: 100%; max-width: 460px;
        padding: 2rem 1.6rem 1.6rem; border-radius: 8px 8px 0 0; display: flex; flex-direction: column; gap: 0.9rem;
        max-height: 88vh; overflow-y: auto;
      }
      @media (min-width: 640px) { .gv-modal { border-radius: 8px; } }
      .gv-modal-wide { max-width: 540px; }
      .gv-modal-close { position: absolute; top: 1rem; right: 1rem; background: none; border: none; cursor: pointer; color: var(--charcoal-soft); }
      .gv-modal-title { font-family: 'Cormorant Garamond', serif; font-size: 1.4rem; margin: 0.2rem 0 0; }

      .gv-food-list { display: flex; flex-direction: column; gap: 0.6rem; max-height: 260px; overflow-y: auto; padding-right: 0.2rem; }
      .gv-food-row { display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid rgba(184,135,47,0.15); padding-bottom: 0.5rem; }
      .gv-food-name { margin: 0; font-size: 0.9rem; font-weight: 600; }
      .gv-food-price { margin: 0; font-size: 0.8rem; color: var(--charcoal-soft); }
      .gv-qty-control { display: flex; align-items: center; gap: 0.6rem; }
      .gv-qty-control button {
        width: 26px; height: 26px; border-radius: 50%; border: 1px solid var(--gold); background: none;
        color: var(--gold); display: flex; align-items: center; justify-content: center; cursor: pointer;
      }
      .gv-food-footer { display: flex; align-items: center; justify-content: space-between; gap: 1rem; margin-top: 0.4rem; }
      .gv-food-total { font-weight: 700; }
      .gv-food-footer .gv-btn-gold { width: auto; padding: 0.7rem 1.4rem; }

      /* ---------- Toast ---------- */
      .gv-toast {
        position: fixed; bottom: 1.5rem; left: 50%; transform: translateX(-50%); z-index: 70;
        display: flex; align-items: center; gap: 0.6rem; padding: 0.8rem 1.2rem; border-radius: 8px;
        font-size: 0.85rem; font-weight: 600; box-shadow: 0 8px 24px rgba(0,0,0,0.2); max-width: 90vw;
      }
      .gv-toast-success { background: #2A5C46; color: #E7F5EC; }
      .gv-toast-error { background: #5C2A2A; color: #F5E7E7; }

      /* ---------- Misc ---------- */
      .gv-spin { animation: gv-spin 1s linear infinite; }
      @keyframes gv-spin { to { transform: rotate(360deg); } }

      .gv-demo-switcher {
        position: fixed; bottom: 1rem; left: 1rem; z-index: 80;
        background: rgba(36,34,30,0.9); color: var(--cream); padding: 0.5rem 0.7rem;
        border-radius: 6px; display: flex; align-items: center; gap: 0.5rem; font-size: 0.72rem;
      }
      .gv-demo-switcher button {
        background: none; border: 1px solid var(--gold-light); color: var(--cream);
        padding: 0.25rem 0.6rem; border-radius: 4px; cursor: pointer; font-size: 0.72rem;
      }
      .gv-demo-switcher button.gv-demo-active { background: var(--gold); border-color: var(--gold); }
    `}</style>
  );
}

/* =========================================================================
   ГЛОБАЛЬНЫЙ КОРНЕВОЙ КОМПОНЕНТ
   ========================================================================= */

export default function GrandVillaPortal() {
  const [route, setRoute] = useState(() => parseRoute(window.location.pathname));
  const [selectedRoom, setSelectedRoom] = useState(null); // { category, roomNumber } | null

  useEffect(() => {
    const onPopState = () => setRoute(parseRoute(window.location.pathname));
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, []);

  const goTo = (path) => {
    window.history.pushState({}, '', path);
    setRoute(parseRoute(path));
  };

  const handleSelectRoom = (room) => {
    setSelectedRoom(room);
    const el = document.getElementById('booking-form');
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className="gv-root">
      <GlobalStyles />
      {route.mode === 'room' ? (
        <RoomScreen roomNumber={route.roomNumber} onExit={() => goTo('/')} />
      ) : (
        <LandingPage onSelectRoom={handleSelectRoom} selectedRoom={selectedRoom} />
      )}
      <DemoSwitcher current={route} goTo={goTo} />
    </div>
  );
}