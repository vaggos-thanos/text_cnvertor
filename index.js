(async () => {
  console.log("Example to read line by line text");
  const fs = require("fs");
  const readline = require("readline");
  
  let user_file = __dirname + "/file.txt";
  var r = readline.createInterface({
    input: fs.createReadStream(user_file),
  });

  counter = 0;
  let db = ``;
  let table_name = "test";
  const number_colume = [1, 10];

  r.on("line", async (text) => {
    counter++;
    let new_text = ``;
    console.log(text);
    const text_words = text.split(" ");
    let start = true;
    for (word of text_words) {
      console.log(word);
      console.log(typeof word);
      if (/\d/.test(word)) {
        new_text += parseInt(word);
      } else if (typeof word == "string") {
        let comma;
        if (start) {
          comma = ",";
          start = false;
        } else {
          comma = "";
        }
        new_text += comma + " '" + word + "', ";
      }
    }
    db += `INSERT INTO "${table_name}" values (${new_text});\n`;

    if (counter == 20) {
      fs.writeFile(__dirname + "/ready.sql", db, function (err) {
        if (err) throw err;
        console.log("done!");
      });
      console.log(db);
    }
  });
})();
