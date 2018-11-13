import {ChangeDetectorRef, Component, Input, OnInit, Output} from '@angular/core';

@Component({
    selector: 'app-main-page',
    templateUrl: './main-page.component.html',
})
export class MainPageComponent implements OnInit {

    private data;

    public brand;
    public model;
    public version;

    public brands: Array<object> = null;
    public models: Array<object> = null;
    public versions: Array<object> = null;

    constructor(private changeDetectorRef: ChangeDetectorRef) {
        this.data = {
            'brands': [
                {
                    'slug': 'fiat',
                    'name': 'Fiat',
                    'models': [
                        {
                            'slug': 'tipo',
                            'name': 'Tipo',
                            'versions': [
                                {
                                    'slug': 'i-1988-1995',
                                    'name': 'I (1988-1995)'
                                },
                                {
                                    'slug': 'ii-2016',
                                    'name': 'II (2016-)'
                                }
                            ]
                        },
                        {
                            'slug': 'punto',
                            'name': 'Punto',
                            'versions': [
                                {
                                    'slug': 'i-1994-1999',
                                    'name': 'I (1994-1999)'
                                },
                                {
                                    'slug': 'ii-1999-2003',
                                    'name': 'II (1999-2003)'
                                },
                                {
                                    'slug': 'ii-fl-2003',
                                    'name': 'II FL (2003-)'
                                }
                            ]
                        }
                    ]
                }
            ]
        };

        this.brands = this.data.brands;
    }

    private static findInObjectArrayByFieldValue(arr: Array<object>, field: string, value: any): any {
        for (const item of arr) {
            if (item[field] === value) {
                return item;
            }
        }
        return null;
    }

    ngOnInit() {
    }

    public onChangeBrand() {
        let modelsArray: Array<object> = null;
        if (this.brand !== null) {
            modelsArray = MainPageComponent.findInObjectArrayByFieldValue(this.brands, 'slug', this.brand).models;
        }

        if (this.brand === null
            || (this.model !== null && MainPageComponent.findInObjectArrayByFieldValue(modelsArray, 'slug', this.model) !== null)) {
            this.model = null;
            this.version = null;
            this.models = null;
            this.versions = null;
        } else if (this.model && this.model !== null) {
            const versionsArray: Array<object> = MainPageComponent.findInObjectArrayByFieldValue(this.models, 'slug', this.model).versions;

            if (this.version !== null  && MainPageComponent.findInObjectArrayByFieldValue(versionsArray, 'slug', this.version)) {
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
        let versionsArray: Array<object> = null;

        if (this.model !== null) {
            versionsArray = MainPageComponent.findInObjectArrayByFieldValue(this.models, 'slug', this.model).versions;
        }

        if (this.model === null
            || this.version !== null  && MainPageComponent.findInObjectArrayByFieldValue(versionsArray, 'slug', this.version)) {
            this.version = null;
            this.versions = null;
        }

        if (this.model !== null) {
            this.versions = versionsArray;
        }
    }
}
