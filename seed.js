const BACKEND_URL = 'https://grand-villa-bot-production.up.railway.app/api/rooms'; // если эндпоинт создания комнат отличается, поправь путь

const rooms = [
  // СТАНДАРТ (31 номер)
  ...['101', '102', '103', '104', '105', '106', '108'].map(n => ({ number: n, category: 'standard', bed_type: 'Раздельные' })),
  ...['107', '203', '204', '205', '206', '208', '210', '303', '304', '305', '306', '309', '311', '403', '404', '405', '406', '408', '410'].map(n => ({ number: n, category: 'standard', bed_type: 'Двуспальная' })),
  
  // ДЕЛЮКС (6 номеров)
  ...['202', '302', '402'].map(n => ({ number: n, category: 'deluxe', bed_type: 'Двуспальная + Диван' })),
  ...['211', '307', '411'].map(n => ({ number: n, category: 'deluxe', bed_type: 'Двуспальная' })),

  // СЕМЕЙНЫЙ (9 номеров)
  ...['201', '209', '301', '310', '401', '409'].map(n => ({ number: n, category: 'family', bed_type: 'Двуспальная + 2 Односпальные' })),
  ...['207', '308', '407'].map(n => ({ number: n, category: 'family', bed_type: 'Двуспальная + Диван' }))
];

async function startSeeding() {
  console.log(`🚀 Начинаем отправку ${rooms.length} номеров на бэкенд Гранд Вилла...`);

  for (const room of rooms) {
    try {
      const response = await fetch(BACKEND_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(room)
      });

      if (response.ok) {
        console.log(`✅ Номер ${room.number} (${room.category}) успешно добавлен.`);
      } else {
        const errData = await response.json().catch(() => ({}));
        console.log(`⚠️ Номер ${room.number} не добавлен (Статус: ${response.status}). Возможно, уже есть в БД.`);
      }
    } catch (error) {
      console.error(`❌ Ошибка сети при отправке номера ${room.number}:`, error.message);
    }
  }

  console.log('🏁 Процесс инициализации комнат завершен!');
}

startSeeding();