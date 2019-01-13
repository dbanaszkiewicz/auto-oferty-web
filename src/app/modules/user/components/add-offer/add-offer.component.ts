import {ChangeDetectorRef, Component, Input, OnInit, ViewChild} from '@angular/core';
import {BMVService, IBrand, IModel, IVersion} from '../../../../services/b-m-v.service';
import {StaticDataService} from '../../../../services/static-data.service';
import {
    IsNotEmpty,
    Min,
    MinLength,
    registerDecorator,
    validate,
    ValidationArguments,
    ValidationError,
    ValidationOptions
} from 'class-validator';
import {ApiService} from '../../../../services/api/api.service';
import {serialize} from '../../../../tools/tools';
import {AlertsService} from 'angular-alert-module';
import {Router} from '@angular/router';
import {DropzoneComponent, DropzoneConfigInterface} from 'ngx-dropzone-wrapper';

@Component({
    selector: 'app-add-offer',
    templateUrl: './add-offer.component.html',
    styleUrls: ['./add-offer.component.css']
})
export class AddOfferComponent implements OnInit {

    loading = false;
    form: Form;
    formErrors: any = [];
    brands: Array<IBrand>;
    models: Array<IModel>;
    versions: Array<IVersion>;
    equipments: any;
    @Input() offerId = 0;

    dropzoneConfig: DropzoneConfigInterface = {
        url: '/api/offer/' + this.offerId + '/add-photo',
        maxFilesize: 50,
        acceptedFiles: 'image/*',
        addRemoveLinks: true
    };

    fuelTypes: Array<string> = StaticDataService.fuelTypes;
    gearboxTypes: Array<string> = StaticDataService.gearboxTypes;
    colors: Array<string> = StaticDataService.bodyColors;
    bodyTypes: Array<string> = StaticDataService.bodyTypes;

    @ViewChild(DropzoneComponent) dropzone?: DropzoneComponent;

    constructor(
        private changeDetectorRef: ChangeDetectorRef,
        private bmvService: BMVService,
        private apiService: ApiService,
        private alert: AlertsService,
        private router: Router
    ) {
        this.form = new Form();
        this.form.equipments = {};
        this.brands = bmvService.getBrands();
    }

    ngOnInit() {
        this.apiService.getEquipments().then((value) => {
            this.equipments = value;
            if (this.offerId > 0) {
                this.apiService.getEditOfferData(this.offerId).then((value: Form) => {
                    this.dropzoneConfig.url = '/api/offer/' + this.offerId + '/add-photo';
                    this.form = value;
                    this.form.id = this.offerId;
                    for (const photo of this.form.photos) {
                        const mockFile = {id: photo.id, name: '/api/storage/' + photo.name, size: 0, dataURL: '/api/storage/' + photo.name};

                        const dropzoneInstance = this.dropzone.directiveRef.dropzone();
                        dropzoneInstance.emit('addedfile', mockFile);
                        dropzoneInstance.emit('thumbnail', mockFile);
                        dropzoneInstance.createThumbnailFromUrl(
                            mockFile,
                            dropzoneInstance.options.thumbnailWidth,
                            dropzoneInstance.options.thumbnailHeight,
                            dropzoneInstance.options.thumbnailMethod,
                            true,
                            function (thumbnail) {
                                dropzoneInstance.files.push(thumbnail);
                                dropzoneInstance.emit('thumbnail', mockFile, thumbnail);
                            },
                            'Anonymous'
                        );
                        dropzoneInstance.emit('complete', mockFile);
                    }

                    this.brands = this.bmvService.getBrands();
                    this.models = this.bmvService.getModelsByBrandId(value.brand);
                    this.versions = this.bmvService.getVersionsByBrandIdModelId(value.brand, value.model);
                    this.changeDetectorRef.detectChanges();
                }).catch(reason => {
                    console.error(reason);
                });
            }
        }).catch(reason => {
            console.error(reason);
        });
    }

    addOffer($event: Event) {
        this.loading = true;
        $event.preventDefault();
        validate(this.form).then((errors: Array<ValidationError>) => {
            this.formErrors = serialize(errors);
//            if (Object.keys(this.formErrors).length === 0) {
            this.apiService.addOffer(this.form).then((value: any) => {
                if (this.offerId > 0) {
                    this.alert.setMessage('Oferta została zaktualizowana.', 'success');
                } else {
                    this.alert.setMessage('Oferta została dodana.', 'success');
                    this.router.navigateByUrl('/user/edit/' + value.id);
                }
                this.loading = false;
            }, reason => {
                if (reason.error && reason.error.message) {
                    this.alert.setMessage(reason.error.message, 'error');
                } else {
                    this.alert.setMessage('Ups... coś poszło nie tak...', 'error');
                }
                this.loading = false;
            });
            //          } else {
            this.loading = false;
            //        }
        });
    }

    onUploadSuccess($event: any) {
        console.log($event);
        const file = $event[0];
        const id = $event[1];

        file.myId = id;
    }

    onRemoveFile($event: any) {
        const id = $event.id;
        this.apiService.removePhoto(id);
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
}


class Form {
    id = 0;
    @MinLength(10, {message: 'Podana nazwa jest za krótka!'})
    name: string;
    @IsNotEmpty({message: 'Wybierz markę!'})
    brand: string;
    @IsNotEmpty({message: 'Wybierz model!'})
    model: string;
    @IsNotEmpty({message: 'Wybierz wersję!'})
    version: string;
    @Min(0, {message: 'Podaj cenę!'})
    price: number;
    afterAccident: boolean;
    used: boolean;
    @IsNotEmpty({message: 'Wybierz liczbę drzwi!'})
    doors: number;
    @IsNotEmpty({message: 'Wybierz rodzaj paliwa!'})
    fuelType: string;
    @Min(0, {message: 'Podaj przebieg!'})
    meterStatus: number;
    @Min(1, {message: 'Podaj moc silnika!'})
    enginePower: number;
    @Min(1, {message: 'Podaj pojemność silnika!'})
    engineCapacity: number;
    @IsNotEmpty({message: 'Wybierz rodzaj skrzyni biegów!'})
    gearbox: string;
    @IsInRange(1900, (new Date()).getFullYear(), {message: 'Podaj poprawny rok produkcji!'})
    productionYear: number;
    @IsNotEmpty({message: 'Wybierz kolor karoserii!'})
    bodyColor: string;
    @IsNotEmpty({message: 'Wybierz rodzaj nadwozia!'})
    bodyType: string;

    equipments: any;
    photos: any;

    description: string;
}

export function IsInRange(min: number, max: number, validationOptions?: ValidationOptions) {
    return function (object: Object, propertyName: string) {
        registerDecorator({
            name: 'IsInRange',
            target: object.constructor,
            propertyName: propertyName,
            constraints: [min, max],
            options: validationOptions,
            validator: {
                validate(value: any, args: ValidationArguments) {
                    return value >= min && value <= max;
                }
            }
        });
    };
}
