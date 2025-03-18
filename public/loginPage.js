"use strict";

const userForm = new UserForm();

userForm.loginFormCallback = function(data) {
    // Выполняем запрос на сервер для авторизации
    ApiConnector.login({ login: data.login, password: data.password }, (response) => {
        console.log(response); // Смотрим, что возвращает сервер

        // Проверяем успешность запроса
        if (response.success) {
            // Если успешный запрос, обновляем страницу
            location.reload();
        } else {
            // В случае ошибки выводим сообщение
            setLoginErrorMessage(response.error || "Ошибка авторизации");
        }
    });
};

// Присваиваем свойству registerFormCallback функцию
userForm.registerFormCallback = function(data) {
    // Выполняем запрос на сервер для регистрации
    ApiConnector.register({ login: data.login, password: data.password }, (response) => {
        console.log(response); // Смотрим, что возвращает сервер

        // Проверяем успешность запроса
        if (response.success) {
            // Если успешный запрос, обновляем страницу
            location.reload();
        } else {
            // В случае ошибки выводим сообщение
            setRegisterErrorMessage(response.error || "Ошибка регистрации");
        }
    });
};

