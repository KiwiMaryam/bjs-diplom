"use strict"; // Включаем строгий режим

class UserForm {
    constructor() {
        this.loginFormCallback = this.loginFormAction.bind(this);
        this.registerFormCallback = this.registerFormAction.bind(this);
    }

    loginFormAction(data) {
        ApiConnector.login(data, (response) => {
            console.log(response); // Логируем ответ сервера
            if (response.success) {
                // location.reload(); // Обновляем страницу при успешной авторизации
            } else {
                alert(`Ошибка авторизации: ${response.error}`); // Выводим ошибку
            }
        });
    }

    registerFormAction(data) {
        ApiConnector.register(data, (response) => {
            console.log(response); // Логируем ответ сервера
            if (response.success) {
                // location.reload(); // Обновляем страницу при успешной регистрации
            } else {
                alert(`Ошибка регистрации: ${response.error}`); // Выводим ошибку
            }
        });
    }
}
