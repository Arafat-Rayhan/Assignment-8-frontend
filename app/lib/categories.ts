 


 export type Category = {
  slug: string;
  name: string;
  summary: string;
  sections: { heading: string; body: string }[];
};

export const categories: Category[] = [
  // ইবাদত ও ঈমান
  {
    slug: "tawhid",
    name: "Tawhid",
    summary: "Tawhid is the belief that Allah is One, with no partner. Every other part of faith grows from it.",
    sections: [
      { heading: "What it means", body: "Worship, hope and trust belong to Allah alone. Surah Al-Ikhlas (112) is a short, clear statement of this belief." },
      { heading: "Why it matters", body: "A heart attached to one Lord is free from fear of people, love of status and dependence on things that cannot help. This brings steadiness and peace." },
      { heading: "How to live it", body: "Make dua to Allah directly, rely on Him after doing your part, and avoid ascribing power to charms, fortune tellers or anything besides Him." },
    ],
  },
  {
    slug: "salah",
    name: "Salah",
    summary: "Salah is the daily connection between a servant and Allah, and the second pillar of Islam.",
    sections: [
      { heading: "Why it matters", body: "Prayer is the first thing a person is asked about on the Day of Judgement, and it is the line between a life centred on Allah and a life that forgets Him." },
      { heading: "Its effect on a person", body: "Surah Al-Ankabut (29:45) says prayer restrains from immorality and wrongdoing. Five fixed times also bring order and calm to the day." },
      { heading: "How to be regular", body: "Set reminders, pray in congregation when you can, make wudu early, and start with the prayer you find hardest instead of leaving it for last." },
    ],
  },
  {
    slug: "quran",
    name: "Quran learning and recitation",
    summary: "The Quran is the guidance for mankind. Learning to read it, understand it and live by it is a lifelong journey.",
    sections: [
      { heading: "Its virtue", body: "The Prophet ﷺ said the best of you are those who learn the Quran and teach it (Sahih al-Bukhari)." },
      { heading: "Recitation and understanding", body: "Learn correct recitation with a teacher, then read the meaning in a language you understand so the words reach the heart." },
      { heading: "A daily habit", body: "A small portion every day is better than a large portion once in a while. Choose a fixed time, such as after Fajr, and keep to it." },
    ],
  },
  {
    slug: "fasting-ramadan",
    name: "Fasting and Ramadan",
    summary: "Fasting in Ramadan is a pillar of Islam and a training in self-control, gratitude and mercy.",
    sections: [
      { heading: "Its purpose", body: "Surah Al-Baqarah (2:183) says fasting was prescribed so that believers may attain taqwa, awareness of Allah." },
      { heading: "More than hunger", body: "Fasting also means guarding the tongue, the eyes and the temper. Hunger teaches us to feel for those who go without." },
      { heading: "Making the most of Ramadan", body: "Pray taraweeh, recite and reflect on the Quran, give charity, and seek Laylat al-Qadr in the last ten nights." },
    ],
  },
  {
    slug: "zakat-charity",
    name: "Zakat and charity",
    summary: "Zakat is an obligatory share of wealth given to those in need. It purifies the giver and supports the community.",
    sections: [
      { heading: "A pillar of Islam", body: "Zakat is one of the five pillars. Surah At-Tawbah (9:103) describes charity as something that purifies and cleanses." },
      { heading: "Who gives and who receives", body: "It is due on wealth that reaches the nisab and stays for a full lunar year. It goes to the poor, the needy and the other categories named in the Quran." },
      { heading: "Beyond zakat", body: "The Prophet ﷺ taught that charity does not decrease wealth (Sahih Muslim). Even a smile or a small gift counts as sadaqah." },
    ],
  },
  {
    slug: "hajj-umrah",
    name: "Hajj and Umrah",
    summary: "Hajj is the pilgrimage to the House of Allah, required once in a lifetime for those who are able. Umrah is the lesser pilgrimage.",
    sections: [
      { heading: "A duty and a gift", body: "Surah Al-Imran (3:97) makes Hajj a duty for those who can make the journey. The Prophet ﷺ said an accepted Hajj has no reward less than Paradise (Bukhari and Muslim)." },
      { heading: "What it teaches", body: "Pilgrims wear simple white cloth and stand together on one plain. Rich and poor, young and old, all are equal before Allah." },
      { heading: "Preparing well", body: "Earn the expenses lawfully, learn the rites beforehand, settle debts and ask forgiveness from those you have wronged before you leave." },
    ],
  },
  {
    slug: "dhikr-dua",
    name: "Dhikr and dua",
    summary: "Dhikr is remembering Allah, and dua is calling upon Him. Both keep the heart alive and close to its Lord.",
    sections: [
      { heading: "Peace for the heart", body: "Surah Ar-Raad (13:28) says that hearts find rest in the remembrance of Allah." },
      { heading: "Dua is worship", body: "Allah invites His servants to ask Him, and He is near and responds (Surah Al-Baqarah 2:186). Ask for the needs of this life and the next." },
      { heading: "Simple habits", body: "Say the morning and evening adhkar, praise Allah after each prayer, and make dua in the last third of the night and between the adhan and iqamah." },
    ],
  },
  {
    slug: "seerah",
    name: "Seerah of the Prophet ﷺ",
    summary: "The Seerah is the life story of the Prophet Muhammad ﷺ, the best example for every believer.",
    sections: [
      { heading: "A model to follow", body: "Surah Al-Ahzab (33:21) says the Messenger of Allah is an excellent example for those who hope for Allah and the Last Day." },
      { heading: "Character before everything", body: "He was known as truthful and trustworthy even before prophethood. His mercy reached family, neighbours, strangers and even those who harmed him." },
      { heading: "Learning from it", body: "Read the Seerah from reliable books, reflect on how he faced hardship with patience, and apply one lesson to your own life each week." },
    ],
  },
  {
    slug: "hadith",
    name: "Hadith study",
    summary: "Hadith are the recorded words, actions and approvals of the Prophet ﷺ. They explain and apply the Quran.",
    sections: [
      { heading: "Why we need them", body: "The Quran gives the principles, and the Sunnah shows how to practise them, such as how to pray, fast and give zakat." },
      { heading: "Authenticity matters", body: "Scholars checked chains of narrators with great care. Learn from trusted collections such as Sahih al-Bukhari and Sahih Muslim, and do not pass on sayings without knowing their source." },
      { heading: "How to begin", body: "Start with a short collection of forty hadith with explanation, learn one a week, and act on it before moving to the next." },
    ],
  },
  {
    slug: "tawbah",
    name: "Tawbah",
    summary: "Tawbah is returning to Allah with regret and a promise to change. His mercy is greater than any sin.",
    sections: [
      { heading: "Never despair", body: "Surah Az-Zumar (39:53) calls to those who have wronged themselves: do not lose hope in the mercy of Allah." },
      { heading: "The conditions", body: "Stop the sin, feel sincere regret, resolve not to return, and if someone was wronged, return their right or ask their forgiveness." },
      { heading: "Keep going", body: "If you slip again, repent again. Follow a bad deed with a good one, and stay with people who help you stay on the path." },
    ],
  },
  // চরিত্র ও সমাজ
  {
    slug: "honesty",
    name: "Honesty and trustworthiness",
    summary: "Truthfulness and keeping trusts are signs of faith and the foundation of a healthy community.",
    sections: [
      { heading: "The path to Paradise", body: "The Prophet ﷺ said truthfulness leads to righteousness, and righteousness leads to Paradise (Bukhari and Muslim)." },
      { heading: "Amanah", body: "A trust includes money, secrets, a job and a promise. Surah An-Nisa (4:58) commands that trusts be returned to their owners." },
      { heading: "In daily life", body: "Be honest in business, do not cheat in exams or work, keep your word, and avoid even small lies and exaggeration." },
    ],
  },
  {
    slug: "parents",
    name: "Rights of parents",
    summary: "Kindness to parents comes right after worship of Allah. It is a duty and a path to His pleasure.",
    sections: [
      { heading: "A command from Allah", body: "Surah Al-Isra (17:23-24) tells us to be kind to parents and never to say a word of disrespect, even a sigh, when they grow old." },
      { heading: "What it looks like", body: "Speak gently, listen patiently, care for their needs, visit them often and make dua for them, in life and after death." },
      { heading: "When it is hard", body: "Even when you disagree, respond with patience and respect. Seek help from family or a trusted elder if the relationship is strained." },
    ],
  },
  {
    slug: "family-marriage",
    name: "Family and marriage",
    summary: "Marriage is a blessing built on mercy, love and shared responsibility, and the family is the first school of faith.",
    sections: [
      { heading: "A sign of Allah", body: "Surah Ar-Rum (30:21) says that Allah created spouses for one another and placed love and mercy between them." },
      { heading: "Rights and duties", body: "Spouses owe each other kindness, honesty, support and respect. The Prophet ﷺ said the best of you are those best to their families (Tirmidhi)." },
      { heading: "Strong homes", body: "Pray together, make time for each other, settle disagreements calmly and raise children with both discipline and affection." },
    ],
  },
  {
    slug: "relatives-neighbours",
    name: "Relatives and neighbours",
    summary: "Islam asks us to keep family ties and treat neighbours well, because strong communities start close to home.",
    sections: [
      { heading: "A clear command", body: "Surah An-Nisa (4:36) tells us to do good to parents, relatives, orphans, the poor and neighbours near and far." },
      { heading: "The neighbour’s right", body: "The Prophet ﷺ said Jibril kept advising him about the neighbour until he thought the neighbour would become an heir (Bukhari and Muslim)." },
      { heading: "Small acts", body: "Greet, visit when someone is sick, share food, avoid disturbing them with noise, and never cut ties over small disputes." },
    ],
  },
  {
    slug: "patience-anger",
    name: "Patience and controlling anger",
    summary: "Patience and self-control are signs of strength. They protect relationships and bring the company of Allah.",
    sections: [
      { heading: "True strength", body: "The Prophet ﷺ said the strong person is the one who controls himself in anger (Bukhari and Muslim)." },
      { heading: "Allah is with the patient", body: "Surah Al-Baqarah (2:153) says Allah is with those who are patient. Surah Al-Imran (3:134) praises those who restrain their anger and forgive people." },
      { heading: "In the moment", body: "Pause before you speak, change your posture, seek refuge in Allah from Shaytan, make wudu, and step away until you are calm." },
    ],
  },
 // চরিত্র ও সমাজ
  {
    slug: "honesty",
    name: "Honesty and trustworthiness",
    summary: "Truthfulness and keeping trusts are signs of faith and the foundation of a healthy community.",
    sections: [
      { heading: "The path to Paradise", body: "The Prophet ﷺ said truthfulness leads to righteousness, and righteousness leads to Paradise (Bukhari and Muslim)." },
      { heading: "Amanah", body: "A trust includes money, secrets, a job and a promise. Surah An-Nisa (4:58) commands that trusts be returned to their owners." },
      { heading: "In daily life", body: "Be honest in business, do not cheat in exams or work, keep your word, and avoid even small lies and exaggeration." },
    ],
  },
  {
    slug: "parents",
    name: "Rights of parents",
    summary: "Kindness to parents comes right after worship of Allah. It is a duty and a path to His pleasure.",
    sections: [
      { heading: "A command from Allah", body: "Surah Al-Isra (17:23-24) tells us to be kind to parents and never to say a word of disrespect, even a sigh, when they grow old." },
      { heading: "What it looks like", body: "Speak gently, listen patiently, care for their needs, visit them often and make dua for them, in life and after death." },
      { heading: "When it is hard", body: "Even when you disagree, respond with patience and respect. Seek help from family or a trusted elder if the relationship is strained." },
    ],
  },
  {
    slug: "family-marriage",
    name: "Family and marriage",
    summary: "Marriage is a blessing built on mercy, love and shared responsibility, and the family is the first school of faith.",
    sections: [
      { heading: "A sign of Allah", body: "Surah Ar-Rum (30:21) says that Allah created spouses for one another and placed love and mercy between them." },
      { heading: "Rights and duties", body: "Spouses owe each other kindness, honesty, support and respect. The Prophet ﷺ said the best of you are those best to their families (Tirmidhi)." },
      { heading: "Strong homes", body: "Pray together, make time for each other, settle disagreements calmly and raise children with both discipline and affection." },
    ],
  },
  {
    slug: "relatives-neighbours",
    name: "Relatives and neighbours",
    summary: "Islam asks us to keep family ties and treat neighbours well, because strong communities start close to home.",
    sections: [
      { heading: "A clear command", body: "Surah An-Nisa (4:36) tells us to do good to parents, relatives, orphans, the poor and neighbours near and far." },
      { heading: "The neighbour’s right", body: "The Prophet ﷺ said Jibril kept advising him about the neighbour until he thought the neighbour would become an heir (Bukhari and Muslim)." },
      { heading: "Small acts", body: "Greet, visit when someone is sick, share food, avoid disturbing them with noise, and never cut ties over small disputes." },
    ],
  },
  {
    slug: "patience-anger",
    name: "Patience and controlling anger",
    summary: "Patience and self-control are signs of strength. They protect relationships and bring the company of Allah.",
    sections: [
      { heading: "True strength", body: "The Prophet ﷺ said the strong person is the one who controls himself in anger (Bukhari and Muslim)." },
      { heading: "Allah is with the patient", body: "Surah Al-Baqarah (2:153) says Allah is with those who are patient. Surah Al-Imran (3:134) praises those who restrain their anger and forgive people." },
      { heading: "In the moment", body: "Pause before you speak, change your posture, seek refuge in Allah from Shaytan, make wudu, and step away until you are calm." },
    ],
  },
 {
    slug: "avoid-backbiting",
    name: "Avoiding backbiting and gossip",
    summary: "Backbiting is speaking about someone in their absence in a way they would dislike. It harms hearts and breaks trust.",
    sections: [
      { heading: "A serious warning", body: "Surah Al-Hujurat (49:12) compares backbiting to eating the flesh of your dead brother, something everyone would find repulsive." },
      { heading: "The damage", body: "It spreads suspicion, destroys friendships and takes away good deeds. A community that gossips cannot trust each other." },
      { heading: "How to avoid it", body: "Change the subject, leave the gathering, speak well of people or stay silent, and if you have wronged someone, ask their forgiveness." },
    ],
  },
  {
    slug: "modesty-hijab",
    name: "Modesty and hijab",
    summary: "Modesty is part of faith. It covers behaviour, speech, the gaze and dress, for men and women alike.",
    sections: [
      { heading: "Part of faith", body: "The Prophet ﷺ said modesty is a branch of faith (Bukhari and Muslim). It is a quality that protects dignity." },
      { heading: "Dress and conduct", body: "Surah An-Nur (24:30-31) and Surah Al-Ahzab (33:59) guide believing men and women on lowering the gaze and dressing modestly." },
      { heading: "With kindness", body: "Hijab is an act of worship that comes from love for Allah. It should be encouraged with gentleness, never with harshness or shame." },
    ],
  },
  {
    slug: "halal-income",
    name: "Halal income and avoiding interest",
    summary: "Earning lawfully brings blessing in wealth and acceptance in worship, while interest and unjust gain bring harm.",
    sections: [
      { heading: "Trade is lawful", body: "Surah Al-Baqarah (2:275) says Allah has permitted trade and forbidden riba, which is interest." },
      { heading: "Why it matters", body: "Interest-based debt traps families and widens the gap between rich and poor. Honest work and fair dealing build trust and real prosperity." },
      { heading: "Practical steps", body: "Choose honest work, avoid cheating and hidden defects in sales, stay away from interest-based loans where possible, and seek halal alternatives." },
    ],
  },

  // ক্ষতিকর বিষয় থেকে বাঁচা
  {
    slug: "avoid-pornography",
    name: "Staying away from pornography",
    summary: "Pornography harms the heart, the mind and relationships. This gathering calls people to protect themselves and help one another.",
    sections: [
      { heading: "Why it is harmful", body: "Pornography builds a habit that is hard to break. Many people describe guilt, secrecy and loss of focus. It teaches a false picture of intimacy and can damage trust in marriage." },
      { heading: "What Islam teaches", body: "Allah commands believers to lower their gaze and guard their private parts (Surah An-Nur 24:30-31). Guarding the eyes protects the heart before it reaches the deed." },
      { heading: "How to protect yourself", body: "Keep devices in open places, use content filters, avoid being alone with screens late at night, fill free time with prayer and healthy activity, and speak to a trusted friend or scholar early." },
      { heading: "If you have fallen", body: "Turn back to Allah with sincere tawbah. His mercy is greater than any sin. Seek support, because recovery is easier with others." },
    ],
  },
 {
    slug: "avoid-drugs",
    name: "Staying away from drugs and addiction",
    summary: "Drugs and intoxicants destroy health, families and futures. Islam forbids them to protect the mind and life.",
    sections: [
      { heading: "A clear prohibition", body: "Surah Al-Ma’idah (5:90) calls intoxicants a filth from the work of Shaytan. The Prophet ﷺ said every intoxicant is forbidden (Sahih Muslim)." },
      { heading: "The harm", body: "Addiction damages the body and brain, drains money, leads to crime and breaks the bonds of family. Many young people fall into it through friends or stress." },
      { heading: "Prevention and recovery", body: "Choose friends who help you stay clean, learn to say no, and seek medical and counselling help early. Recovery is possible, and Allah’s mercy remains open." },
    ],
  },
  {
    slug: "avoid-gambling",
    name: "Staying away from gambling",
    summary: "Gambling promises quick money but brings loss, debt and enmity. Islam forbids it for the good of individuals and families.",
    sections: [
      { heading: "What Allah says", body: "Surah Al-Ma’idah (5:90-91) lists gambling with intoxicants and says Shaytan wants to cause hatred between people and keep them from the remembrance of Allah." },
      { heading: "The harm", body: "It feeds greed, creates debt, ruins families and teaches people to depend on luck instead of honest work. Online betting makes it easy to lose control." },
      { heading: "Healthy alternatives", body: "Earn through halal work, save steadily, avoid betting apps and games with real-money wagers, and seek help if you cannot stop." },
    ],
  },
  {
    slug: "avoid-bribery",
    name: "Staying away from bribery and corruption",
    summary: "Bribery and corruption steal the rights of others and spread injustice through society.",
    sections: [
      { heading: "A grave sin", body: "The Prophet ﷺ cursed the one who gives a bribe and the one who takes it (Abu Dawud and Tirmidhi). Surah Al-Baqarah (2:188) forbids using wealth to unjustly take what belongs to others." },
      { heading: "Its effects", body: "It takes jobs, services and justice from those who deserve them, and teaches people that rights can be bought. A corrupt society loses trust and prosperity." },
      { heading: "What we can do", body: "Refuse to give or take bribes, be honest in your own work, report wrongdoing through proper channels, and teach children that honesty is worth more than gain." },
    ],
  },
  {
    slug: "avoid-superstition",
    name: "Staying away from superstition",
    summary: "Islam frees the mind from fear of omens, charms and fortune tellers, and ties hope to Allah alone.",
    sections: [
      { heading: "Only Allah knows the unseen", body: "Surah An-Naml (27:65) says that none in the heavens or on earth knows the unseen except Allah." },
      { heading: "Fortune tellers and charms", body: "The Prophet ﷺ warned that if someone goes to a fortune teller and asks about anything, his prayer is not accepted for forty nights (Sahih Muslim). Charms, black threads and lucky signs have no power." },
      { heading: "The better way", body: "Rely on Allah, make dua, take lawful means such as medicine and effort, and learn authentic knowledge so doubts do not push you toward false beliefs." },
    ],
  },
  {
    slug: "phones-social-media",
    name: "Healthy use of phones and social media",
    summary: "Phones can serve good, but endless scrolling steals time, focus and peace. We are asked to use our time wisely.",
    sections: [
      { heading: "Time is a trust", body: "The Prophet ﷺ said there are two blessings many people lose: health and free time (Sahih al-Bukhari)." },
      { heading: "Leaving what does not concern you", body: "Part of good Islam is leaving what does not concern you (Tirmidhi). Surah Al-Mu’minun (23:3) praises believers who turn away from idle talk." },
      { heading: "Practical habits", body: "Set daily limits, turn off non-essential notifications, keep the phone away at prayer and meals, and use the time you save for family, Quran and learning." },
    ],
  },

  // যুব ও কমিউনিটি
  {
    slug: "youth",
    name: "Guidance for youth",
    summary: "Youth is a gift and a test. A young person who grows up in worship and good character gains great honour with Allah.",
    sections: [
      { heading: "Honoured by Allah", body: "The Prophet ﷺ said that among those shaded by Allah on the Day of Judgement is a young person who grew up in the worship of Allah (Bukhari and Muslim)." },
      { heading: "Common struggles", body: "Peer pressure, screens, relationships and uncertainty about the future can pull young people away from their values. You are not alone in this." },
      { heading: "Building a strong youth", body: "Keep your prayers, choose good friends, learn your religion, serve your community and speak to a trusted elder or mentor when in doubt." },
    ],
  },
  {
    slug: "intro-to-islam",
    name: "Introduction to Islam",
    summary: "A gentle introduction to what Muslims believe, how they worship and how Islam guides daily life, for anyone who is curious.",
    sections: [
      { heading: "What Muslims believe", body: "Belief in one God, His angels, His books, His messengers, the Last Day and divine decree. Muhammad ﷺ is the final Messenger." },
      { heading: "The five pillars", body: "The declaration of faith, prayer, zakat, fasting in Ramadan and Hajj for those who are able." },
      { heading: "Open to everyone", body: "There is no compulsion in religion (Surah Al-Baqarah 2:256). Ask questions freely, visit a local mosque and learn at your own pace." },
    ],
  },
  {
    slug: "tawakkul",
    name: "Tawakkul and peace of heart",
    summary: "Tawakkul is trusting Allah fully after doing your best. It brings calm in times of worry and loss.",
    sections: [
      { heading: "Allah is enough", body: "Surah At-Talaq (65:3) says that whoever relies on Allah, He is sufficient for him." },
      { heading: "Effort and trust together", body: "The Prophet ﷺ taught to tie your camel and then trust Allah (Tirmidhi). Make a plan, work hard, then leave the result to Him." },
      { heading: "Finding peace", body: "Say your dhikr, be grateful for what you have, accept what is beyond your control and remember that every hardship passes by Allah’s decree." },
    ],
  },
  {
    slug: "orphans-poor",
    name: "Helping orphans and the poor",
    summary: "Caring for orphans and the needy is one of the most beloved acts to Allah and a mark of a living community.",
    sections: [
      { heading: "Close to the Prophet ﷺ", body: "The Prophet ﷺ said that he and the one who looks after an orphan will be as close as two fingers in Paradise (Sahih al-Bukhari)." },
      { heading: "Ways to help", body: "Sponsor an orphan, share food, pay school fees, visit those in need and give regular charity even if the amount is small." },
      { heading: "With dignity", body: "Give quietly, without making people feel small, and look for those who do not ask. Support them with kindness, education and work." },
    ],
  },
  {
    slug: "cleanliness-environment",
    name: "Cleanliness and caring for the environment",
    summary: "Cleanliness is part of faith, and the earth is a trust from Allah that we must protect.",
    sections: [
      { heading: "Half of faith", body: "The Prophet ﷺ said purification is half of faith (Sahih Muslim). Muslims are taught to keep body, clothes, home and streets clean." },
      { heading: "A trust from Allah", body: "The Prophet ﷺ said that a tree planted or a crop sown from which a bird, a person or an animal eats counts as charity for the planter (Sahih al-Bukhari)." },
      { heading: "Simple actions", body: "Do not litter, save water and electricity, plant trees, clean mosques and public places together, and teach children to care for the environment." },
    ],
  },
  {
    slug: "seeking-knowledge",
    name: "Seeking knowledge",
    summary: "Islam honours knowledge. Learning about Allah, His religion and the world is an act of worship.",
    sections: [
      { heading: "Honour of the learned", body: "Surah Az-Zumar (39:9) asks whether those who know are equal to those who do not know. Surah Ta-Ha (20:114) teaches us to ask Allah to increase us in knowledge." },
      { heading: "A path to Paradise", body: "The Prophet ﷺ said that whoever takes a path to seek knowledge, Allah makes easy for him a path to Paradise (Sahih Muslim)." },
      { heading: "How to learn", body: "Learn from reliable teachers and books, start with the basics of faith and worship, be humble about what you do not know and act on what you learn." },
    ],
  },
];

export const categorySlugs = categories.map((c) => c.slug);

export const getCategory = (slug: string) =>
  categories.find((c) => c.slug === slug);