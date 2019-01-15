import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {BMVService, IBrand, IModel, IVersion} from '../../services/b-m-v.service';
import {ApiService} from '../../services/api/api.service';
import {NavigationExtras, Router} from '@angular/router';

@Component({
    selector: 'app-main-page',
    templateUrl: './main-page.component.html',
})
export class MainPageComponent implements OnInit {

    private data;

    public form = {
        brand: undefined,
        model: undefined,
        version: undefined,
    };
    brands: Array<IBrand>;
    models: Array<IModel>;
    versions: Array<IVersion>;
    popularOffers: Array<ShortOfferInfo> = null;

    constructor(private changeDetectorRef: ChangeDetectorRef,
                private bmvService: BMVService,
                private apiService: ApiService,
                private router: Router) {
        setTimeout(() => {
        this.brands = bmvService.getBrands();
        }, 1000);

        this.apiService.mostPopular().then((value: any) => {
            this.brands = bmvService.getBrands();
            this.popularOffers = value;
        }).catch(reason => {
            console.error(reason);
        });
    }

    ngOnInit() {
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
    }

    public find() {
        let route = '/find';

        if (this.form.brand && String(this.form.brand) !== '0') {
            route = route + '/' + this.form.brand;

            if (this.form.model && String(this.form.model) !== '0') {
                route = route + '/' + this.form.model;

                if (this.form.version && String(this.form.version) !== '0') {
                    route = route + '/' + this.form.version;
                }
            }
        }

        this.router.navigate([route], {queryParams: []} as NavigationExtras);
    }

}

export class ShortOfferInfo {
    id: number;
    name: string
    photo: string;
    price: string;
    fuelType: string;
    enginePower: string;
    productionYear: string;
    meterStatus: string;
}
