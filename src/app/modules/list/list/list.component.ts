import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ApiService} from '../../../services/api/api.service';
import {Subscription} from 'rxjs';
import {ShortOfferInfo} from '../../../components/main-page/main-page.component';
import {BMVService, IBrand, IModel, IVersion} from '../../../services/b-m-v.service';
import {StaticDataService} from '../../../services/static-data.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  loading = true;
  form: SearchForm = new SearchForm();
  offers: ShortOfferInfo[];

  brands: Array<IBrand>;
  models: Array<IModel>;
  versions: Array<IVersion>;

  private idParamSubscription: Subscription;


  constructor(
      private route: ActivatedRoute,
      private apiService: ApiService,
      private bmvService: BMVService,
      private changeDetectorRef: ChangeDetectorRef,
  ) {
    this.brands = bmvService.getBrands();


    setTimeout(() => {
      this.idParamSubscription = this.route.params.subscribe(params => {
        if (params['brand']) {
          this.form.brand = +params['brand'];
        }

        if (params['model']) {
          this.form.model = +params['model'];
        }

        if (params['version']) {
          this.form.version = +params['version'];
        }

        this.brands = this.bmvService.getBrands();
        this.models = this.bmvService.getModelsByBrandId(this.form.brand);
        this.versions = this.bmvService.getVersionsByBrandIdModelId(this.form.brand, this.form.model);
        // this.changeDetectorRef.detectChanges();

        this.reload();
      });
      this.brands = this.bmvService.getBrands();
      this.models = this.bmvService.getModelsByBrandId(this.form.brand);
      this.versions = this.bmvService.getVersionsByBrandIdModelId(this.form.brand, this.form.model);
    // this.changeDetectorRef.detectChanges();
    console.log(this.brands);
    }, 1000);

  }
  ngOnInit() {
  }

  reload() {
    this.loading = true;
    this.apiService.findOffers(this.form).then(value => {
      this.offers = value;
      this.loading = false;
    }).catch(reason => {
      console.error(reason);
      this.loading = false;
    });
  }


  public onChangeBrand() {
    let modelsArray: Array<IModel> = null;
    if (this.form.brand !== null) {
      modelsArray = this.bmvService.getModelsByBrandId(this.form.brand || '0');
    }

    if (this.form.brand === null
        ||
        (this.form.model !== null && this.bmvService.findModelByBrandIdModelId(this.form.brand || '0', this.form.model || '0') === null)
    ) {
      this.form.model = null;
      this.form.version = null;
      this.models = [];
      this.versions = [];
    } else if (this.form.model) {
      if (this.form.version !== null
          && this.bmvService.findVersionByBrandIdModelIdVersionId(this.form.brand || '0', this.form.model || '0', this.form.version || '0') === null) {
        this.form.version = null;
        this.versions = [];
      }
    }

    if (this.form.brand !== null && modelsArray) {
      this.models = modelsArray;
    }

    this.reload();

    this.changeDetectorRef.detectChanges();
  }

  public onChangeModel() {
    let versionsArray: Array<IVersion> = null;

    if (this.form.model !== null) {
      versionsArray = this.bmvService.getVersionsByBrandIdModelId(this.form.brand || '0', this.form.model || '0');
    }


    if (this.form.model === null ||
        (this.form.version !== null
            && this.bmvService.findVersionByBrandIdModelIdVersionId(this.form.brand || '0', this.form.model || '0', this.form.version || '0') === null
        )) {
      this.form.version = null;
      this.versions = [];
    }

    if (this.form.model !== null && versionsArray) {
      this.versions = versionsArray;
    }

    this.reload();
  }

}

class SearchForm {
  name = '';
  brand = null;
  model = null;
  version = null;
  priceFrom: number;
  priceTo: number;
  meterStatusFrom: number;
  meterStatusTo: number;
  enginePowerFrom: number;
  enginePowerTo: number;
  productionYearFrom: number;
  productionYearTo: number;
  fuelType: string;
}
