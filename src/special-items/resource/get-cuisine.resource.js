export default class CuisineModel {
  constructor(data) {
    return data.map((items) => ({
      id: items.id,
      name: items.name
    }));
  }
}
