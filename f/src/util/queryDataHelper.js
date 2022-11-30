export const dataFormat = (arr) => {
  return arr
    .reduce((acc, current) => {
      return [...acc, ...current.season];
    }, [])
    .sort(function (a, b) {
      return b.updatedAt - a.updatedAt;
    });
};
export const queryData = (arr, query) => {
  if (typeof query === "string") {
    if (query === "all") {
      return arr.filter((i) => (i.total_episode.length ? true : false));
    } else if (query === "tv/series") {
      return arr.filter((item) => {
        return item.category.includes("Anime bộ") && item.total_episode.length;
      });
    } else if (query === "movie/ova") {
      return arr.filter((item) => {
        return item.category.includes("Anime lẻ") && item.total_episode.length;
      });
    } else if (query === "upComming") {
      return arr.filter((i) => (i.total_episode.length ? false : true));
    } else if (query === "day") {
      return arr
        .filter((i) => (i.total_episode.length ? true : false))
        .sort(function (a, b) {
          return b.views.day.total - a.views.day.total;
        });
    } else if (query === "week") {
      return arr
        .filter((i) => (i.total_episode.length ? true : false))
        .sort(function (a, b) {
          return b.views.week.total - a.views.week.total;
        });
    } else if (query === "month") {
      return arr
        .filter((i) => (i.total_episode.length ? true : false))
        .sort(function (a, b) {
          return b.views.month.total - a.views.month.total;
        });
    } else {
      return [];
    }
  } else if (typeof query === "object") {
    let temp = arr;
    if (query.category === "all" && !query.year) {
      return temp.filter((i) => i.total_episode.length);
    } else if (query.category === "all" && query.year) {
      if (query.year === "old") {
        return temp.filter((i) =>
          i.release_year < 2013 && i.total_episode.length ? true : false
        );
      } else {
        return temp.filter((i) =>
          i.release_year === query.year && i.total_episode.length ? true : false
        );
      }
    }
    temp = arr.map((item) => {
      let bool = true;
      let arrCategory = "";
      item.category.map((i) => {
        arrCategory += i.toString();
      });
      query.category.map((i) => {
        if (arrCategory.indexOf(i) === -1 || !item.total_episode.length) {
          bool = false;
        }
      });
      if (query.category.includes("Anime sắp chiếu")) {
        bool = true;
        query.category.map((i) => {
          if (arrCategory.indexOf(i) === -1) {
            bool = false;
          }
        });
      }
      let tempStr = "";
      query.category.map((i) => {
        tempStr += i.toString();
      });
      if (tempStr.includes("name=")) {
        tempStr = tempStr.replace(/name=/g, "");
        if (
          !item.name.jp.toLowerCase().includes(tempStr.toLowerCase()) &&
          !item.name.vn.toLowerCase().includes(tempStr.toLowerCase()) &&
          !item.name.en.toLowerCase().includes(tempStr.toLowerCase())
        ) {
          bool = false;
        } else {
          bool = true;
        }
      }
      if (bool) {
        return item;
      }
    });
    temp = temp.filter((i) => (i ? true : false));
    if (temp.length && query.year) {
      temp = temp.filter((i) => (i.release_year === query.year ? true : false));
    }
    //console.log(temp);
    return temp;
  }
};
export const getAnimeSeason = (arr, id) => {
  let temp = [];
  arr.map((item1) => {
    item1.season.map((item) => {
      if (item._id === id) {
        temp = item1.season;
      }
    });
  });
  return temp
    .map((item) => {
      return {
        release_year: item.release_year,
        title: item.season,
        name: item.name.jp || item.name.en || item.name.vn,
        _id: item._id,
      };
    })
    .sort(function (a, b) {
      return a.release_year - b.release_year;
    });
};
export const sortWithName = (arr, name) => {
  let temp = [];
  if (name === "0-9") {
    for (let j = 0; j <= 9; j++) {
      arr.map((item) => {
        for (const i in item.name) {
          if (item.name[i] && item.name[i][0] === j.toString()) {
            let tempObj = { ...item, name: { [i]: item.name[i] } };
            temp.push(tempObj);
            break;
          }
        }
      });
    }
    return temp;
  }
  arr.map((item) => {
    for (const i in item.name) {
      if (item.name[i] && item.name[i][0].toUpperCase() === name) {
        let tempObj = { ...item, name: { [i]: item.name[i] } };
        temp.push(tempObj);
        break;
      }
    }
  });
  return temp;
};

export const getAnimeById = (arr, query) => {
  const data = query.map((item) => arr.find((i) => i._id === item.animeId));
  return data.reverse();
};
