import * as cheerio from "cheerio";
import axios from "axios";
import Business from "./models/business.js";
import CSVCreator from "./csv-creator.js";

export default class Parser {
  businessesArr = new Array();
  csvCreator = new CSVCreator();
  async loadFromUrl(url) {
    const pageResponse = await axios.get(url);
    await this.getBusinesses(pageResponse.data)
    return true;
  }

  async getBusinesses(pageResponse) {
    let $ = cheerio.load(pageResponse);
    let businesses = $('div.titleBS > a')
    if(businesses.length == 0)
      throw "The url has no businesss";
      
    for(let i = 0; i < businesses.length;i++) {
        const link = await axios.get(businesses[i].attribs.href)
        const bizData = link.data;
        let business = await this.createBiz(bizData)
        this.businessesArr.push(business);
    }

    await this.csvCreator.createCSV(this.businessesArr)
  }

  async createBiz(bizData) {
    let $ = cheerio.load(bizData);
    const bizName = $('.titleBL').text()
    const address = $('.bodyLink').first().text()
    const phone = $('.midLink').first().text();
    let business = new Business(bizName, address, phone)
    return business;
  }
}
