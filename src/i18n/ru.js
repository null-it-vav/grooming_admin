let ru = {
    language: "Русский",
    app: {
        components: {
            main: {
                selected_salon: "Выбранный салон"
            },
            dashboard: {
                title: "Dashboard"
            },
            login: {
                head_title: "CRM cистема для грумеров, которая поможет вам вывести бизнес на новый уровень.",
                title: "Панель управления",
                username: "Логин",
                password: "Пароль",
                login: "Войти",
                reset_password: "Восстановить пароль",
            },
            services: {
                create: "Создать услугу",
                update: "Обновить услугу",
                not_found: "Услуги не заполнены",
                field: {
                    name: 'Название',
                    description: 'Описание',
                    price: 'Цена, от',
                    type: 'Тип',
                    duration: 'Продолжительность, мин',
                    image: 'Фото',
                }
            },
            salons: {
                create: "Создать салон",
                update: "Обновить салон",
                fields: {
                    address: 'Адрес'
                }
            },
            promotions: {
                create: "Создать акцию",
                update: "Обновить акцию",
                not_found: "Акций нет",
                fields: {
                    name: "Заголок",
                    description: "Описание",
                    start: "Дата начала",
                    finish: "Дата конца",
                },
                statuses: {
                    expect: "Ожидает",
                    active: "Активна",
                    inactive: "Завершена",
                }
            },
            masters: {
                create: "Создать мастера",
                update: "Обновить мастера",
                fields: {
                    name: 'ФИО',
                    email: 'Email',
                    password: 'Пароль для входа',
                    password_confirmation: "Подтвердите пароль",
                    position: 'Должность',
                    photo: 'Фото',
                    schedule: 'Часы работы',
                    description: 'Описание',
                    profit: 'Процент прибыли от заказа',
                    salon: 'Салон',
                }
            },
            orders: {
                create: "Создать запись",
                update: "Обновить запись",
                not_found: "Заказов нет",
                filters: {
                    master_select: "Выбрать мастера",
                    status_select: "Выбрать статус",
                },
                fields: {
                    name: 'Имя владельца',
                    phone: 'Телефон',
                    email: 'Email',
                    nickname: 'Кличка питомца',
                    comment: 'Комментарий',
                    master: 'Мастер',
                    date: 'Дата',
                    time_start: 'Время',
                    status: 'Статус',
                },
                statuses: {
                    NEW: 'Новый',
                    CONFIRMED: 'Подтвержден',
                    COMPLITED: 'Завершена',
                    REJECTED: 'Отклонена',
                    PENALTY: 'Не состоялась'
                },
                tooltip: {
                    check: 'Подтвердить заказ',
                    penalty: 'Клиент не пришел',
                    rejected: 'Клиент отказался заранее',
                }
            },
            settings: {
                tabs: {
                    base: "Базовые",
                    push_app: "Уведомления и приложение",
                    schedule: "Расписание работы"
                },
                name: 'Название',
                phone: 'Телефон',
                site: 'Сайт',
                email: 'Email',
                schedule: 'Расписание',
                schedule_step: 'Шаг расписания, мин',
                timezone: 'Временная зона',
                lang: 'Язык',
                notif_before: 'Уведомление о предстоящем сеансе, мин',
                notif_after: 'Уведомление после визита через, дней',
                text: 'Текст на главной страницы приложения',
                image: 'Фото на главной страницы приложения',
                tg_link: 'Ссылка на Telegram',
                wa_link: 'Ссылка на WhatsApp',
            },
            calendar: {
                new_order: "Новый заказ",
                new_action: "Новая акция",
                popup: {
                    orders: {
                        title: 'Список заказов'
                    }
                }
            }
        },
        titles: {
            home: {
                dashboard: 'Dashboard',
                calendar: 'Календарь',
                masters: 'Мастера',
                orders: 'Записи',
                salons: 'Салоны',
                services: 'Услуги',
                promotions: 'Акции',
                settings: 'Настройки',
            }
        },
        base: {
            create: 'Создать'
        }
    },
    base: {
        are_you_sure_delete: "Вы точно хотите удалить?",
        validation: {
            file_to_large: "Файл слишком большой",
            address_not_found: "Адрес не определился"
        },
        months: {
            1: "Январь",
            2: "Февраль",
            3: "Март",
            4: "Апрель",
            5: "Май",
            6: "Июнь",
            7: "Июль",
            8: "Август",
            9: "Сентябрь",
            10: "Октябрь",
            11: "Ноябрь",
            12: "Декабрь",
        },
        save: 'Сохранить',
        create: 'Создать',
        update: 'Обновить',
        delete: 'Удалить',
        service_type: "Тип услуги",
        select: "Выбрать...",
        service_types: {
            select: 'Выбрать..',
            cat: 'Кошка',
            dog: 'Собака',
            other: 'Другое',
        },
        find_me: "Найти меня",
        days: {
            0: "Пн",
            1: "Вт",
            2: "Ср",
            3: "Чт",
            4: "Пт",
            5: "Сб",
            6: "Вс",
        },
        popup: {
            error: 'Ошибка!',
            data_not_update: 'Данные не обновлены!',
        },
    }
}

export default ru
