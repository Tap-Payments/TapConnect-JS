import { action, observable, decorate } from 'mobx';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import * as baseAR from '../locales/ar/base.json';
import * as baseEN from '../locales/en/base.json';
import GetSectorsService from './API_Services/AuthServices/GetSectorsService';
import GetCountriesService from './API_Services/AuthServices/GetCountriesService';
import OperatorService from './API_Services/AuthServices/OperatorService';
import { getLocaleFromFirebase } from './API_Services/LocaleService/getLocaleFromFirebase';
import { filterCountries } from './Utils/filtering';
import { sortCountries } from './Utils/sorting';
import FingerPrintModel from './Utils/FingerPrintUtility/FingerPrintModel';
import axios from 'axios';
import { SANDBOX_MW_URL, LIVE_MW_URL } from './API_Services';

class ConnectDataSource {
  constructor() {
    console.log('%c START FETCHING', 'background:pink; color:black;');

    /// gets updated by  Connect
    this.direction = 'ltr';
    /// gets updated by  Connect
    this.language = 'en';
    this.isDataReady = false;
    this.publicKey = null;

    this.onFingerPrintReady = this.onFingerPrintReady.bind(this);
    this.fingerPrintModel = new FingerPrintModel(this.language, this.onFingerPrintReady);
    this.sectors = [];
    this.countryInfos = [];
    this.businessCountries = [];
    this.businessTypes = [];
    this.connectLocale = { ar: baseAR, en: baseEN };
    this.isOperatorValid = false;

    this.init = this.init.bind(this);
    this.getLocale = this.getLocale.bind(this);
    this.infoUpdated = this.infoUpdated.bind(this);
    this.getSectorsInfos = this.getSectorsInfos.bind(this);
    this.getCountryInfos = this.getCountryInfos.bind(this);
    this.getBusinessCountryInfos = this.getBusinessCountryInfos.bind(this);
    this.getBusinessTypesInfos = this.getBusinessTypesInfos.bind(this);
    this.validateOperator = this.validateOperator.bind(this);

    this.updatei18 = this.updatei18.bind(this);
    this.updateDSLanguage = this.updateDSLanguage.bind(this);
    this.updateDSDirection = this.updateDSDirection.bind(this);
    this.onFailure = this.onFailure.bind(this);
    this.updatePublicKey = this.updatePublicKey.bind(this);

    this.onFinishedFetchingData = () => {
      console.log('%c INFO FETCHED, GOOD TO GO', 'background:yellow; color:black;');
      this.isDataReady = true;
    };
  }

  onFingerPrintReady() {
    axios.defaults.headers['browser_identifier'] = this.fingerPrintModel.FP.browser.browser_id;
    this.validateOperator(this.init);
  }

  async init() {
    await this.getLocale();
    await this.getSectorsInfos();
    await this.getCountryInfos();
    await this.getBusinessCountryInfos();
    await this.getBusinessTypesInfos();
  }
  updatePublicKey(publicKey) {
    this.publicKey = publicKey;
    this.validateOperator();
  }
  infoUpdated() {
    console.log('%c INFO UPDATED', 'background:pink; color:black;');

    try {
      console.log(
        `this.sectors ${this.sectors.length}\nthis.countryInfos ${this.countryInfos.length}\nthis.businessCountries ${this.businessCountries.length}\nthis.businessTypes ${this.businessTypes.length}`,
      );

      if (
        this.isOperatorValid &&
        i18n.isInitialized &&
        // this.sectors.length &&
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
        this.onFailure(data);
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
      } else this.onFailure(data);
    });
  }
  async getBusinessCountryInfos() {
    await GetCountriesService.getStaticBusinessCountryData((data) => {
      if (data && data.list) {
        filterCountries(data.list).then((filteredCountries) => {
          this.businessCountries = filteredCountries.sort(sortCountries(this.direction));
          this.infoUpdated();
        });
      } else this.onFailure(data);
    });
  }
  async getBusinessTypesInfos() {
    await GetSectorsService.getStaticBusinessTypesData((data) => {
      if (data) {
        this.businessTypes = data;
        this.infoUpdated();
      } else this.onFailure(data);
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

  async validateOperator(cb) {
    if (!this.fingerPrintModel) {
      this.onFailure(data);
      return;
    }
    await OperatorService.validateOperator(
      { ...this.fingerPrintModel.operatorObject, ...{ connect_pkey: this.publicKey } },
      (data) => {
        console.log('valid');
        if (data == 'valid') {
          this.isOperatorValid = true;
          if (cb) cb();
        } else this.onFailure(data);
      },
    );
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

        debug: false,
        interpolation: {
          escapeValue: false, // react already safes from xss
        },
      });
    }
    i18n.changeLanguage(this.language);

    this.infoUpdated();
  }

  onFailure() {}
  updateDSLanguage(language) {
    if (language && language != this.language) {
      this.language = language;
      if (i18n.isInitialized) {
        i18n.changeLanguage(this.language);
      }
      this.fingerPrintModel.updateLanguage(language);
    }
  }
  updateDSDirection(direction) {
    if (direction && direction != this.direction) {
      this.direction = direction;
      if (this.countryInfos && this.countryInfos.length > 0)
        this.countryInfos = this.countryInfos.sort(sortCountries(this.direction));
      if (this.businessCountries && this.businessCountries.length > 0)
        this.businessCountries = this.businessCountries.sort(sortCountries(this.direction));
    }
  }
}
decorate(ConnectDataSource, {
  isDataReady: observable,
});

let connectDataSource = new ConnectDataSource();
export default connectDataSource;
