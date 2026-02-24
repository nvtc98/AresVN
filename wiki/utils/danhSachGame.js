function insertWikiRow(tableString, newRowLine) {
  const lines = tableString.split("\n");

  // Lấy STT mới từ dòng chèn
  const newIndex = parseInt(newRowLine.trim().split("||")[0]);

  let result = [];
  let inserted = false;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    const match = line.match(/^\|\s*(\d+)\s*\|\|/);

    if (match) {
      const currentIndex = parseInt(match[1]);

      // Chèn dòng mới đúng vị trí
      if (!inserted && currentIndex >= newIndex) {
        result.push(`| ${newRowLine}`);
        result.push("|-");
        inserted = true;
      }

      // Nếu đã chèn rồi thì tăng STT lên 1
      const updatedIndex = inserted ? currentIndex + 1 : currentIndex;

      result.push(line.replace(/^\|\s*\d+/, `| ${updatedIndex}`));
    } else {
      result.push(line);
    }
  }

  // Nếu STT mới lớn hơn tất cả dòng hiện tại → chèn cuối bảng
  if (!inserted) {
    const endIndex = result.lastIndexOf("|}");
    result.splice(endIndex, 0, `| ${newRowLine}`, "|-");
  }

  // return result.join("\n");
  console.log(result.join("\n"));
}

// Cách dùng

insertWikiRow(
  `{| class="wikitable sortable"
|+
|-
! STT !! Mã !! Tên game
|-
| 1 || [https://www.youtube.com/@aresvn/search?query=CSGO CSGO] || Counter-Strike: Global Offensive
|-
| 2 || [https://www.youtube.com/@aresvn/search?query=CS2 CS2] || Counter-Strike 2
|-
...
| 55 || [https://www.youtube.com/@aresvn/search?query=RR RR] || Road Redemption
|-
| 56 || [https://www.youtube.com/@aresvn/search?query=phobies Phobies] || Phobies
|}
`,
  "13 || [https://www.youtube.com/@aresvn/search?query=OC2 OC2] || Overcooked 2",
);
