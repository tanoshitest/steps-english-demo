// v6: buổi học đổi từ 6 task sang 8 task theo khung 10 Step của trung tâm.
// `taskDone` lưu theo chỉ số task nên phải đổi khoá, không dùng lại state cũ được.
const STORAGE_KEY = "steps-demo-state-v6";

const lessonCatalog = {
  "Say hello": {
    order: 11,
    program: "2019 Khóa 1",
    publishStatus: "published",
    subtitle: "Phản xạ hỏi đáp: tên, tuổi, quê quán và sở thích.",
    story: "Bạn nhỏ làm quen với lớp mới và trả lời 8 câu hỏi phản xạ.",
    song: "Bài hát chào hỏi Hello, what's your name?",
    vocabulary: ["name", "old", "from", "today", "favourite", "color", "animal", "food", "toy"],
    structure: [
      "What's your name?",
      "How old are you?",
      "Where are you from?",
      "How are you today?",
      "What's your favourite color/animal/food/toy?",
    ],
    phonics: ["/a/", "ant", "pan"],
    moral: "Tự tin giới thiệu bản thân và lắng nghe bạn.",
  },
  "Colours & animals": {
    order: 12,
    program: "2019 Khóa 1",
    publishStatus: "published",
    subtitle: "Màu sắc, con vật và tín hiệu đèn giao thông.",
    story: "Brown bear, brown bear — con vật nào đang nhìn bạn?",
    song: "Bài hát màu sắc và con vật quen thuộc.",
    vocabulary: ["brown", "red", "yellow", "blue", "green", "purple", "white", "black", "bear", "bird", "duck", "horse", "frog", "cat", "dog", "sheep", "fish"],
    structure: [
      "What's your favourite color?",
      "What's your favourite animal?",
      "Green light - Go.",
      "Yellow light - Go slowly.",
      "Red light - Stop.",
    ],
    phonics: ["/s/", "sat", "sit"],
    moral: "Yêu quý con vật và tuân thủ tín hiệu giao thông.",
  },
  "I can do it": {
    order: 13,
    program: "2019 Khóa 1",
    publishStatus: "published",
    subtitle: "Động từ hành động và mẫu câu I can ...",
    story: "Câu chuyện vận động cùng cả lớp trong giờ ra chơi.",
    song: "Bài hát I can dance, I can jump.",
    vocabulary: ["dance", "shake", "jump", "hop", "stomp", "clap"],
    structure: ["I can dance.", "I can shake.", "I can jump.", "I can hop.", "I can stomp.", "I can clap."],
    phonics: ["/p/", "pat", "tap"],
    moral: "Mạnh dạn vận động và tham gia cùng bạn.",
  },
  "My morning": {
    order: 14,
    program: "2019 Khóa 1",
    publishStatus: "published",
    subtitle: "Hoạt động buổi sáng và đồ dùng cá nhân.",
    story: "In the morning, I wake up… một buổi sáng của bạn nhỏ.",
    song: "Bài hát thói quen buổi sáng trước khi tới lớp.",
    vocabulary: ["wake up", "get out of bed", "wash my face", "comb my hair", "eat breakfast", "get dressed", "go to school", "toothbrush", "toothpaste", "comb", "mirror", "soap", "bowl", "spoon", "flower"],
    structure: [
      "Where is the flower? - Here.",
      "What color is the flower? - Orange flower.",
      "Pink/Yellow/Blue/White/Purple/Red flower.",
    ],
    phonics: ["/t/", "tin", "tap"],
    moral: "Tự lập với thói quen buổi sáng.",
  },
  "Head, shoulders, knees": {
    order: 15,
    program: "2019 Khóa 1",
    publishStatus: "published",
    subtitle: "Bộ phận cơ thể với This is / These are.",
    story: "Câu chuyện chỉ và gọi tên các bộ phận cơ thể.",
    song: "Head, shoulders, knees and toes.",
    vocabulary: ["head", "shoulders", "knees", "toes", "nose", "mouth", "eyes", "ears"],
    structure: [
      "This is my head.",
      "This is my nose/mouth.",
      "These are my shoulders/eyes/ears.",
      "These are my knees/toes.",
    ],
    phonics: ["/n/", "nose", "pin"],
    moral: "Giữ vệ sinh và chăm sóc cơ thể mỗi ngày.",
  },
  "Put on your clothes": {
    order: 16,
    program: "2019 Khóa 1",
    publishStatus: "published",
    subtitle: "Trang phục và mẫu câu Put on your ...",
    story: "Câu chuyện mặc đồ gọn gàng trước khi tới lớp.",
    song: "Bài hát Put on your shoes.",
    vocabulary: ["shirt", "T-shirt", "shoes", "hat", "jacket", "scarf", "pants"],
    structure: [
      "Put on your shoes.",
      "Put on your shirt.",
      "Put on your hat.",
      "Put on your T-shirt.",
      "Put on your pants.",
      "Put on your jacket.",
      "Put on your scarf.",
    ],
    phonics: ["/i/", "sit", "pin"],
    moral: "Tự mặc đồ gọn gàng và đúng thời tiết.",
  },
  "Phonics group 1": {
    order: 17,
    program: "2019 Khóa 1",
    publishStatus: "editing",
    subtitle: "Nhóm âm a, i, p, s, n, t và luyện ghép vần.",
    story: "Câu chuyện ghép vần cùng sáu âm đầu tiên.",
    song: "Bài hát phonics a - i - p - s - n - t.",
    vocabulary: ["pan", "sat", "sit", "tap", "pat", "pin", "tin", "ant"],
    structure: ["Sound it out: p - a - n → pan.", "Blend: s - i - t → sit.", "What sound is this?"],
    phonics: ["a", "i", "p", "s", "n", "t"],
    moral: "Kiên nhẫn luyện ghép vần mỗi ngày.",
  },
  "Nice to meet you": {
    order: 18,
    program: "Seed 39 Khóa 2",
    publishStatus: "published",
    subtitle: "Phản xạ hỏi đáp mở đầu khóa 2.",
    story: "Bạn nhỏ gặp lại lớp cũ và giới thiệu sở thích mới.",
    song: "Bài hát chào hỏi đầu buổi Hello, hello.",
    vocabulary: ["name", "old", "from", "today", "favourite", "color", "animal", "food", "toy"],
    structure: [
      "What's your name?",
      "How old are you?",
      "Where are you from?",
      "How are you today?",
      "What's your favourite color/animal/food/toy?",
    ],
    phonics: ["/s/", "sat", "sit"],
    moral: "Chủ động bắt chuyện và hỏi lại bạn.",
  },
  "My school things": {
    order: 19,
    program: "Seed 39 Khóa 2",
    publishStatus: "published",
    subtitle: "Đồ dùng học tập, khai thác màu sắc - vị trí - số lượng trong tranh.",
    story: "Một vòng quanh lớp học và gọi tên mọi thứ nhìn thấy.",
    song: "Bài hát This is a pencil, this is a book.",
    vocabulary: ["ruler", "crayon", "eraser", "pen", "bag", "chair", "table", "pencil", "book", "board", "teacher", "student", "classroom"],
    structure: [
      "This is a ruler/crayon/eraser/pen/bag.",
      "This is a chair/table/pencil/book/board.",
      "She is a teacher.",
      "They are students.",
      "This is a classroom.",
    ],
    phonics: ["/a/", "bag", "hat"],
    moral: "Giữ gìn đồ dùng học tập của mình và của bạn.",
  },
  "School lunch": {
    order: 20,
    program: "Seed 39 Khóa 2",
    publishStatus: "published",
    subtitle: "Bữa trưa ở trường và tính từ mô tả món ăn.",
    story: "Giờ ăn trưa: mỗi bạn kể món mình mang theo.",
    song: "Bài hát I have a sandwich for lunch.",
    vocabulary: ["sandwich", "cookie", "orange", "yogurt", "tomato", "carrot", "yummy", "crunchy", "juicy", "sweet", "tasty", "delicious"],
    structure: [
      "I have a sandwich for lunch.",
      "The sandwich is yummy.",
      "The cookie is crunchy.",
      "The orange is juicy.",
      "The yogurt is sweet.",
      "The carrot is tasty.",
    ],
    phonics: ["/t/", "tomato", "tin"],
    moral: "Ăn đủ chất và không bỏ thừa thức ăn.",
  },
  "My body parts": {
    order: 21,
    program: "Seed 39 Khóa 2",
    publishStatus: "published",
    subtitle: "Bộ phận cơ thể mở rộng với This is / These are.",
    story: "Bạn nhỏ soi gương và gọi tên từng bộ phận cơ thể.",
    song: "Bài hát This is my face, these are my hands.",
    vocabulary: ["hair", "face", "arms", "hands", "body", "legs", "foot", "feet"],
    structure: [
      "This is my hair/face/body.",
      "These are my arms/hands/legs.",
      "This is my foot.",
      "These are my feet.",
    ],
    phonics: ["/h/", "hair", "hand"],
    moral: "Hiểu và chăm sóc cơ thể mình.",
  },
  "My toy box": {
    order: 22,
    program: "Seed 39 Khóa 2",
    publishStatus: "published",
    subtitle: "Đồ chơi quen thuộc và cách chia sẻ với bạn.",
    story: "Giờ chơi: các bạn mang đồ chơi tới lớp và đổi cho nhau.",
    song: "Bài hát My teddy bear, my little ball.",
    vocabulary: ["doll", "teddy bear", "ball", "kite", "robot", "alien", "balloon"],
    structure: [
      "This is my doll/teddy bear/ball.",
      "I have a kite/robot/balloon.",
      "What's your favourite toy?",
    ],
    phonics: ["/d/", "doll", "red"],
    moral: "Chia sẻ đồ chơi và cất gọn sau khi chơi.",
  },
  "Where is it?": {
    order: 23,
    program: "Seed 39 Khóa 2",
    publishStatus: "published",
    subtitle: "Giới từ chỉ vị trí và mẫu câu Where is the ...?",
    story: "Chú chó trốn tìm khắp phòng — bạn nhỏ đi tìm.",
    song: "Bài hát In, on, under, next to.",
    vocabulary: ["in", "on", "under", "next to", "in front of", "behind", "between", "box", "table", "chair", "wall", "pillow", "dog"],
    structure: [
      "Where is the dog? - The dog is in the box.",
      "The dog is on the table.",
      "The dog is under the chair.",
      "The dog is next to the wall.",
      "The dog is in front of / behind the pillow.",
      "The dog is between the chairs.",
    ],
    phonics: ["/n/", "next", "in"],
    moral: "Quan sát kỹ và mô tả chính xác vị trí.",
  },
  "Jolly phonics 1 & 2": {
    order: 24,
    program: "Seed 39 Khóa 2",
    publishStatus: "editing",
    // Tài liệu gốc ghi nhóm 1 là "a, t, s, t, p, n, i" (lặp chữ t).
    // Dùng thứ tự Jolly Phonics chuẩn: s, a, t, i, p, n.
    subtitle: "Jolly phonics nhóm 1 (s a t i p n) và nhóm 2 (ck e h r m d).",
    story: "Câu chuyện ghép vần với mười hai âm đầu tiên.",
    song: "Bài hát Jolly phonics group 1 và group 2.",
    vocabulary: ["sat", "pin", "tap", "nip", "hen", "red", "duck", "mat", "hat", "men", "dip", "rat"],
    structure: [
      "Sound it out: s - a - t → sat.",
      "Blend: d - u - ck → duck.",
      "What sound does it start with?",
    ],
    phonics: ["s", "a", "t", "i", "p", "n", "ck", "e", "h", "r", "m", "d"],
    moral: "Luyện âm đều đặn để đọc trơn hơn mỗi tuần.",
  },
};

const programList = ["Movers", "Flyers", "2019 Khóa 1", "Seed 39 Khóa 2"];

const lessonOrder = Object.keys(lessonCatalog);

const stateDefaults = {
  currentRole: "student",
  activePage: "welcome",
  activeStudentPage: "profile",
  activeAdminPage: "dashboard",
  // Roadmap đi 3 tầng: chưa chọn chương trình → lưới chương trình;
  // chọn chương trình mà chưa chọn Day → danh sách Day; chọn cả hai → trang học.
  roadmapProgram: "",
  roadmapDay: 0,
  selectedUnit: "Say hello",
  spiralProgram: "2019 Khóa 1",
  selectedDay: 1,
  studentLessonStep: "listen",
  storyStep: 2,
  // Trang học của một Day: task nào đang mở, task nào đã xong, đã trả lời gì.
  // `taskDone` và `taskAnswers` khoá theo "chương trình|buổi" nên đổi buổi là sạch.
  activeTask: 0,
  taskDone: {},
  taskAnswers: {},
  stars: 330,
  unitProgress: 42,
  completedActivities: ["story", "song"],
  answers: {},
  missionProgress: { story: true, games: 0, speaking: 0 },
  reviewStatus: { "/z/": "Needs Practice", "Do you like ___?": "Learning", giraffe: "Strong" },
  aiDrafts: ["Lucy and the Lost Zebra"],
  approvedContent: ["Milo's Crazy Day at the Zoo", "The Zoo Song"],
};

const adminUi = {
  query: "",
  roleFilter: "all",
  programFilter: "all",
  gradeFilter: "all",
  syllabusFilter: "all",
  feeFilter: "all",
  selectedGrade: "",
  selectedLesson: "",
};

// Học viên đang đăng nhập ở vai "Học sinh" — khớp với HV001 trong danh sách quản trị.
const studentProfile = {
  code: "HV001",
  name: "Anna Nguyễn",
  className: "2019 K1 A1",
  program: "2019 Khóa 1",
  teacher: "Cô Hoa Lê",
  schedule: "Thứ 2 · 4 · 6 · 18:00 – 18:45",
  joined: "12/03/2026",
  birthday: "05/09/2019",
  parent: "Chị Ngọc Nguyễn · 0912 345 678",
};

const adminUsers = [
  { code: "HV001", name: "Anna Nguyễn", role: "Học viên", roleKey: "student", className: "2019 K1 A1", status: "Đang học", statusKey: "active" },
  { code: "HV002", name: "Minh Trần", role: "Học viên", roleKey: "student", className: "2019 K1 A1", status: "Đang học", statusKey: "active" },
  { code: "HV003", name: "Lucy Phạm", role: "Học viên", roleKey: "student", className: "Movers B1", status: "Tạm nghỉ", statusKey: "paused" },
  { code: "HV004", name: "Khoa Lê", role: "Học viên", roleKey: "student", className: "Flyers C1", status: "Đang học", statusKey: "active" },
  { code: "GV001", name: "Cô Hoa Lê", role: "Giáo viên", roleKey: "teacher", className: "2019 Khóa 1 / Movers", status: "Đang dạy", statusKey: "active" },
  { code: "GV002", name: "Thầy Nam Vũ", role: "Giáo viên", roleKey: "teacher", className: "Flyers", status: "Đang dạy", statusKey: "active" },
  { code: "QT001", name: "Quản trị viên", role: "Quản trị", roleKey: "admin", className: "—", status: "Hoạt động", statusKey: "active" },
];

const adminGrading = [
  { code: "NOP-118", student: "Anna Nguyễn", className: "2019 K1 A1", lesson: "Head, shoulders, knees", type: "Nói", step: "speak", submitted: "Hôm nay", score: "—", status: "Chờ chấm", statusKey: "pending", answer: "This is my head.", comment: "" },
  { code: "NOP-117", student: "Minh Trần", className: "2019 K1 A1", lesson: "Say hello", type: "Nghe", step: "listen", submitted: "Hôm qua", score: "9/10", status: "Đã chấm", statusKey: "done", choices: [0, 1, 0], comment: "Nghe rõ, chọn đúng 3/3." },
  { code: "NOP-116", student: "Lucy Phạm", className: "Seed 39 K2 B1", lesson: "My toy box", type: "Phonics", step: "phonics", submitted: "2 ngày trước", score: "—", status: "Chờ chấm", statusKey: "pending", answer: "teddy", comment: "" },
  { code: "NOP-115", student: "Khoa Lê", className: "Seed 39 K2 B1", lesson: "Where is it?", type: "Viết", step: "say", submitted: "3 ngày trước", score: "8/10", status: "Đã chấm", statusKey: "done", answer: "The ball is under the table.", comment: "Đúng cấu trúc, viết hoa đầu câu tốt." },
  { code: "NOP-114", student: "Anna Nguyễn", className: "2019 K1 A1", lesson: "Say hello", type: "Nói", step: "speak", submitted: "4 ngày trước", score: "7/10", status: "Cần xem lại", statusKey: "review", answer: "My name Anna.", comment: "Thiếu 'is' trong câu." },
];

const adminSyllabus = [
  { code: "SYL-MOV", name: "Movers Success", level: "Movers", units: 12, owner: "Cô Hoa Lê", status: "Đang soạn", statusKey: "editing" },
  { code: "SYL-FLY", name: "Flyers Success", level: "Flyers", units: 12, owner: "Thầy Nam Vũ", status: "Bản nháp", statusKey: "draft" },
  { code: "SYL-19K1", name: "Chương Trình 2019 Khóa 1", level: "2019 Khóa 1", units: 7, owner: "Cô Hoa Lê", status: "Đã xuất bản", statusKey: "published" },
  { code: "SYL-39K2", name: "Chương Trình Seed 39 Khóa 2", level: "Seed 39 Khóa 2", units: 7, owner: "Cô Hoa Lê", status: "Đã xuất bản", statusKey: "published" },
];

const adminFees = [
  { code: "HP-001", student: "Anna Nguyễn", className: "2019 K1 A1", course: "2019 Khóa 1", total: 4800000, paid: 4800000, due: "05/08/2026", method: "Chuyển khoản", status: "Đã đóng", statusKey: "done" },
  { code: "HP-002", student: "Minh Trần", className: "2019 K1 A1", course: "2019 Khóa 1", total: 4800000, paid: 2400000, due: "20/08/2026", method: "Tiền mặt", status: "Còn nợ", statusKey: "pending" },
  { code: "HP-003", student: "Lucy Phạm", className: "Movers B1", course: "Movers", total: 6200000, paid: 1500000, due: "01/08/2026", method: "Chuyển khoản", status: "Quá hạn", statusKey: "review" },
  { code: "HP-004", student: "Khoa Lê", className: "Flyers C1", course: "Flyers", total: 7500000, paid: 7500000, due: "10/08/2026", method: "Chuyển khoản", status: "Đã đóng", statusKey: "done" },
];

function formatVnd(amount) {
  return `${Number(amount).toLocaleString("vi-VN")}đ`;
}

function fixUnitName(name) {
  return lessonCatalog[name] ? name : lessonOrder[0];
}

function getLesson(name) {
  return lessonCatalog[fixUnitName(name)];
}

function lessonProgram(lesson) {
  return lesson?.program || programList[0];
}

function programUnits(program) {
  return lessonOrder.filter((name) => lessonProgram(lessonCatalog[name]) === program);
}

function unitIndex(name) {
  const unit = fixUnitName(name);
  return programUnits(lessonProgram(lessonCatalog[unit])).indexOf(unit) + 1;
}

// Lộ trình xoắn ốc: mỗi mảng ngôn ngữ (strand) vào bài một lần rồi quay lại
// theo khoảng cách giãn dần. Đổi số ở `intro` là cả ma trận tự tính lại.
// Số buổi của một khoá. Đổi số này thì mọi chỗ hiển thị tự đổi theo,
// nhưng lịch `intro` bên dưới phải nằm trong khoảng 1..SPIRAL_SESSIONS.
const SPIRAL_SESSIONS = 20;
// Roadmap chia thành chặng đều nhau; mỗi chặng kết bằng một buổi mốc Review & Show.
const SPIRAL_CHAPTER = 10;
const SPIRAL_CHAPTERS = Math.ceil(SPIRAL_SESSIONS / SPIRAL_CHAPTER);
const SPIRAL_OFFSETS = [1, 3, 6, 10, 15];
const SPIRAL_MILESTONES = Array.from(
  { length: SPIRAL_CHAPTERS },
  (_, index) => Math.min((index + 1) * SPIRAL_CHAPTER, SPIRAL_SESSIONS)
);

// Buổi `day` thuộc chặng thứ mấy.
const chapterOf = (day) => Math.min(Math.ceil(day / SPIRAL_CHAPTER), SPIRAL_CHAPTERS);

/* ---------- Khung chuyên môn của trung tâm ----------
   Toàn bộ phần dưới bám theo tài liệu "Định hướng giáo trình STEPS":
   INPUT → UNDERSTAND → INTERACT → USE → REPEAT → READ → WRITE → CAMBRIDGE.
   Bốn nguyên tắc cốt lõi được cài thẳng vào cách sinh buổi học:
   1. Vocabulary in context — từ luôn đi kèm cụm/câu, không đứng một mình.
   2. Teach language through use — không mở bài bằng giảng ngữ pháp.
   3. Repetition is compulsory — mỗi mảng ngôn ngữ gặp lại 5 lần theo SPIRAL_OFFSETS.
   4. Recycling — mỗi buổi phải nêu rõ NEW / RECYCLE / REUSE. */

// Kiến trúc 1 Unit — 10 Step. Một buổi 45 phút gom 10 Step thành 8 task.
const UNIT_STEPS = [
  "Experience", "Input", "Notice", "Join in", "Use",
  "Phonics & Early Reading", "Reading & Writing", "Listening", "Speaking", "Cambridge Checkpoint",
];

// Recycling Map — 3 vai của một mảng ngôn ngữ trong buổi.
// Hai mốc ôn gần (+1, +3) là RECYCLE: nhận diện lại, vẫn có mẫu trước mặt.
// Ba mốc ôn xa (+6, +10, +15) là REUSE: bắt trẻ tự dùng, không nhắc mẫu.
const RECYCLE_OFFSETS = SPIRAL_OFFSETS.slice(0, 2);
const REUSE_OFFSETS = SPIRAL_OFFSETS.slice(2);

const ROLE_META = {
  new: { label: "NEW", note: "Ngôn ngữ mới của buổi này." },
  recycle: { label: "RECYCLE", note: "Ngôn ngữ buổi trước, nhận diện lại có hướng dẫn." },
  reuse: { label: "REUSE", note: "Ngôn ngữ cũ, trẻ phải tự dùng — không nhắc mẫu." },
  daily: { label: "DAILY", note: "Thường lệ, lặp mọi buổi." },
  milestone: { label: "CHECK", note: "Mốc ôn tổng hợp cả chặng." },
};

function strandRole(strand, day) {
  if (strand.daily) return "daily";
  if (strand.fixed) return "milestone";
  if (strand.intro === day) return "new";
  const gap = day - (strand.intro || 0);
  if (RECYCLE_OFFSETS.includes(gap)) return "recycle";
  if (REUSE_OFFSETS.includes(gap)) return "reuse";
  return "reuse";
}

// Story World — nhóm nhân vật cố định xuyên suốt giáo trình, để câu nào cũng có
// người nói chứ không phải câu mẫu treo lơ lửng.
const storyCast = [
  { name: "Alex", note: "bạn nam dẫn chuyện" },
  { name: "Lucy", note: "bạn nữ hay hỏi" },
  { name: "Sam", note: "em trai của Lucy" },
  { name: "Anna", note: "bạn mới trong lớp" },
  { name: "Ben", note: "bạn thích đồ chơi" },
  { name: "Grace", note: "cô giáo của lớp" },
];

// Nhân vật của một mảng ngôn ngữ: chốt theo id nên buổi nào strand đó quay lại
// vẫn là nhân vật ấy — trẻ nhận ra người quen chứ không phải tên ngẫu nhiên.
function castFor(strand) {
  if (!strand) return storyCast[0];
  let sum = 0;
  for (let i = 0; i < strand.id.length; i += 1) sum += strand.id.charCodeAt(i);
  return storyCast[sum % storyCast.length];
}

// 10 chủ đề Cambridge Starters — dùng làm chuẩn đầu ra, không phải nội dung dạy.
const STARTERS_TOPICS = [
  "Our Names", "My Body", "My Toys", "Activities", "At the Zoo",
  "At the Clothes Shop", "My Favourite Food", "At Home", "At School", "At the Beach",
];

const starterTopicByStrand = {
  greeting: "Our Names", reflex: "Our Names", goodbye: "Our Names",
  colors: "At the Zoo", animals: "At the Zoo", "story-bear": "At the Zoo",
  traffic: "Activities", actions: "Activities",
  morning: "At Home", "story-morning": "At Home", items: "At Home", flower: "At Home",
  body: "My Body", "song-head": "My Body",
  clothes: "At the Clothes Shop", "song-shoes": "At the Clothes Shop",
  school: "At School", picture: "At School", people: "At School",
  lunch: "My Favourite Food", taste: "My Favourite Food", "song-lunch": "My Favourite Food",
  body2: "My Body", toys: "My Toys", "song-toys": "My Toys",
  "prep-1": "At Home", "prep-2": "At Home", where: "At Home",
};

const starterTopicFor = (strand) =>
  (strand && starterTopicByStrand[strand.id]) || (strand?.group === "phonics" ? "Phonics" : "Our Names");

// 7 mẫu câu lệnh chuẩn — mọi hoạt động chỉ được dùng một trong bảy mẫu này.
const INSTRUCTION = {
  lookSay: "Look and say",
  listenPoint: "Listen and point",
  listenTick: "Listen and tick",
  lookMatch: "Look and match",
  readChoose: "Read and choose",
  askAnswer: "Ask and answer",
  drawColour: "Draw and colour",
};

const reflexQuestions = [
  "What's your name?",
  "How old are you?",
  "Where are you from?",
  "How are you today?",
  "What's your favourite color?",
  "What's your favourite animal?",
  "What's your favourite food?",
  "What's your favourite toy?",
];

const routineStrands = (reflexUnit) => [
  { id: "greeting", label: "Greeting & Hello Song", group: "routine", daily: true, detail: "Chào hỏi, điểm danh, hát Hello Song." },
  { id: "reflex", label: "Phản xạ 8 câu", group: "routine", daily: true, unit: reflexUnit, detail: "Hỏi đáp nhanh, xoay vòng 2 câu mỗi buổi." },
  { id: "goodbye", label: "Goodbye Song & dặn dò", group: "routine", daily: true, detail: "Hát tạm biệt và giao task về nhà." },
];

const spiralPlans = {
  "2019 Khóa 1": {
    sessions: SPIRAL_SESSIONS,
    strands: [
      ...routineStrands("Say hello"),
      { id: "colors", label: "Màu sắc", group: "topic", unit: "Colours & animals", intro: 2, detail: "Nhận biết và gọi tên 8 màu." },
      { id: "ph-a", label: "Phonics /a/", group: "phonics", unit: "Phonics group 1", intro: 3, detail: "Âm /a/ — ant, pan." },
      { id: "animals", label: "Con vật", group: "topic", unit: "Colours & animals", intro: 4, detail: "Bear, bird, duck, horse, frog, cat, dog, sheep, fish." },
      { id: "story-bear", label: "Story: Brown bear", group: "story", unit: "Colours & animals", intro: 5, detail: "Kể chuyện Brown bear, brown bear theo vòng lặp." },
      { id: "traffic", label: "Đèn giao thông", group: "topic", unit: "Colours & animals", intro: 6, detail: "Green light - Go / Yellow - Go slowly / Red - Stop." },
      { id: "ph-i", label: "Phonics /i/", group: "phonics", unit: "Phonics group 1", intro: 7, detail: "Âm /i/ — sit, pin." },
      { id: "actions", label: "Action verbs: I can ...", group: "topic", unit: "I can do it", intro: 8, detail: "Dance, shake, jump, hop, stomp, clap." },
      { id: "ph-p", label: "Phonics /p/", group: "phonics", unit: "Phonics group 1", intro: 9, detail: "Âm /p/ — pat, tap." },
      { id: "ph-s", label: "Phonics /s/", group: "phonics", unit: "Phonics group 1", intro: 11, detail: "Âm /s/ — sat, sit." },
      { id: "morning", label: "Hoạt động buổi sáng", group: "topic", unit: "My morning", intro: 12, detail: "Wake up, wash my face, eat breakfast, go to school." },
      { id: "story-morning", label: "Story: In the morning", group: "story", unit: "My morning", intro: 12, detail: "Kể lại một buổi sáng theo tranh." },
      { id: "items", label: "Đồ dùng cá nhân", group: "topic", unit: "My morning", intro: 13, detail: "Toothbrush, comb, mirror, soap, bowl, spoon." },
      { id: "ph-n", label: "Phonics /n/", group: "phonics", unit: "Phonics group 1", intro: 14, detail: "Âm /n/ — nose, pin." },
      { id: "flower", label: "Flower Q&A", group: "topic", unit: "My morning", intro: 15, detail: "Where is the flower? / What color is the flower?" },
      { id: "body", label: "Bộ phận cơ thể", group: "topic", unit: "Head, shoulders, knees", intro: 16, detail: "This is my head. / These are my shoulders." },
      { id: "song-head", label: "Song: Head, shoulders, knees", group: "song", unit: "Head, shoulders, knees", intro: 16, detail: "Hát kèm động tác, tăng dần tốc độ." },
      { id: "ph-t", label: "Phonics /t/", group: "phonics", unit: "Phonics group 1", intro: 17, detail: "Âm /t/ — tin, tap." },
      { id: "blend", label: "Blending nhóm 1", group: "phonics", unit: "Phonics group 1", intro: 18, detail: "p-a-n → pan, s-i-t → sit." },
      { id: "clothes", label: "Trang phục: Put on your ...", group: "topic", unit: "Put on your clothes", intro: 19, detail: "Shirt, T-shirt, shoes, hat, jacket, scarf, pants." },
      { id: "song-shoes", label: "Song: Put on your shoes", group: "song", unit: "Put on your clothes", intro: 19, detail: "Hát và mô phỏng động tác mặc đồ." },
      { id: "review", label: "Review & Show", group: "milestone", fixed: SPIRAL_MILESTONES, detail: "Ôn tổng hợp cả chặng và biểu diễn trước lớp." },
    ],
  },
  "Seed 39 Khóa 2": {
    sessions: SPIRAL_SESSIONS,
    strands: [
      ...routineStrands("Nice to meet you"),
      { id: "school", label: "Đồ dùng học tập", group: "topic", unit: "My school things", intro: 2, detail: "This is a ruler / crayon / eraser / pen / bag." },
      { id: "j-s", label: "Jolly /s/", group: "phonics", unit: "Jolly phonics 1 & 2", intro: 2, detail: "Nhóm 1 — âm /s/." },
      { id: "picture", label: "Màu · vị trí · số lượng trong tranh", group: "topic", unit: "My school things", intro: 3, detail: "Khai thác tranh lớp học: mấy cái? màu gì? ở đâu?" },
      { id: "j-a", label: "Jolly /a/", group: "phonics", unit: "Jolly phonics 1 & 2", intro: 4, detail: "Nhóm 1 — âm /a/." },
      { id: "people", label: "Người trong lớp", group: "topic", unit: "My school things", intro: 4, detail: "She is a teacher. / They are students." },
      { id: "j-t", label: "Jolly /t/", group: "phonics", unit: "Jolly phonics 1 & 2", intro: 5, detail: "Nhóm 1 — âm /t/." },
      { id: "lunch", label: "Từ vựng bữa trưa", group: "topic", unit: "School lunch", intro: 5, detail: "Sandwich, cookie, orange, yogurt, tomato, carrot." },
      { id: "j-i", label: "Jolly /i/", group: "phonics", unit: "Jolly phonics 1 & 2", intro: 6, detail: "Nhóm 1 — âm /i/." },
      { id: "taste", label: "The ___ is yummy / crunchy", group: "topic", unit: "School lunch", intro: 6, detail: "I have a ___ for lunch. The ___ is ___." },
      { id: "song-lunch", label: "Song: I have a sandwich", group: "song", unit: "School lunch", intro: 7, detail: "Hát theo nhịp, thay từ món ăn." },
      { id: "j-p", label: "Jolly /p/", group: "phonics", unit: "Jolly phonics 1 & 2", intro: 8, detail: "Nhóm 1 — âm /p/." },
      { id: "j-n", label: "Jolly /n/", group: "phonics", unit: "Jolly phonics 1 & 2", intro: 9, detail: "Nhóm 1 — âm /n/." },
      { id: "blend-1", label: "Blending nhóm 1", group: "phonics", unit: "Jolly phonics 1 & 2", intro: 11, detail: "s-a-t → sat, p-i-n → pin." },
      { id: "body2", label: "My body (2)", group: "topic", unit: "My body parts", intro: 11, detail: "This is my hair/face. / These are my hands/feet." },
      { id: "j-ck", label: "Jolly /ck/", group: "phonics", unit: "Jolly phonics 1 & 2", intro: 12, detail: "Nhóm 2 — âm /ck/." },
      { id: "toys", label: "Đồ chơi", group: "topic", unit: "My toy box", intro: 13, detail: "Doll, teddy bear, ball, kite, robot, alien, balloon." },
      { id: "j-e", label: "Jolly /e/", group: "phonics", unit: "Jolly phonics 1 & 2", intro: 13, detail: "Nhóm 2 — âm /e/." },
      { id: "song-toys", label: "Song: My teddy bear", group: "song", unit: "My toy box", intro: 14, detail: "Hát và giới thiệu đồ chơi của mình." },
      { id: "j-h", label: "Jolly /h/", group: "phonics", unit: "Jolly phonics 1 & 2", intro: 15, detail: "Nhóm 2 — âm /h/." },
      { id: "prep-1", label: "Giới từ in / on / under", group: "topic", unit: "Where is it?", intro: 15, detail: "The dog is in the box / on the table / under the chair." },
      { id: "j-r", label: "Jolly /r/", group: "phonics", unit: "Jolly phonics 1 & 2", intro: 16, detail: "Nhóm 2 — âm /r/." },
      { id: "j-m", label: "Jolly /m/", group: "phonics", unit: "Jolly phonics 1 & 2", intro: 17, detail: "Nhóm 2 — âm /m/." },
      { id: "prep-2", label: "Giới từ next to / behind / between", group: "topic", unit: "Where is it?", intro: 17, detail: "Next to the wall, in front of / behind the pillow, between." },
      { id: "j-d", label: "Jolly /d/", group: "phonics", unit: "Jolly phonics 1 & 2", intro: 18, detail: "Nhóm 2 — âm /d/." },
      { id: "where", label: "Where is the ___? mở rộng", group: "topic", unit: "Where is it?", intro: 19, detail: "Ghép giới từ với đồ chơi và đồ dùng học tập." },
      { id: "blend-2", label: "Blending nhóm 1 + 2", group: "phonics", unit: "Jolly phonics 1 & 2", intro: 19, detail: "d-u-ck → duck, h-e-n → hen." },
      { id: "review", label: "Review & Show", group: "milestone", fixed: SPIRAL_MILESTONES, detail: "Ôn tổng hợp cả chặng và biểu diễn trước lớp." },
    ],
  },
};

const spiralPrograms = Object.keys(spiralPlans);
const spiralCache = {};

function buildSpiral(program) {
  if (spiralCache[program]) return spiralCache[program];
  const plan = spiralPlans[program];
  if (!plan) return null;
  const matrix = {};
  plan.strands.forEach((strand) => {
    const days = new Set();
    if (strand.daily) {
      for (let day = 1; day <= plan.sessions; day += 1) days.add(day);
    } else if (strand.fixed) {
      strand.fixed.forEach((day) => day <= plan.sessions && days.add(day));
    } else if (strand.intro) {
      days.add(strand.intro);
      SPIRAL_OFFSETS.forEach((offset) => {
        const day = strand.intro + offset;
        if (day <= plan.sessions) days.add(day);
      });
    }
    matrix[strand.id] = days;
  });
  spiralCache[program] = { ...plan, program, matrix };
  return spiralCache[program];
}

function spiralHas(spiral, strand, day) {
  return Boolean(spiral.matrix[strand.id]?.has(day));
}

// Các strand đã vào bài trước `day`, gần nhất xếp trước — dùng khi buổi đó
// không có mảng nào tới hạn ôn theo lịch.
function recentStrands(spiral, day, match, limit) {
  return spiral.strands
    .filter((strand) => strand.intro && strand.intro < day && match(strand))
    .sort((a, b) => b.intro - a.intro)
    .slice(0, limit);
}

// Tóm tắt một buổi để hiển thị trên bản đồ Day: tên buổi, unit gắn với buổi đó
// và các mảng ngôn ngữ có mặt.
function sessionSummary(program, day) {
  const spiral = buildSpiral(program);
  if (!spiral) return null;
  const active = spiral.strands.filter((strand) => spiralHas(spiral, strand, day));
  const milestone = active.some((strand) => strand.group === "milestone");
  const fresh = active.filter((strand) => strand.intro === day);
  const repeat = active.filter((strand) => !strand.daily && !strand.fixed && strand.intro !== day);
  const label = (list) => list.map((strand) => strand.label).join(" · ");
  const focus = fresh.length ? fresh : repeat.length ? repeat : recentStrands(spiral, day, () => true, 2);
  // Recycling Map của buổi (mục VI tài liệu định hướng): mảng nào mới, mảng nào
  // nhận diện lại, mảng nào bắt trẻ tự dùng.
  const recycleMap = { new: [], recycle: [], reuse: [], daily: [], milestone: [] };
  active.forEach((strand) => recycleMap[strandRole(strand, day)].push(strand));
  return {
    active,
    milestone,
    fresh,
    repeat,
    recycleMap,
    cast: castFor(focus[0] || active[0]),
    starter: starterTopicFor(focus.find((strand) => strand.group !== "phonics") || focus[0]),
    unit: focus.find((strand) => strand.unit)?.unit || "",
    title: milestone
      ? "Review & Show — mốc chặng"
      : fresh.length
        ? label(fresh)
        : repeat.length
          ? `Ôn: ${label(repeat.slice(0, 2))}`
          : focus.length
            ? `Mở rộng: ${label(focus.slice(0, 2))}`
            : "Làm quen lớp & phản xạ",
  };
}

function sessionTasks(program, day) {
  const spiral = buildSpiral(program);
  if (!spiral) return [];
  const active = spiral.strands.filter((strand) => spiralHas(spiral, strand, day));
  const isMilestone = active.some((strand) => strand.group === "milestone");
  const fresh = active.filter((strand) => strand.intro === day && strand.group !== "phonics");
  const recycle = active.filter(
    (strand) => !strand.daily && !strand.fixed && strand.intro !== day && strand.group !== "phonics",
  );
  const phonics = active.filter((strand) => strand.group === "phonics");
  const notPhonics = (strand) => strand.group !== "phonics";
  const fallbackTopics = recycle.length ? recycle : recentStrands(spiral, day, notPhonics, 2);
  const fallbackPhonics = recentStrands(spiral, day, (strand) => strand.group === "phonics", 2);
  const q1 = reflexQuestions[(day * 2 - 2) % reflexQuestions.length];
  const q2 = reflexQuestions[(day * 2 - 1) % reflexQuestions.length];
  const names = (list) => list.map((strand) => strand.label).join(" · ");

  // Task 3 mang ngôn ngữ MỚI nhưng ở mức tiếp nhận (Join in + Listening),
  // task 4 mang ngôn ngữ CŨ ở mức sản sinh (Use). Đúng thứ tự của tài liệu:
  // gặp → hiểu → làm theo → dùng, chứ không bắt nói ngay khi vừa gặp.
  const newTask = isMilestone
    ? {
        time: "6'", title: "Ôn tổng hợp chặng", step: "Step 4 + 8", instruction: INSTRUCTION.listenTick,
        detail: `Chạy lại mẫu câu buổi ${Math.max(day - SPIRAL_CHAPTER + 1, 1)}-${day} theo trạm nghe - chỉ - chọn.`,
        tone: "milestone",
      }
    : fresh.length
      ? {
          time: "6'", title: `Join in & Listening: ${names(fresh)}`, step: "Step 4 + 8", instruction: INSTRUCTION.listenTick,
          detail: `${fresh.map((strand) => strand.detail).join(" ")} Trẻ point, touch, act rồi mới chọn đáp án.`,
          tone: "repeat",
        }
      : {
          time: "6'", title: "Join in & Listening", step: "Step 4 + 8", instruction: INSTRUCTION.listenTick,
          detail: fallbackTopics.length
            ? `Đưa ${names(fallbackTopics.slice(0, 2))} vào tình huống mới: nghe, chỉ tranh rồi chọn.`
            : "Làm quen lớp, luật lớp học và tên các bạn.",
          tone: "repeat",
        };

  const recycleTask = isMilestone
    ? {
        time: "6'", title: "Mini show", step: "Step 5", instruction: INSTRUCTION.askAnswer,
        detail: "Mỗi bạn trình bày 3-4 câu trước lớp, cả lớp vỗ tay chấm sao.", tone: "milestone",
      }
    : {
        time: "6'", title: "Use — hỏi đáp cặp đôi", step: "Step 5", instruction: INSTRUCTION.askAnswer,
        detail: recycle.length
          ? `Dùng lại trong hội thoại: ${names(recycle.slice(0, 3))}. Controlled → guided → pair work.`
          : fallbackTopics.length
            ? `Hỏi đáp cặp đôi quanh ${names(fallbackTopics)} — không nhìn mẫu.`
            : "Hỏi đáp chào hỏi bằng trò chơi chuyền bóng.",
        tone: "intro",
      };

  const topicNames = names((fresh.length ? fresh : fallbackTopics).slice(0, 2)) || "ngôn ngữ buổi này";
  const cast = castFor(fresh[0] || fallbackTopics[0] || active[0]);
  const starter = starterTopicFor(fresh[0] || fallbackTopics[0]);
  const reuse = active.filter((strand) => strandRole(strand, day) === "reuse");

  // 8 task = 10 Step gói lại cho vừa 45 phút. Step 1+2 chung một task mở bài,
  // Step 4 và Step 8 chung một task nghe-và-làm-theo.
  return [
    {
      time: "5'",
      title: "Experience & Input",
      step: "Step 1-2",
      instruction: INSTRUCTION.listenPoint,
      detail: `${cast.name} mở đầu tình huống. Trẻ nghe story/song/teacher talk và chỉ theo, chưa cần nói.`,
      tone: "routine",
    },
    {
      time: "6'",
      title: "Notice",
      step: "Step 3",
      instruction: INSTRUCTION.lookSay,
      detail: `Nhận ra từ và cụm từ trong câu: ${topicNames}. Từ luôn nằm trong câu, không tách lẻ.`,
      tone: "intro",
    },
    newTask,
    recycleTask,
    {
      time: "6'",
      title: "Phonics & Early Reading",
      step: "Step 6",
      instruction: INSTRUCTION.lookMatch,
      detail: phonics.length
        ? `${names(phonics)} — âm → động tác → nhận diện → ghép vần → đọc từ.`
        : fallbackPhonics.length
          ? `Ôn ${names(fallbackPhonics)} — nghe, làm động tác và ghép vần nhanh.`
          : "Nghe và bắt chước âm đầu tiên, vỗ tay theo âm tiết.",
      tone: "phonics",
    },
    {
      time: "5'",
      title: "Reading & Writing",
      step: "Step 7",
      instruction: INSTRUCTION.readChoose,
      detail: `Đọc câu ngắn có từ vừa học rồi chọn tranh đúng. Về nhà: ${INSTRUCTION.drawColour.toLowerCase()}.`,
      tone: "literacy",
    },
    {
      time: "6'",
      title: "Speaking",
      step: "Step 9",
      instruction: INSTRUCTION.lookSay,
      detail: reuse.length
        ? `Nói về mình bằng mẫu câu đã học — có dùng lại ${names(reuse.slice(0, 2))} mà không nhắc mẫu.`
        : "Nghe mẫu → nói theo → nói với bạn → nói về mình.",
      tone: "routine",
    },
    {
      time: "5'",
      title: "Cambridge Checkpoint",
      step: "Step 10",
      instruction: INSTRUCTION.readChoose,
      detail: `Dạng bài Starters chủ đề “${starter}”. Kiểm tra nhẹ cuối buổi, không biến cả buổi thành luyện đề.`,
      tone: "check",
    },
  ];
}

/* ---------- Media cho phần học tương tác ---------- */

// Video demo là id YouTube thật (đã kiểm tra còn sống + đúng kênh). Nhúng qua
// youtube-nocookie.com nên không dính cookie theo dõi. Máy không có mạng thì
// iframe trắng, vì vậy thẻ nào cũng kèm link mở ngoài.
const videoLibrary = {
  hello: { id: "fN1Cyr0ZK9M", title: "Hello Hello! Can You Clap Your Hands?", by: "Super Simple Songs" },
  goodbye: { id: "PraN5ZoSjiY", title: "Bye Bye Goodbye", by: "Super Simple Songs" },
  colors: { id: "tRNy2i75tCc", title: "The Rainbow Colors Song", by: "KidsTV123" },
  animals: { id: "GoSq-yZcJ-4", title: "Walking In The Jungle", by: "Super Simple Songs" },
  bear: { id: "r7N9dhyotNM", title: "Brown Bear, Brown Bear, What Do You See?", by: "Learn With Miss Kaye" },
  traffic: { id: "Y7QM_H0P4Q8", title: "Red Light, Green Light", by: "Carl's Car Wash" },
  actions: { id: "Z0x95qiDKeg", title: "Yes, I Can! — Action Verbs", by: "Fun Kids English" },
  routine: { id: "4XLQpRI_wOQ", title: "This Is The Way", by: "Super Simple Songs" },
  body: { id: "VAOOT5ZfQyU", title: "Head, Shoulders, Knees And Toes", by: "Super Simple Songs" },
  clothes: { id: "-jBfb33_KHU", title: "Put On Your Shoes", by: "Super Simple Songs" },
  jolly1: { id: "_eoDsrAICRE", title: "Jolly Phonics Group 1 — s a t i p n", by: "Jolly Learning" },
  jolly2: { id: "-ksblMiliA8", title: "Jolly Phonics Letter Sounds (British English)", by: "Jolly Learning" },
  school: { id: "JLMsm-D7kjk", title: "What Is In Your Bag?", by: "Dream English Kids" },
  food: { id: "frN3nvhIHUk", title: "Do You Like Broccoli Ice Cream?", by: "Super Simple Songs" },
  toys: { id: "wb1ejyoQ9_s", title: "Toys & Games", by: "Super Simple TV" },
  where: { id: "UXCVMFZcBpE", title: "Where Is The Ball? — Prepositions", by: "Archtop Music Therapy" },
  happy: { id: "x8b4f5fhYuw", title: "Can You Make A Happy Face?", by: "Super Simple Songs" },
};

// Strand nào mở video nào. Strand không có tên ở đây thì rơi về video theo nhóm.
const strandVideo = {
  greeting: "hello", reflex: "hello", goodbye: "goodbye", review: "happy",
  colors: "colors", animals: "animals", "story-bear": "bear", traffic: "traffic",
  actions: "actions", morning: "routine", "story-morning": "routine", items: "routine",
  flower: "colors", body: "body", "song-head": "body", clothes: "clothes", "song-shoes": "clothes",
  "ph-a": "jolly1", "ph-i": "jolly1", "ph-p": "jolly1", "ph-s": "jolly1",
  "ph-n": "jolly1", "ph-t": "jolly1", blend: "jolly1",
  school: "school", picture: "colors", people: "school",
  lunch: "food", taste: "food", "song-lunch": "food",
  body2: "body", toys: "toys", "song-toys": "toys",
  "prep-1": "where", "prep-2": "where", where: "where",
  "j-s": "jolly1", "j-a": "jolly1", "j-t": "jolly1", "j-i": "jolly1",
  "j-p": "jolly1", "j-n": "jolly1", "blend-1": "jolly1",
  "j-ck": "jolly2", "j-e": "jolly2", "j-h": "jolly2", "j-r": "jolly2",
  "j-m": "jolly2", "j-d": "jolly2", "blend-2": "jolly2",
};

const groupVideo = { phonics: "jolly1", song: "hello", story: "bear", topic: "colors", routine: "hello", milestone: "happy" };

function videoFor(strand) {
  if (!strand) return null;
  const key = strandVideo[strand.id] || groupVideo[strand.group];
  return videoLibrary[key] || null;
}

/* ---------- Âm thanh: đọc mẫu và tiếng phản hồi ---------- */

// Giọng đọc dùng Web Speech API có sẵn trong trình duyệt — không cần file audio,
// đọc được mọi từ trong catalog kể cả từ mới thêm sau này.
let speechVoice = null;
function pickVoice() {
  if (speechVoice || !window.speechSynthesis) return speechVoice;
  const voices = window.speechSynthesis.getVoices() || [];
  speechVoice = voices.find((v) => /en[-_]GB/i.test(v.lang))
    || voices.find((v) => /^en/i.test(v.lang))
    || null;
  return speechVoice;
}
if (window.speechSynthesis) {
  pickVoice();
  window.speechSynthesis.addEventListener?.("voiceschanged", () => { speechVoice = null; pickVoice(); });
}

function speak(text, rate = 0.85) {
  if (!window.speechSynthesis || !text) return false;
  window.speechSynthesis.cancel();
  const utter = new SpeechSynthesisUtterance(text);
  utter.lang = "en-GB";
  utter.rate = rate;
  utter.pitch = 1.05;
  const voice = pickVoice();
  if (voice) utter.voice = voice;
  window.speechSynthesis.speak(utter);
  return true;
}

// Tiếng "đúng/sai" dựng bằng WebAudio, không tải file nào.
let audioCtx = null;
function chime(kind) {
  try {
    const Ctx = window.AudioContext || window.webkitAudioContext;
    if (!Ctx) return;
    audioCtx = audioCtx || new Ctx();
    const notes = kind === "ok" ? [660, 880] : [220, 175];
    notes.forEach((freq, i) => {
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      const at = audioCtx.currentTime + i * 0.12;
      osc.type = kind === "ok" ? "sine" : "triangle";
      osc.frequency.setValueAtTime(freq, at);
      gain.gain.setValueAtTime(0.0001, at);
      gain.gain.exponentialRampToValueAtTime(0.18, at + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, at + 0.18);
      osc.connect(gain).connect(audioCtx.destination);
      osc.start(at);
      osc.stop(at + 0.2);
    });
  } catch (err) {
    /* trình duyệt chặn audio thì bỏ qua, phần nhìn vẫn chạy */
  }
}

/* ---------- Sinh câu hỏi tương tác ---------- */

// Trộn theo seed để mỗi buổi ra một bộ câu hỏi cố định — render lại không đổi đáp án.
function seededOrder(length, seed) {
  const order = Array.from({ length }, (_, i) => i);
  let s = Math.abs(seed) * 9301 + 49297;
  for (let i = length - 1; i > 0; i -= 1) {
    s = (s * 9301 + 49297) % 233280;
    const j = s % (i + 1);
    [order[i], order[j]] = [order[j], order[i]];
  }
  return order;
}

const reflexBank = {
  "What's your name?": { answer: "My name is Mai.", wrong: ["I'm seven years old.", "It's red."] },
  "How old are you?": { answer: "I'm seven years old.", wrong: ["My name is Mai.", "I'm from Vietnam."] },
  "Where are you from?": { answer: "I'm from Vietnam.", wrong: ["I'm fine, thank you.", "It's a cat."] },
  "How are you today?": { answer: "I'm happy, thank you!", wrong: ["I'm from Hanoi.", "My favourite is blue."] },
  "What's your favourite color?": { answer: "My favourite color is blue.", wrong: ["I'm eight years old.", "I like dogs."] },
  "What's your favourite animal?": { answer: "My favourite animal is a cat.", wrong: ["It's green.", "I'm from Vietnam."] },
  "What's your favourite food?": { answer: "My favourite food is rice.", wrong: ["I'm fine, thank you.", "It's a ball."] },
  "What's your favourite toy?": { answer: "My favourite toy is a teddy bear.", wrong: ["I'm nine years old.", "I like blue."] },
};

const phonicsWords = {
  a: ["ant", "apple", "hat"], b: ["ball", "bag", "bus"], c: ["cat", "cup", "car"],
  ck: ["duck", "sock", "kick"], d: ["dog", "duck", "doll"], e: ["egg", "hen", "bed"],
  f: ["fish", "fan", "fox"], g: ["goat", "gap", "girl"], h: ["hat", "hen", "hop"],
  i: ["ink", "sit", "pin"], j: ["jam", "jug", "jet"], k: ["kite", "key", "kid"],
  l: ["leg", "lip", "log"], m: ["map", "man", "mum"], n: ["nose", "net", "nut"],
  o: ["orange", "ox", "on"], p: ["pan", "pen", "pig"], q: ["queen", "quilt"],
  r: ["red", "run", "rat"], s: ["sun", "sat", "six"], t: ["tap", "tin", "ten"],
  u: ["up", "cup", "bus"], v: ["van", "vet"], w: ["web", "wet", "win"],
  x: ["box", "fox", "six"], y: ["yes", "yak"], z: ["zip", "zoo"],
};

// Trong catalog phonics khi thì ghi "a", khi thì ghi "/i/" — chuẩn hoá về chữ trần.
const soundLetter = (raw) => String(raw).replace(/[^a-z]/gi, "").toLowerCase();

function loadState() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) return structuredClone(stateDefaults);
    const parsed = JSON.parse(saved);
    return {
      ...structuredClone(stateDefaults),
      ...parsed,
      selectedUnit: fixUnitName(parsed.selectedUnit || stateDefaults.selectedUnit),
      // State cũ có thể trỏ tới chương trình đã gỡ, đưa về chương trình còn lộ trình.
      spiralProgram: spiralPlans[parsed.spiralProgram] ? parsed.spiralProgram : stateDefaults.spiralProgram,
      activePage: "welcome",
    };
  } catch {
    return structuredClone(stateDefaults);
  }
}

let state = loadState();

const el = (id) => document.getElementById(id);

function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function resetDemo() {
  state = structuredClone(stateDefaults);
  saveState();
  render();
}

function logout() {
  state.activePage = "welcome";
  saveState();
  render();
}

function setRole(role) {
  state.currentRole = role;
  state.activePage = role === "student" ? "profile" : "dashboard";
  if (role === "student") state.activeStudentPage = "profile";
  else state.activeAdminPage = "dashboard";
  saveState();
  render();
}

function setPage(page) {
  if (state.currentRole === "student") state.activeStudentPage = page;
  else state.activeAdminPage = page;
  state.activePage = page;
  // Bấm Roadmap ở sidebar luôn quay về tầng đầu tiên: lưới chương trình.
  if (page === "roadmap") {
    state.roadmapProgram = "";
    state.roadmapDay = 0;
  }
  adminUi.query = "";
  adminUi.selectedGrade = "";
  adminUi.selectedLesson = "";
  saveState();
  render();
}

function openGrade(code) {
  adminUi.selectedGrade = code;
  adminUi.query = "";
  state.currentRole = "admin";
  state.activeAdminPage = "grading";
  state.activePage = "grading";
  saveState();
  render();
}

function openLesson(name) {
  adminUi.selectedLesson = name;
  adminUi.query = "";
  state.currentRole = "admin";
  state.activeAdminPage = "lessons";
  state.activePage = "lessons";
  saveState();
  render();
}

function escapeHtml(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function lessonSeed(name) {
  return encodeURIComponent(String(name).toLowerCase().replace(/\s+/g, "-"));
}

function lessonMedia(name, lesson) {
  const seed = lessonSeed(name);
  return {
    coverImage: lesson.coverImage || `https://picsum.photos/seed/${seed}-cover/800/450`,
    storyImage: lesson.storyImage || `https://picsum.photos/seed/${seed}-story/800/450`,
    storyVideo: lesson.storyVideo || "",
    songAudio: lesson.songAudio || "",
    listenAudio: lesson.listenAudio || "",
    phonicsAudio: lesson.phonicsAudio || "",
    speakAudio: lesson.speakAudio || "",
  };
}

function renderMediaField(id, label, type, value) {
  const accept = type === "image" ? "image/*" : type === "video" ? "video/*" : "audio/*";
  const hint = type === "image" ? "JPG, PNG, WEBP" : type === "video" ? "MP4, WEBM" : "MP3, WAV, M4A";
  let preview = `<div class="media-empty">Chưa có file · ${hint}</div>`;
  if (value) {
    if (type === "image") preview = `<img src="${escapeHtml(value)}" alt="${escapeHtml(label)}" />`;
    if (type === "video") preview = `<video src="${escapeHtml(value)}" controls></video>`;
    if (type === "audio") preview = `<audio src="${escapeHtml(value)}" controls></audio>`;
  }
  return `
    <div class="media-field">
      <div class="media-field-head">
        <strong>${label}</strong>
        <span class="muted">${hint}</span>
      </div>
      <div class="media-preview media-preview-${type}">${preview}</div>
      <input class="media-url" id="${id}" value="${escapeHtml(value || "")}" placeholder="Dán URL hoặc chọn file bên dưới" />
      <input type="file" accept="${accept}" data-media-target="${id}" data-media-type="${type}" />
    </div>
  `;
}

function lessonStatus(lesson) {
  if (lesson.publishStatus) return lesson.publishStatus;
  if (lesson.order <= 4) return "published";
  if (lesson.order === 5) return "editing";
  return "draft";
}

function lessonStatusLabel(key) {
  if (key === "published") return "Đã xuất bản";
  if (key === "editing") return "Đang soạn";
  return "Bản nháp";
}

function addStars(amount) {
  state.stars += amount;
  saveState();
  render();
}

function completeActivity(key, stars = 5) {
  if (!state.completedActivities.includes(key)) {
    state.completedActivities.push(key);
    addStars(stars);
  }
}

function setLessonStep(step) {
  state.studentLessonStep = step;
  saveState();
  render();
}

function applyShell() {
  const isLogin = state.activePage === "welcome";
  document.body.classList.toggle("is-login", isLogin);
  document.body.classList.toggle("is-admin", !isLogin && state.currentRole === "admin");
  const subtitle = el("brandSubtitle");
  if (subtitle) {
    // Bên học sinh không cần dòng phụ; ẩn hẳn cho khỏi chừa khoảng trống.
    subtitle.textContent = state.currentRole === "admin" ? "Cổng quản trị" : "";
    subtitle.hidden = !subtitle.textContent;
  }
  const mark = el("brandMark");
  if (mark) {
    mark.innerHTML = state.currentRole === "admin"
      ? `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M22 10L12 5 2 10l10 5 10-5z"/><path d="M6 12v5c3 2 9 2 12 0v-5"/></svg>`
      : "";
  }
  const footer = el("sidebarFooter");
  if (footer) {
    footer.innerHTML = isLogin ? "" : `
      <button class="logout-btn" data-action="logout">Đăng xuất</button>
    `;
  }
}

function renderNav() {
  const nav = el("nav");
  if (state.currentRole === "student") {
    const navItems = [
      { id: "profile", title: "Thông tin của tôi", desc: "" },
      { id: "roadmap", title: "Roadmap", desc: "" },
    ];
    // Mục nào không có dòng mô tả thì bỏ luôn thẻ div, khỏi chừa dòng trống.
    nav.innerHTML = navItems.map((item) => `
      <button class="nav-item ${item.id === state.activeStudentPage ? "active" : ""}" data-page="${item.id}">
        <div class="nav-title">${item.title}</div>
        ${item.desc ? `<div class="nav-desc">${item.desc}</div>` : ""}
      </button>
    `).join("");
    return;
  }

  const groups = [
    { label: "", items: [{ id: "dashboard", title: "Dashboard", desc: "Tổng quan hệ thống" }] },
    {
      label: "QUẢN LÝ HỆ THỐNG",
      items: [
        { id: "users", title: "Người dùng", desc: "Học viên và giáo viên" },
        { id: "lessons", title: "Bài giảng", desc: "Quản lý nội dung bài" },
        { id: "grading", title: "Chấm bài", desc: "Bài nộp và điểm số" },
        { id: "fees", title: "Học phí", desc: "Quản lý học phí học viên" },
        { id: "syllabus", title: "Biên soạn syllabus", desc: "Movers / Flyers / 2019 Khóa 1 / Seed 39 Khóa 2" },
        { id: "journey", title: `Lộ trình ${SPIRAL_SESSIONS} buổi`, desc: "Ma trận xoắn ốc từng buổi" },
      ],
    },
  ];
  nav.innerHTML = groups.map((group) => `
    <div class="nav-group">
      ${group.label ? `<div class="nav-group-label">${group.label}</div>` : ""}
      ${group.items.map((item) => `
        <button class="nav-item ${item.id === state.activeAdminPage ? "active" : ""}" data-page="${item.id}">
          <div class="nav-title">${item.title}</div>
          <div class="nav-desc">${item.desc}</div>
        </button>
      `).join("")}
    </div>
  `).join("");
}

function renderMetrics() {
  const box = el("topbarMetrics");
  // Trang hồ sơ đã có khối chỉ số riêng, không lặp lại trên topbar.
  if (state.currentRole !== "student" || state.activeStudentPage === "profile") {
    box.innerHTML = "";
    return;
  }
  const doneUnits = 1;
  const totalUnits = programUnits(lessonProgram(getLesson(state.selectedUnit))).length;
  const items = [
    ["Sao", state.stars],
    ["Tiến độ", `${state.unitProgress}%`],
    ["Bài học", `${doneUnits} / ${totalUnits}`],
    ["Chuỗi ngày", "5"],
  ];
  box.innerHTML = items.map(([label, value]) => `
    <div class="metric-card">
      <div class="metric-value">${value}</div>
      <div class="metric-label">${label}</div>
    </div>
  `).join("");
}

function lessonPills() {
  return `
    <div class="package-strip">
      <span>Story</span><span>Song</span><span>Từ vựng</span><span>Cấu trúc</span><span>Phonics</span><span>Ý nghĩa</span>
    </div>
  `;
}

function renderStudentProfile() {
  const lesson = getLesson(state.selectedUnit);
  const program = lessonProgram(lesson);
  const spiral = buildSpiral(program);
  const day = spiral ? Math.min(Math.max(state.selectedDay || 1, 1), spiral.sessions) : 0;
  const missions = [
    ["Xem truyện hôm nay", state.missionProgress.story || state.completedActivities.includes("story")],
    ["Hoàn thành 2 hoạt động", state.completedActivities.length >= 2],
    ["Nói 2 câu", state.missionProgress.speaking >= 2],
  ];
  const info = [
    ["Mã học viên", studentProfile.code],
    ["Lớp", studentProfile.className],
    ["Chương trình", studentProfile.program],
    ["Giáo viên", studentProfile.teacher],
    ["Lịch học", studentProfile.schedule],
    ["Ngày sinh", studentProfile.birthday],
    ["Nhập học", studentProfile.joined],
    ["Phụ huynh", studentProfile.parent],
  ];
  return `
    <div class="card profile-card">
      <div class="profile-head">
        <div class="profile-avatar">${escapeHtml(studentProfile.name.trim().slice(-1))}</div>
        <div class="profile-ident">
          <h3>${escapeHtml(studentProfile.name)}</h3>
          <p class="muted">${escapeHtml(studentProfile.className)} · ${escapeHtml(studentProfile.program)}</p>
        </div>
        <button class="primary-btn" data-page="roadmap">Vào Roadmap</button>
      </div>
      <div class="profile-info">
        ${info.map(([label, value]) => `
          <div class="profile-info-item">
            <span class="muted">${label}</span>
            <strong>${escapeHtml(value)}</strong>
          </div>
        `).join("")}
      </div>
    </div>

    <div class="overview-stats">
      <div class="overview-stat"><div class="metric-value">${state.stars}</div><div class="metric-label">Sao đã kiếm</div></div>
      <div class="overview-stat"><div class="metric-value">${state.unitProgress}%</div><div class="metric-label">Tiến độ bài hiện tại</div></div>
      <div class="overview-stat"><div class="metric-value">${spiral ? `${day} / ${spiral.sessions}` : `1 / ${programUnits(program).length}`}</div><div class="metric-label">Buổi đã học</div></div>
      <div class="overview-stat"><div class="metric-value">5 ngày</div><div class="metric-label">Chuỗi học liên tục</div></div>
    </div>

    <div class="card">
      <div class="continue-card">
        <div>
          <div class="pill">${spiral ? `Đang ở Day ${day}` : `Unit ${unitIndex(state.selectedUnit)}`}</div>
          <h3 style="margin:10px 0 6px;">${escapeHtml(state.selectedUnit)}</h3>
          <p class="muted" style="margin:0;">${escapeHtml(lesson.subtitle)}</p>
          <div class="progress" style="max-width:420px;"><span style="width:${state.unitProgress}%"></span></div>
        </div>
        <button class="secondary-btn" data-action="open-day" data-program="${escapeHtml(program)}" data-day="${day || 1}">Học tiếp</button>
      </div>
    </div>

    <div class="overview-grid">
      <div class="card">
        <div class="section-title">
          <h3>Nhiệm vụ hôm nay</h3>
          <span class="status current">${missions.filter(([, done]) => done).length}/3</span>
        </div>
        ${missions.map(([label, done]) => `
          <div class="mission-item">
            <strong>${label}</strong>
            <span class="status ${done ? "done" : "current"}">${done ? "Xong" : "Tiếp tục"}</span>
          </div>
        `).join("")}
      </div>
      <div class="card">
        <div class="section-title">
          <h3>Kỹ năng</h3>
          <span class="pill">Tóm tắt</span>
        </div>
        ${[
          ["Nghe", 88],
          ["Từ vựng", 90],
          ["Nói", 78],
          ["Phonics", 72],
        ].map(([label, value]) => `
          <div class="skill-row">
            <div class="skill-row-head"><strong>${label}</strong><span>${value}%</span></div>
            <div class="progress" style="margin:0;"><span style="width:${value}%"></span></div>
          </div>
        `).join("")}
      </div>
    </div>

    <div class="overview-grid">
      <div class="card">
        <div class="section-title">
          <h3>Cần ôn lại</h3>
          <span class="pill">Lặp lại xoắn ốc</span>
        </div>
        <div class="list">
          ${Object.entries(state.reviewStatus).map(([target, status]) => `
            <div class="list-item">
              <div>
                <strong>${escapeHtml(target)}</strong>
                <div class="muted">${status === "Needs Practice" ? "Gặp lần cuối 4 ngày trước" : "Đang quay lại trong luồng học"}</div>
              </div>
              <span class="status ${status === "Needs Practice" ? "current" : "done"}">${status}</span>
            </div>
          `).join("")}
        </div>
        <div class="row-actions" style="margin-top:14px;">
          <button class="primary-btn" data-action="review-session">Ôn nhanh 5 phút</button>
        </div>
      </div>
      <div class="card">
        <div class="section-title">
          <h3>Hoạt động đã hoàn thành</h3>
          <span class="pill">${state.completedActivities.length} mục</span>
        </div>
        <div class="card-grid">
          <div class="mini-card"><div class="metric-value">${state.completedActivities.length}</div><div class="metric-label">Hoạt động</div></div>
          <div class="mini-card"><div class="metric-value">${state.missionProgress.speaking}</div><div class="metric-label">Lượt nói</div></div>
          <div class="mini-card"><div class="metric-value">${state.missionProgress.games}</div><div class="metric-label">Trò chơi</div></div>
        </div>
      </div>
    </div>
  `;
}

// Roadmap 3 tầng: lưới chương trình → danh sách Day → trang học của một Day.
function renderRoadmap() {
  const program = state.roadmapProgram;
  if (!program || !programUnits(program).length) return renderRoadmapPrograms();
  const spiral = buildSpiral(program);
  if (!spiral) {
    // Chương trình chưa có lộ trình theo buổi: tầng 2 là danh sách bài, tầng 3 là trang unit.
    return state.roadmapDay
      ? `${renderCrumbs([
          { label: "Roadmap", action: "back-programs" },
          { label: program, action: "open-program", program },
          { label: state.selectedUnit },
        ])}${renderUnitDetail(state.selectedUnit)}`
      : renderProgramUnits(program);
  }
  if (!state.roadmapDay) return renderRoadmapDays(program);
  return renderRoadmapDay(program, state.roadmapDay);
}

function roadmapPrograms() {
  return programList.filter((item) => programUnits(item).length);
}

function renderRoadmapPrograms() {
  const items = roadmapPrograms();
  return `
    <div class="card">
      <div class="section-title">
        <h3>Chọn chương trình</h3>
        <span class="pill">${items.length} chương trình</span>
      </div>
      <p class="muted spiral-note">Bấm vào một chương trình để mở danh sách Day 1 → Day ${SPIRAL_SESSIONS}.</p>
      <div class="program-grid">
        ${items.map((item) => {
          const spiral = buildSpiral(item);
          const units = programUnits(item);
          const topics = spiral
            ? spiral.strands.filter((strand) => !strand.daily && strand.group !== "milestone").slice(0, 5)
            : [];
          const mine = item === studentProfile.program;
          return `
            <button class="program-card ${mine ? "mine" : ""}" data-action="open-program" data-program="${escapeHtml(item)}">
              <div class="program-card-head">
                <strong>${escapeHtml(item)}</strong>
                ${mine ? `<span class="status current">lớp của em</span>` : `<span class="status locked">tham khảo</span>`}
              </div>
              <div class="program-card-meta">
                <span>${spiral ? `${spiral.sessions} buổi` : `${units.length} bài`}</span>
                <span>${units.length} unit</span>
              </div>
              <div class="progress"><span style="width:${mine ? Math.round(((state.selectedDay || 1) / (spiral ? spiral.sessions : units.length)) * 100) : 0}%"></span></div>
              <div class="spiral-chips">
                ${topics.map((strand) => `<span class="spiral-chip ${strand.group}">${escapeHtml(strand.label)}</span>`).join("")}
                ${spiral ? `<span class="spiral-chip routine">+${spiral.strands.length - topics.length} mảng khác</span>` : ""}
              </div>
              <span class="program-card-cta">Xem ${spiral ? `Day 1 → Day ${spiral.sessions}` : "danh sách bài"} →</span>
            </button>
          `;
        }).join("")}
      </div>
    </div>
  `;
}

function renderCrumbs(trail) {
  return `
    <div class="crumbs">
      ${trail.map((item, idx) => `
        ${idx ? `<span class="crumb-sep">›</span>` : ""}
        ${item.action
          ? `<button class="crumb" data-action="${item.action}" ${item.program ? `data-program="${escapeHtml(item.program)}"` : ""}>${escapeHtml(item.label)}</button>`
          : `<span class="crumb current">${escapeHtml(item.label)}</span>`}
      `).join("")}
    </div>
  `;
}

// Tên tiếng Việt của từng Step, để phụ huynh đọc thẻ Day là biết con làm gì mà
// không cần tra bảng 10 Step. Khoá theo `task.step` chứ không theo thứ tự task,
// nên đổi thứ tự task trong buổi cũng không lệch nhãn.
const STEP_PLAIN = {
  "Step 1-2": "Nghe & làm quen",
  "Step 3": "Nhận diện từ",
  "Step 4 + 8": "Nghe & làm theo",
  "Step 5": "Hỏi – đáp",
  "Step 6": "Phonics",
  "Step 7": "Đọc – viết",
  "Step 9": "Nói",
  "Step 10": "Kiểm tra",
};

function taskPlain(task) {
  return STEP_PLAIN[task.step] || task.title;
}

// Các task đã hoàn thành của một buổi. Cùng khoá "program|day" mà trang học ghi
// vào state.taskDone, nên thẻ Day và trang học luôn khớp số. Trả về Set chỉ số
// vì học sinh có thể làm nhảy cóc, không nhất thiết xong 1-2-3 theo thứ tự.
function dayDoneSet(program, day, total) {
  const done = state.taskDone[`${program}|${day}`] || [];
  return new Set(done.filter((idx) => Number.isInteger(idx) && idx >= 0 && idx < total));
}

function renderRoadmapDays(program) {
  const spiral = buildSpiral(program);
  if (!spiral) return renderProgramUnits(program);
  const current = Math.min(Math.max(state.selectedDay || 1, 1), spiral.sessions);
  const days = Array.from({ length: spiral.sessions }, (_, i) => i + 1);
  return `
    ${renderCrumbs([
      { label: "Roadmap", action: "back-programs" },
      { label: program },
    ])}
    <div class="card">
      <div class="section-title">
        <h3>${escapeHtml(program)}</h3>
        <span class="pill">${spiral.sessions} buổi · 8 task theo 10 Step</span>
      </div>
      <p class="muted spiral-note">Bấm vào một Day để mở trang học của buổi đó.</p>
      <div class="day-list">
        ${days.map((day) => {
          const info = sessionSummary(program, day);
          const tasks = sessionTasks(program, day);
          const total = tasks.length;
          const doneSet = dayDoneSet(program, day, total);
          const done = doneSet.size;
          // Trạng thái đọc từ số task đã làm thật, không đoán theo vị trí buổi —
          // để phụ huynh thấy đúng con đang ở đâu.
          const status = total && done >= total ? "done" : done > 0 || day === current ? "current" : "locked";
          const progress = total ? Math.round((done / total) * 100) : 0;
          const minutes = tasks.reduce((sum, task) => sum + (parseInt(task.time, 10) || 0), 0);
          const chips = info.active.filter((strand) => !strand.daily);
          const head = (day - 1) % SPIRAL_CHAPTER === 0
            ? `<div class="day-chapter">Chặng ${chapterOf(day)}/${SPIRAL_CHAPTERS} · Buổi ${day}–${Math.min(day + SPIRAL_CHAPTER - 1, spiral.sessions)}</div>`
            : "";
          return `
            ${head}
            <button class="day-row ${day === current ? "current" : ""} ${info.milestone ? "milestone" : ""} ${status === "done" ? "finished" : ""}"
              data-action="open-day" data-program="${escapeHtml(program)}" data-day="${day}">
              <div class="day-row-head">
                <span class="day-num">Day ${day}</span>
                <strong class="day-title">${escapeHtml(info.title)}</strong>
                <span class="status ${status}">${status === "done" ? "hoàn thành" : status === "current" ? "đang học" : "chưa học"}</span>
              </div>
              <div class="muted day-unit">${info.unit ? `Chủ điểm: ${escapeHtml(info.unit)}` : "Nếp lớp, phản xạ và trò chơi ngôn ngữ"}</div>

              <div class="day-progress">
                <div class="day-progress-top">
                  <span class="day-count"><b>${done}</b>/${total} task đã làm</span>
                  <span class="day-time">≈ ${minutes} phút</span>
                </div>
                <div class="progress"><span style="width:${progress}%"></span></div>
              </div>

              <div class="day-steps">
                ${tasks.map((task, idx) => {
                  const isDone = doneSet.has(idx);
                  // Chỉ gợi "task tiếp theo" ở buổi đang làm dở, để 20 thẻ không
                  // cùng lúc nhấp nháy một chấm xanh gây rối mắt.
                  const isNext = done > 0 && !isDone && idx === tasks.findIndex((_, i) => !doneSet.has(i));
                  return `
                  <span class="day-step ${isDone ? "done" : isNext ? "next" : ""}" title="${escapeHtml(task.title)} — ${escapeHtml(task.step)}">
                    <i>${isDone ? "✓" : idx + 1}</i>${escapeHtml(taskPlain(task))}
                  </span>
                `;
                }).join("")}
              </div>

              <div class="spiral-chips">
                ${chips.length ? chips.map((strand) => {
                  const role = strandRole(strand, day);
                  return `
                  <span class="spiral-chip ${strand.group} ${strand.intro === day ? "intro" : ""}">
                    ${escapeHtml(strand.label)}
                    <em class="role-chip ${role}">${escapeHtml(ROLE_META[role].label)}</em>
                  </span>
                `;
                }).join("") : `<span class="spiral-chip routine">Thường lệ &amp; phản xạ</span>`}
              </div>
            </button>
          `;
        }).join("")}
      </div>
    </div>
  `;
}

// Chương trình chưa có lộ trình theo buổi thì roadmap liệt kê theo unit.
function renderProgramUnits(program) {
  const units = programUnits(program);
  return `
    ${renderCrumbs([
      { label: "Roadmap", action: "back-programs" },
      { label: program },
    ])}
    <div class="card">
      <div class="section-title">
        <h3>${escapeHtml(program)}</h3>
        <span class="pill">${units.length} bài</span>
      </div>
      <p class="muted spiral-note">Chương trình này chưa có lộ trình theo buổi, roadmap hiển thị theo bài học.</p>
      <div class="lesson-list">
        ${units.map((name, idx) => `
          <button class="lesson-row ${name === state.selectedUnit ? "active" : ""}" data-action="select-unit" data-unit="${escapeHtml(name)}">
            <div class="lesson-row-main">
              <strong>${idx + 1}. ${escapeHtml(name)}</strong>
              <span class="status ${name === state.selectedUnit ? "current" : "locked"}">${name === state.selectedUnit ? "đang học" : "chưa mở"}</span>
            </div>
            <div class="muted" style="margin-bottom:10px;">${escapeHtml(lessonCatalog[name].subtitle)}</div>
            ${lessonPills()}
          </button>
        `).join("")}
      </div>
    </div>
  `;
}

// Language Recycling Map (mục VI tài liệu định hướng): mỗi buổi phải nói rõ
// mảng nào là mới, mảng nào nhận diện lại, mảng nào bắt trẻ tự dùng.
function renderRecycleMap(info, day) {
  const map = info.recycleMap || {};
  const order = ["new", "recycle", "reuse", "daily", "milestone"];
  const cols = order.filter((role) => (map[role] || []).length);
  if (!cols.length) return "";
  return `
    <div class="card">
      <div class="section-title">
        <h3>Language Recycling Map · Day ${day}</h3>
        <span class="pill">NEW / RECYCLE / REUSE</span>
      </div>
      <div class="recycle-map">
        ${cols.map((role) => `
          <div class="recycle-col ${role}">
            <div class="recycle-head">
              <span class="role-chip ${role}">${escapeHtml(ROLE_META[role].label)}</span>
              <span class="muted">${escapeHtml(ROLE_META[role].note)}</span>
            </div>
            <ul>
              ${map[role].map((strand) => `<li>${escapeHtml(strand.label)}</li>`).join("")}
            </ul>
          </div>
        `).join("")}
      </div>
    </div>
  `;
}

function renderRoadmapDay(program, day) {
  const spiral = buildSpiral(program);
  if (!spiral) return renderProgramUnits(program);
  const current = Math.min(Math.max(day, 1), spiral.sessions);
  const info = sessionSummary(program, current);
  const unitName = lessonCatalog[info.unit] ? info.unit : programUnits(program)[0];
  const lesson = getLesson(unitName);
  const tasks = sessionTasks(program, current);
  return `
    ${renderCrumbs([
      { label: "Roadmap", action: "back-programs" },
      { label: program, action: "open-program", program },
      { label: `Day ${current}` },
    ])}
    <div class="hero">
      <div class="hero-grid">
        <div>
          <div class="pill">Chặng ${chapterOf(current)}/${SPIRAL_CHAPTERS} · Day ${current} / ${spiral.sessions}</div>
          <h2>${escapeHtml(info.title)}</h2>
          <p>Buổi 45 phút chạy đủ 10 Step trong ${tasks.length} task. Nội dung chính lấy từ unit <strong>${escapeHtml(unitName)}</strong> — ${escapeHtml(lesson.subtitle)}</p>
          <div class="hero-actions">
            <button class="primary-btn" data-action="open-task" data-task="0">Bắt đầu buổi học</button>
            <button class="secondary-btn" data-action="open-task" data-task="6">Tới phần nói</button>
          </div>
        </div>
        <div class="package-card">
          <div class="package-card-title">Gói bài học · ${escapeHtml(unitName)}</div>
          <div class="package-card-grid">
            <div><span>Truyện</span><strong>${escapeHtml(lesson.story)}</strong></div>
            <div><span>Bài hát</span><strong>${escapeHtml(lesson.song)}</strong></div>
            <div><span>Từ vựng</span><strong>${escapeHtml(lesson.vocabulary.join(", "))}</strong></div>
            <div><span>Cấu trúc</span><strong>${escapeHtml(lesson.structure.join(" / "))}</strong></div>
            <div><span>Phonics</span><strong>${escapeHtml(lesson.phonics.join(", "))}</strong></div>
            <div><span>Ý nghĩa giáo dục</span><strong>${escapeHtml(lesson.moral)}</strong></div>
          </div>
        </div>
      </div>
    </div>
    ${renderRecycleMap(info, current)}
    <div class="card">
      <div class="section-title">
        <h3>${tasks.length} task của buổi</h3>
        <span class="pill">${info.milestone ? "Buổi mốc" : "45 phút"}</span>
      </div>
      <div class="session-tasks">
        ${tasks.map((task, idx) => `
          <div class="task-item ${task.tone}">
            <div class="task-index">${idx + 1}</div>
            <div class="task-body">
              <div class="task-line">
                <strong>${escapeHtml(task.title)}</strong>
                ${task.step ? `<span class="task-step">${escapeHtml(task.step)}</span>` : ""}
              </div>
              ${task.instruction ? `<div class="task-instruction">${escapeHtml(task.instruction)}</div>` : ""}
              <div class="muted">${escapeHtml(task.detail)}</div>
            </div>
            <span class="task-time">${task.time}</span>
          </div>
        `).join("")}
      </div>
    </div>
    ${renderTaskRunner(program, current, unitName, tasks, info)}
    <div class="card">
      <div class="row-actions">
        <button class="ghost-btn" data-action="open-day" data-program="${escapeHtml(program)}" data-day="${Math.max(1, current - 1)}" ${current === 1 ? "disabled" : ""}>← Day ${Math.max(1, current - 1)}</button>
        <button class="ghost-btn" data-action="back-program" data-program="${escapeHtml(program)}">Về danh sách Day</button>
        <button class="primary-btn" data-action="open-day" data-program="${escapeHtml(program)}" data-day="${Math.min(spiral.sessions, current + 1)}" ${current === spiral.sessions ? "disabled" : ""}>Day ${Math.min(spiral.sessions, current + 1)} →</button>
      </div>
    </div>
  `;
}

function renderUnitDetail(unitName) {
  const name = lessonCatalog[unitName] ? unitName : state.selectedUnit;
  const lesson = getLesson(name);
  return `
    <div class="hero">
      <div class="hero-grid">
        <div>
          <div class="pill">Unit ${unitIndex(name)}</div>
          <h2>${escapeHtml(name)}</h2>
          <p>${escapeHtml(lesson.subtitle)} Bài học này được thiết kế như một gói hoàn chỉnh: truyện, bài hát, từ vựng, cấu trúc, phonics và ý nghĩa giáo dục.</p>
          <div class="hero-actions">
            <button class="primary-btn" data-action="open-task" data-task="0">Bắt đầu buổi học</button>
            <button class="secondary-btn" data-action="open-task" data-task="6">Tới phần nói</button>
          </div>
        </div>
        <div class="package-card">
          <div class="package-card-title">Gói bài học</div>
          <div class="package-card-grid">
            <div><span>Truyện</span><strong>${escapeHtml(lesson.story)}</strong></div>
            <div><span>Bài hát</span><strong>${escapeHtml(lesson.song)}</strong></div>
            <div><span>Từ vựng</span><strong>${escapeHtml(lesson.vocabulary.join(", "))}</strong></div>
            <div><span>Cấu trúc</span><strong>${escapeHtml(lesson.structure.join(" / "))}</strong></div>
            <div><span>Phonics</span><strong>${escapeHtml(lesson.phonics.join(", "))}</strong></div>
            <div><span>Ý nghĩa giáo dục</span><strong>${escapeHtml(lesson.moral)}</strong></div>
          </div>
        </div>
      </div>
    </div>
    ${renderTaskRunner(name, 1, name, unitTasks(name), unitInfo(name))}
  `;
}

// Unit rời (chương trình chưa có lộ trình theo buổi) vẫn dùng chung trang học
// tương tác, chỉ khác là 8 task dựng thẳng từ gói bài chứ không từ ma trận xoắn ốc.
// Thứ tự và tên Step phải trùng khung 10 Step, nếu không hai lối vào cùng một
// trang học sẽ lệch nhau.
function unitTasks(name) {
  const lesson = getLesson(name);
  return [
    { time: "5'", title: "Experience & Input", step: "Step 1-2", instruction: INSTRUCTION.listenPoint, detail: "Nghe truyện, bài hát và teacher talk, chỉ theo tranh.", tone: "routine" },
    { time: "6'", title: "Notice", step: "Step 3", instruction: INSTRUCTION.lookSay, detail: `Nhận ra từ trong câu: ${lesson.vocabulary.slice(0, 3).join(", ")}.`, tone: "intro" },
    { time: "6'", title: "Join in & Listening", step: "Step 4 + 8", instruction: INSTRUCTION.listenTick, detail: lesson.subtitle, tone: "repeat" },
    { time: "6'", title: "Use — hỏi đáp cặp đôi", step: "Step 5", instruction: INSTRUCTION.askAnswer, detail: "Hỏi đáp theo mẫu rồi đổi vai với bạn.", tone: "intro" },
    { time: "6'", title: "Phonics & Early Reading", step: "Step 6", instruction: INSTRUCTION.lookMatch, detail: `Âm ${lesson.phonics.join(", ")} — âm, động tác, ghép vần.`, tone: "phonics" },
    { time: "5'", title: "Reading & Writing", step: "Step 7", instruction: INSTRUCTION.readChoose, detail: "Đọc câu ngắn và chọn từ đúng.", tone: "literacy" },
    { time: "6'", title: "Speaking", step: "Step 9", instruction: INSTRUCTION.lookSay, detail: "Ghi âm câu mẫu rồi nói câu của riêng em.", tone: "routine" },
    { time: "5'", title: "Cambridge Checkpoint", step: "Step 10", instruction: INSTRUCTION.readChoose, detail: "Kiểm tra nhẹ dạng Starters rồi hát Goodbye Song.", tone: "check" },
  ];
}

function unitInfo(name) {
  const strand = { id: "unit", group: "topic", label: name, unit: name, intro: 1 };
  return {
    active: [strand],
    fresh: [strand], repeat: [], milestone: false, unit: name, title: name,
    recycleMap: { new: [strand], recycle: [], reuse: [], daily: [], milestone: [] },
    cast: castFor(strand),
    starter: starterTopicFor(strand),
  };
}

// ---------- Trang học tương tác của một buổi ----------
// 8 task do `sessionTasks` sinh ra được dựng thành 8 hoạt động bấm được: xem
// video, nghe đọc mẫu, chọn đáp án, ghi âm. Nội dung lấy từ strand của buổi và
// unit tương ứng trong catalog, không viết cứng cho bài nào.

const recorder = { rec: null, chunks: [], url: "", active: false, error: "" };

async function startRecording() {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    recorder.chunks = [];
    recorder.error = "";
    recorder.rec = new MediaRecorder(stream);
    recorder.rec.ondataavailable = (event) => event.data.size && recorder.chunks.push(event.data);
    recorder.rec.onstop = () => {
      stream.getTracks().forEach((track) => track.stop());
      if (recorder.url) URL.revokeObjectURL(recorder.url);
      recorder.url = URL.createObjectURL(new Blob(recorder.chunks, { type: "audio/webm" }));
      recorder.active = false;
      render();
    };
    recorder.rec.start();
    recorder.active = true;
    render();
  } catch (err) {
    recorder.active = false;
    recorder.error = "Trình duyệt chưa cho phép dùng micro. Bấm cho phép rồi thử lại nhé.";
    render();
  }
}

function stopRecording() {
  if (recorder.rec && recorder.active) recorder.rec.stop();
}

function sayBtn(text, label = "🔊") {
  return `<button class="say-btn" data-action="say" data-text="${escapeHtml(text)}" title="Nghe đọc mẫu">${label}</button>`;
}

function renderVideo(video, note = "") {
  if (!video) return "";
  // Chưa bấm thì chỉ có ảnh bìa + nút play của mình, không chữ nghĩa gì của
  // YouTube. Bấm play mới nạp iframe, nên trang cũng nhẹ hơn.
  return `
    <div class="media-card">
      <div class="media-frame">
        <img class="media-poster" src="https://i.ytimg.com/vi/${escapeHtml(video.id)}/hqdefault.jpg"
          alt="" decoding="async">
        <button class="media-play" data-action="play-video" data-vid="${escapeHtml(video.id)}"
          aria-label="Phát video: ${escapeHtml(video.title)}"><span></span></button>
      </div>
      ${note ? `<div class="muted media-note">${escapeHtml(note)}</div>` : ""}
    </div>
  `;
}

// Bấm play thì thay ảnh bìa bằng iframe và cho chạy luôn. Đổi thẳng DOM chứ
// không qua render() — gọi render() là video bị dựng lại từ đầu.
function playVideo(button) {
  const frame = button.closest(".media-frame");
  if (!frame) return;
  const params = [
    "autoplay=1", "rel=0", "modestbranding=1",
    "iv_load_policy=3", // tắt chú thích nổi
    "playsinline=1", "color=white",
  ].join("&amp;");
  frame.classList.add("playing");
  frame.innerHTML = `<iframe src="https://www.youtube-nocookie.com/embed/${escapeHtml(button.dataset.vid)}?${params}"
    title="Video bài học" allowfullscreen
    allow="autoplay; encrypted-media; picture-in-picture"></iframe>`;
}

// Một câu hỏi trắc nghiệm: bấm chọn là biết đúng/sai ngay, có tiếng phản hồi.
function renderChoices(qid, options, answer) {
  const picked = state.taskAnswers[qid];
  const buttons = options.map((option) => {
    const tone = picked !== option ? "" : option === answer ? "ok" : "miss";
    return `<button class="choice-btn ${tone}" data-action="answer" data-qid="${escapeHtml(qid)}"
      data-value="${escapeHtml(option)}" data-answer="${escapeHtml(answer)}">${escapeHtml(option)}</button>`;
  }).join("");
  const feedback = !picked
    ? ""
    : `<div class="choice-feedback ${picked === answer ? "ok" : "miss"}">${picked === answer
        ? "Chính xác!"
        : `Chưa đúng — đáp án là “${escapeHtml(answer)}”.`}</div>`;
  return `<div class="choice-row">${buttons}</div>${feedback}`;
}

// Gom từ vựng của các unit xuất hiện trong buổi để làm kho câu hỏi nghe.
function dayWordPool(program, day, lesson) {
  const spiral = buildSpiral(program);
  const words = [...lesson.vocabulary];
  if (spiral) {
    spiral.strands
      .filter((strand) => strand.unit && spiralHas(spiral, strand, day))
      .forEach((strand) => {
        const unit = lessonCatalog[strand.unit];
        if (unit) words.push(...unit.vocabulary);
      });
  }
  return [...new Set(words.map((word) => String(word).trim()).filter(Boolean))];
}

// Nguyên tắc 1 của trung tâm: không có từ đứng một mình. Mỗi từ phải được gắn
// vào một cụm hoặc câu lấy từ chính gói bài, chỉ khi không tìm được mới ghép
// mạo từ tối thiểu.
// Khung câu dự phòng khi gói bài chưa có câu mẫu chứa từ đó. Vẫn phải là câu
// hoàn chỉnh (nguyên tắc 1: không dạy từ trần), và phải đổi khung theo `variant`
// để hai câu điền chỗ trống trong cùng một task không ra y hệt nhau.
const WORD_FRAMES = [
  (article, word) => `It's ${article} ${word}.`,
  (article, word) => `I can see ${article} ${word}.`,
  (article, word) => `I have ${article} ${word}.`,
  (article, word) => `This is ${article} ${word}.`,
];

function wordInContext(word, lesson, variant = 0) {
  const clean = String(word).trim();
  const hit = (lesson.structure || []).find((line) =>
    new RegExp(`\\b${clean.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\b`, "i").test(line));
  if (hit) return hit;
  const article = /^[aeiou]/i.test(clean) ? "an" : "a";
  return WORD_FRAMES[Math.abs(variant) % WORD_FRAMES.length](article, clean);
}

// Câu lệnh chuẩn hiện trên đầu mỗi task — chỉ lấy từ 7 mẫu đã duyệt.
function instructionBar(task, note) {
  if (!task?.instruction) return "";
  return `
    <div class="instruction-bar">
      <span class="instruction-tag">${escapeHtml(task.instruction)}</span>
      <span class="muted">${escapeHtml(note)}</span>
    </div>
  `;
}

function renderTaskPanel(context) {
  const { program, day, index, task, lesson, info, unitName } = context;
  const qid = (suffix) => `${program}|${day}|${suffix}`;
  const focusStrand = info.fresh[0]
    || info.active.find((strand) => strand.group === "story" || strand.group === "song")
    || info.active.find((strand) => strand.group === "topic")
    || info.active[0];

  // Step 1-2 · Experience + Input — trẻ chỉ nghe và chỉ, chưa phải nói.
  if (index === 0) {
    const cast = info.cast || castFor(focusStrand);
    const lines = [
      `Hello! I'm ${cast.name}.`,
      ...(lesson.structure || []).slice(0, 2),
    ].filter(Boolean);
    return `
      ${instructionBar(task, "Nghe và chỉ vào tranh. Chưa cần nói.")}
      <div class="cast-card">
        <span class="cast-avatar">${escapeHtml(cast.name.slice(0, 1))}</span>
        <div>
          <strong>${escapeHtml(cast.name)}</strong>
          <div class="muted">${escapeHtml(cast.note)} · tình huống: ${escapeHtml(focusStrand?.label || unitName)}</div>
        </div>
      </div>
      ${renderVideo(videoFor(focusStrand) || videoLibrary.hello, `Story / Song mở bài: ${lesson.song}`)}
      <div class="say-list">
        ${lines.map((line) => `
          <div class="say-item">${sayBtn(line)}<span>${escapeHtml(line)}</span></div>
        `).join("")}
      </div>
    `;
  }

  // Step 3 · Notice — nhận ra từ và cụm từ. Từ luôn hiện kèm câu chứa nó.
  if (index === 1) {
    return `
      ${instructionBar(task, "Bấm thẻ để nghe cả câu, rồi nói theo.")}
      <div class="flash-grid">
        ${lesson.vocabulary.map((word, wi) => {
          const chunk = wordInContext(word, lesson, wi);
          const heard = state.taskAnswers[qid(`voc-${word}`)] === "heard";
          return `<button class="flash-card ${heard ? "heard" : ""}" data-action="flash"
            data-qid="${escapeHtml(qid(`voc-${word}`))}" data-text="${escapeHtml(chunk)}">
            <span class="flash-word">${escapeHtml(word)}</span>
            <span class="flash-chunk">${escapeHtml(chunk)}</span>
            <span class="flash-icon">🔊</span>
          </button>`;
        }).join("")}
      </div>
      <div class="say-list">
        ${lesson.structure.map((line) => `
          <div class="say-item">${sayBtn(line)}<span>${escapeHtml(line)}</span></div>
        `).join("")}
      </div>
    `;
  }

  // Step 4 + 8 · Join in + Listening — nghe rồi chọn.
  if (index === 2) {
    const pool = dayWordPool(program, day, lesson);
    if (pool.length < 3) return `<p class="muted">${escapeHtml(task.detail)}</p>`;
    const order = seededOrder(pool.length, day * 13 + 5);
    const rounds = [0, 1, 2].map((i) => {
      const answer = pool[order[i % pool.length]];
      // Lấy mồi nhử theo vòng tròn để kho từ ngắn vẫn đủ 3 lựa chọn mỗi câu.
      const others = order.map((o) => pool[o]).filter((word) => word !== answer);
      const distractors = [...new Set([others[(i * 2) % others.length], others[(i * 2 + 1) % others.length]])];
      const options = [answer, ...distractors];
      return { answer, options: seededOrder(options.length, day * 3 + i).map((o) => options[o]) };
    });
    return `
      ${instructionBar(task, "Nghe cả câu rồi chọn từ em nghe được. Từ lấy từ các bài đã học.")}
      ${rounds.map((round, i) => `
        <div class="quiz-block">
          <div class="quiz-head">${sayBtn(wordInContext(round.answer, lesson, day + i), "🔊 Nghe câu")}<span class="muted">Câu ${i + 1} / 3</span></div>
          ${renderChoices(qid(`listen-${i}`), round.options, round.answer)}
        </div>
      `).join("")}
    `;
  }

  // Step 5 · Use — hỏi đáp. Phản xạ 8 câu của trung tâm nằm ở đây vì đây đúng
  // là mẫu "Ask and answer", không phải phần khởi động cho có.
  if (index === 3) {
    const questions = [
      reflexQuestions[(day * 2 - 2) % reflexQuestions.length],
      reflexQuestions[(day * 2 - 1) % reflexQuestions.length],
    ];
    const pairLine = lesson.structure[day % Math.max(lesson.structure.length, 1)] || lesson.structure[0] || "";
    return `
      ${instructionBar(task, "Nghe câu hỏi, chọn câu trả lời, rồi quay sang bạn hỏi lại.")}
      ${questions.map((question, i) => {
        const bank = reflexBank[question] || { answer: "Yes, I do.", wrong: ["I'm fine.", "It's blue."] };
        const options = [bank.answer, ...bank.wrong];
        const order = seededOrder(options.length, day * 7 + i);
        return `
          <div class="quiz-block">
            <div class="quiz-head">${sayBtn(question)}<strong>${escapeHtml(question)}</strong></div>
            ${renderChoices(qid(`reflex-${i}`), order.map((o) => options[o]), bank.answer)}
          </div>
        `;
      }).join("")}
      ${pairLine ? `
        <div class="pair-card">
          <div class="pair-tag">Pair work</div>
          <div class="say-item">${sayBtn(pairLine)}<span>${escapeHtml(pairLine)}</span></div>
          <p class="muted">Nói câu này với bạn bên cạnh, rồi đổi vai.</p>
        </div>
      ` : ""}
    `;
  }

  // Step 6 · Phonics & Early Reading — âm → động tác → nhận diện → ghép vần → đọc.
  if (index === 4) {
    const letters = [...new Set(lesson.phonics.map(soundLetter).filter(Boolean))];
    const target = letters[day % Math.max(letters.length, 1)] || "s";
    const right = (phonicsWords[target] || ["sun"])[0];
    const others = Object.keys(phonicsWords).filter((key) => key !== target);
    const wrongOrder = seededOrder(others.length, day * 11);
    const wrong = wrongOrder.slice(0, 2).map((o) => (phonicsWords[others[o]] || ["cat"])[0]);
    const options = [right, ...wrong];
    const phonicsGroup = lesson.phonics.some((p) => /ck|e|h|r|m|d/.test(soundLetter(p))) && info.active.some((s) => strandVideo[s.id] === "jolly2")
      ? videoLibrary.jolly2
      : videoLibrary.jolly1;
    // Blending là bước bắt buộc trong chuỗi phonics của trung tâm: đọc rời từng
    // âm rồi trượt lại thành từ, chứ không phải viết chữ lặp lại.
    const blendWords = (phonicsWords[target] || []).filter((word) => word.length <= 4).slice(0, 3);
    return `
      ${instructionBar(task, "Bấm chữ để nghe âm, rồi ghép âm thành từ.")}
      <div class="letter-row">
        ${letters.map((letter) => {
          const sample = (phonicsWords[letter] || []).slice(0, 3);
          const text = sample.length ? `${letter}. ${sample.join(", ")}` : letter;
          return `<button class="letter-tile" data-action="say" data-text="${escapeHtml(text)}">
            <span class="letter-main">${escapeHtml(letter)}</span>
            <span class="letter-sample">${escapeHtml(sample[0] || "")}</span>
          </button>`;
        }).join("")}
      </div>
      ${blendWords.length ? `
        <div class="blend-row">
          ${blendWords.map((word) => `
            <button class="blend-tile" data-action="say" data-text="${escapeHtml(`${word.split("").join(" ")} ... ${word}`)}">
              <span class="blend-sounds">${escapeHtml(word.split("").join(" - "))}</span>
              <span class="blend-word">→ ${escapeHtml(word)}</span>
            </button>
          `).join("")}
        </div>
      ` : ""}
      <div class="quiz-block">
        <div class="quiz-head"><strong>Từ nào bắt đầu bằng chữ “${escapeHtml(target)}”?</strong></div>
        ${renderChoices(qid("phonics"), seededOrder(options.length, day * 5).map((o) => options[o]), right)}
      </div>
      ${renderVideo(phonicsGroup, "Nghe lại bộ âm rồi bắt chước khẩu hình.")}
    `;
  }

  // Step 7 · Reading & Writing — đọc câu đã nghe quen rồi chọn từ còn thiếu.
  if (index === 5) {
    const pool = [...new Set(lesson.vocabulary.map((word) => String(word).trim()).filter(Boolean))];
    const order = seededOrder(Math.max(pool.length, 1), day * 17 + 3);
    const rounds = [];
    for (let i = 0; i < 2; i += 1) {
      const answer = pool[order[i % Math.max(pool.length, 1)]] || "book";
      let gapSource = wordInContext(answer, lesson, day + i);
      let gap = gapSource.replace(new RegExp(`\\b${answer.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\b`, "i"), "______");
      // Nếu hai câu điền ra giống hệt nhau (kho từ ngắn, hoặc cả hai cùng khớp
      // một câu mẫu) thì đổi sang khung câu dự phòng khác để trẻ không thấy hai
      // dòng y hệt.
      if (rounds[0] && rounds[0].gap === gap) {
        const article = /^[aeiou]/i.test(answer) ? "an" : "a";
        gapSource = WORD_FRAMES[(day + i + 1) % WORD_FRAMES.length](article, answer);
        gap = gapSource.replace(new RegExp(`\\b${answer.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\b`, "i"), "______");
      }
      const others = pool.filter((word) => word.toLowerCase() !== answer.toLowerCase());
      const distractors = [...new Set([others[(i * 2) % Math.max(others.length, 1)], others[(i * 2 + 1) % Math.max(others.length, 1)]])]
        .filter(Boolean);
      const options = [answer, ...distractors];
      rounds.push({ answer, gap, options: seededOrder(options.length, day * 9 + i).map((o) => options[o]) });
    }
    return `
      ${instructionBar(task, "Đọc câu, chọn từ đúng để điền vào chỗ trống.")}
      ${rounds.map((round, i) => `
        <div class="quiz-block">
          <div class="quiz-head"><span class="read-line">${escapeHtml(round.gap)}</span></div>
          ${renderChoices(qid(`read-${i}`), round.options, round.answer)}
        </div>
      `).join("")}
      <div class="home-card">
        <div class="pair-tag">${escapeHtml(INSTRUCTION.drawColour)} · về nhà</div>
        <p class="muted">Vẽ và tô một hình về ${escapeHtml(unitName)}, rồi viết tên đồ vật bên dưới.</p>
      </div>
    `;
  }

  // Step 9 · Speaking — nghe mẫu → nói theo → nói về mình.
  if (index === 6) {
    const line = lesson.structure[0] || "I like English!";
    const own = lesson.structure[1] || line;
    return `
      ${instructionBar(task, "Nghe mẫu, nói lại, rồi nói câu của chính em.")}
      <div class="quiz-block">
        <div class="quiz-head">${sayBtn(line, "🔊 Nghe mẫu")}<strong>${escapeHtml(line)}</strong></div>
        <p class="muted">Bấm ghi âm và nói lại câu trên. Nghe lại xem đã giống chưa.</p>
        <div class="row-actions">
          ${recorder.active
            ? `<button class="primary-btn recording" data-action="record-stop">⏹ Dừng ghi</button>`
            : `<button class="primary-btn" data-action="record-start">🎙 Ghi âm câu của em</button>`}
        </div>
        ${recorder.error ? `<div class="choice-feedback miss">${escapeHtml(recorder.error)}</div>` : ""}
        ${recorder.url && !recorder.active ? `<audio class="record-play" controls src="${recorder.url}"></audio>` : ""}
      </div>
      <div class="pair-card">
        <div class="pair-tag">Personalisation</div>
        <div class="say-item">${sayBtn(own)}<span>${escapeHtml(own)}</span></div>
        <p class="muted">Đổi từ trong câu thành thứ của riêng em rồi nói lại.</p>
      </div>
    `;
  }

  // Step 10 · Cambridge Checkpoint — kiểm tra nhẹ theo chủ đề Starters.
  const topic = info.starter || starterTopicFor(focusStrand);
  const bank = lesson.vocabulary.map((word) => String(word).trim()).filter(Boolean);
  const checkOrder = seededOrder(Math.max(bank.length, 1), day * 23 + 7);
  const checkRounds = [0, 1].map((i) => {
    const answer = bank[checkOrder[i % Math.max(bank.length, 1)]] || "book";
    const others = bank.filter((word) => word.toLowerCase() !== answer.toLowerCase());
    const distractors = [...new Set([others[i % Math.max(others.length, 1)], others[(i + 2) % Math.max(others.length, 1)]])]
      .filter(Boolean);
    const options = [answer, ...distractors];
    return { answer, options: seededOrder(options.length, day * 29 + i).map((o) => options[o]) };
  });
  return `
    ${instructionBar(task, `Dạng bài Cambridge Starters — chủ đề “${topic}”.`)}
    <div class="checkpoint-head">
      <span class="checkpoint-tag">Starters</span>
      <strong>${escapeHtml(topic)}</strong>
    </div>
    ${checkRounds.map((round, i) => `
      <div class="quiz-block">
        <div class="quiz-head">${sayBtn(wordInContext(round.answer, lesson, day + i * 2), "🔊 Listen")}<span class="muted">Question ${i + 1} / 2</span></div>
        ${renderChoices(qid(`check-${i}`), round.options, round.answer)}
      </div>
    `).join("")}
    ${renderVideo(videoLibrary.goodbye, "Hát Goodbye Song và nhận task về nhà.")}
  `;
}

function renderTaskRunner(program, day, unitName, tasks, info) {
  const key = `${program}|${day}`;
  const done = state.taskDone[key] || [];
  const open = Math.min(Math.max(state.activeTask, 0), tasks.length - 1);
  const lesson = getLesson(unitName);
  const percent = Math.round((done.length / tasks.length) * 100);
  return `
    <div class="card">
      <div class="section-title">
        <h3>Học cùng ${tasks.length} task</h3>
        <span class="pill">${done.length} / ${tasks.length} xong</span>
      </div>
      <div class="progress"><span style="width:${percent}%"></span></div>
      <div class="task-run">
        ${tasks.map((task, index) => {
          const isOpen = index === open;
          const isDone = done.includes(index);
          return `
            <div class="task-panel ${task.tone} ${isOpen ? "open" : ""} ${isDone ? "done" : ""}">
              <button class="task-panel-head" data-action="open-task" data-task="${index}">
                <span class="task-index">${isDone ? "✓" : index + 1}</span>
                <span class="task-panel-title">
                  <span class="task-line">
                    <strong>${escapeHtml(task.title)}</strong>
                    ${task.step ? `<span class="task-step">${escapeHtml(task.step)}</span>` : ""}
                  </span>
                  <span class="muted">${escapeHtml(task.detail)}</span>
                </span>
                <span class="task-time">${task.time}</span>
              </button>
              ${isOpen ? `
                <div class="task-panel-body">
                  ${renderTaskPanel({ program, day, index, task, lesson, info, unitName })}
                  <div class="row-actions task-nav">
                    <button class="ghost-btn" data-action="open-task" data-task="${Math.max(0, index - 1)}" ${index === 0 ? "disabled" : ""}>← Task trước</button>
                    <button class="primary-btn" data-action="task-done" data-program="${escapeHtml(program)}" data-day="${day}" data-task="${index}" data-total="${tasks.length}">
                      ${isDone ? "Đã xong · làm lại sau" : "Xong task này"}
                    </button>
                  </div>
                </div>
              ` : ""}
            </div>
          `;
        }).join("")}
      </div>
      ${done.length === tasks.length
        ? `<div class="band finish-band"><strong>Hoàn thành buổi ${day}! 🎉</strong><div class="muted">Em đã đi hết ${tasks.length} task. Bấm “Day ${day + 1} →” để học tiếp.</div></div>`
        : ""}
    </div>
  `;
}

const spiralGroupLabels = {
  routine: "Thường lệ",
  topic: "Chủ điểm",
  story: "Truyện",
  song: "Bài hát",
  phonics: "Phonics",
  milestone: "Mốc",
};

// Ma trận xoắn ốc — nằm bên quản trị để giáo viên soạn lịch, học viên đi bằng Roadmap.
function renderSpiralPlan() {
  const program = spiralPlans[state.spiralProgram] ? state.spiralProgram : spiralPrograms[0];
  const spiral = buildSpiral(program);
  const days = Array.from({ length: spiral.sessions }, (_, i) => i + 1);
  const selectedDay = Math.min(Math.max(state.selectedDay || 1, 1), spiral.sessions);
  const tasks = sessionTasks(program, selectedDay);
  const activeStrands = spiral.strands.filter((strand) => spiralHas(spiral, strand, selectedDay));
  const chapter = chapterOf(selectedDay);

  return `
    <div class="card">
      <div class="section-title">
        <h3>Lộ trình ${spiral.sessions} buổi</h3>
        <span class="pill">Spiral learning</span>
      </div>
      <div class="program-switch">
        ${spiralPrograms.map((item) => `
          <button class="program-tab ${item === program ? "active" : ""}" data-action="select-spiral" data-program="${escapeHtml(item)}">
            ${escapeHtml(item)}<span class="program-tab-count">${spiralPlans[item].sessions} buổi</span>
          </button>
        `).join("")}
      </div>
      <p class="muted spiral-note">
        Mỗi hàng là một mảng ngôn ngữ. Ô đậm là buổi vào bài mới, ô nhạt là buổi quay lại theo khoảng cách giãn dần
        (+1, +3, +6, +10, +15, +21, +28 buổi). Bấm vào một buổi để xem task chi tiết.
      </p>
      <div class="spiral-legend">
        ${Object.entries(spiralGroupLabels).map(([key, label]) => `
          <span class="legend-item"><i class="spiral-swatch ${key}"></i>${label}</span>
        `).join("")}
        <span class="legend-item"><i class="spiral-swatch topic repeat"></i>Ô nhạt = ôn lại</span>
      </div>
      <div class="spiral-wrap">
        <div class="spiral-grid" style="--spiral-cols:${spiral.sessions}">
          <div class="spiral-corner">Mảng ngôn ngữ</div>
          ${days.map((day) => `
            <button class="spiral-head ${SPIRAL_MILESTONES.includes(day) ? "milestone" : ""} ${day === selectedDay ? "active" : ""}"
              data-action="select-day" data-day="${day}" title="Buổi ${day}">${day}</button>
          `).join("")}
          ${spiral.strands.map((strand) => `
            <div class="spiral-label ${strand.group}" title="${escapeHtml(strand.detail)}">
              <strong>${escapeHtml(strand.label)}</strong>
              <span class="muted">${spiralGroupLabels[strand.group]}${strand.unit ? ` · ${escapeHtml(strand.unit)}` : ""}</span>
            </div>
            ${days.map((day) => {
              if (!spiralHas(spiral, strand, day)) {
                return `<button class="spiral-cell empty ${day === selectedDay ? "col" : ""}" data-action="select-day" data-day="${day}" aria-label="Buổi ${day}"></button>`;
              }
              const isIntro = strand.intro === day || Boolean(strand.fixed?.includes(day));
              return `<button class="spiral-cell ${strand.group} ${isIntro ? "intro" : "repeat"} ${day === selectedDay ? "col" : ""}"
                data-action="select-day" data-day="${day}"
                title="Buổi ${day} · ${escapeHtml(strand.label)}${isIntro ? " (vào bài)" : " (ôn lại)"}"></button>`;
            }).join("")}
          `).join("")}
        </div>
      </div>
    </div>
    <div class="card">
      <div class="section-title">
        <h3>Buổi ${selectedDay} · Chặng ${chapter}/${SPIRAL_CHAPTERS}</h3>
        <span class="pill">${SPIRAL_MILESTONES.includes(selectedDay) ? "Buổi mốc" : "45 phút"}</span>
      </div>
      <div class="spiral-chips">
        ${activeStrands.map((strand) => {
          const role = strandRole(strand, selectedDay);
          return `
          <span class="spiral-chip ${strand.group} ${strand.intro === selectedDay ? "intro" : ""}">
            ${escapeHtml(strand.label)}
            <em class="role-chip ${role}">${escapeHtml(ROLE_META[role].label)}</em>
          </span>
        `;
        }).join("")}
      </div>
      <div class="session-tasks">
        ${tasks.map((task, idx) => `
          <div class="task-item ${task.tone}">
            <div class="task-index">${idx + 1}</div>
            <div class="task-body">
              <div class="task-line">
                <strong>${escapeHtml(task.title)}</strong>
                ${task.step ? `<span class="task-step">${escapeHtml(task.step)}</span>` : ""}
              </div>
              ${task.instruction ? `<div class="task-instruction">${escapeHtml(task.instruction)}</div>` : ""}
              <div class="muted">${escapeHtml(task.detail)}</div>
            </div>
            <span class="task-time">${task.time}</span>
          </div>
        `).join("")}
      </div>
      <div class="spiral-steps">
        <button class="action-btn" data-action="select-day" data-day="${Math.max(1, selectedDay - 1)}" ${selectedDay === 1 ? "disabled" : ""}>← Buổi trước</button>
        <button class="action-btn" data-action="select-day" data-day="${Math.min(spiral.sessions, selectedDay + 1)}" ${selectedDay === spiral.sessions ? "disabled" : ""}>Buổi sau →</button>
      </div>
    </div>
  `;
}

function badgeClass(key) {
  if (key === "active" || key === "done" || key === "published") return "badge-green";
  if (key === "pending" || key === "editing") return "badge-yellow";
  if (key === "review" || key === "paused" || key === "draft") return "badge-amber";
  return "badge-blue";
}

function matchesQuery(text) {
  return String(text).toLowerCase().includes(adminUi.query.trim().toLowerCase());
}

function renderAdminTable(headers, rows) {
  return `
    <div class="admin-table-wrap">
      <table class="admin-table">
        <thead><tr>${headers.map((h) => `<th>${h}</th>`).join("")}</tr></thead>
        <tbody>${rows.join("")}</tbody>
      </table>
    </div>
  `;
}

function renderTrashBtn() {
  return `<button class="icon-btn" data-action="admin-delete" aria-label="Xóa"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M4 7h16"/><path d="M9 7V5h6v2"/><path d="M7 7l1 14h8l1-14"/></svg></button>`;
}

function getGradeDemo(item) {
  const lesson = getLesson(item.lesson);
  if (item.type === "Nói") {
    return {
      activityTitle: "Phần nói",
      prompt: lesson.structure[0],
      model: lesson.structure[1],
      vocab: lesson.vocabulary.slice(0, 6),
      studentWork: item.answer,
      workLabel: "Câu học viên nói",
    };
  }
  if (item.type === "Nghe") {
    const words = lesson.vocabulary.slice(0, 3);
    return {
      activityTitle: "Nghe & Chọn",
      prompt: "Học viên nghe và chọn từ đúng.",
      questions: words.map((word, index) => ({
        q: `Câu ${index + 1}: chọn từ vừa nghe`,
        options: words,
        chosen: words[item.choices?.[index] ?? 0],
        correct: word,
      })),
      vocab: words,
    };
  }
  if (item.type === "Phonics") {
    return {
      activityTitle: "Phonics",
      prompt: `Từ nào bắt đầu bằng ${lesson.phonics[0]}?`,
      options: [lesson.phonics[1], lesson.vocabulary[0], lesson.vocabulary[1]],
      chosen: item.answer,
      correct: lesson.phonics[1],
      vocab: lesson.phonics,
    };
  }
  return {
    activityTitle: "Viết",
    prompt: lesson.structure[0],
    model: lesson.structure.slice(0, 2).join(" / "),
    studentWork: item.answer,
    workLabel: "Bài viết của học viên",
    vocab: lesson.vocabulary.slice(0, 6),
  };
}

function renderGradeTask(item, demo) {
  if (demo.questions) {
    return demo.questions.map((row) => `
      <div class="grade-question">
        <strong>${row.q}</strong>
        <div class="muted">Học viên chọn: ${row.chosen}</div>
        <div class="muted">Đáp án: ${row.correct}</div>
      </div>
    `).join("");
  }
  if (demo.options) {
    return `
      <div class="grade-question">
        <strong>${demo.prompt}</strong>
        <div class="badge-row" style="margin-top:10px;">${demo.options.map((opt) => `<span class="badge ${opt === demo.chosen ? "badge-blue" : "badge-gray"}">${opt}</span>`).join("")}</div>
        <div class="muted" style="margin-top:10px;">Đáp án đúng: ${demo.correct}</div>
      </div>
    `;
  }
  return `
    <div class="grade-question">
      <div class="muted">Câu hỏi trên trang học viên</div>
      <strong>${demo.prompt}</strong>
      <div class="muted" style="margin-top:10px;">Mẫu: ${demo.model}</div>
    </div>
  `;
}

function renderAdminDashboard() {
  const pending = adminGrading.filter((item) => item.statusKey === "pending").length;
  return `
    <div class="admin-stats">
      <div class="admin-stat"><div class="metric-value">${adminUsers.filter((u) => u.roleKey === "student").length}</div><div class="metric-label">Học viên</div></div>
      <div class="admin-stat"><div class="metric-value">${lessonOrder.length}</div><div class="metric-label">Bài giảng</div></div>
      <div class="admin-stat"><div class="metric-value">${pending}</div><div class="metric-label">Bài chờ chấm</div></div>
      <div class="admin-stat"><div class="metric-value">${adminSyllabus.length}</div><div class="metric-label">Syllabus</div></div>
    </div>
    <div class="admin-shortcuts">
      <button class="admin-shortcut" data-page="users"><strong>Người dùng</strong><span class="muted">Quản lý học viên và giáo viên</span></button>
      <button class="admin-shortcut" data-page="lessons"><strong>Bài giảng</strong><span class="muted">Danh sách và trạng thái bài học</span></button>
      <button class="admin-shortcut" data-page="grading"><strong>Chấm bài</strong><span class="muted">${pending} bài đang chờ</span></button>
      <button class="admin-shortcut" data-page="fees"><strong>Học phí</strong><span class="muted">Theo dõi công nợ học viên</span></button>
      <button class="admin-shortcut" data-page="syllabus"><strong>Syllabus</strong><span class="muted">Biên soạn Movers / Flyers / 2019 Khóa 1 / Seed 39 Khóa 2</span></button>
    </div>
    <div class="card admin-panel">
      <div class="admin-panel-head">
        <h3>Bài nộp gần đây</h3>
        <button class="admin-add" data-page="grading">Xem tất cả</button>
      </div>
      ${renderAdminTable(
        ["MÃ", "HỌC VIÊN", "BÀI", "LOẠI", "TRẠNG THÁI", "THAO TÁC"],
        adminGrading.slice(0, 4).map((item) => `
          <tr>
            <td>${item.code}</td>
            <td><button class="admin-link" data-action="open-grade" data-code="${item.code}">${item.student}</button></td>
            <td>${item.lesson}</td>
            <td><span class="badge badge-blue">${item.type}</span></td>
            <td><span class="badge ${badgeClass(item.statusKey)}">${item.status}</span></td>
            <td><button class="admin-link" data-action="open-grade" data-code="${item.code}">Chấm</button></td>
          </tr>
        `)
      )}
    </div>
  `;
}

function renderAdminUsers() {
  const rows = adminUsers.filter((item) => {
    const byRole = adminUi.roleFilter === "all" || item.roleKey === adminUi.roleFilter;
    const byQuery = !adminUi.query || matchesQuery(`${item.code} ${item.name} ${item.className}`);
    return byRole && byQuery;
  });
  return `
    <div class="card admin-panel">
      <div class="admin-panel-head">
        <h3>Danh sách người dùng <span class="admin-count">(${rows.length})</span></h3>
        <button class="admin-add" data-action="admin-add">+ Thêm</button>
      </div>
      <div class="admin-toolbar">
        <input id="adminSearch" data-admin-field="query" placeholder="Tìm kiếm tên, mã, lớp..." />
        <select data-admin-field="roleFilter">
          <option value="all">Tất cả vai trò</option>
          <option value="student">Học viên</option>
          <option value="teacher">Giáo viên</option>
          <option value="admin">Quản trị</option>
        </select>
        <select>
          <option>Tất cả trạng thái</option>
          <option>Đang học</option>
          <option>Tạm nghỉ</option>
        </select>
      </div>
      ${renderAdminTable(
        ["MÃ", "HỌ TÊN", "VAI TRÒ", "LỚP / PHỤ TRÁCH", "TRẠNG THÁI", "THAO TÁC"],
        rows.map((item) => `
          <tr>
            <td>${item.code}</td>
            <td><button class="admin-link">${item.name}</button></td>
            <td><span class="badge ${item.roleKey === "student" ? "badge-blue" : "badge-yellow"}">${item.role}</span></td>
            <td>${item.className}</td>
            <td><span class="badge ${badgeClass(item.statusKey)}">${item.status}</span></td>
            <td>${renderTrashBtn()}</td>
          </tr>
        `)
      )}
    </div>
  `;
}

function renderAdminLessons() {
  if (adminUi.selectedLesson && lessonCatalog[adminUi.selectedLesson]) {
    return renderAdminLessonDetail(adminUi.selectedLesson);
  }
  const rows = lessonOrder.map((name) => {
    const lesson = lessonCatalog[name];
    const statusKey = lessonStatus(lesson);
    return {
      name,
      lesson,
      statusKey,
      status: lessonStatusLabel(statusKey),
      program: lessonProgram(lesson),
    };
  }).filter((item) => {
    const byProgram = adminUi.programFilter === "all" || item.program === adminUi.programFilter;
    const byQuery = !adminUi.query || matchesQuery(`${item.name} ${item.lesson.subtitle}`);
    return byProgram && byQuery;
  });
  return `
    <div class="card admin-panel">
      <div class="admin-panel-head">
        <h3>Danh sách bài giảng <span class="admin-count">(${rows.length})</span></h3>
        <button class="admin-add" data-action="admin-add">+ Thêm</button>
      </div>
      <div class="admin-toolbar">
        <input id="adminSearch" data-admin-field="query" placeholder="Tìm kiếm bài giảng..." />
        <select data-admin-field="programFilter">
          <option value="all">Tất cả chương trình</option>
          ${programList.map((item) => `<option value="${escapeHtml(item)}" ${item === adminUi.programFilter ? "selected" : ""}>${item}</option>`).join("")}
        </select>
        <select>
          <option>Tất cả trạng thái</option>
          <option>Đã xuất bản</option>
          <option>Đang soạn</option>
        </select>
      </div>
      ${renderAdminTable(
        ["MÃ", "TÊN BÀI", "CHƯƠNG TRÌNH", "GÓI HỌC", "TRẠNG THÁI", "THAO TÁC"],
        rows.map((item) => `
          <tr>
            <td>U${String(item.lesson.order).padStart(2, "0")}</td>
            <td><button class="admin-link" data-action="open-lesson" data-unit="${escapeHtml(item.name)}">${item.name}</button><div class="muted">${item.lesson.subtitle}</div></td>
            <td><span class="badge badge-yellow">${item.program}</span></td>
            <td>Truyện · Bài hát · Nói</td>
            <td><span class="badge ${badgeClass(item.statusKey)}">${item.status}</span></td>
            <td><button class="admin-link" data-action="open-lesson" data-unit="${escapeHtml(item.name)}">Xem</button></td>
          </tr>
        `)
      )}
    </div>
  `;
}

function renderAdminLessonDetail(name) {
  const lesson = getLesson(name);
  const statusKey = lessonStatus(lesson);
  const program = lessonProgram(lesson);
  const media = lessonMedia(name, lesson);
  const steps = [
    ["story", "Truyện"],
    ["song", "Bài hát"],
    ["listen", "Nghe & Chọn"],
    ["say", "Luyện nói"],
    ["phonics", "Phonics"],
    ["game", "Trò chơi"],
    ["speak", "Nói"],
    ["review", "Ôn tập"],
  ];
  return `
    <div class="grade-toolbar">
      <button class="admin-back" data-action="close-lesson">Quay lại danh sách</button>
      <span class="badge ${badgeClass(statusKey)}">${lessonStatusLabel(statusKey)}</span>
    </div>
    <div class="card admin-panel">
      <div class="admin-panel-head">
        <h3>Chi tiết bài giảng · U${String(lesson.order).padStart(2, "0")}</h3>
        <span class="badge badge-yellow">${program}</span>
      </div>
      <form class="lesson-form" data-action="save-lesson" onsubmit="return false;">
        <div class="lesson-form-grid">
          <label>Mã bài
            <input value="U${String(lesson.order).padStart(2, "0")}" readonly />
          </label>
          <label>Tên bài
            <input id="lessonName" value="${escapeHtml(name)}" readonly />
          </label>
          <label>Thứ tự
            <input id="lessonOrder" type="number" min="1" value="${lesson.order}" />
          </label>
          <label>Chương trình
            <select id="lessonProgram">
              ${programList.map((item) => `<option ${item === program ? "selected" : ""}>${item}</option>`).join("")}
            </select>
          </label>
          <label>Trạng thái
            <select id="lessonStatus">
              <option value="published" ${statusKey === "published" ? "selected" : ""}>Đã xuất bản</option>
              <option value="editing" ${statusKey === "editing" ? "selected" : ""}>Đang soạn</option>
              <option value="draft" ${statusKey === "draft" ? "selected" : ""}>Bản nháp</option>
            </select>
          </label>
        </div>
        <label>Mô tả
          <textarea id="lessonSubtitle" rows="2">${escapeHtml(lesson.subtitle)}</textarea>
        </label>
        <label>Truyện
          <textarea id="lessonStory" rows="2">${escapeHtml(lesson.story)}</textarea>
        </label>
        <label>Bài hát
          <textarea id="lessonSong" rows="2">${escapeHtml(lesson.song)}</textarea>
        </label>
        <label>Từ vựng
          <textarea id="lessonVocab" rows="3">${escapeHtml(lesson.vocabulary.join(", "))}</textarea>
        </label>
        <label>Cấu trúc câu
          <textarea id="lessonStructure" rows="3">${escapeHtml(lesson.structure.join("\n"))}</textarea>
        </label>
        <label>Phonics
          <input id="lessonPhonics" value="${escapeHtml(lesson.phonics.join(", "))}" />
        </label>
        <label>Ý nghĩa giáo dục
          <textarea id="lessonMoral" rows="2">${escapeHtml(lesson.moral)}</textarea>
        </label>
        <div class="media-section">
          <div class="admin-panel-head" style="margin:8px 0 4px;">
            <h3>Học liệu đa phương tiện</h3>
          </div>
          <p class="muted">Ảnh, video và audio dùng trên trang học viên cho truyện, bài hát, nghe và nói.</p>
          <div class="media-grid">
            ${renderMediaField("lessonCover", "Ảnh bìa", "image", media.coverImage)}
            ${renderMediaField("lessonStoryImage", "Ảnh minh họa truyện", "image", media.storyImage)}
            ${renderMediaField("lessonStoryVideo", "Video truyện", "video", media.storyVideo)}
            ${renderMediaField("lessonSongAudio", "Audio bài hát", "audio", media.songAudio)}
            ${renderMediaField("lessonListenAudio", "Audio nghe", "audio", media.listenAudio)}
            ${renderMediaField("lessonPhonicsAudio", "Audio phonics", "audio", media.phonicsAudio)}
            ${renderMediaField("lessonSpeakAudio", "Audio mẫu nói", "audio", media.speakAudio)}
          </div>
        </div>
        <div>
          <div class="muted" style="margin-bottom:8px;">Gói học trên trang học viên</div>
          <div class="lesson-step-pills">
            ${steps.map(([key, label]) => `<span class="badge badge-blue">${label}</span>`).join("")}
          </div>
        </div>
        <button class="admin-add" data-action="save-lesson">Lưu bài giảng</button>
      </form>
    </div>
  `;
}

function renderAdminGrading() {
  const selected = adminGrading.find((item) => item.code === adminUi.selectedGrade);
  if (selected) return renderAdminGradeDetail(selected);

  const rows = adminGrading.filter((item) => {
    const byStatus = adminUi.gradeFilter === "all" || item.statusKey === adminUi.gradeFilter;
    const byQuery = !adminUi.query || matchesQuery(`${item.code} ${item.student} ${item.lesson}`);
    return byStatus && byQuery;
  });
  return `
    <div class="card admin-panel">
      <div class="admin-panel-head">
        <h3>Danh sách bài nộp <span class="admin-count">(${rows.length})</span></h3>
      </div>
      <div class="admin-toolbar">
        <input id="adminSearch" data-admin-field="query" placeholder="Tìm học viên, bài, mã nộp..." />
        <select data-admin-field="gradeFilter">
          <option value="all">Tất cả trạng thái</option>
          <option value="pending">Chờ chấm</option>
          <option value="done">Đã chấm</option>
          <option value="review">Cần xem lại</option>
        </select>
        <select>
          <option>Tất cả loại bài</option>
          <option>Nói</option>
          <option>Nghe</option>
          <option>Phonics</option>
        </select>
      </div>
      ${renderAdminTable(
        ["MÃ", "HỌC VIÊN", "BÀI GIẢNG", "LOẠI", "NỘP LÚC", "ĐIỂM", "TRẠNG THÁI", "THAO TÁC"],
        rows.map((item) => `
          <tr>
            <td>${item.code}</td>
            <td><button class="admin-link" data-action="open-grade" data-code="${item.code}">${item.student}</button></td>
            <td>${item.lesson}</td>
            <td><span class="badge badge-blue">${item.type}</span></td>
            <td>${item.submitted}</td>
            <td>${item.score}</td>
            <td><span class="badge ${badgeClass(item.statusKey)}">${item.status}</span></td>
            <td><button class="admin-link" data-action="open-grade" data-code="${item.code}">Chấm bài</button></td>
          </tr>
        `)
      )}
    </div>
  `;
}

function renderAdminGradeDetail(item) {
  const lesson = getLesson(item.lesson);
  const demo = getGradeDemo(item);
  const currentScore = String(item.score).split("/")[0];
  return `
    <div class="grade-toolbar">
      <button class="admin-back" data-action="close-grade">Quay lại danh sách</button>
      <span class="badge ${badgeClass(item.statusKey)}">${item.status}</span>
    </div>
    <div class="grade-layout">
      <div class="card admin-panel">
        <div class="admin-panel-head">
          <h3>${demo.activityTitle} · ${item.lesson}</h3>
          <span class="badge badge-blue">${item.type}</span>
        </div>
        <p class="muted">${lesson.subtitle}</p>
        <div class="grade-meta">
          <div><span>Unit</span><strong>${lesson.order}. ${item.lesson}</strong></div>
          <div><span>Cấu trúc</span><strong>${lesson.structure[0]}</strong></div>
          <div><span>Từ vựng</span><strong>${(demo.vocab || lesson.vocabulary.slice(0, 6)).join(", ")}</strong></div>
        </div>
        <div class="grade-task">
          ${renderGradeTask(item, demo)}
        </div>
      </div>
      <div class="card admin-panel">
        <div class="admin-panel-head">
          <h3>${item.student}</h3>
          <span class="muted">${item.className} · ${item.code}</span>
        </div>
        ${demo.studentWork ? `
          <div class="grade-answer">
            <div class="muted">${demo.workLabel}</div>
            <strong>${demo.studentWork}</strong>
          </div>
        ` : ""}
        <div class="grade-form">
          <label>Điểm</label>
          <select id="gradeScore">
            ${[10, 9, 8, 7, 6, 5, 4, 3, 2, 1].map((n) => `<option value="${n}" ${String(n) === currentScore ? "selected" : ""}>${n}/10</option>`).join("")}
          </select>
          <label>Nhận xét</label>
          <textarea id="gradeComment" rows="4" placeholder="Nhận xét cho học viên...">${item.comment || ""}</textarea>
          <button class="admin-add" data-action="save-grade">Lưu điểm</button>
        </div>
      </div>
    </div>
  `;
}

function renderAdminSyllabus() {
  const rows = adminSyllabus.filter((item) => {
    const byLevel = adminUi.syllabusFilter === "all" || item.level === adminUi.syllabusFilter;
    const byQuery = !adminUi.query || matchesQuery(`${item.code} ${item.name} ${item.owner}`);
    return byLevel && byQuery;
  });
  return `
    <div class="card admin-panel">
      <div class="admin-panel-head">
        <h3>Danh sách syllabus <span class="admin-count">(${rows.length})</span></h3>
        <button class="admin-add" data-action="admin-add">+ Thêm</button>
      </div>
      <div class="admin-toolbar">
        <input id="adminSearch" data-admin-field="query" placeholder="Tìm kiếm syllabus..." />
        <select data-admin-field="syllabusFilter">
          <option value="all">Tất cả trình độ</option>
          ${programList.map((item) => `<option value="${escapeHtml(item)}" ${item === adminUi.syllabusFilter ? "selected" : ""}>${item}</option>`).join("")}
        </select>
        <select>
          <option>Tất cả trạng thái</option>
          <option>Đã xuất bản</option>
          <option>Đang soạn</option>
        </select>
      </div>
      ${renderAdminTable(
        ["MÃ", "TÊN SYLLABUS", "TRÌNH ĐỘ", "SỐ UNIT", "NGƯỜI SOẠN", "TRẠNG THÁI", "THAO TÁC"],
        rows.map((item) => `
          <tr>
            <td>${item.code}</td>
            <td><button class="admin-link">${item.name}</button></td>
            <td><span class="badge badge-yellow">${item.level}</span></td>
            <td>${item.units}</td>
            <td>${item.owner}</td>
            <td><span class="badge ${badgeClass(item.statusKey)}">${item.status}</span></td>
            <td>${renderTrashBtn()}</td>
          </tr>
        `)
      )}
    </div>
  `;
}

function renderAdminFees() {
  const rows = adminFees.filter((item) => {
    const byStatus = adminUi.feeFilter === "all" || item.statusKey === adminUi.feeFilter;
    const byQuery = !adminUi.query || matchesQuery(`${item.code} ${item.student} ${item.className} ${item.course}`);
    return byStatus && byQuery;
  });
  const total = adminFees.reduce((sum, item) => sum + item.total, 0);
  const paid = adminFees.reduce((sum, item) => sum + item.paid, 0);
  const due = total - paid;
  const overdue = adminFees.filter((item) => item.statusKey === "review").length;
  return `
    <div class="admin-stats">
      <div class="admin-stat"><div class="metric-value">${formatVnd(total)}</div><div class="metric-label">Tổng học phí</div></div>
      <div class="admin-stat"><div class="metric-value">${formatVnd(paid)}</div><div class="metric-label">Đã thu</div></div>
      <div class="admin-stat"><div class="metric-value">${formatVnd(due)}</div><div class="metric-label">Còn nợ</div></div>
      <div class="admin-stat"><div class="metric-value">${overdue}</div><div class="metric-label">Hồ sơ quá hạn</div></div>
    </div>
    <div class="card admin-panel">
      <div class="admin-panel-head">
        <h3>Học phí học viên <span class="admin-count">(${rows.length})</span></h3>
        <button class="admin-add" data-action="admin-add">+ Ghi nhận thu</button>
      </div>
      <div class="admin-toolbar">
        <input id="adminSearch" data-admin-field="query" placeholder="Tìm học viên, lớp, mã học phí..." />
        <select data-admin-field="feeFilter">
          <option value="all">Tất cả trạng thái</option>
          <option value="done">Đã đóng</option>
          <option value="pending">Còn nợ</option>
          <option value="review">Quá hạn</option>
        </select>
        <select>
          <option>Tất cả chương trình</option>
          ${programList.map((item) => `<option>${escapeHtml(item)}</option>`).join("")}
        </select>
      </div>
      ${renderAdminTable(
        ["MÃ", "HỌC VIÊN", "LỚP", "CHƯƠNG TRÌNH", "TỔNG PHÍ", "ĐÃ THU", "CÒN NỢ", "HẠN ĐÓNG", "TRẠNG THÁI", "THAO TÁC"],
        rows.map((item) => `
          <tr>
            <td>${item.code}</td>
            <td><button class="admin-link">${item.student}</button></td>
            <td>${item.className}</td>
            <td><span class="badge badge-yellow">${item.course}</span></td>
            <td>${formatVnd(item.total)}</td>
            <td>${formatVnd(item.paid)}</td>
            <td>${formatVnd(item.total - item.paid)}</td>
            <td>${item.due}</td>
            <td><span class="badge ${badgeClass(item.statusKey)}">${item.status}</span></td>
            <td><button class="admin-link">${item.statusKey === "done" ? "Xem" : "Thu phí"}</button></td>
          </tr>
        `)
      )}
    </div>
  `;
}

function renderWelcome() {
  return `
    <div class="login-screen">
      <div class="login-card">
        <div class="login-brand">Steps English</div>
        <p class="login-lead">Chọn tài khoản để vào bảng điều khiển.</p>
        <div class="login-actions">
          <button class="login-btn login-btn-student" data-role="student">Học sinh</button>
          <button class="login-btn login-btn-admin" data-role="admin">Admin</button>
        </div>
        <p class="login-credit">Built with Tanoshi Vietnam</p>
      </div>
    </div>
  `;
}

function pageCopy() {
  if (state.currentRole === "student") {
    const roadmap = state.roadmapProgram
      ? state.roadmapDay
        ? ["Roadmap", `${state.roadmapProgram}`, "Trang học của buổi: 8 task chạy đủ 10 Step theo khung của trung tâm."]
        : ["Roadmap", `${state.roadmapProgram}`, "Chọn một Day để mở trang học của buổi đó."]
      : ["Roadmap", "Chọn chương trình", `Bấm vào một chương trình để mở danh sách Day 1 → Day ${SPIRAL_SESSIONS}.`];
    const pages = {
      profile: ["Học viên", "Thông tin của tôi", "Hồ sơ, tiến độ, nhiệm vụ và phần cần ôn lại."],
      roadmap,
    };
    return pages[state.activeStudentPage] || pages.profile;
  }
  const pages = {
    dashboard: ["Quản trị hệ thống", "Dashboard", "Theo dõi user, bài giảng, chấm bài và syllabus."],
    users: ["Quản trị hệ thống", "Quản lý người dùng", "Học viên, giáo viên và quản trị viên trong một danh sách."],
    lessons: adminUi.selectedLesson
      ? ["Quản trị hệ thống", "Chi tiết bài giảng", "Xem và chỉnh các trường nội dung của bài học."]
      : ["Quản trị hệ thống", "Quản lý bài giảng", "Theo dõi trạng thái biên soạn và xuất bản từng bài."],
    grading: adminUi.selectedGrade
      ? ["Quản trị hệ thống", "Chấm bài", "Xem bài học viên đã làm và chấm theo nội dung unit."]
      : ["Quản trị hệ thống", "Quản lý chấm bài", "Xem bài nộp, điểm số và các bài đang chờ chấm."],
    fees: ["Quản trị hệ thống", "Quản lý học phí", "Theo dõi học phí, công nợ và hạn đóng của học viên."],
    syllabus: ["Quản trị hệ thống", "Biên soạn syllabus", "Quản lý chương trình Movers, Flyers, 2019 Khóa 1 và Seed 39 Khóa 2."],
    journey: ["Quản trị hệ thống", `Lộ trình ${SPIRAL_SESSIONS} buổi`, "Ma trận xoắn ốc: buổi nào dạy mảng nào, mảng nào quay lại khi nào."],
  };
  return pages[state.activeAdminPage] || pages.dashboard;
}

function restoreAdminFilters() {
  const search = el("adminSearch");
  if (search) search.value = adminUi.query;
  document.querySelectorAll("[data-admin-field]").forEach((node) => {
    const key = node.getAttribute("data-admin-field");
    if (key && key !== "query") node.value = adminUi[key];
  });
}

function renderBody() {
  const role = state.currentRole;
  const page = role === "student" ? state.activeStudentPage : state.activeAdminPage;
  const isLogin = state.activePage === "welcome";

  if (isLogin) {
    el("pageEyebrow").textContent = "";
    el("pageTitle").textContent = "";
    el("pageSubtitle").textContent = "";
    el("content").innerHTML = renderWelcome();
    applyShell();
    renderNav();
    renderMetrics();
    return;
  }

  const [eyebrow, title, subtitle] = pageCopy();
  el("pageEyebrow").textContent = eyebrow;
  el("pageTitle").textContent = title;
  el("pageSubtitle").textContent = subtitle;

  let body = "";
  if (role === "student" && page === "profile") body = renderStudentProfile();
  else if (role === "student" && page === "roadmap") body = renderRoadmap();
  else if (role === "admin" && page === "journey") body = renderSpiralPlan();
  else if (role === "admin" && page === "dashboard") body = renderAdminDashboard();
  else if (role === "admin" && page === "users") body = renderAdminUsers();
  else if (role === "admin" && page === "lessons") body = renderAdminLessons();
  else if (role === "admin" && page === "grading") body = renderAdminGrading();
  else if (role === "admin" && page === "fees") body = renderAdminFees();
  else if (role === "admin" && page === "syllabus") body = renderAdminSyllabus();
  else body = role === "admin" ? renderAdminDashboard() : renderStudentProfile();

  el("content").innerHTML = body;
  applyShell();
  renderNav();
  renderMetrics();
  restoreAdminFilters();
}

function render() {
  try {
    renderBody();
  } catch (error) {
    const content = el("content");
    if (content) {
      content.innerHTML = `
        <div class="card">
          <div class="section-title">
            <h3>Render error</h3>
            <span class="status locked">fix needed</span>
          </div>
          <pre style="white-space:pre-wrap;margin:0;color:#b91c1c;">${String(error && error.stack ? error.stack : error)}</pre>
        </div>
      `;
    }
    console.error(error);
  }
}

function bindEvents() {
  document.addEventListener("click", (event) => {
    const target = event.target.closest("[data-page], [data-action], [data-role]");
    if (!target) return;
    if (target.dataset.role) {
      setRole(target.dataset.role);
      return;
    }
    if (target.dataset.page) {
      setPage(target.dataset.page);
      return;
    }
    const action = target.dataset.action;
    if (action === "open-lesson") {
      openLesson(target.dataset.unit);
      return;
    }
    if (action === "close-lesson") {
      adminUi.selectedLesson = "";
      render();
      return;
    }
    if (action === "save-lesson") {
      const current = lessonCatalog[adminUi.selectedLesson];
      if (current) {
        current.order = Number(el("lessonOrder")?.value) || current.order;
        current.program = el("lessonProgram")?.value || programList[0];
        current.publishStatus = el("lessonStatus")?.value || "draft";
        current.subtitle = el("lessonSubtitle")?.value || current.subtitle;
        current.story = el("lessonStory")?.value || current.story;
        current.song = el("lessonSong")?.value || current.song;
        current.vocabulary = (el("lessonVocab")?.value || "").split(",").map((item) => item.trim()).filter(Boolean);
        current.structure = (el("lessonStructure")?.value || "").split("\n").map((item) => item.trim()).filter(Boolean);
        current.phonics = (el("lessonPhonics")?.value || "").split(",").map((item) => item.trim()).filter(Boolean);
        current.moral = el("lessonMoral")?.value || current.moral;
        current.coverImage = el("lessonCover")?.value || "";
        current.storyImage = el("lessonStoryImage")?.value || "";
        current.storyVideo = el("lessonStoryVideo")?.value || "";
        current.songAudio = el("lessonSongAudio")?.value || "";
        current.listenAudio = el("lessonListenAudio")?.value || "";
        current.phonicsAudio = el("lessonPhonicsAudio")?.value || "";
        current.speakAudio = el("lessonSpeakAudio")?.value || "";
      }
      adminUi.selectedLesson = "";
      saveAndRender();
      return;
    }
    if (action === "open-grade") {
      openGrade(target.dataset.code);
      return;
    }
    if (action === "close-grade") {
      adminUi.selectedGrade = "";
      render();
      return;
    }
    if (action === "save-grade") {
      const item = adminGrading.find((row) => row.code === adminUi.selectedGrade);
      if (item) {
        const score = el("gradeScore")?.value || "8";
        item.score = `${score}/10`;
        item.comment = el("gradeComment")?.value || "";
        item.status = "Đã chấm";
        item.statusKey = "done";
      }
      adminUi.selectedGrade = "";
      saveAndRender();
      return;
    }
    if (action === "logout") {
      logout();
      return;
    }
    if (action === "admin-add" || action === "admin-delete") {
      return;
    }
    // Roadmap tầng 1 → 2: mở danh sách Day của một chương trình.
    if (action === "open-program" || action === "back-program") {
      const program = target.dataset.program;
      if (programUnits(program).length) {
        state.roadmapProgram = program;
        state.roadmapDay = 0;
        state.activeStudentPage = "roadmap";
        state.activePage = "roadmap";
        if (spiralPlans[program]) state.spiralProgram = program;
        saveState();
        render();
      }
      return;
    }
    // Roadmap tầng 2 → 1.
    if (action === "back-programs") {
      state.roadmapProgram = "";
      state.roadmapDay = 0;
      state.activeStudentPage = "roadmap";
      state.activePage = "roadmap";
      saveState();
      render();
      return;
    }
    // Roadmap tầng 2 → 3: vào trang học của một buổi.
    if (action === "open-day") {
      const program = target.dataset.program;
      const day = Number(target.dataset.day);
      const spiral = buildSpiral(program);
      if (!spiral || !Number.isFinite(day)) return;
      const safeDay = Math.min(Math.max(day, 1), spiral.sessions);
      state.roadmapProgram = program;
      state.roadmapDay = safeDay;
      state.spiralProgram = program;
      state.selectedDay = safeDay;
      state.activeTask = 0;
      const unit = sessionSummary(program, safeDay).unit;
      if (lessonCatalog[unit]) state.selectedUnit = unit;
      state.activeStudentPage = "roadmap";
      state.activePage = "roadmap";
      saveState();
      render();
      return;
    }
    if (action === "select-unit") {
      state.selectedUnit = fixUnitName(target.dataset.unit);
      // Chương trình không có lộ trình theo buổi: roadmapDay chỉ đánh dấu "đang mở trang unit".
      state.roadmapDay = 1;
      state.activeStudentPage = "roadmap";
      state.activePage = "roadmap";
      saveState();
      render();
      return;
    }
    if (action === "select-spiral") {
      const next = target.dataset.program;
      if (spiralPlans[next]) {
        state.spiralProgram = next;
        state.selectedDay = 1;
        saveState();
        render();
      }
      return;
    }
    if (action === "select-day") {
      const day = Number(target.dataset.day);
      if (Number.isFinite(day)) {
        state.selectedDay = day;
        saveState();
        render();
      }
      return;
    }
    /* --- Trang học tương tác của một buổi --- */
    if (action === "play-video") {
      playVideo(target);
      return;
    }
    if (action === "say") {
      speak(target.dataset.text);
      return;
    }
    // Thẻ từ vựng: đọc mẫu và ghi lại là đã nghe để tô dấu.
    if (action === "flash") {
      speak(target.dataset.text);
      state.taskAnswers[target.dataset.qid] = "heard";
      saveState();
      render();
      return;
    }
    if (action === "answer") {
      const { qid, value, answer } = target.dataset;
      state.taskAnswers[qid] = value;
      chime(value === answer ? "ok" : "miss");
      if (value === answer) addStars(2);
      saveState();
      render();
      return;
    }
    if (action === "open-task") {
      state.activeTask = Number(target.dataset.task) || 0;
      saveState();
      render();
      return;
    }
    if (action === "task-done") {
      const key = `${target.dataset.program}|${target.dataset.day}`;
      const index = Number(target.dataset.task);
      const done = state.taskDone[key] || [];
      if (!done.includes(index)) {
        state.taskDone[key] = [...done, index];
        addStars(5);
        chime("ok");
      }
      // Xong task thì mở luôn task kế tiếp cho khỏi phải bấm thêm. Số task đọc
      // từ nút bấm để không phải sửa chỗ này mỗi lần khung buổi học đổi.
      const total = Number(target.dataset.total) || 8;
      state.activeTask = Math.min(index + 1, total - 1);
      saveState();
      render();
      return;
    }
    if (action === "record-start") { startRecording(); return; }
    if (action === "record-stop") { stopRecording(); return; }

    if (action === "set-step-story") return setLessonStep("story");
    if (action === "set-step-speak") return setLessonStep("speak");
    if (action === "step-story") { state.storyStep = 0; return setLessonStep("story"); }
    if (action === "step-song") return setLessonStep("song");
    if (action === "step-listen") return setLessonStep("listen");
    if (action === "step-say") return setLessonStep("say");
    if (action === "step-phonics") return setLessonStep("phonics");
    if (action === "step-game") return setLessonStep("game");
    if (action === "step-speak") return setLessonStep("speak");
    if (action === "step-review") return setLessonStep("review");
    if (action === "story-next") {
      state.storyStep = Math.min(4, state.storyStep + 1);
      if (state.storyStep >= 4) state.studentLessonStep = "song";
      saveState();
      render();
      return;
    }
    if (action === "story-restart") {
      state.storyStep = 0;
      state.studentLessonStep = "story";
      saveState();
      render();
      return;
    }
    if (action === "song-complete") { completeActivity("song", 10); state.studentLessonStep = "listen"; return saveAndRender(); }
    if (action === "listen-answer") { completeActivity("listen", 10); state.studentLessonStep = "say"; return saveAndRender(); }
    if (action === "say-correct") { completeActivity("say", 10); state.studentLessonStep = "phonics"; return saveAndRender(); }
    if (action === "phonics-correct") { completeActivity("phonics", 10); state.studentLessonStep = "game"; return saveAndRender(); }
    if (action === "game-correct") { completeActivity("game", 10); state.missionProgress.games += 1; if (state.missionProgress.games >= 3) state.studentLessonStep = "speak"; return saveAndRender(); }
    if (action === "speak-complete") { completeActivity("speak", 15); state.missionProgress.speaking += 1; state.studentLessonStep = "review"; return saveAndRender(); }
    if (action === "review-complete") { completeActivity("review", 20); state.unitProgress = 100; return saveAndRender(); }
    if (action === "review-session") { state.stars += 20; state.reviewStatus["/z/"] = "Improving"; return saveAndRender(); }
  });

  document.addEventListener("input", (event) => {
    const field = event.target.getAttribute && event.target.getAttribute("data-admin-field");
    if (!field) return;
    adminUi[field] = event.target.value;
    const focused = document.activeElement;
    const start = focused && focused.selectionStart;
    render();
    const next = el("adminSearch");
    if (field === "query" && next) {
      next.focus();
      if (typeof start === "number") next.setSelectionRange(start, start);
    }
  });

  document.addEventListener("change", (event) => {
    const mediaTarget = event.target.getAttribute && event.target.getAttribute("data-media-target");
    if (mediaTarget) {
      const file = event.target.files && event.target.files[0];
      const type = event.target.getAttribute("data-media-type");
      const field = event.target.closest(".media-field");
      const urlInput = el(mediaTarget);
      if (!file || !urlInput || !field) return;
      const url = URL.createObjectURL(file);
      urlInput.value = url;
      const preview = field.querySelector(".media-preview");
      if (preview) {
        if (type === "image") preview.innerHTML = `<img src="${url}" alt="" />`;
        else if (type === "video") preview.innerHTML = `<video src="${url}" controls></video>`;
        else preview.innerHTML = `<audio src="${url}" controls></audio>`;
      }
      return;
    }
    if (event.target.classList && event.target.classList.contains("media-url")) {
      const field = event.target.closest(".media-field");
      const type = field && field.querySelector("[data-media-type]") && field.querySelector("[data-media-type]").getAttribute("data-media-type");
      const preview = field && field.querySelector(".media-preview");
      const value = event.target.value.trim();
      if (!preview || !type) return;
      if (!value) preview.innerHTML = `<div class="media-empty">Chưa có file</div>`;
      else if (type === "image") preview.innerHTML = `<img src="${escapeHtml(value)}" alt="" />`;
      else if (type === "video") preview.innerHTML = `<video src="${escapeHtml(value)}" controls></video>`;
      else preview.innerHTML = `<audio src="${escapeHtml(value)}" controls></audio>`;
      return;
    }
    const field = event.target.getAttribute && event.target.getAttribute("data-admin-field");
    if (!field || field === "query") return;
    adminUi[field] = event.target.value;
    render();
  });
}

function saveAndRender() {
  saveState();
  render();
}

function bootstrap() {
  render();
  bindEvents();
}

bootstrap();

