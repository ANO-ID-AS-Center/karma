import { CommonModule } from '@angular/common';
import { NgModule, NgModuleRef } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { TransportLazyModule } from '@ts-core/angular';
import { PaymentOpenHandler } from './service';
import { Transport } from '@ts-core/common/transport';
import { PaymentOpenCommand } from './transport';
import { PaymentContainer } from './component';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';

//--------------------------------------------------------------------------
//
// 	Constants
//
//--------------------------------------------------------------------------

const providers = [PaymentOpenHandler];
const declarations = [PaymentContainer];

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        MatButtonModule,
        SharedModule
    ],
    exports: declarations,
    declarations,
    providers
})
export class PaymentModule extends TransportLazyModule<PaymentModule> {
    //--------------------------------------------------------------------------
    //
    // 	Public Static Properties
    //
    //--------------------------------------------------------------------------

    public static ID = 'PaymentModule';
    public static COMMANDS = [PaymentOpenCommand.NAME];

    //--------------------------------------------------------------------------
    //
    // 	Constructor
    //
    //--------------------------------------------------------------------------

    constructor(reference: NgModuleRef<PaymentModule>, transport: Transport, open: PaymentOpenHandler) {
        super(reference, transport);
    }

    //--------------------------------------------------------------------------
    //
    // 	Public Properties
    //
    //--------------------------------------------------------------------------

    public get id(): string {
        return PaymentModule.ID;
    }

    public get commands(): Array<string> {
        return PaymentModule.COMMANDS;
    }
}