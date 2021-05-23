let ru = {
    language: "Русский",
    app: {
        components: {
            admin: {
              organizations: {
                  create: "Создать организацию",
                  list: "Список организаций",
                  after_create: "После создания учетные данные будут отправлены на указанную почту",
                  select: "Выбрать организацию",
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
                      demo: 'Демо'
                  }
              }
            },
            users: {
              fields: {
                  name: 'ФИО',
                  email: 'Email',
                  organization_name: 'Организация',
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
                settings_by_breeds: "Настройка по породам",
                field: {
                    name: 'Название',
                    description: 'Описание',
                    price: 'Цена, от',
                    type: 'Тип',
                    duration: 'Продолжительность',
                    image: 'Фото (png до 1 мб)',
                    aggressive: 'Доплата за агрессивность',
                    aggressive_duration: '+ время',
                    aggressive_price: '+ цена',
                    koltun: 'Доплата за колтуны',
                    koltun_duration: '+ время',
                    koltun_price: '+ цена',
                    color_mark: 'Цвет услуги',
                    baby_dog: 'Цена за щенка',
                    baby_cat: 'Цена за котенка',
                    baby_price: 'Цена, от',
                    baby_duration: 'Продолжительность',
                },
                durations: {
                    30: '30 минут',
                    60: '1 час',
                    90: '1 час 30 мин',
                    120: '2 часа',
                    150: '2 часа 30 мин',
                    180: '3 часа',
                    210: '3 часа 30 мин',
                    240: '4 часа',
                },
                breeds: {
                    breed: 'Порода',
                    price: 'Цена',
                    duration: 'Продолжительность',
                    aggressive_duration: 'Агрессивность, + к времени',
                    aggressive_price: 'Агрессивность, + к цене',
                    koltun_duration: 'Колтуны, + к времени',
                    koltun_price: 'Колтуны, + к цене',
                }
            },
            salons: {
                create: "Создать салон",
                update: "Обновить салон",
                create_first: "Создайте свой первый салон!",
                fields: {
                    address: 'Адрес'
                },
                delete: {
                    are_you_sure: "Вы уверены что хотите удалить салон вместе с прикрепленными мастерами и записями?",
                    cancel: "Отменить",
                    confirm: "Уверен"
                }
            },
            promotions: {
                create: "Создать акцию",
                update: "Обновить акцию",
                not_found: "Акций нет",
                fields: {
                    name: "Заголовок",
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
                show_deleted: "Показать удаленных",
                confirm_delete: "Вы уверены что хотите удалить мастера?",
                set_me_master: "Я - мастер",
                active: 'Активен',
                fields: {
                    name: 'ФИО',
                    email: 'Email',
                    password: 'Пароль мастера для входа',
                    password_confirmation: "Подтвердите пароль",
                    position: 'Должность',
                    photo: 'Фото (png или jpg, до 1 мб)',
                    schedule: 'Часы работы',
                    description: 'Описание',
                    profit: 'Процент прибыли (для мастеров которые работают на проценте)',
                    salon: 'Салон',
                    date_start_work: 'Дата приема на работу'
                },
                need_photo_size: 'Изображение должно быть квадратное (рекомендуемое 400px на 400px)'
            },
            orders: {
                create: "Создать запись",
                update: "Обновить запись",
                not_found: "Записей нет",
                how_match: "Итоговая сумма:",
                filters: {
                    master_select: "Выбрать мастера",
                    full_schedule: "Общий календарь",
                    status_select: "Выбрать статус",
                },
                fields: {
                    name: 'Имя владельца',
                    phone: 'Телефон',
                    email: 'Email',
                    nickname: 'Питомец',
                    comment: 'Комментарий',
                    master: 'Мастер',
                    date: 'Дата',
                    time_start: 'Время',
                    status: 'Статус',
                    total_price: 'Итого, цена',
                    services: 'Услуги',
                    duration: 'Продолжительность',
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
                    check: 'Подтвердить запись',
                    penalty: 'Клиент не пришел',
                    rejected: 'Клиент отказался заранее',
                    end: 'Выполнено',
                    delete: 'Удалить'
                },
                to_all: 'Все записи',
                day_full: "Для выбранных услуг недостаточно свободного времени в выбранном дне!"
            },
            settings: {
                tabs: {
                    base: "Базовые",
                    app: "Приложение",
                    push: "Уведомления",
                    schedule: "Расписание",
                    tags: "Теги",
                    site: "Сайт",
                },
                name: 'Название',
                phone: 'Телефон',
                site: 'Сайт',
                email: 'Email',
                schedule: {
                    index: 'Расписание',
                    disabled: 'Заблокированное время'
                },
                schedule_step: 'Шаг расписания, мин',
                timezone: 'Временная зона',
                lang: 'Язык',
                notif_before_24h: 'Уведомление о предстоящем сеансе за 24 часа до начала',
                notif_before: 'Уведомление о предстоящем сеансе, мин',
                notif_after: 'Уведомление после визита через, дней',
                text: 'Текст на главной странице приложения',
                image: 'Фото на главной странице приложения (png или jpg, до 1 мб)',
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
                },
                enabled: 'Разблокировать день',
                disabled: 'Заблокировать день',
                disabled_time: 'Заблокировать время',
                disabled_save: 'Заблокировать',
            },
            user: {
                fields: {
                    telegram_id: 'Telegram id, указав его вы сможете получать уведомления о записях',
                    get_telegram_id: 'Для получения id напишите нашему боту в Telegram команду /start: ',
                    email_notifications: 'Получать уведомления на почту',
                    telegram_notifications: 'Получать уведомления в Telegram',
                }
            },
            clients: {
                show_3m_before: "Не были более 3х месяцев",
                fields: {
                    photo: "Фото",
                    phone: "Телефон",
                    email: "Email",
                    name: "Имя",
                    nickname: "Кличка",
                    last_order: "Последний визит",
                    last_services: "Последние услуги",
                    actions: "Действия",
                    discount_type: 'Постоянная скидка',
                    discount: 'Cкидка',
                    next_discount_type: 'Скидка на следующую запись',
                    tags: 'Теги'
                },
                discount_types: {
                    null: 'Нет',
                    total: 'Фиксированная скидка',
                    percent: 'Процент',
                },
                filters: {
                    phone: 'Телефон'
                },
                pets: {
                    fields: {
                        nickname: 'Ник',
                        breed: 'Порода',
                        tags: 'Теги',
                        birthday: 'День рождения',
                        aggressive: 'Агрессивный',
                    }
                },
                additional_phones: 'Дополнительные контакты',
                additional_phone: {
                    who: 'Кто',
                    name: 'Имя',
                    phone: 'Телефон'
                }
            },
            breeds: {
                name: 'Название',
                update: 'Обновить породу'
            },
            tags: {
                create: 'Добавить тэг',
                update: 'Обновить тэг',
                fields: {
                    name: 'Описание тэга',
                    code_title: 'Название тэга',
                    lang: 'Язык',
                    color_mark: 'Цвет тега',
                    type: 'Тип',
                    types: {
                        all: 'Все типы',
                        pet: 'Питомцы',
                        user: 'Пользователи'
                    }
                },
            },
            chats: {
                file: 'Файл',
                photo: 'Фото',
                order: 'Запись'
            }
        },
        titles: {
            home: {
                dashboard: 'Dashboard',
                admin: {
                    users: 'Пользователи',
                    breeds: 'Породы',
                },
                calendar: 'Календарь',
                masters: 'Мастера',
                master: {
                    show: 'Данные мастера'
                },
                orders: 'Записи',
                order: {
                  show: 'Запись'
                },
                salons: 'Салоны',
                services: 'Услуги',
                promotions: 'Акции',
                settings: {
                    index: 'Настройки',
                    base: 'Базовые настройки',
                    tags: 'Настройки тегов',
                    app: 'Настройки приложения',
                    push: 'Настройки уведомлений',
                    site: 'Настройки сайта',
                    schedule: 'Настройки расписания'
                },
                breeds: 'Породы',
                service: {
                    breeds: 'Настройка по породам',
                    schedule: 'Настройка по времени'
                },
                clients: 'Клиенты',
                client: {
                    show: 'Данные клиента',
                    pet: {
                        index: 'Данные питомца'
                    },
                    chat: 'Чат'
                },
                tags: 'Тэги'
            }
        },
        base: {
            create: 'Создать'
        }
    },
    base: {
        file_size: "Размер файла: {size} мб",
        demo: "Демо",
        demo_tooltip: "Укажите данный id в приложении Gav&Love для демо режима",
        are_you_sure_delete: "Вы точно хотите удалить?",
        validation: {
            auth_403: '«Пожалуйста, проверьте правильность написания логина и пароля.»',
            file_to_large: "Файл слишком большой",
            address_not_found: "Адрес не определился",
            image: {
                square: "Выбранное вами изображение должно быть квадратное"
            }
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
        reset: 'Сбросить',
        service_type: "Тип услуги",
        select: "Выбрать...",
        service_types: {
            null: "",
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
        total: 'Всего',
        durations: {
            30: '30 минут',
            60: '1 час',
            90: '1 час 30 мин',
            120: '2 часа',
            150: '2 часа 30 мин',
            180: '3 часа',
            210: '3 часа 30 мин',
            240: '4 часа',
            270: '4 часа 30 мин',
            300: '5 часов',
            330: '5 часов 30 мин',
            360: '6 часов',
            390: '6 часов 30 мин',
            420: '7 часов',
            450: '7 часов 30 мин',
            480: '8 часов',
        }
    },
    form: {
        services_types: {
          cat: "Кошка",
          dog: "Собака",
          other: "Другое",
        },
        services: "Услуги",
        services_no_select: "Услуга не выбрана",
        services_selected: "выбрано",
        select: "Выбрать",
        remove: "Убрать",
        select_services: "Выберите услуги",
        next: "Далее",
        select_salon: "Выбор салона",
        address: 'Адрес',
        select_master: 'Выбрать мастера',
        information: 'Информация',
        select_visit_date: "Выбрать дату посещения",
        select_visit_time: "Выбрать время посещения",
        order: {
            name: "Ваше имя:",
            nickname: "Кличка питомца:",
            phone: "Номер телефона:",
            email: "Электронная почта:",
            comment: "Комментарий:",
        },
        send: "Отправить заявку",
        request_send: "Заявка отправлена",
        will_contact: "Мы свяжемся с вами для уточнения деталей приема",
    }
}

export default ru
