
export default class DropdownOptionsModel {
  constructor(data) {
    return data.map((items) => ({
      id: items.id,
      name: items.name,
    }));
  }
}
