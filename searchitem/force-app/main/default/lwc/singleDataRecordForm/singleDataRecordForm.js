import { LightningElement, track } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { createRecord } from 'lightning/uiRecordApi';
import ACCOUNT_OBJECT from '@salesforce/schema/Account';
import NAME_FIELD from '@salesforce/schema/Account.Name';
export default class SingleDataRecordForm extends LightningElement {
    @track accountId;
    name;

    onNameChange(event) {
        this.name = event.target.value;
    }
    createAccount() {
        const recordInput = {
            apiName: (ACCOUNT_OBJECT.objectApiName),
            fields: {   [NAME_FIELD.fieldApiName]: this.name,  }
        };
        createRecord(recordInput)
            .then(account => {
                this.accountId = account.id;
                this.dispatchEvent(
                    new ShowToastEvent({
                        title: 'Success',
                        message: 'Account created',
                        variant: 'success',
                    }),
                );
            })
           .catch( );
    }
}