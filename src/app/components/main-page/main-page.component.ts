import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {BMVService, IBrand, IModel, IVersion} from '../../services/b-m-v.service';
import {ApiService} from '../../services/api/api.service';

@Component({
    selector: 'app-main-page',
    templateUrl: './main-page.component.html',
})
export class MainPageComponent implements OnInit {

    private data;

    public brand;
    public model;
    public version;

    brands: Array<IBrand> = null;
    models: Array<IModel> = null;
    versions: Array<IVersion> = null;
    popularOffers: Array<ShortOfferInfo> = null;

    constructor(private changeDetectorRef: ChangeDetectorRef,
                private bmvService: BMVService,
                private apiService: ApiService) {
        this.data = {
            'brands': bmvService.getBrands()
        };

        this.apiService.mostPopular().then((value: any) => {
            this.popularOffers = value;
        }).catch(reason => {
            console.error(reason);
        })


        this.brands = this.data.brands;
    }

    ngOnInit() {
    }

    public onChangeBrand() {
        let modelsArray: Array<IModel> = null;
        if (this.brand !== null) {
            modelsArray = this.bmvService.getModelsByBrandId(this.brand);
        }

        if (this.brand === null
            || (this.model !== null && this.bmvService.findModelByBrandIdModelId(this.brand, this.model) !== null) === null) {
            this.model = null;
            this.version = null;
            this.models = null;
            this.versions = null;
        } else if (this.model) {
            if (this.version !== null
                && this.bmvService.findVersionByBrandIdModelIdVersionId(this.brand, this.model, this.version) === null
            ) {
                this.version = null;
                this.versions = null;
            }
        }

        if (this.brand !== null) {
            this.models = modelsArray;
        }

        this.changeDetectorRef.detectChanges();
    }

    public onChangeModel() {
        let versionsArray: Array<IVersion> = null;

        if (this.model !== null) {
            versionsArray = this.bmvService.getVersionsByBrandIdModelId(this.brand, this.model);
        }


        if (this.model === null ||
            this.version !== null && this.bmvService.findVersionByBrandIdModelIdVersionId(this.brand, this.model, this.version) === null) {
            this.version = null;
            this.versions = null;
        }

        if (this.model !== null) {
            this.versions = versionsArray;
        }
    }
}

class ShortOfferInfo {
    id: number;
    name: string
    photo: string;
    price: string;
    fuelType: string;
    enginePower: string;
    productionYear: string;
    meterStatus: string;
}
