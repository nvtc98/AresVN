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
    name: "Facebook",
    icon: "facebook",
    link: "https://www.facebook.com/groups/595876244243793",
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
    "AWPer team tôi bị gay",
    "Rạp xiếc trung ương",
    "Earless",
    "Súng lỗi à?",
    "Vãi cả -99",
    "Nomad has left the team",
  ],
  motto:
    "Rạp xiếc không tự sinh ra hay mất đi mà chỉ chuyển từ game này sang game khác.",
  games: [
    { code: "CS", name: "Counter-Strike: Global Offensive" },
    { code: "R6", name: "Rainbow Six Siege" },
    { code: "VAL", name: "Valorant" },
    { code: "GTA", name: "Grand Theft Auto V" },
    { code: "SC2", name: "StarCraft II" },
    { code: "L4D2", name: "Left 4 Dead 2" },
    { code: "PHAS", name: "Phasmophobia" },
  ],
  // Nguồn: AresVN Wiki – Biên niên sử (aresvn.miraheze.org). Chỉ giữ các
  // chương "epic"; các giai đoạn trầm (Civil War, NNN, TTT...) được lược bỏ.
  timeline: [
    {
      date: "21.02.2019 · 10:13",
      era: "Genesis",
      title: "Khai sinh từ hư vô",
      text: "h1enle đọc lên cái tên AresVN. Không biểu quyết, không phương án dự phòng — chỉ một lần đọc thành lời và tất cả đều hiểu. h1enle, Hyle, Breezee, env1, D O R M đứng cạnh nhau. Màn đêm bị xé toạc.",
    },
    {
      date: "Kỷ nguyên II",
      era: "Kaleidoscope",
      title: "Bùng nổ bản sắc",
      text: "Chinh phạt VALORANT, mở rộng văn hóa, chia core team và sub team, thu nạp thêm chiến binh mới. Rạp xiếc lan sang mọi chiến trường từ PvP đến PvE.",
    },
    {
      date: "27.12.2022",
      title: "Giao hữu Paragames",
      text: "Trận giao hữu lịch sử giữa hai đồng minh AresVN và Paragames Team.",
    },
    {
      date: "2025",
      title: "Biên niên sử được viết",
      text: "AresVN Wiki ra đời, khắc ghi mọi chiến tích, liên minh và truyền thuyết của Việt Chiến Thần.",
    },
    {
      date: "02.09.2025",
      era: "Operation: Emblem Lost",
      title: "Giành lại biểu trưng",
      text: "Một thế lực bí ẩn tráo đổi biểu trưng AresVN trên mọi nền tảng. Cả đội hội quân offline tại Dino Gaming — trận chiến vừa khép lại, biểu trưng đồng loạt trở về. AresVN khôi phục nền văn minh.",
    },
    {
      date: "27.02.2026",
      era: "EAT",
      title: "env1 Above Time",
      text: "env1 vượt khỏi Time Rift, mang bản thể Gab trở lại và tuyên bố: \"EAT!\". Lịch sử bước sang kỷ nguyên mới.",
    },
    {
      date: "Hiện tại",
      era: "Assemble",
      title: "AresVN Assemble",
      text: "Mỗi người một lối đi, nhưng chỉ cần một lệnh hiệu triệu, tất cả lại hội quân dưới một mái nhà — khí thế vẹn nguyên, ăn ý đến kỳ lạ.",
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
    relationship: "Đồng minh ẩn mật",
    descriptions: [
      "The Eyes là đồng minh ẩn mật của AresVN, dù từng sánh vai và hội ngộ trong nhiều trận chiến, hầu hết thành viên của hai bên chẳng hề hay biết về sự tồn tại của nhau. AresVN gọi The Eyes là Ocean Eyes.",
      'Trong sự kiện AresVN: Thanh Trừng, quy tắc phán xét số 3 có nội dung: "Bạn được miễn nếu bạn thuộc Ocean Eyes" như một chi tiết thú vị nhỏ thể hiện mối giao hảo.',
      "Cùng với sự ra mắt của wiki năm 2025, Ocean Eyes chính thức xuất hiện trong danh sách quan hệ của AresVN dưới sự xác nhận và đóng góp của Sir thoái vị.",
      "Thành viên: Ocean Eyes, Wicked Eyes, Crystal Eyes, Stella Eyes, Gentle Eyes, Astral Eyes, Darkin Eyes.",
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

// rating/tag và các mục không có ảnh là dữ liệu mẫu cho vui - chỉnh tuỳ ý.
const testimonials = [
  {
    img: "/images/testimonials/01.jpg",
    text: "Delete clan pls.",
    name: "John Doe",
    tag: "Đối thủ",
    rating: 1,
  },
  {
    img: "/images/testimonials/killernavx.jpg",
    text: "They are cute.",
    name: "KillerNavx",
    tag: "Fan",
    rating: 5,
  },
  {
    text: "Tưởng vào xem esports, hoá ra xem hài độc thoại. Sẽ quay lại.",
    name: "Người qua đường",
    tag: "Khán giả",
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
    text: "Lần đầu tiên trong đời tôi thắng được một trận. Cảm ơn AresVN.",
    name: "Bot Easy",
    tag: "AI đối thủ",
    rating: 5,
  },
  {
    img: "/images/testimonials/thien.png",
    text: "cho join với",
    name: "Thienxaoloz",
    jumpscare: true,
    tag: "Ứng viên",
    rating: 5,
  },
  {
    text: "Không hiểu chiến thuật là gì nhưng thắng thật. Rất khó hiểu.",
    name: "Teammate random",
    tag: "Đồng đội ghép",
    rating: 4,
  },
  {
    text: "Ping cao không phải lỗi của tôi. Xin đừng report nữa.",
    name: "Server Valve",
    tag: "Hạ tầng",
    rating: 2,
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
  testimonials,
  features,
};
