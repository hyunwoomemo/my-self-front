import moment from "moment";

export const GroupedData = (data) => {
  const formattedData = data.map((v) => {
    return { ...v, formattedDate: moment(v?.created_at).format("YY-MM-DD HH:mm") };
  });
  // console.log("formattedData", formattedData);
  const newArr = formattedData.reverse().map((v, i, arr) => {
    const prev = arr[i - 1];
    const next = arr[i + 1];

    const isSameTime = (a, b) => {
      return a?.formattedDate === b?.formattedDate;
    };
    const isSameUser = (a, b) => {
      return a?.users_id === b?.users_id;
    };

    const nick = !isSameTime(prev, v) || !isSameUser(prev, v) || prev.admin === 1;
    const time = !isSameTime(v, next) || !isSameUser(v, next);

    return { ...v, nick, time };
  });
  return newArr;
};
