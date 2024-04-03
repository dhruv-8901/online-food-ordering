
export default class DropdownModel {
  constructor(data) {
    return data.map((items) => ({
      id: items.id,
      name: items.name,
    }));
  }
}
