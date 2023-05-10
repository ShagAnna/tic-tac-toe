class Storage
{
  constructor(storage_name) {
    this.storage_name = storage_name;

    this.data = {
      last_id: 0,
      entries: {}
    };

    const json_data = localStorage.getItem(this.storage_name);
    if (json_data == null) {
      return;
    }

    this.data = JSON.parse(json_data);
  }

  getEntries () {
    return this.data.entries;
  }

  create (entry) {
    const id = ++this.data.last_id;
    this.data.entries[id] = entry;
    this.save();

    return id;
  }

  update (id, data) {
    // id = 4;
    // data = {status: 1};
    // data = {time: "10:12"};
    // data = {date: "31.12.2023.", event_name: "new year"};

    // this.data.entries[id] = {task: "fasdfasdf", status: 1}
    for (const key in data) {
      this.data.entries[id][key] = data[key];
    }

    this.save();
  }

  delete (id) {
    delete this.data.entries[id];
    this.save();
  }

  save () {
    const json_data = JSON.stringify(this.data);
    localStorage.setItem(this.storage_name, json_data);
  }
}


// const json = `{
//   "firstname": "Leo",
//   "lastname": "Ozoliņš",
//   "age": 45,
//   "skils": ["html", "css", "js"]
// }`;

// const obj = {
//   firstname: "Leo",
//   lastname: "Ozoliņš",
//   age: 45,
//   skils: ["html", "css", "js"]
// };

