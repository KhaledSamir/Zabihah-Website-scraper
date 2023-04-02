import {salatomaticBaseUrl, zabihahBaseUrl} from './sites.js';


export const SiteType = {
    Zabihah: 0,
    Salatomatic: 1
}

export const queries = {
    "Restaurants": {
        searchValue: 'r',
        url: zabihahBaseUrl,
        siteType: SiteType.Zabihah
    },
    "Markets": {
        searchValue: 'm',
        url: zabihahBaseUrl,
        siteType: SiteType.Zabihah
    },
    "Caterers": {
        searchValue: 'c',
        url: zabihahBaseUrl,
        siteType: SiteType.Zabihah
    },
    "Businesses": {
        searchValue: 'b',
        url: zabihahBaseUrl,
        siteType: SiteType.Zabihah
    },
    "Mosques": {
        searchValue: 'm',
        url: salatomaticBaseUrl,
        siteType: SiteType.Salatomatic
    },
    "PrayerSpaces": {
        searchValue: 'x',
        url: salatomaticBaseUrl,
        siteType: SiteType.Salatomatic
    },
    "Schools": {
        searchValue: 's',
        url: salatomaticBaseUrl,
        siteType: SiteType.Salatomatic
    },
    "Organizations": {
        searchValue: 'o',
        url: salatomaticBaseUrl,
        siteType: SiteType.Salatomatic
    }
}