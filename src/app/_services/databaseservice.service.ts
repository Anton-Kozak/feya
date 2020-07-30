import { Injectable } from '@angular/core';
import { Task } from '../_models/task';
import { AchievementRequirements } from '../_models/achievement-requirements'
import {
  setString,
  getString,
  hasKey,
  remove
} from 'tns-core-modules/application-settings';
import { BehaviorSubject, Subject } from 'rxjs';
import { Achievement } from '../_models/achievement';



var Sqlite = require("nativescript-sqlite");

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  currentTask = new BehaviorSubject<Task[]>([]);
  achievementObservable = new Subject<Achievement[]>();
  achievementObtained = new Subject<Achievement>();
  constructor() { }

  //allTasks: Task[] = [];


  get currentDate() {
    let dt = new Date();
    return (dt.getFullYear() + "-" + (dt.getMonth() + 1) + "-" + dt.getDate());
  }

  get taskStatusChange() {
    if (!hasKey('task_changed'))
      return 'false';
    return getString('task_changed');
  }


  public getdbConnection() {
    return new Sqlite('tasks');
  }

  checkDB() {
    return Sqlite.exists('tasks');
  }

  public closedbConnection() {
    new Sqlite('tasks')
      .then((db) => {
        db.close();
      });
  }

  createDataBase() {
    this.getdbConnection().then(db => {
      if (db !== null) {
        db.execSQL("CREATE TABLE IF NOT EXISTS daily_tasks (id INTEGER NOT NULL UNIQUE, message	TEXT NOT NULL, is_complete INTEGER NOT NULL, PRIMARY KEY(id AUTOINCREMENT))")
          .then(() => {
            this.seedTasks();
          }, error => {
            console.log("CREATE TABLE ERROR", error);
          });
        db.execSQL("create table if not exists achievements (id INTEGER NOT NULL UNIQUE, title TEXT NOT NULL, is_obtained INTEGER NOT NULL, PRIMARY KEY(id AUTOINCREMENT))")
          .then(() => {
            this.seedAchievements();
          }, error => {
            console.log("CREATE Achievements TABLE ERROR", error);
          });
        db.execSQL("create table if not exists tips (id INTEGER NOT NULL UNIQUE, tip TEXT NOT NULL, section TEXT NOT NULL, PRIMARY KEY(id AUTOINCREMENT))")
          .then(() => {
            this.seedTips();
          }, error => {
            console.log("CREATE tips TABLE ERROR", error);
          });
      }
      else {
        console.log('Error creating table');
      }
    });
  }


  seedTasks() {
    this.getdbConnection().then(db => {
      if (!hasKey('db_state')) {
        db.execSQL("insert into daily_tasks (message, is_complete) values ('Тщательно помыть под кроватью', 0)");
        db.execSQL("insert into daily_tasks (message, is_complete) values ('Отодвинуть диван и тщательно пропылесосить', 0)");
        db.execSQL("insert into daily_tasks (message, is_complete) values ('Протереть все светильники в доме', 0)");
        db.execSQL("insert into daily_tasks (message, is_complete) values ('Навести порядок на письменном столе', 0)");
        db.execSQL("insert into daily_tasks (message, is_complete) values ('Пропылесосить диван', 0)");
        db.execSQL("insert into daily_tasks (message, is_complete) values ('Закинуть в стирку покрывала, наматрасник', 0)");
        db.execSQL("insert into daily_tasks (message, is_complete) values ('Протереть все межкомнатные двери + ручки', 0)");
        db.execSQL("insert into daily_tasks (message, is_complete) values ('Почистить подписки в Инстаграм,чаты в Вайбере и телеграм', 0)");
        db.execSQL("insert into daily_tasks (message, is_complete) values ('Навести порядок в разделе Сохраненное', 0)");
        db.execSQL("insert into daily_tasks (message, is_complete) values ('Почистить заметки в телефоне', 0)");
        db.execSQL("insert into daily_tasks (message, is_complete) values ('Отчистить фартук кухни от жира', 0)");
        db.execSQL("insert into daily_tasks (message, is_complete) values ('Найти одну вещь в гардеробе которая абсолютно не нравится и избавиться от нее', 0)");
        db.execSQL("insert into daily_tasks (message, is_complete) values ('Перебрать всё нижнее бельё', 0)");
        db.execSQL("insert into daily_tasks (message, is_complete) values ('Перебрать носки', 0)");
        db.execSQL("insert into daily_tasks (message, is_complete) values ('Перебрать рецепты в бумажном варианте', 0)");
        db.execSQL("insert into daily_tasks (message, is_complete) values ('Отпустить одну пару обуви которая заставляет ноги страдать', 0)");
        db.execSQL("insert into daily_tasks (message, is_complete) values ('Очищаем электронную почту от спама и неактуальных писем', 0)");
        db.execSQL("insert into daily_tasks (message, is_complete) values ('Отпускаем книги, которые не хочется перечитывать', 0)");
        db.execSQL("insert into daily_tasks (message, is_complete) values ('Находим один пункт просроченной косметики', 0)");
        db.execSQL("insert into daily_tasks (message, is_complete) values ('Ревизия печатных инструкций от техники', 0)");
        db.execSQL("insert into daily_tasks (message, is_complete) values ('Найти и избавиться от старых журналов(если такие имеются)', 0)");
        db.execSQL("insert into daily_tasks (message, is_complete) values ('Перебрать приправы на актуальность и просрочку', 0)");
        db.execSQL("insert into daily_tasks (message, is_complete) values ('Очистить одну горизонтальную поверхность в доме от лишних вещей(полка, стол и т.д)', 0)");
        db.execSQL("insert into daily_tasks (message, is_complete) values ('Протереть все розетки в доме', 0)");
        db.execSQL("insert into daily_tasks (message, is_complete) values ('Очистить свой плейлист от 15 песен, которые больше не цепляют', 0)");
        db.execSQL("insert into daily_tasks (message, is_complete) values ('Ищем и избавляемся от ненужных визиток', 0)");
        db.execSQL("insert into daily_tasks (message, is_complete) values ('Находим и избавляемся от лишних шнуров и кабелей непонятного происхождения', 0)");
        db.execSQL("insert into daily_tasks (message, is_complete) values ('Сдаём в переработку, отдаём старые телефоны и батареи от них', 0)");
        db.execSQL("insert into daily_tasks (message, is_complete) values ('Провести ревизию лаков для ногтей. Избавится от высохших.', 0)");
        db.execSQL("insert into daily_tasks (message, is_complete) values ('Провести ревизию аптечки, избавится от просрочки', 0)");
        db.execSQL("insert into daily_tasks (message, is_complete) values ('Пересмотреть и выкинуть старые пластиковые контейнеры для еды', 0)");
        db.execSQL("insert into daily_tasks (message, is_complete) values ('Ищем брелки и магниты которые не радуют', 0)");
        db.execSQL("insert into daily_tasks (message, is_complete) values ('Найти самую древнюю еду в морозилке и приготовить её:)', 0)");
        db.execSQL("insert into daily_tasks (message, is_complete) values ('Пересмотреть все крупы в доме (просрочка, паразиты)', 0)");
        db.execSQL("insert into daily_tasks (message, is_complete) values ('Найти косметическое средство которое не подошло и найти ему новый дом', 0)");
        db.execSQL("insert into daily_tasks (message, is_complete) values ('Найти одну вещь подаренную вам,которая не понравилась и найти ей новый дом', 0)");
        db.execSQL("insert into daily_tasks (message, is_complete) values ('Тщательно перебрать канцелярию (отдать,выкинуть лишнее)', 0)");
        db.execSQL("insert into daily_tasks (message, is_complete) values ('Найти 1-2 неактуальных приложения в телефоне и удалить их', 0)");
        db.execSQL("insert into daily_tasks (message, is_complete) values ('Оцифровать нужную информацию с СД, ДВД дисков, отсканировать документы', 0)");
        db.execSQL("insert into daily_tasks (message, is_complete) values ('Отсортировать подарочные открытки', 0)");
        db.execSQL("insert into daily_tasks (message, is_complete) values ('Почистить старые и неактуальные контакты в телефоне', 0)");
        db.execSQL("insert into daily_tasks (message, is_complete) values ('Написать 5 вещей за которые вы благодарны', 0)");
        db.execSQL("insert into daily_tasks (message, is_complete) values ('Почистить входящие сообщения (email, телефон)', 0)");
        db.execSQL("insert into daily_tasks (message, is_complete) values ('Удалить 15 фотографий на которых вы себе не нравитесь, дубликаты', 0)");
        db.execSQL("insert into daily_tasks (message, is_complete) values ('Отписаться от людей которые вас не вдохновляют', 0)");
        db.execSQL("insert into daily_tasks (message, is_complete) values ('Придумать и прописать один пункт: как я могу улучшить своё здоровье', 0)");
        db.execSQL("insert into daily_tasks (message, is_complete) values ('Отписаться от рекламных рассылок', 0)");
        db.execSQL("insert into daily_tasks (message, is_complete) values ('Завести банку/ёмкость и собрать туда мелочь со всего дома', 0)");
        db.execSQL("insert into daily_tasks (message, is_complete) values ('Вспомнить свои заброшенные хобби проекты и раздать оставшиеся материалы', 0)");
        db.execSQL("insert into daily_tasks (message, is_complete) values ('Перебрать все документы, разложить по категориям', 0)");
        db.execSQL("insert into daily_tasks (message, is_complete) values ('Сделать по 2 ксерокопии самых важных документов', 0)");
        db.execSQL("insert into daily_tasks (message, is_complete) values ('Просмотреть свой гардероб и составить 5 готовых образов на каждый день, сфотографировать', 0)");
        db.execSQL("insert into daily_tasks (message, is_complete) values ('Отпустить 1 сентиментальную вещь, предварительно сфотографировав ее и поблагодарив', 0)");
        db.execSQL("insert into daily_tasks (message, is_complete) values ('Отыскать один элемент посуды со сколами, царапинами, трещинами и избавиться от него', 0)");
        db.execSQL("insert into daily_tasks (message, is_complete) values ('Прошерстите карманы одежды и рассортируйте содержимое', 0)");
        db.execSQL("insert into daily_tasks (message, is_complete) values ('Просмотрите все свои сумки, почистите,почините и избавьтесь от лишних', 0)");
        db.execSQL("insert into daily_tasks (message, is_complete) values ('Соберите пакет вещей на благотворительность', 0)");
        db.execSQL("insert into daily_tasks (message, is_complete) values ('Протрите экран телевизора, компьютера и телефона', 0)");
        db.execSQL("insert into daily_tasks (message, is_complete) values ('Протереть все зеркала в доме', 0)");
        db.execSQL("insert into daily_tasks (message, is_complete) values ('Пройдитесь по квартире и верните всё вещи,которые не на своих местах, туда где они должны быть', 0)");
        db.execSQL("insert into daily_tasks (message, is_complete) values ('Навести порядок в том самом ящике со всяким хламом вперемешку', 0)");
        db.execSQL("insert into daily_tasks (message, is_complete) values ('Заточите все свои ножи', 0)");
        db.execSQL("insert into daily_tasks (message, is_complete) values ('Загрузите в стирку весь кухонный текстиль', 0)");
        db.execSQL("insert into daily_tasks (message, is_complete) values ('Почистите решетку вытяжки от жира', 0)");
        db.execSQL("insert into daily_tasks (message, is_complete) values ('Тщательно вымойте мусорное ведро', 0)");
        db.execSQL("insert into daily_tasks (message, is_complete) values ('Протрите раковину, ванную/душ и всё поверхности в ванной комнате', 0)");
        db.execSQL("insert into daily_tasks (message, is_complete) values ('Достаньте ёмкость для порошка в стиральной машине и вычистите его', 0)");
        db.execSQL("insert into daily_tasks (message, is_complete) values ('Очистите расчёску от волос,промойте её с мылом или шампунем,просушите', 0)");
        db.execSQL("insert into daily_tasks (message, is_complete) values ('Тщательно отмыть обеденный стол с моющим средством', 0)");
        db.execSQL("insert into daily_tasks (message, is_complete) values ('Тщательно вымойте входную дверь + ручки', 0)");
        db.execSQL("insert into daily_tasks (message, is_complete) values ('Приведите в порядок входной коврик', 0)");
        db.execSQL("insert into daily_tasks (message, is_complete) values ('Найдите два предмета которые лежат не на своём месте и верните их домой', 0)");
        db.execSQL("insert into daily_tasks (message, is_complete) values ('Соберите по квартире всю грязную одежду и отнесите её в стирку', 0)");
        db.execSQL("insert into daily_tasks (message, is_complete) values ('Очистите прикроватные столики от лишнего, протрите их', 0)");
        db.execSQL("insert into daily_tasks (message, is_complete) values ('Сделайте ревизию всего постельного белья', 0)");
        db.execSQL("insert into daily_tasks (message, is_complete) values ('Найдите предмет одежды который не носили больше года и пристройте его', 0)");
        db.execSQL("insert into daily_tasks (message, is_complete) values ('Соберите в коробку всё,что требует ремонта. Назначьте дату починки', 0)");
        db.execSQL("insert into daily_tasks (message, is_complete) values ('Уделите время уходу за 3 парами обуви (чистка, воск)', 0)");
        db.execSQL("insert into daily_tasks (message, is_complete) values ('Очистите корзину на компьютере', 0)");
        db.execSQL("insert into daily_tasks (message, is_complete) values ('Протереть варочную поверхность печки', 0)");
        db.execSQL("insert into daily_tasks (message, is_complete) values ('Вычистить духовку с моющим средством', 0)");
        db.execSQL("insert into daily_tasks (message, is_complete) values ('Вычистить микроволновку с моющим средством', 0)");
        db.execSQL("insert into daily_tasks (message, is_complete) values ('Сложить все пластиковые пакеты в один большой,а также перебрать их', 0)");
        db.execSQL("insert into daily_tasks (message, is_complete) values ('Засыпать сахар в сахарницу, соль в солонку и перец в перечницу', 0)");
        db.execSQL("insert into daily_tasks (message, is_complete) values ('Вспомните все свои незавершённые дела, запишите их и поставьте дату их выполнения', 0)");
        db.execSQL("insert into daily_tasks (message, is_complete) values ('Рассортируйте материалы для хобби, избавьтесь от неактуально', 0)");
        db.execSQL("insert into daily_tasks (message, is_complete) values ('Протрите стиральную машинку, внутри и снаружи. А также за ней', 0)");
        db.execSQL("insert into daily_tasks (message, is_complete) values ('Вычистите ёмкость пылесоса, тщательно промойте все его части', 0)");
        db.execSQL("insert into daily_tasks (message, is_complete) values ('Проведите ревизию всех моющих средств в доме,составьте список покупок', 0)");
        db.execSQL("insert into daily_tasks (message, is_complete) values ('Проведите ревизию всего декора в квартире, всё ли отзывается и радует?', 0)");
        db.execSQL("insert into daily_tasks (message, is_complete) values ('Пропылесосить все ковровые покрытия в доме', 0)");
        db.execSQL("insert into daily_tasks (message, is_complete) values ('Вымыть все окна в квартире', 0)");
        db.execSQL("insert into daily_tasks (message, is_complete) values ('Протрите пыль с книг на полке', 0)");
        db.execSQL("insert into daily_tasks (message, is_complete) values ('Составить список книг, которые можно скачать в электронном варианте,и отпустить бумажные копии', 0)");
        db.execSQL("insert into daily_tasks (message, is_complete) values ('Удалите с носителей все фотографии плохого качества', 0)");
        db.execSQL("insert into daily_tasks (message, is_complete) values ('Отсканируйте 1-2 важных документа', 0)");
        db.execSQL("insert into daily_tasks (message, is_complete) values ('Установите таймер на 15 минут и за это время проведите сортировку материалов на компьютере', 0)");
        db.execSQL("insert into daily_tasks (message, is_complete) values ('Продублируйте всю свою ценную информацию и материалы на внешний жёсткий диск', 0)");
        db.execSQL("insert into daily_tasks (message, is_complete) values ('Переберите все свои напечатанные фотографии', 0)");
        db.execSQL("insert into daily_tasks (message, is_complete) values ('Протрите поверхность всех шкафов на кухне', 0)");
        setString('db_state', "filled");
      }
      else {
        console.log('Seed for tasks is not needed');
        console.log('Database is ', getString('db_state'));
      }
    });
  }

  seedAchievements() {
    this.getdbConnection().then(db => {
      if (!hasKey('achievements_state')) {
        db.execSQL("insert into achievements (title, is_obtained) values ('Заверши задания за 1 день!', 0)");
        db.execSQL("insert into achievements (title, is_obtained) values ('Заверши задания за 3 дня!', 0)");
        db.execSQL("insert into achievements (title, is_obtained) values ('Заверши задания за 7 дней!', 0)");
        db.execSQL("insert into achievements (title, is_obtained) values ('Заверши 3 задания на высокой сложносте!', 0)");
        setString('achievements_state', "filled");
        if (!hasKey('achievements')) {
          let achievement: AchievementRequirements =
          {
            completedDaysCount: 0,
            easyDifficultyDaysCount: 0,
            mediumDifficultyDaysCount: 0,
            hardDifficultyDaysCount: 0,
            allTasksCompleted: 0,
          };
          setString('achievements', JSON.stringify(achievement));
        }
      }
      else {
        console.log('Seed for achievements is not needed');
        console.log('Achievement state is ', getString('achievements_state'));
        console.log('Achievements are ', JSON.parse(getString(('achievements'))));
      }
    });
  }

  seedTips() {
    this.getdbConnection().then(db => {
      if (!hasKey('tips_state')) {
        //kitchen
        db.execSQL("insert into tips (tip, section) values ('Периодически избавляйтесь от посуды со сколами, старых контейнеров и поцарапанных сковородок', 'kitchen')");
        db.execSQL("insert into tips (tip, section) values ('Храните там, где используете. Например, кастрюли недалеко от плиты', 'kitchen')");
        db.execSQL("insert into tips (tip, section) values ('Квадратные ёмкости для сыпучих рациональнее используют пространство чем круглые того же объема', 'kitchen')");
        db.execSQL("insert into tips (tip, section) values ('Подпишите все пакеты и баночки со специями и укажите их срок годности', 'kitchen')");
        db.execSQL("insert into tips (tip, section) values ('Мойте посуду по мере готовки и в свободных промежутках', 'kitchen')");
        db.execSQL("insert into tips (tip, section) values ('Заведите привычку убирать на кухне вечером перед сном', 'kitchen')");
        db.execSQL("insert into tips (tip, section) values ('Ставьте таймер на 15 минут и уберите всё, что успеете за это время', 'kitchen')");
        db.execSQL("insert into tips (tip, section) values ('Накапайте несколько капель эфирного масла на дно мусорного ведра для приятного запаха. (Например, мятное или апельсиновое)', 'kitchen')");
        db.execSQL("insert into tips (tip, section) values ('Сетку-фильтр от вытяжки лучше замочить на ночь в воде с моющим, а потом очистить с помощью старой зубной щётки', 'kitchen')");
        db.execSQL("insert into tips (tip, section) values ('Все крупные и тяжёлые предметы лучше хранить в нижних ящиках, а лёгкие наверху', 'kitchen')");
        db.execSQL("insert into tips (tip, section) values ('Храните кухонные полотенца вертикально в выдвижных ящиках или органайзерах', 'kitchen')");
        db.execSQL("insert into tips (tip, section) values ('На маленьких кухнях нужно задействовать любое пространство, например, повесить крючки на внутреннюю поверхность дверей', 'kitchen')");
        db.execSQL("insert into tips (tip, section) values ('Повесьте магнитный держатель для ножей, и они всегда будут под рукой', 'kitchen')");
        db.execSQL("insert into tips (tip, section) values ('Поддерживайте все горизонтальные поверхности максимально чистыми и не захламленными', 'kitchen')");
        db.execSQL("insert into tips (tip, section) values ('Придерживайтесь принципа пролил - вытер, открыл - закрыл, просыпал - подмёл', 'kitchen')");
        db.execSQL("insert into tips (tip, section) values ('Выделите отдельные дни в календаре для тщательной очистки духовки, микроволновой печи и холодильника', 'kitchen')");
        db.execSQL("insert into tips (tip, section) values ('Обычный столовый уксус является отличным средством для уборки кухни. Чтобы избавиться от запаха, нужно настоять его на апельсиновой кожуре несколько недель в тёмном месте', 'kitchen')");
        //спальня
        db.execSQL("insert into tips (tip, section) values ('Периодически избавляйтесь от посуды со сколами, старых контейнеров и поцарапанных сковородок', 'kitchen')");
        db.execSQL("insert into tips (tip, section) values ('Прежде чем сразу застилать постель с утра, рекомендуется дать ей немного постоять не заправленной.', 'bedroom')");
        db.execSQL("insert into tips (tip, section) values ('Регулярно очищайте прикроватные тумбы от лишних вещей. Желательно каждый день.', 'bedroom')");
        db.execSQL("insert into tips (tip, section) values ('Пространство под кроватью можно использовать для хранения вещей в выдвижных ящиках или органайзерах.', 'bedroom')");
        db.execSQL("insert into tips (tip, section) values ('Поддерживайте чистоту окон в спальне чтобы туда поступало достаточно света.', 'bedroom')");
        db.execSQL("insert into tips (tip, section) values ('Менять постельное бельё нужно раз в неделю, максимум раз в 2 недели.', 'bedroom')");
        db.execSQL("insert into tips (tip, section) values ('Купите для спальни специальную корзину для грязного белья и уже использованных вещей.', 'bedroom')");
        db.execSQL("insert into tips (tip, section) values ('Излишек визуального шума и беспорядок в спальне может стать причиной бессонницы.', 'bedroom')");
        db.execSQL("insert into tips (tip, section) values ('Аллергены большая проблема для спальни. Протирайте пыль не реже чем раз в три дня.', 'bedroom')");
        db.execSQL("insert into tips (tip, section) values ('Периодически протирайте выключатели, ручки шкафов и дверей дезинфицирующим средством.', 'bedroom')");
        db.execSQL("insert into tips (tip, section) values ('Используйте внутреннюю поверхность дверей шкафа для подвесных органайзеров.', 'bedroom')");
        db.execSQL("insert into tips (tip, section) values ('Регулярно проветривайте спальню утром и вечером.', 'bedroom')");
        db.execSQL("insert into tips (tip, section) values ('Эфирное масло лаванды способствует успокоению и быстрому засыпанию (используйте в аромалампе или диффузоре).', 'bedroom')");
        //kid

        setString('tips_state', 'filled');
      };
    });
  }



  getAchievements() {
    this.getdbConnection().then(db => {
      if (hasKey('achievements_state') && hasKey('achievements')) {
        db.all('select * from achievements', (err, rows) => {
          this.achievementObservable.next(rows);
        })
      }
    });
  }


  checkTaskStatus() {
    if (hasKey('daily_tasks_status') && getString('daily_tasks_status') === 'completed_' + this.currentDate) {
      this.currentTask.next(null);
      return 'completed_today';
    }
    else if (hasKey('daily_tasks_status') && getString('daily_tasks_status') === 'recieved_' + this.currentDate) {
      return 'tasks_remain';
    }
    else if (!hasKey('daily_tasks_status')
      || (getString('daily_tasks_status') !== 'recieved_' + this.currentDate && getString('daily_tasks_status') !== 'completed_' + this.currentDate)) {
      return 'tasks_needed';
    }
  }

  getNewTasks(numberOfTasks?: number) {
    this.getdbConnection()
      .then(db => {
        db.all("SELECT * FROM daily_tasks where is_complete = 0 ORDER BY RANDOM() LIMIT ?", [numberOfTasks]).then((rows) => {
          let newTasks: Task[] = [];
          if (rows.length === 0) {
            this.resetAllTasks();
          }
          for (var row in rows) {
            newTasks.push({ id: rows[row][0], message: rows[row][1], is_complete: rows[row][2] });
          }
          this.currentTask.next(newTasks);
          setString('daily_tasks', JSON.stringify(this.currentTask.value));
          setString('daily_tasks_status', 'recieved_' + this.currentDate);
          console.log('Tasks for the day set: ', getString('daily_tasks'));
          setString('task_changed', 'false');
        }, error => {
          console.log("Error getting data", error);
        });
      });
  }

  resetAllTasks() {
    this.getdbConnection()
      .then(db => {
        db.all("update daily_tasks set is_complete = 0");
      })
  }

  completeAllTasks(){
    this.getdbConnection()
      .then(db => {
        db.all("update daily_tasks set is_complete = 1");
      })
  }

  getCurrentTasks() {
    this.currentTask.next(JSON.parse(getString('daily_tasks')));
  }


  completeSingleTask(index: number) {
    if (this.currentTask.value[index].is_complete == '0')
      this.currentTask.value[index].is_complete = '1'
    else if (this.currentTask.value[index].is_complete == '1') {
      this.currentTask.value[index].is_complete = '0'
    }
    setString('daily_tasks', JSON.stringify(this.currentTask.value));
  }

  completeDailyTasks(selectedDifficulty: number) {
    this.currentTask.value.forEach((value, index, array) => {
      this.getdbConnection()
        .then(db => {
          db.all("update daily_tasks set is_complete = 1 where id = ?", [value.id]);
          setString('daily_tasks_status', 'completed_' + this.currentDate);
          //удалять старые таски
        });
    })
    let achievementFile: AchievementRequirements = JSON.parse(getString(('achievements')))
    if (selectedDifficulty > -1) {
      switch (selectedDifficulty) {
        case 0:
          console.log('Easy ++');
          achievementFile.easyDifficultyDaysCount++;
          break;
        case 1:
          console.log('Medium ++');
          achievementFile.mediumDifficultyDaysCount++;
          break;
        case 2:
          console.log('Hard ++');
          achievementFile.hardDifficultyDaysCount++;
          break;
        default:
          console.log('I could not find the required change for the achievements file');
          break;
      }
      achievementFile.completedDaysCount++;
      setString('achievements', JSON.stringify(achievementFile));
      this.checkAchievements();
      console.log('Achievements after change', JSON.parse(getString(('achievements'))));
    }
    this.currentTask.next(null);
  }

  checkAchievements() {
    let achievementFile: AchievementRequirements = JSON.parse(getString(('achievements')));
    if (achievementFile.completedDaysCount === 1) {
      this.getdbConnection().then(db => {
        db.execSQL("update achievements set is_obtained = 1 where id = 1");
        this.achievementObtained.next({ title: 'Заверши задание за 1 день', is_obtained: 1 });
      });
    }
    else if (achievementFile.completedDaysCount === 3) {
      this.getdbConnection().then(db => {
        db.execSQL("update achievements set is_obtained = 1 where id = 2");
        this.achievementObtained.next({ title: 'Заверши задание за 3 дня', is_obtained: 1 });
      });
    }
    else if (achievementFile.completedDaysCount === 7) {
      this.getdbConnection().then(db => {
        db.execSQL("update achievements set is_obtained = 1 where id = 3");
        this.achievementObtained.next({ title: 'Заверши задание за 7 дней', is_obtained: 1 });
      });
    }
    this.getAchievements();

  }

  showAllTasks() {
    this.getdbConnection()
      .then(db => {
        db.all("SELECT * FROM daily_tasks").then((rows) => {
          console.log(rows);
        });
      });
    this.getdbConnection()
      .then(db => {
        //db.execSQL("update achievements set is_obtained = 1 where id = 1");
        db.all("SELECT * FROM achievements").then((rows) => {
          console.log(rows);
        });
      });
  }

  changeTask(index: number, id: number) {
    let taskToReplace;
    let currentIds = this.currentTask.value.map(task => task.id);
    let stringWithIds = currentIds.toString();
    this.getdbConnection()
      .then(db => {
        db.all("SELECT * FROM daily_tasks where is_complete = 0 and id not in (" + stringWithIds + ") ORDER BY RANDOM()").then((row) => {
          console.log(row);
          taskToReplace = { id: row[0][0], message: row[0][1], is_complete: row[0][2] };
          this.currentTask.value[index] = taskToReplace;
          //console.log(this.currentTask.value);
          setString('daily_tasks', JSON.stringify(this.currentTask.value));
          this.currentTask.next(this.currentTask.value);
          setString('task_changed', 'true');
        });
      });

  }

  resetTasks() {
    this.getdbConnection()
      .then(db => {
        db.all("update daily_tasks set is_complete = 0");
        db.all("update achievements set is_obtained = 0");
        setString('daily_tasks_status', 'reset');
        let achievement: AchievementRequirements =
        {
          completedDaysCount: 0,
          easyDifficultyDaysCount: 0,
          mediumDifficultyDaysCount: 0,
          hardDifficultyDaysCount: 0,
          allTasksCompleted: 0,
        };
        setString('achievements', JSON.stringify(achievement));
      });
  }
}

