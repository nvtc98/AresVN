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
];

const home = {
  path: "/",
  image: "/images/og/home.jpg",
  label: "Home",
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
  label: "About",
  title: "About – AresVN",
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
};

const blog = {
  path: "/blog",
  label: "Blog",
  title: "Blog – AresVN",
  description: "AresVN blog",
};

const work = {
  path: "/work",
  label: "Work",
  title: "Work – AresVN",
  description: "AresVN projects",
};

const gallery = {
  path: "/gallery",
  label: "Gallery",
  title: "Gallery – AresVN",
  description: "Bộ sưu tập ảnh AresVN",
  images: [
    {
      src: "/images/gallery/portfolio-1.png",
      alt: "Four horsemen of not leaving the match",
      orientation: "horizontal",
    },
    {
      src: "/images/gallery/portfolio-2.png",
      alt: "Có camera 4K để làm gì?",
      orientation: "horizontal",
    },
    {
      src: "/images/gallery/portfolio-3.png",
      alt: "Đây là ghêm kinh dị, trust me bro",
      orientation: "horizontal",
    },
    {
      src: "/images/gallery/portfolio-4.png",
      alt: "Sống như người Na'vi",
      orientation: "horizontal",
    },
    {
      src: "/images/gallery/portfolio-5.png",
      alt: "Đừng bao giờ AFK khi kẻ địch ở gần",
      orientation: "horizontal",
    },
    {
      src: "/images/gallery/portfolio-6.png",
      alt: "AresVN Est. 2019",
      orientation: "horizontal",
    },
    {
      src: "/images/gallery/portfolio-7.png",
      alt: "Một bếp lửa chờn vờn sương sớm",
      orientation: "horizontal",
    },
    {
      src: "/images/gallery/portfolio-8.png",
      alt: "Best Squad",
      orientation: "horizontal",
    },
    {
      src: "/images/gallery/portfolio-9.jpeg",
      alt: "Need popcorn",
      orientation: "horizontal",
    },
  ],
};

const relationships = [
  {
    img: "/images/relationships/g3esports.png",
    name: "G3 Esports",
    relationship: "Đối thủ / Đồng minh",
    descriptions: [
      "G3 Esports là một đối thủ nặng ký của AresVN. Giữa cả hai đã diễn ra một trận đấu nảy lửa trong Counter-Strike: Global Offensive vào ngày 19/02/2021. G3 Esports sử dụng hàng pháo dàn mạnh nhất trong khi đội hình của AresVN sử dụng các thành viên chưa có sự ăn khớp nhuần nhuyễn tại thời điểm đó. Trận đấu dẫn đến chiến thắng thuộc về G3 Esports.",
      "AresVN và G3 Esports cũng là hai đội chiến hữu của nhau, có mối quan hệ tương trợ vô cùng tốt đẹp. G3 Esports thường xuyên cử thành viên vào trám các vị trí còn thiếu cho AresVN. Cả hai cũng có những trận đấu với nhau, trong đó điển hình có một trận đấu 5vs5 với các thành viên của cả hai đội trộn lẫn với nhau.",
    ],
  },
  {
    img: "/images/relationships/paragames.png",
    name: "Paragames Team",
    relationship: "Đồng minh",
    descriptions: [
      "Paragames Team có mối quan hệ tốt đẹp với AresVN. AresVN thường xuyên bổ sung kịp thời lực lượng những khi Paragames thiếu hụt. Giữa cả hai cũng đã diễn ra một trận giao hữu lẫn nhau vào ngày 27/12/2022.",
    ],
  },
];

const testimonials = [
  {
    img: "/images/testimonials/01.jpg",
    text: "Delete clan pls.",
    name: "John Doe",
  },
  {
    img: "/images/testimonials/02.jpg",
    text: "AresVN noob team.",
    name: "Johnathan",
  },
  {
    img: "/images/testimonials/killernavx.jpg",
    text: "They are cute.",
    name: "KillerNavx",
  },
  {
    img: "/images/testimonials/thien.png",
    text: "cho join với",
    name: "Thienxaoloz",
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
  gallery,
  relationships,
  testimonials,
  features,
};
