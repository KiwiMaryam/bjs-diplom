"use strict"; // Включаем строгий режим

const logoutButton = new LogoutButton();

logoutButton.action = function() {
    ApiConnector.logout((response) => {
        if (response.success) {
            location.reload();
        }
    });
};


// Получение информации о текущем пользователе
ApiConnector.current((response) => {
    if (response.success) {
        ProfileWidget.showProfile(response.data);
    } else {
        console.error("Ошибка получения данных пользователя:", response.error);
    }
});

const ratesBoard = new RatesBoard();

// Функция для получения курсов валют
function fetchCurrencyRates() {
    // Вызываем статический метод getRates из класса ApiConnector
    ApiConnector.getStocks((response) => {
        if (response.success) {
            // Очищаем таблицу и заполняем её новыми данными
            ratesBoard.clearTable();
            ratesBoard.fillTable(response.data);
        } else {
            console.error("Ошибка получения курсов валют:", response.error);
        }
    });
}

// Вызов функции для получения текущих валют
fetchCurrencyRates();

// Установка интервала для обновления курсов валют раз в минуту
setInterval(fetchCurrencyRates, 60000);

// Создание объекта типа FavoritesWidget
const favoritesWidget = new FavoritesWidget();

// Функция для запроса начального списка избранного
function fetchFavorites() {
    ApiConnector.getFavorites((response) => {
        if (response.success) {
            favoritesWidget.clearTable();
            favoritesWidget.fillTable(response.data);
            moneyManager.updateUsersList(response.data); // Обновление списка пользователей
        } else {
            console.error("Ошибка получения списка избранного:", response.error);
        }
    });
}

// Вызов функции для получения начального списка избранного
fetchFavorites();

// Реализация добавления пользователя в список избранных
favoritesWidget.addUserCallback = (data) => {
    ApiConnector.addUserToFavorites(data, (response) => {
        if (response.success) {
            favoritesWidget.clearTable();
            favoritesWidget.fillTable(response.data);
            moneyManager.updateUsersList(response.data);
            favoritesWidget.setMessage('green', 'Пользователь успешно добавлен в избранное.'); // Указан цвет
        } else {
            favoritesWidget.setMessage('red', 'Ошибка добавления пользователя: ' + response.error); // Указан цвет
        }
    });
};

// Реализация удаления пользователя из избранного
favoritesWidget.removeUserCallback = (data) => {
    ApiConnector.removeUserFromFavorites(data, (response) => {
        if (response.success) {
            favoritesWidget.clearTable();
            favoritesWidget.fillTable(response.data);
            moneyManager.updateUsersList(response.data);
            favoritesWidget.setMessage("green", "Пользователь успешно удален из избранного."); // Указан цвет
        } else {
            favoritesWidget.setMessage("red", "Ошибка удаления пользователя: " + response.error); // Указан цвет
        }
    });
};


// Создание объекта типа MoneyManager
const moneyManager = new MoneyManager();

// Реализация пополнения баланса
moneyManager.addMoneyCallback = function(data) {
    ApiConnector.addMoney(data, (response) => {
        if (response.success) {
            ProfileWidget.showProfile(response.data);
            moneyManager.setMessage(true, "Баланс успешно пополнен!");
        } else {
            moneyManager.setMessage(false, `Ошибка: ${response.error}`);
        }
    });
};

// Реализация конвертирования валюты
moneyManager.conversionMoneyCallback = function(data) {
    ApiConnector.convertMoney(data, (response) => {
        if (response.success) {
            ProfileWidget.showProfile(response.data);
            moneyManager.setMessage(true, "Конвертация валюты успешна!");
        } else {
            moneyManager.setMessage(false, `Ошибка: ${response.error}`);
        }
    });
};

// Реализация перевода валюты
moneyManager.sendMoneyCallback = function(data) {
    ApiConnector.transferMoney(data, (response) => {
        if (response.success) {
            ProfileWidget.showProfile(response.data);
            moneyManager.setMessage(true, "Перевод валюты успешен!");
        } else {
            moneyManager.setMessage(false, `Ошибка: ${response.error}`);
        }
    });
};
