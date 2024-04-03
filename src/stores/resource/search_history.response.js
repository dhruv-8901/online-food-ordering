export default class SearchHistoryModel {
  constructor(data) {
    return data.map((items) => ({
      userSearch: items.search,
    }));
  }
}
