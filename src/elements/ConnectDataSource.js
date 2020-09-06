import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import * as baseAR from '../locales/ar/base.json';
import * as baseEN from '../locales/en/base.json';
import GetSectorsService from './API_Services/AuthServices/GetSectorsService';
import GetCountriesService from './API_Services/AuthServices/GetCountriesService';
import { getLocaleFromFirebase } from './API_Services/LocaleService/getLocaleFromFirebase';
import { filterCountries } from './Utils/filtering';
import { sortCountries } from './Utils/sorting';
import FingerPrintModel from './Utils/FingerPrintUtility/FingerPrintModel';

class ConnectDataSource {
  constructor(connectVM) {
    console.log('%c START FETCHING', 'background:pink; color:black;');
    this.connectVM = connectVM;
    this.fingerPrintModel = new FingerPrintModel(connectVM.props);
    this.FP = this.fingerPrintModel.FP;
    this.direction = connectVM.direction;
    this.sectors = [];
    this.countryInfos = [];
    this.businessCountries = [];
    this.businessTypes = [];
    this.connectLocale = { ar: baseAR, en: baseEN };
    this.init = this.init.bind(this);
    this.getLocale = this.getLocale.bind(this);
    this.infoUpdated = this.infoUpdated.bind(this);
    this.getSectorsInfos = this.getSectorsInfos.bind(this);
    this.getCountryInfos = this.getCountryInfos.bind(this);
    this.getBusinessCountryInfos = this.getBusinessCountryInfos.bind(this);
    this.getBusinessTypesInfos = this.getBusinessTypesInfos.bind(this);
    this.updatei18 = this.updatei18.bind(this);
    this.onFinishedFetchingData = () => {
      console.log('%c INFO FETCHED, GOOD TO GO', 'background:yellow; color:black;');
      if (connectVM && connectVM.onFinishedFetchingData) connectVM.onFinishedFetchingData();
    };
    this.init();
  }

  async init() {
    await this.getLocale();
    await this.getSectorsInfos();
    await this.getCountryInfos();
    await this.getBusinessCountryInfos();
    await this.getBusinessTypesInfos();
  }

  infoUpdated() {
    console.log('%c INFO UPDATED', 'background:pink; color:black;');

    try {
      console.log(
        `this.sectors ${this.sectors.length}\nthis.countryInfos ${this.countryInfos.length}\nthis.businessCountries ${this.businessCountries.length}\nthis.businessTypes ${this.businessTypes.length}`,
      );

      if (
        i18n.isInitialized &&
        this.sectors.length &&
        this.countryInfos.length &&
        this.businessCountries.length &&
        this.businessTypes.length
      ) {
        this.onFinishedFetchingData();
      }
    } catch (error) {
      console.log(error);
    }
  }

  async getSectorsInfos(page) {
    await GetSectorsService.getSectorsData(page, (data) => {
      if (!data) {
        this.connectVM.onFailure(data);
        return;
      }
      if (data['sectors']) {
        data['sectors'].map((item, index) => {
          if (item.name.ar == '') item.name.ar = item.name.en;
        });
        this.sectors.push(...data['sectors']);
      }
      if (data.has_more && data.page) {
        this.getSectorsInfos(++data.page);
      } else {
        this.infoUpdated();
      }
    });
  }
  async getCountryInfos() {
    await GetCountriesService.getCountriesData((data) => {
      if (data && data.list) {
        filterCountries(data.list).then((filteredCountries) => {
          this.countryInfos = filteredCountries.sort(sortCountries(this.direction));
          this.infoUpdated();
        });
      } else this.connectVM.onFailure(data);
    });
  }
  async getBusinessCountryInfos() {
    await GetCountriesService.getCountriesData((data) => {
      if (data && data.list) {
        filterCountries(data.list).then((filteredCountries) => {
          this.businessCountries = filteredCountries.sort(sortCountries(this.direction));
          this.infoUpdated();
        });
      } else this.connectVM.onFailure(data);
    });
  }
  async getBusinessTypesInfos() {
    await GetSectorsService.getStaticBusinessTypesData((data) => {
      if (data) {
        this.businessTypes = data;
        this.infoUpdated();
      } else this.connectVM.onFailure(data);
    });
  }

  async getLocale() {
    await getLocaleFromFirebase((data) => {
      if (data) {
        this.connectLocale = data;
      }
      this.updatei18();
    });
  }
  updatei18() {
    ///// if host has i18n instance, override the field needed
    if (i18n.isInitialized) {
      i18n.addResourceBundle('en', 'translation', this.connectLocale.en, true, true);
      i18n.addResourceBundle('ar', 'translation', this.connectLocale.ar, true, true);
    } else {
      ///// if there is no instance in the host
      i18n.use(initReactI18next).init({
        resources: this.connectLocale,
        fallbackLng: 'en',
        initImmediate: false,
        preload: ['ar', 'en'],

        debug: true,
        interpolation: {
          escapeValue: false, // react already safes from xss
        },
      });
    }
    i18n.changeLanguage(this.connectVM.language);

    this.infoUpdated();
  }
}

export default ConnectDataSource;
