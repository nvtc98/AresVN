const person = {
  firstName: "Ares",
  lastName: "VN",
  get name() {
    return `${this.firstName}${this.lastName}`;
  },
  role: "Vietnamese Esports Team",
  avatar: "/images/logo/AresVN-logo.png",
  email: "",
  location: "Asia/Ho_Chi_Minh",
  languages: ["Tiếng Việt"],
};

const newsletter = {
  display: false,
  title: "",
  description: "",
};

const social = [
  {
    name: "Steam",
    icon: "steam",
    link: "https://steamcommunity.com/groups/aresvn",
  },
  {
    name: "Discord",
    icon: "discord",
    link: "https://discord.com/invite/Yvfn9wvNXq",
  },
  {
    name: "YouTube",
    icon: "youtube",
    link: "https://www.youtube.com/@aresvn",
  },
  {
    name: "Wiki",
    icon: "wiki",
    link: "https://aresvn.miraheze.org",
  },
];

const home = {
  path: "/",
  image: "/images/og/home.jpg",
  label: "Trang chủ",
  title: "AresVN",
  description: "AresVN - Đội thể thao điện tử Việt Nam",
  headline: <>Chào mừng đến với AresVN</>,
  featured: {
    display: false,
  },
  subline: (
    <>
      AresVN là một đội thể thao điện tử Việt Nam. Đội được thành lập vào 2019
      với tư cách ban đầu là một đội Counter-Strike: Global Offensive, sau đó mở
      rộng thêm nhiều tựa game.
    </>
  ),
};

const about = {
  path: "/about",
  label: "Thông tin",
  title: "Thông tin – AresVN",
  description: "Giới thiệu về đội thể thao điện tử AresVN",
  tableOfContent: {
    display: true,
    subItems: false,
  },
  avatar: {
    display: true,
  },
  calendar: {
    display: false,
  },
  intro: {
    display: true,
    title: "Giới thiệu",
    description: (
      <>
        AresVN là một đội thể thao điện tử Việt Nam. Đội được thành lập vào 2019
        với tư cách ban đầu là một đội Counter-Strike: Global Offensive, sau đó
        mở rộng thêm nhiều tựa game như Valorant, Rainbow Six: Siege. Tên đội
        được lấy từ tên vị thần chiến tranh trong thần thoại Hy Lạp nên đội còn
        được gọi với cái tên Việt Chiến Thần. Với phương châm &quot;Rạp xiếc
        không tự sinh ra hay mất đi mà chỉ chuyển từ game này sang game
        khác&quot;, đội đã để lại dấu ấn tấu hài sâu đậm từ các tựa game thi đấu
        cho đến các tựa game PvE giải trí.
      </>
    ),
  },
  work: {
    display: false,
    title: "",
    experiences: [],
  },
  studies: {
    display: false,
    title: "",
    institutions: [],
  },
  technical: {
    display: false,
    title: "",
    skills: [],
  },
  teamDetails: [
    {
      name: "Ngày thành lập",
      text: ["2019 - 02 - 21", "February 21, 2019"],
    },
    {
      name: "Tên khác và cách viết tên khác",
      text: ["ARESVN", "ARVN", "Việt Chiến Thần", "越戰神", "ArếtVN"],
    },
    {
      name: "Game phổ biến",
      text: [
        "Counter-Strike: Global Offensive",
        "Tom Clancy's Rainbow Six Siege",
        "Valorant",
        "Grand Theft Auto V",
        "StarCraft II",
        "Left 4 Dead 2",
        "Phasmophobia",
      ],
    },
  ],
  youtubeVideoId: "1WYTTNxiAlA",
  // Tuyên ngôn A-R-E-S-V-N: chữ cái đầu của mỗi câu chính là chữ acrostic.
  acrostic: [
    "AWPer team tôi chơi gay",
    "Rạp xiếc trung ương",
    "Earless",
    "Súng lỗi à?",
    "Vãi cả -99",
    "Nomad has left the team",
  ],
  motto:
    "Rạp xiếc không tự sinh ra hay mất đi mà chỉ chuyển từ game này sang game khác.",
  games: [
    { code: "CS", name: "Counter-Strike: CS:GO / CS2" },
    { code: "VAL", name: "VALORANT" },
    { code: "R6", name: "Tom Clancy's Rainbow Six Siege" },
    { code: "GTA", name: "Grand Theft Auto Online" },
    { code: "DST", name: "Don't Starve Together" },
    { code: "SC2", name: "StarCraft II" },
    { code: "LMHT", name: "Liên Minh Huyền Thoại" },
    { code: "PUBG", name: "PUBG: Battlegrounds" },
    { code: "HFF", name: "Human: Fall Flat" },
    { code: "OC", name: "Overcooked 1 & 2" },
    { code: "ONI", name: "Oxygen Not Included" },
    { code: "KF", name: "Killing Floor 1 & 2" },
    { code: "L4D2", name: "Left 4 Dead 2" },
    { code: "ONM", name: "Onmyoji" },
    { code: "ZAT", name: "Zombie Army Trilogy" },
    { code: "PHAS", name: "Phasmophobia" },
    { code: "SNAP", name: "Marvel Snap" },
    { code: "BRAWL", name: "Brawlhalla" },
    { code: "MC", name: "Minecraft" },
    { code: "BF5", name: "Battlefield V" },
    { code: "FOREST", name: "The Forest" },
    { code: "PD2", name: "Payday 2" },
    { code: "OW", name: "Overwatch" },
    { code: "PAL", name: "Paladins" },
    { code: "SHIFT", name: "Shift Happens" },
    { code: "FO4", name: "FIFA Online 4" },
    { code: "PIE", name: "Plague Inc: Evolved" },
    { code: "RON", name: "Ready or Not" },
    { code: "CF", name: "Đột Kích" },
    { code: "TQ", name: "Titan Quest 1 & 2" },
    { code: "DEVOUR", name: "Devour" },
    { code: "DECEIT", name: "Deceit" },
    { code: "TPW", name: "The Past Within" },
    { code: "DBD", name: "Dead by Daylight" },
    { code: "GI", name: "Genshin Impact" },
    { code: "FALL", name: "Fall Guys" },
    { code: "AHOT", name: "A House of Thieves" },
    { code: "UZD", name: "Ultimate Zombie Defense" },
    { code: "MH", name: "Monster Hunter: World / Wilds" },
    { code: "B4B", name: "Back 4 Blood" },
    { code: "CỜ", name: "Cờ Tướng" },
    { code: "CW", name: "Content Warning" },
    { code: "SM2", name: "Warhammer 40,000: Space Marine 2" },
    { code: "PARTY", name: "Party Club" },
    { code: "SOTF", name: "Sons of the Forest" },
    { code: "WARF", name: "Warframe" },
    { code: "IT2", name: "It Takes Two" },
    { code: "DELTA", name: "Delta Force" },
    { code: "WNTGD", name: "We Need To Go Deeper" },
    { code: "ABI", name: "Arena Breakout: Infinite" },
    { code: "RR", name: "Road Redemption" },
    { code: "PHOB", name: "Phobies" },
    { code: "WOWS", name: "World of Warships" },
    { code: "COD", name: "Call of Duty: Modern Warfare II" },
    { code: "HUNT", name: "Hunt: Showdown 1896" },
    { code: "APEX", name: "Apex Legends" },
  ],
  // Nguồn: AresVN Wiki – Biên niên sử (aresvn.miraheze.org).
  // kind: "phase" = 4 giai đoạn chính (có ảnh), "event" = sự kiện tiêu biểu.
  timeline: [
    {
      kind: "phase",
      date: "21.02.2019 · 10:13",
      era: "Giai đoạn I",
      title: "AresVN: Genesis",
      img: "/images/timeline/genesis.webp",
      text: "Vào đúng 10 giờ 13 phút — 21/02/2019, h1enle đọc lên cái tên ấy: AresVN. Khoảng cách không còn tồn tại, chúng tôi đang đứng cạnh nhau: h1enle - Hyle - Breezee - env1 - D O R M. Màn đêm bị xé toạc. AresVN chính thức được khai sinh từ hư vô.",
    },
    {
      kind: "phase",
      date: "Sau Genesis",
      era: "Giai đoạn II",
      title: "AresVN: Kaleidoscope",
      img: "/images/timeline/kaleidoscope.webp",
      text: "Thời kỳ chinh phạt VALORANT, mở rộng văn hóa và thành viên, chia core team – sub team, có thêm người giám hộ mới của Discord. Rạp xiếc lan sang mọi chiến trường từ PvP đến PvE.",
    },
    {
      kind: "phase",
      date: "Thời kỳ đen tối",
      era: "Giai đoạn III",
      title: "AresVN: Civil War",
      img: "/images/timeline/civil-war.webp",
      text: "Thời kỳ đen tối nhất của AresVN.",
    },
    {
      kind: "event",
      date: "07.2025 – 02.09.2025",
      title: "Operation: Emblem Lost",
      text: "Avatar của cả đội bị tráo đổi trên Steam, YouTube, Discord và Messenger mà không ai buồn để tâm. Cả team hội quân offline tại Dino Gaming ngày 02/09/2025 — ngay sau buổi chơi, mọi thay đổi biến mất. AresVN khôi phục nền văn minh.",
    },
    {
      kind: "event",
      date: "11.2025",
      title: "NNN — Nomad Now Nomore",
      text: "Tưởng nhớ khoảnh khắc Nomad chính thức rời AresVN lúc 21h51 ngày 28/10/2025.",
    },
    {
      kind: "event",
      date: "60 ngày → 01.2026",
      title: "EEE — env1 Ever Ended",
      text: "Đếm ngược tới lúc env1 biến mất hoàn toàn: bản thể Gab đối mặt với Time Rift đang thu hẹp và nuốt chửng. 14 ngày cuối, env1 không còn nhận thức được thời gian.",
    },
    {
      kind: "event",
      date: "Sau 01.2026",
      title: "TTT — Team Tuyệt Thực",
      text: 'Hyle từ chối chơi để chờ env1, rồi cả team cùng tuyệt thực. Số người hoạt động giảm mạnh tới mức D O R M phải "book chơi trước từ sáng sớm".',
    },
    {
      kind: "event",
      date: "Sau EEE",
      title: "EE — Time Rift khép lại",
      text: "Time Rift khép lại hoàn toàn, mọi dấu vết của env1 biến mất. Giữa vùng tối hư vô, mọi người thấp thoáng thấy một ánh nhìn bí ẩn — ngọn hải đăng thôi thúc cả team đòi lại env1.",
    },
    {
      kind: "phase",
      date: "27.02.2026 – nay",
      era: "Giai đoạn IV",
      title: "AresVN: Assemble",
      img: "/images/timeline/assemble.webp",
      text: "Mỗi người một lối đi, bận rộn với cuộc sống riêng, nhưng chỉ cần một lệnh hiệu triệu, tất cả lại hội quân dưới một mái nhà — khí thế vẹn nguyên, ăn ý đến kỳ lạ. Kỷ nguyên Assemble vẫn đang tiếp diễn.",
    },
    {
      kind: "event",
      date: "27.02.2026",
      title: "EAT — env1 Above Time",
      text: 'env1 tái xuất với bản thể Gab và tuyên bố: "EAT!". Lịch sử bước vào kỷ nguyên mới.',
    },
    {
      kind: "event",
      date: "17.10.2026",
      title: "Khoác lại áo choàng AresVN",
      text: "",
    },
  ],
};

const blog = {
  path: "/blog",
  label: "Bài viết",
  title: "Bài viết – AresVN",
  description: "Bài viết AresVN",
};

const work = {
  path: "/work",
  label: "Dự án",
  title: "Dự án – AresVN",
  description: "Dự án AresVN",
};

const members = {
  path: "/members",
  label: "Thành viên",
  title: "Thành viên – AresVN",
  description: "Danh sách thành viên đội AresVN",
};

const relationshipsPage = {
  path: "/relationships",
  label: "Mối quan hệ",
  title: "Mối quan hệ – AresVN",
  description: "Các mối quan hệ của AresVN với các đội khác",
};

const testimonialsPage = {
  path: "/testimonials",
  label: "Nhận xét",
  title: "Nhận xét – AresVN",
  description: "Nhận xét về AresVN",
};

const gallery = {
  path: "/gallery",
  label: "Bộ sưu tập",
  title: "Bộ sưu tập – AresVN",
  description: "Bộ sưu tập ảnh AresVN",
  images: [
    {
      src: "/images/gallery/portfolio-1.webp",
      alt: "Four horsemen of not leaving the match",
      orientation: "horizontal",
    },
    {
      src: "/images/gallery/portfolio-2.webp",
      alt: "Có camera 4K để làm gì?",
      orientation: "horizontal",
    },
    {
      src: "/images/gallery/portfolio-3.webp",
      alt: "Đây là ghêm kinh dị, trust me bro",
      orientation: "horizontal",
    },
    {
      src: "/images/gallery/portfolio-4.webp",
      alt: "Sống như người Na'vi",
      orientation: "horizontal",
    },
    {
      src: "/images/gallery/portfolio-5.webp",
      alt: "Đừng bao giờ AFK khi kẻ địch ở gần",
      orientation: "horizontal",
    },
    {
      src: "/images/gallery/portfolio-6.webp",
      alt: "AresVN Est. 2019",
      orientation: "horizontal",
    },
    {
      src: "/images/gallery/portfolio-7.webp",
      alt: "Một bếp lửa chờn vờn sương sớm",
      orientation: "horizontal",
    },
    {
      src: "/images/gallery/portfolio-8.webp",
      alt: "Best Squad",
      orientation: "horizontal",
    },
    {
      src: "/images/gallery/portfolio-9.webp",
      alt: "Need popcorn",
      orientation: "horizontal",
    },
  ],
};

const relationships = [
  {
    img: "/images/relationships/g3esports.webp",
    name: "G3 Esports",
    relationship: "Đối thủ / Đồng minh",
    descriptions: [
      "G3 Esports vừa là đối thủ, vừa là đồng minh của AresVN. Là đối thủ nặng ký của nhau, cả hai đã đụng độ 2 lần trong CSGO và CS2.",
      "Là đồng minh giao hảo, cả hai có mối quan hệ tương trợ tốt đẹp. G3 Esports thường xuyên trám các vị trí còn thiếu cho AresVN, đồng thời thường xuyên diễn ra hỗn chiến bên tựa game VALORANT khi các thành viên của hai bên được trộn và tương tàn lẫn nhau.",
      "Với tiền thân là G3 Esports, team sau này còn được gọi là TỦ LẠNH WINMART, LORD HẢI'S INFERNO.",
      "Thành viên: cumsamida, Trieuikoma, BluAf.",
    ],
  },
  {
    img: "/images/relationships/paragames.webp",
    name: "Paragames Team",
    relationship: "Đồng minh",
    descriptions: [
      'Paragames Team là team esports với phong cách thi đấu "biến hạn chế thành lợi thế", nổi tiếng với chiến thuật phi logic một cách hiệu quả và lối chơi đầy bất ngờ. Cái tên Paragames xuất phát từ Para Games, thể hiện tinh thần tự trào tôn vinh ý chí vượt khó và chiến đấu bất chấp giới hạn.',
      "Paragames Team là đồng minh của AresVN, có mối quan hệ tương trợ tốt đẹp. AresVN thường xuyên bổ trợ lực lượng khi Paragames thiếu hụt. Hai bên cũng đã tổ chức một trận giao hữu vào ngày 27/12/2022.",
      "Thành viên: Bumbadabum, Fuujin, phuocphysics123, GiantHippo, :o",
    ],
  },
  {
    img: "/images/relationships/theeyes.webp",
    name: "The Eyes",
    relationship: "Đồng minh",
    descriptions: [
      "The Eyes là đồng minh của AresVN, từng sánh vai và hội ngộ trong nhiều trận chiến.",
      'Trong sự kiện AresVN: Thanh Trừng, quy tắc phán xét số 3 có nội dung: "Bạn được miễn nếu bạn thuộc The Eyes" như một chi tiết thú vị nhỏ thể hiện mối giao hảo.',
      "Cùng với sự ra mắt của wiki năm 2025, The Eyes chính thức xuất hiện trong danh sách quan hệ của AresVN dưới sự xác nhận và đóng góp của Sir thoái vị.",
      "Thành viên: Ocean Eyes, Wicked Eyes, Crystal Eyes, Stella Eyes, Gentle Eyes, Astral Eyes, Darkin Eyes, Evil Eyes.",
    ],
  },
  {
    img: "/images/relationships/afterschoolweatherclub.webp",
    name: "Afterschool Weather Club",
    relationship: "Đồng minh",
    descriptions: [
      "Afterschool Weather Club (Câu lạc bộ thời tiết sau giờ học) là CLB do sund0wn thành lập vào ngày 27/09/2021, với mục tiêu tạo môi trường thư giãn cho các thành viên sau giờ học thông qua game, hội họa và âm nhạc.",
      'CLB có mối quan hệ giao lưu thân thiết với AresVN thông qua chuỗi stream "AresVN Collab" — những buổi gặp gỡ đặc biệt ghi lại khoảnh khắc vui vẻ giữa CLB và những người bạn hàng xóm AresVN.',
      "Thành viên: Shibeo, Mun, Vicie Laben, Sòi, Mì, Hẻn, Lam, ????, sund0wn, n████.",
    ],
  },
  {
    img: "/images/relationships/rinfarm.webp",
    name: "RinFarm",
    relationship: "Đồng minh",
    descriptions: [
      "RinFarm là một team sở hữu những thành viên cực kỳ mạnh mẽ, nổi bật với sức chiến đấu vượt trội và tinh thần đồng đội bền bỉ. Dù quy mô không lớn, mỗi thành viên của RinFarm đều mang trong mình năng lực đáng gờm, đủ sức tạo nên những bất ngờ lớn trên chiến trường.",
      "RinFarm có mối quan hệ đồng minh thân thiết với AresVN, thường xuyên sát cánh trong các trận đấu và hỗ trợ lẫn nhau khi cần thiết.",
      "Thành viên: Mèo Mướp, Rin, Mia.",
    ],
  },
  {
    img: "/images/relationships/nomadstavern.webp",
    name: "Nomads' Tavern",
    relationship: "Đồng minh",
    descriptions: [
      "Nomads' Tavern là mái nhà của Nomad — cựu thành viên của AresVN. Sau khi biến mất khỏi AresVN, đây là nơi duy nhất người ta có thể tìm thấy anh ta. Như cái tên, hội này là một nhóm người du mục, còn logo của hội là hình ảnh một con tàu — vì chủ hội là một người vô cùng yêu thích đại dương và những con tàu.",
      "Dù Nomad đã rời đi, mối quan hệ giữa Nomads' Tavern và AresVN vẫn luôn thân thiện, như một sợi dây kết nối giữa quá khứ và hiện tại.",
      "Thành viên: Nomad, vuuhuyhoang.",
    ],
  },
];

// Hồ sơ bạn bè (mục "02 / Bạn bè" trên trang Mối quan hệ). Danh sách người
// được lấy tự động từ dòng "Thành viên:" của từng team ở trên; ở đây chỉ cần
// thêm thông tin cho ai có. Người không có mục ở đây hiện "Đang cập nhật".
// Trường hỗ trợ: bio (string), img (đường dẫn ảnh, tuỳ chọn).
const friendProfiles = {
  sund0wn: {
    bio: "Người sáng lập Afterschool Weather Club ngày 27/09/2021 — nơi game, hội họa và âm nhạc gặp nhau sau giờ học.",
  },
  Nomad: {
    bio: "Chủ hội Nomads' Tavern. Người du mục yêu đại dương và những con tàu, nay neo đậu tại quán rượu của riêng mình.",
  },
};

// rating/tag và các mục không có ảnh là dữ liệu mẫu cho vui - chỉnh tuỳ ý.
const testimonials = [
  {
    img: "/images/testimonials/01.jpg",
    text: "Disband pls.",
    name: "John Doe",
    tag: "Đối thủ",
    rating: 1,
  },
  {
    img: "/images/testimonials/killernavx.jpg",
    text: "They are cute.",
    name: "KillerNavx",
    tag: "Namegiver of env1",
    rating: 5,
  },
  {
    img: "/images/testimonials/02.jpg",
    text: "AresVN noob team.",
    name: "Johnathan",
    tag: "Đối thủ",
    rating: 1,
  },
  {
    img: "/images/testimonials/thien.png",
    text: "cho join với",
    name: "Thienxaoloz",
    jumpscare: true,
    tag: "Fan",
    rating: 5,
  },
];

const features = [
  { title: "Ai", text: "thêm Huân vào group chat dẫy" },
  { title: "tRiệu", text: "lại bị hack nick à" },
  { title: "env1", text: "comeback pls" },
  { title: "Sir thoái vị", text: "là ai vậy?" },
  { title: "vcl", text: "quả role bị truy nã =)) cười vcl" },
  { title: "Nomad", text: "has left the team" },
];

export {
  person,
  social,
  newsletter,
  home,
  about,
  blog,
  work,
  members,
  relationshipsPage,
  testimonialsPage,
  gallery,
  relationships,
  friendProfiles,
  testimonials,
  features,
};
