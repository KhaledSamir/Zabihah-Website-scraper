import * as data from '../data/queryToBusinesses.js';

export default class UrlBuilder {

    constructor() {
        this.buildUrl = this.buildUrl;
    }

    buildUrl(searchParameters) {
        const type = data.queries[searchParameters.query];
        const radius = searchParameters.radius;
        const city = searchParameters.city;
        const businessType = type.searchValue;
        let url = `${type.url}/search?r=${radius}&g=&l=${city}&t=${businessType}`;
        return {url: url, siteType: type.siteType};
    }
}
