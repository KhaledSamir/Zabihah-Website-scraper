import * as cheerio from "cheerio";
import axios from "axios";
import Business from "./models/business.js";
import CSVCreator from "./csv-creator.js";

export default class Parser {

  csvCreator = new CSVCreator();
  async loadFromUrl(url) {
    const response = await axios(url);
    const links = await this.getBusinessesLinks(response.data)
    const businesses = await this.getBusinessesInformation(links)
    const data = await this
      .csvCreator
      .createCSV(businesses)
    return data;
  }

  async getBusinessesInformation(links) {
    const businessesArr = []
    await Promise.all(links.map(async link => {
      // axios.get(businesses[i].attribs.href)
      const response = await axios.get(link)
      const bizData = response.data;
      let business = await this.createBiz(bizData);
      businessesArr.push(business);
    }))

    return businessesArr
  }

  async getBusinessesLinks(pageResponse) {
    let $ = cheerio.load(pageResponse);
    let businessesLinks = []
    $('div.titleBS > a', pageResponse).each((i, elm) => {
      const link = $(elm).attr('href')
      businessesLinks.push(link)
    })
    if (businessesLinks.length == 0) 
      throw("The url has no businesss")
    return businessesLinks;
  }

  async createBiz(bizData) {
    let $ = cheerio.load(bizData);
    const bizName = $('.titleBL').text()
    const address = $('.bodyLink')
      .first()
      .text()
    const phone = $('td[valign="middle"] > div.midLink')
      .first()
      .text();
    let business = new Business(bizName, address, phone)
    return business;
  }
}