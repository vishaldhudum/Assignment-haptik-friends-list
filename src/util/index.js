const generateID = () => Math.floor(Math.random() * 10000);

const capitalizeName = name => name.replace(/\b(\w)/g, s => s.toUpperCase());

const sortList = list => {
  let fav = [], unfav = [];
  list.sort((a, b) => a.name.localeCompare(b.name))
  list.forEach(item => {
    if (item.favorite)
      fav.push(item);
    else
      unfav.push(item);
  });

  return [...fav, ...unfav];
}

const filterList = (name, list) => {
  if (name && name.trim() !== '') {
    return list.filter(friend =>
      friend.name.toLowerCase().includes(name.toLowerCase())
    );
  }

  return list;
}

const Utils = {
  generateID,
  capitalizeName,
  sortList,
  filterList
}

export default Utils