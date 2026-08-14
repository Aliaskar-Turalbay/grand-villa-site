'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { createClient } from '@supabase/supabase-js';
import {
  Menu, X, Phone, MapPin, ArrowLeft, Loader2, AlertCircle,
  CheckCircle2, MessageCircle, Sparkles, Shirt, Bath, GlassWater,
  UtensilsCrossed, Plus, Minus
} from 'lucide-react';

/* =========================================================================
   ИНИЦИАЛИЗАЦИЯ SUPABASE
   Ключи берутся ТОЛЬКО из env — без хардкод-заглушек в коде.
   ========================================================================= */
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  // eslint-disable-next-line no-console
  console.warn(
    'Supabase env vars отсутствуют. Проверьте NEXT_PUBLIC_SUPABASE_URL и NEXT_PUBLIC_SUPABASE_ANON_KEY в .env.local'
  );
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

/* =========================================================================
   КОНФИГУРАЦИЯ
   ========================================================================= */
const WHATSAPP_NUMBER = '77770207773';
const HOTEL_NAME = 'Grand Villa';
const HOTEL_CITY = 'Туркестан';

// Порядок и подписи типов — ЕДИНЫЕ с админкой (lib/format.js -> ROOM_TYPE_LABELS).
// Значения ключей должны совпадать с полем `type` в таблице rooms.
const TYPE_ORDER = ['standard', 'deluxe', 'suite'];

const ROOM_TYPE_META = {
  standard: {
    title: 'Стандарт',
    icon: '🛏️',
    description: 'Уютные номера с классическим дизайном. Идеальный выбор для деловых поездок и комфортного отдыха в Туркестане.',
  },
  deluxe: {
    title: 'Делюкс',
    icon: '✨',
    description: 'Просторные номера повышенной комфортности. Отличный выбор для романтического отдыха и деловых поездок.',
  },
  suite: {
    title: 'Люкс',
    icon: '👑',
    description: 'Просторные премиальные номера с максимальным комфортом для по-настоящему особенного отдыха.',
  },
};

/* =========================================================================
   ДЕКОРАТИВНЫЕ ДЕТАЛИ НОМЕРОВ
   В таблице rooms Supabase сейчас нет колонок floor/bed_type/capacity/size/
   amenities/windows — только room_number, type, price_per_night, is_active.
   Поэтому эти визуальные детали пока остаются в коде, НО:
   - они больше не содержат id/price/isAvailable (это приходит из базы);
   - для новых номеров, которых нет в словаре ниже, есть запасной вариант
     по типу (DEFAULT_DECOR_BY_TYPE), чтобы сайт не ломался при добавлении
     номера в базу без правки этого файла.
   Если захотите полностью убрать дублирование — можно добавить эти колонки
   в таблицу rooms, тогда словарь ниже станет не нужен.
   ========================================================================= */
const ROOM_DECOR_BY_NUMBER = {
  '101': { floor: 1, bedType: 'Две раздельные кровати (90x200)', capacity: 2, size: '22 м²', amenities: ['Wi-Fi', 'Кондиционер', 'Телевизор', 'Холодильник', 'Душ'], windows: 'Окно выходит во двор' },
  '102': { floor: 1, bedType: 'Две раздельные кровати (90x200)', capacity: 2, size: '22 м²', amenities: ['Wi-Fi', 'Кондиционер', 'Телевизор', 'Холодильник', 'Душ'], windows: 'Окно выходит во двор' },
  '103': { floor: 1, bedType: 'Две раздельные кровати (90x200)', capacity: 2, size: '22 м²', amenities: ['Wi-Fi', 'Кондиционер', 'Телевизор', 'Холодильник', 'Душ'], windows: 'Окно выходит во двор' },
  '104': { floor: 1, bedType: 'Две раздельные кровати (90x200)', capacity: 2, size: '22 м²', amenities: ['Wi-Fi', 'Кондиционер', 'Телевизор', 'Холодильник', 'Душ'], windows: 'Окно выходит на улицу' },
  '105': { floor: 1, bedType: 'Две раздельные кровати (90x200)', capacity: 2, size: '22 м²', amenities: ['Wi-Fi', 'Кондиционер', 'Телевизор', 'Холодильник', 'Душ'], windows: 'Окно выходит во двор' },
  '106': { floor: 1, bedType: 'Две раздельные кровати (90x200)', capacity: 2, size: '22 м²', amenities: ['Wi-Fi', 'Кондиционер', 'Телевизор', 'Холодильник', 'Душ'], windows: 'Окно выходит во двор' },
  '107': { floor: 1, bedType: 'Двуспальная кровать (180x200)', capacity: 2, size: '22 м²', amenities: ['Wi-Fi', 'Кондиционер', 'Телевизор', 'Холодильник', 'Душ'], windows: 'Окно выходит во двор' },
  '108': { floor: 1, bedType: 'Две раздельные кровати (90x200)', capacity: 2, size: '22 м²', amenities: ['Wi-Fi', 'Кондиционер', 'Телевизор', 'Холодильник', 'Душ'], windows: 'Окно выходит во двор' },
  '203': { floor: 2, bedType: 'Двуспальная кровать (180x200)', capacity: 2, size: '22 м²', amenities: ['Wi-Fi', 'Кондиционер', 'Телевизор', 'Холодильник', 'Душ'], windows: 'Окно выходит во двор' },
  '204': { floor: 2, bedType: 'Двуспальная кровать (180x200)', capacity: 2, size: '22 м²', amenities: ['Wi-Fi', 'Кондиционер', 'Телевизор', 'Холодильник', 'Душ'], windows: 'Окно выходит на улицу' },
  '202': { floor: 2, bedType: 'Двуспальная кровать (180x200) + односпальная', capacity: 3, size: '32 м²', amenities: ['Wi-Fi', 'Кондиционер', 'Телевизор', 'Душ'], windows: 'Панорамный вид' },
  '211': { floor: 2, bedType: 'Двуспальная кровать (180x200)', capacity: 2, size: '30 м²', amenities: ['Wi-Fi', 'Кондиционер', 'Телевизор', 'Душ'], windows: 'Два окна' },
  '302': { floor: 3, bedType: 'Двуспальная кровать (180x200) + односпальная', capacity: 3, size: '32 м²', amenities: ['Wi-Fi', 'Кондиционер', 'Телевизор', 'Душ'], windows: 'Панорамный вид' },
  '201': { floor: 2, bedType: 'Двуспальная кровать + 2 односпальные', capacity: 4, size: '45 м²', amenities: ['Wi-Fi', 'Кондиционер', 'Телевизор', 'Душ', 'Детская кроватка'], windows: 'Панорамный вид' },
  '207': { floor: 2, bedType: 'Двуспальная кровать + диван-кровать', capacity: 4, size: '42 м²', amenities: ['Wi-Fi', 'Кондиционер', 'Телевизор', 'Душ'], windows: 'Окно выходит во двор' },
};

const DEFAULT_DECOR_BY_TYPE = {
  standard: { floor: 1, bedType: 'Двуспальная кровать (180x200)', capacity: 2, size: '22 м²', amenities: ['Wi-Fi', 'Кондиционер', 'Телевизор', 'Холодильник', 'Душ'], windows: 'Окно выходит во двор' },
  deluxe: { floor: 2, bedType: 'Двуспальная кровать (180x200)', capacity: 2, size: '30 м²', amenities: ['Wi-Fi', 'Кондиционер', 'Телевизор', 'Душ'], windows: 'Панорамный вид' },
  suite: { floor: 2, bedType: 'Двуспальная кровать + диван-кровать', capacity: 4, size: '42 м²', amenities: ['Wi-Fi', 'Кондиционер', 'Телевизор', 'Душ'], windows: 'Панорамный вид' },
};

function getRoomDecor(room) {
  return ROOM_DECOR_BY_NUMBER[room.room_number] || DEFAULT_DECOR_BY_TYPE[room.type] || DEFAULT_DECOR_BY_TYPE.standard;
}

const WIFI_PASSWORD = '12345678';
const BREAKFAST_TIME = '08:00–10:00, ежедневно';

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

function formatTenge(value) {
  return `${Number(value || 0).toLocaleString('ru-RU')} ₸`;
}

/* =========================================================================
   ВСПОМОГАТЕЛЬНЫЕ КОМПОНЕНТЫ UI
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
   ОСНОВНЫЕ СЕКЦИИ СТРАНИЦЫ
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

function Hero() {
  return (
    <section className="gv-hero">
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

function RoomsGrid({ roomGroups, roomsLoading, onSelectRoom, roomsAvailability }) {
  const [expandedCategory, setExpandedCategory] = useState('standard');
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [showDetails, setShowDetails] = useState(false);

  const isRoomAvailable = (room) => roomsAvailability[room.room_number] !== false;

  const handleBooking = (room) => {
    onSelectRoom({ category: room.type, roomNumber: room.room_number });
    const el = document.getElementById('booking-form');
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  if (roomsLoading) {
    return (
      <section id="rooms" className="gv-section gv-section-cream">
        <div style={{ display: 'flex', justifyContent: 'center', padding: '3rem 0' }}>
          <Loader2 size={28} className="gv-spin gv-stroke-gold" />
        </div>
      </section>
    );
  }

  return (
    <section id="rooms" className="gv-section gv-section-cream">
      <p className="gv-eyebrow gv-eyebrow-dark">Наши номера</p>
      <h2 className="gv-section-title">Выберите идеальный номер</h2>

      <div className="gv-rooms-container">
        {roomGroups.map((category) => {
          const totalRooms = category.rooms.length;
          const availableRooms = category.rooms.filter((r) => isRoomAvailable(r)).length;
          const isExpanded = expandedCategory === category.type;
          const meta = ROOM_TYPE_META[category.type] || { title: category.type, icon: '🏨', description: '' };
          const minPrice = Math.min(...category.rooms.map((r) => Number(r.price_per_night) || 0));

          return (
            <div key={category.type} className="gv-category-card">
              <div className="gv-category-header" onClick={() => setExpandedCategory(isExpanded ? null : category.type)}>
                <div className="gv-category-header-left">
                  <span className="gv-category-icon">{meta.icon}</span>
                  <div>
                    <h3 className="gv-category-title">{meta.title}</h3>
                    <p className="gv-category-subtitle">{totalRooms} номеров • <strong style={{ color: '#1E6B63' }}>{availableRooms} свободно</strong></p>
                  </div>
                </div>
                <div className="gv-category-price">
                  от {formatTenge(minPrice)}
                  <span className="gv-category-price-unit">/ночь</span>
                </div>
              </div>

              {isExpanded && (
                <div className="gv-rooms-list">
                  <p className="gv-category-desc">{meta.description}</p>
                  <div className="gv-rooms-grid">
                    {category.rooms.map((room) => {
                      const available = isRoomAvailable(room);
                      const decor = getRoomDecor(room);
                      return (
                        <div
                          key={room.id}
                          className={`gv-room-item ${!available ? 'gv-room-unavailable' : ''}`}
                          onClick={() => { if (available) { setSelectedRoom(room); setShowDetails(true); } }}
                        >
                          <div className="gv-room-header">
                            <span className="gv-room-number">Номер {room.room_number}</span>
                            <span className={`gv-room-status ${available ? 'gv-room-available' : 'gv-room-occupied'}`}>
                              {available ? '🟢 Свободен' : '🔴 Занят'}
                            </span>
                          </div>

                          <div className="gv-room-details">
                            <div className="gv-room-detail-item"><span>Этаж:</span><strong>{decor.floor}</strong></div>
                            <div className="gv-room-detail-item"><span>Спальное место:</span><strong>{decor.bedType}</strong></div>
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
            <h3 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.6rem', margin: '0 0 0.5rem' }}>Номер {selectedRoom.room_number}</h3>
            <p style={{ color: '#B8872F', fontWeight: 'bold', fontSize: '1.2rem' }}>{formatTenge(selectedRoom.price_per_night)} / ночь</p>
            <button className="gv-btn-gold" onClick={() => { setShowDetails(false); handleBooking(selectedRoom); }}>
              Забронировать этот номер
            </button>
          </div>
        </div>
      )}
    </section>
  );
}

function BookingForm({ selectedRoom, roomGroups, roomsAvailability, onBookingSuccess }) {
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

    try {
      // Ищем конкретный выбранный номер, либо любой свободный номер нужного типа —
      // всё из реального списка комнат, загруженного из Supabase (без хардкода).
      let targetRoom = null;
      const groupForType = roomGroups.find((g) => g.type === form.category);

      if (targetRoomNumber && groupForType) {
        targetRoom = groupForType.rooms.find((r) => r.room_number === targetRoomNumber);
      }
      if (!targetRoom && groupForType) {
        targetRoom = groupForType.rooms.find((r) => roomsAvailability[r.room_number] !== false);
      }

      if (!targetRoom) {
        setStatus('idle');
        setErrorMsg('Свободных номеров этой категории сейчас нет. Выберите другую категорию.');
        return;
      }

      const days = Math.max(1, Math.ceil((new Date(form.checkOut) - new Date(form.checkIn)) / (1000 * 60 * 60 * 24)));
      const totalPrice = (Number(targetRoom.price_per_night) || 0) * days;

      const { error } = await supabase.from('bookings').insert([
        {
          room_id: targetRoom.id,
          guest_name: form.name,
          guest_phone: form.phone,
          check_in: form.checkIn,
          check_out: form.checkOut,
          total_price: totalPrice,
          source: 'website',
          status: 'confirmed',
        }
      ]).select();

      if (error) throw error;

      setStatus('success');
      if (onBookingSuccess) onBookingSuccess(targetRoom.room_number);
    } catch (err) {
      console.error('Ошибка сохранения брони:', err);
      setStatus('error');
      setErrorMsg('Ошибка при создании бронирования. Попробуйте еще раз.');
    }
  };

  if (status === 'success') {
    return (
      <section id="booking-form" className="gv-section gv-section-charcoal">
        <div className="gv-booking-success">
          <CheckCircle2 size={48} className="gv-stroke-gold" />
          <h3 style={{ fontSize: '1.8rem', margin: '0.8rem 0' }}>Бронирование отправлено!</h3>
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
                {roomGroups.map((g) => {
                  const meta = ROOM_TYPE_META[g.type] || { title: g.type };
                  const minPrice = Math.min(...g.rooms.map((r) => Number(r.price_per_night) || 0));
                  return (
                    <option key={g.type} value={g.type}>
                      {meta.title} — от {formatTenge(minPrice)}
                    </option>
                  );
                })}
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
      </div>
    </section>
  );
}

/* =========================================================================
   QR ROOM SERVICE (ЭКРАН /room/:number)
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
          <h1 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '2rem', margin: '0 0 0.5rem' }}>Добро пожаловать в номер {roomNumber}!</h1>
          <p style={{ color: '#57514A', fontSize: '0.9rem' }}>Выберите услугу — мы приедем к вам в ближайшие минуты.</p>
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

        <div style={{ marginTop: '2rem', background: '#fff', padding: '1.2rem', borderRadius: '8px', border: '1px solid rgba(184,135,47,0.2)' }}>
          <h3 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.3rem', margin: '0 0 0.8rem' }}>Информация</h3>
          <p style={{ fontSize: '0.85rem', margin: '0.4rem 0' }}><strong>Wi-Fi Пароль:</strong> {WIFI_PASSWORD}</p>
          <p style={{ fontSize: '0.85rem', margin: '0.4rem 0' }}><strong>Завтрак:</strong> {BREAKFAST_TIME}</p>
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
    try {
      const { error } = await supabase.from('orders').insert([
        {
          room_number: roomNumber,
          service_type: service.type,
          details: comment,
          status: 'new'
        }
      ]);

      if (error) throw error;
      onDone({ type: 'success', message: 'Запрос принят администратором!' });
    } catch (err) {
      console.error('Ошибка заказа услуги:', err);
      setStatus('error');
    }
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

    try {
      const { error } = await supabase.from('orders').insert([
        {
          room_number: roomNumber,
          service_type: 'еда',
          details: details,
          total_price: total,
          status: 'new'
        }
      ]);

      if (error) throw error;
      onDone({ type: 'success', message: 'Заказ успешно отправлен!' });
    } catch (err) {
      console.error('Ошибка заказа еды:', err);
      setStatus('error');
    }
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
   ГЛАВНЫЙ КОМПОНЕНТ И МАРШРУТИЗАЦИЯ
   ========================================================================= */

function parseRoute(pathname) {
  const match = pathname.match(/^\/room\/([a-zA-Z0-9-]+)\/?$/);
  if (match) return { mode: 'room', roomNumber: match[1] };
  return { mode: 'landing', roomNumber: null };
}

export default function GrandVillaPortal() {
  const [route, setRoute] = useState({ mode: 'landing', roomNumber: null });
  const [selectedRoom, setSelectedRoom] = useState(null);

  const [rooms, setRooms] = useState([]);
  const [roomsLoading, setRoomsLoading] = useState(true);
  const [roomsAvailability, setRoomsAvailability] = useState({});

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setRoute(parseRoute(window.location.pathname));
      const onPopState = () => setRoute(parseRoute(window.location.pathname));
      window.addEventListener('popstate', onPopState);
      return () => window.removeEventListener('popstate', onPopState);
    }
  }, []);

  // Реальные номера — только из Supabase. Никакого хардкода списка/цены/типа.
  const loadRooms = async () => {
    setRoomsLoading(true);
    try {
      const { data, error } = await supabase
        .from('rooms')
        .select('*')
        .eq('is_active', true)
        .order('room_number', { ascending: true });

      if (error) throw error;
      setRooms(data || []);
    } catch (err) {
      console.error('Ошибка загрузки номеров:', err);
    } finally {
      setRoomsLoading(false);
    }
  };

  // Занятость номеров — по подтверждённым броням на сегодня.
  const loadAvailability = async () => {
    try {
      const { data: bookingsData, error } = await supabase
        .from('bookings')
        .select('room_id, check_in, check_out, rooms(room_number)')
        .eq('status', 'confirmed');

      if (error) throw error;

      const todayISO = new Date().toISOString().slice(0, 10);
      const map = {};
      (bookingsData || []).forEach((b) => {
        if (b.rooms?.room_number && b.check_in <= todayISO && b.check_out > todayISO) {
          map[b.rooms.room_number] = false; // Занята сегодня
        }
      });
      setRoomsAvailability(map);
    } catch (err) {
      console.error('Ошибка загрузки занятости:', err);
    }
  };

  useEffect(() => {
    loadRooms();
    loadAvailability();
  }, []);

  // Группировка загруженных номеров по типу — в порядке TYPE_ORDER,
  // остальные типы (если появятся новые) — в конце по алфавиту.
  const roomGroups = useMemo(() => {
    if (!rooms.length) return [];
    const byType = {};
    rooms.forEach((room) => {
      const key = room.type || 'other';
      if (!byType[key]) byType[key] = [];
      byType[key].push(room);
    });
    const orderedKeys = [
      ...TYPE_ORDER.filter((t) => byType[t]),
      ...Object.keys(byType).filter((t) => !TYPE_ORDER.includes(t)).sort(),
    ];
    return orderedKeys.map((type) => ({ type, rooms: byType[type] }));
  }, [rooms]);

  const handleSelectRoom = (room) => {
    setSelectedRoom(room);
    const el = document.getElementById('booking-form');
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className="gv-root">
      {route.mode === 'room' ? (
        <RoomScreen roomNumber={route.roomNumber} onExit={() => window.history.pushState({}, '', '/')} />
      ) : (
        <div className="gv-page">
          <Header onBookClick={() => handleSelectRoom({ category: selectedRoom?.category || 'standard', roomNumber: null })} />
          <Hero />
          <RoomsGrid
            roomGroups={roomGroups}
            roomsLoading={roomsLoading}
            onSelectRoom={handleSelectRoom}
            roomsAvailability={roomsAvailability}
          />
          <BookingForm
            selectedRoom={selectedRoom}
            roomGroups={roomGroups}
            roomsAvailability={roomsAvailability}
            onBookingSuccess={(num) => {
              if (num) setRoomsAvailability((prev) => ({ ...prev, [num]: false }));
              loadAvailability();
            }}
          />
        </div>
      )}
    </div>
  );
}