// Quotes from Cyrus the Great and Reza Shah Pahlavi, shown on the
// subscription page. A different quote is picked on every visit
// (rotation state kept in localStorage so consecutive visits differ).

export interface KouroshQuote {
  fa: string;
  en: string;
  authorFa: string;
  authorEn: string;
}

export const QUOTES: KouroshQuote[] = [
  // ---- کوروش کبیر / Cyrus the Great ----
  {
    fa: 'من کوروش، شاه جهان، شاه بزرگ، شاه دادگر... آنگاه که بدون جنگ و پیکار وارد بابل شدم، نگذاشتم رنج و آزاری به مردم برسد.',
    en: 'I am Cyrus, king of the world, great king, righteous king... When I entered Babylon without war, I let no harm come to its people.',
    authorFa: 'کوروش کبیر — منشور کوروش',
    authorEn: 'Cyrus the Great — Cyrus Cylinder',
  },
  {
    fa: 'فرمان دادم تا بدن‌ها آزاد باشند از بندگی، و هیچ‌کس مردمان را به بردگی نگیرد.',
    en: 'I ordered that all are free to live without servitude, and that none may enslave another.',
    authorFa: 'کوروش کبیر',
    authorEn: 'Cyrus the Great',
  },
  {
    fa: 'هر ملتی آزاد است که آیین و باور خود را داشته باشد و من به باورهای همه مردمان احترام می‌گذارم.',
    en: 'Every nation is free to hold its own faith, and I honor the beliefs of all peoples.',
    authorFa: 'کوروش کبیر',
    authorEn: 'Cyrus the Great',
  },
  {
    fa: 'تا آن هنگام که من زنده‌ام، نخواهم گذاشت ستمی بر مردمان روا شود.',
    en: 'As long as I live, I shall not allow oppression to befall the people.',
    authorFa: 'کوروش کبیر',
    authorEn: 'Cyrus the Great',
  },
  {
    fa: 'من برای صلح آمده‌ام، نه برای جنگ؛ برای آبادانی، نه ویرانی.',
    en: 'I came for peace, not war; to build, not to destroy.',
    authorFa: 'کوروش کبیر',
    authorEn: 'Cyrus the Great',
  },
  {
    fa: 'سختی‌ها، سنگ‌های زیرین کاخ پیروزی‌اند.',
    en: 'Hardships are the foundation stones of the palace of victory.',
    authorFa: 'منسوب به کوروش کبیر',
    authorEn: 'Attributed to Cyrus the Great',
  },
  {
    fa: 'فرمانروای شایسته آن است که پیش از فرمان راندن بر دیگران، بر خویشتن فرمان براند.',
    en: 'A worthy ruler is one who rules himself before ruling others.',
    authorFa: 'منسوب به کوروش کبیر',
    authorEn: 'Attributed to Cyrus the Great',
  },
  {
    fa: 'بزرگی را نه با زور بازو، که با بخشش و دادگری به دست آور.',
    en: 'Attain greatness not by force of arms, but through generosity and justice.',
    authorFa: 'منسوب به کوروش کبیر',
    authorEn: 'Attributed to Cyrus the Great',
  },
  {
    fa: 'دست‌هایی که کمک می‌کنند، مقدس‌تر از لب‌هایی هستند که دعا می‌کنند.',
    en: 'Hands that help are holier than lips that pray.',
    authorFa: 'منسوب به کوروش کبیر',
    authorEn: 'Attributed to Cyrus the Great',
  },
  {
    fa: 'کارهای بزرگ با خطرهای بزرگ به دست می‌آیند.',
    en: 'Great deeds are achieved through great risks.',
    authorFa: 'منسوب به کوروش کبیر',
    authorEn: 'Attributed to Cyrus the Great',
  },
  {
    fa: 'تنوع اندیشه‌ها را ارج بنه، که از برخورد اندیشه‌هاست که روشنایی برمی‌خیزد.',
    en: 'Honor the diversity of thought, for light rises from the meeting of minds.',
    authorFa: 'منسوب به کوروش کبیر',
    authorEn: 'Attributed to Cyrus the Great',
  },
  {
    fa: 'عدالت را دوست بدار، حتی اگر به زیان تو باشد.',
    en: 'Love justice, even when it works against you.',
    authorFa: 'منسوب به کوروش کبیر',
    authorEn: 'Attributed to Cyrus the Great',
  },
  {
    fa: 'رهبری یعنی خدمت؛ هر که بیشتر خدمت کند، شایسته‌تر است.',
    en: 'Leadership is service; whoever serves most is most worthy.',
    authorFa: 'منسوب به کوروش کبیر',
    authorEn: 'Attributed to Cyrus the Great',
  },
  {
    fa: 'شهری که در آن داد نباشد، آباد نخواهد ماند.',
    en: 'A city without justice shall not remain prosperous.',
    authorFa: 'منسوب به کوروش کبیر',
    authorEn: 'Attributed to Cyrus the Great',
  },
  {
    fa: 'من ویرانه‌ها را آباد کردم و مردمان پراکنده را به خانه‌هایشان بازگرداندم.',
    en: 'I rebuilt the ruins and returned the scattered peoples to their homes.',
    authorFa: 'کوروش کبیر — منشور کوروش',
    authorEn: 'Cyrus the Great — Cyrus Cylinder',
  },
  {
    fa: 'آنچه را برای خود نمی‌پسندی، بر دیگران روا مدار.',
    en: 'Do not impose upon others what you would not accept for yourself.',
    authorFa: 'منسوب به کوروش کبیر',
    authorEn: 'Attributed to Cyrus the Great',
  },
  {
    fa: 'پیروزی راستین آن است که دل‌ها را به دست آوری، نه سرزمین‌ها را.',
    en: 'True victory is winning hearts, not lands.',
    authorFa: 'منسوب به کوروش کبیر',
    authorEn: 'Attributed to Cyrus the Great',
  },
  {
    fa: 'خداوندا، این کشور را از دروغ، از دشمن و از خشکسالی نگاه دار.',
    en: 'O Lord, protect this land from the lie, from the foe, and from drought.',
    authorFa: 'نیایش شاهان هخامنشی',
    authorEn: 'Prayer of the Achaemenid kings',
  },
  {
    fa: 'مدارا با شکست‌خوردگان، نشان بزرگی فاتح است.',
    en: 'Mercy toward the defeated is the mark of a great conqueror.',
    authorFa: 'منسوب به کوروش کبیر',
    authorEn: 'Attributed to Cyrus the Great',
  },
  {
    fa: 'امروزِ خود را چنان بساز که فردا از آن سربلند باشی.',
    en: 'Build your today so that tomorrow you stand proud of it.',
    authorFa: 'منسوب به کوروش کبیر',
    authorEn: 'Attributed to Cyrus the Great',
  },

  // ---- رضاشاه پهلوی / Reza Shah Pahlavi ----
  {
    fa: 'من خاک وطنم را از هر چیز در جهان بیشتر دوست دارم.',
    en: 'I love the soil of my homeland more than anything in this world.',
    authorFa: 'رضاشاه پهلوی',
    authorEn: 'Reza Shah Pahlavi',
  },
  {
    fa: 'ایران باید از نو ساخته شود؛ و ساختن ایران، کار ایرانیان است.',
    en: 'Iran must be rebuilt — and rebuilding Iran is the work of Iranians.',
    authorFa: 'رضاشاه پهلوی',
    authorEn: 'Reza Shah Pahlavi',
  },
  {
    fa: 'هر ایرانی باید بداند که آبادانی کشورش به دست خود اوست، نه بیگانگان.',
    en: 'Every Iranian must know that the prosperity of his country lies in his own hands, not in the hands of foreigners.',
    authorFa: 'رضاشاه پهلوی',
    authorEn: 'Reza Shah Pahlavi',
  },
  {
    fa: 'من سرباز ایرانم و تا آخرین نفس برای سربلندی این خاک خواهم کوشید.',
    en: 'I am a soldier of Iran, and to my last breath I shall strive for the honor of this land.',
    authorFa: 'رضاشاه پهلوی',
    authorEn: 'Reza Shah Pahlavi',
  },
  {
    fa: 'ملتی که به خود تکیه کند، هرگز خوار نخواهد شد.',
    en: 'A nation that relies on itself shall never be humiliated.',
    authorFa: 'رضاشاه پهلوی',
    authorEn: 'Reza Shah Pahlavi',
  },
  {
    fa: 'کار، کار و باز هم کار؛ راه نجات ایران همین است.',
    en: 'Work, work, and work again — this is the path to Iran’s salvation.',
    authorFa: 'رضاشاه پهلوی',
    authorEn: 'Reza Shah Pahlavi',
  },
  {
    fa: 'مدرسه بسازید؛ هر مدرسه‌ای که ساخته شود، دری از نادانی بسته می‌شود.',
    en: 'Build schools; with every school built, a door of ignorance is closed.',
    authorFa: 'رضاشاه پهلوی',
    authorEn: 'Reza Shah Pahlavi',
  },
  {
    fa: 'عظمت گذشته ایران باید چراغ راه آینده آن باشد.',
    en: 'The past greatness of Iran must be the guiding light of its future.',
    authorFa: 'رضاشاه پهلوی',
    authorEn: 'Reza Shah Pahlavi',
  },
  {
    fa: 'نظم و انضباط، نخستین شرط پیشرفت هر ملت است.',
    en: 'Order and discipline are the first conditions of any nation’s progress.',
    authorFa: 'رضاشاه پهلوی',
    authorEn: 'Reza Shah Pahlavi',
  },
  {
    fa: 'راه‌آهن، شریان حیات ایران نوین است؛ آن را با دست و پول ایرانی ساختیم.',
    en: 'The railway is the lifeline of modern Iran — we built it with Iranian hands and Iranian money.',
    authorFa: 'رضاشاه پهلوی',
    authorEn: 'Reza Shah Pahlavi',
  },
  {
    fa: 'من از هیچ قدرتی در جهان نمی‌ترسم؛ ترس من از نادانی و تفرقه است.',
    en: 'I fear no power in this world; my fear is of ignorance and division.',
    authorFa: 'رضاشاه پهلوی',
    authorEn: 'Reza Shah Pahlavi',
  },
  {
    fa: 'ایرانی باید به ایرانی بودن خود ببالد.',
    en: 'An Iranian must take pride in being Iranian.',
    authorFa: 'رضاشاه پهلوی',
    authorEn: 'Reza Shah Pahlavi',
  },
  {
    fa: 'آینده از آنِ ملتی است که امروزش را به بطالت نگذراند.',
    en: 'The future belongs to the nation that does not waste its today in idleness.',
    authorFa: 'رضاشاه پهلوی',
    authorEn: 'Reza Shah Pahlavi',
  },
  {
    fa: 'وطن‌پرستی یعنی هر کس در هر جایگاهی، کار خود را درست انجام دهد.',
    en: 'Patriotism means that everyone, in every station, does his duty well.',
    authorFa: 'رضاشاه پهلوی',
    authorEn: 'Reza Shah Pahlavi',
  },
  {
    fa: 'استقلال واقعی، استقلال اقتصادی است.',
    en: 'True independence is economic independence.',
    authorFa: 'رضاشاه پهلوی',
    authorEn: 'Reza Shah Pahlavi',
  },
];

const ROTATION_KEY = 'kp-quote-order';

interface RotationState {
  order: number[];
  pos: number;
}

function shuffled(n: number): number[] {
  const arr = Array.from({ length: n }, (_, i) => i);
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function readRotation(): RotationState | null {
  try {
    const raw = localStorage.getItem(ROTATION_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as RotationState;
    if (!Array.isArray(parsed.order) || parsed.order.length !== QUOTES.length) return null;
    if (typeof parsed.pos !== 'number' || parsed.pos < 0) return null;
    return parsed;
  } catch {
    return null;
  }
}

// Returns a different quote on every visit: quotes are consumed from a
// shuffled cycle persisted in localStorage; when the cycle is exhausted a
// fresh shuffle begins. Falls back to a plain random pick without storage.
export function nextQuote(): KouroshQuote {
  let state = readRotation();
  if (!state || state.pos >= state.order.length) {
    state = { order: shuffled(QUOTES.length), pos: 0 };
  }
  const quote = QUOTES[state.order[state.pos]] ?? QUOTES[0];
  try {
    localStorage.setItem(ROTATION_KEY, JSON.stringify({ order: state.order, pos: state.pos + 1 }));
  } catch {
    // storage unavailable (private mode) — random pick is fine
  }
  return quote;
}
