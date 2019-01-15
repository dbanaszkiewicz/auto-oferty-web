import {Injectable} from '@angular/core';
import {ApiService} from './api/api.service';

@Injectable({
    providedIn: 'root'
})
export class BMVService {

    private data: Array<IBrand>;

    constructor(
        private apiService: ApiService,
    ) {
        this.data = [];
        this.apiService.getBMVData().then((value) => {
            this.data = value as any;
        }).catch(reason => {
            console.error(reason);
        });
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
        if (brand !== null && brand.models) {
            for (const model of brand.models) {
                if (model.id === modelId) {
                    return model.versions;
                }
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
