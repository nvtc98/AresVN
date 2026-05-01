export interface PlayerProfile {
  img: string;
  name: string;
  isHidden?: boolean;
  game: {
    cs: {
      role: string;
      description: string;
      color?: string;
    };
  };
}

export const players: PlayerProfile[] = [
  {
    img: "images/members/new2023/h1enle.png",
    name: "h1enle",
    game: {
      cs: {
        role: "In-Game Leader",
        description:
          "AresVN h1enle được xem là vị đội trưởng mẫu mực của AresVN. h1enle sở hữu đầy đủ những phẩm chất quan trọng của một In-Game Leader, với khả năng toàn diện về cả chiến thuật và kỹ thuật. h1enle dành nhiều thời gian để luyện tập kỹ thuật và nghiên cứu chiến thuật phù hợp cho đội. Anh thường nhắc đến tâm lý bất ổn của mình, nhưng những cống hiến tinh thần của anh đã kéo cả đội vực dậy trong vô số tình thế gay cấn. h1enle xứng đáng nhận được sự tôn trọng cao nhất của tất cả các thành viên trong nhóm.",
      },
    },
  },
  {
    img: "images/members/new2023/Hyle.png",
    name: "Hyle",
    game: {
      cs: {
        role: "AWPer",
        description:
          "AresVN Hyle chính là thành phần thiết yếu trong hỏa lực của đội, là tuyển thủ gây nhiều ấn tượng đặc sắc trong đội. Hyle sở hữu game sense đáng kinh ngạc với kinh nghiệm chinh chiến dày dặn, do đó khả năng phán đoán, đọc và xử lý tình huống của anh đều rất mượt mà. Nhưng anh chỉ mang tới đặc sản thực thụ khi chơi trên vai trò của một xạ thủ bắn tỉa, với những cú vẩy tâm đậm chất nghệ thuật đi thẳng vào lòng địch. Hyle là một chiến binh thực thụ mà AresVN không thể thiếu.",
        color: "rgb(70 33 33)",
      },
    },
  },
  {
    img: "images/members/new2023/Breezee.png",
    name: "Breezee",
    game: {
      cs: {
        role: "Playmaker",
        description:
          "AresVN Breezee là một tuyển thủ kỹ thuật cao của đội, đã tập luyện rất chăm chỉ và được đánh giá là có kỹ năng chiến đấu cực kỳ đáng nể. Breezee không bao giờ bỏ lỡ cơ hội học hỏi từ bất cứ ai có thể giúp anh cải thiện kỹ năng cho mình. Dù có nhiều ý kiến trái chiều, không ai có thể phủ nhận sức công phá hủy diệt của anh. Với phong cách bắn cực kỳ bình tĩnh và mạnh mẽ, Breezee được xem là một cỗ máy ace trong đội với khả năng xuyên thủng mọi vị trí án ngữ của kẻ thù.",
        color: "rgb(45 6 6)",
      },
    },
  },
  {
    img: "images/members/new2023/env1.png",
    name: "env1",
    game: {
      cs: {
        role: "Support",
        description:
          "AresVN env1 là chìa khóa hậu phương của đội với lối chơi thiên hướng hỗ trợ nhiều hơn là giao tranh. Anh để lại nhiều dấu ấn mạnh mẽ ở khả năng kiểm soát và di chuyển biến ảo. env1 cũng là một tuyển thủ rất tinh quái với hàng loạt nước đi làm tê liệt khả năng phán đoán của đối phương. Làm nền là vậy, anh cũng góp sức trong chiến đấu với không ít tình huống đầy đột phá, đặc biệt là clutch. Những chiến thắng rực rỡ của AresVN chưa bao giờ thiếu env1 đứng phía sau.",
        color: "rgb(42 25 61)",
      },
    },
  },
  {
    img: "images/members/new2023/DORM.png",
    name: "D O R M",
    game: {
      cs: {
        role: "Entry Fragger",
        description:
          "AresVN D O R M, thành viên mẫu mực nhất của đội. Anh có khả năng càn quét đáng kinh ngạc, đặc biệt khi trong tay là những khẩu tiểu liên. Chiếc máy ủi này có thể tiếp cận và dọn sạch chiến trường với tốc độ thần sầu, còn kẻ thù tầm xa cũng không tránh khỏi số phận với thương hiệu giết người hàng ngàn dặm chỉ với SMG của anh. Là một tuyển thủ đầy tự tin, quả cảm, chính trực, điểm sáng nhất của D O R M chính là bản lĩnh, một cái đầu lạnh và ra quyết định cực kỳ gãy gọn. D O R M luôn được mọi người tôn trọng vì khả năng lan tỏa tinh thần tích cực ngay cả trong những trận đấu khó khăn nhất.",
        color: "#060634",
      },
    },
  },
  {
    img: "images/members/new2023/Nomad.png",
    name: "Nomad",
    game: {
      cs: {
        role: "Support",
        description:
          'AresVN Nomad là một phiên bản nâng cấp cho tuyến hậu phương của đội. Với khả năng tính toán khủng khiếp, Nomad có thể đọc vanh vách mọi thông tin trong trận đấu từ vĩ mô đến vi mô, đem về rất nhiều lợi thế thông tin cho cả đội. Nomad cũng là một nhà kiến tạo với nhiều hỗ trợ mượt mà và làm suy yếu lớp phòng thủ của địch. Cách mà kẻ địch ngã xuống khi đối đầu với anh cũng rất thú vị, có khi đó là một trận địa hỏa thiêu, có khi đó là cây "súng nước" đầy phong trần. Nomad được xem là chiếc la bàn quý cho nhiều chiến thắng của AresVN.',
        color: "#30444f",
      },
    },
  },
  {
    img: "images/members/new2023/sund0wn.png",
    name: "sund0wn",
    game: {
      cs: {
        role: "Playmaker",
        description:
          "sund0wn là thành viên đắt giá của đội với kỹ thuật thượng thừa. Số lượng đóng góp cho chiến thắng của anh thật khó mà đếm nổi. Sở hữu game sense của một vị thánh, sund0wn có thể phát vé hàng loạt cho địch chuyển sang góc nhìn người khác. sund0wn thông thạo nhiều kỹ thuật ngắm bắn, di chuyển và rất am hiểu map. Tinh thần thép cũng là một điểm đáng chú ý khi anh xuất sắc vượt qua không ít tình huống thử thách tinh thần cao độ. Nhắc đến hình tượng sức mạnh của đội, sund0wn chưa bao giờ là lỗi thời.",
        color: "#37304f",
      },
    },
  },
  {
    img: "images/members/new2023/TrieuIkoma.png",
    name: "TrieuIkoma",
    game: {
      cs: {
        role: "Entry Fragger",
        description:
          "TrieuIkoma là một quả bom năng lượng, đem lại nhiều niềm vui và sức mạnh tinh thần cho toàn đội. Anh có kỹ thuật chiến đấu rất ấn tượng, nhưng không chỉ ở rifle, ngay cả với SMG hay SSG anh cũng đều cho thấy khả năng quái vật của mình. Không chỉ dừng lại ở sự thành thạo súng ống, TrieuIkoma còn rất tinh quái trong những quyết định chiến lược cá nhân bất ngờ tiễn kẻ địch không kịp trăng trối. TrieuIkoma luôn khẳng định vị thế trong việc khai thông mọi con đường tiến site cũng như tinh thần cho đội.",
        color: "rgb(31 47 29)",
      },
    },
  },
  {
    img: "images/members/c21456b2da1ad2c47be91d026a5d81d0b2f59b8a_full.jpeg",
    name: "Kalibi",
    isHidden: true,
    game: {
      cs: {
        role: "Playmaker",
        description:
          "AresVN Kalibi là cựu thành viên siêu việt bậc nhất của đội. Với kỹ thuật aim từ một thế giới khác, những pha xuyên táo lạnh lùng là những gì mà người ta không thể không nhắc tới khi nói về Kalibi. Anh còn là một tuyển thủ cẩn trọng và điềm tĩnh với không ít tình huống cứu thua cho cả đội dù bị đưa vào tình thế cực kỳ bất lợi. Kalibi xứng đáng là cây nỏ thần mà bất cứ một đội nào cũng ao ước.",
      },
    },
  },
];

export function getActivePlayers(): PlayerProfile[] {
  return players.filter((p) => !p.isHidden);
}

export function getHiddenPlayers(): PlayerProfile[] {
  return players.filter((p) => p.isHidden === true);
}
