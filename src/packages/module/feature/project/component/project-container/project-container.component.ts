import { Component, Input, ViewChild, ViewContainerRef } from '@angular/core';
import { ISelectListItem, MenuTriggerForDirective, SelectListItem, SelectListItems, ViewUtil } from '@ts-core/angular';
import * as _ from 'lodash';
import { Project } from '@common/platform/project';
import { ProjectBaseComponent } from '../ProjectBaseComponent';
import { LanguageService } from '@ts-core/frontend/language';
import { ProjectMenu } from '../../service';
import { PaymentMapCollection } from '@core/lib/payment';

@Component({
    selector: 'project-container',
    templateUrl: 'project-container.component.html',
    providers: [PaymentMapCollection]
})
export class ProjectContainerComponent extends ProjectBaseComponent {
    // --------------------------------------------------------------------------
    //
    // 	Properties
    //
    // --------------------------------------------------------------------------

    @ViewChild(MenuTriggerForDirective, { static: true })
    public trigger: MenuTriggerForDirective;

    public tabs: SelectListItems<ISelectListItem<string>>;

    // --------------------------------------------------------------------------
    //
    // 	Constructor
    //
    // --------------------------------------------------------------------------

    constructor(
        container: ViewContainerRef,
        language: LanguageService,
        public payments: PaymentMapCollection,
        public menu: ProjectMenu,
    ) {
        super(container);
        ViewUtil.addClasses(container, 'd-flex flex-column');

        this.tabs = new SelectListItems(language);
        this.tabs.add(new SelectListItem('project.project', 0, 'PROJECT'));
        this.tabs.add(new SelectListItem('user.users', 1, 'USERS'));
        this.tabs.add(new SelectListItem('payment.payment', 2, 'PAYMENTS'));
        this.tabs.add(new SelectListItem('payment.donate', 3, 'DONATE'));
        this.tabs.complete(0);
    }

    // --------------------------------------------------------------------------
    //
    // 	Private Methods
    //
    // --------------------------------------------------------------------------

    protected commitProjectProperties(): void {
        this.payments.conditions.projectId = this.project.id;
        this.payments.reload();
    }

    // --------------------------------------------------------------------------
    //
    // 	Event Handlers
    //
    // --------------------------------------------------------------------------

    public async menuOpen(event: MouseEvent): Promise<void> {
        this.menu.refresh(this.project);
        this.trigger.openMenuOn(event.target);
    }

    //--------------------------------------------------------------------------
    //
    //  Public Properties
    //
    //--------------------------------------------------------------------------

    public get project(): Project {
        return super.project;
    }
    @Input()
    public set project(value: Project) {
        super.project = value;
    }
}
