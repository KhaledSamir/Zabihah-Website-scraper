import * as cheerio from "cheerio";
import axios from "axios";
import Business from "./models/business.js";
import CSVCreator from "./csv-creator.js";
import UrlBuilder from './url-builder.js'
import {SiteType} from "../data/queryToBusinesses.js";
import * as sites from '../data/sites.js';

export default class Parser {

  csvCreator = new CSVCreator();

  async loadData(searchParameters) {
    const urlBuilder = new UrlBuilder(searchParameters);
    const type = urlBuilder.buildUrl(searchParameters);
    const response = await axios(type.url);
    const links = await this.extractLinks(response.data)
    if (links.length == 0) 
      return null;
    const businesses = await this.parseBusinessesInformation(links, type.siteType);
    const data = await this
      .csvCreator
      .createCSV(businesses);
    return data;
  }

  async extractLinks(pageResponse) {
    const $ = cheerio.load(pageResponse);
    const businessesLinks = []
    $('div.titleBS > a', pageResponse).each((i, elm) => {
      const link = $(elm).attr('href')
      businessesLinks.push(link)
    })
    return businessesLinks;
  }

  async parseBusinessesInformation(links, siteType) {
    const businessesArr = [];

    const axiosInstances = links.map(async link => {
      if (siteType == SiteType.Salatomatic) {
        link = `${sites.salatomaticBaseUrl}//${link}`;
      }
      return await axios.get(link)
    });

    var responses = await axios.all(axiosInstances);
    for (const response of responses) {
      const business = await this.createBiz(response.data);
      businessesArr.push(business);
    };

    return businessesArr;
  }

  async createBiz(bizData) {
    const $ = cheerio.load(bizData);
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