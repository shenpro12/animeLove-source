export const parseToObj = (str) => {
  let arr = str.split(";");

  let a = arr.map((i) => {
    if (i.includes("beforeUrl=")) {
      return i.replace("beforeUrl=", "").trim();
    }
  });
  return a.filter((i) => i);
};

export const getTime = (ms) => {
  let time = "Vừa xong";
  let date1 = new Date(ms);
  let date2 = new Date(Date.now());
  let Difference_In_Time = (date2.getTime() - date1.getTime()) / 1000 / 60;
  let Difference_In_minute = Math.abs(Math.round(Difference_In_Time));
  if (Difference_In_minute < 60 && Difference_In_minute > 0) {
    time = `${Difference_In_minute} phút`;
  } else if (Difference_In_minute > 59) {
    if (Math.floor(Difference_In_minute / 60) < 24) {
      time = `${Math.floor(Difference_In_minute / 60)} giờ`;
    } else {
      time = `${Math.floor(Difference_In_minute / 60 / 24)} ngày`;
    }
  }
  return time;
};
