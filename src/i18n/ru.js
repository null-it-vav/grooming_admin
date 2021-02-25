let ru = {
    language: "Русский",
    app: {
        components: {
            admin: {
              organizations: {
                  create: "Создать организацию",
                  list: "Список организаций",
                  after_create: "После создания учетные данные будут отправлены на указанную почту",
                  fields: {
                      name: "Название",
                      email: "Email",
                      phone: "Телефон",
                      created_at: "Создана",
                      org_name: "Название",
                      user_name: "ФИО",
                      user_email: "Email",
                      user_phone: "Телефон",
                      org_timezone: "Таймзона",
                      org_lang: "Язык",
                  }
              }
            },
            main: {
                selected_salon: "Выбранный салон"
            },
            dashboard: {
                title: "Dashboard",
                orders_by_day_now: "Записи на сегодня",
            },
            login: {
                head_title: "CRM cистема для грумеров, которая поможет вам вывести бизнес на новый уровень.",
                title: "Панель управления",
                username: "Логин",
                email: "Email",
                password: "Пароль",
                password_confirmation: "Повторите пароль",
                login: "Войти",
                reset: "Восстановить",
                reset_password: "Забыли пароль?",
                reset_password_form: "Восстановить пароль",
                auth: "Вспомнили логин и пароль?",
                get_demo: "Получить демо доступ",
                get_demo_button: "Получить демо",
                login_exist: "У меня есть данные для входа",
                url_invalid: "Ссылка для восстановления неверная!"
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
                    profit: 'Процент прибыли',
                    salon: 'Салон',
                }
            },
            orders: {
                create: "Создать запись",
                update: "Обновить запись",
                not_found: "Записей нет",
                how_match: "Итоговая сумма заказа:",
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
                    total_price: 'Итого, цена',
                },
                statuses: {
                    NEW: 'Новый',
                    CONFIRMED: 'Подтвержден',
                    COMPLETED: 'Завершена',
                    REJECTED: 'Отклонена',
                    PENALTY: 'Не состоялась',

                },
                actions: {
                    edit: 'Редактировать',
                    check: 'Подтвердить заказ',
                    penalty: 'Клиент не пришел',
                    rejected: 'Клиент отказался заранее',
                    end: 'Выполнено'
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
                text: 'Текст на главной странице приложения',
                image: 'Фото на главной странице приложения',
                tg_link: 'Ссылка на Telegram',
                wa_link: 'Ссылка на WhatsApp',
            },
            calendar: {
                new_order: "Новая запись",
                new_action: "Новая акция",
                popup: {
                    orders: {
                        title: 'Список записей'
                    }
                }
            },
            user: {
                fields: {
                    telegram_id: 'Telegram id, указав его вы сможете получать уведомления о записях',
                    get_telegram_id: 'Для получения id напишите нашему боту команду /start: ',
                    email_notifications: 'Получать уведомления на почту',
                    telegram_notifications: 'Получать уведомления в Telegram',
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
        data_update: 'Данные обновлены.',
        popup: {
            error: 'Ошибка!',
            data_not_update: 'Данные не обновлены!',
        },
        total: 'Всего'
    }
}

export default ru
