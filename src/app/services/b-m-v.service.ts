import {Injectable} from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class BMVService {

    private readonly data: Array<IBrand>;

    constructor() {
        this.data = [
            {
                'id': 'fiat',
                'name': 'Fiat',
                'models': [
                    {
                        'id': 'tipo',
                        'name': 'Tipo',
                        'versions': [
                            {
                                'id': 'i-1988-1995',
                                'name': 'I (1988-1995)'
                            },
                            {
                                'id': 'ii-2016',
                                'name': 'II (2016-)'
                            }
                        ]
                    },
                    {
                        'id': 'punto',
                        'name': 'Punto',
                        'versions': [
                            {
                                'id': 'i-1994-1999',
                                'name': 'I (1994-1999)'
                            },
                            {
                                'id': 'ii-1999-2003',
                                'name': 'II (1999-2003)'
                            },
                            {
                                'id': 'ii-fl-2003',
                                'name': 'II FL (2003-)'
                            }
                        ]
                    }
                ]
            }
        ];
    }

    getBrands(): Array<IBrand> {
        return this.data;
    }

    getModelsByBrandId(brandId: string): Array<IModel> {
        for (const brand of this.data) {
            if (brand.id === brandId) {
                return brand.models;
            }
        }

        return [];
    }

    getVersionsByBrandIdModelId(brandId: string, modelId: string): Array<IVersion> {
        const brand = this.findBrandById(brandId);
        for (const model of brand.models) {
            if (model.id === modelId) {
                return model.versions;
            }
        }

        return [];
    }

    findBrandById(brandId: string): IBrand {
        for (const brand of this.data) {
            if (brand.id === brandId) {
                return brand;
            }
        }

        return null;
    }

    findModelByBrandIdModelId(brandId: string, modelId: string): IModel {
        if (this.findBrandById(brandId) !== null) {
            for (const model of this.findBrandById(brandId).models) {
                if (model.id === modelId) {
                    return model;
                }
            }
        }

        return null;
    }

    findVersionByBrandIdModelIdVersionId(brandId: string, modelId: string, versionId: string): IVersion {
        if (this.findModelByBrandIdModelId(brandId, modelId) !== null) {
            for (const version of this.findModelByBrandIdModelId(brandId, modelId).versions) {
                if (version.id === modelId) {
                    return version;
                }
            }
        }

        return null;
    }
}

export class IBrand {
    id: string;
    name: string;
    models: Array<IModel>;
}

export class IModel {
    id: string;
    name: string;
    versions: Array<IVersion>;
}

export class IVersion {
    id: string;
    name: string;
}
