// =========================================================================
// НОВАЯ КОНФИГУРАЦИЯ С РЕАЛЬНЫМИ НОМЕРАМИ
// =========================================================================

const ROOMS_DATA = {
  standard: {
    id: 'standard',
    title: 'Стандарт',
    description: 'Уютные номера с классическим дизайном. Идеальный выбор для деловых поездок и короткого отдыха.',
    icon: '🛏️',
    rooms: [
      {
        id: '101',
        name: 'Номер 101',
        floor: 1,
        bedType: 'Двуспальная кровать (180x200)',
        capacity: 2,
        size: '22 м²',
        view: 'Внутренний двор',
        amenities: ['Wi-Fi', 'Кондиционер', 'Телевизор', 'Холодильник', 'Душ'],
        price: 20000,
        isAvailable: true,
        windows: 'Окно выходит во двор',
        features: ['Тихий номер', 'Вид на фонтан']
      },
      {
        id: '102',
        name: 'Номер 102',
        floor: 1,
        bedType: 'Две раздельные кровати (90x200)',
        capacity: 2,
        size: '22 м²',
        view: 'Улица Яссауи',
        amenities: ['Wi-Fi', 'Кондиционер', 'Телевизор', 'Холодильник', 'Душ'],
        price: 20000,
        isAvailable: false, // Занят
        windows: 'Окно выходит на улицу',
        features: ['Шумный (выход на дорогу)']
      },
      {
        id: '103',
        name: 'Номер 103',
        floor: 1,
        bedType: 'Двуспальная кровать (180x200)',
        capacity: 2,
        size: '22 м²',
        view: 'Внутренний двор',
        amenities: ['Wi-Fi', 'Кондиционер', 'Телевизор', 'Холодильник', 'Душ'],
        price: 20000,
        isAvailable: true,
        windows: 'Окно выходит во двор',
        features: ['Бесплатный чай']
      },
      {
        id: '104',
        name: 'Номер 104',
        floor: 1,
        bedType: 'Две раздельные кровати (90x200)',
        capacity: 2,
        size: '22 м²',
        view: 'Улица Яссауи',
        amenities: ['Wi-Fi', 'Кондиционер', 'Телевизор', 'Холодильник', 'Душ'],
        price: 20000,
        isAvailable: true,
        windows: 'Окно выходит на улицу',
        features: ['Балкон']
      },
      {
        id: '105',
        name: 'Номер 105',
        floor: 1,
        bedType: 'Двуспальная кровать (180x200)',
        capacity: 2,
        size: '22 м²',
        view: 'Внутренний двор',
        amenities: ['Wi-Fi', 'Кондиционер', 'Телевизор', 'Холодильник', 'Душ'],
        price: 20000,
        isAvailable: true,
        windows: 'Окно выходит во двор',
        features: ['Сейф']
      },
      {
        id: '106',
        name: 'Номер 106',
        floor: 1,
        bedType: 'Две раздельные кровати (90x200)',
        capacity: 2,
        size: '22 м²',
        view: 'Внутренний двор',
        amenities: ['Wi-Fi', 'Кондиционер', 'Телевизор', 'Холодильник', 'Душ'],
        price: 20000,
        isAvailable: false,
        windows: 'Окно выходит во двор',
        features: ['Бесплатный чай', 'Сейф']
      }
    ]
  },
  deluxe: {
    id: 'deluxe',
    title: 'Делюкс',
    description: 'Просторные номера повышенной комфортности. Отличный выбор для романтического отдыха и деловых поездок с комфортом.',
    icon: '✨',
    rooms: [
      {
        id: '201',
        name: 'Номер 201',
        floor: 2,
        bedType: 'Двуспальная кровать (180x200) + диван',
        capacity: 3,
        size: '32 м²',
        view: 'Мавзолей Ходжи Ахмеда Ясави',
        amenities: ['Wi-Fi', 'Кондиционер', 'Телевизор', 'Мини-бар', 'Душ', 'Балкон'],
        price: 30000,
        isAvailable: true,
        windows: 'Панорамный вид',
        features: ['Вид на мавзолей', 'Балкон']
      },
      {
        id: '202',
        name: 'Номер 202',
        floor: 2,
        bedType: 'Двуспальная кровать (180x200)',
        capacity: 2,
        size: '30 м²',
        view: 'Городской пейзаж',
        amenities: ['Wi-Fi', 'Кондиционер', 'Телевизор', 'Мини-бар', 'Ванна', 'Балкон'],
        price: 30000,
        isAvailable: true,
        windows: 'Два окна',
        features: ['Ванна', 'Балкон']
      },
      {
        id: '203',
        name: 'Номер 203',
        floor: 2,
        bedType: 'Двуспальная кровать (180x200) + диван',
        capacity: 3,
        size: '32 м²',
        view: 'Мавзолей Ходжи Ахмеда Ясави',
        amenities: ['Wi-Fi', 'Кондиционер', 'Телевизор', 'Мини-бар', 'Душ', 'Балкон'],
        price: 30000,
        isAvailable: false,
        windows: 'Панорамный вид',
        features: ['Вид на мавзолей', 'Балкон']
      },
      {
        id: '204',
        name: 'Номер 204',
        floor: 2,
        bedType: 'Двуспальная кровать (180x200)',
        capacity: 2,
        size: '30 м²',
        view: 'Городской пейзаж',
        amenities: ['Wi-Fi', 'Кондиционер', 'Телевизор', 'Мини-бар', 'Ванна', 'Балкон'],
        price: 30000,
        isAvailable: true,
        windows: 'Два окна',
        features: ['Ванна']
      },
      {
        id: '205',
        name: 'Номер 205',
        floor: 2,
        bedType: 'Двуспальная кровать (180x200) + диван',
        capacity: 3,
        size: '32 м²',
        view: 'Мавзолей Ходжи Ахмеда Ясави',
        amenities: ['Wi-Fi', 'Кондиционер', 'Телевизор', 'Мини-бар', 'Душ', 'Балкон'],
        price: 30000,
        isAvailable: true,
        windows: 'Панорамный вид',
        features: ['Вид на мавзолей']
      },
      {
        id: '206',
        name: 'Номер 206',
        floor: 2,
        bedType: 'Двуспальная кровать (180x200)',
        capacity: 2,
        size: '30 м²',
        view: 'Городской пейзаж',
        amenities: ['Wi-Fi', 'Кондиционер', 'Телевизор', 'Мини-бар', 'Ванна'],
        price: 30000,
        isAvailable: true,
        windows: 'Два окна',
        features: ['Джакузи']
      }
    ]
  },
  family: {
    id: 'family',
    title: 'Семейный',
    description: 'Просторные двухкомнатные номера для комфортного проживания всей семьёй. Есть всё для отдыха с детьми.',
    icon: '👨‍👩‍👧‍👦',
    rooms: [
      {
        id: '301',
        name: 'Номер 301',
        floor: 3,
        bedType: 'Двуспальная кровать (180x200) + 2 односпальные',
        capacity: 4,
        size: '45 м²',
        view: 'Мавзолей Ходжи Ахмеда Ясави',
        amenities: ['Wi-Fi', 'Кондиционер', 'Телевизор', 'Мини-бар', 'Ванна', 'Балкон', 'Детская кроватка'],
        price: 35000,
        isAvailable: true,
        windows: 'Панорамный вид',
        features: ['Две комнаты', 'Вид на мавзолей', 'Детская кроватка']
      },
      {
        id: '302',
        name: 'Номер 302',
        floor: 3,
        bedType: 'Двуспальная кровать (180x200) + 2 односпальные',
        capacity: 4,
        size: '45 м²',
        view: 'Городской пейзаж',
        amenities: ['Wi-Fi', 'Кондиционер', 'Телевизор', 'Мини-бар', 'Ванна', 'Балкон'],
        price: 35000,
        isAvailable: false,
        windows: 'Два окна',
        features: ['Две комнаты', 'Балкон']
      },
      {
        id: '303',
        name: 'Номер 303',
        floor: 3,
        bedType: 'Двуспальная кровать (180x200) + диван-кровать',
        capacity: 4,
        size: '42 м²',
        view: 'Внутренний двор',
        amenities: ['Wi-Fi', 'Кондиционер', 'Телевизор', 'Мини-бар', 'Душ', 'Балкон'],
        price: 35000,
        isAvailable: true,
        windows: 'Окно выходит во двор',
        features: ['Две комнаты', 'Детская кроватка']
      },
      {
        id: '304',
        name: 'Номер 304',
        floor: 3,
        bedType: 'Двуспальная кровать (180x200) + 2 односпальные',
        capacity: 4,
        size: '45 м²',
        view: 'Мавзолей Ходжи Ахмеда Ясави',
        amenities: ['Wi-Fi', 'Кондиционер', 'Телевизор', 'Мини-бар', 'Ванна', 'Балкон'],
        price: 35000,
        isAvailable: true,
        windows: 'Панорамный вид',
        features: ['Две комнаты', 'Вид на мавзолей']
      },
      {
        id: '305',
        name: 'Номер 305',
        floor: 3,
        bedType: 'Двуспальная кровать (180x200) + диван-кровать',
        capacity: 4,
        size: '42 м²',
        view: 'Городской пейзаж',
        amenities: ['Wi-Fi', 'Кондиционер', 'Телевизор', 'Мини-бар', 'Душ', 'Балкон'],
        price: 35000,
        isAvailable: true,
        windows: 'Два окна',
        features: ['Две комнаты', 'Балкон', 'Детская кроватка']
      },
      {
        id: '306',
        name: 'Номер 306',
        floor: 3,
        bedType: 'Двуспальная кровать (180x200) + 2 односпальные',
        capacity: 4,
        size: '45 м²',
        view: 'Внутренний двор',
        amenities: ['Wi-Fi', 'Кондиционер', 'Телевизор', 'Мини-бар', 'Ванна', 'Балкон'],
        price: 35000,
        isAvailable: true,
        windows: 'Два окна',
        features: ['Две комнаты', 'Тихий номер']
      }
    ]
  }
};

// =========================================================================
// НОВЫЙ КОМПОНЕНТ ДЛЯ ОТОБРАЖЕНИЯ КОМНАТ
// =========================================================================

function RoomsGrid({ onSelectRoom }) {
  const [expandedCategory, setExpandedCategory] = useState(null);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [showDetails, setShowDetails] = useState(false);

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
    onSelectRoom(room.id);
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
          const availableRooms = category.rooms.filter(r => r.isAvailable).length;
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
                    {category.rooms.map((room) => (
                      <div 
                        key={room.id} 
                        className={`gv-room-item ${!room.isAvailable ? 'gv-room-unavailable' : ''}`}
                        onClick={() => room.isAvailable && handleRoomSelect(room)}
                      >
                        <div className="gv-room-header">
                          <span className="gv-room-number">{room.name}</span>
                          <span className={`gv-room-status ${room.isAvailable ? 'gv-room-available' : 'gv-room-occupied'}`}>
                            {room.isAvailable ? '🟢 Свободен' : '🔴 Занят'}
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

                        {room.isAvailable && (
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
                    ))}
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